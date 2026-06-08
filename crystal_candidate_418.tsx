Created At: 2026-06-05T08:33:01Z
Completed At: 2026-06-05T08:33:02Z
File Path: `file:///Users/chaser/code/focus-oasis/src/components/canvas/Plant.tsx`
Total Lines: 194
Total Bytes: 6535
Showing lines 1 to 194
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
1: import { useRef, useMemo } from 'react';
2: import { useFrame } from '@react-three/fiber';
3: import * as THREE from 'three';
4: import gsap from 'gsap';
5: import { useGSAP } from '@gsap/react';
6: import { useTimerStore } from '../../store/useTimerStore';
7: 
8: gsap.registerPlugin(useGSAP);
9: 
10: const seededRandom = (seed: number) => {
11:   const x = Math.sin(seed++) * 10000;
12:   return x - Math.floor(x);
13: };
14: 
15: // Generates an ethereal tree structure
16: const generateBranches = (depth: number, maxDepth: number, parentLength: number, seed: number): any => {
17:   if (depth > maxDepth) return null;
18:   
19:   const length = parentLength * (0.7 + seededRandom(seed) * 0.2);
20:   const radiusBottom = depth === 0 ? length * 0.15 : parentLength * 0.05;
21:   const radiusTop = length * 0.03;
22:   const branches = [];
23:   
24:   if (depth < maxDepth) {
25:     const numChildren = depth === 0 ? 3 : 2 + Math.floor(seededRandom(seed + depth) * 2);
26:     for (let i = 0; i < numChildren; i++) {
27:       const childSeed = seed + depth * 10 + i;
28:       branches.push({
29:         angleY: (i / numChildren) * Math.PI * 2 + (seededRandom(childSeed) * 0.5),
30:         angleZ: Math.PI / 6 + (seededRandom(childSeed + 1) * 0.3),
31:         children: generateBranches(depth + 1, maxDepth, length, childSeed + 2)
32:       });
33:     }
34:   }
35: 
36:   return { length, radiusBottom, radiusTop, branches, seed };
37: };
38: 
39: const BranchNode = ({ data, depth = 0, isDead = false }: { data: any, depth?: number, isDead: boolean }) => {
40:   const meshRef = u
<truncated 3835 bytes>
       ref={crystalMaterialRef}
134:             color="#34d399"
135:             emissive="#059669"
136:             emissiveIntensity={2.5}
137:             transparent
138:             opacity={0.9}
139:             roughness={0.1}
140:             transmission={0.5}
141:             thickness={0.5}
142:           />
143:         </mesh>
144:       )}
145: 
146:       {/* Children */}
147:       {data.branches && data.branches.map((b: any, i: number) => (
148:         <group 
149:           key={i} 
150:           position={[0, data.length * 0.9, 0]} 
151:           rotation={[0, b.angleY, b.angleZ]}
152:         >
153:           <BranchNode data={b.children} depth={depth + 1} isDead={isDead} />
154:         </group>
155:       ))}
156:     </group>
157:   );
158: };
159: 
160: export const Plant = () => {
161:   const { progress, currentSeed, isDead } = useTimerStore();
162:   const plantRef = useRef<THREE.Group>(null);
163:   
164:   const treeData = useMemo(() => generateBranches(0, 3, 2.5, currentSeed), [currentSeed]);
165: 
166:   useGSAP(() => {
167:     if (plantRef.current) {
168:       const targetScale = 0.1 + (progress * 1.2); // grow larger
169:       
170:       gsap.to(plantRef.current.scale, {
171:         x: targetScale,
172:         y: targetScale,
173:         z: targetScale,
174:         duration: 2,
175:         ease: 'power3.out',
176:       });
177:     }
178:   }, { dependencies: [progress], scope: plantRef });
179: 
180:   // Very slow magical sway
181:   useFrame((state) => {
182:     if (plantRef.current && !isDead) {
183:       plantRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
184:       plantRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.15) * 0.03;
185:     }
186:   });
187: 
188:   return (
189:     <group ref={plantRef} position={[0, -0.5, 0]}>
190:       {treeData && <BranchNode data={treeData} isDead={isDead} />}
191:     </group>
192:   );
193: };
194: 
The above content shows the entire, complete file contents of the requested file.
