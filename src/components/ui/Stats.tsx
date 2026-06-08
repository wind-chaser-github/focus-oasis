import { useState } from 'react';
import { useTimerStore } from '../../store/useTimerStore';
import { Sprout, Clock, X } from 'lucide-react';

export const Stats = () => {
  const { totalFocusTime, completedSessions, garden, status } = useTimerStore();
  const [showGarden, setShowGarden] = useState(false);

  const totalMinutes = Math.floor(totalFocusTime / 60);

  // Only show when idle or finished or paused (not focusing)
  if (status === 'focusing') return null;

  return (
    <>
      <div className="absolute top-10 right-10 flex gap-6 z-20 pointer-events-auto">
        <div className="flex flex-col items-end group">
          <span className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] mb-1">Time Cultivated</span>
          <div className="flex items-center gap-2 text-zinc-200 font-light tracking-wider">
            {totalMinutes} <span className="text-xs text-zinc-600">MINS</span>
          </div>
        </div>
        
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent"></div>

        <button 
          onClick={() => setShowGarden(true)}
          className="flex flex-col items-end group cursor-pointer hover:text-primary transition-colors"
        >
          <span className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] mb-1 group-hover:text-primary/70 transition-colors">The Garden</span>
          <div className="flex items-center gap-2 text-zinc-200 font-light tracking-wider group-hover:text-white transition-colors">
            {completedSessions} <span className="text-xs text-zinc-600 group-hover:text-primary/50 transition-colors">CRYSTALS</span>
          </div>
        </button>
      </div>

      {/* Garden Modal */}
      {showGarden && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="glass w-full max-w-4xl h-[80vh] rounded-[2.5rem] flex flex-col overflow-hidden relative shadow-2xl border border-white/10">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div>
                <h2 className="text-3xl font-light text-zinc-100 tracking-wider">Your Zen Garden</h2>
                <p className="text-sm text-zinc-500 mt-2 uppercase tracking-widest">A collection of your focused moments</p>
              </div>
              <button onClick={() => setShowGarden(false)} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {garden.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4 opacity-50">
                  <Sprout size={48} />
                  <p className="tracking-widest uppercase text-sm">Your garden is empty. Start focusing!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {garden.map((plant) => (
                    <div key={plant.id} className="bg-black/20 border border-white/5 rounded-2xl p-6 flex flex-col items-center hover:bg-white/5 transition-colors cursor-default group">
                      <div className="w-20 h-20 mb-4 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:border-primary/30 transition-colors">
                        <Sprout size={32} className="text-primary/70 group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-lg font-light text-zinc-200">{plant.duration} mins</span>
                      <span className="text-[10px] text-zinc-500 uppercase mt-1">
                        {new Date(plant.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
