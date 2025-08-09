'use client';

import { useRef, useLayoutEffect, useMemo, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Sparkles, Cloud, Stars } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

// Realistic Circuit Board with authentic PCB appearance
function RealisticCircuitBoard({ position, scale = 1 }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      groupRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
      
      // Pulsing scale effect
      const pulseFactor = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      groupRef.current.scale.setScalar(scale * pulseFactor);
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position} 
      scale={scale}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Main PCB substrate - dark green fiberglass */}
      <mesh>
        <boxGeometry args={[5, 0.1, 4]} />
        <meshStandardMaterial 
          color="#0d4f3c" 
          metalness={0.1} 
          roughness={0.8}
          emissive={hovered ? "#0d4f3c" : "#000000"}
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </mesh>

      {/* Copper traces - realistic PCB trace patterns */}
      {Array.from({ length: 25 }).map((_, i) => (
        <mesh key={`trace-${i}`} position={[
          (Math.random() - 0.5) * 4.5,
          0.051,
          (Math.random() - 0.5) * 3.5
        ]}>
          <boxGeometry args={[Math.random() * 2 + 0.5, 0.002, 0.03]} />
          <meshStandardMaterial
            color="#b87333"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Via holes - small drilled holes */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh key={`via-${i}`} position={[
          (Math.random() - 0.5) * 4.5,
          0.051,
          (Math.random() - 0.5) * 3.5
        ]}>
          <cylinderGeometry args={[0.02, 0.02, 0.12]} />
          <meshStandardMaterial
            color="#333333"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Realistic electronic components - resistors */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`resistor-${i}`} position={[
          (Math.random() - 0.5) * 4,
          0.12,
          (Math.random() - 0.5) * 3
        ]}>
          <cylinderGeometry args={[0.08, 0.08, 0.4]} />
          <meshStandardMaterial 
            color="#d2691e"
            metalness={0.1} 
            roughness={0.7}
          />
        </mesh>
      ))}

      {/* Capacitors */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`capacitor-${i}`} position={[
          (Math.random() - 0.5) * 4,
          0.15,
          (Math.random() - 0.5) * 3
        ]}>
          <cylinderGeometry args={[0.12, 0.12, 0.25]} />
          <meshStandardMaterial 
            color="#2c3e50" 
            metalness={0.3} 
            roughness={0.6}
          />
        </mesh>
      ))}

      {/* IC chips - realistic black plastic packages */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={`ic-${i}`} position={[
          (Math.random() - 0.5) * 3.5,
          0.13,
          (Math.random() - 0.5) * 2.5
        ]}>
          <boxGeometry args={[0.6, 0.15, 0.8]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.1} 
            roughness={0.9}
          />
        </mesh>
      ))}

      {/* LED indicators - realistic small LEDs */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`led-${i}`} position={[
          (Math.random() - 0.5) * 4,
          0.15,
          (Math.random() - 0.5) * 3
        ]}>
          <cylinderGeometry args={[0.04, 0.04, 0.08]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#ff0000" : "#00ff00"}
            emissive={i % 2 === 0 ? "#ff0000" : "#00ff00"}
            emissiveIntensity={0.3 + Math.sin(Date.now() * 0.01 + i * 0.5) * 0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Solder mask texture overlay */}
      <mesh position={[0, 0.052, 0]}>
        <boxGeometry args={[4.95, 0.001, 3.95]} />
        <meshStandardMaterial
          color="#0d4f3c"
          transparent
          opacity={0.8}
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}

