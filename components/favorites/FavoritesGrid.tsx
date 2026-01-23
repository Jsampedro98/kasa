"use client";

import { Property } from '@/types';
import useFavorites from '@/hooks/useFavorites';
import PropertyCard from '@/components/home/PropertyCard';
import { useEffect, useState } from 'react';

interface FavoritesGridProps {
  properties: Property[];
}

export default function FavoritesGrid({ properties }: FavoritesGridProps) {
  const { favorites } = useFavorites();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[400px]"></div>; // Avoid hydration mismatch
  }

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));

  if (favoriteProperties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-xl text-gray-500 mb-6">Vous n'avez pas encore de favoris.</p>
        <a href="/" className="px-6 py-3 bg-main-red text-white rounded-[10px] hover:bg-[#842C16] transition-colors">
          Découvrir les logements
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
      {favoriteProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
