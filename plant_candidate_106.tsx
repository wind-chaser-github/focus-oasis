Created At: 2026-06-05T06:37:20Z
Completed At: 2026-06-05T06:37:20Z
File Path: `file:///Users/chaser/code/focus-oasis/src/components/canvas/Plant.tsx`
Total Lines: 102
Total Bytes: 3022
Showing lines 1 to 102
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
1: import { useEffect, useRef, useMemo } from 'react';
2: import { useFrame } from '@react-three/fiber';
3: import * as THREE from 'three';
4: import gsap from 'gsap';
5: import { useTimerStore } from '../../store/useTimerStore';
6: 
7: // Procedural simple plant generator
8: const generateBranches = (depth: number, maxDepth: number, parentLength: number): any => {
9:   if (depth > maxDepth) return null;
10:   
11:   const length = parentLength * 0.75;
12:   const radius = length * 0.1;
13:   const branches = [];
14:   
15:   // If not root, create child branches
16:   if (depth > 0 && depth < maxDepth) {
17:     const numChildren = 2 + Math.floor(Math.random() * 2);
18:     for (let i = 0; i < numChildren; i++) {
19:       branches.push({
20:         angleY: (i / numChildren) * Math.PI * 2 + (Math.random() * 0.5),
21:         angleZ: Math.PI / 4 + (Math.random() * 0.2),
22:         children: generateBranches(depth + 1, maxDepth, length)
23:       });
24:     }
25:   }
26: 
27:   return {
28:     length,
29:     radius,
30:     branches
31:   };
32: };
33: 
34: const BranchNode = ({ data, depth = 0 }: { data: any, depth?: number }) => {
35:   const meshRef = useRef<THREE.Group>(null);
36:   
37:   return (
38:     <group ref={meshRef}>
39:       <mesh position={[0, data.length / 2, 0]} castShadow receiveShadow>
40:         <cylinderGeometry args={[data.radius * 0.7, data.radius, data.length, 8]} />
41:         <meshStandardMaterial color="#3f2e1a" roughness={0.9} />
42:       </mesh>
43:       
44:       {/* Leaves at the tips */}
45:       {(!data.branches || data.branches.length === 0) && (
46:         <mesh position={[0, data.length, 0]} castShadow>
47:           <sphereGeometry args={[data.length * 0.8, 8, 8]} />
48:           <meshStandardMaterial color="#10b981" roughness={0.6} />
49:         </mesh>
50:       )}
51: 
52:       {/* Children */}
53:       {data.branches && data.branches.map((b: any, i: number) => (
54:         <group 
55:           key={i} 
56:           position={[0, data.length, 0]} 
57:           rotation={[0, b.angleY, b.angleZ]}
58:         >
59:           <BranchNode data={b.children} depth={depth + 1} />
60:         </group>
61:       ))}
62:     </group>
63:   );
64: };
65: 
66: export const Plant = () => {
67:   const progress = useTimerStore((state) => state.progress);
68:   const status = useTimerStore((state) => state.status);
69:   const plantRef = useRef<THREE.Group>(null);
70:   
71:   const treeData = useMemo(() => generateBranches(0, 3, 2), []);
72: 
73:   useEffect(() => {
74:     if (plantRef.current) {
75:       // Base scale based on progress. E.g., at 0 progress scale is 0.1, at 1 it's 1.2
76:       const targetScale = 0.1 + (progress * 1.1);
77:       
78:       gsap.to(plantRef.current.scale, {
79:         x: targetScale,
80:         y: targetScale,
81:         z: targetScale,
82:         duration: 1.5,
83:         ease: 'power2.out',
84:       });
85:     }
86:   }, [progress]);
87: 
88:   // Gentle idle swaying
89:   useFrame((state) => {
90:     if (plantRef.current) {
91:       plantRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
92:       plantRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
93:     }
94:   });
95: 
96:   return (
97:     <group ref={plantRef} position={[0, 0.1, 0]}>
98:       <BranchNode data={treeData} />
99:     </group>
100:   );
101: };
102: 
The above content shows the entire, complete file contents of the requested file.
