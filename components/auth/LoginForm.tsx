'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la connexion');
      }

      login(data.token, data.user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white p-8 md:p-12 rounded-lg shadow-sm mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold text-main-red mb-4">Heureux de vous revoir</h1>
      <p className="text-gray-600 mb-8 text-sm md:text-base">
        Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques.
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="text-left flex flex-col gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Adresse email
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-main-red focus:border-main-red outline-none transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-main-red focus:border-main-red outline-none transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-main-red text-white font-bold py-3 px-4 rounded hover:opacity-90 transition-opacity mt-4"
        >
          Se connecter
        </button>
      </form>

      <div className="mt-6 flex flex-col gap-2">
        <Link href="/auth/request-reset" className="text-main-red hover:underline text-sm font-medium">
          Mot de passe oublié
        </Link>
        <div className="text-sm text-main-red">
          Pas encore de compte ?{' '}
          <Link href="/register" className="font-bold hover:underline">
            Inscrivez-vous
          </Link>
        </div>
      </div>
    </div>
  );
}
