import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTimerStore } from '../../store/useTimerStore';

export const BreathingLight = () => {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const { status, isDead } = useTimerStore();

  useFrame((state) => {
    if (status === 'focusing' && !isDead) {
      // 4-7-8 breathing approx frequency: one breath cycle every ~10s
      // We'll use a slow sine wave for brightness
      const breathingPattern = Math.sin(state.clock.elapsedTime * (Math.PI * 2 / 10)); // 10s period
      const intensityShift = breathingPattern * 0.3; // subtle 30% shift
      
      if (dirLightRef.current) {
        dirLightRef.current.intensity = THREE.MathUtils.lerp(
          dirLightRef.current.intensity,
          1.2 + intensityShift,
          0.05
        );
      }
      if (pointLightRef.current) {
        pointLightRef.current.intensity = THREE.MathUtils.lerp(
          pointLightRef.current.intensity,
          0.8 + intensityShift * 0.5,
          0.05
        );
      }
    } else {
      // Reset to idle lighting or dim if dead
      const targetDir = isDead ? 0.5 : 1.2;
      const targetPoint = isDead ? 0.2 : 0.8;
      
      if (dirLightRef.current) {
        dirLightRef.current.intensity = THREE.MathUtils.lerp(dirLightRef.current.intensity, targetDir, 0.05);
      }
      if (pointLightRef.current) {
        pointLightRef.current.intensity = THREE.MathUtils.lerp(pointLightRef.current.intensity, targetPoint, 0.05);
      }
    }
  });

  return (
    <>
      <ambientLight intensity={isDead ? 0.05 : 0.2} />
      <directionalLight 
        ref={dirLightRef}
        position={[5, 10, 5]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize={2048}
      />
      <pointLight 
        ref={pointLightRef}
        position={[-5, 5, -5]} 
        intensity={0.8} 
        color="#059669" 
      />
    </>
  );
};
