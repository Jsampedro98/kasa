import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-blanc py-6 border-t border-gris-light mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex justify-between items-center">

        <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">

          <Image
            src="/assets/house-logo.svg" 
            alt="Kasa House Logo"
            fill
            className="object-contain"
          />
        </div>
        
        <p className="text-gris-dark text-xs md:text-base font-medium text-right">
          © 2025 Kasa. All rights reserved
        </p>
      </div>
    </footer>
  );
}
