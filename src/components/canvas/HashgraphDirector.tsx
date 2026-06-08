import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, useAnimations } from '@react-three/drei';
import { KTX2Loader } from 'three-stdlib';
import { useTimerStore } from '../../store/useTimerStore';

const DRACO_URL = '/draco/gltf/';
const BASIS_URL = '/basis/';

const MODELS = [
  '/models/intro_compressed.glb',
  '/models/human_2.glb',
  '/models/rocks.glb',
  '/models/investors_compressed.glb',
  '/models/outro_compressed.glb'
];

const HashgraphModel = ({ url, isBg = false, visible = true }: { url: string, isBg?: boolean, visible?: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const gl = useThree(state => state.gl);
  
  // Memoize the KTX2 loader so it's not recreated on every render
  const ktx2Loader = useMemo(() => new KTX2Loader().setTranscoderPath(BASIS_URL).detectSupport(gl), [gl]);

  const { scene, animations } = useGLTF(url, DRACO_URL, true, (loader) => {
    loader.setKTX2Loader(ktx2Loader);
  });
  
  const { actions } = useAnimations(animations, group);
  const { progress, status } = useTimerStore();

  useEffect(() => {
    Object.values(actions).forEach(action => {
      if (action) {
        action.play();
        action.paused = true;
      }
    });

    // Remove the fake wireframe forcing to allow the true KTX2 materials to render
    // The original hashgraph GLBs contain their own highly-optimized shaders/materials.
  }, [actions, scene]);

  useFrame((state) => {
    if (!group.current || !visible) return;
    
    // Parallax
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * (isBg ? 0.05 : 0.2), 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * (isBg ? 0.05 : 0.2), 0.05);

    const hasAnimations = Object.values(actions).length > 0;

    if (hasAnimations) {
      Object.values(actions).forEach(action => {
        if (action) {
          const duration = action.getClip().duration;
          const targetTime = status === 'idle' ? 0 : progress * duration;
          action.time = targetTime;
        }
      });
    } else {
      const time = state.clock.elapsedTime;
      group.current.rotation.z = time * (isBg ? 0.02 : 0.05) + (status !== 'idle' ? progress * Math.PI * 2 : 0);
    }
  });

  return (
    <group ref={group} scale={isBg ? 2 : 1.2} position={isBg ? [0, 0, -8] : [0, 0, -2]} visible={visible}>
      <primitive object={scene} />
    </group>
  );
};

export const HashgraphDirector = () => {
  const { progress } = useTimerStore();

  let activeIndex = 0;
  if (progress < 0.1) activeIndex = 0;
  else if (progress < 0.3) activeIndex = 1;
  else if (progress < 0.6) activeIndex = 2;
  else if (progress < 0.8) activeIndex = 3;
  else activeIndex = 4;

  return (
    <>
      <HashgraphModel url="/models/bg.glb" isBg={true} />
      
      {MODELS.map((url, index) => (
        <HashgraphModel 
          key={url} 
          url={url} 
          visible={index === activeIndex} 
        />
      ))}
    </>
  );
};
