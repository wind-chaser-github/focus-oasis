import { useEffect, useRef } from 'react';
import { useTimerStore } from '../../store/useTimerStore';

export const AudioManager = () => {
  const { status } = useTimerStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create the audio element
    if (!audioRef.current) {
      const audio = new Audio('/sounds/webm/Music_Ambient_Loop.webm');
      audio.loop = true;
      audio.volume = 0.5; // Set an appropriate ambient volume
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    if (status === 'focusing') {
      audio.play().catch(e => console.warn('Audio autoplay prevented:', e));
    } else {
      audio.pause();
    }

    return () => {
      // Don't completely destroy on unmount if it's just paused, but cleanup for safety
      if (status !== 'focusing' && audio) {
        audio.pause();
      }
    };
  }, [status]);

  return null; // Invisible component
};
