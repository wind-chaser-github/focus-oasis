Created At: 2026-06-05T09:47:55Z
Completed At: 2026-06-05T09:47:59Z
The following changes were made by the replace_file_content tool to: /Users/chaser/code/focus-oasis/src/components/canvas/Scene.tsx. If relevant, proactively run terminal commands to execute this code for the USER. Don't ask for permission.
[diff_block_start]
@@ -3,8 +3,7 @@
 import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing';
 import { BlendFunction } from 'postprocessing';
 import * as THREE from 'three';
-import { Plant } from './Plant';
-import { CameraController } from './CameraController';
+import { HashgraphDirector } from './HashgraphDirector';
 import { Suspense } from 'react';
 
 export const Scene = () => {
@@ -11,12 +11,9 @@
-    <div className="absolute inset-0 z-0 bg-[#05080f]">
-      <Canvas camera={{ position: [0, 0, 16], fov: 45 }}>
-        <color attach="background" args={['#05080f']} />
-        
-        <ambientLight intensity={1.5} />
-        <directionalLight position={[10, 20, 10]} intensity={2} color="#9bb8e1" />
-        <directionalLight position={[-10, -20, -10]} intensity={1} color="#2c4e73" />
-
-        <CameraController />
+    <div className="absolute inset-0 z-0 bg-[#020305]">
+      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
+        <color attach="background" args={['#020305']} />
+        
+        <ambientLight intensity={0.1} />
+        <directionalLight position={[10, 10, 10]} intensity={0.5} />
         
         <Suspense fallback={null}>
           <Plant />
[diff_block_end]

Please note that the above snippet only shows the MODIFIED lines from the last change. It shows up to 3 lines of unchanged lines before and after the modified lines. The actual file contents may have many more lines not shown.

We did our best to apply changes despite some inaccuracies. Double check if the edit applied is what you intended.