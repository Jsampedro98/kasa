'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const EQUIPMENTS_LIST = [
  "Micro-Ondes", "Douche italienne", "Frigo", "WIFI", "Parking",
  "Sèche Cheveux", "Machine à laver", "Cuisine équipée", "Télévision",
  "Chambre Séparée", "Climatisation", "Frigo Américain", "Clic-clac",
  "Four", "Rangements", "Lit", "Bouilloire", "SDB",
  "Toilettes sèches", "Cintres", "Baie vitrée", "Hotte", "Baignoire", "Vue Parc"
];

const SUGGESTED_TAGS = [
  "Parc", "Night Life", "Culture", "Nature", "Touristique",
  "Vue sur mer", "Pour les couples", "Famille", "Forêt"
];

export default function AddPropertyForm() {
  const router = useRouter();
  const { token } = useAuth();
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [location, setLocation] = useState('');
  
  const [cover, setCover] = useState('');
  const [pictures, setPictures] = useState<string[]>(['']); // Start with one empty slot
  
  const [hostName, setHostName] = useState('');
  const [hostPicture, setHostPicture] = useState('');

  const [selectedEquipments, setSelectedEquipments] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [customTag, setCustomTag] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // --- Upload Helper ---
  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('purpose', 'property-picture');

    const res = await fetch('http://127.0.0.1:4000/api/uploads/image', {
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
    // Backend returns url like "/uploads/..."
    // We need to prepend the backend host if we want to display it immediately or store absolute URL?
    // The backend serves static files at root, but for frontend consistency let's store the full path if possible, 
    // OR just the path returned by backend if your other components handle relative paths.
    // Based on `api.ts`, properties have full URLs or handled by Image component? 
    // Usually other properties have full URLs or relative. Let's assume relative is fine or prepend backend base.
    // Checking `PropertyCard`, it uses `property.cover` directly in `Image src`. If it's relative, Next.js Image needs domain config.
    // The backend seems to return `/uploads/filename.jpg`.
    // Let's prepend http://127.0.0.1:4000 for verified display in frontend if needed.
    return `http://127.0.0.1:4000${data.url}`; 
  };

  // --- Handlers ---

  const handleEquipmentChange = (eq: string) => {
    const newSet = new Set(selectedEquipments);
    if (newSet.has(eq)) newSet.delete(eq);
    else newSet.add(eq);
    setSelectedEquipments(newSet);
  };

  const handleTagToggle = (tag: string) => {
    const newSet = new Set(selectedTags);
    if (newSet.has(tag)) newSet.delete(tag);
    else newSet.add(tag);
    setSelectedTags(newSet);
  };

  const handleAddCustomTag = () => {
    if (customTag.trim()) {
      const newSet = new Set(selectedTags);
      newSet.add(customTag.trim());
      setSelectedTags(newSet);
      setCustomTag('');
    }
  };

  // Generic file change handler for inputs
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>, onSuccess: (url: string) => void) => {
    if (e.target.files && e.target.files[0]) {
        try {
            setUploading(true);
            const url = await uploadFile(e.target.files[0]);
            onSuccess(url);
        } catch (err: any) {
            setError(`Upload error: ${err.message}`);
        } finally {
            setUploading(false);
        }
    }
  };

  const addPictureField = () => {
    setPictures([...pictures, '']);
  };

  const updatePicture = (index: number, url: string) => {
    const newPics = [...pictures];
    newPics[index] = url;
    setPictures(newPics);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!title || !description || !location || !cover || !hostName) {
        throw new Error("Veuillez remplir les champs obligatoires (Titre, Description, Localisation, Cover, Nom de l'hôte)");
      }

      const payload = {
        title,
        description,
        location: zipCode ? `${location} (${zipCode})` : location,
        cover,
        pictures: pictures.filter(p => p.trim() !== ''),
        host: {
          name: hostName,
          picture: hostPicture
        },
        equipments: Array.from(selectedEquipments),
        tags: Array.from(selectedTags),
        price_per_night: 100
      };

      const res = await fetch('http://127.0.0.1:4000/api/properties', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             // Assuming create also needs auth, though controller might check role
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la création');
      }

      router.push(`/property/${data.id}`);

    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-10">
        <Link href="/" className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors mb-8">
            ← Retour aux annonces
        </Link>
        
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold text-noir">Ajouter une propriété</h1>
            <button 
                onClick={handleSubmit} 
                className="bg-main-red text-white px-8 py-3 rounded text-lg font-medium hover:opacity-90 disabled:opacity-50 hidden lg:block"
                disabled={loading || uploading}
            >
                {loading ? 'Ajout...' : 'Ajouter'}
            </button>
        </div>

        {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-8">
                {error}
            </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
            {/* Colonne Gauche - Wrapper */}
            <div className="contents lg:flex lg:flex-col lg:flex-1 lg:gap-10">
                
                {/* 1. Info */}
                <div className="order-1 bg-white rounded-lg p-6 lg:p-10 shadow-sm border border-gray-100 mb-6 lg:mb-0">
                    <div className="mb-6">
                        <label className="block font-semibold mb-2">Titre de la propriété</label>
                        <input 
                            type="text" 
                            className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-main-red"
                            placeholder="Ex : Appartement cosy au coeur de paris"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block font-semibold mb-2">Description</label>
                        <textarea 
                            className="w-full border border-gray-200 rounded p-3 text-sm h-32 resize-none focus:outline-none focus:border-main-red"
                            placeholder="Décrivez votre propriété en détail..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block font-semibold mb-2">Code postal</label>
                        <input 
                            type="text" 
                            className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-main-red"
                            value={zipCode}
                            onChange={e => setZipCode(e.target.value)}
                        />
                    </div>

                    <div className="mb-0">
                        <label className="block font-semibold mb-2">Localisation</label>
                        <input 
                            type="text" 
                            className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-main-red"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                    </div>
                </div>

                {/* 4. Equipments */}
                <div className="order-4 bg-white rounded-lg p-6 lg:p-10 shadow-sm border border-gray-100 mb-6 lg:mb-0">
                    <h3 className="font-semibold mb-4">Équipements</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {EQUIPMENTS_LIST.map(eq => (
                            <label key={eq} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${selectedEquipments.has(eq) ? 'bg-main-red border-main-red' : 'border-gray-300'}`}>
                                    {selectedEquipments.has(eq) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={selectedEquipments.has(eq)} 
                                    onChange={() => handleEquipmentChange(eq)} 
                                />
                                <span className={`text-sm ${selectedEquipments.has(eq) ? 'text-menu-text' : 'text-gray-500'}`}>{eq}</span>
                            </label>
                        ))}
                    </div>
                </div>

            </div>

            {/* Colonne Droite - Wrapper */}
            <div className="contents lg:flex lg:flex-col lg:flex-1 lg:gap-6">
                
                {/* 2. Images Box */}
                <div className="order-2 bg-white rounded-lg p-6 lg:p-10 shadow-sm border border-gray-100 mb-6 lg:mb-0">
                    <div className="mb-6">
                        <label className="block font-semibold mb-2">Image de couverture</label>
                        <div className="flex gap-2">
                             <input 
                                type="text" 
                                className="flex-1 min-w-0 border border-gray-200 rounded p-2 lg:p-3 text-sm focus:outline-none focus:border-main-red bg-gray-50 text-gray-500"
                                placeholder="URL de l'image"
                                value={cover}
                                readOnly
                            />
                            <label className="bg-main-red text-white w-12 rounded hover:opacity-90 flex items-center justify-center text-xl font-bold cursor-pointer">
                                <span>+</span>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => onFileChange(e, setCover)} />
                            </label>
                        </div>
                    </div>

                    <div className="mb-2">
                        <label className="block font-semibold mb-2">Image du logement</label>
                         {pictures.map((pic, idx) => (
                            <div className="flex gap-2 mb-2" key={idx}>
                                <input 
                                    type="text" 
                                    className="flex-1 min-w-0 border border-gray-200 rounded p-2 lg:p-3 text-sm focus:outline-none focus:border-main-red bg-gray-50 text-gray-500"
                                    placeholder="URL de l'image"
                                    value={pic}
                                    readOnly
                                />
                                <label className="bg-main-red text-white w-12 rounded hover:opacity-90 flex items-center justify-center text-xl font-bold cursor-pointer">
                                    <span>+</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => onFileChange(e, (url) => updatePicture(idx, url))} />
                                </label>
                            </div>
                         ))}
                    </div>
                    
                    <button onClick={addPictureField} className="text-main-red text-sm font-medium hover:underline">
                        + Ajouter une image
                    </button>
                </div>

                {/* 3. Host Box */}
                <div className="order-3 bg-white rounded-lg p-6 lg:p-10 shadow-sm border border-gray-100 mb-6 lg:mb-0">
                     <div className="mb-6">
                        <label className="block font-semibold mb-2">Nom de l'hôte</label>
                        <input 
                            type="text" 
                            className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-main-red"
                            value={hostName}
                            onChange={e => setHostName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Photo de profil</label>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                className="flex-1 min-w-0 border border-gray-200 rounded p-2 lg:p-3 text-sm focus:outline-none focus:border-main-red bg-gray-50 text-gray-500"
                                placeholder="URL de l'image"
                                value={hostPicture}
                                readOnly
                            />
                             <label className="bg-main-red text-white w-12 rounded hover:opacity-90 flex items-center justify-center text-xl font-bold cursor-pointer">
                                <span>+</span>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => onFileChange(e, setHostPicture)} />
                            </label>
                        </div>
                    </div>
                    <button className="text-main-red text-sm font-medium hover:underline">
                        + Ajouter une image
                    </button>
                </div>

                {/* 5. Categories Box */}
                <div className="order-5 bg-white rounded-lg p-6 lg:p-10 shadow-sm border border-gray-100 mb-6 lg:mb-0">
                    <h3 className="font-semibold mb-4">Catégories</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {SUGGESTED_TAGS.map(tag => (
                            <button 
                                key={tag} 
                                onClick={() => handleTagToggle(tag)}
                                className={`px-4 py-2 rounded text-xs font-medium transition-colors ${
                                    selectedTags.has(tag) 
                                    ? 'bg-gray-200 text-gray-800' 
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <div className="mb-2">
                        <label className="block font-semibold mb-2 text-sm">Ajouter une catégorie personnalisée</label>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                className="flex-1 min-w-0 border border-gray-200 rounded p-2 lg:p-3 text-sm focus:outline-none focus:border-main-red"
                                placeholder="Nouveau tag"
                                value={customTag}
                                onChange={e => setCustomTag(e.target.value)}
                            />
                            <button 
                                onClick={handleAddCustomTag}
                                className="bg-main-red text-white w-12 rounded hover:opacity-90 flex items-center justify-center text-xl font-bold"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button className="text-main-red text-sm font-medium hover:underline mb-2">
                        + Ajouter un tag
                    </button>

                    <div className="mt-2 flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                        {Array.from(selectedTags).length === 0 && (
                            <p className="text-sm text-gray-400 italic">Aucune catégorie sélectionnée</p>
                        )}
                        {Array.from(selectedTags).map(tag => (
                            <button 
                                key={tag} 
                                onClick={() => handleTagToggle(tag)}
                                className="flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-red-50 hover:text-red-500 hover:border-red-200 border border-transparent transition-all group"
                            >
                                <span>{tag}</span>
                                <svg className="w-4 h-4 text-gray-400 group-hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>

        {/* Mobile Submit Button (at bottom) */}
        <button 
            onClick={handleSubmit} 
            className="w-full bg-main-red text-white px-8 py-3 rounded text-lg font-medium hover:opacity-90 disabled:opacity-50 mt-8 lg:hidden"
            disabled={loading || uploading}
        >
            {loading ? 'Ajout...' : 'Ajouter'}
        </button>
    </div>
  );
}
