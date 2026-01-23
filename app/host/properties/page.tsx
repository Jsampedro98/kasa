
import { getProperties } from '@/lib/api';
import MyPropertiesGrid from '@/components/host/MyPropertiesGrid';

export default async function MyPropertiesPage() {
  const properties = await getProperties();

  return (
    <main className="max-w-[1240px] mx-auto px-5 py-10">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-main-red mb-4">Mes logements</h1>
        <div className="max-w-2xl mx-auto space-y-2 text-gray-700">
            <p>Gérez ici toutes vos annonces Kasa.</p>
        </div>
      </div>
      <MyPropertiesGrid properties={properties} />
    </main>
  );
}
