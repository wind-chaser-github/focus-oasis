import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useTimerStore } from '../../store/useTimerStore';

export const CameraController = () => {
  const { camera } = useThree();
  const status = useTimerStore((state) => state.status);
  
  // Base positions depending on status
  // We want to be closer when focusing, and pull back when idle/finished
  const targetPos = useRef(new THREE.Vector3(-2, 4, 16));
  // The point we look at. By looking at a negative X, the tree (at X=0) appears on the right side!
  const targetLookAt = useRef(new THREE.Vector3(-3, 4, 0));

  useEffect(() => {
    if (status === 'focusing') {
      gsap.to(targetPos.current, {
        x: -1,
        y: 3,
        z: 12,
        duration: 3,
        ease: 'power3.inOut'
      });
      gsap.to(targetLookAt.current, {
        x: -2,
        y: 4,
        z: 0,
        duration: 3,
        ease: 'power3.inOut'
      });
    } else {
      // Pull back to see the whole tree, and shift it heavily to the right side of the screen
      // so it doesn't overlap with the left-aligned task UI
      gsap.to(targetPos.current, {
        x: -4,
        y: 5,
        z: 16,
        duration: 3,
        ease: 'power3.inOut'
      });
      gsap.to(targetLookAt.current, {
        x: -4, // Look far left so tree is on the right
        y: 5,  // Look slightly higher to fit the full grown tree
        z: 0,
        duration: 3,
        ease: 'power3.inOut'
      });
    }
  }, [status]);

  useFrame((state, delta) => {
    // Calculate parallax offsets based on mouse pointer
    const parallaxX = state.pointer.x * 1.5;
    const parallaxY = state.pointer.y * 1.5;
    
    // Desired position = targetPos + parallax offset
    const desiredX = targetPos.current.x + parallaxX;
    const desiredY = targetPos.current.y + parallaxY;
    
    // Smoothly damp the camera's current position to the desired position
    camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredX, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredY, 2.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPos.current.z, 2.5, delta);
    
    // Look at the target LookAt point, slightly offset by mouse for extra depth
    const finalLookAt = new THREE.Vector3(
      targetLookAt.current.x + state.pointer.x * 0.5,
      targetLookAt.current.y + state.pointer.y * 0.5,
      targetLookAt.current.z
    );
    
    camera.lookAt(finalLookAt);
  });

  return null;
};
