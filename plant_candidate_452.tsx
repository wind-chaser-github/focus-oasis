Created At: 2026-06-05T08:36:01Z
Completed At: 2026-06-05T08:36:04Z
The following changes were made by the replace_file_content tool to: /Users/chaser/code/focus-oasis/src/components/canvas/Scene.tsx. If relevant, proactively run terminal commands to execute this code for the USER. Don't ask for permission.
[diff_block_start]
@@ -1,45 +1,52 @@
 import { Canvas } from '@react-three/fiber';
-import { Environment, SoftShadows } from '@react-three/drei';
+import { Environment } from '@react-three/drei';
 import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing';
 import { BlendFunction } from 'postprocessing';
 import * as THREE from 'three';
-import { Island } from './Island';
 import { Plant } from './Plant';
 import { CameraController } from './CameraController';
-import { Particles } from './Particles';
-import { BreathingLight } from './BreathingLight';
 
 export const Scene = () => {
   return (
-    <div className="absolute inset-0 z-0 bg-background">
-      <Canvas shadows camera={{ position: [-4, 5, 16], fov: 45 }}>
+    <div className="absolute inset-0 z-0 bg-black">
+      <Canvas camera={{ position: [-4, 5, 16], fov: 45 }}>
+        <color attach="background" args={['#000000']} />
+        
         <CameraController />
-        <SoftShadows size={20} samples={16} focus={0.5} />
-        
-        <BreathingLight />
-
-        <Island />
+        
+        {/* Stark, cinematic rim lighting */}
+        <ambientLight intensity={0.1} />
+        <spotLight 
+          position={[10, 10, 10]} 
+          angle={0.15} 
+          penumbra={1} 
+          intensity={2} 
+          color="#ffffff" 
+        />
+        <pointLight position={[-10, -10, -10]} intensity={1} color="#059669" />
+
+        {/* The Abstract Glass Monoliths */}
         <Plant />
-        <Particles />
-        
-        <Environment preset="night" />
+        
+        {/* High contrast studio environment for glass reflections */}
+        <Environment preset="studio" />
 
         <EffectComposer disableNormalPass>
           <Bloom 
-            luminanceThreshold={0.8} 
+            luminanceThreshold={0.5} 
             mipmapBlur 
-            intensity={2} 
+            intensity={2.5} 
             radius={0.8}
           />
-          {/* Subtle RGB shift on edges for that cinematic Awwwards look */}
+          {/* Intense cinematic chromatic aberration */}
           <ChromaticAberration
             blendFunction={BlendFunction.NORMAL}
-            offset={new THREE.Vector2(0.002, 0.002)}
+            offset={new THREE.Vector2(0.003, 0.003)}
             radialModulation={true}
-            modulationOffset={0.5}
-          />
-          <Noise opacity={0.04} blendFunction={BlendFunction.OVERLAY} />
-          <Vignette eskil={false} offset={0.1} darkness={1.2} />
+            modulationOffset={0.4}
+          />
+          <Noise opacity={0.08} blendFunction={BlendFunction.OVERLAY} />
+          <Vignette eskil={false} offset={0.3} darkness={1.5} />
         </EffectComposer>
       </Canvas>
     </div>
[diff_block_end]

Please note that the above snippet only shows the MODIFIED lines from the last change. It shows up to 3 lines of unchanged lines before and after the modified lines. The actual file contents may have many more lines not shown.