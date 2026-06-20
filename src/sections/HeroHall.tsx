import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { heroPhoto } from '../data/photos';

interface HeroHallProps {
  hasEntered: boolean;
}

export default function HeroHall({ hasEntered }: HeroHallProps) {
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
        initial={{ opacity: 0, scale: 1.2 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <div className="relative w-full max-w-4xl mx-auto px-6">
          {/* Museum Frame */}
          <div className="museum-frame p-3 sm:p-4 md:p-6">
            <div className="relative overflow-hidden">
              <img
                src={heroPhoto.src}
                alt="Hero Exhibit"
                className="w-full h-auto object-cover"
                style={{
                  maxHeight: '75vh',
                }}
              />
              {/* Subtle image overlay for depth */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, transparent 60%, rgba(5,5,5,0.4) 100%)',
                }}
              />
            </div>
          </div>

          {/* Museum Plaque */}
          <motion.div
            className="museum-plaque mt-6 mx-auto max-w-lg px-6 py-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <p className="text-[#D4AF37]/60 text-[10px] tracking-[0.4em] uppercase mb-2">
              Exhibit I — The Centerpiece
            </p>
            <p 
              className="text-[#E8E0D5] italic text-sm sm:text-base"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {heroPhoto.caption}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Mouse Spotlight Effect */}
      <div
        className="absolute inset-0 pointer-events-none z-10 hidden md:block"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, transparent 0%, rgba(5,5,5,0.4) 100%)`,
        }}
      />

      {/* Floating label */}
      <motion.div
        className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p className="text-[#D4AF37]/40 text-[10px] tracking-[0.5em] uppercase">
          Hero Hall
        </p>
      </motion.div>

      {/* Ambient glow behind frame */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)',
        }}
      />
    </section>
  );
}
