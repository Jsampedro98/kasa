"use client";

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

interface PropertyGalleryProps {
  /** Array of image URLs to display */
  images: string[];
  /** Title of the property (for alt text) */
  title: string;
}

/**
 * Displays a gallery of property images.
 * Desktop: Bento-grid layout with lightbox.
 * Mobile: Responsive grid.
 * Features:
 * - Keyboard navigation (Arrow keys, Escape)
 * - Lightbox mode with infinite loop
 * - Optimized next/image usage
 */
export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);


  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, nextImage, prevImage]);

  if (!images || images.length === 0) return null;


  const displayImages = images.slice(0, 5);

  return (
    <div className="w-full relative">
      <div className="grid grid-cols-3 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-2 md:gap-4 h-[400px] md:h-[500px] rounded-[15px] md:rounded-[20px] overflow-hidden">
        {displayImages.map((img, index) => {
           let className = "relative w-full h-full bg-gray-200 cursor-pointer overflow-hidden";
           
           if (index === 0) {
             className += " col-span-3 row-span-3 md:col-span-2 md:row-span-2";
           } 
           else if (index >= 1 && index <= 3) {
             className += " col-span-1 row-span-1 md:col-span-1 md:row-span-1";
           }
           else if (index === 4) {
             className += " hidden md:block md:col-span-1 md:row-span-1";
           }

           return (
             <div key={index} className={className} onClick={() => openLightbox(index)}>
                 <Image
                  src={img}
                  alt={`${title} - image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "25vw"}
                  priority={index === 0}
                  unoptimized={(img.startsWith('http://') || img.startsWith('https://')) && img.includes('localhost')}
                />
             </div>
           );
        })}
      </div>


      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex justify-center items-center">

            <button 
                onClick={closeLightbox} 
                className="absolute top-10 right-10 text-white z-50 p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close lightbox"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 md:w-12 md:h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>


            {images.length > 1 && (
                <button 
                    onClick={(e) => { e.stopPropagation(); prevImage(); }} 
                    className="absolute left-4 md:left-10 text-white z-50 p-2 hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Previous image"
                >
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 md:w-16 md:h-16">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
            )}


            <div className="relative w-full h-full md:w-[85%] md:h-[85%] flex justify-center items-center pointer-events-none">
                 <div className="relative w-full h-full"> 
                   <Image 
                        key={currentIndex}
                        src={images[currentIndex]} 
                        alt={`Slide ${currentIndex + 1}`} 
                        fill 
                        className="object-contain pointer-events-auto transition-opacity duration-500 animate-fadeIn"
                        priority
                        unoptimized={(images[currentIndex].startsWith('http://') || images[currentIndex].startsWith('https://')) && images[currentIndex].includes('localhost')}
                   />
                 </div>
            </div>


             {images.length > 1 && (
                <button 
                    onClick={(e) => { e.stopPropagation(); nextImage(); }} 
                    className="absolute right-4 md:right-10 text-white z-50 p-2 hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Next image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 md:w-16 md:h-16">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            )}


            <div className="absolute bottom-10 text-white font-medium text-lg">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
      )}
    </div>
  );
}
