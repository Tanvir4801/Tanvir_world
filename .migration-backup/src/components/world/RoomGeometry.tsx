"use client";

import { ROOM } from "@/config/sceneConfig";

export function RoomGeometry() {
  const roomHeight = 3; // 3 meters tall

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, ROOM.floor, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>

      {/* Back Wall (Z = negative) */}
      <mesh position={[0, roomHeight / 2, ROOM.backWall]} receiveShadow>
        <planeGeometry args={[20, roomHeight]} />
        <meshStandardMaterial color="#080808" roughness={0.9} />
      </mesh>

      {/* Right Wall (X = positive) */}
      <mesh position={[ROOM.rightWall, roomHeight / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, roomHeight]} />
        <meshStandardMaterial color="#080808" roughness={0.9} />
      </mesh>
          
      {/* Subtle Wall Accents (Baseboards) */}
      <mesh position={[0, 0.05, ROOM.backWall + 0.01]} receiveShadow>
        <boxGeometry args={[20, 0.1, 0.02]} />
        <meshStandardMaterial color="#111111" roughness={0.5} />
      </mesh>
      
      <mesh position={[ROOM.rightWall - 0.01, 0.05, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[20, 0.1, 0.02]} />
        <meshStandardMaterial color="#111111" roughness={0.5} />
      </mesh>
    </group>
  );
}
