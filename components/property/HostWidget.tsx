import { Property } from '@/types';
import Image from 'next/image';

interface HostWidgetProps {
  host: Property['host'];
  rating: number;
}

export default function HostWidget({ host, rating }: HostWidgetProps) {
  return (
    <div className="bg-white rounded-[15px] p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium mb-4">Votre hôte</h3>
        
        <div className="flex items-center gap-4 mb-6">
            <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden">
                <Image src={host.picture} alt={host.name} fill className="object-cover" />
            </div>
            <div>
                <p className="text-lg font-medium text-noir">{host.name}</p>
                <div className="flex items-center gap-1 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-main-red">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.17c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-gray-800">{rating}</span>
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-3">
            <button className="w-full py-3 bg-brown-800 hover:bg-brown-900 text-white rounded-[10px] font-medium transition-colors bg-[#842C16]">
                Contacter l'hôte
            </button>
            <button className="w-full py-3 bg-brown-800 hover:bg-brown-900 text-white rounded-[10px] font-medium transition-colors bg-[#842C16]">
                Envoyer un message
            </button>
        </div>
    </div>
  );
}
