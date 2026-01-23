import { getProperties } from '@/lib/api';
import FavoritesGrid from '@/components/favorites/FavoritesGrid';

export default async function FavoritesPage() {
  const properties = await getProperties();

  return (
    <main className="max-w-[1240px] mx-auto px-5 py-10">
      
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-main-red mb-4">Vos favoris</h1>
        
        <div className="max-w-2xl mx-auto space-y-2 text-gray-700">
            <p>Retrouvez ici tous les logements que vous avez aimés.</p>
            <p>Prêts à réserver ? Un simple clic et votre prochain séjour est en route.</p>
        </div>
      </div>

      <FavoritesGrid properties={properties} />
    </main>
  );
}
