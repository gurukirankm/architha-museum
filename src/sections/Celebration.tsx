import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export default function Celebration() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Colors: gold, cream, white, soft rose
    const colors = [
      '#D4AF37', '#F5E6A3', '#E8E0D5', '#F5F5F5',
      '#D4AF37', '#C9A84C', '#E8D5A3', '#FFF8E7',
    ];

    // Initialize confetti particles when in view
    if (isInView) {
      particlesRef.current = Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5 - canvas.height * 0.5,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5,
        opacity: Math.random() * 0.5 + 0.5,
      }));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01; // slight gravity
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        // Draw confetti shape (rectangle)
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isInView) {
      animate();
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0804 0%, #050505 60%, #0d0a04 100%)',
      }}
    >
      {/* Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Gold ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="text-center px-6 relative z-20">
        {/* Decorative top line */}
        <motion.div
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1 }}
        />

        {/* Main Heading */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          style={{
            fontFamily: "'Playfair Display', serif",
            background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6A3 40%, #D4AF37 60%, #8B7355 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          HAPPY BIRTHDAY
          <br />
          ARCHITHA
        </motion.h2>

        {/* Decorative line */}
        <motion.div
          className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.6, duration: 1 }}
        />

        {/* Subtext */}
        <motion.p
          className="text-[#E8E0D5]/60 italic text-base sm:text-lg mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Thank you for visiting the museum.
        </motion.p>

        <motion.p
          className="text-[#D4AF37]/40 italic text-sm"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Until the next exhibition.
        </motion.p>

        {/* Bottom decorative element */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="w-8 h-[1px] bg-[#D4AF37]/20" />
          <div className="w-2 h-2 border border-[#D4AF37]/30 rotate-45" />
          <div className="w-8 h-[1px] bg-[#D4AF37]/20" />
        </motion.div>

        {/* Footer */}
        <motion.p
          className="mt-16 text-[#D4AF37]/20 text-[10px] tracking-[0.4em] uppercase"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 1 }}
        >
          THE ARCHITHA MUSEUM &middot; EST. 2025
        </motion.p>
      </div>

      {/* Bottom vignette */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(5,5,5,0.5) 0%, transparent 100%)',
        }}
      />
    </section>
  );
}