// Realistic Solar Panel Array with authentic solar cell appearance
function RealisticSolarPanelArray({ position, rotation }) {
  const groupRef = useRef();
  const panelRefs = useRef([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.1) * 0.1;
    }

    // Individual panel animations
    panelRefs.current.forEach((panel, i) => {
      if (panel) {
        panel.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.05;
        panel.position.y = Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.1;
      }
    });
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Solar panel frame - aluminum */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[5.2, 0.08, 3.2]} />
        <meshStandardMaterial
          color="#c0c0c0"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Individual solar cells with realistic blue silicon appearance */}
      {Array.from({ length: 60 }).map((_, i) => {
        const row = Math.floor(i / 10);
        const col = i % 10;
        return (
          <mesh
            key={i}
            ref={el => panelRefs.current[i] = el}
            position={[
              (col - 4.5) * 0.5,
              0,
              (row - 2.5) * 0.5
            ]}
          >
            <boxGeometry args={[0.45, 0.02, 0.45]} />
            <meshStandardMaterial
              color="#1e3a8a"
              metalness={0.3}
              roughness={0.2}
              emissive="#1e40af"
              emissiveIntensity={0.05 + Math.sin(Date.now() * 0.003 + i * 0.1) * 0.03}
            />
          </mesh>
        );
      })}

      {/* Grid lines between cells - realistic busbar appearance */}
      {Array.from({ length: 11 }).map((_, i) => (
        <mesh key={`h-grid-${i}`} position={[(i - 5) * 0.5, 0.011, 0]}>
          <boxGeometry args={[0.02, 0.001, 3]} />
          <meshStandardMaterial
            color="#silver"
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
      ))}

      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={`v-grid-${i}`} position={[0, 0.011, (i - 3) * 0.5]}>
          <boxGeometry args={[5, 0.001, 0.02]} />
          <meshStandardMaterial
            color="#silver"
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
      ))}

      {/* Tempered glass surface */}
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[5, 0.02, 3]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          metalness={0}
          roughness={0.05}
        />
      </mesh>

      {/* Support structure with realistic mounting */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 1.5]} />
        <meshStandardMaterial 
          color="#6B7280" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>

      {/* Junction box */}
      <mesh position={[2.3, -0.1, 1.3]}>
        <boxGeometry args={[0.3, 0.1, 0.2]} />
        <meshStandardMaterial
          color="#333333"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}

// Enhanced Industrial Gears with complex animations
function IndustrialGears({ position }) {
  const gear1Ref = useRef();
  const gear2Ref = useRef();
  const gear3Ref = useRef();
  const gear4Ref = useRef();

  useFrame((state, delta) => {
    if (gear1Ref.current) gear1Ref.current.rotation.z += delta * 0.8;
    if (gear2Ref.current) gear2Ref.current.rotation.z -= delta * 0.6;
    if (gear3Ref.current) gear3Ref.current.rotation.z += delta * 0.7;
    if (gear4Ref.current) gear4Ref.current.rotation.z -= delta * 0.9;
  });

  const createAdvancedGear = (radius, teeth, depth = 0.3) => {
    const shape = new THREE.Shape();
    const outerRadius = radius;
    const innerRadius = radius * 0.7;
    const toothHeight = radius * 0.15;

    // Create gear teeth with more detail
    for (let i = 0; i < teeth; i++) {
      const angle1 = (i / teeth) * Math.PI * 2;
      const angle2 = ((i + 0.2) / teeth) * Math.PI * 2;
      const angle3 = ((i + 0.4) / teeth) * Math.PI * 2;
      const angle4 = ((i + 0.6) / teeth) * Math.PI * 2;
      const angle5 = ((i + 0.8) / teeth) * Math.PI * 2;
      const angle6 = ((i + 1) / teeth) * Math.PI * 2;

      if (i === 0) {
        shape.moveTo(Math.cos(angle1) * outerRadius, Math.sin(angle1) * outerRadius);
      }

      // Create more complex tooth profile
      shape.lineTo(Math.cos(angle1) * (outerRadius + toothHeight), Math.sin(angle1) * (outerRadius + toothHeight));
      shape.lineTo(Math.cos(angle2) * (outerRadius + toothHeight), Math.sin(angle2) * (outerRadius + toothHeight));
      shape.lineTo(Math.cos(angle3) * (outerRadius + toothHeight * 0.8), Math.sin(angle3) * (outerRadius + toothHeight * 0.8));
      shape.lineTo(Math.cos(angle4) * outerRadius, Math.sin(angle4) * outerRadius);
      shape.lineTo(Math.cos(angle5) * outerRadius, Math.sin(angle5) * outerRadius);
      shape.lineTo(Math.cos(angle6) * outerRadius, Math.sin(angle6) * outerRadius);
    }

    // Add center hole
    const hole = new THREE.Path();
    hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    return new THREE.ExtrudeGeometry(shape, { 
      depth, 
      bevelEnabled: true, 
      bevelThickness: 0.05, 
      bevelSize: 0.02, 
      bevelSegments: 8 
    });
  };

  return (
    <group position={position}>
      {/* Main gear with advanced material */}
      <mesh ref={gear1Ref} position={[0, 0, 0]}>
        <primitive object={createAdvancedGear(1.5, 20)} />
        <meshStandardMaterial 
          color="#DC713E" 
          metalness={0.95} 
          roughness={0.1}
          emissive="#DC713E"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Secondary gears */}
      <mesh ref={gear2Ref} position={[2.8, 0, 0]}>
        <primitive object={createAdvancedGear(1, 15)} />
        <meshStandardMaterial 
          color="#1A3B44" 
          metalness={0.9} 
          roughness={0.15}
          emissive="#1A3B44"
          emissiveIntensity={0.05}
        />
      </mesh>

      <mesh ref={gear3Ref} position={[1.4, 2.2, 0]}>
        <primitive object={createAdvancedGear(1.2, 18)} />
        <meshStandardMaterial 
          color="#FFA726" 
          metalness={0.92} 
          roughness={0.12}
          emissive="#FFA726"
          emissiveIntensity={0.08}
        />
      </mesh>

      <mesh ref={gear4Ref} position={[-1.8, 1.5, 0]}>
        <primitive object={createAdvancedGear(0.8, 12)} />
        <meshStandardMaterial 
          color="#6B7280" 
          metalness={0.88} 
          roughness={0.18}
        />
      </mesh>

      {/* Mechanical linkages */}
      {Array.from({ length: 3 }).map((_, i) => {
        const angle = (i / 3) * Math.PI * 2;
        return (
          <mesh key={`link-${i}`} position={[Math.cos(angle) * 0.5, Math.sin(angle) * 0.5, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 2]} />
            <meshStandardMaterial color="#6B7280" metalness={0.8} roughness={0.2} />
          </mesh>
        );
      })}
    </group>
  );
}

