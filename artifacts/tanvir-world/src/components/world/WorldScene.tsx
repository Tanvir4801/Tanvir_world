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
      <div
        className="relative h-full w-full overflow-hidden bg-[#030303]"
        aria-label="Tanvir's World 3D scene"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_38%,rgba(77,208,225,0.08),transparent_32%),linear-gradient(135deg,#070707_0%,#030303_60%,#0a0a0a_100%)]" />
        <div className="absolute left-[18%] top-[34%] h-px w-[64%] bg-white/10" />
        <div className="absolute left-[18%] top-[34%] h-[35%] w-px bg-white/10" />
        <div className="absolute right-[18%] top-[34%] h-[35%] w-px bg-white/10" />
        <div className="absolute left-[18%] top-[69%] h-px w-[64%] bg-white/10" />
        <div className="absolute left-[26%] top-[50%] h-20 w-36 border border-brand/20 bg-brand/5 shadow-[0_0_45px_rgba(77,208,225,0.08)]" />
        <div className="absolute right-[25%] top-[49%] h-16 w-28 border border-warm/20 bg-warm/5 shadow-[0_0_45px_rgba(245,181,97,0.06)]" />
      </div>
    );
  }

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
