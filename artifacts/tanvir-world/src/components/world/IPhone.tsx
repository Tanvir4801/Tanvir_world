"use client";

import { Model as IPhoneModel } from "../models/IPhoneModel";
import { AutoPlace } from "./AutoPlace";
import { sceneConfig } from "@/config/sceneConfig";

export function IPhone({ standHeight }: { standHeight: number }) {
  // Portrait, leaning back slightly (-0.18 radians = ~10°), centered in stand
  return (
    <group
      position={[0, standHeight * 0.55, 0.01]}
      rotation={[-0.18, 0, 0]}
    >
      <AutoPlace targetWidth={sceneConfig.iphone.targetWidth} surfaceY={0}>
        <IPhoneModel />
      </AutoPlace>
    </group>
  );
}
