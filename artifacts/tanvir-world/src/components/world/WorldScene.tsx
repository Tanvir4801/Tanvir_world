"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { DeveloperZone } from "./DeveloperZone";
import { MainWorkspace } from "./MainWorkspace";
import { CameraController } from "../camera/CameraController";
import { WorldLighting } from "../lighting/WorldLighting";
import { RoomGeometry } from "./RoomGeometry";

export function WorldScene() {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    setWebglAvailable(Boolean(context));
  }, []);

  if (webglAvailable === null) {
    return <div className="h-full w-full bg-[#030303]" aria-hidden="true" />;
  }

  if (!webglAvailable) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#030303]" aria-label="Tanvir's World 3D scene">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_38%,rgba(77,208,225,0.08),transparent_32%)]" />
      </div>
    );
  }

  return (
    // pointer-events-auto so 3D objects receive click events
    <div className="h-full w-full" style={{ pointerEvents: "auto" }}>
      <Canvas
        shadows
        gl={{ antialias: true }}
        camera={{ fov: 52, near: 0.1, far: 100 }}
      >
        <color attach="background" args={["#030303"]} />

        <CameraController />
        <WorldLighting />

        <Suspense fallback={null}>
          <RoomGeometry />
          <DeveloperZone />
          <MainWorkspace />
        </Suspense>
      </Canvas>
    </div>
  );
}
