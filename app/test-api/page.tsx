import { getProperties } from '@/lib/api';

export default async function TestApiPage() {
  const properties = await getProperties();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test API</h1>
      <p className="mb-4">Nombre de propriétés récupérées : {properties.length}</p>
      <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-[500px] text-xs">
        {JSON.stringify(properties, null, 2)}
      </pre>
    </div>
  );
}
