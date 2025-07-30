// 1. Create this new file at: components/Scene_Alternative.js

'use client';

import { useRef, useLayoutEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Torus, Icosahedron, Edges, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import * as THREE from 'three';

// A component for the central, complex model
function GyroscopeCore() {
  const groupRef = useRef();
  const { viewport, mouse } = useThree();

  useFrame((state, delta) => {
    // Animate the rings at different speeds
    if (groupRef.current) {
      groupRef.current.children[0].rotation.x += delta * 0.2;
      groupRef.current.children[1].rotation.y += delta * 0.3;
      groupRef.current.children[2].rotation.x += delta * -0.4;
    }
    // Make the model look towards the mouse position
    const x = (mouse.x * viewport.width) / 2.5;
    const y = (mouse.y * viewport.height) / 2.5;
    groupRef.current.lookAt(x, y, 1);
  });

  return (
    <group ref={groupRef}>
      <Torus args={[1, 0.02, 16, 100]} rotation-x={Math.PI / 2}>
        <meshStandardMaterial color="#DC713E" emissive="#DC713E" emissiveIntensity={2} metalness={0.9} roughness={0.1} />
      </Torus>
      <Torus args={[1.5, 0.03, 16, 100]} rotation-x={Math.PI / 2} rotation-y={Math.PI / 3}>
        <meshStandardMaterial color="#FFA726" emissive="#FFA726" emissiveIntensity={1.5} metalness={0.9} roughness={0.1} />
      </Torus>
      <Icosahedron args={[0.7, 1]}>
        <meshStandardMaterial color="#1A3B44" metalness={0.5} roughness={0.5} />
        <Edges scale={1.01}>
           <lineBasicMaterial color="#FFA726" />
        </Edges>
      </Icosahedron>
    </group>
  );
}

// A component for the background grid
function CircuitBoard() {
  return (
    <gridHelper 
      args={[50, 50, '#DC713E', '#1A3B44']} 
      position={[0, -5, 0]} 
      rotation-x={Math.PI / 2} 
    />
  );
}

// A component for the starfield background
function ParticleField() {
    const count = 5000;
    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 40;
        }
        return positions;
    }, [count]);

    return (
        <Points positions={positions}>
            <PointMaterial
                size={0.015}
                color="#FFA726"
                sizeAttenuation
                depthWrite={false}
            />
        </Points>
    );
}


// This component handles the camera animations based on scroll
function CameraController() {
  const scroll = useScroll();
  const { camera } = useThree();
  const timeline = useRef();

  useLayoutEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    // Define more dynamic camera positions
    const positions = [
      { x: 0, y: 0, z: 10 },    // Section 1: Home
      { x: 0, y: 2, z: 5 },     // Section 2: Vision (Zoom in)
      { x: 4, y: 0, z: 6 },     // Section 3: Services (Side view)
      { x: -3, y: 4, z: 8 },    // Section 4: Team (Top-down view)
      { x: 0, y: 0, z: 12 },    // Section 5: Contact (Zoom out)
    ];
    positions.forEach((pos, index) => {
      const progress = index / (positions.length - 1);
      timeline.current.to(camera.position, { ...pos, duration: 1.5, ease: 'power2.inOut' }, progress);
      timeline.current.to(camera.rotation, { y: pos.x / 10, x: -pos.y / 10, duration: 1.5, ease: 'power2.inOut' }, progress);
    });
  }, [camera]);

  useFrame(() => {
    if (timeline.current) {
      timeline.current.seek(scroll.offset * timeline.current.duration());
    }
  });
  return null;
}

// This is the main scene component for the alternative design
export default function Scene_Alternative() {
  return (
    <>
      <color attach="background" args={['#050809']} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#DC713E" />

      <GyroscopeCore />
      <CircuitBoard />
      <ParticleField />
      <CameraController />

      {/* Post-processing effects for a more vibrant look */}
      <EffectComposer>
        <Bloom 
          intensity={0.5} 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.9} 
          height={1024} 
        />
        <DepthOfField 
          focusDistance={0} 
          focalLength={0.02} 
          bokehScale={2} 
          height={480} 
        />
      </EffectComposer>
    </>
  );
}
