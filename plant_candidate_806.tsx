Created At: 2026-06-05T09:19:53Z
Completed At: 2026-06-05T09:19:54Z
File Path: `file:///Users/chaser/code/focus-oasis/src/components/canvas/Scene.tsx`
Total Lines: 34
Total Bytes: 1105
Showing lines 1 to 34
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
1: import { Canvas } from '@react-three/fiber';
2: import { Environment } from '@react-three/drei';
3: import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing';
4: import { BlendFunction } from 'postprocessing';
5: import * as THREE from 'three';
6: import { Plant } from './Plant';
7: import { CameraController } from './CameraController';
8: 
9: export const Scene = () => {
10:   return (
11:     <div className="absolute inset-0 z-0 bg-[#05080f]">
12:       <Canvas camera={{ position: [0, 0, 16], fov: 45 }}>
13:         <color attach="background" args={['#05080f']} />
14:         
15:         <CameraController />
16:         
17:         {/* Hashgraph-style Abstract Wireframe Triangles */}
18:         <Plant />
19:         
20:         <EffectComposer disableNormalPass>
21:           <Bloom 
22:             luminanceThreshold={0.2} 
23:             mipmapBlur 
24:             intensity={1.5} 
25:             radius={0.8}
26:           />
27:           <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
28:           <Vignette eskil={false} offset={0.3} darkness={0.8} />
29:         </EffectComposer>
30:       </Canvas>
31:     </div>
32:   );
33: };
34: 
The above content shows the entire, complete file contents of the requested file.
