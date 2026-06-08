Created At: 2026-06-05T08:33:51Z
Completed At: 2026-06-05T08:33:53Z
The following changes were made by the replace_file_content tool to: /Users/chaser/code/focus-oasis/src/components/canvas/Scene.tsx. If relevant, proactively run terminal commands to execute this code for the USER. Don't ask for permission.
[diff_block_start]
@@ -1,6 +1,8 @@
 import { Canvas } from '@react-three/fiber';
 import { Environment, SoftShadows } from '@react-three/drei';
-import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
+import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing';
+import { BlendFunction } from 'postprocessing';
+import * as THREE from 'three';
 import { Island } from './Island';
 import { Plant } from './Plant';
 import { CameraController } from './CameraController';
@@ -9,7 +9,7 @@
 export const Scene = () => {
   return (
     <div className="absolute inset-0 z-0 bg-background">
-      <Canvas shadows camera={{ position: [8, 6, 12], fov: 45 }}>
+      <Canvas shadows camera={{ position: [-4, 5, 16], fov: 45 }}>
         <CameraController />
         <SoftShadows size={20} samples={16} focus={0.5} />
         
@@ -22,12 +22,20 @@
 
         <EffectComposer disableNormalPass>
           <Bloom 
-            luminanceThreshold={1.2} 
+            luminanceThreshold={0.8} 
             mipmapBlur 
-            intensity={1.5} 
-          />
-          <Noise opacity={0.03} />
-          <Vignette eskil={false} offset={0.1} darkness={1.1} />
+            intensity={2} 
+            radius={0.8}
+          />
+          {/* Subtle RGB shift on edges for that cinematic Awwwards look */}
+          <ChromaticAberration
+            blendFunction={BlendFunction.NORMAL}
+            offset={new THREE.Vector2(0.002, 0.002)}
+            radialModulation={true}
+            modulationOffset={0.5}
+          />
+          <Noise opacity={0.04} blendFunction={BlendFunction.OVERLAY} />
+          <Vignette eskil={false} offset={0.1} darkness={1.2} />
         </EffectComposer>
       </Canvas>
     </div>
[diff_block_end]

Please note that the above snippet only shows the MODIFIED lines from the last change. It shows up to 3 lines of unchanged lines before and after the modified lines. The actual file contents may have many more lines not shown.