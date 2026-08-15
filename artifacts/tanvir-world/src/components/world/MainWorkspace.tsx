"use client";

import { useControls } from "leva";
import { Model as CyberpunkTableModel } from "../models/CyberpunkTableModel";
import { MacBook } from "./MacBook";
import { PhoneStand } from "./PhoneStand";
import { AutoPlace } from "./AutoPlace";
import { useAppStore } from "@/store/useAppStore";
import { Model as FicusBonsaiModel } from "../models/FicusBonsaiModel";

export function MainWorkspace() {
  const tableHeight = useAppStore(state => state.tableHeights['mainTable'] || 0.74);
  const setTableHeight = useAppStore(state => state.setTableHeight);
  const devTableBounds = useAppStore(state => state.tableBounds['developerTable']);
  const devZonePos = useAppStore(state => state.zonePositions['developerZone']);

  // Group: TABLES
  const table = useControls("TABLES.Personal Table", {
    gapX: { value: 1.2, step: 0.1, label: "Gap to Dev Table" }, // 1-1.5 table width walking gap
    z: { value: 0.80, step: 0.01 }, // Pull forward slightly relative to L-desk
    rotY: { value: 0, step: 0.01 },
    targetWidth: { value: 1.5, step: 0.01 }, // ~68% of 2.2 Developer Table width
  });

  // Calculate the absolute WORLD X of the Developer Table's right edge
  const devMaxWorldX = (devZonePos && devTableBounds) 
    ? devZonePos.x + devTableBounds.maxX 
    : 0.45;

  const dynamicX = devMaxWorldX + table.gapX;

  // Group: PERSONAL
  const bonsai = useControls("PERSONAL.Bonsai", {
    x: { value: 0.45, step: 0.01 },
    z: { value: -0.25, step: 0.01 },
    rotY: { value: 0, step: 0.01 },
    targetWidth: { value: 0.15, step: 0.01 },
  });

  return (
    <group position={[dynamicX, 0, table.z]} rotation={[0, table.rotY, 0]}>
      
      <AutoPlace id="mainTable" targetWidth={table.targetWidth} surfaceY={0} onHeightCalculated={(h) => setTableHeight('mainTable', h)}>
        <CyberpunkTableModel />
      </AutoPlace>

      {/* Child items placed locally on the tabletop */}
      <MacBook tableHeight={tableHeight} />
      <PhoneStand tableHeight={tableHeight} />
      
      <group position={[bonsai.x, tableHeight, bonsai.z]} rotation={[0, bonsai.rotY, 0]}>
        <AutoPlace targetWidth={bonsai.targetWidth} surfaceY={0}>
          <FicusBonsaiModel />
        </AutoPlace>
      </group>
    </group>
  );
}
