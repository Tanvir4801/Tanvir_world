export const ROOM = {
  floor: 0,
  leftWall: -3.0,
  backWall: -2.5,
  rightWall: 3.0,
  frontWall: 2.5,
};

export const sceneConfig = {
  // ==========================================
  // TABLES
  // ==========================================
  developerTable: {
    position: [-1.20, ROOM.floor, -0.70],
    rotation: [0, 0, 0],
    targetWidth: 2.2,
  },
  mainTable: {
    position: [0.45, ROOM.floor, 0.60], 
    rotation: [0, 0, 0],
    targetWidth: 1.4, 
  },

  // ==========================================
  // DEVELOPER ZONE (Parent: developerTable)
  // ==========================================
  desktopPc: {
    position: [-0.45, 0.00, 0.15], 
    rotation: [0, 0, 0],
    targetWidth: 0.90,
  },
  lamp: {
    position: [0.55, 0, 0.15],
    rotation: [0, -0.20, 0],
    targetWidth: 0.2,
  },

  // ==========================================
  // MAIN WORKSPACE (Parent: mainTable)
  // ==========================================
  macbook: {
    position: [0.00, 0, -0.05], 
    rotation: [0, 0, 0], 
    targetWidth: 0.38,
  },
  phoneStand: {
    position: [0.35, 0, 0.20], 
    rotation: [0, 0, 0], // I'll keep default rotation 0 unless specified
    targetWidth: 0.12,
  },
  iphone: {
    // Parent: phoneStand
    position: [0, 0.05, 0.02], 
    rotation: [-0.15, 0, 0],
    targetWidth: 0.08,
  },
  bonsai: {
    position: [0.45, 0, -0.25], 
    rotation: [0, 0, 0],
    targetWidth: 0.15, 
  },
};
