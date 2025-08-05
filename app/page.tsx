'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';

import Scene from '@/components/Scene_Alternative2';
import Overlay from '@/components/Overlay';
// MODIFICATION: We will create this new component in the next step
import { SceneLoader } from '@/components/SceneLoader';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    if (scrollHeight - clientHeight === 0) {
      setScrollProgress(0);
      return;
    }

    const progress = scrollTop / (scrollHeight - clientHeight);
    setScrollProgress(progress);
  };

  return (
    <div className="relative w-screen h-screen bg-[#0a0a0a]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ antialias: true }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
        
        {/* MODIFICATION: The loader logic is now handled inside the Canvas */}
        <SceneLoader />
      </Canvas>
      
      {/* MODIFICATION: The original Loader component is removed from here */}
      
      <div
        className="absolute top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto z-10"
        onScroll={handleScroll}
      >
        <Overlay />
      </div>
    </div>
  );
}
