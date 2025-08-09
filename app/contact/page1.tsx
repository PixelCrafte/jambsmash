// 1. app/contact/page.tsx
// This is the main file for your new Contact page.

'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ContactScene from '@/components/ContactScene';
import Overlay from '@/components/ContactOverlay';
import Loader from '@/components/Loader';

export default function ContactPage() {
  return (
    <main className="w-screen h-screen relative">
      {/* Container for the 3D Canvas */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={<Loader />}>
            <ContactScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Container for the HTML Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full z-10 overflow-y-auto overflow-x-hidden flex justify-center items-center"
      >
        <Overlay />
      </div>
    </main>
  );
}
