import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { galleryPhotos, travelPhotos } from '../data/photos';
import type { Photo } from '../data/photos';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GrandGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-10%' });
  const [lightbox, setLightbox] = useState<{ photo: Photo; index: number; all: Photo[] } | null>(null);

  // Combine gallery and travel photos for the full collection
  const allGalleryPhotos = [...galleryPhotos, ...travelPhotos];

  const openLightbox = (photo: Photo, index: number) => {
    setLightbox({ photo, index, all: allGalleryPhotos });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = '';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!lightbox) return;
    const newIndex = direction === 'next'
      ? (lightbox.index + 1) % lightbox.all.length
      : (lightbox.index - 1 + lightbox.all.length) % lightbox.all.length;
    setLightbox({ ...lightbox, photo: lightbox.all[newIndex], index: newIndex });
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32"
      style={{ background: '#050505' }}
    >
      {/* Section Title */}
      <div ref={titleRef} className="text-center mb-16 sm:mb-20 px-6">
        <motion.p
          className="text-[#D4AF37]/50 text-[10px] tracking-[0.5em] uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Wing A — The Collection
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold museum-gold-text"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          THE GRAND GALLERY
        </motion.h2>
        <motion.div
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mx-auto mt-6"
          initial={{ scaleX: 0 }}
          animate={titleInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </div>

      {/* Masonry Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="masonry-grid">
          {allGalleryPhotos.map((photo, index) => (
            <GalleryFrame
              key={photo.id}
              photo={photo}
              index={index}
              onClick={() => openLightbox(photo, index)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[200] lightbox-overlay flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors z-10"
            >
              <X size={28} />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
              className="absolute left-4 sm:left-8 text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors z-10"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
              className="absolute right-4 sm:right-8 text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors z-10"
            >
              <ChevronRight size={36} />
            </button>

            {/* Image */}
            <motion.div
              className="max-w-4xl max-h-[80vh] mx-auto px-16"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="museum-frame p-2 sm:p-4">
                <img
                  src={lightbox.photo.src}
                  alt={lightbox.photo.caption}
                  className="max-h-[70vh] w-auto mx-auto object-contain"
                />
              </div>
              <div className="museum-plaque mt-4 px-6 py-3 text-center">
                <p className="text-[#D4AF37]/50 text-[10px] tracking-[0.3em] uppercase mb-1">
                  Exhibit {lightbox.index + 1} of {allGalleryPhotos.length}
                </p>
                <p 
                  className="text-[#E8E0D5] italic text-sm"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {lightbox.photo.caption}
                </p>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#D4AF37]/40 text-xs tracking-wider">
              {lightbox.index + 1} / {allGalleryPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryFrame({ 
  photo, 
  index, 
  onClick 
}: { 
  photo: Photo; 
  index: number; 
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="masonry-item"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: (index % 3) * 0.15,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
    >
      <div
        className="group cursor-pointer"
        onClick={onClick}
      >
        {/* Frame */}
        <div className="museum-frame p-2 sm:p-3 transition-all duration-500 group-hover:border-[#D4AF37]/70 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
          <div className="relative overflow-hidden">
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
          </div>
        </div>

        {/* Caption Plaque */}
        <div className="mt-3 px-2">
          <div className="museum-plaque px-4 py-2.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-[#D4AF37]/40 text-[9px] tracking-[0.3em] uppercase mb-0.5">
              Exhibit {index + 1}
            </p>
            <p 
              className="text-[#E8E0D5]/80 italic text-xs leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {photo.caption}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
