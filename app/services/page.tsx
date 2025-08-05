// 1. app/services/page.tsx
// This file is correct. No changes are needed.

'use client';

import { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import ServicesScene from '@/components/ServicesScene';
import Overlay from '@/components/ServicesOverlay';
import Loader from '@/components/Loader';

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
    <main className="w-screen h-screen relative">
      {/* Container for the 3D Canvas. It sits in the background. */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={<Loader />}>
            <ServicesScene scrollPosition={scrollPosition} />
          </Suspense>
        </Canvas>
      </div>

      {/* Container for the HTML Overlay. It's a sibling to the Canvas container
          and sits on top with a higher z-index. */}
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
