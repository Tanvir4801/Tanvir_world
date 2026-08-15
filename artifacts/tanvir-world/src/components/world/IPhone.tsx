"use client";

import { useControls } from "leva";
import { Model as IPhoneModel } from "../models/IPhoneModel";
import { AutoPlace } from "./AutoPlace";

export function IPhone({ standHeight }: { standHeight: number }) {
  const config = useControls("PERSONAL.iPhone", {
    x: { value: 0, step: 0.01 },
    yOffset: { value: 0.05, step: 0.01 }, // Relative to the stand's bottom
    z: { value: 0.02, step: 0.01 },
    rotX: { value: -0.15, step: 0.01 },
    rotY: { value: 0, step: 0.01 },
    rotZ: { value: 0, step: 0.01 },
    targetWidth: { value: 0.08, step: 0.01 },
  });

  return (
    <group 
      position={[config.x, config.yOffset, config.z]}
      rotation={[config.rotX, config.rotY, config.rotZ]}
    >
      <AutoPlace targetWidth={config.targetWidth} surfaceY={0}>
        <IPhoneModel />
      </AutoPlace>
    </group>
  );
}
