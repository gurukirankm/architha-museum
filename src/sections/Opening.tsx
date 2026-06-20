import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OpeningProps {
  onEnter: () => void;
}

export default function Opening({ onEnter }: OpeningProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    onEnter();
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #050505 70%)',
          }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: 'blur(15px)',
          }}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Subtle vignette */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 150px rgba(0,0,0,0.8)',
            }}
          />

          {/* Gold dust particles background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#D4AF37]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.4 + 0.1,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: Math.random() * 4 + 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <motion.div
            className="text-center px-6 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            {/* Welcome to */}
            <motion.p
              className="text-[#D4AF37]/80 tracking-[0.4em] text-xs sm:text-sm uppercase mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Welcome to
            </motion.p>

            {/* Main Title */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6A3 40%, #D4AF37 60%, #8B7355 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 60px rgba(212, 175, 55, 0.15)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              THE ARCHITHA<br />MUSEUM
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-[#E8E0D5]/70 italic text-base sm:text-lg mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              A Special Birthday Exhibition
            </motion.p>

            {/* Est. Date */}
            <motion.p
              className="text-[#D4AF37]/60 tracking-[0.3em] text-xs sm:text-sm uppercase mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Est. 09 July 2005
            </motion.p>

            {/* Music Note */}
            <motion.p
              className="text-[#D4AF37]/40 text-xs tracking-wider mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              ♪ Museum Soundtrack Available
            </motion.p>

            {/* Enter Button */}
            <motion.button
              onClick={handleEnter}
              className="museum-btn px-10 py-4 text-sm sm:text-base uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Enter the Exhibition</span>
            </motion.button>
          </motion.div>

          {/* Decorative corners */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-[#D4AF37]/20 pointer-events-none" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-[#D4AF37]/20 pointer-events-none" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-[#D4AF37]/20 pointer-events-none" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-[#D4AF37]/20 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
