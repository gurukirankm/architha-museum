import { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';

interface AudioControlsProps {
  isPlaying: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (vol: number) => void;
}

export default function AudioControls({ isPlaying, volume, onToggle, onVolumeChange }: AudioControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="fixed bottom-6 right-6 z-[1001] flex items-center gap-3"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Volume Slider */}
      <div 
        className={`
          flex items-center gap-2 bg-black/60 backdrop-blur-xl 
          border border-[#D4AF37]/30 rounded-full px-4 py-2
          transition-all duration-500 ease-out
          ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
        `}
      >
        <button
          onClick={() => onVolumeChange(volume === 0 ? 0.5 : 0)}
          className="text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
        >
          {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-20 h-1 appearance-none bg-[#D4AF37]/20 rounded-full outline-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D4AF37]"
        />
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={onToggle}
        className={`
          w-12 h-12 rounded-full flex items-center justify-center
          border border-[#D4AF37]/40 bg-black/60 backdrop-blur-xl
          text-[#D4AF37] hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10
          transition-all duration-300 hover:scale-105
          ${isPlaying ? 'shadow-[0_0_20px_rgba(212,175,55,0.15)]' : ''}
        `}
      >
        {isPlaying ? (
          <Pause size={18} />
        ) : (
          <Play size={18} className="ml-0.5" />
        )}
      </button>

      {/* Music Icon Indicator */}
      <div 
        className={`
          w-8 h-8 rounded-full flex items-center justify-center
          border border-[#D4AF37]/20 bg-black/40 backdrop-blur-xl
          ${isPlaying ? 'animate-pulse' : ''}
        `}
      >
        <Music size={12} className={`${isPlaying ? 'text-[#D4AF37]' : 'text-[#D4AF37]/40'}`} />
      </div>
    </div>
  );
}
