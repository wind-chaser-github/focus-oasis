Created At: 2026-06-05T08:57:42Z
Completed At: 2026-06-05T08:57:43Z
File Path: `file:///Users/chaser/code/focus-oasis/src/components/canvas/Scene.tsx`
Total Lines: 55
Total Bytes: 1806
Showing lines 1 to 55
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
11:     <div className="absolute inset-0 z-0 bg-black">
12:       <Canvas camera={{ position: [-4, 5, 16], fov: 45 }}>
13:         <color attach="background" args={['#000000']} />
14:         
15:         <CameraController />
16:         
17:         {/* Stark, cinematic rim lighting */}
18:         <ambientLight intensity={0.1} />
19:         <spotLight 
20:           position={[10, 10, 10]} 
21:           angle={0.15} 
22:           penumbra={1} 
23:           intensity={2} 
24:           color="#ffffff" 
25:         />
26:         <pointLight position={[-10, -10, -10]} intensity={1} color="#059669" />
27: 
28:         {/* The Abstract Glass Monoliths */}
29:         <Plant />
30:         
31:         {/* High contrast studio environment for glass reflections */}
32:         <Environment preset="studio" />
33: 
34:         <EffectComposer disableNormalPass>
35:           <Bloom 
36:             luminanceThreshold={0.5} 
37:             mipmapBlur 
38:             intensity={2.5} 
39:             radius={0.8}
40:           />
41:           {/* Intense cinematic chromatic aberration */}
42:           <ChromaticAberration
43:             blendFunction={BlendFunction.NORMAL}
44:             offset={new THREE.Vector2(0.003, 0.003)}
45:             radialModulation={true}
46:             modulationOffset={0.4}
47:           />
48:           <Noise opacity={0.08} blendFunction={BlendFunction.OVERLAY} />
49:           <Vignette eskil={false} offset={0.3} darkness={1.5} />
50:         </EffectComposer>
51:       </Canvas>
52:     </div>
53:   );
54: };
55: 
The above content shows the entire, complete file contents of the requested file.
