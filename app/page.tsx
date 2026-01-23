import { getProperties } from '@/lib/api';
import Banner from '@/components/home/Banner';
import PropertyCard from '@/components/home/PropertyCard';

export default async function Home() {
  const properties = await getProperties();

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-center mb-8 max-w-2xl px-4">
        <h1 className="text-[32px] font-bold text-main-red mb-4">
          Chez vous, partout et ailleurs
        </h1>
        <p className="text-noir text-[14px]">
          Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.
        </p>
      </div>

      <Banner />
      
      <section className="w-full mb-20">
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full max-w-[355px] md:max-w-[734px] lg:max-w-[1113px] mx-auto">
            {properties.slice(0, 12).map((property, index) => (
              <div key={property.id} className={index >= 6 ? 'hidden md:block' : 'block'}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p>Aucune propriété trouvée.</p>
            <p className="text-sm mt-2">Vérifiez que le backend tourne sur le port 4000.</p>
          </div>
        )}
      </section>

      <section className="w-full mb-20 px-4">
        <div className="bg-white rounded-[25px] py-10 w-full max-w-[1440px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-[22px] font-bold text-noir mb-2">Comment ça marche ?</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto px-4">
              Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage professionnel,
              Kasa vous aide à trouver un lieu qui vous ressemble.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center max-w-[900px] mx-auto">
            <div className="bg-[#842C16] text-white px-6 rounded-[20px] w-[245px] aspect-square flex flex-col justify-center transition-transform hover:scale-[1.01]">
              <h3 className="font-bold text-xl mb-3">Recherchez</h3>
              <p className="text-sm font-medium opacity-90 leading-relaxed">
                Entrez votre destination, vos dates et laissez Kasa faire le reste
              </p>
            </div>
            
            <div className="bg-[#842C16] text-white px-6 rounded-[20px] w-[245px] aspect-square flex flex-col justify-center transition-transform hover:scale-[1.01]">
               <h3 className="font-bold text-xl mb-3">Réservez</h3>
              <p className="text-sm font-medium opacity-90 leading-relaxed">
                Profitez d’une plateforme sécurisée et de profils d’hôtes vérifiés.
              </p>
            </div>

            <div className="bg-[#842C16] text-white px-6 rounded-[20px] w-[245px] aspect-square flex flex-col justify-center transition-transform hover:scale-[1.01]">
               <h3 className="font-bold text-xl mb-3">Vivez l’expérience</h3>
              <p className="text-sm font-medium opacity-90 leading-relaxed">
                Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
