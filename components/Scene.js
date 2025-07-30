// 2. components/Scene.js
// Replace the contents of your Scene.js with this simplified version.
// The <Canvas> wrapper has been removed.

'use client';

import { useRef, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Torus } from '@react-three/drei';
import { gsap } from 'gsap';

// A more complex model representing the company's tech focus
function TechCoreModel() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Keep the model slowly rotating
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color="#DC713E" 
          metalness={0.8} 
          roughness={0.3} 
          emissive="#DC713E"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Orbiting Rings - representing different sectors */}
      <Torus args={[2.5, 0.05, 16, 100]} rotation-x={Math.PI / 2}>
        <meshStandardMaterial color="#1A3B44" metalness={0.9} roughness={0.1} />
      </Torus>
      <Torus args={[3, 0.05, 16, 100]} rotation-x={Math.PI / 2} rotation-y={Math.PI / 4}>
        <meshStandardMaterial color="#FFA726" metalness={0.9} roughness={0.1} />
      </Torus>
      <Torus args={[3.5, 0.05, 16, 100]} rotation-x={Math.PI / 2} rotation-y={-Math.PI / 4}>
        <meshStandardMaterial color="#6B7280" metalness={0.9} roughness={0.1} />
      </Torus>
    </group>
  );
}

// This component handles the camera animations based on scroll
function CameraController() {
  // We get the scroll data and the camera/scene from R3F's context
  const scroll = useScroll();
  const { camera } = useThree();
  const timeline = useRef();

  // Set up the GSAP timeline for camera movements
  useLayoutEffect(() => {
    timeline.current = gsap.timeline({ paused: true });

    // Define camera positions for each scroll section
    const positions = [
      { x: 0, y: 0, z: 10 },    // Section 1: Initial view
      { x: 5, y: 3, z: 8 },     // Section 2: Vision
      { x: -5, y: -2, z: 7 },   // Section 3: Services
      { x: 0, y: 0, z: 12 },    // Section 4: Contact
    ];

    positions.forEach((pos, index) => {
      const progress = index / (positions.length - 1);
      timeline.current.to(camera.position, { ...pos, duration: 1, ease: 'power2.inOut' }, progress);
      timeline.current.to(camera.rotation, { y: pos.x / 5, x: -pos.y / 5, duration: 1, ease: 'power2.inOut' }, progress);
    });
  }, [camera]);

  // Update the timeline's progress based on scroll
  useFrame(() => {
    if (timeline.current) {
      timeline.current.seek(scroll.offset * timeline.current.duration());
    }
  });

  return null;
}


export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={2} 
        color="#FFA726"
      />
      <pointLight position={[-10, -10, -10]} color="#DC713E" intensity={1} />
      
      <TechCoreModel />
      
      {/* The CameraController now gets scroll data via context */}
      <CameraController />
    </>
  );
}
