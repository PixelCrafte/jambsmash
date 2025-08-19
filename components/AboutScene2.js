// AboutScene.js - Corrected version
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Text, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, Scanline, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing'; // Import BlendFunction from postprocessing
import * as THREE from 'three';

// Data Grid Wave Effect
function DataWave() {
  const meshRef = useRef();
  const [geometry, setGeometry] = useState(null);
  
  useEffect(() => {
    const geometry = new THREE.PlaneGeometry(40, 40, 50, 50);
    setGeometry(geometry);
  }, []);
  
  useFrame((state) => {
    if (meshRef.current && geometry) {
      const { position } = geometry.attributes;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        
        const waveX = Math.sin(x * 0.3 + time) * 0.5;
        const waveY = Math.sin(y * 0.3 + time * 0.8) * 0.5;
        const z = (waveX + waveY) * 2;
        
        position.setZ(i, z);
      }
      
      position.needsUpdate = true;
      meshRef.current.rotation.x = -Math.PI / 2.5;
    }
  });
  
  if (!geometry) return null;
  
  return (
    <mesh ref={meshRef} position={[0, -8, 0]} geometry={geometry}>
      <meshStandardMaterial
        color="#1A3B44"
        emissive="#DC713E"
        emissiveIntensity={0.1}
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Hexagonal Grid System
function HexagonalGrid() {
  const groupRef = useRef();
  
  const hexagons = useMemo(() => {
    const hexArray = [];
    const size = 1.5;
    const rows = 7;
    const cols = 7;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * size * 1.5 - (cols * size * 0.75);
        const z = row * size * Math.sqrt(3) - (rows * size * Math.sqrt(3) / 2);
        const offset = row % 2 === 0 ? 0 : size * 0.75;
        
        hexArray.push({
          position: [x + offset, 0, z],
          delay: Math.random() * 2,
          speed: 0.5 + Math.random() * 0.5
        });
      }
    }
    return hexArray;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });
  
  return (
    <group ref={groupRef} position={[0, -3, 0]}>
      {hexagons.map((hex, i) => (
        <Hexagon key={i} {...hex} />
      ))}
    </group>
  );
}

function Hexagon({ position, delay, speed }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = 
        position[1] + Math.sin(time * speed + delay) * 0.5;
      meshRef.current.scale.y = 
        1 + Math.sin(time * speed * 2 + delay) * 0.3;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.5, 0.5, 0.2, 6]} />
      <meshStandardMaterial
        color="#6B7280"
        emissive="#FFA726"
        emissiveIntensity={0.2}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

// Solar System Orbit Visualization
function OrbitalSystem() {
  const groupRef = useRef();
  
  const orbits = useMemo(() => [
    { radius: 4, speed: 1, size: 0.3, color: "#DC713E" },
    { radius: 6, speed: 0.7, size: 0.4, color: "#FFA726" },
    { radius: 8, speed: 0.5, size: 0.35, color: "#F3F4F6" },
    { radius: 10, speed: 0.3, size: 0.5, color: "#6B7280" },
  ], []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Central Sun 
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#FFA726"
          emissive="#DC713E"
          emissiveIntensity={1}
        />
      </mesh>*/}
      
      {/* Orbiting Planets */}
      {orbits.map((orbit, i) => (
        <OrbitingPlanet key={i} {...orbit} />
      ))}
      
      {/* Orbital Rings */}
      {orbits.map((orbit, i) => (
        <mesh key={`ring-${i}`} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[orbit.radius, 0.02, 16, 100]} />
          <meshBasicMaterial color="#1A3B44" opacity={0.3} transparent />
        </mesh>
      ))}
    </group>
  );
}

function OrbitingPlanet({ radius, speed, size, color }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed;
      meshRef.current.position.x = Math.cos(time) * radius;
      meshRef.current.position.z = Math.sin(time) * radius;
      meshRef.current.rotation.y = time;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
}

// Floating Data Cubes
function DataCubes() {
  const cubes = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 25
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: Math.random() * 0.5 + 0.3
    }));
  }, []);
  
  return (
    <>
      {cubes.map((cube) => (
        <DataCube key={cube.id} {...cube} />
      ))}
    </>
  );
}

function DataCube({ position, rotation, scale }) {
  const meshRef = useRef();
  const edgesRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.15;
      
      const floatY = Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
      meshRef.current.position.y = position[1] + floatY;
    }
  });
  
  return (
    <group ref={meshRef} position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#1A3B44"
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial color="#FFA726" linewidth={2} />
      </lineSegments>
    </group>
  );
}

// Energy Beam Connections
function EnergyBeams() {
  const beamsRef = useRef();
  const [beams, setBeams] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newBeam = {
        id: Date.now(),
        startY: (Math.random() - 0.5) * 10,
        endY: (Math.random() - 0.5) * 10,
        x: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 20
      };
      
      setBeams(prev => [...prev.slice(-5), newBeam]);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <group ref={beamsRef}>
      {beams.map((beam) => (
        <EnergyBeam key={beam.id} {...beam} />
      ))}
    </group>
  );
}

function EnergyBeam({ startY, endY, x, z }) {
  const lineRef = useRef();
  const [opacity, setOpacity] = useState(0);
  
  useEffect(() => {
    setOpacity(1);
    const timer = setTimeout(() => setOpacity(0), 3000);
    return () => clearTimeout(timer);
  }, []);
  
  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.material.opacity = opacity;
    }
  });
  
  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([x, startY, z, x, endY, z])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#DC713E"
        transparent
        opacity={opacity}
        linewidth={3}
      />
    </line>
  );
}

// Binary Rain Effect
function BinaryRain() {
  const groupRef = useRef();
  const particleCount = 100;
  
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 30,
      y: Math.random() * 20,
      z: (Math.random() - 0.5) * 30,
      speed: Math.random() * 0.5 + 0.5
    }));
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y -= particles[i].speed * 0.1;
        if (child.position.y < -10) {
          child.position.y = 10;
        }
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={[particle.x, particle.y, particle.z]}>
          <planeGeometry args={[0.1, 0.5]} />
          <meshBasicMaterial
            color="#FFA726"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main Scene
export default function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.7} color="#FFA726" />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#DC713E" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#FFA726"
      />
      
      {/* 3D Elements */}
      <DataWave />
      <HexagonalGrid />
      <OrbitalSystem />
      <DataCubes />
      <EnergyBeams />
      <BinaryRain />
      
      {/* Camera Controls for testing */}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      
      {/* Post-processing - Fixed version */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          intensity={1.2}
        />
        <Scanline
          blendFunction={BlendFunction.OVERLAY}
          density={1.25}
          opacity={0.05}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.9} />
      </EffectComposer>
    </>
  );
}

// Main Export Component
export function AboutScene() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at center, #1A3B44 0%, #0a0a0a 100%)',
      zIndex: -1
    }}>
      <Canvas
        camera={{ position: [15, 5, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
