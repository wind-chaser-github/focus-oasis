Created At: 2026-06-05T10:39:00Z
Completed At: 2026-06-05T10:39:01Z

				The command completed successfully.
				Output:
				import { Canvas } from '@react-three/fiber';
import { Environment, SoftShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { Island } from './Island';
import { Plant } from './Plant';
import { CameraController } from './CameraController';
import { Particles } from './Particles';
import { BreathingLight } from './BreathingLight';

export const Scene = () => {
  return (
    <div className="absolute inset-0 z-0 bg-background">
      <Canvas shadows camera={{ position: [8, 6, 12], fov: 45 }}>
        <CameraController />
        <SoftShadows size={20} samples={16} focus={0.5} />
        
        <BreathingLight />

        <Island />
        <Plant />
        <Particles />
        
        <Environment preset="night" />

        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={1.2} 
            mipmapBlur 
            intensity={1.5} 
          />
          <Noise opacity={0.03} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};


