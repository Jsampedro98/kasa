"use client";

import { Property } from '@/types';
import { useAuth } from '@/context/AuthContext';
import PropertyCard from '@/components/home/PropertyCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface MyPropertiesGridProps {
  properties: Property[];
}

export default function MyPropertiesGrid({ properties }: MyPropertiesGridProps) {
  const { user, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (mounted && !isAuthenticated) {
        router.push('/login');
    }
  }, [isAuthenticated, mounted, router]);

  if (!mounted) {
    return <div className="min-h-[400px]"></div>; // Avoid hydration mismatch
  }

  if (!isAuthenticated || !user) {
      return null; // Will redirect
  }

  const myProperties = properties.filter(p => String(p.host.id) === String(user.id));

  if (myProperties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-xl text-gray-500 mb-6">Vous n'avez pas encore publié d'annonce.</p>
        <Link href="/host/add" className="px-6 py-3 bg-main-red text-white rounded-[10px] hover:bg-[#842C16] transition-colors">
          Créer ma première annonce
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
      {myProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
