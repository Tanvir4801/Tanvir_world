"use client";

import { Html } from "@react-three/drei";
import { useState } from "react";
import { Model as MacBookModel } from "../models/MacBookModel";
import { AutoPlace } from "./AutoPlace";
import { useControls } from "leva";

export function MacBook({ tableHeight }: { tableHeight?: number }) {
  const [hovered, setHovered] = useState(false);
  
  const config = useControls("PERSONAL.MacBook", {
    x: { value: 0.00, step: 0.01 }, // Center
    z: { value: -0.10, step: 0.01 }, // Slightly rear-center
    rotY: { value: 0, step: 0.01 }, // Facing camera
    targetWidth: { value: 0.38, step: 0.01 }, // Realistic 15-inch laptop scale relative to 1.5m table
  });

  return (
    <group 
      position={[config.x, tableHeight || 0.74, config.z]}
      rotation={[0, config.rotY, 0]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <AutoPlace targetWidth={config.targetWidth} surfaceY={0}>
        <MacBookModel />
      </AutoPlace>
    </group>
  );
}
