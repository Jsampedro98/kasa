'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileForm from '@/components/profile/ProfileForm';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted && !isAuthenticated) {
        router.push('/login');
    }
  }, [isAuthenticated, mounted, router]);

  if (!mounted) return <div className="min-h-screen"></div>;
  if (!user) return null;

  return (
    <main className="max-w-[1240px] mx-auto px-5 py-10 min-h-[calc(100vh-200px)]">
        <ProfileForm />
    </main>
  );
}
