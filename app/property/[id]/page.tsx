import { getProperty } from '@/lib/api';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyInfo from '@/components/property/PropertyInfo';
import HostWidget from '@/components/property/HostWidget';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage(props: PropertyPageProps) {
  const params = await props.params;
  const { id } = params;
  const property = await getProperty(id);

  if (!property) {
    notFound();
  }

  return (
    <main className="max-w-[1240px] mx-auto px-5 py-6 md:py-10">
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-black hover:underline mb-6 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Retour aux annonces
      </Link>

      {/* Main Layout: Left Col (Gallery + Info) | Right Col (Host) */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        
        {/* Left Column: Gallery & Property Info */}
        <div className="w-full md:w-[70%] flex flex-col gap-8">
             <PropertyGallery images={property.pictures} title={property.title} />
             
             {/* Property Info (White Block) */}
             <div className="bg-white rounded-[20px] p-6 md:p-10 shadow-sm border border-gray-100">
                <PropertyInfo property={property} />
             </div>
        </div>

        {/* Right Column: Host Widget */}
        <div className="w-full md:w-[30%]">
             <div className="sticky top-10">
                 <HostWidget host={property.host} rating={property.rating_avg} />
             </div>
        </div>
      </div>
    </main>
  );
}
