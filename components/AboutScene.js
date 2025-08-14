import { useRef, useLayoutEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Line } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

// Floating Energy Particles System
function EnergyParticles({ count = 2000 }) {
  const mesh = useRef();
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      // Brand colors for particles
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        // Brand orange
        colors[i * 3] = 0.863;
        colors[i * 3 + 1] = 0.443;
        colors[i * 3 + 2] = 0.243;
      } else if (colorChoice < 0.7) {
        // Brand accent
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.655;
        colors[i * 3 + 2] = 0.149;
      } else {
        // Cyan energy
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 1.0;
      }
    }
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      mesh.current.rotation.y += 0.002;
      
      // Animate particle positions
      const positions = mesh.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i * 0.01) * 0.002;
        positions[i] += Math.cos(state.clock.elapsedTime + i * 0.01) * 0.001;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Industrial Grid Structure
function IndustrialGrid() {
  const groupRef = useRef();
  
  const gridLines = useMemo(() => {
    const lines = [];
    const gridSize = 40;
    const divisions = 20;
    const step = gridSize / divisions;
    
    for (let i = 0; i <= divisions; i++) {
      const pos = -gridSize/2 + i * step;
      
      // Horizontal lines
      lines.push([
        new THREE.Vector3(-gridSize/2, 0, pos),
        new THREE.Vector3(gridSize/2, 0, pos)
      ]);
      
      // Vertical lines
      lines.push([
        new THREE.Vector3(pos, 0, -gridSize/2),
        new THREE.Vector3(pos, 0, gridSize/2)
      ]);
    }
    return lines;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -15, 0]}>
      {gridLines.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#1A3B44"
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      ))}
    </group>
  );
}

// Floating Industrial Elements
function FloatingElements() {
  const elements = useRef([]);
  
  const spheres = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 30
      ],
      scale: 0.2 + Math.random() * 0.8,
      speed: 0.5 + Math.random() * 0.5,
      color: i % 3 === 0 ? "#DC713E" : i % 3 === 1 ? "#FFA726" : "#1A3B44"
    }));
  }, []);

  useFrame((state) => {
    elements.current.forEach((el, i) => {
      if (el) {
        const sphere = spheres[i];
        el.position.y += Math.sin(state.clock.elapsedTime * sphere.speed + i) * 0.01;
        el.position.x += Math.cos(state.clock.elapsedTime * sphere.speed * 0.5 + i) * 0.005;
        el.rotation.x += 0.01;
        el.rotation.y += 0.005;
      }
    });
  });

  return (
    <group>
      {spheres.map((sphere, i) => (
        <mesh
          key={i}
          ref={(el) => (elements.current[i] = el)}
          position={sphere.position}
          scale={sphere.scale}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshPhongMaterial
            color={sphere.color}
            transparent
            opacity={0.4}
            emissive={sphere.color}
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Energy Connections
function EnergyConnections() {
  const [connections, setConnections] = useState([]);
  
  useLayoutEffect(() => {
    const points = [];
    for (let i = 0; i < 8; i++) {
      points.push([
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 25
      ]);
    }
    
    const lines = [];
    for (let i = 0; i < points.length - 1; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (Math.random() > 0.7) {
          lines.push([points[i], points[j]]);
        }
      }
    }
    setConnections(lines);
  }, []);

  return (
    <group>
      {connections.map((line, i) => (
        <Line
          key={i}
          points={[new THREE.Vector3(...line[0]), new THREE.Vector3(...line[1])]}
          color="#DC713E"
          lineWidth={2}
          transparent
          opacity={0.6}
        />
      ))}
    </group>
  );
}

// Main Scene Component
export default function IndustrialScene() {
  const { scene } = useThree();
  
  useLayoutEffect(() => {
    scene.fog = new THREE.Fog('#000000', 20, 60);
  }, [scene]);

  useFrame((state) => {
    // Dynamic camera movement
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2;
    state.camera.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 1;
  });

  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.2} color="#1A3B44" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#DC713E"
        castShadow
      />
      <pointLight
        position={[-10, -10, -10]}
        intensity={0.6}
        color="#FFA726"
      />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#00CCFF"
        castShadow
      />
      
      {/* Scene Elements */}
      <EnergyParticles />
      <IndustrialGrid />
      <FloatingElements />
      <EnergyConnections />
      
      {/* Background Sphere */}
      <Sphere args={[100]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.9}
          side={THREE.BackSide}
        />
      </Sphere>
    </>
  );
}

// Main Export Component
export function Industrial3DBackground() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #000000 0%, #1A3B44 100%)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: -1
    }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ alpha: true, antialias: true }}
      >
        <IndustrialScene />
        
        <EffectComposer>
          <Bloom
            intensity={0.8}
            width={300}
            height={300}
            kernelSize={5}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.025}
          />
          <ChromaticAberration
            offset={[0.001, 0.001]}
          />
          <Vignette
            eskil={false}
            offset={0.1}
            darkness={0.3}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
