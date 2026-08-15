"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useAppStore, CameraView } from "@/store/useAppStore";

// Named camera positions for each interaction state
const HERO_CAMERA = {
  position: new THREE.Vector3(-0.5, 1.65, 2.9),
  target: new THREE.Vector3(0.2, 0.9, 0),
  fov: 52,
};

const VIEW_CONFIGS: Record<CameraView, { position: THREE.Vector3; target: THREE.Vector3; fov: number }> = {
  hero: HERO_CAMERA,
  work: {
    // Zoom toward the developer monitor
    position: new THREE.Vector3(-1.8, 1.35, 0.8),
    target: new THREE.Vector3(-1.6, 1.1, -0.5),
    fov: 38,
  },
  iphone: {
    // Zoom toward the iPhone stand on the personal table
    position: new THREE.Vector3(0.85, 1.15, 1.1),
    target: new THREE.Vector3(0.85, 0.9, 0.4),
    fov: 34,
  },
  macbook: {
    // Zoom toward the MacBook screen
    position: new THREE.Vector3(0.35, 1.2, 1.15),
    target: new THREE.Vector3(0.35, 0.85, 0.3),
    fov: 36,
  },
  about: {
    // Pull back to show certificate wall (back wall, wide shot)
    position: new THREE.Vector3(0, 1.7, 2.2),
    target: new THREE.Vector3(0, 1.4, -2.5),
    fov: 55,
  },
  contact: {
    // Slight right angle toward the personal zone
    position: new THREE.Vector3(1.2, 1.6, 2.4),
    target: new THREE.Vector3(0.5, 0.9, 0),
    fov: 50,
  },
};

export function CameraController() {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const cameraView = useAppStore(state => state.cameraView);
  const scrollProgress = useAppStore(state => state.scrollProgress);

  // Track lerp target
  const targetPos = useRef(HERO_CAMERA.position.clone());
  const targetLook = useRef(HERO_CAMERA.target.clone());
  const targetFov = useRef(HERO_CAMERA.fov);

  // Apply initial camera position immediately
  useEffect(() => {
    camera.position.copy(HERO_CAMERA.position);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = HERO_CAMERA.fov;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  // Update lerp targets when cameraView changes
  useEffect(() => {
    const cfg = VIEW_CONFIGS[cameraView];
    targetPos.current.copy(cfg.position);
    targetLook.current.copy(cfg.target);
    targetFov.current = cfg.fov;
  }, [cameraView]);

  useFrame((_, delta) => {
    const speed = 2.5 * delta; // smooth dolly
    camera.position.lerp(targetPos.current, speed);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, speed);
      camera.updateProjectionMatrix();
    }
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLook.current, speed);
      controlsRef.current.update();
    }
  });

  // Only allow orbit in hero state so user can inspect the room
  const allowOrbit = cameraView === "hero";

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enabled={allowOrbit}
      enableZoom={false}
      enablePan={false}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.2}
      minAzimuthAngle={-Math.PI / 4}
      maxAzimuthAngle={Math.PI / 4}
      target={HERO_CAMERA.target.toArray() as [number, number, number]}
    />
  );
}
