import { useState, useEffect, useCallback } from 'react';
import Opening from './sections/Opening';
import HeroHall from './sections/HeroHall';
import GrandGallery from './sections/GrandGallery';
import TravelCollection from './sections/TravelCollection';
import NoteBeyond from './sections/NoteBeyond';
import FinalHall from './sections/FinalHall';
import Celebration from './sections/Celebration';
import Particles from './components/Particles';
import AudioControls from './components/AudioControls';
import { useAudio } from './hooks/useAudio';

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const { isPlaying, volume, play, toggle, setVolume } = useAudio();

  const handleEnter = useCallback(() => {
    setHasEntered(true);
    // Start audio after a brief delay for the exit animation
    setTimeout(() => {
      play();
    }, 800);
  }, [play]);

  // Handle initial scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-[#050505] min-h-screen">
      {/* Floating Particles - Global */}
      {hasEntered && <Particles />}

      {/* Audio Controls */}
      {hasEntered && (
        <AudioControls
          isPlaying={isPlaying}
          volume={volume}
          onToggle={toggle}
          onVolumeChange={setVolume}
        />
      )}

      {/* Opening Experience - Fixed overlay */}
      {!hasEntered && <Opening onEnter={handleEnter} />}

      {/* Main Museum Content */}
      <main className={`transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Hall */}
        <HeroHall hasEntered={hasEntered} />

        {/* Divider */}
        <div className="h-24 sm:h-32 flex items-center justify-center" style={{ background: '#050505' }}>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />
        </div>

        {/* Grand Gallery */}
        <GrandGallery />

        {/* Divider */}
        <div className="h-24 sm:h-32 flex items-center justify-center" style={{ background: '#050505' }}>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />
        </div>

        {/* Travel Collection */}
        <TravelCollection />

        {/* Divider */}
        <div className="h-24 sm:h-32 flex items-center justify-center" style={{ background: '#050505' }}>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />
        </div>

        {/* Note Beyond */}
        <NoteBeyond />

        {/* Divider */}
        <div className="h-24 sm:h-32 flex items-center justify-center" style={{ background: '#050505' }}>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />
        </div>

        {/* Final Grand Hall */}
        <FinalHall hasEntered={hasEntered} />

        {/* Divider */}
        <div className="h-24 sm:h-32 flex items-center justify-center" style={{ background: '#050505' }}>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />
        </div>

        {/* Final Celebration */}
        <Celebration />
      </main>
    </div>
  );
}

export default App;
