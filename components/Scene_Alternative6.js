import React, { useRef, useLayoutEffect, useMemo, useState, useCallback, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Sparkles, Cloud, Stars, Sphere, Box, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Performance detection hook
const usePerformanceMode = (preferredOverride = null) => {
  const [lowPerf, setLowPerf] = useState(false);
  useEffect(() => {
    if (preferredOverride !== null) return setLowPerf(!preferredOverride);
    try {
      const hc = navigator.hardwareConcurrency || 4;
      const ua = navigator.userAgent || '';
      const isMobile = /Mobi|Android|iPhone|iPad/.test(ua);
      const memory = navigator.deviceMemory || 4;
      const low = isMobile || hc <= 4 || memory < 4;
      setLowPerf(low);
    } catch (e) {
      setLowPerf(true);
    }
  }, [preferredOverride]);
  return lowPerf;
};

// Enhanced Energy Flow Material with more dynamic effects
const EnergyFlowMaterial = ({ color = '#DC713E', intensity = 1 }) => {
  const materialRef = useRef();
  
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
      
      vec3 pos = position;
      pos.y += sin(pos.x * 12.0 + uTime * 4.0) * 0.15;
      pos.x += cos(pos.z * 10.0 + uTime * 3.0) * 0.08;
      pos.z += sin(pos.y * 8.0 + uTime * 5.0) * 0.06;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;
  
  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uIntensity;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      float energy1 = sin(vUv.x * 25.0 + uTime * 6.0) * 0.5 + 0.5;
      float energy2 = sin(vUv.y * 18.0 + uTime * 4.5) * 0.5 + 0.5;
      float energy3 = sin((vUv.x + vUv.y) * 15.0 + uTime * 8.0) * 0.5 + 0.5;
      
      float combinedEnergy = (energy1 + energy2 + energy3) / 3.0;
      
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - dot(normalize(vNormal), viewDirection), 2.0);
      
      vec3 finalColor = uColor * (1.5 + combinedEnergy * 3.0 + fresnel * 2.0);
      float alpha = (combinedEnergy * 0.9 + 0.3 + fresnel * 0.4) * uIntensity;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(color) },
    uIntensity: { value: intensity }
  }), [color, intensity]);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });
  
  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent
      side={THREE.DoubleSide}
    />
  );
};

// Security Camera Component with smooth movement
const SecurityCamera = ({ position, rotation, scrollProgress = 0 }) => {
  const cameraRef = useRef();
  const groupRef = useRef();
  const lensRef = useRef();
  
  useFrame((state) => { 
    const time = state.clock.elapsedTime;
    
    if (cameraRef.current) {
      // Smooth scanning pattern
      const baseScan = Math.sin(time * 0.8) * 0.8;
      const microAdjust = Math.sin(time * 4) * 0.1;
      const scrollBoost = scrollProgress * 0.3;
      
      cameraRef.current.rotation.y = baseScan + microAdjust + scrollBoost;
      cameraRef.current.rotation.x = Math.cos(time * 0.6) * 0.2;
    }
    
    if (groupRef.current) {
      const breathe = 1 + Math.sin(time * 2.5) * 0.03;
      groupRef.current.scale.setScalar(breathe);
      
      groupRef.current.position.y = position[1] + Math.sin(time * 1.1) * 0.1 + scrollProgress * 0.5;
    }
    
    if (lensRef.current) {
      const basePulse = 0.5 + Math.sin(time * 3) * 0.3;
      const alert = Math.random() > 0.98 ? 1.5 : 0;
      lensRef.current.material.emissiveIntensity = basePulse + alert;
    }
  });
  
  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <Cylinder 
        ref={cameraRef} 
        args={[0.3, 0.4, 0.8, 16]} 
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial 
          color="#1A3B44" 
          metalness={0.9} 
          roughness={0.1}
        />
      </Cylinder>
      
      <Cylinder 
        args={[0.2, 0.2, 0.1, 24]} 
        position={[0.5, 0, 0]} 
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial 
          color="#000000" 
          metalness={1} 
          roughness={0.0} 
        />
      </Cylinder>
      
      <Sphere ref={lensRef} args={[0.05]} position={[0.3, 0.2, 0]}>
        <meshStandardMaterial 
          color="#DC713E" 
          emissive="#DC713E" 
          emissiveIntensity={0.8}
        />
      </Sphere>
    </group>
  );
};

