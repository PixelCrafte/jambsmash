// 1. app/services/page.tsx
// This file is correct. No changes are needed.

'use client';

import { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import ServicesScene from '@/components/ServicesScene';
import Overlay from '@/components/ServicesOverlay';
import Loader from '@/components/SceneLoader';

export default function ServicesPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const maxScroll = scrollHeight - clientHeight;
    const scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
    setScrollPosition(scrollFraction);
  };

  return (
    <main className="w-screen h-screen relative overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
          shadows
        >
          <Suspense fallback={<Loader />}>
            <ServicesScene scrollPosition={scrollPosition} />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML Overlay */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="absolute top-0 left-0 w-full h-full z-10 overflow-y-auto overflow-x-hidden scroll-smooth"
        style={{
          background: 'linear-gradient(180deg, rgba(10, 25, 47, 0.1) 0%, rgba(10, 25, 47, 0.3) 50%, rgba(10, 25, 47, 0.1) 100%)',
          scrollbarWidth: 'thin',
          scrollbarColor: '#DC713E #1A3B44'
        }}
      >
        <Overlay />
      </div>
    </main>
    );
}
