"use client";

import { ReactNode } from "react";
import { Plane } from "@react-three/drei";

export function Room({ children }: { children: ReactNode }) {
  return (
    <group>
      {/* Floor */}
      {/* Reduced size to create a compact room feel (8x8m) */}
      <Plane
        args={[8, 8]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </Plane>
      
      {/* Minimal Back Wall */}
      {/* 8m wide, 4m high */}
      <Plane
        args={[8, 4]}
        position={[0, 2, -3]}
        receiveShadow
      >
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </Plane>

      {/* Group holding the desk and items */}
      <group position={[0, 0, 0]}>
        {children}
      </group>
    </group>
  );
}
