import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-[120px] md:text-[200px] font-bold text-main-red leading-none">404</h1>
      
      <p className="text-xl md:text-2xl text-main-red mb-16 md:mb-24 max-w-[600px]">
        Il semble que la page que vous cherchez ait pris des vacances... ou n’ait jamais existé.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-[300px]">
        <Link 
            href="/" 
            className="w-full py-3 bg-brown-800 hover:bg-brown-900 text-white rounded-[10px] font-medium transition-colors bg-[#842C16]"
        >
            Accueil
        </Link>
        <Link 
            href="/" 
            className="w-full py-3 bg-brown-800 hover:bg-brown-900 text-white rounded-[10px] font-medium transition-colors bg-[#842C16]"
        >
            Logements
        </Link>
      </div>
    </div>
  );
}
