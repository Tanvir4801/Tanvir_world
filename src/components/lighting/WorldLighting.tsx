"use client";

import { Environment } from "@react-three/drei";

export function WorldLighting() {
  return (
    <group>
      <Environment preset="city" />

      {/* Base ambient lighting - Neutral inspection light */}
      <ambientLight intensity={0.5} color="#ffffff" />
      
      {/* Subtle directional room light to see geometry clearly */}
      <directionalLight position={[2, 5, 4]} intensity={0.8} color="#ffffff" castShadow />
      <directionalLight position={[-2, 5, -4]} intensity={0.3} color="#ffffff" />
    </group>
  );
}
