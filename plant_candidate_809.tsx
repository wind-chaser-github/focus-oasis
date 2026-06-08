Created At: 2026-06-05T09:20:09Z
Completed At: 2026-06-05T09:20:12Z
The following changes were made by the replace_file_content tool to: /Users/chaser/code/focus-oasis/src/components/canvas/Scene.tsx. If relevant, proactively run terminal commands to execute this code for the USER. Don't ask for permission.
[diff_block_start]
@@ -5,6 +5,7 @@
 import * as THREE from 'three';
 import { Plant } from './Plant';
 import { CameraController } from './CameraController';
+import { Suspense } from 'react';
 
 export const Scene = () => {
   return (
@@ -11,10 +11,15 @@
       <Canvas camera={{ position: [0, 0, 16], fov: 45 }}>
         <color attach="background" args={['#05080f']} />
         
+        <ambientLight intensity={1.5} />
+        <directionalLight position={[10, 20, 10]} intensity={2} color="#9bb8e1" />
+        <directionalLight position={[-10, -20, -10]} intensity={1} color="#2c4e73" />
+
         <CameraController />
         
-        {/* Hashgraph-style Abstract Wireframe Triangles */}
-        <Plant />
+        <Suspense fallback={null}>
+          <Plant />
+        </Suspense>
         
         <EffectComposer disableNormalPass>
           <Bloom 
[diff_block_end]

Please note that the above snippet only shows the MODIFIED lines from the last change. It shows up to 3 lines of unchanged lines before and after the modified lines. The actual file contents may have many more lines not shown.