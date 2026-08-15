"use client";

import * as THREE from "three";
import { Model as MacBookModel } from "../models/MacBookModel";
import { AutoPlace } from "./AutoPlace";
import { useAppStore } from "@/store/useAppStore";
import { sceneConfig } from "@/config/sceneConfig";

export function MacBook({ tableHeight }: { tableHeight: number }) {
  const setCameraView = useAppStore(state => state.setCameraView);
  const cameraView = useAppStore(state => state.cameraView);

  return (
    <group
      position={[0.0, tableHeight, -0.08]}
      onClick={() => setCameraView(cameraView === "macbook" ? "hero" : "macbook")}
    >
      <AutoPlace targetWidth={sceneConfig.macbook.targetWidth} surfaceY={0}>
        <MacBookModel />
      </AutoPlace>
    </group>
  );
}
