import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTimerStore } from '../../store/useTimerStore';

gsap.registerPlugin(useGSAP);

const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

// Generates an ethereal tree structure
const generateBranches = (depth: number, maxDepth: number, parentLength: number, seed: number): any => {
  if (depth > maxDepth) return null;
  
  const length = parentLength * (0.7 + seededRandom(seed) * 0.2);
  const radiusBottom = depth === 0 ? length * 0.15 : parentLength * 0.05;
  const radiusTop = length * 0.03;
  const branches = [];
  
  if (depth < maxDepth) {
    const numChildren = depth === 0 ? 3 : 2 + Math.floor(seededRandom(seed + depth) * 2);
    for (let i = 0; i < numChildren; i++) {
      const childSeed = seed + depth * 10 + i;
      branches.push({
        angleY: (i / numChildren) * Math.PI * 2 + (seededRandom(childSeed) * 0.5),
        angleZ: Math.PI / 6 + (seededRandom(childSeed + 1) * 0.3),
        children: generateBranches(depth + 1, maxDepth, length, childSeed + 2)
      });
    }
  }

  return { length, radiusBottom, radiusTop, branches, seed };
};

const BranchNode = ({ data, depth = 0, isDead = false }: { data: any, depth?: number, isDead: boolean }) => {
  const meshRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  const branchMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const crystalMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const crystalFloatY = useRef(0);
  
  const isLeaf = !data.branches || data.branches.length === 0;

  useGSAP(() => {
    if (isDead) {
      if (crystalRef.current) {
        // Crystals shatter / fall down
        gsap.to(crystalRef.current.position, {
          y: -data.length - depth,
          x: (Math.random() - 0.5) * 2,
          z: (Math.random() - 0.5) * 2,
          duration: 2 + Math.random(),
          ease: 'power3.in',
        });
        gsap.to(crystalRef.current.rotation, {
          x: Math.random() * Math.PI * 4,
          z: Math.random() * Math.PI * 4,
          duration: 2 + Math.random(),
          ease: 'power2.in',
        });
      }
      if (meshRef.current) {
        // Branches droop
        gsap.to(meshRef.current.rotation, {
          x: meshRef.current.rotation.x + Math.PI / 2,
          duration: 3 + Math.random(),
          ease: 'power2.inOut',
        });
      }
      if (branchMaterialRef.current) {
        gsap.to(branchMaterialRef.current.color, {
          r: 0.15,
          g: 0.15,
          b: 0.15,
          duration: 3,
        });
      }
      if (crystalMaterialRef.current) {
        gsap.to(crystalMaterialRef.current.color, {
          r: 0.2,
          g: 0.2,
          b: 0.2,
          duration: 2,
        });
        gsap.to(crystalMaterialRef.current, {
          emissiveIntensity: 0,
          duration: 1,
        });
      }
    }
  }, [isDead]);

  useFrame(() => {
    if (!isDead && isLeaf && crystalRef.current) {
      // Float animation
      crystalFloatY.current += 0.02;
      crystalRef.current.position.y = data.length + Math.sin(crystalFloatY.current + data.seed) * 0.1;
      crystalRef.current.rotation.y += 0.01;
      crystalRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh position={[0, data.length / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[data.radiusTop, data.radiusBottom, data.length, 8]} />
        <meshStandardMaterial 
          ref={branchMaterialRef}
          color={isDead ? "#262626" : "#3f2e1a"} 
          roughness={0.9} 
        />
      </mesh>
      
      {/* Ethereal Crystals at the tips */}
      {isLeaf && (
        <mesh ref={crystalRef} position={[0, data.length, 0]} castShadow>
          <octahedronGeometry args={[data.length * 0.6, 0]} />
          <meshPhysicalMaterial 
            ref={crystalMaterialRef}
            color={isDead ? "#333333" : "#34d399"}
            emissive={isDead ? "#000000" : "#059669"}
            emissiveIntensity={isDead ? 0 : 2.5}
            transparent
            opacity={0.9}
            roughness={0.1}
            transmission={0.5}
            thickness={0.5}
          />
        </mesh>
      )}

      {/* Children */}
      {data.branches && data.branches.map((b: any, i: number) => (
        <group 
          key={i} 
          position={[0, data.length * 0.9, 0]} 
          rotation={[0, b.angleY, b.angleZ]}
        >
          <BranchNode data={b.children} depth={depth + 1} isDead={isDead} />
        </group>
      ))}
    </group>
  );
};

export const Plant = () => {
  const { progress, currentSeed, isDead } = useTimerStore();
  const plantRef = useRef<THREE.Group>(null);
  
  const treeData = useMemo(() => generateBranches(0, 3, 2.5, currentSeed || 12345), [currentSeed]);

  useGSAP(() => {
    if (plantRef.current) {
      const targetScale = 0.1 + (progress * 1.2); // grow larger
      
      gsap.to(plantRef.current.scale, {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: 2,
        ease: 'power3.out',
      });
    }
  }, { dependencies: [progress], scope: plantRef });

  // Very slow magical sway
  useFrame((state) => {
    if (plantRef.current && !isDead) {
      plantRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
      plantRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.15) * 0.03;
    }
  });

  return (
    <group ref={plantRef} position={[0, -2, 0]}>
      {treeData && <BranchNode data={treeData} isDead={isDead} />}
    </group>
  );
};