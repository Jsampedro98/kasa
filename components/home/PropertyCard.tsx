"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types';
import useFavorites from '@/hooks/useFavorites';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to detail page
    e.stopPropagation(); // Stop bubbling just in case
    toggleFavorite(property.id);
  };

  return (
    <Link href={`/property/${property.id}`} className="block group mx-auto w-full max-w-[355px]">
      <article className="flex flex-col w-full h-[552px] cursor-pointer bg-white rounded-[20px] overflow-hidden shadow-sm">
        <div className="relative w-full h-[376px] bg-gray-200">
          <Image
            src={property.cover}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <button 
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 bg-white w-8 h-8 flex justify-center items-center rounded-[8px] shadow-sm z-10 hover:bg-gray-50 transition-colors"
            aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          >
            {liked ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-main-red">
                   <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            )}
          </button>
        </div>

        <div className="flex flex-col px-4 py-3 gap-1 flex-1">
          <h2 className="font-semibold text-noir text-lg truncate">{property.title}</h2>
          <p className="text-gray-500 text-sm mb-2">{property.location}</p>
          <p className="text-noir text-sm mt-auto">
            <span className="font-bold">{property.price_per_night}€</span>
            <span className="font-normal text-noir"> par nuit</span>
          </p>
        </div>
      </article>
    </Link>
  );
}
