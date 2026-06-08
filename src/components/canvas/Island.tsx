import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Island = () => {
  const islandRef = useRef<THREE.Group>(null);

  // Slow rotation for the island
  useFrame((state) => {
    if (islandRef.current) {
      islandRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={islandRef}>
      {/* Main Base */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <cylinderGeometry args={[3, 2, 1, 32]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      
      {/* Top Grass/Soil layer */}
      <mesh receiveShadow position={[0, 0.05, 0]}>
        <cylinderGeometry args={[2.9, 3, 0.1, 32]} />
        <meshStandardMaterial color="#059669" roughness={0.9} />
      </mesh>
      
      {/* Floating small rocks around */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 4 + Math.random();
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh 
            key={i} 
            castShadow 
            receiveShadow 
            position={[x, Math.random() * 2 - 1, z]}
            rotation={[Math.random(), Math.random(), Math.random()]}
          >
            <dodecahedronGeometry args={[0.3 + Math.random() * 0.4]} />
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </mesh>
        );
      })}
    </group>
  );
};
