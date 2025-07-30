// 3. Replace the contents of: app/page.js

'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Scene from '@/components/Scene';
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
          camera={{ position: [0, 0, 10], fov: 35 }}
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
