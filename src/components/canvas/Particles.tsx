import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const Particles = () => {
  const count = 150; // Increased count for better fluid feel
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const radius = 2 + Math.random() * 10;
      const x = Math.cos(theta) * radius;
      const y = (Math.random() - 0.5) * 15;
      const z = Math.sin(theta) * radius;
      
      const speed = 0.1 + Math.random() * 0.2;
      const offset = Math.random() * 100;
      
      temp.push({ 
        baseX: x, baseY: y, baseZ: z, 
        currentX: x, currentY: y, currentZ: z,
        speed, offset 
      });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Convert normalized device coordinates to world position for repulsion
    // We approximate the mouse world position at a fixed depth z=0
    const mouseX = (state.pointer.x * viewport.width) / 2;
    const mouseY = (state.pointer.y * viewport.height) / 2;
    const mouseVec = new THREE.Vector3(mouseX, mouseY, 0);
    
    particles.forEach((particle, i) => {
      const time = state.clock.elapsedTime * particle.speed + particle.offset;
      
      // Base fluid motion
      const targetY = particle.baseY + Math.sin(time) * 1.5;
      const targetX = particle.baseX + Math.cos(time * 0.5) * 0.5;
      
      // Calculate repulsion
      const particleVec = new THREE.Vector3(particle.currentX, particle.currentY, particle.currentZ);
      const distanceToMouse = particleVec.distanceTo(mouseVec);
      
      const repulsionRadius = 4;
      const repulsionStrength = 2;
      
      let repelX = 0;
      let repelY = 0;
      
      if (distanceToMouse < repulsionRadius) {
        const force = (repulsionRadius - distanceToMouse) / repulsionRadius;
        const dirX = particle.currentX - mouseX;
        const dirY = particle.currentY - mouseY;
        // Normalize direction
        const len = Math.sqrt(dirX*dirX + dirY*dirY) || 1;
        repelX = (dirX / len) * force * repulsionStrength;
        repelY = (dirY / len) * force * repulsionStrength;
      }
      
      // Spring back to target or get repelled
      particle.currentX = THREE.MathUtils.damp(particle.currentX, targetX + repelX, 3, delta);
      particle.currentY = THREE.MathUtils.damp(particle.currentY, targetY + repelY, 3, delta);
      
      dummy.position.set(particle.currentX, particle.currentY, particle.baseZ);
      
      // Gentle rotation around center
      dummy.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), state.clock.elapsedTime * 0.05 * particle.speed);
      
      const scale = 0.3 + Math.sin(time * 2) * 0.3; // pulsing scale
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial 
        color="#34d399" 
        emissive="#10b981" 
        emissiveIntensity={3} 
        transparent 
        opacity={0.8}
        depthWrite={false}
      />
    </instancedMesh>
  );
};
