// 2. components/scenes/ContactScene.js
// This is the new, unique 3D scene for the Contact page.

'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// A component for the main globe
function Globe() {
  const globeRef = useRef();

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Sphere ref={globeRef} args={[3, 64, 64]}>
      <meshStandardMaterial 
        color="#1A3B44" 
        metalness={0.8} 
        roughness={0.3} 
        wireframe={true} 
      />
    </Sphere>
  );
}

// A component for the animated communication arcs
function CommunicationArcs() {
  const groupRef = useRef();
  
  useFrame((state, delta) => {
    if(groupRef.current) {
      groupRef.current.rotation.x += delta * 0.05;
      groupRef.current.rotation.z += delta * 0.07;
    }
  });

  return (
    <group ref={groupRef}>
      <Torus args={[4, 0.02, 16, 100, Math.PI * 0.8]} rotation-x={Math.PI / 1.5}>
        <meshStandardMaterial color="#DC713E" emissive="#DC713E" emissiveIntensity={2} toneMapped={false} />
      </Torus>
       <Torus args={[4.2, 0.02, 16, 100, Math.PI * 0.6]} rotation-x={Math.PI / 1.8} rotation-y={Math.PI / 2}>
        <meshStandardMaterial color="#FFA726" emissive="#FFA726" emissiveIntensity={1.5} toneMapped={false} />
      </Torus>
    </group>
  );
}


export default function ContactScene() {
  return (
    <>
      <color attach="background" args={['#050809']} />
      <fog attach="fog" args={['#050809', 8, 20]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#DC713E" />
      
      <Globe />
      <CommunicationArcs />

      <EffectComposer>
        <Bloom intensity={0.55} luminanceThreshold={0.2} luminanceSmoothing={0.9} height={1024} />
      </EffectComposer>
    </>
  );
}