// Circuit Board Component with animated traces
const CircuitBoard = ({ position, rotation, scale = 1, scrollProgress = 0 }) => {
  const groupRef = useRef();
  const tracesRef = useRef([]);
  
  useFrame((state) => { 
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      const baseRotation = 0.008 * time;
      const scrollInfluence = scrollProgress * 0.4;
      const wobble = Math.sin(time * 1.5) * 0.08;
      
      groupRef.current.rotation.y = baseRotation + scrollInfluence + wobble;
      groupRef.current.rotation.x = Math.cos(time * 0.8) * 0.1;
      groupRef.current.rotation.z = Math.sin(time * 1.2) * 0.05;
      
      // Floating movement
      groupRef.current.position.y = position[1] + Math.sin(time * 1.8) * 0.3 + scrollProgress * 0.8;
      groupRef.current.position.x = position[0] + Math.cos(time * 0.7) * 0.2;
      
      const pulse = 1 + Math.sin(time * 2.2) * 0.04;
      groupRef.current.scale.setScalar(scale * pulse);
    }

    // Animate circuit traces
    tracesRef.current.forEach((trace, index) => {
      if (trace) {
        const offset = index * 0.5;
        trace.material.emissiveIntensity = 0.3 + Math.sin(time * 3 + offset) * 0.2;
      }
    });
  });
  
  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <Box args={[3, 0.1, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#1A3B44" 
          metalness={0.8} 
          roughness={0.2}
        />
      </Box>
      
      {/* Circuit traces */}
      {Array.from({ length: 20 }, (_, i) => (
        <Box 
          key={i} 
          ref={el => tracesRef.current[i] = el}
          args={[Math.random() * 2 + 0.5, 0.02, 0.05]} 
          position={[
            (Math.random() - 0.5) * 2.5,
            0.06,
            (Math.random() - 0.5) * 1.5
          ]}
        > 
          <meshStandardMaterial 
            color="#DC713E" 
            emissive="#DC713E" 
            emissiveIntensity={0.4}
          />
        </Box>
      ))}
      
      {/* Electronic components */}
      {Array.from({ length: 8 }, (_, i) => (
        <Box 
          key={`comp-${i}`} 
          args={[0.2, 0.1, 0.15]} 
          position={[
            (Math.random() - 0.5) * 2.5,
            0.1,
            (Math.random() - 0.5) * 1.5
          ]}
        > 
          <meshStandardMaterial 
            color="#FFA726" 
            metalness={0.9} 
            roughness={0.1}
          />
        </Box>
      ))}
    </group>
  );
};

// Solar Panel Component with tracking animation
const SolarPanel = ({ position, rotation, scale = 1, scrollProgress = 0 }) => {
  const panelRef = useRef();
  const cellsRef = useRef([]);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (panelRef.current) {
      // Sun tracking animation
      const trackingSun = Math.sin(time * 0.3) * 0.15;
      const scrollInfluence = scrollProgress * 0.2;
      panelRef.current.rotation.z = trackingSun + scrollInfluence;
      panelRef.current.rotation.x = Math.cos(time * 0.25) * 0.08;
      
      const breathe = 1 + Math.sin(time * 1.5) * 0.02;
      panelRef.current.scale.setScalar(scale * breathe);
      
      panelRef.current.position.y = position[1] + Math.sin(time * 0.9) * 0.2 + scrollProgress * 0.6;
    }
    
    // Animate solar cells
    cellsRef.current.forEach((cell, index) => {
      if (cell) {
        const offset = index * 0.1;
        const energyPulse = Math.sin(time * 2.5 + offset) * 0.15 + 0.25;
        cell.material.emissiveIntensity = energyPulse;
      }
    });
  });
  
  return (
    <group ref={panelRef} position={position} rotation={rotation}>
      <Box args={[2, 0.05, 1.2]}>
        <meshStandardMaterial 
          color="#1A3B44" 
          metalness={0.8} 
          roughness={0.3}
        />
      </Box>
      
      {Array.from({ length: 24 }, (_, i) => {
        const row = Math.floor(i / 6);
        const col = i % 6;
        return (
          <Box
            key={i}
            ref={el => cellsRef.current[i] = el}
            args={[0.28, 0.02, 0.18]}
            position={[
              -0.75 + col * 0.32,
              0.04,
              -0.45 + row * 0.22
            ]}
          >
            <meshStandardMaterial 
              color="#001122" 
              metalness={0.9} 
              roughness={0.1}
              emissive="#FFA726"
              emissiveIntensity={0.2}
            />
          </Box>
        );
      })}
    </group>
  );
};

