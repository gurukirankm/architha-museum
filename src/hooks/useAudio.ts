import { useRef, useState, useCallback, useEffect } from 'react';

interface AudioState {
  isPlaying: boolean;
  volume: number;
  isLoaded: boolean;
}

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    volume: 0.5,
    isLoaded: false,
  });

  useEffect(() => {
    const audio = new Audio('/audio/soundtrack.mp3');
    audio.loop = true;
    audio.volume = state.volume;
    audio.preload = 'auto';
    
    audio.addEventListener('canplaythrough', () => {
      setState(prev => ({ ...prev, isLoaded: true }));
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const play = useCallback(() => {
    if (audioRef.current) {
      // Fade in effect
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        setState(prev => ({ ...prev, isPlaying: true }));
        // Gradual fade in over 2 seconds
        let vol = 0;
        const targetVol = state.volume;
        const fadeInterval = setInterval(() => {
          vol += 0.025;
          if (vol >= targetVol) {
            vol = targetVol;
            clearInterval(fadeInterval);
          }
          if (audioRef.current) {
            audioRef.current.volume = vol;
          }
        }, 50);
      }).catch(() => {
        // Autoplay blocked, will try on user interaction
      });
    }
  }, [state.volume]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const toggle = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const setVolume = useCallback((vol: number) => {
    const clampedVol = Math.max(0, Math.min(1, vol));
    if (audioRef.current) {
      audioRef.current.volume = clampedVol;
    }
    setState(prev => ({ ...prev, volume: clampedVol }));
  }, []);

  return {
    ...state,
    play,
    pause,
    toggle,
    setVolume,
  };
}
