"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { useAppStore } from "@/store/useAppStore";

export function CameraController() {
  const { camera } = useThree();

  const devBounds = useAppStore(state => state.tableBounds['developerTable']);
  const mainBounds = useAppStore(state => state.tableBounds['mainTable']);
  const devZonePos = useAppStore(state => state.zonePositions['developerZone']);
  const scrollProgress = useAppStore(state => state.scrollProgress);

  const camControls = useControls("CAMERA", {
    y: { value: 1.60, step: 0.05 },
    z: { value: 2.80, step: 0.1 }, // Moved closer to make workstations 70-80% of composition
    fov: { value: 50, min: 20, max: 100, step: 1 },
    targetY: { value: 1.20, step: 0.05 }, // Target 1.2m height
  });

  // Calculate mid-point between the two workstations to frame them perfectly
  const devCenterX = devZonePos && devBounds ? devZonePos.x + (devBounds.minX + devBounds.maxX) / 2 : -1.0;
  // Approximation of Main Workspace center (Dev Max X + Gap + Half Main Width)
  const mainCenterX = devZonePos && devBounds ? devZonePos.x + devBounds.maxX + 1.2 + 0.75 : 1.0;
  
  const targetX = (devCenterX + mainCenterX) / 2;

  useEffect(() => {
    // Inspection camera locked
    camera.position.set(targetX, camControls.y, camControls.z);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = camControls.fov;
      camera.updateProjectionMatrix();
    }
  }, [camera, camControls, targetX]);

  useFrame(() => {
    const t = Math.min(1, Math.max(0, (scrollProgress - 0.12) / 0.62));
    const eased = t * t * (3 - 2 * t);
    const cinematicTarget = new THREE.Vector3(targetX + 0.7, 1.2, -0.2);
    const cinematicPosition = new THREE.Vector3(targetX + 0.35, 1.34, 1.05);
    camera.position.lerpVectors(new THREE.Vector3(targetX, camControls.y, camControls.z), cinematicPosition, eased);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = camControls.fov - eased * 12;
      camera.updateProjectionMatrix();
    }
    const controls = camera.userData.controls as { target?: THREE.Vector3 } | undefined;
    if (controls?.target) controls.target.lerp(cinematicTarget, eased * 0.08);
  });

  return <OrbitControls ref={(instance) => { if (instance) camera.userData.controls = instance; }} enabled={scrollProgress < 0.16} makeDefault target={[targetX, camControls.targetY, 0]} />;
}
