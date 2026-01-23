import Link from 'next/link';
import Tag from '@/components/ui/Tag';
import { Property } from '@/types';

interface PropertyInfoProps {
  property: Property;
}


export default function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Title & Location */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-noir">{property.title}</h1>
        <div className="flex items-center gap-2 text-gray-500">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-400">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
             </svg>
            <p className="text-sm md:text-base">{property.location}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
        {property.description}
      </p>

      {/* Equipments */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Équipements</h3>
        <div className="grid grid-cols-3 gap-1 max-w-[400px] md:max-w-[500px]">
            {property.equipments.map((item, index) => (
                <Tag key={index} label={item} />
            ))}
        </div>
      </div>

      {/* Categories / Tags */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Catégorie</h3>
        <div className="grid grid-cols-3 gap-1 max-w-[400px] md:max-w-[500px]">
            {property.tags.map((tag, index) => (
                <Tag key={index} label={tag} />
            ))}
        </div>
      </div>
    </div>
  );
}
