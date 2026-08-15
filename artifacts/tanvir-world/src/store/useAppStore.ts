import { create } from "zustand";

interface BoxBounds {
  minX: number; maxX: number;
  minY: number; maxY: number;
  minZ: number; maxZ: number;
  width: number; height: number; depth: number;
}

// Stores the active camera view name so components can react
export type CameraView = "hero" | "work" | "iphone" | "macbook" | "about" | "contact";

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

  zonePositions: Record<string, { x: number; y: number; z: number }>;
  setZonePosition: (id: string, pos: { x: number; y: number; z: number }) => void;

  // Active camera target — replaces the WorkspaceDesktop system
  cameraView: CameraView;
  setCameraView: (view: CameraView) => void;

  // Legacy — kept for backward-compat in case any import still references it
  desktopApp: string | null;
  setDesktopApp: (app: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (p) =>
    set({ scrollProgress: Math.min(1, Math.max(0, p)) }),

  sceneLabel: "ROOM",
  setSceneLabel: (label) => set({ sceneLabel: label }),

  isLoaded: false,
  setIsLoaded: (v) => set({ isLoaded: v }),

  tableHeights: {},
  setTableHeight: (id, height) =>
    set((s) => ({ tableHeights: { ...s.tableHeights, [id]: height } })),

  tableBounds: {},
  setTableBounds: (id, bounds) =>
    set((s) => ({ tableBounds: { ...s.tableBounds, [id]: bounds } })),

  zonePositions: {},
  setZonePosition: (id, pos) =>
    set((s) => ({ zonePositions: { ...s.zonePositions, [id]: pos } })),

  cameraView: "hero",
  setCameraView: (view) => set({ cameraView: view }),

  // Legacy shim
  desktopApp: null,
  setDesktopApp: (app) => set({ desktopApp: app }),
}));
