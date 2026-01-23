'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullscreen = pathname?.startsWith('/messages');

  if (isFullscreen) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-5 py-10 sm:px-10">
        {children}
      </main>
      <Footer />
    </>
  );
}
