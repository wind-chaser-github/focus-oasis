import { useEffect, useRef } from 'react';
import { useTimerStore } from '../../store/useTimerStore';
import gsap from 'gsap';
import { Pause } from 'lucide-react';
import { useGSAP } from '@gsap/react';

export const Timer = () => {
  const { timeString, status, tick, pauseFocus, resumeFocus, stopFocus, resetToIdle } = useTimerStore();
  const timerRef = useRef<HTMLDivElement>(null);

  // The actual tick interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'focusing') {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status, tick]);

  // Animate timer position/opacity based on status
  useGSAP(() => {
    if (!timerRef.current) return;
    if (status === 'focusing') {
      gsap.to(timerRef.current, {
        top: 40,
        scale: 0.8,
        opacity: 0.3,
        duration: 1.5,
        ease: 'power3.inOut'
      });
    } else {
      gsap.to(timerRef.current, {
        top: '15%',
        scale: 1,
        opacity: status === 'idle' ? 0 : 1, // hidden in idle, shown when paused/finished
        duration: 1.2,
        ease: 'power3.out'
      });
    }
  }, { dependencies: [status], scope: timerRef });

  if (status === 'idle') return null;

  return (
    <div 
      ref={timerRef}
      className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center group cursor-pointer"
      onClick={() => {
        if (status === 'focusing') pauseFocus();
      }}
    >
      <div className="text-6xl md:text-8xl font-thin tracking-widest text-white drop-shadow-lg tabular-nums">
        {timeString}
      </div>
      
      {status === 'focusing' && (
        <div className="absolute top-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-white/50 text-sm tracking-widest uppercase">
          <Pause size={14} /> Click to pause
        </div>
      )}

      {/* Control Buttons */}
      <div className="absolute top-full mt-8 flex gap-8">
        {(status === 'suspended' || status === 'paused') && (
          <>
            <button 
              onClick={(e) => { e.stopPropagation(); resumeFocus(); }} 
              className="text-[#9bb8e1] font-light tracking-[0.3em] text-xs uppercase opacity-60 hover:opacity-100 transition-opacity"
            >
              RESUME
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); stopFocus(); }} 
              className="text-red-400 font-light tracking-[0.3em] text-xs uppercase opacity-60 hover:opacity-100 transition-opacity"
            >
              ABORT
            </button>
          </>
        )}
        {(status === 'withered' || status === 'finished') && (
          <button 
            onClick={(e) => { e.stopPropagation(); resetToIdle(); }} 
            className="text-[#9bb8e1] font-light tracking-[0.3em] text-xs uppercase opacity-60 hover:opacity-100 transition-opacity"
          >
            RETURN
          </button>
        )}
      </div>
    </div>
  );
};
