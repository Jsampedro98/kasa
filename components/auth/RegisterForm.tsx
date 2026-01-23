'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!acceptTerms) {
      setError("Veuillez accepter les conditions générales d'utilisation.");
      return;
    }

    try {
      const fullName = `${firstName} ${lastName}`.trim();

      const response = await fetch('http://127.0.0.1:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: fullName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'inscription");
      }

      login(data.token, data.user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white p-6 sm:p-10 rounded-lg mx-auto mt-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-main-red mb-4 text-center">
        Rejoignez la communauté Kasa
      </h1>
      <p className="text-gray-600 mb-8 text-sm sm:text-base text-center">
        Créez votre compte et commencez à voyager autrement : réservez des logements uniques,
        découvrez de nouvelles destinations et partagez vos propres lieux avec d’autres voyageurs.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative mb-6 text-sm" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        <div>
          <label htmlFor="lastname" className="block text-sm font-semibold text-gray-800 mb-2">
            Nom
          </label>
          <input
            type="text"
            id="lastname"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-1 focus:ring-main-red focus:border-main-red outline-none transition-colors"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="firstname" className="block text-sm font-semibold text-gray-800 mb-2">
            Prénom
          </label>
          <input
            type="text"
            id="firstname"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-1 focus:ring-main-red focus:border-main-red outline-none transition-colors"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
            Adresse email
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-1 focus:ring-main-red focus:border-main-red outline-none transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-1 focus:ring-main-red focus:border-main-red outline-none transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            id="terms"
            className="w-5 h-5 text-main-red border-gray-300 rounded focus:ring-main-red"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
          />
          <label htmlFor="terms" className="text-sm text-gray-500">
            J'accepte les <Link href="#" className="underline">conditions générales d'utilisation</Link>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-main-red text-white font-bold py-3 px-4 rounded-full sm:rounded hover:opacity-90 transition-opacity mt-4 text-base"
        >
          S'inscrire
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-main-red">
        Déjà membre ?{' '}
        <Link href="/login" className="font-bold hover:underline">
          Se connecter
        </Link>
      </div>
    </div>
  );
}
