'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProfileForm() {
    const { user, token, login } = useAuth();
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState('');
    

    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);


    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setPicture(user.picture || '');
        }
    }, [user]);

    const uploadFile = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('purpose', 'user-picture');

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/uploads/image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || 'Upload failed');
        }

        const data = await res.json();
        if (data.url.startsWith('http')) return data.url;
        return `${process.env.NEXT_PUBLIC_API_URL}${data.url}`;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                setIsUploading(true);
                const url = await uploadFile(e.target.files[0]);
                setPicture(url);
                setMessage(null);
            } catch (err: any) {
                setMessage({ type: 'error', text: `Erreur upload: ${err.message}` });
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const payload: any = { name, email, picture };
            if (password) {
                if (password.length < 6) throw new Error('Le mot de passe doit faire au moins 6 caractères');
                payload.password = password;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user?.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Erreur mise à jour');
            }

            const updatedUser = await res.json();
            login(token!, updatedUser); 
            
            setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
            setPassword(''); // Clear password field

        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return null;

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 md:p-10 rounded-[20px] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-main-red mb-8 text-center">Mon Profil</h2>

            {message && (
                <div className={`p-4 rounded-lg mb-6 text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {message.text}
                </div>
            )}


            <div className="flex flex-col items-center mb-8">
                <div className="relative w-32 h-32 mb-4">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-100 bg-gray-200">
                        {picture ? (
                            <Image 
                                src={picture} 
                                alt="Profil" 
                                fill 
                                className="object-cover rounded-full" 
                                sizes="128px"
                                unoptimized={(picture.startsWith('http://') || picture.startsWith('https://')) && picture.includes('localhost')}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-main-red text-white p-2 rounded-full cursor-pointer hover:bg-[#842C16] transition-colors shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.122 2.122 0 00-1.791-.98h-2.738c-.795 0-1.55.37-2.006.98l-.822 1.316z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                        </svg>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isUploading} />
                    </label>
                </div>
                {isUploading && <span className="text-sm text-gray-500 animate-pulse">Upload en cours...</span>}
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-1 focus:ring-main-red focus:border-main-red outline-none transition-colors"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse email</label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-1 focus:ring-main-red focus:border-main-red outline-none transition-colors"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nouveau mot de passe <span className="font-normal text-gray-400">(Laisser vide pour ne pas changer)</span>
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-1 focus:ring-main-red focus:border-main-red outline-none transition-colors"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading || isUploading}
                        className="w-full bg-main-red text-white font-bold py-3 px-4 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </button>
                </div>
            </div>
        </form>
    );
}
