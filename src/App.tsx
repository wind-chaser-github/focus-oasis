import { Scene } from './components/canvas/Scene';
import { Overlay } from './components/ui/Overlay';
import { Timer } from './components/ui/Timer';
import { Stats } from './components/ui/Stats';

function App() {
  return (
    <main className="w-full h-screen overflow-hidden relative bg-background">
      <Scene />
      <Stats />
      <Timer />
      <Overlay />
    </main>
  );
}

export default App;
