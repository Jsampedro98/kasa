import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-5 py-10 md:py-16">
      
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-main-red text-center mb-6">À propos</h1>
      
      <div className="max-w-3xl mx-auto text-center text-gray-700 mb-12 md:mb-16 space-y-4">
        <p>
          Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.
        </p>
        <p>
          Depuis notre création, nous mettons en relation des voyageurs en quête d'authenticité avec des hôtes
          passionnés qui aiment partager leur région et leurs bonnes adresses.
        </p>
      </div>

      {/* Banner Image */}
      <div className="relative w-full h-[400px] md:h-[400px] mb-12 md:mb-20 rounded-[25px] overflow-hidden">
        <Image
          src="/assets/about-banner.png"
          alt="Paysage de montagne"
          fill
          className="object-cover"
          priority
        />
        {/* Fallback color if image missing */}
        <div className="absolute inset-0 bg-gray-200 -z-10"></div> 
      </div>

      {/* Split Section - Flex Layout with 'contents' trick for Mobile reordering */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
        
        {/* Text Wrapper: 'contents' on mobile (ungroups children), 'flex-col' on desktop (groups them) */}
        <div className="contents md:flex md:flex-col md:w-1/2 md:gap-6">
            
            {/* Item 1: Mission (Mobile: Order 1) */}
            <div className="space-y-6 order-1">
              <h2 className="text-xl md:text-2xl font-bold text-main-red">Notre mission est simple :</h2>
              <ul className="space-y-4 text-gray-700">
                <li>1. Offrir une plateforme fiable et simple d'utilisation</li>
                <li>2. Proposer des hébergements variés et de qualité</li>
                <li>3. Favoriser des échanges humains et chaleureux entre hôtes et voyageurs</li>
              </ul>
            </div>

            {/* Item 3: Closing Text (Mobile: Order 3) */}
            <div className="order-3">
                <p className="text-main-red font-medium text-lg leading-relaxed">
                    Que vous cherchiez un appartement cosy en centre-ville, une maison
                    en bord de mer ou un chalet à la montagne, Kasa vous accompagne
                    pour que chaque séjour devienne un souvenir inoubliable.
                </p>
            </div>
        </div>

        {/* Item 2: Vertical Image (Mobile: Order 2) */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-[20px] overflow-hidden order-2 md:w-1/2">
           <Image
            src="/assets/red-house-about.png"
            alt="Maison moderne vitrée"
            fill
            className="object-cover"
           />
           <div className="absolute inset-0 bg-gray-200 -z-10"></div>
        </div>

      </div>

    </div>
  );
}
