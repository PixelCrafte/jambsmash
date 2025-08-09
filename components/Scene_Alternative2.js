import { useRef, useLayoutEffect, useMemo, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Sparkles, Cloud, Stars } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

// Your existing IndustrialGears component
const IndustrialGears = ({ position = [0,0,0], performanceMode = false }) => {
  const gear1Ref = useRef();
  const gear2Ref = useRef();
  const gear3Ref = useRef();
  const gear4Ref = useRef();
  
  useFrame((state, delta) => {
    const speedScale = performanceMode ? 0.3 : 0.5;
    if (gear1Ref.current) gear1Ref.current.rotation.z += delta * 0.45 * speedScale;
    if (gear2Ref.current) gear2Ref.current.rotation.z -= delta * 0.32 * speedScale;
    if (gear3Ref.current) gear3Ref.current.rotation.z += delta * 0.37 * speedScale;
    if (gear4Ref.current) gear4Ref.current.rotation.z -= delta * 0.5 * speedScale;
  });

  const createAdvancedGear = (radius, teeth, depth = 0.28) => {
    const shape = new THREE.Shape();
    const outerRadius = radius;
    const toothHeight = radius * 0.15;    
    for (let i = 0; i < teeth; i++) {
      const a1 = (i / teeth) * Math.PI * 2;
      const a2 = ((i + 0.25) / teeth) * Math.PI * 2;
      const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
      if (i === 0) shape.moveTo(Math.cos(a1) * outerRadius, Math.sin(a1) * outerRadius);
      shape.lineTo(Math.cos(a1) * (outerRadius + toothHeight), Math.sin(a1) * (outerRadius + toothHeight));
      shape.lineTo(Math.cos(a2) * (outerRadius + toothHeight), Math.sin(a2) * (outerRadius + toothHeight));
      shape.lineTo(Math.cos(a3) * outerRadius, Math.sin(a3) * outerRadius);
    }
    const hole = new THREE.Path();
    hole.absarc(0, 0, radius * 0.6, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.02, bevelSegments: 6 });
  };

  return (
    <group position={position}>
      <mesh ref={gear1Ref} position={[0, 0, 0]}> 
        <primitive object={createAdvancedGear(1.2, 18)} />
        <meshStandardMaterial color={'#DC713E'} metalness={0.95} roughness={0.12} emissive={'#DC713E'} emissiveIntensity={0.12} />
      </mesh>
      <mesh ref={gear2Ref} position={[2.4, -0.05, 0]}> 
        <primitive object={createAdvancedGear(0.9, 14)} />
        <meshStandardMaterial color={'#1A3B44'} metalness={0.9} roughness={0.16} emissive={'#1A3B44'} emissiveIntensity={0.06} />
      </mesh>
      <mesh ref={gear3Ref} position={[1.2, 1.8, 0]}> 
        <primitive object={createAdvancedGear(1.0, 16)} />
        <meshStandardMaterial color={'#FFA726'} metalness={0.92} roughness={0.11} emissive={'#FFA726'} emissiveIntensity={0.09} />
      </mesh>
      <mesh ref={gear4Ref} position={[-1.6, 1.2, 0]}> 
        <primitive object={createAdvancedGear(0.7, 12)} />
        <meshStandardMaterial color={'#6B7280'} metalness={0.88} roughness={0.18} />
      </mesh>
    </group>
  );
};

// Floating tech orbs
const TechOrb = ({ position, scale = 1, color = '#DC713E' }) => {
  const orbRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.x += 0.01;
      orbRef.current.rotation.y += 0.015;
      orbRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={orbRef}
        position={position}
        scale={hovered ? scale * 1.1 : scale}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          distort={0.3}
          speed={2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

// Circuit board pattern
const CircuitPattern = ({ position, rotation = [0, 0, 0] }) => {
  const circuitRef = useRef();
  
  const circuitGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    // Create circuit-like lines
    for (let i = 0; i < 200; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 2;
      
      positions.push(x, y, z);
      colors.push(0.86, 0.44, 0.24); // Orange color
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    return geometry;
  }, []);

  useFrame((state) => {
    if (circuitRef.current) {
      circuitRef.current.rotation.z += 0.002;
    }
  });

  return (
    <points ref={circuitRef} position={position} rotation={rotation}>
      <primitive object={circuitGeometry} />
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} />
    </points>
  );
};

