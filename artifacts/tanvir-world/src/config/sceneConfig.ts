// Scene-wide coordinate constants.
// The room geometry is built in RoomGeometry.tsx.
// Floor is at Y = 0.
// Left wall inner face is at X ≈ -3.0
// Back wall inner face is at Z ≈ -2.5

export const ROOM = {
  floor: 0,
  leftWall: -3.0,
  backWall: -2.5,
  rightWall: 3.0,
  frontWall: 2.5,
};

// These values are INITIAL DEFAULTS.
// All final positions are computed from bounding boxes at runtime inside each Zone component.
export const sceneConfig = {
  developerTable: {
    targetWidth: 2.2,   // world metres
    rotation: [0, 0, 0] as [number, number, number],
  },
  mainTable: {
    targetWidth: 1.3,   // ~60% of L-desk — scaled for MacBook/iPhone to look right
    rotation: [0, 0, 0] as [number, number, number],
  },
  desktopPc: {
    targetWidth: 1.1,   // wide enough to see monitor clearly
  },
  lamp: {
    targetWidth: 0.25,
  },
  macbook: {
    targetWidth: 0.35,  // ~15-inch laptop realistic width
  },
  phoneStand: {
    targetWidth: 0.11,
  },
  iphone: {
    targetWidth: 0.08,
  },
  bonsai: {
    targetWidth: 0.14,
  },

  // Project data for the WORK panel (cinematic zoom target)
  projects: [
    {
      name: "Trackify",
      tech: "React Native · Firebase · GPS",
      description: "Real-time location tracking app for deliveries and field teams.",
    },
    {
      name: "ParkNow",
      tech: "Flutter · Node.js · Stripe",
      description: "Smart parking finder and payment platform for urban drivers.",
    },
    {
      name: "GaamRide",
      tech: "React · Express · Maps API",
      description: "Ride-sharing platform built for the gaming event circuit.",
    },
    {
      name: "AI-Powered DevOps Dashboard",
      tech: "Python · Grafana · OpenAI",
      description: "Monitoring dashboard with AI anomaly detection and incident triage.",
    },
  ],
};
