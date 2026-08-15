"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "@/store/useAppStore";
import { Model as CyberpunkTableModel } from "../models/CyberpunkTableModel";
import { Model as FicusBonsaiModel } from "../models/FicusBonsaiModel";
import { AutoPlace } from "./AutoPlace";
import { MacBook } from "./MacBook";
import { PhoneStand } from "./PhoneStand";
import { ROOM, sceneConfig } from "@/config/sceneConfig";

export function MainWorkspace() {
  const groupRef = useRef<THREE.Group>(null);

  const devZonePos = useAppStore(state => state.zonePositions["developerZone"]);
  const devTableBounds = useAppStore(state => state.tableBounds["developerTable"]);
  const tableHeight = useAppStore(state => state.tableHeights["mainTable"] ?? 0);

  // Walking gap between the two zones: 0.85 m (≈ one stride)
  const WALK_GAP = 0.85;

  useFrame(() => {
    if (!groupRef.current) return;
    if (!devZonePos || !devTableBounds) {
      // Fallback until developer zone is measured
      groupRef.current.position.set(1.1, 0, 0.65);
      return;
    }

    // Right edge of the L-desk in world space
    const devRightEdge = devZonePos.x + devTableBounds.maxX;
    groupRef.current.position.set(
      devRightEdge + WALK_GAP,
      0,    // floor
      0.65, // slightly forward so both zones are in the same camera frame
    );
  });

  return (
    <group ref={groupRef}>
      {/* ── Personal (Cyberpunk) Table ──────────────────────────── */}
      <AutoPlace
        id="mainTable"
        targetWidth={sceneConfig.mainTable.targetWidth}
        surfaceY={ROOM.floor}
      >
        <CyberpunkTableModel />
      </AutoPlace>

      {/* ── MacBook ─ center of table ───────────────────────────── */}
      <MacBook tableHeight={tableHeight} />

      {/* ── Phone stand + iPhone ────────────────────────────────── */}
      <PhoneStand tableHeight={tableHeight} />

      {/* ── Bonsai ─ rear-right corner ──────────────────────────── */}
      <group position={[0.38, tableHeight, -0.22]}>
        <AutoPlace targetWidth={sceneConfig.bonsai.targetWidth} surfaceY={0}>
          <FicusBonsaiModel />
        </AutoPlace>
      </group>
    </group>
  );
}
