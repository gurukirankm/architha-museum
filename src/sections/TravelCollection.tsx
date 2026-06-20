import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { travelPhotos } from '../data/photos';
import { MapPin } from 'lucide-react';

export default function TravelCollection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Background decorative text */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        <motion.p
          className="text-[8rem] sm:text-[12rem] md:text-[16rem] font-bold uppercase tracking-wider"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px rgba(212, 175, 55, 0.06)',
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
        >
          WANDERLUST
        </motion.p>
      </div>

      {/* Section Header */}
      <div className="text-center mb-16 sm:mb-20 px-6 relative z-10">
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <MapPin size={16} className="text-[#D4AF37]/50" />
          <p className="text-[#D4AF37]/50 text-[10px] tracking-[0.5em] uppercase">
            Wing B — The Travel Collection
          </p>
        </motion.div>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold museum-gold-text"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          TRAVEL COLLECTION
        </motion.h2>
        <motion.div
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mx-auto mt-6"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </div>

      {/* Travel Grid - Horizontal showcase */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                delay: 0.3 + index * 0.15, 
                duration: 0.7,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`
                museum-frame p-2 sm:p-3 transition-all duration-500
                ${hoveredIndex === index ? 'border-[#D4AF37]/60 shadow-[0_0_40px_rgba(212,175,55,0.12)]' : ''}
              `}>
                <div className="relative overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Caption on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="museum-plaque px-4 py-2">
                      <p className="text-[#D4AF37]/50 text-[9px] tracking-[0.3em] uppercase mb-0.5">
                        Destination {index + 1}
                      </p>
                      <p 
                        className="text-[#E8E0D5] italic text-xs"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative line */}
      <motion.div
        className="max-w-xs mx-auto mt-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 1, duration: 1.5 }}
      />
    </section>
  );
}
