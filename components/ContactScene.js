'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Torus, Line, Text3D } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Glitch } from '@react-three/postprocessing';
import { GlitchMode } from 'postprocessing';
import * as THREE from 'three';

// Dynamic particle field representing global connectivity
function GlobalParticleField() {
  const points = useRef();
  const particlesCount = 3000;
  
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      // Create spherical distribution for global feel
      const radius = 15 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Dynamic color based on position
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        colors[i3] = 0.86; colors[i3 + 1] = 0.44; colors[i3 + 2] = 0.24; // Orange
      } else if (colorChoice < 0.7) {
        colors[i3] = 1.0; colors[i3 + 1] = 0.65; colors[i3 + 2] = 0.15; // Accent
      } else {
        colors[i3] = 0.95; colors[i3 + 1] = 0.96; colors[i3 + 2] = 0.97; // Light
      }
      
      sizes[i] = Math.random() * 2 + 0.5;
    }
    
    return [positions, colors, sizes];
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += 0.0005;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      
      // Pulsing connectivity effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      points.current.scale.setScalar(scale);
    }
  });

  return (
    <Points ref={points} positions={positions} colors={colors} sizes={sizes} stride={3}>
      <PointMaterial 
        transparent 
        vertexColors 
        size={1.2} 
        sizeAttenuation 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Enhanced globe with wireframe continents
function ConnectedGlobe({ mousePosition }) {
  const globeRef = useRef();
  const wireframeRef = useRef();
  
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.003;
      globeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Interactive mouse response
      globeRef.current.rotation.x += mousePosition.y * 0.1;
      globeRef.current.rotation.y += mousePosition.x * 0.1;
    }
    
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Main globe */}
      <Sphere ref={globeRef} args={[4, 64, 64]}>
        <meshStandardMaterial 
          color="#1A3B44" 
          metalness={0.8} 
          roughness={0.2} 
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Wireframe overlay */}
      <Sphere ref={wireframeRef} args={[4.05, 32, 32]}>
        <meshBasicMaterial 
          color="#DC713E" 
          wireframe={true}
          transparent
          opacity={0.6}
        />
      </Sphere>
      
      {/* Inner glow */}
      <Sphere args={[3.8, 32, 32]}>
        <meshBasicMaterial 
          color="#FFA726" 
          transparent
          opacity={0.1}
        />
      </Sphere>
    </group>
  );
}

// Advanced communication network visualization
function CommunicationNetwork() {
  const groupRef = useRef();
  
  const networks = useMemo(() => {
    const nets = [];
    const layers = 6;
    
    for (let i = 0; i < layers; i++) {
      const radius = 5 + i * 0.8;
      const segments = Math.PI * (0.3 + i * 0.1);
      
      nets.push({
        radius,
        segments,
        rotationOffset: (i * Math.PI) / layers,
        color: i % 2 === 0 ? "#DC713E" : "#FFA726",
        intensity: 2 - i * 0.2
      });
    }
    
    return nets;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.002;
      groupRef.current.rotation.z += 0.003;
      
      // Dynamic scaling
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      {networks.map((net, i) => (
        <Torus 
          key={i}
          args={[net.radius, 0.03, 16, 100, net.segments]} 
          rotation-x={Math.PI / (2 + i * 0.2)} 
          rotation-y={net.rotationOffset}
        >
          <meshStandardMaterial 
            color={net.color} 
            emissive={net.color} 
            emissiveIntensity={net.intensity} 
            toneMapped={false}
            transparent
            opacity={0.8}
          />
        </Torus>
      ))}
    </group>
  );
}

// Floating data streams
function DataStreams() {
  const streamsRef = useRef();
  const streamCount = 12;
  
  const streams = useMemo(() => {
    return [...Array(streamCount)].map((_, i) => {
      const angle = (i / streamCount) * Math.PI * 2;
      const radius = 8;
      
      return {
        start: [
          Math.cos(angle) * radius,
          -2 + Math.random() * 4,
          Math.sin(angle) * radius
        ],
        end: [
          Math.cos(angle + Math.PI) * radius * 0.5,
          2 + Math.random() * 4,
          Math.sin(angle + Math.PI) * radius * 0.5
        ],
        color: i % 3 === 0 ? "#DC713E" : i % 3 === 1 ? "#FFA726" : "#F3F4F6"
      };
    });
  }, []);

  useFrame((state) => {
    if (streamsRef.current) {
      streamsRef.current.rotation.y += 0.01;
      
      // Pulsing effect
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      streamsRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={streamsRef}>
      {streams.map((stream, i) => (
        <Line
          key={i}
          points={[stream.start, stream.end]}
          color={stream.color}
          lineWidth={2}
          transparent
          opacity={0.7}
        />
      ))}
    </group>
  );
}

// Orbiting contact satellites
function ContactSatellites() {
  const groupRef = useRef();
  const satelliteCount = 8;
  
  const satellites = useMemo(() => {
    return [...Array(satelliteCount)].map((_, i) => {
      const angle = (i / satelliteCount) * Math.PI * 2;
      const radius = 12 + Math.random() * 4;
      const height = -2 + Math.random() * 4;
      
      return {
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ],
        scale: 0.1 + Math.random() * 0.1,
        speed: 0.01 + Math.random() * 0.01
      };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      
      groupRef.current.children.forEach((satellite, i) => {
        const sat = satellites[i];
        satellite.rotation.x += sat.speed;
        satellite.rotation.z += sat.speed * 0.7;
        
        // Floating motion
        satellite.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.01;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {satellites.map((satellite, i) => (
        <mesh
          key={i}
          position={satellite.position}
          scale={satellite.scale}
        >
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial 
            color="#FFA726" 
            emissive="#FFA726"
            emissiveIntensity={1.5}
            metalness={0.8}
            roughness={0.2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// Dynamic lighting system
function DynamicLighting({ mousePosition }) {
  const lightRef = useRef();
  
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = mousePosition.x * 10;
      lightRef.current.position.y = mousePosition.y * 10;
      
      // Intensity variation
      lightRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} color="#1A3B44" />
      <directionalLight 
        position={[15, 15, 10]} 
        intensity={1.2} 
        color="#DC713E"
        castShadow
      />
      <pointLight 
        ref={lightRef}
        position={[0, 0, 10]} 
        intensity={2} 
        color="#FFA726"
        distance={30}
      />
      <spotLight
        position={[0, 25, 0]}
        angle={0.4}
        penumbra={0.5}
        intensity={1}
        color="#DC713E"
        distance={50}
      />
    </>
  );
}

export default function ContactScene({ mousePosition }) {
  return (
    <>
      {/* Dynamic gradient background */}
      <color attach="background" args={['#040608']} />
      <fog attach="fog" args={['#1A3B44', 15, 50]} />
      
      {/* Lighting */}
      <DynamicLighting mousePosition={mousePosition} />
      
      {/* 3D Elements */}
      <GlobalParticleField />
      <ConnectedGlobe mousePosition={mousePosition} />
      <CommunicationNetwork />
      <DataStreams />
      <ContactSatellites />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom 
          intensity={1.5} 
          luminanceThreshold={0.05} 
          luminanceSmoothing={0.9} 
          height={1024} 
        />
        <ChromaticAberration 
          offset={[0.0003, 0.0008]} 
        />
        <Vignette 
          eskil={false} 
          offset={0.05} 
          darkness={0.3} 
        />
        <Glitch
          delay={[8, 12]}
          duration={[0.1, 0.3]}
          strength={[0.1, 0.2]}
          mode={GlitchMode.SPORADIC}
          active={true}
          ratio={0.85}
        />
      </EffectComposer>
    </>
  );
}
