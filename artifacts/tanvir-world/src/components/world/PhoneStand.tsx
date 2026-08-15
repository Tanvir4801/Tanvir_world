"use client";

import { useState } from "react";
import { Model as PhoneStandModel } from "../models/PhoneStandModel";
import { AutoPlace } from "./AutoPlace";
import { IPhone } from "./IPhone";
import { sceneConfig } from "@/config/sceneConfig";
import { useAppStore } from "@/store/useAppStore";

export function PhoneStand({ tableHeight }: { tableHeight: number }) {
  const [standHeight, setStandHeight] = useState(0);
  const setCameraView = useAppStore(state => state.setCameraView);
  const cameraView = useAppStore(state => state.cameraView);

  return (
    // Slightly right of the MacBook and forward
    <group
      position={[0.30, tableHeight, 0.18]}
      onClick={() => setCameraView(cameraView === "iphone" ? "hero" : "iphone")}
    >
      <AutoPlace
        targetWidth={sceneConfig.phoneStand.targetWidth}
        surfaceY={0}
        onHeightCalculated={setStandHeight}
      >
        <PhoneStandModel />
      </AutoPlace>

      {/* iPhone mounted inside stand — local coords relative to stand base */}
      <IPhone standHeight={standHeight} />
    </group>
  );
}
