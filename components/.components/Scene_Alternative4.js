'use client';

import { useRef, useLayoutEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

// All your 3D model components (CircuitBoard, SolarPanelArray, etc.) remain unchanged.
// ... (Your model components like CircuitBoard, SolarPanelArray, etc. go here)
function CircuitBoard({ position, scale = 1 }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main circuit board */}
      <mesh>
        <boxGeometry args={[4, 0.1, 3]} />
        <meshStandardMaterial color="#0a2a0a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Circuit traces */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[
          (Math.random() - 0.5) * 3.5,
          0.06,
          (Math.random() - 0.5) * 2.5
        ]}>
          <boxGeometry args={[Math.random() * 0.8 + 0.2, 0.02, 0.05]} />
          <meshStandardMaterial 
            color="#DC713E" 
            emissive="#DC713E" 
            emissiveIntensity={0.3}
            metalness={0.9}
          />
        </mesh>
      ))}
      
      {/* Electronic components */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`comp-${i}`} position={[
          (Math.random() - 0.5) * 3,
          0.15,
          (Math.random() - 0.5) * 2
        ]}>
          <boxGeometry args={[0.3, 0.2, 0.2]} />
          <meshStandardMaterial color="#1A3B44" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}
function SolarPanelArray({ position, rotation }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (i % 3 - 1) * 1.2,
            0,
            Math.floor(i / 3 - 1) * 1.2
          ]}
        >
          <boxGeometry args={[1, 0.05, 1]} />
          <meshStandardMaterial 
            color="#0a1a2a" 
            metalness={0.9} 
            roughness={0.1}
            emissive="#FFA726"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
      
      {/* Support structure */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial color="#6B7280" metalness={0.8} />
      </mesh>
    </group>
  );
}
function IndustrialGears({ position }) {
  const gear1Ref = useRef();
  const gear2Ref = useRef();
  const gear3Ref = useRef();
  
  useFrame((state, delta) => {
    if (gear1Ref.current) gear1Ref.current.rotation.z += delta * 0.5;
    if (gear2Ref.current) gear2Ref.current.rotation.z -= delta * 0.3;
    if (gear3Ref.current) gear3Ref.current.rotation.z += delta * 0.4;
  });

  const createGear = (radius, teeth) => {
    const shape = new THREE.Shape();
    const outerRadius = radius;
    const innerRadius = radius * 0.8;
    const toothHeight = radius * 0.1;
    
    for (let i = 0; i < teeth; i++) {
      const angle1 = (i / teeth) * Math.PI * 2;
      const angle2 = ((i + 0.3) / teeth) * Math.PI * 2;
      const angle3 = ((i + 0.7) / teeth) * Math.PI * 2;
      const angle4 = ((i + 1) / teeth) * Math.PI * 2;
      
      if (i === 0) {
        shape.moveTo(Math.cos(angle1) * outerRadius, Math.sin(angle1) * outerRadius);
      }
      
      shape.lineTo(Math.cos(angle1) * (outerRadius + toothHeight), Math.sin(angle1) * (outerRadius + toothHeight));
      shape.lineTo(Math.cos(angle2) * (outerRadius + toothHeight), Math.sin(angle2) * (outerRadius + toothHeight));
      shape.lineTo(Math.cos(angle3) * outerRadius, Math.sin(angle3) * outerRadius);
      shape.lineTo(Math.cos(angle4) * outerRadius, Math.sin(angle4) * outerRadius);
    }
    
    return new THREE.ExtrudeGeometry(shape, { depth: 0.2, bevelEnabled: false });
  };

  return (
    <group position={position}>
      <mesh ref={gear1Ref} position={[0, 0, 0]}>
        <primitive object={createGear(1.2, 16)} />
        <meshStandardMaterial color="#DC713E" metalness={0.9} roughness={0.2} />
      </mesh>
      
      <mesh ref={gear2Ref} position={[2.2, 0, 0]}>
        <primitive object={createGear(0.8, 12)} />
        <meshStandardMaterial color="#1A3B44" metalness={0.9} roughness={0.2} />
      </mesh>
      
      <mesh ref={gear3Ref} position={[1.1, 1.8, 0]}>
        <primitive object={createGear(1, 14)} />
        <meshStandardMaterial color="#FFA726" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}
function SecurityHub({ position }) {
  const hubRef = useRef();
  const particlesRef = useRef();
  
  useFrame((state) => {
    if (hubRef.current) {
      hubRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      particlesRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const particlePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 50; i++) {
      positions.push([
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      ]);
    }
    return positions;
  }, []);

  return (
    <group position={position}>
      {/* Central hub */}
      <mesh ref={hubRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <MeshDistortMaterial
          color="#DC713E"
          metalness={0.8}
          roughness={0.2}
          distort={0.1}
          speed={2}
          emissive="#DC713E"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Security network nodes */}
      <group ref={particlesRef}>
        {particlePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial 
              color="#FFA726" 
              emissive="#FFA726" 
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>
      
      {/* Connection lines visualization */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={`line-${i}`}
            position={[Math.cos(angle) * 2, 0, Math.sin(angle) * 2]}
            rotation={[0, angle, 0]}
          >
            <cylinderGeometry args={[0.01, 0.01, 4]} />
            <meshStandardMaterial 
              color="#6B7280" 
              emissive="#6B7280" 
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}
function EngineeringModels() {
  const groupRef = useRef();
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Circuit boards for automation */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <CircuitBoard position={[-8, 2, -5]} scale={0.8} />
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
        <CircuitBoard position={[6, -3, 4]} scale={1.2} />
      </Float>
      
      {/* Solar panels */}
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.4}>
        <SolarPanelArray position={[8, 4, -8]} rotation={[0.2, 0.3, 0]} />
      </Float>
      
      {/* Industrial gears */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
        <IndustrialGears position={[-6, -4, 6]} />
      </Float>
      
      {/* Security hub */}
      <Float speed={0.9} rotationIntensity={0.4} floatIntensity={0.3}>
        <SecurityHub position={[0, 0, -10]} />
      </Float>
      
      {/* Additional atmospheric elements */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={Math.random() * 2 + 0.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <mesh position={[
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 40
          ]}>
            <sphereGeometry args={[0.1 + Math.random() * 0.2]} />
            <meshStandardMaterial 
              color={Math.random() > 0.5 ? "#DC713E" : "#FFA726"} 
              emissive={Math.random() > 0.5 ? "#DC713E" : "#FFA726"}
              emissiveIntensity={0.2}
              transparent
              opacity={0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// CameraController component remains unchanged from the previous fix
function CameraController({ scrollProgress }) {
  const { camera } = useThree();
  const timeline = useRef();

  useLayoutEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    
    const cameraPositions = [
      { x: 0, y: 2, z: 15, rotY: 0, rotX: -0.1 },
      { x: -8, y: 4, z: 12, rotY: 0.3, rotX: -0.2 },
      { x: 8, y: -2, z: 10, rotY: -0.4, rotX: 0.1 },
      { x: -3, y: 6, z: 8, rotY: 0.2, rotX: -0.3 },
      { x: 0, y: 0, z: 18, rotY: 0, rotX: 0 },
    ];
    
    cameraPositions.forEach((pos, index) => {
      const progress = index / (cameraPositions.length - 1);
      timeline.current.to(camera.position, { 
        x: pos.x, y: pos.y, z: pos.z, 
        duration: 2, ease: 'power2.inOut' 
      }, progress);
      timeline.current.to(camera.rotation, { 
        y: pos.rotY, x: pos.rotX, 
        duration: 2, ease: 'power2.inOut' 
      }, progress);
    });
  }, [camera]);

  useFrame(() => {
    if (timeline.current && scrollProgress !== undefined) {
      timeline.current.seek(scrollProgress * timeline.current.duration());
    }
  });

  return null;
}

// MODIFICATION: The main Scene component is updated
export default function Scene({ scrollProgress }) {
  return (
    <>
      {/* MODIFICATION 1: Add a fallback color for the scene background */}
      <color attach="background" args={['#101010']} />

      {/* Lighting setup is unchanged */}
      <ambientLight intensity={0.4} color="#1A3B44" />
      <directionalLight 
        position={[15, 15, 10]} 
        intensity={1.5} 
        color="#FFA726"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-15, -10, -15]} color="#DC713E" intensity={0.8} />
      <pointLight position={[10, 5, -10]} color="#6B7280" intensity={0.6} />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#F3F4F6"
        castShadow
      />
      
      {/* MODIFICATION 2: Add the `background` prop to the Environment component */}
      <Environment preset="night" background />
      
      <EngineeringModels />
      
      <CameraController scrollProgress={scrollProgress} />
      
      <fog attach="fog" args={['#0a0a0a', 20, 50]} />
    </>
  );
}