// Network Node Component with pulsing rings
const NetworkNode = ({ position, scale = 1, scrollProgress = 0 }) => {
  const nodeRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const coreRef = useRef();
  
  useFrame((state) => { 
    const time = state.clock.elapsedTime;
    
    if (nodeRef.current) { 
      nodeRef.current.rotation.y += 0.01;
      nodeRef.current.rotation.x = Math.sin(time * 0.8) * 0.08;
      
      const pulse = Math.sin(time * 2.5) * 0.15 + 1;
      const scrollBoost = 1 + scrollProgress * 0.3;
      nodeRef.current.scale.setScalar(scale * pulse * scrollBoost);
      
      // Orbital movement
      const orbitRadius = 0.2;
      nodeRef.current.position.x = position[0] + Math.cos(time * 0.4) * orbitRadius;
      nodeRef.current.position.z = position[2] + Math.sin(time * 0.4) * orbitRadius;
      nodeRef.current.position.y = position[1] + Math.sin(time * 0.6) * 0.3 + scrollProgress;
    }
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += 0.02;
      ring1Ref.current.rotation.x = Math.sin(time * 1.2) * 0.15;
    }
    
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= 0.025;
      ring2Ref.current.rotation.y = Math.cos(time * 1.0) * 0.1;
    }
    
    if (coreRef.current) {
      const corePulse = Math.sin(time * 4) * 0.3 + 0.6;
      coreRef.current.material.emissiveIntensity = corePulse;
    }
  });
  
  return (
    <group ref={nodeRef} position={position}>
      <Sphere ref={coreRef} args={[0.3]}>
        <meshStandardMaterial 
          color="#DC713E" 
          emissive="#DC713E" 
          emissiveIntensity={0.6} 
          transparent 
          opacity={0.8} 
        />
      </Sphere>
      
      <Torus ref={ring1Ref} args={[0.5, 0.02, 8, 16]} rotation={[Math.PI / 2, 0, 0]}>
        <EnergyFlowMaterial color="#FFA726" intensity={0.8} />
      </Torus>
      
      <Torus ref={ring2Ref} args={[0.7, 0.015, 8, 16]} rotation={[0, Math.PI / 2, 0]}>
        <EnergyFlowMaterial color="#DC713E" intensity={0.6} />
      </Torus>
    </group>
  );
};

// Floating Data Particles
const DataParticles = ({ scrollProgress = 0 }) => {
  const particlesRef = useRef();
  const count = 100;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, [count]);
  
  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime + positions[i3]) * 0.005;
        positions[i3] += Math.cos(state.clock.elapsedTime * 0.5 + positions[i3 + 2]) * 0.003;
        
        // Scroll influence
        positions[i3 + 1] += scrollProgress * 0.002;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#FFA726"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Energy Field Component
