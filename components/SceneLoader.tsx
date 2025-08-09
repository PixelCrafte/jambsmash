// components/SceneLoader.js

'use client';

import { Html, useProgress } from '@react-three/drei';
import Loader from '@/components/Loader'; // Assuming this is your original HTML loader

export function SceneLoader() {
  const { active } = useProgress();

  // If loading is active, render the Loader inside an <Html> component.
  // The <Html> component from drei allows you to render HTML inside the Canvas.
  // 'center' positions it in the middle of the screen.
  return active ? (
    <Html center>
      <Loader />
    </Html>
  ) : null;
}
