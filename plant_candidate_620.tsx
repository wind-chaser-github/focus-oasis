Created At: 2026-06-05T08:57:59Z
Completed At: 2026-06-05T08:58:02Z
The following changes were made by the replace_file_content tool to: /Users/chaser/code/focus-oasis/src/components/canvas/Scene.tsx. If relevant, proactively run terminal commands to execute this code for the USER. Don't ask for permission.
[diff_block_start]
@@ -8,45 +8,24 @@
 
 export const Scene = () => {
   return (
-    <div className="absolute inset-0 z-0 bg-black">
-      <Canvas camera={{ position: [-4, 5, 16], fov: 45 }}>
-        <color attach="background" args={['#000000']} />
+    <div className="absolute inset-0 z-0 bg-[#05080f]">
+      <Canvas camera={{ position: [0, 0, 16], fov: 45 }}>
+        <color attach="background" args={['#05080f']} />
         
         <CameraController />
         
-        {/* Stark, cinematic rim lighting */}
-        <ambientLight intensity={0.1} />
-        <spotLight 
-          position={[10, 10, 10]} 
-          angle={0.15} 
-          penumbra={1} 
-          intensity={2} 
-          color="#ffffff" 
-        />
-        <pointLight position={[-10, -10, -10]} intensity={1} color="#059669" />
-
-        {/* The Abstract Glass Monoliths */}
+        {/* Hashgraph-style Abstract Wireframe Triangles */}
         <Plant />
         
-        {/* High contrast studio environment for glass reflections */}
-        <Environment preset="studio" />
-
         <EffectComposer disableNormalPass>
           <Bloom 
-            luminanceThreshold={0.5} 
+            luminanceThreshold={0.2} 
             mipmapBlur 
-            intensity={2.5} 
+            intensity={1.5} 
             radius={0.8}
           />
-          {/* Intense cinematic chromatic aberration */}
-          <ChromaticAberration
-            blendFunction={BlendFunction.NORMAL}
-            offset={new THREE.Vector2(0.003, 0.003)}
-            radialModulation={true}
-            modulationOffset={0.4}
-          />
-          <Noise opacity={0.08} blendFunction={BlendFunction.OVERLAY} />
-          <Vignette eskil={false} offset={0.3} darkness={1.5} />
+          <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
+          <Vignette eskil={false} offset={0.3} darkness={0.8} />
         </EffectComposer>
       </Canvas>
     </div>
[diff_block_end]

Please note that the above snippet only shows the MODIFIED lines from the last change. It shows up to 3 lines of unchanged lines before and after the modified lines. The actual file contents may have many more lines not shown.