Created At: 2026-06-06T05:14:59Z
Completed At: 2026-06-06T05:14:59Z

				The command completed successfully.
				Output:
				import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { Suspense } from 'react';
import { Plant } from './Plant';

export const Scene = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#020305]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#020305']} />
        
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 10, 10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Plant />
        </Suspense>
        
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={1.5} 
            radius={0.8}
          />
          <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
          <Vignette eskil={false} offset={0.3} darkness={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

