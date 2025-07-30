// 2. In app/page.js, change the import to use the new scene.
// Only this one line needs to be changed.

'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
// Change this import from './Scene' to './Scene_Alternative'
import Scene from '@/components/SceneClaude'; 
import Overlay from '@/components/Overlay';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';

export default function Home() {
  const scrollRef = useRef();

  const handleSectionChange = (sectionIndex) => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.el;
      const pageHeight = scrollContainer.clientHeight;
      scrollContainer.scrollTo({
        top: pageHeight * sectionIndex,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <Navbar onSectionChange={handleSectionChange} />
      <div style={{ height: '100vh', width: '100vw' }}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }} // Adjusted fov for a better view
          gl={{ antialias: true }}
        >
          <Suspense fallback={<Loader />}>
            <ScrollControls pages={5} damping={0.2} ref={scrollRef}>
              <Scene />
              <Overlay />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

