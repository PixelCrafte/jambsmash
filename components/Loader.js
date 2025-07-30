// 1. Create this file at: components/Loader.js

'use client';

import { Html, useProgress } from '@react-three/drei';

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-center text-brand-light">
        <div className="text-2xl font-bold">{Math.round(progress)}%</div>
        <div className="mt-2">Loading Experience...</div>
      </div>
    </Html>
  );
}

