// Background3D.jsx
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Line, Box, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

// Energy Particles System
function EnergyParticles() {
  const points = useRef();
  const particleCount = 2000;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 15 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Alternate between orange and accent colors
      if (Math.random() > 0.5) {
        colors[i3] = 220 / 255;
        colors[i3 + 1] = 113 / 255;
        colors[i3 + 2] = 62 / 255;
      } else {
        colors[i3] = 255 / 255;
        colors[i3 + 1] = 167 / 255;
        colors[i3 + 2] = 38 / 255;
      }
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.2;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Central Energy Core
function EnergyCore() {
  const meshRef = useRef();
  const ringRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial
          color="#DC713E"
          emissive="#FFA726"
          emissiveIntensity={0.5}
          wireframe={true}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[3, 0.3, 16, 32]} />
        <meshStandardMaterial
          color="#FFA726"
          emissive="#DC713E"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

// Network Lines
function NetworkLines() {
  const groupRef = useRef();
  
  const lines = useMemo(() => {
    const linesArray = [];
    const nodeCount = 8;
    
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 6;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 4;
      
      // Connect to center
      linesArray.push([[0, 0, 0], [x, y, z]]);
      
      // Connect to next node
      const nextAngle = ((i + 1) % nodeCount / nodeCount) * Math.PI * 2;
      const nextX = Math.cos(nextAngle) * radius;
      const nextZ = Math.sin(nextAngle) * radius;
      const nextY = (Math.random() - 0.5) * 4;
      linesArray.push([[x, y, z], [nextX, nextY, nextZ]]);
    }
    
    return linesArray;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((linePoints, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array(linePoints.flat())}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#FFA726" opacity={0.4} transparent />
        </line>
      ))}
    </group>
  );
}

// Floating Cubes
function FloatingCubes() {
  const cubes = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 20
      ],
      scale: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.5 + 0.5
    }));
  }, []);

  return (
    <>
      {cubes.map((cube) => (
        <FloatingCube key={cube.id} {...cube} />
      ))}
    </>
  );
}

function FloatingCube({ position, scale, speed }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#1A3B44"
        emissive="#DC713E"
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Main Scene
export default function Scene() {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FFA726" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#DC713E" />
      <pointLight position={[0, 0, 0]} intensity={1} color="#FFA726" />
      
      {/* 3D Objects */}
      <EnergyCore />
      <EnergyParticles />
      <NetworkLines />
      <FloatingCubes />
      
      {/* Allow camera control for debugging - remove in production */}
      <OrbitControls enableZoom={false} enablePan={false} />
      
      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.5}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.9} />
      </EffectComposer>
    </>
  );
}

// Main Component - Export this
export function Background3D() {
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%', 
      height: '100%', 
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1A3B44 100%)',
      zIndex: -1
    }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
