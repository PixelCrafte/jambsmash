'use client';

import { useRef, useLayoutEffect, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Sphere, Box, Cylinder, Torus, Float, MeshDistortMaterial, Environment, Sparkles, Trail, Text, Cloud, Sky, Stars, Effects, PositionalAudio } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

// Realistic Circuit City - A sprawling tech metropolis
function CircuitMetropolis({ position, scale = 1 }) {
  const groupRef = useRef();
  const lightsRef = useRef([]);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
    
    // Dynamic lighting effects
    lightsRef.current.forEach((light, i) => {
      if (light) {
        light.intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.3;
      }
    });
  });

  const buildings = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 15,
        Math.random() * 3 + 1,
        (Math.random() - 0.5) * 15
      ],
      height: Math.random() * 4 + 2,
      width: Math.random() * 0.8 + 0.5,
      depth: Math.random() * 0.8 + 0.5,
      color: Math.random() > 0.7 ? "#DC713E" : Math.random() > 0.5 ? "#1A3B44" : "#0a2a3a"
    }));
  }, []);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Ground plane with circuit pattern */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.9} 
          roughness={0.1}
          normalScale={[0.5, 0.5]}
        />
      </mesh>
      
      {/* Circuit pattern on ground */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh 
          key={`trace-${i}`} 
          position={[
            (Math.random() - 0.5) * 25,
            -1.9,
            (Math.random() - 0.5) * 25
          ]}
          rotation={[0, Math.random() * Math.PI * 2, 0]}
        >
          <boxGeometry args={[Math.random() * 3 + 1, 0.05, 0.1]} />
          <meshStandardMaterial 
            color="#DC713E" 
            emissive="#DC713E" 
            emissiveIntensity={0.4}
            metalness={1}
            roughness={0}
          />
        </mesh>
      ))}
      
      {/* Tech buildings/towers */}
      {buildings.map((building) => (
        <group key={building.id} position={building.position}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[building.width, building.height, building.depth]} />
            <meshStandardMaterial 
              color={building.color}
              metalness={0.8}
              roughness={0.2}
              emissive={building.color}
              emissiveIntensity={0.1}
            />
          </mesh>
          
          {/* Building lights */}
          {Array.from({ length: Math.floor(building.height) }).map((_, floor) => (
            <pointLight
              key={floor}
              ref={(el) => lightsRef.current[building.id * 10 + floor] = el}
              position={[0, floor * 0.8 - building.height/2 + 0.4, building.depth/2 + 0.1]}
              color="#FFA726"
              intensity={0.3}
              distance={2}
            />
          ))}
          
          {/* Antenna/sensor on top */}
          <mesh position={[0, building.height/2 + 0.3, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.6]} />
            <meshStandardMaterial color="#FFA726" emissive="#FFA726" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}
      
      {/* Holographic data streams */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Trail
          key={`trail-${i}`}
          width={0.1}
          length={3}
          color="#FFA726"
          attenuation={(t) => t * t}
        >
          <mesh>
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial color="#FFA726" emissive="#FFA726" emissiveIntensity={1} />
          </mesh>
        </Trail>
      ))}
    </group>
  );
}

