import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/layout/MainLayout';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kasa - Location d\'appartements entre particuliers',
  description: 'Site de location d\'appartements entre particuliers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased text-noir bg-light-orange flex flex-col min-h-screen`}>
        <AuthProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </AuthProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Kasa',
              url: 'http://localhost:3000',
              logo: 'http://localhost:3000/logo.png', // Assuming you have a logo served
              description: 'Site de location d\'appartements entre particuliers',
            }),
          }}
        />
      </body>
    </html>
  );
}
