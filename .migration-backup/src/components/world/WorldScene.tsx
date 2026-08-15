"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { DeveloperZone } from "./DeveloperZone";
import { MainWorkspace } from "./MainWorkspace";
import { CameraController } from "../camera/CameraController";
import { WorldLighting } from "../lighting/WorldLighting";
import { RoomGeometry } from "./RoomGeometry";

export function WorldScene() {
  return (
    <Canvas shadows>
      <color attach="background" args={["#030303"]} />
      
      <CameraController />
      <WorldLighting />

      <Suspense fallback={null}>
        <RoomGeometry />
        <DeveloperZone />
        <MainWorkspace />
      </Suspense>
    </Canvas>
  );
}
