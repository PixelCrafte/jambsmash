"use client";
// 1. app/page.js
// Replace the contents of your page.js with this new structure.
// Note the 'use client' directive and the new component hierarchy.


import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Scene from '@/components/Scene';
import Overlay from '@/components/Overlay';

export default function Home() {
  return (
    // The main container for our 3D experience
    <div style={{ height: '100vh', width: '100vw' }}>
      {/* The Canvas component is the root of our 3D scene. */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ antialias: true }}
      >
        {/* ScrollControls must be placed inside the Canvas. */}
        <ScrollControls pages={4} damping={0.2}>
          
          {/* Our 3D models and logic now live inside ScrollControls. */}
          <Scene />
          
          {/* The HTML overlay is also a child of ScrollControls. */}
          <Overlay />

        </ScrollControls>
      </Canvas>
    </div>
  );
}
