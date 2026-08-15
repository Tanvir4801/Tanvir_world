"use client";

import { useControls } from "leva";
import { ROOM } from "@/config/sceneConfig";
import { Model as GamingTableModel } from "../models/GamingTableModel";
import { Model as ProgrammerDesktopModel } from "../models/ProgrammerDesktopModel";
import { Model as DeskLampModel } from "../models/DeskLampModel";
import { AutoPlace } from "./AutoPlace";
import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";

export function DeveloperZone() {
  const tableHeight = useAppStore(state => state.tableHeights['developerTable'] || 0.74);
  const tableBounds = useAppStore(state => state.tableBounds['developerTable']);
  const setZonePosition = useAppStore(state => state.setZonePosition);

  // Group: TABLES
  const table = useControls("TABLES.Developer Table", {
    targetWidth: { value: 2.2, step: 0.01 },
    rotY: { value: 0, step: 0.01 },
  });

  // Group: DEVELOPER
  const pc = useControls("DEVELOPER.Desktop PC", {
    x: { value: 0.20, step: 0.01 }, // Shift closer to center of L-shape
    yOffset: { value: -0.42, step: 0.01, min: -1.0, max: 1.0 }, // Allow negative values to sink the built-in platform
    z: { value: 0.10, step: 0.01 },
    rotY: { value: 0, step: 0.01 },
    targetWidth: { value: 1.2, step: 0.01 }, // Increased slightly
  });

  const lamp = useControls("DEVELOPER.Lamp", {
    x: { value: 0.85, step: 0.01 },
    z: { value: 0.15, step: 0.01 },
    rotY: { value: -0.20, step: 0.01 },
    targetWidth: { value: 0.3, step: 0.01 }, // Increased slightly
  });

  // Calculate dynamic snapping to the left and back walls
  const snapX = tableBounds ? ROOM.leftWall - tableBounds.minX : -1.2;
  const snapZ = tableBounds ? ROOM.backWall - tableBounds.minZ : -0.7;

  useEffect(() => {
    if (tableBounds) {
      setZonePosition('developerZone', { x: snapX, y: 0, z: snapZ });
    }
  }, [snapX, snapZ, tableBounds, setZonePosition]);

  return (
    <group position={[snapX, 0, snapZ]} rotation={[0, table.rotY, 0]}>
      
      <AutoPlace id="developerTable" targetWidth={table.targetWidth} surfaceY={0}>
        <GamingTableModel />
      </AutoPlace>

      <group position={[pc.x, tableHeight + pc.yOffset, pc.z]} rotation={[0, pc.rotY, 0]}>
        <AutoPlace targetWidth={pc.targetWidth} surfaceY={0}>
          <ProgrammerDesktopModel />
        </AutoPlace>
      </group>

      <group position={[lamp.x, tableHeight, lamp.z]} rotation={[0, lamp.rotY, 0]}>
        <AutoPlace targetWidth={lamp.targetWidth} surfaceY={0}>
          <DeskLampModel />
        </AutoPlace>
      </group>
    </group>
  );
}
