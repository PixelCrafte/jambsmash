// 1. app/about/page.tsx
// This is the main file for your new About page.

'use client';

import { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import AboutScene from '@/components/AboutScene';
import Overlay from '@/components/AboutOverlay';
import Loader from '@/components/Loader';

export default function AboutPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const maxScroll = scrollHeight - clientHeight;
    const scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
    setScrollPosition(scrollFraction);
  };

  return (
    <main className="w-screen h-screen relative">
      {/* Container for the 3D Canvas */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 45 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={<Loader />}>
            <AboutScene scrollPosition={scrollPosition} />
          </Suspense>
        </Canvas>
      </div>

      {/* Container for the HTML Overlay */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="absolute top-0 left-0 w-full h-full z-10 overflow-y-auto overflow-x-hidden"
      >
        <Overlay />
      </div>
    </main>
  );
}