const EnergyField = ({ position, scale = 1, scrollProgress = 0 }) => {
  const fieldRef = useRef();
  
  useFrame((state) => {
    if (fieldRef.current) {
      const time = state.clock.elapsedTime;
      fieldRef.current.rotation.y += 0.005;
      fieldRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      
      const pulse = 1 + Math.sin(time * 1.5) * 0.1;
      const scrollInfluence = 1 + scrollProgress * 0.2;
      fieldRef.current.scale.setScalar(scale * pulse * scrollInfluence);
      
      fieldRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.5;
    }
  });
  
  return (
    <group ref={fieldRef} position={position}>
      <Sphere args={[2, 32, 32]}>
        <MeshDistortMaterial
          color="#DC713E"
          transparent
          opacity={0.15}
          distort={0.4}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
      </Sphere>
    </group>
  );
};

// Main Scene Component
export const Scene = ({ scrollProgress = 0 }) => {
  const { camera } = useThree();
  const sceneRef = useRef();
  
  // Camera animation based on scroll
  useFrame((state) => {
    if (camera) {
      const time = state.clock.elapsedTime;
      
      // Base camera movement
      const baseCameraY = 0 + Math.sin(time * 0.1) * 2;
      const baseCameraX = Math.cos(time * 0.08) * 1;
      const baseCameraZ = 10 + Math.sin(time * 0.05) * 2;
      
      // Scroll influence
      const targetY = baseCameraY + scrollProgress * 15;
      const targetX = baseCameraX + scrollProgress * Math.sin(time * 0.1) * 5;
      
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, baseCameraZ, 0.03);
      
      camera.rotation.x = scrollProgress * -0.3;
      camera.rotation.y = Math.sin(time * 0.05) * 0.1;
      
      // Scene transformations
      if (sceneRef.current) {
        sceneRef.current.rotation.y = scrollProgress * 0.2 + time * 0.02;
        sceneRef.current.position.y = scrollProgress * -5;
      }
    }
  });
  
  return (
    <group ref={sceneRef}>
      {/* Environment and lighting */}
      <Environment preset="night" />
      
      <ambientLight intensity={0.4} color="#1A3B44" />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#FFA726" castShadow />
      <pointLight position={[-10, -10, -5]} intensity={1.0} color="#DC713E" />
      <spotLight position={[0, 15, 0]} intensity={1.5} color="#FFFFFF" angle={0.3} penumbra={1} />
      
      {/* Background elements */}
      <Stars radius={300} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      <Float speed={0.5} rotationIntensity={0.2}>
        <Cloud opacity={0.1} speed={0.4} width={20} depth={5} segments={20} />
      </Float>
      
      {/* Energy fields */}
      <EnergyField position={[0, 0, -15]} scale={1.5} scrollProgress={scrollProgress} />
      <EnergyField position={[20, 10, -25]} scale={1} scrollProgress={scrollProgress} />
      <EnergyField position={[-25, -5, -20]} scale={1.2} scrollProgress={scrollProgress} />
      
      {/* Security systems area - Multiple cameras */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
        <SecurityCamera position={[8, 5, -8]} rotation={[0, -0.5, 0]} scrollProgress={scrollProgress} />
        <SecurityCamera position={[-12, 3, -6]} rotation={[0, 0.8, 0]} scrollProgress={scrollProgress} />
        <SecurityCamera position={[15, -2, -12]} rotation={[0, -1.2, 0]} scrollProgress={scrollProgress} />
        <SecurityCamera position={[-8, 8, -10]} rotation={[0, 0.3, 0]} scrollProgress={scrollProgress} />
      </Float>
      
      {/* Industrial automation - circuit boards */}
      <Float speed={0.8} rotationIntensity={0.3}>
        <CircuitBoard position={[-8, 8, -10]} rotation={[0, 0.5, 0]} scale={0.8} scrollProgress={scrollProgress} />
        <CircuitBoard position={[12, -5, -15]} rotation={[0, -0.8, 0]} scale={1.2} scrollProgress={scrollProgress} />
        <CircuitBoard position={[-15, -8, -18]} rotation={[0, 1.2, 0]} scale={0.9} scrollProgress={scrollProgress} />
        <CircuitBoard position={[18, 10, -22]} rotation={[0, -0.3, 0]} scale={1.1} scrollProgress={scrollProgress} />
      </Float>
      
      {/* Solar energy systems */}
      <Float speed={0.6} rotationIntensity={0.4}>
        <SolarPanel position={[20, 8, -20]} rotation={[0, -0.3, 0]} scale={1.1} scrollProgress={scrollProgress} />
        <SolarPanel position={[-18, 12, -25]} rotation={[0, 0.7, 0]} scale={0.9} scrollProgress={scrollProgress} />
        <SolarPanel position={[25, -10, -30]} rotation={[0, -1.1, 0]} scale={1.3} scrollProgress={scrollProgress} />
        <SolarPanel position={[-22, -6, -28]} rotation={[0, 0.4, 0]} scale={1.0} scrollProgress={scrollProgress} />
      </Float>
      
      {/* Telecommunications - network nodes */}
      <NetworkNode position={[0, 15, -12]} scale={1.2} scrollProgress={scrollProgress} />
      <NetworkNode position={[18, 2, -18]} scale={0.8} scrollProgress={scrollProgress} />
      <NetworkNode position={[-22, 6, -22]} scale={1} scrollProgress={scrollProgress} />
      <NetworkNode position={[8, -12, -16]} scale={0.9} scrollProgress={scrollProgress} />
      <NetworkNode position={[-10, -6, -28]} scale={1.1} scrollProgress={scrollProgress} />
      
      {/* Connection lines between network nodes */}
      {[
        { start: [0, 15, -12], end: [18, 2, -18] },
        { start: [18, 2, -18], end: [-22, 6, -22] },
        { start: [-22, 6, -22], end: [8, -12, -16] },
        { start: [8, -12, -16], end: [-10, -6, -28] }
      ].map((connection, i) => {
        const start = new THREE.Vector3(...connection.start);
        const end = new THREE.Vector3(...connection.end);
        const direction = end.clone().sub(start);
        const length = direction.length();
        const position = start.clone().add(direction.clone().multiplyScalar(0.5));
        
        return (
          <group key={i} position={position.toArray()}>
            <Cylinder
              args={[0.02, 0.02, length, 8]}
              rotation={[Math.PI / 2, 0, Math.atan2(direction.x, direction.z)]}
            >
              <EnergyFlowMaterial color="#FFA726" intensity={0.8} />
            </Cylinder>
          </group>
        );
      })}
      
      {/* Instrumentation elements - floating measurement devices */}
      {Array.from({ length: 12 }, (_, i) => (
        <Float key={i} speed={1.2 + i * 0.1} rotationIntensity={0.6} floatIntensity={0.4}>
          <group
            position={[
              Math.sin(i * 0.8) * 25 + (Math.random() - 0.5) * 10,
              Math.cos(i * 0.6) * 12 + (Math.random() - 0.5) * 8,
              -15 - i * 2 - Math.random() * 10
            ]}
          >
            <Torus args={[0.8, 0.1, 8, 16]}>
              <meshStandardMaterial
                color="#1A3B44"
                metalness={0.9}
                roughness={0.1}
                emissive="#DC713E"
                emissiveIntensity={0.2}
              />
            </Torus>
            <Sphere args={[0.3]} position={[0, 0, 0]}>
              <meshStandardMaterial
                color="#FFA726"
                emissive="#FFA726"
                emissiveIntensity={0.4}
              />
            </Sphere>
          </group>
        </Float>
      ))}
      
      {/* Data particles for dynamic feel */}
      <DataParticles scrollProgress={scrollProgress} />
      
      {/* Sparkles for magical effect */}
      <Sparkles
        count={200}
        scale={[30, 20, 30]}
        size={3}
        speed={0.4}
        opacity={0.6}
        color="#FFA726"
      />
      
      <Sparkles
        count={100}
        scale={[50, 30, 50]}
        size={5}
        speed={0.2}
        opacity={0.3}
        color="#DC713E"
      />
    </group>
  );
};
