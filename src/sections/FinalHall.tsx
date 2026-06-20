import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { finalPhoto } from '../data/photos';

interface FinalHallProps {
  hasEntered: boolean;
}

export default function FinalHall({ hasEntered }: FinalHallProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    if (hasEntered) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hasEntered]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: '#050505',
      }}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, filter: 'brightness(0)' }}
        animate={isInView ? { opacity: 1, filter: 'brightness(1)' } : {}}
        transition={{ duration: 1.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <div className="relative w-full max-w-4xl mx-auto px-6">
          {/* Section Label */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-[#D4AF37]/40 text-[10px] tracking-[0.5em] uppercase">
              The Climax
            </p>
          </motion.div>

          {/* Museum Frame */}
          <div className="museum-frame p-3 sm:p-4 md:p-6">
            <div className="relative overflow-hidden">
              <img
                src={finalPhoto.src}
                alt="Final Exhibit"
                className="w-full h-auto object-cover"
                style={{
                  maxHeight: '70vh',
                }}
              />
              {/* Subtle overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, transparent 50%, rgba(5,5,5,0.3) 100%)',
                }}
              />
            </div>
          </div>

          {/* Museum Plaque */}
          <motion.div
            className="museum-plaque mt-6 mx-auto max-w-xl px-6 py-5 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 1 }}
          >
            <p className="text-[#D4AF37]/60 text-[10px] tracking-[0.4em] uppercase mb-2">
              THE FINAL EXHIBIT
            </p>
            <p 
              className="text-[#E8E0D5] italic text-sm sm:text-base mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {finalPhoto.caption}
            </p>
            <p 
              className="text-[#D4AF37]/70 text-xs"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Some memories deserve more than a frame.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Mouse Spotlight Effect */}
      <div
        className="absolute inset-0 pointer-events-none z-10 hidden md:block"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, transparent 0%, rgba(5,5,5,0.35) 100%)`,
        }}
      />

      {/* Ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Decorative corners - larger for finale */}
      <motion.div 
        className="absolute top-6 left-6 w-24 h-24 border-l border-t border-[#D4AF37]/15 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
      />
      <motion.div 
        className="absolute top-6 right-6 w-24 h-24 border-r border-t border-[#D4AF37]/15 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
      />
      <motion.div 
        className="absolute bottom-6 left-6 w-24 h-24 border-l border-b border-[#D4AF37]/15 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
      />
      <motion.div 
        className="absolute bottom-6 right-6 w-24 h-24 border-r border-b border-[#D4AF37]/15 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
      />
    </section>
  );
}
