'use client';

import { useRef, useLayoutEffect, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Line, Text3D } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import * as THREE from 'three';

// Particle system for dynamic background
function ParticleField() {
  const points = useRef();
  const particlesCount = 2000;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      // Create a more structured distribution
      const i3 = i * 3;
      const radius = 50 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Dynamic color palette
      const colorChoice = Math.random();
      if (colorChoice < 0.6) {
        // Orange variants
        colors[i3] = 0.86; // R
        colors[i3 + 1] = 0.44; // G
        colors[i3 + 2] = 0.24; // B
      } else {
        // Accent variants
        colors[i3] = 1.0; // R
        colors[i3 + 1] = 0.65; // G
        colors[i3 + 2] = 0.15; // B
      }
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += 0.001;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      points.current.scale.setScalar(scale);
    }
  });

  return (
    <Points ref={points} positions={positions} colors={colors} stride={3}>
      <PointMaterial 
        transparent 
        vertexColors 
        size={0.8} 
        sizeAttenuation 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Enhanced glowing core with morphing geometry
function EnhancedCore() {
  const coreRef = useRef();
  const innerCoreRef = useRef();
  const [geometry, setGeometry] = useState('sphere');
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.01;
      coreRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
      
      // Morphing scale effect
      const scale = 1 + Math.sin(time * 2) * 0.3;
      coreRef.current.scale.setScalar(scale);
    }
    
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y -= 0.02;
      innerCoreRef.current.rotation.z += 0.005;
    }
  });

  return (
    <group>
      {/* Outer glow sphere */}
      <Sphere ref={coreRef} args={[2, 32, 32]}>
        <meshStandardMaterial 
          color="#DC713E" 
          emissive="#DC713E" 
          emissiveIntensity={2} 
          transparent
          opacity={0.6}
          toneMapped={false}
        />
      </Sphere>
      
      {/* Inner core */}
      <Sphere ref={innerCoreRef} args={[0.8, 16, 16]}>
        <meshStandardMaterial 
          color="#FFA726" 
          emissive="#FFA726" 
          emissiveIntensity={4} 
          toneMapped={false}
        />
      </Sphere>
      
      {/* Energy rings */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i * Math.PI / 3]}>
          <torusGeometry args={[3 + i * 0.5, 0.05, 16, 100]} />
          <meshBasicMaterial 
            color="#DC713E" 
            transparent 
            opacity={0.4} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Advanced neural network visualization
