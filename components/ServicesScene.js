import React, { Suspense, useState, useRef, useLayoutEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Box, Cylinder, Sphere, Torus, Text3D, Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

// Enhanced Loader with brand styling
const Loader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-brand-accent border-b-transparent rounded-full animate-spin animate-reverse"></div>
    </div>
  </div>
);

// Floating particles system
function ParticleField() {
  const points = useRef();
  const particleCount = 1000;
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.02;
      points.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#DC713E"
        size={0.1}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Enhanced Robotic Arm with more complex animations
function RoboticArm({ position, phase = 0 }) {
  const group = useRef();
  const arm1 = useRef();
  const arm2 = useRef();
  const claw1 = useRef();
  const claw2 = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + phase;
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.3) * 0.8;
      group.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3;
    }
    if (arm1.current) {
      arm1.current.rotation.z = Math.sin(t * 0.7) * 0.5;
    }
    if (arm2.current) {
      arm2.current.rotation.x = Math.cos(t * 0.8) * 0.7;
    }
    if (claw1.current && claw2.current) {
      const clawMotion = Math.sin(t * 2) * 0.3;
      claw1.current.rotation.z = clawMotion;
      claw2.current.rotation.z = -clawMotion;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
      <group ref={group} position={position}>
        {/* Base */}
        <Cylinder args={[0.4, 0.6, 0.8, 32]} position={[0, -2, 0]}>
          <MeshDistortMaterial 
            color="#1A3B44" 
            metalness={0.9} 
            roughness={0.1}
            distort={0.1}
            speed={2}
          />
        </Cylinder>
        
        {/* Main Arm */}
        <Box ref={arm1} args={[0.4, 2, 0.4]} position={[0, -0.5, 0]}>
          <meshStandardMaterial 
            color="#6B7280" 
            metalness={0.8} 
            roughness={0.2}
            emissive="#1A3B44"
            emissiveIntensity={0.1}
          />
        </Box>
        
        {/* Secondary Arm */}
        <Box ref={arm2} args={[1.5, 0.3, 0.3]} position={[0.7, 0.5, 0]}>
          <meshStandardMaterial 
            color="#DC713E" 
            emissive="#DC713E" 
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.1}
          />
        </Box>
        
        {/* Claws */}
        <Box ref={claw1} args={[0.6, 0.1, 0.1]} position={[1.2, 0.6, 0.1]}>
          <meshStandardMaterial color="#FFA726" emissive="#FFA726" emissiveIntensity={0.2} />
        </Box>
        <Box ref={claw2} args={[0.6, 0.1, 0.1]} position={[1.2, 0.6, -0.1]}>
          <meshStandardMaterial color="#FFA726" emissive="#FFA726" emissiveIntensity={0.2} />
        </Box>
        
        {/* Energy Core */}
        <Sphere args={[0.15]} position={[0, 0.2, 0]}>
          <meshStandardMaterial 
            color="#DC713E" 
            emissive="#DC713E" 
            emissiveIntensity={0.8}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </group>
    </Float>
  );
}

// Dynamic Energy Streams
function EnergyStreams() {
  const group = useRef();
  const streamCount = 15;
  
  const streams = useMemo(() => {
    return Array.from({ length: streamCount }, (_, i) => {
      const radius = 8 + Math.random() * 5;
      const height = 15;
      const points = [];
      
      for (let j = 0; j <= 50; j++) {
        const t = j / 50;
        const angle = i * (Math.PI * 2 / streamCount) + t * Math.PI * 4;
        const x = Math.cos(angle) * radius * (1 - t * 0.3);
        const z = Math.sin(angle) * radius * (1 - t * 0.3);
        const y = -height/2 + t * height + Math.sin(t * Math.PI * 3) * 0.5;
        points.push(new THREE.Vector3(x, y, z));
      }
      
      return new THREE.CatmullRomCurve3(points);
    });
  }, [streamCount]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
      group.current.children.forEach((line, i) => {
        if (line.material.uniforms?.dashOffset) {
          line.material.uniforms.dashOffset.value -= 0.05;
        }
      });
    }
  });

  return (
    <group ref={group}>
      {streams.map((curve, i) => {
        const points = curve.getPoints(50);
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineDashedMaterial
              color={i % 2 === 0 ? "#DC713E" : "#FFA726"}
              dashSize={0.5}
              gapSize={0.3}
              transparent
              opacity={0.8}
              linewidth={2}
            />
          </line>
        );
      })}
    </group>
  );
}

