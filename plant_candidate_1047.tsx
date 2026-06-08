Created At: 2026-06-05T09:48:07Z
Completed At: 2026-06-05T09:48:07Z
File Path: `file:///Users/chaser/code/focus-oasis/src/components/canvas/Scene.tsx`
Total Lines: 36
Total Bytes: 1184
Showing lines 1 to 36
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
1: import { Canvas } from '@react-three/fiber';
2: import { Environment } from '@react-three/drei';
3: import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing';
4: import { BlendFunction } from 'postprocessing';
5: import * as THREE from 'three';
6: import { HashgraphDirector } from './HashgraphDirector';
7: import { Suspense } from 'react';
8: 
9: export const Scene = () => {
10:   return (
11:     <div className="absolute inset-0 z-0 bg-[#020305]">
12:       <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
13:         <color attach="background" args={['#020305']} />
14:         
15:         <ambientLight intensity={0.1} />
16:         <directionalLight position={[10, 10, 10]} intensity={0.5} />
17:         
18:         <Suspense fallback={null}>
19:           <Plant />
20:         </Suspense>
21:         
22:         <EffectComposer disableNormalPass>
23:           <Bloom 
24:             luminanceThreshold={0.2} 
25:             mipmapBlur 
26:             intensity={1.5} 
27:             radius={0.8}
28:           />
29:           <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
30:           <Vignette eskil={false} offset={0.3} darkness={0.8} />
31:         </EffectComposer>
32:       </Canvas>
33:     </div>
34:   );
35: };
36: 
The above content shows the entire, complete file contents of the requested file.
