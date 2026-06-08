Created At: 2026-06-05T09:44:37Z
Completed At: 2026-06-05T09:44:37Z
File Path: `file:///Users/chaser/code/focus-oasis/src/components/canvas/Plant.tsx`
Total Lines: 91
Total Bytes: 3041
Showing lines 1 to 91
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
1: import { useRef, useEffect } from 'react';
2: import { useFrame } from '@react-three/fiber';
3: import * as THREE from 'three';
4: import { useGLTF, useAnimations } from '@react-three/drei';
5: import { useTimerStore } from '../../store/useTimerStore';
6: 
7: const DRACO_URL = '/draco/gltf/';
8: 
9: const HashgraphModel = ({ url, isBg = false }: { url: string, isBg?: boolean }) => {
10:   const group = useRef<THREE.Group>(null);
11:   const { scene, animations } = useGLTF(url, DRACO_URL);
12:   const { actions } = useAnimations(animations, group);
13:   const { progress, status } = useTimerStore();
14: 
15:   useEffect(() => {
16:     // Play and pause all animations so we can scrub them manually
17:     Object.values(actions).forEach(action => {
18:       if (action) {
19:         action.play();
20:         action.paused = true;
21:       }
22:     });
23: 
24:     // Hashgraph Aesthetic: Hide solid polygons, render sleek Edges
25:     scene.traverse((child: any) => {
26:       if (child.isMesh) {
27:         child.material.visible = false; // Hide chunky solid rendering
28:         
29:         // Prevent adding multiple edges if useEffect runs again
30:         if (!child.userData.hasEdges) {
31:           const edgesGeom = new THREE.EdgesGeometry(child.geometry, 15);
32:           const lineMat = new THREE.LineBasicMaterial({ 
33:             color: 0x4466aa, 
34:             transparent: true, 
35:             opacity: 0.4,
36:             depthWrite: false
37:           });
38:           const line = new THREE.LineSegments(edgesGeom, lineMat);
39:           child.add(line);
40:           child.userData.hasEdges = true;
41:         }
42:       }
43:     });
44:   }, [actions, scene]);
45: 
46:   useFrame((state) => {
47:     if (!group.current) return;
48:     
49:     // Parallax
50:     group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * (isBg ? 0.05 : 0.2), 0.05);
51:     group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * (isBg ? 0.05 : 0.2), 0.05);
52: 
53:     const hasAnimations = Object.values(actions).length > 0;
54: 
55:     if (hasAnimations) {
56:       Object.values(actions).forEach(action => {
57:         if (action) {
58:           const duration = action.getClip().duration;
59:           // When idle, hold at 0. When focusing, scrub from 0 to duration based on progress.
60:           const targetTime = status === 'idle' ? 0 : progress * duration;
61:           action.time = targetTime;
62:         }
63:       });
64:     } else {
65:       // Fallback if no built-in animations: use rotation to indicate progress
66:       const time = state.clock.elapsedTime;
67:       if (status === 'idle') {
68:         group.current.rotation.z = time * (isBg ? 0.02 : 0.05);
69:       } else {
70:         group.current.rotation.z = time * (isBg ? 0.02 : 0.05) + (progress * Math.PI * 2);
71:       }
72:     }
73:   });
74: 
75:   // Render the cloned original scene
76:   return (
77:     <group ref={group} scale={isBg ? 2 : 1.2} position={isBg ? [0, 0, -8] : [0, 0, -2]}>
78:       <primitive object={scene} />
79:     </group>
80:   );
81: };
82: 
83: export const Plant = () => {
84:   return (
85:     <>
86:       <HashgraphModel url="/models/bg.glb" isBg={true} />
87:       <HashgraphModel url="/models/logo.glb" />
88:     </>
89:   );
90: };
91: 
The above content shows the entire, complete file contents of the requested file.
