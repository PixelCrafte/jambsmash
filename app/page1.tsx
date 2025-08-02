// 3. Replace the contents of: app/page.js

'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Scene from '@/components/Scene_Alternative2';
import Overlay from '@/components/Overlay';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Footer from '@components/Footer';

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
      <div style={{ height: '100dvh', width: '100vw', position: 'relative' }}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 35 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={<Loader />}>
            <ScrollControls pages={10} damping={0.2} ref={scrollRef}>
              <Scene />
              <Overlay />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
