'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import { Suspense, useRef } from 'react';

import Scene from '@/components/Scene_Alternative2';
import Overlay from '@/components/Overlay';
import Loader from '@/components/Loader';

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
    <div className="relative w-screen h-screen">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ antialias: true }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <Suspense fallback={<Loader />}>
          <ScrollControls pages={9} damping={0.2} ref={scrollRef}>
            <Scene />
            <Scroll html>
              <div className="w-screen relative z-50">
                <Overlay />
              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}

