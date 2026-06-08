Created At: 2026-06-05T07:26:38Z
Completed At: 2026-06-05T07:26:39Z
File Path: `file:///Users/chaser/code/focus-oasis/src/components/canvas/Scene.tsx`
Total Lines: 38
Total Bytes: 1131
Showing lines 1 to 38
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
1: import { Canvas } from '@react-three/fiber';
2: import { Environment, SoftShadows } from '@react-three/drei';
3: import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
4: import { Island } from './Island';
5: import { Plant } from './Plant';
6: import { CameraController } from './CameraController';
7: import { Particles } from './Particles';
8: import { BreathingLight } from './BreathingLight';
9: 
10: export const Scene = () => {
11:   return (
12:     <div className="absolute inset-0 z-0 bg-background">
13:       <Canvas shadows camera={{ position: [8, 6, 12], fov: 45 }}>
14:         <CameraController />
15:         <SoftShadows size={20} samples={16} focus={0.5} />
16:         
17:         <BreathingLight />
18: 
19:         <Island />
20:         <Plant />
21:         <Particles />
22:         
23:         <Environment preset="night" />
24: 
25:         <EffectComposer disableNormalPass>
26:           <Bloom 
27:             luminanceThreshold={1.2} 
28:             mipmapBlur 
29:             intensity={1.5} 
30:           />
31:           <Noise opacity={0.03} />
32:           <Vignette eskil={false} offset={0.1} darkness={1.1} />
33:         </EffectComposer>
34:       </Canvas>
35:     </div>
36:   );
37: };
38: 
The above content shows the entire, complete file contents of the requested file.
