import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connexion - Kasa',
  description: 'Connectez-vous à votre compte Kasa',
};

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <LoginForm />
    </div>
  );
}
