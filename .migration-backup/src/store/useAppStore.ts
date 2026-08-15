import { create } from "zustand";

interface BoxBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
  width: number;
  height: number;
  depth: number;
}

interface AppState {
  scrollProgress: number;
  setScrollProgress: (p: number) => void;
  sceneLabel: string;
  setSceneLabel: (label: string) => void;
  isLoaded: boolean;
  setIsLoaded: (v: boolean) => void;
  tableHeights: Record<string, number>;
  setTableHeight: (id: string, height: number) => void;
  tableBounds: Record<string, BoxBounds>;
  setTableBounds: (id: string, bounds: BoxBounds) => void;
  zonePositions: Record<string, { x: number, y: number, z: number }>;
  setZonePosition: (id: string, pos: { x: number, y: number, z: number }) => void;
}

export const useAppStore = create<AppState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (p) => set({ scrollProgress: Math.min(1, Math.max(0, p)) }),
  sceneLabel: "ROOM",
  setSceneLabel: (label) => set({ sceneLabel: label }),
  isLoaded: false,
  setIsLoaded: (v) => set({ isLoaded: v }),
  tableHeights: {},
  setTableHeight: (id, height) => set((state) => ({
    tableHeights: { ...state.tableHeights, [id]: height }
  })),
  tableBounds: {},
  setTableBounds: (id, bounds) => set((state) => ({
    tableBounds: { ...state.tableBounds, [id]: bounds }
  })),
  zonePositions: {},
  setZonePosition: (id, pos) => set((state) => ({
    zonePositions: { ...state.zonePositions, [id]: pos }
  })),
}));
