import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inscription - Kasa',
  description: 'Créez votre compte Kasa',
};

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <RegisterForm />
    </div>
  );
}
