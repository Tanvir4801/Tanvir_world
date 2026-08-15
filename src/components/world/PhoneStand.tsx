"use client";

import { useControls } from "leva";
import { Model as PhoneStandModel } from "../models/PhoneStandModel";
import { IPhone } from "./IPhone";
import { AutoPlace } from "./AutoPlace";
import { useState } from "react";

export function PhoneStand({ tableHeight }: { tableHeight: number }) {
  const [standHeight, setStandHeight] = useState(0);

  const stand = useControls("PERSONAL.Phone Stand", {
    x: { value: 0.35, step: 0.01 },
    z: { value: 0.20, step: 0.01 },
    rotY: { value: 0, step: 0.01 },
    targetWidth: { value: 0.12, step: 0.01 },
  });

  return (
    <group position={[stand.x, tableHeight, stand.z]} rotation={[0, stand.rotY, 0]}>
      <AutoPlace 
        targetWidth={stand.targetWidth} 
        surfaceY={0}
        onHeightCalculated={(h) => setStandHeight(h)}
      >
        <PhoneStandModel />
      </AutoPlace>

      {/* The iPhone is nested inside the phone stand, so it moves with it. 
          It receives the standHeight so it can be offset dynamically. */}
      <IPhone standHeight={standHeight} />
    </group>
  );
}