// Holographic panels
const HoloPanel = ({ position, rotation, color = '#1A3B44' }) => {
  const panelRef = useRef();
  const [visible, setVisible] = useState(true);
  
  useFrame((state) => {
    if (panelRef.current) {
      panelRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <mesh ref={panelRef} position={position} rotation={rotation}>
      <planeGeometry args={[4, 2.5, 16, 16]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.4}
        emissive={color}
        emissiveIntensity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Energy field effect
const EnergyField = () => {
  const fieldRef = useRef();
  
  useFrame((state) => {
    if (fieldRef.current) {
      fieldRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      fieldRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={fieldRef}>
      <torusGeometry args={[8, 0.3, 16, 100]} />
      <meshStandardMaterial
        color="#FFA726"
        metalness={0.9}
        roughness={0.1}
        emissive="#FFA726"
        emissiveIntensity={0.3}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

// Main Industrial Scene Component
const Industrial3DScene = () => {
  const { camera, scene } = useThree();
  const sceneRef = useRef();
  
  // Camera animation
  useLayoutEffect(() => {
    gsap.to(camera.position, {
      duration: 10,
      x: Math.sin(Date.now() * 0.001) * 5,
      z: 15 + Math.cos(Date.now() * 0.001) * 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, [camera]);

  useFrame((state) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Scene background */}
      <color attach="background" args={['#1A3B44']} />
      
      {/* Environment lighting */}
      <Environment preset="warehouse" />
      
      {/* Atmospheric effects */}
      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={[20, 20, 20]} size={3} speed={0.4} color="#FFA726" />
      
      {/* Main gear clusters */}
      <IndustrialGears position={[0, 0, 0]} />
      <IndustrialGears position={[-8, 3, -5]} performanceMode={true} />
      <IndustrialGears position={[8, -2, -8]} performanceMode={true} />
      <IndustrialGears position={[0, 6, -10]} performanceMode={true} />
      
      {/* Tech orbs */}
      <TechOrb position={[-5, 5, -3]} scale={0.8} color="#DC713E" />
      <TechOrb position={[6, -3, -2]} scale={0.6} color="#FFA726" />
      <TechOrb position={[-3, -4, -6]} scale={0.7} color="#1A3B44" />
      <TechOrb position={[4, 8, -4]} scale={0.5} color="#6B7280" />
      <TechOrb position={[-7, -2, -8]} scale={0.9} color="#DC713E" />
      
      {/* Circuit patterns */}
      <CircuitPattern position={[0, 0, -15]} />
      <CircuitPattern position={[10, 0, -12]} rotation={[0, 0, Math.PI / 4]} />
      <CircuitPattern position={[-10, 0, -12]} rotation={[0, 0, -Math.PI / 4]} />
      
      {/* Holographic panels */}
      <HoloPanel position={[-6, 2, -5]} rotation={[0, Math.PI / 6, 0]} color="#1A3B44" />
      <HoloPanel position={[6, -1, -6]} rotation={[0, -Math.PI / 4, 0]} color="#DC713E" />
      <HoloPanel position={[0, 4, -8]} rotation={[Math.PI / 6, 0, 0]} color="#FFA726" />
      <HoloPanel position={[-8, -3, -7]} rotation={[0, Math.PI / 3, Math.PI / 8]} color="#6B7280" />
      
      {/* Energy field */}
      <EnergyField />
      
      {/* Dynamic lighting */}
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#DC713E" />
      <pointLight position={[-5, -5, 3]} intensity={0.6} color="#FFA726" />
      <pointLight position={[0, 0, 8]} intensity={0.4} color="#1A3B44" />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={0.5}
        intensity={1.2}
        color="#FFA726"
        castShadow
      />
      
      {/* Ambient enhancement */}
      <ambientLight intensity={0.3} color="#F3F4F6" />
      
      {/* Floating clouds for depth */}
      <Cloud
        position={[-15, 8, -20]}
        speed={0.2}
        opacity={0.1}
        width={10}
        depth={8}
        segments={20}
        color="#6B7280"
      />
      <Cloud
        position={[15, -5, -18]}
        speed={0.3}
        opacity={0.08}
        width={8}
        depth={6}
        segments={15}
        color="#1A3B44"
      />
    </group>
  );
};

export default Industrial3DScene;
