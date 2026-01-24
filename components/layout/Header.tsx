'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

/**
 * Global Header component.
 * Features:
 * - Responsive navigation (desktop/mobile).
 * - Authentication state handling (login/logout).
 * - Mobile burger menu.
 * - Active link highlighting.
 */
export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className={`relative w-full flex justify-center md:pt-8 bg-blanc md:bg-transparent shadow-sm md:shadow-none transition-all duration-300 ${isMenuOpen ? 'h-auto pb-4' : 'h-[70px] md:h-auto pb-0 md:pb-4'}`}>
      

      <div className={`bg-blanc md:rounded-[30px] md:shadow-sm w-full md:w-[95%] md:max-w-[1200px] px-6 md:px-10 relative flex flex-col md:flex-row md:items-center md:justify-between transition-all duration-300 ${isMenuOpen ? 'h-auto' : 'h-[70px] md:h-[90px]'}`}>
        

        <div className="md:hidden w-full flex justify-between items-center h-[70px] flex-shrink-0">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <Image
              src="/assets/house-logo.svg"
              alt="Kasa House Logo"
              width={45}
              height={40}
              className="w-10" 
              priority
            />
          </Link>
          
          <button 
            className="text-noir p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? (
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>


        <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:block">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              alt="Kasa Logo"
              width={140}
              height={45}
              className="w-36"
              priority
            />
          </Link>
        </div>


        <nav className="hidden md:flex gap-10 items-center text-base font-medium">
          <Link
            href="/"
            className={`hover:text-main-red transition-colors ${
              pathname === '/' ? 'text-noir' : 'text-gray-500'
            }`}
          >
            Accueil
          </Link>
          <Link
            href="/about"
            className={`hover:text-main-red transition-colors ${
              pathname === '/about' ? 'text-noir' : 'text-gray-500'
            }`}
          >
            À propos
          </Link>
        </nav>


        <div className="hidden md:flex items-center gap-6 text-main-red font-medium text-sm">
          {mounted && isAuthenticated && (
            <Link href="/host/add" className="hover:underline whitespace-nowrap">
              +Ajouter un logement
            </Link>
          )}
          <div className="flex gap-4 items-center border-l border-gray-200 pl-6 h-5">
            {mounted && isAuthenticated ? (
              <>
                <Link href="/host/properties" aria-label="Mes logements" className="hover:scale-110 transition text-noir hover:text-main-red">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </Link>
                <Link href="/favorites" aria-label="Favoris" className="hover:scale-110 transition text-noir hover:text-main-red">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </Link>
                <Link href="/messages" aria-label="Messages" className="hover:scale-110 transition text-noir hover:text-main-red">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                </Link>
                
                <Link href="/profile" aria-label="Mon profil" className="hover:scale-110 transition text-noir hover:text-main-red">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                   </svg>
                </Link>

                <div className="flex items-center gap-3 border-l border-gray-200 pl-4 ml-2">
                   <button onClick={logout} aria-label="Se déconnecter" className="hover:scale-110 transition text-noir hover:text-main-red">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                     </svg>
                   </button>
                </div>
              </>
            ) : (
                <Link href="/login" aria-label="Se connecter" className="hover:scale-110 transition text-noir hover:text-main-red flex items-center gap-2">
                  <span className="text-sm font-medium">Se connecter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </Link>
            )}
          </div>
        </div>


        <div className={`md:hidden flex flex-col gap-6 pt-4 pb-6 w-full ${isMenuOpen ? 'block' : 'hidden'}`}>
          <nav className="flex flex-col gap-4 text-lg text-noir border-t border-gray-100 pt-4">
              <Link href="/" className="py-2" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
              <Link href="/about" className="py-2" onClick={() => setIsMenuOpen(false)}>À propos</Link>
              
              {mounted && isAuthenticated ? (
                <>
                  <Link href="/favorites" className="py-2" onClick={() => setIsMenuOpen(false)}>Favoris</Link>
                  <Link href="/host/properties" className="py-2" onClick={() => setIsMenuOpen(false)}>Mes logements</Link>
                  <Link href="/messages" className="py-2" onClick={() => setIsMenuOpen(false)}>Messagerie</Link>
                  <Link href="/profile" className="py-2 font-bold text-main-red" onClick={() => setIsMenuOpen(false)}>
                    Mon profil ({user?.name})
                  </Link>
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="py-2 text-left">Se déconnecter</button>
                </>
              ) : (
                <Link href="/login" className="py-2" onClick={() => setIsMenuOpen(false)}>Se connecter</Link>
              )}
          </nav>

          {mounted && isAuthenticated && (
            <Link 
              href="/host/add" 
              className="bg-main-red text-white text-center py-3 rounded-full font-medium w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Ajouter un logement
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
