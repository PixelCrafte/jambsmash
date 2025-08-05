// 3. components/scenes/ServicesScene.js
// This file is correct. No changes are needed.

'use client';

import { useRef, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import * as THREE from 'three';

// RoboticArm and DataStreams components remain the same...
function RoboticArm({ position }) {
  const group = useRef();
  const arm1 = useRef();
  const arm2 = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (arm1.current && arm2.current) {
      arm1.current.rotation.y = Math.sin(t) * 0.5;
      arm2.current.rotation.z = Math.cos(t * 0.8) * 0.7;
    }
  });
  return (
    <group ref={group} position={position}>
      <Cylinder args={[0.2, 0.3, 0.5, 32]} position={[0, -1.5, 0]}>
        <meshStandardMaterial color="#1A3B44" metalness={0.9} roughness={0.2} />
      </Cylinder>
      <Box ref={arm1} args={[0.3, 1.5, 0.3]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#6B7280" metalness={0.8} roughness={0.3} />
      </Box>
      <Box ref={arm2} args={[1, 0.2, 0.2]} position={[0.5, 0.2, 0]}>
        <meshStandardMaterial color="#DC713E" emissive="#DC713E" emissiveIntensity={1} />
      </Box>
    </group>
  );
}

function DataStreams() {
    const count = 200;
    const lines = useRef();
    const points = Array.from({ length: count }, () => {
        const pos = new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20);
        const p = Array.from({ length: 10 }, () => pos.clone().add(new THREE.Vector3(0, Math.random() * -5, 0)));
        return new THREE.CatmullRomCurve3(p).getPoints(50);
    });
    useFrame((state, delta) => {
        if (lines.current) {
            lines.current.children.forEach(line => {
                line.material.uniforms.dashOffset.value -= delta * 0.1;
            });
        }
    });
    return (
        <group ref={lines}>
            {points.map((point, i) => (
                <line key={i}>
                    <bufferGeometry attach="geometry" setFromPoints={point} />
                    <lineDashedMaterial attach="material" color="#FFA726" dashSize={0.2} gapSize={0.2} />
                </line>
            ))}
        </group>
    );
}

// The CameraController now uses the scrollPosition prop
function CameraController({ scrollPosition }) {
  const { camera } = useThree();
  const timeline = useRef();

  useLayoutEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    const positions = [
      { x: 0, y: 0, z: 8 },      // Intro
      { x: -4, y: 1, z: 6 },     // Security
      { x: 4, y: -2, z: 5 },     // Automation
      { x: -3, y: 3, z: 7 },     // Instrumentation
      { x: 0, y: 0, z: 9 },      // Electrical/Solar
    ];
    // This defines the scroll percentage at which each animation target is reached
    const scrollStops = [0, 0.25, 0.5, 0.75, 1.0]; 

    scrollStops.forEach((stop, index) => {
      timeline.current.to(camera.position, { ...positions[index], duration: 1, ease: 'power2.inOut' }, stop);
      timeline.current.to(camera.rotation, { y: positions[index].x / 15, x: -positions[index].y / 15, duration: 1, ease: 'power2.inOut' }, stop);
    });
  }, [camera]);

  // useFrame now seeks the timeline based on the prop
  useFrame(() => {
    if (timeline.current) {
      timeline.current.seek(scrollPosition * timeline.current.duration());
    }
  });
  return null;
}

// The main scene component now accepts the prop and passes it down
export default function ServicesScene({ scrollPosition }) {
  return (
    <>
      <color attach="background" args={['#0a192f']} />
      <fog attach="fog" args={['#0a192f', 5, 20]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#DC713E" />

      <RoboticArm position={[-4, 0, -2]} />
      <RoboticArm position={[4, 0, -3]} />
      <DataStreams />
      <CameraController scrollPosition={scrollPosition} />

      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.3} luminanceSmoothing={0.9} height={1024} />
      </EffectComposer>
    </>
  );
}

