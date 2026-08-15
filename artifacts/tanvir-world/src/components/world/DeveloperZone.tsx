"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "@/store/useAppStore";
import { Model as GamingTableModel } from "../models/GamingTableModel";
import { Model as ProgrammerDesktopModel } from "../models/ProgrammerDesktopModel";
import { Model as DeskLampModel } from "../models/DeskLampModel";
import { AutoPlace } from "./AutoPlace";
import { ROOM, sceneConfig } from "@/config/sceneConfig";

export function DeveloperZone() {
  const setZonePosition = useAppStore(state => state.setZonePosition);
  const tableBounds = useAppStore(state => state.tableBounds["developerTable"]);
  const tableHeight = useAppStore(state => state.tableHeights["developerTable"] ?? 0);
  const cameraView = useAppStore(state => state.cameraView);
  const setCameraView = useAppStore(state => state.setCameraView);

  const groupRef = useRef<THREE.Group>(null);

  // ─── Snap table to back-left corner once bounds are measured ───────────────
  // tableBounds are LOCAL (relative to the AutoPlace group origin).
  // The AutoPlace group sits inside this DeveloperZone group.
  // So to push the table's leftmost face to ROOM.leftWall, we set:
  //   groupRef.x = ROOM.leftWall - tableBounds.minX
  // Similarly for Z (back wall).
  useFrame(() => {
    if (!groupRef.current || !tableBounds) return;

    const desiredX = ROOM.leftWall - tableBounds.minX + 0.04; // tiny inset to avoid z-fighting
    const desiredZ = ROOM.backWall - tableBounds.minZ + 0.04;

    groupRef.current.position.x = desiredX;
    groupRef.current.position.z = desiredZ;
    groupRef.current.position.y = 0; // floor

    // Broadcast world-space position so MainWorkspace can locate us
    setZonePosition("developerZone", {
      x: desiredX,
      y: 0,
      z: desiredZ,
    });
  });

  const isWorkView = cameraView === "work";

  return (
    <group ref={groupRef}>
      {/* ── L-Shaped Developer Table ─────────────────────────────────── */}
      {/* AutoPlace scales it to targetWidth and lifts bottom to Y=0 (floor) */}
      <AutoPlace id="developerTable" targetWidth={sceneConfig.developerTable.targetWidth} surfaceY={ROOM.floor}>
        <GamingTableModel />
      </AutoPlace>

      {/* ── PC Setup sits ON the tabletop ────────────────────────────── */}
      {/* position.y = tableHeight (the physical top of the desk mesh) */}
      {/* Local X=0.2 puts it on the main left run of the L, not the corner wing */}
      <group
        position={[0.2, tableHeight, 0.12]}
        onClick={() => setCameraView(isWorkView ? "hero" : "work")}
      >
        <AutoPlace
          targetWidth={sceneConfig.desktopPc.targetWidth}
          surfaceY={0}
          onHeightCalculated={() => {}}
        >
          <ProgrammerDesktopModel />
        </AutoPlace>
      </group>

      {/* ── Desk Lamp ─────────────────────────────────────────────────── */}
      <group position={[0.85, tableHeight, 0.12]}>
        <AutoPlace targetWidth={sceneConfig.lamp.targetWidth} surfaceY={0}>
          <DeskLampModel />
        </AutoPlace>
      </group>

      {/* ── Certificate Wall (6 frames, back wall, local Z is relative) ── */}
      <CertificateWall tableHeight={tableHeight} />
    </group>
  );
}

// ── 6-frame certificate wall ─────────────────────────────────────────────────
function CertificateWall({ tableHeight }: { tableHeight: number }) {
  const frameW = 0.32;
  const frameH = 0.22;
  const depth = 0.02;
  // Place 3 frames per row, 2 rows → 6 total
  const cols = 3;
  const rows = 2;
  const hGap = 0.08;
  const vGap = 0.08;
  const totalW = cols * frameW + (cols - 1) * hGap;
  const startX = -totalW / 2;
  const wallZ = -0.05; // just in front of the back wall face
  const baseY = 1.1;   // bottom row starts here (human-level eye line)

  const frames: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      frames.push({
        x: startX + c * (frameW + hGap) + frameW / 2,
        y: baseY + r * (frameH + vGap),
      });
    }
  }

  return (
    <group position={[0.5, 0, wallZ]}>
      {frames.map((f, i) => (
        <group key={i} position={[f.x, f.y, 0]}>
          {/* Frame border */}
          <mesh>
            <boxGeometry args={[frameW, frameH, depth]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.4} roughness={0.6} />
          </mesh>
          {/* Matte white canvas placeholder */}
          <mesh position={[0, 0, depth / 2 + 0.001]}>
            <planeGeometry args={[frameW - 0.025, frameH - 0.025]} />
            <meshStandardMaterial color="#f0ece4" roughness={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