function NeuralNetwork() {
  const networkRef = useRef();
  
  const nodes = useMemo(() => {
    const nodeArray = [];
    const layers = 5;
    const nodesPerLayer = 8;
    
    for (let layer = 0; layer < layers; layer++) {
      for (let node = 0; node < nodesPerLayer; node++) {
        const angle = (node / nodesPerLayer) * Math.PI * 2;
        const radius = 8 + layer * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (layer - layers / 2) * 3;
        
        nodeArray.push({
          position: [x, y, z],
          layer,
          node,
          activity: Math.random()
        });
      }
    }
    
    return nodeArray;
  }, []);

  const connections = useMemo(() => {
    const connectionArray = [];
    
    nodes.forEach((node, i) => {
      // Connect to next layer
      const nextLayerNodes = nodes.filter(n => n.layer === node.layer + 1);
      nextLayerNodes.forEach(nextNode => {
        if (Math.random() > 0.3) { // 70% connection probability
          connectionArray.push({
            start: node.position,
            end: nextNode.position,
            strength: Math.random()
          });
        }
      });
    });
    
    return connectionArray;
  }, [nodes]);

  useFrame((state) => {
    if (networkRef.current) {
      networkRef.current.rotation.y += 0.002;
      
      // Pulse effect
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      networkRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={networkRef}>
      {/* Network nodes */}
      {nodes.map((node, i) => (
        <Sphere key={i} position={node.position} args={[0.15, 16, 16]}>
          <meshStandardMaterial 
            color="#FFA726" 
            emissive="#FFA726"
            emissiveIntensity={node.activity * 2}
            transparent
            opacity={0.8}
            toneMapped={false}
          />
        </Sphere>
      ))}
      
      {/* Network connections */}
      {connections.map((connection, i) => (
        <Line
          key={i}
          points={[connection.start, connection.end]}
          color="#DC713E"
          lineWidth={connection.strength * 2}
          transparent
          opacity={0.4}
        />
      ))}
    </group>
  );
}

// Floating geometric elements
function FloatingGeometry() {
  const elements = useMemo(() => {
    return [...Array(20)].map(() => ({
      position: [
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: 0.3 + Math.random() * 0.7,
      speed: 0.001 + Math.random() * 0.003,
      type: Math.floor(Math.random() * 3) // 0: box, 1: octahedron, 2: tetrahedron
    }));
  }, []);

  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const element = elements[i];
        child.rotation.x += element.speed;
        child.rotation.y += element.speed * 0.7;
        child.rotation.z += element.speed * 0.5;
        
        // Floating motion
        child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.001;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {elements.map((element, i) => (
        <mesh
          key={i}
          position={element.position}
          rotation={element.rotation}
          scale={element.scale}
        >
          {element.type === 0 && <boxGeometry args={[1, 1, 1]} />}
          {element.type === 1 && <octahedronGeometry args={[0.8]} />}
          {element.type === 2 && <tetrahedronGeometry args={[0.8]} />}
          <meshStandardMaterial 
            color="#1A3B44" 
            emissive="#DC713E"
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

// Enhanced camera controller with smooth transitions
function CameraController({ scrollPosition }) {
  const { camera } = useThree();
  const timeline = useRef();

  useLayoutEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    
    const cameraStates = [
      { position: [0, 0, 15], rotation: [0, 0, 0], lookAt: [0, 0, 0] },
      { position: [8, 5, 12], rotation: [0, 0.3, 0], lookAt: [2, 0, 0] },
      { position: [-10, 0, 8], rotation: [0, -0.5, 0], lookAt: [-2, 0, 0] },
      { position: [5, -8, 10], rotation: [0.4, 0.2, 0], lookAt: [0, -2, 0] }
    ];

    cameraStates.forEach((state, index) => {
      const progress = index / (cameraStates.length - 1);
      timeline.current.to(camera.position, {
        ...state.position,
        duration: 2,
        ease: 'power2.inOut'
      }, progress);
      timeline.current.to(camera.rotation, {
        ...state.rotation,
        duration: 2,
        ease: 'power2.inOut'
      }, progress);
    });
  }, [camera]);

  useFrame(() => {
    if (timeline.current) {
      timeline.current.seek(scrollPosition * timeline.current.duration());
    }
    
    // Subtle camera shake for dynamism
    camera.position.x += Math.sin(Date.now() * 0.001) * 0.01;
    camera.position.y += Math.cos(Date.now() * 0.0015) * 0.01;
  });

  return null;
}

export default function AboutScene({ scrollPosition }) {
  return (
    <>
      {/* Gradient background */}
      <color attach="background" args={['#0a0f1a']} />
      <fog attach="fog" args={['#1A3B44', 20, 100]} />
      
      {/* Advanced lighting setup */}
      <ambientLight intensity={0.3} color="#1A3B44" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        color="#DC713E"
        castShadow
      />
      <pointLight 
        position={[-10, -10, -5]} 
        intensity={0.5} 
        color="#FFA726" 
      />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={0.8}
        color="#DC713E"
      />
      
      {/* 3D Elements */}
      <ParticleField />
      {/*<EnhancedCore /> commented out for better accessability*/} 
      <NeuralNetwork />
      <FloatingGeometry />
      <CameraController scrollPosition={scrollPosition} />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom 
          intensity={1.2} 
          luminanceThreshold={0.1} 
          luminanceSmoothing={0.8} 
          height={1024} 
        />
        <ChromaticAberration 
          offset={[0.0005, 0.0012]} 
        />
        <Vignette 
          eskil={false} 
          offset={0.1} 
          darkness={0.5} 
        />
      </EffectComposer>
    </>
  );
}
