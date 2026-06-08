import { useState } from 'react';
import { useTimerStore } from '../../store/useTimerStore';

export const Overlay = () => {
  const { status, addTask, startFocus } = useTimerStore();
  const [title, setTitle] = useState('');

  const handleStart = (mins: number) => {
    if (title.trim()) {
      addTask(title.trim());
    }
    startFocus(mins); // pass minutes!
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex flex-col items-center justify-center font-sans">
      
      {/* Central Clean Logo area */}
      <div 
        className="flex flex-col items-center justify-center select-none transition-opacity duration-1000"
        style={{ opacity: status === 'idle' ? 1 : 0 }}
      >
        <div className="flex flex-col items-center justify-center mb-[80px]">
           <h1 className="text-[#f4f4f4] text-[32px] tracking-[0.15em] font-medium leading-[1.1] uppercase flex items-center">
             HASHGRAPH
           </h1>
           <h1 className="text-[#f4f4f4] text-[32px] tracking-[0.15em] font-medium leading-[1.1] uppercase flex items-center">
             VENTURES
           </h1>
        </div>

        {/* Focus Setup Area replacing LOADING */}
        <div className="pointer-events-auto flex flex-col items-center">
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ENTER FOCUS DIRECTIVE"
            className="mb-8 bg-transparent border-b border-[#333] text-[#f4f4f4] font-medium tracking-[0.2em] text-[10px] text-center pb-3 focus:outline-none focus:border-[#666] transition-colors w-[240px] placeholder-[#555]"
          />

          <div className="flex gap-8 mb-4">
            {[1, 25, 45, 60].map((mins) => (
              <button
                key={mins}
                onClick={() => handleStart(mins)}
                className="text-[#f4f4f4] font-medium tracking-[0.2em] text-[10px] opacity-50 hover:opacity-100 transition-all uppercase"
              >
                {mins} MIN
              </button>
            ))}
          </div>
          <div className="w-[120px] h-[1px] bg-[#222]"></div>
        </div>
      </div>

      {/* Bottom Footer Text */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full text-center select-none transition-opacity duration-1000"
        style={{ opacity: status === 'idle' ? 1 : 0 }}
      >
        <p className="text-[#444] font-medium tracking-[0.08em] text-[9px] uppercase leading-[1.8]">
          THIS EXPERIENCE INCLUDES SOUND.<br />
          FOR THE INTENDED ATMOSPHERE, ENABLE AUDIO.
        </p>
      </div>

    </div>
  );
};