// Enhanced Security Hub with particle effects
function SecurityHub({ position }) {
  const hubRef = useRef();
  const particlesRef = useRef();
  const orbRefs = useRef([]);

  useFrame((state) => {
    if (hubRef.current) {
      hubRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      hubRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      particlesRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.15;
    }

    // Animate security orbs
    orbRefs.current.forEach((orb, i) => {
      if (orb) {
        const angle = state.clock.elapsedTime * 0.5 + i * (Math.PI * 2 / 8);
        orb.position.x = Math.cos(angle) * 3;
        orb.position.z = Math.sin(angle) * 3;
        orb.position.y = Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.5;
      }
    });
  });

  const particlePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 100; i++) {
      positions.push([
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      ]);
    }
    return positions;
  }, []);

  return (
    <group position={position}>
      {/* Central security hub */}
      <mesh ref={hubRef}>
        <icosahedronGeometry args={[2, 3]} />
        <MeshDistortMaterial
          color="#DC713E"
          metalness={0.9}
          roughness={0.1}
          distort={0.2}
          speed={3}
          emissive="#DC713E"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Security network particles */}
      <group ref={particlesRef}>
        {particlePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.03 + Math.random() * 0.05]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#FFA726" : i % 3 === 1 ? "#DC713E" : "#F3F4F6"}
              emissive={i % 3 === 0 ? "#FFA726" : i % 3 === 1 ? "#DC713E" : "#F3F4F6"}
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
      </group>

      {/* Orbiting security nodes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={`orb-${i}`}
          ref={el => orbRefs.current[i] = el}
        >
          <sphereGeometry args={[0.2]} />
          <meshStandardMaterial
            color="#FFA726"
            emissive="#FFA726"
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Holographic grid */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        return (
          <mesh
            key={`grid-${i}`}
            position={[Math.cos(angle) * 4, 0, Math.sin(angle) * 4]}
            rotation={[0, angle, 0]}
          >
            <planeGeometry args={[0.1, 8]} />
            <meshStandardMaterial
              color="#6B7280"
              emissive="#6B7280"
              emissiveIntensity={0.2}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Enhanced Floating Data Crystals
function DataCrystals({ position }) {
  const groupRef = useRef();
  const crystalRefs = useRef([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }

    crystalRefs.current.forEach((crystal, i) => {
      if (crystal) {
        crystal.rotation.x = state.clock.elapsedTime * (0.5 + i * 0.1);
        crystal.rotation.y = state.clock.elapsedTime * (0.3 + i * 0.05);
        crystal.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.5;
      }
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          ref={el => crystalRefs.current[i] = el}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 2,
            0,
            Math.sin((i / 5) * Math.PI * 2) * 2
          ]}
        >
          <octahedronGeometry args={[0.5 + i * 0.1]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#DC713E" : "#FFA726"}
            emissive={i % 2 === 0 ? "#DC713E" : "#FFA726"}
            emissiveIntensity={0.4}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main Engineering Models component
function EngineeringModels() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Realistic circuit boards for automation */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <RealisticCircuitBoard position={[-10, 3, -6]} scale={0.9} />
      </Float>

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
        <RealisticCircuitBoard position={[8, -4, 5]} scale={1.3} />
      </Float>

      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.5}>
        <RealisticCircuitBoard position={[-6, -2, 8]} scale={0.7} />
      </Float>

      {/* Realistic solar panels */}
      <Float speed={0.9} rotationIntensity={0.2} floatIntensity={0.5}>
        <RealisticSolarPanelArray position={[12, 5, -10]} rotation={[0.3, 0.4, 0]} />
      </Float>

      <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.3}>
        <RealisticSolarPanelArray position={[-8, 6, -3]} rotation={[-0.2, -0.3, 0]} />
      </Float>

      {/* Industrial gears */}
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.7}>
        <IndustrialGears position={[-7, -5, 7]} />
      </Float>

      <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.4}>
        <IndustrialGears position={[9, 2, -8]} />
      </Float>

      {/* Security hubs */}
      <Float speed={1.0} rotationIntensity={0.5} floatIntensity={0.4}>
        <SecurityHub position={[2, 0, -12]} />
      </Float>

      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.6}>
        <SecurityHub position={[-12, -3, 2]} />
      </Float>

      {/* Data crystals */}
      <Float speed={2.0} rotationIntensity={0.4} floatIntensity={0.8}>
        <DataCrystals position={[0, 8, -5]} />
      </Float>

      <Float speed={1.7} rotationIntensity={0.3} floatIntensity={0.5}>
        <DataCrystals position={[6, -6, -2]} />
      </Float>

      {/* Ambient floating elements */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Float 
          key={i} 
          speed={Math.random() * 3 + 0.5} 
          rotationIntensity={Math.random() * 0.5} 
          floatIntensity={Math.random() * 0.8}
        >
          <mesh position={[
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 60
          ]}>
            <sphereGeometry args={[0.1 + Math.random() * 0.3]} />
            <meshStandardMaterial
              color={Math.random() > 0.6 ? "#DC713E" : Math.random() > 0.3 ? "#FFA726" : "#F3F4F6"}
              emissive={Math.random() > 0.6 ? "#DC713E" : Math.random() > 0.3 ? "#FFA726" : "#F3F4F6"}
              emissiveIntensity={0.3 + Math.random() * 0.4}
              transparent
              opacity={0.6 + Math.random() * 0.3}
            />
          </mesh>
        </Float>
      ))}

      {/* Energy connection lines */}
      {Array.from({ length: 15 }).map((_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const radius = 20 + Math.random() * 10;
        return (
          <Float key={`energy-${i}`} speed={0.5 + Math.random()} rotationIntensity={0.1} floatIntensity={0.2}>
            <mesh
              position={[
                Math.cos(angle) * radius,
                (Math.random() - 0.5) * 15,
                Math.sin(angle) * radius
              ]}
              rotation={[0, angle, 0]}
            >
              <cylinderGeometry args={[0.02, 0.02, 8 + Math.random() * 4]} />
              <meshStandardMaterial
                color="#6B7280"
                emissive="#6B7280"
                emissiveIntensity={0.4}
                transparent
                opacity={0.4}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

// Enhanced Camera Controller with smooth cinematic movements
function CameraController({ scrollProgress }) {
  const { camera } = useThree();
  const timeline = useRef();

  useLayoutEffect(() => {
    timeline.current = gsap.timeline({ paused: true });

    const cameraPositions = [
      { x: 0, y: 3, z: 20, rotY: 0, rotX: -0.15, fov: 35 },
      { x: -12, y: 6, z: 15, rotY: 0.4, rotX: -0.25, fov: 30 },
      { x: 15, y: -3, z: 12, rotY: -0.6, rotX: 0.15, fov: 40 },
      { x: -5, y: 10, z: 8, rotY: 0.3, rotX: -0.4, fov: 25 },
      { x: 8, y: -8, z: 18, rotY: -0.2, rotX: 0.3, fov: 45 },
      { x: 0, y: 0, z: 25, rotY: 0, rotX: 0, fov: 35 },
    ];

    cameraPositions.forEach((pos, index) => {
      const progress = index / (cameraPositions.length - 1);
      
      timeline.current.to(camera.position, {
        x: pos.x, y: pos.y, z: pos.z,
        duration: 3, ease: 'power2.inOut'
      }, progress);
      
      timeline.current.to(camera.rotation, {
        y: pos.rotY, x: pos.rotX,
        duration: 3, ease: 'power2.inOut'
      }, progress);
      
      timeline.current.to(camera, {
        fov: pos.fov,
        duration: 3, ease: 'power2.inOut',
        onUpdate: () => camera.updateProjectionMatrix()
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

// Post-processing effects component
function PostProcessingEffects() {
  return (
    <>
      <Sparkles
        count={100}
        scale={[40, 20, 40]}
        size={3}
        speed={0.5}
        color="#FFA726"
        opacity={0.6}
      />
      <Sparkles
        count={50}
        scale={[30, 15, 30]}
        size={4}
        speed={0.3}
        color="#DC713E"
        opacity={0.4}
      />
      <Stars
        radius={100}
        depth={50}
        count={200}
        factor={4}
        saturation={0.5}
        fade
        speed={0.5}
      />
    </>
  );
}

// Main Scene component
export default function Scene({ scrollProgress, performanceMode = 'high' }) {
  const [fogDensity, setFogDensity] = useState(0.02);

  useFrame((state) => {
    // Dynamic fog based on scroll position
    const newFogDensity = 0.015 + Math.sin(state.clock.elapsedTime * 0.2) * 0.005;
    setFogDensity(newFogDensity);
  });

  return (
    <>
      {/* Dynamic background color */}
      <color attach="background" args={['#0a0a0a']} />

      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.3} color="#1A3B44" />
      
      <directionalLight
        position={[20, 20, 15]}
        intensity={2}
        color="#FFA726"
        castShadow={performanceMode === 'high'}
        shadow-mapSize={performanceMode === 'high' ? [4096, 4096] : [1024, 1024]}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      
      <pointLight position={[-20, -15, -20]} color="#DC713E" intensity={1.2} />
      <pointLight position={[15, 10, -15]} color="#6B7280" intensity={0.8} />
      <pointLight position={[0, 25, 0]} color="#F3F4F6" intensity={1} />
      
      <spotLight
        position={[0, 30, 0]}
        angle={0.4}
        penumbra={1}
        intensity={0.8}
        color="#FFA726"
        castShadow={performanceMode === 'high'}
        shadow-mapSize={performanceMode === 'high' ? [2048, 2048] : [1024, 1024]}
      />
      
      <spotLight
        position={[-25, 15, 10]}
        angle={0.3}
        penumbra={0.8}
        intensity={0.6}
        color="#DC713E"
        target-position={[0, 0, 0]}
      />

      {/* Environment mapping for realistic reflections */}
      <Environment 
        preset="night" 
        background={false}
        blur={0.8}
        intensity={0.5}
      />

      {/* Main 3D models */}
      <EngineeringModels />

      {/* Post-processing effects - conditional based on performance */}
      {performanceMode !== 'low' && <PostProcessingEffects />}

      {/* Camera controller */}
      <CameraController scrollProgress={scrollProgress} />

      {/* Dynamic fog */}
      <fog attach="fog" args={['#0a0a0a', 25, 80]} />

      {/* Additional atmospheric elements - reduced for low performance */}
      {performanceMode !== 'low' && Array.from({ length: performanceMode === 'high' ? 20 : 10 }).map((_, i) => (
        <Cloud
          key={i}
          position={[
            (Math.random() - 0.5) * 100,
            Math.random() * 20 + 10,
            (Math.random() - 0.5) * 100
          ]}
          scale={[2, 1, 2]}
          color="#1A3B44"
          opacity={0.1}
          speed={0.1 + Math.random() * 0.2}
        />
      ))}
    </>
  );
}