// Floating Holographic Elements
function HolographicElements() {
  const elements = useRef();
  
  useFrame((state) => {
    if (elements.current) {
      elements.current.children.forEach((child, i) => {
        child.rotation.x = state.clock.elapsedTime * (0.5 + i * 0.1);
        child.rotation.y = state.clock.elapsedTime * (0.3 + i * 0.05);
        child.position.y = Math.sin(state.clock.elapsedTime + i) * 0.5;
      });
    }
  });

  return (
    <group ref={elements}>
      {/* Security Shield */}
      <Torus args={[1, 0.1, 16, 32]} position={[-6, 2, -3]}>
        <meshStandardMaterial 
          color="#1A3B44" 
          emissive="#1A3B44" 
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
        />
      </Torus>
      
      {/* Automation Gear */}
      <Torus args={[0.8, 0.3, 8, 24]} position={[6, -1, -4]}>
        <meshStandardMaterial 
          color="#DC713E" 
          emissive="#DC713E" 
          emissiveIntensity={0.3}
          metalness={0.8}
        />
      </Torus>
      
      {/* Solar Panel Representation */}
      <Box args={[2, 0.1, 1.5]} position={[0, 4, -5]}>
        <meshStandardMaterial 
          color="#0F4C75" 
          emissive="#DC713E" 
          emissiveIntensity={0.2}
          metalness={0.9}
        />
      </Box>
      
      {/* Instrumentation Sphere */}
      <Sphere args={[0.6]} position={[-3, -3, -2]}>
        <MeshDistortMaterial
          color="#FFA726"
          emissive="#FFA726"
          emissiveIntensity={0.4}
          distort={0.3}
          speed={3}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </group>
  );
}

// Dynamic Camera Controller with smooth easing
function CameraController({ scrollPosition }) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  
  useFrame(() => {
    const t = scrollPosition;
    
    // Define camera positions for each section
    const positions = [
      { pos: [0, 0, 10], look: [0, 0, 0] },      // Hero
      { pos: [-8, 3, 6], look: [-2, 0, -2] },   // Security
      { pos: [8, -2, 7], look: [2, -1, -3] },   // Automation  
      { pos: [-5, 5, 8], look: [-1, 2, -2] },   // Instrumentation
      { pos: [3, -4, 9], look: [0, -1, -1] },   // Solar
      { pos: [0, 0, 12], look: [0, 0, 0] }      // CTA
    ];
    
    const sectionIndex = Math.min(Math.floor(t * positions.length), positions.length - 1);
    const nextIndex = Math.min(sectionIndex + 1, positions.length - 1);
    const localT = (t * positions.length) % 1;
    
    // Smooth interpolation between positions
    const currentPos = positions[sectionIndex];
    const nextPos = positions[nextIndex];
    
    targetPosition.current.set(
      THREE.MathUtils.lerp(currentPos.pos[0], nextPos.pos[0], localT),
      THREE.MathUtils.lerp(currentPos.pos[1], nextPos.pos[1], localT),
      THREE.MathUtils.lerp(currentPos.pos[2], nextPos.pos[2], localT)
    );
    
    targetLookAt.current.set(
      THREE.MathUtils.lerp(currentPos.look[0], nextPos.look[0], localT),
      THREE.MathUtils.lerp(currentPos.look[1], nextPos.look[1], localT),
      THREE.MathUtils.lerp(currentPos.look[2], nextPos.look[2], localT)
    );
    
    // Smooth camera movement
    camera.position.lerp(targetPosition.current, 0.05);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}

// Enhanced Services Scene
export default function ServicesScene({ scrollPosition = 0 }) {
  return (
    <>
      <color attach="background" args={['#1A3B44']} />
      <fog attach="fog" args={['#1A3B44', 8, 25]} />
      
      {/* Dynamic Lighting Setup */}
      <ambientLight intensity={0.3} color="#1A3B44" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={2} 
        color="#DC713E"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 0, 8]} intensity={1} color="#FFA726" />
      <spotLight 
        position={[-10, 5, 5]} 
        intensity={1.5} 
        color="#0F4C75"
        angle={0.6}
        penumbra={0.5}
      />
      
      {/* Background Elements */}
      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade />
      <ParticleField />
      
      {/* Main 3D Elements */}
      <RoboticArm position={[-6, 0, -3]} phase={0} />
      <RoboticArm position={[6, 0, -4]} phase={Math.PI} />
      <RoboticArm position={[0, -2, -6]} phase={Math.PI/2} />
      
      <EnergyStreams />
      <HolographicElements />
      
      {/* Central Focus Element */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Torus args={[3, 0.5, 16, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#DC713E"
            emissive="#DC713E"
            emissiveIntensity={0.5}
            distort={0.2}
            speed={2}
            metalness={0.8}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </Torus>
      </Float>
      
      <CameraController scrollPosition={scrollPosition} />

      {/* Post-processing Effects */}
      <EffectComposer>
        <Bloom 
          intensity={0.8} 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.9} 
          height={1024} 
        />
        <ChromaticAberration offset={[0.002, 0.002]} />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
    </>
  );
}
