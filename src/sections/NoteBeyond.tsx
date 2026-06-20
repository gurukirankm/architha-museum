import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { notePhoto } from '../data/photos';

export default function NoteBeyond() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24 sm:py-32 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0806 0%, #050505 70%)',
      }}
    >
      {/* Warm spotlight background */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 60%)',
        }}
      />

      {/* Ambient glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(139,115,85,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Label */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#D4AF37]/40 text-[10px] tracking-[0.5em] uppercase">
            A Private Room
          </p>
        </motion.div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Featured Photo */}
          <motion.div
            className="w-full md:w-2/5 flex-shrink-0"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <div className="museum-frame p-2 sm:p-3 max-w-xs mx-auto md:mx-0">
              <img
                src={notePhoto.src}
                alt="Featured"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* The Note Plaque */}
          <motion.div
            className="w-full md:w-3/5"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <div className="museum-plaque px-6 sm:px-8 py-8 sm:py-10">
              {/* Heading */}
              <h3 
                className="text-xl sm:text-2xl text-[#D4AF37] mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                To Archuuu,
              </h3>

              {/* Body */}
              <div 
                className="space-y-4 text-[#E8E0D5]/80 text-sm sm:text-base leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <p>
                  Most exhibits in this museum are photos, memories, and moments.
                </p>
                <p>
                  But there is one thing that deserves its own room.
                </p>
                <p>
                  When my dad passed away, life was not easy.
                </p>
                <p>
                  There were many difficult days, and honestly, I did not always know how to handle them.
                </p>
                <p>
                  During that time, your support meant more than you probably realize.
                </p>
                <p>
                  You were there when things were heavy, and that is something I will always remember.
                </p>
                <p>
                  This website is mainly for your birthday, but I wanted to keep one small corner dedicated to saying thank you.
                </p>
                <p>
                  Not for anything grand.
                </p>
                <p>
                  Just for being there when it mattered.
                </p>
                <p className="pt-2">
                  So before this museum closes for the day:
                </p>
                <p className="text-[#D4AF37] italic">
                  Thank you, Archuuu.
                </p>
                <p className="text-[#D4AF37] italic">
                  And Happy Birthday
                </p>
              </div>

              {/* Signoff */}
              <div className="mt-8 pt-6 border-t border-[#D4AF37]/10">
                <p className="text-[#D4AF37]/40 text-sm italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  —
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