// Massive Solar Farm with realistic panels and sun tracking
function MegaSolarFarm({ position }) {
  const groupRef = useRef();
  const panelsRef = useRef([]);
  
  useFrame((state) => {
    // Panels track the "sun" (light source)
    const sunAngle = state.clock.elapsedTime * 0.2;
    panelsRef.current.forEach((panel, i) => {
      if (panel) {
        panel.rotation.y = sunAngle + (i * 0.1);
        panel.rotation.x = Math.sin(sunAngle) * 0.3;
      }
    });
  });

  const panels = useMemo(() => {
    return Array.from({ length: 36 }, (_, i) => ({
      id: i,
      position: [
        (i % 6 - 2.5) * 3,
        0,
        (Math.floor(i / 6) - 2.5) * 3
      ]
    }));
  }, []);

  return (
    <group position={position}>
      {/* Realistic terrain */}
      <mesh position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial 
          color="#2a4a2a" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {panels.map((panel) => (
        <group 
          key={panel.id} 
          ref={(el) => panelsRef.current[panel.id] = el}
          position={panel.position}
        >
          {/* Solar panel */}
          <mesh castShadow>
            <boxGeometry args={[2.5, 0.1, 1.5]} />
            <meshStandardMaterial 
              color="#001122" 
              metalness={0.9} 
              roughness={0.1}
              emissive="#003366"
              emissiveIntensity={0.2}
            />
          </mesh>
          
          {/* Panel frame */}
          <mesh>
            <boxGeometry args={[2.6, 0.15, 1.6]} />
            <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.3} />
          </mesh>
          
          {/* Support structure */}
          <mesh position={[0, -0.8, 0]}>
            <cylinderGeometry args={[0.1, 0.15, 1.5]} />
            <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.4} />
          </mesh>
          
          {/* Energy particles */}
          <Sparkles
            count={20}
            scale={3}
            size={2}
            speed={0.4}
            color="#FFA726"
            opacity={0.6}
          />
        </group>
      ))}
      
      {/* Power transmission lines */}
      {Array.from({ length: 4 }).map((_, i) => (
        <group key={`line-${i}`}>
          <mesh position={[i * 6 - 9, 4, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 8]} />
            <meshStandardMaterial color="#555555" metalness={0.8} />
          </mesh>
          
          {/* Power cables */}
          <mesh position={[i * 6 - 9, 8, 0]} rotation={[0, 0, Math.PI/16]}>
            <cylinderGeometry args={[0.02, 0.02, 12]} />
            <meshStandardMaterial color="#222222" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Industrial Mega-Factory with moving parts and steam
function IndustrialComplex({ position }) {
  const groupRef = useRef();
  const gearsRef = useRef([]);
  const steamRef = useRef([]);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    
    // Rotate gears
    gearsRef.current.forEach((gear, i) => {
      if (gear) {
        gear.rotation.z += delta * (0.5 + i * 0.2) * (i % 2 === 0 ? 1 : -1);
      }
    });
    
    // Animate steam
    steamRef.current.forEach((steam, i) => {
      if (steam) {
        steam.position.y = 2 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.5;
        steam.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.3);
      }
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main factory building */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[8, 4, 6]} />
        <meshStandardMaterial 
          color="#1A3B44" 
          metalness={0.8} 
          roughness={0.3}
          emissive="#1A3B44"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Smokestacks */}
      {Array.from({ length: 3 }).map((_, i) => (
        <group key={`stack-${i}`} position={[(i - 1) * 2.5, 2.5, 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.3, 0.4, 3]} />
            <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.4} />
          </mesh>
          
          {/* Steam clouds */}
          <Cloud
            ref={(el) => steamRef.current[i] = el}
            position={[0, 2, 0]}
            args={[3, 2]}
            color="#ffffff"
            opacity={0.4}
            speed={0.4}
            width={10}
            depth={1.5}
          />
        </group>
      ))}
      
      {/* Massive industrial gears */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={`gear-${i}`}
          ref={(el) => gearsRef.current[i] = el}
          position={[
            (i - 2) * 2,
            -1 + Math.sin(i) * 0.5,
            3.5
          ]}
          castShadow
        >
          <cylinderGeometry args={[0.8 + i * 0.1, 0.8 + i * 0.1, 0.3, 12]} />
          <meshStandardMaterial 
            color="#DC713E" 
            metalness={0.9} 
            roughness={0.2}
            emissive="#DC713E"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      
      {/* Conveyor belts */}
      <mesh position={[0, -1.5, -4]} rotation={[0, 0, 0]}>
        <boxGeometry args={[10, 0.2, 1]} />
        <meshStandardMaterial color="#222222" metalness={0.6} roughness={0.7} />
      </mesh>
      
      {/* Industrial pipes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={`pipe-${i}`}
          position={[
            Math.sin(i) * 4,
            1 + Math.cos(i) * 2,
            -3
          ]}
          rotation={[0, i * 0.5, Math.PI/2]}
        >
          <cylinderGeometry args={[0.2, 0.2, 3]} />
          <meshStandardMaterial 
            color="#666666" 
            metalness={0.8} 
            roughness={0.3}
          />
        </mesh>
      ))}
      
      {/* Sparking effects */}
      <Sparkles
        count={50}
        scale={8}
        size={3}
        speed={0.6}
        color="#FFA726"
        opacity={0.8}
      />
    </group>
  );
}

// Futuristic Security Command Center
function SecurityCommandCenter({ position }) {
  const groupRef = useRef();
  const scannerRef = useRef();
  const hologramsRef = useRef([]);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    
    if (scannerRef.current) {
      scannerRef.current.rotation.y = state.clock.elapsedTime * 2;
    }
    
    hologramsRef.current.forEach((holo, i) => {
      if (holo) {
        holo.position.y = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.3;
        holo.rotation.y = state.clock.elapsedTime * (0.5 + i * 0.2);
      }
    });
  });

  const hologramPositions = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      return [Math.cos(angle) * 4, 0, Math.sin(angle) * 4];
    });
  }, []);

  return (
    <group ref={groupRef} position={position}>
      {/* Central command tower */}
      <mesh castShadow>
        <cylinderGeometry args={[2, 3, 6, 8]} />
        <meshStandardMaterial 
          color="#1A3B44" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#1A3B44"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Rotating scanner dish */}
      <mesh ref={scannerRef} position={[0, 4, 0]} castShadow>
        <cylinderGeometry args={[1.5, 0.1, 0.3, 16]} />
        <meshStandardMaterial 
          color="#DC713E" 
          metalness={1} 
          roughness={0}
          emissive="#DC713E"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Security perimeter */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <mesh 
            key={`perimeter-${i}`}
            position={[Math.cos(angle) * 6, 0, Math.sin(angle) * 6]}
            castShadow
          >
            <boxGeometry args={[0.2, 3, 0.2]} />
            <meshStandardMaterial 
              color="#666666" 
              metalness={0.8}
              emissive="#FFA726"
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
      
      {/* Holographic displays */}
      {hologramPositions.map((pos, i) => (
        <mesh
          key={`holo-${i}`}
          ref={(el) => hologramsRef.current[i] = el}
          position={pos}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff" 
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      
      {/* Security beams */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={`beam-${i}`}
            position={[Math.cos(angle) * 3, 1.5, Math.sin(angle) * 3]}
            rotation={[0, angle + Math.PI/2, 0]}
          >
            <cylinderGeometry args={[0.05, 0.05, 6]} />
            <meshStandardMaterial 
              color="#ff0000" 
              emissive="#ff0000" 
              emissiveIntensity={1}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Particle Systems and Environmental Effects
function AtmosphericEffects() {
  const particlesRef = useRef();
  const count = 2000;
  
  const positions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 100
      );
    }
    return new Float32Array(positions);
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group>
      {/* Floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#FFA726"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
      
      {/* Energy fields */}
      <Sparkles
        count={100}
        scale={50}
        size={4}
        speed={0.3}
        color="#DC713E"
        opacity={0.4}
      />
      
      {/* Cosmic background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </group>
  );
}

// Ultra-Advanced Camera Controller
function CinematicCameraController() {
  const scroll = useScroll();
  const { camera } = useThree();
  const timeline = useRef();

  useLayoutEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    
    const sequences = [
      // Hero - Epic establishing shot
      { 
        position: { x: 0, y: 15, z: 25 }, 
        rotation: { x: -0.3, y: 0, z: 0 },
        fov: 75
      },
      // Vision - Dive into circuit city
      { 
        position: { x: -12, y: 8, z: 15 }, 
        rotation: { x: -0.2, y: 0.4, z: 0 },
        fov: 60
      },
      // Services - Soar over solar farm
      { 
        position: { x: 15, y: 12, z: 8 }, 
        rotation: { x: -0.4, y: -0.3, z: 0 },
        fov: 80
      },
      // Team - Industrial complex flythrough
      { 
        position: { x: -8, y: 6, z: 12 }, 
        rotation: { x: -0.1, y: 0.5, z: 0 },
        fov: 70
      },
      // Contact - Security center focus
      { 
        position: { x: 0, y: 20, z: 30 }, 
        rotation: { x: -0.5, y: 0, z: 0 },
        fov: 90
      },
    ];
    
    sequences.forEach((seq, index) => {
      const progress = index / (sequences.length - 1);
      
      timeline.current.to(camera.position, { 
        ...seq.position,
        duration: 3, 
        ease: 'power3.inOut' 
      }, progress);
      
      timeline.current.to(camera.rotation, { 
        ...seq.rotation,
        duration: 3, 
        ease: 'power3.inOut' 
      }, progress);
      
      timeline.current.to(camera, { 
        fov: seq.fov,
        duration: 3, 
        ease: 'power2.inOut',
        onUpdate: () => camera.updateProjectionMatrix()
      }, progress);
    });
  }, [camera]);

  useFrame(() => {
    if (timeline.current) {
      const progress = scroll.offset;
      timeline.current.seek(progress * timeline.current.duration());
    }
  });

  return null;
}

export default function Scene() {
  return (
    <>
      {/* Dynamic Sky and Environment */}
      <Environment preset="night" />
      <Sky
        distance={450000}
        sunPosition={[10, 20, 10]}
        inclination={0.6}
        azimuth={0.25}
        rayleigh={0.5}
        turbidity={2}
      />
      
      {/* Advanced Lighting Setup */}
      <ambientLight intensity={0.3} color="#1a2332" />
      
      <directionalLight 
        position={[20, 30, 15]} 
        intensity={2} 
        color="#FFA726"
        castShadow
        shadow-mapSize={[4096, 4096]}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      
      <pointLight 
        position={[-20, 15, -20]} 
        color="#DC713E" 
        intensity={1.5}
        distance={50}
      />
      
      <spotLight
        position={[0, 40, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      
      {/* Rim lighting for dramatic effect */}
      <pointLight 
        position={[30, 10, 30]} 
        color="#6B7280" 
        intensity={0.8}
        distance={40}
      />
      
      {/* Main Engineering Worlds */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <CircuitMetropolis position={[-15, 0, -10]} scale={0.7} />
      </Float>
      
      <Float speed={0.3} rotationIntensity={0.05} floatIntensity={0.1}>
        <MegaSolarFarm position={[20, -2, 5]} />
      </Float>
      
      <Float speed={0.4} rotationIntensity={0.08} floatIntensity={0.15}>
        <IndustrialComplex position={[-10, 2, 15]} />
      </Float>
      
      <Float speed={0.6} rotationIntensity={0.12} floatIntensity={0.25}>
        <SecurityCommandCenter position={[5, -1, -20]} />
      </Float>
      
      {/* Atmospheric and Environmental Effects */}
      <AtmosphericEffects />
      
      {/* Cinematic Camera Controller */}
      <CinematicCameraController />
      
      {/* Advanced Post-Processing Effects */}
      <fog attach="fog" args={['#0a0a0f', 30, 100]} />
    </>
  );
}
