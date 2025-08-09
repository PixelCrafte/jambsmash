// 2. components/scenes/AboutScene.js
// This is the new, unique 3D scene for the About page.

'use client';

import { useRef, useLayoutEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import * as THREE from 'three';

// A component for the central glowing core
function Core() {
  return (
    <Sphere args={[0.5, 32, 32]}>
      <meshStandardMaterial color="#DC713E" emissive="#DC713E" emissiveIntensity={3} toneMapped={false} />
    </Sphere>
  );
}

// A component for the network of nodes and connections
function Network() {
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, []);

  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 20; i++) {
        const start = nodes[Math.floor(Math.random() * nodes.length)];
        const end = nodes[Math.floor(Math.random() * nodes.length)];
        lines.push({ start, end });
    }
    return lines;
  }, [nodes]);

  const group = useRef();
  const spheres = useRef([]);
  const lines = useRef([]);

  useFrame((state, delta) => {
    spheres.current.forEach((sphere, i) => {
      const node = nodes[i];
      let { t, factor, speed, xFactor, yFactor, zFactor } = node;
      t = node.t += speed * delta;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      sphere.position.set(
        (node.mx / 10) * b + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (node.my / 10) * a + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (node.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      sphere.scale.setScalar(s * 0.1 + 0.1);
    });
  });

  return (
    <group ref={group} dispose={null}>
      {nodes.map((_, i) => (
        <Sphere key={i} ref={el => spheres.current[i] = el} args={[0.2, 16, 16]}>
            <meshBasicMaterial color="#FFA726" transparent opacity={0.5} />
        </Sphere>
      ))}
    </group>
  );
}


// Camera controller for the about page
function CameraController({ scrollPosition }) {
  const { camera } = useThree();
  const timeline = useRef();

  useLayoutEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    const positions = [
      { x: 0, y: 0, z: 12 },   // Intro
      { x: 0, y: 2, z: 8 },    // Mission/Vision
      { x: -5, y: 0, z: 7 },   // Core Values
      { x: 5, y: -2, z: 7 },   // Directors
    ];
    const scrollStops = [0, 0.33, 0.66, 1.0];

    scrollStops.forEach((stop, index) => {
      timeline.current.to(camera.position, { ...positions[index], duration: 1.5, ease: 'power2.inOut' }, stop);
      timeline.current.to(camera.rotation, { y: positions[index].x / 20, x: -positions[index].y / 20, duration: 1.5, ease: 'power2.inOut' }, stop);
    });
  }, [camera]);

  useFrame(() => {
    if (timeline.current) {
      timeline.current.seek(scrollPosition * timeline.current.duration());
    }
  });
  return null;
}

export default function AboutScene({ scrollPosition }) {
  return (
    <>
      <color attach="background" args={['#080f1a']} />
      <fog attach="fog" args={['#080f1a', 10, 25]} />
      <ambientLight intensity={0.4} />
      
      <Core />
      <Network />
      <CameraController scrollPosition={scrollPosition} />

      <EffectComposer>
        <Bloom intensity={0.75} luminanceThreshold={0.1} luminanceSmoothing={0.8} height={1024} />
      </EffectComposer>
    </>
  );
}
