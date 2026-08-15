# Technical Architecture

This document outlines the stack used to *build the portfolio itself*.

## Frontend Core
- **Framework**: Next.js (React)
- **Styling**: Vanilla CSS (or Tailwind CSS if explicitly requested by user)
- **3D Rendering**: Three.js wrapped in React Three Fiber (R3F)
- **3D Helpers**: `@react-three/drei` for camera controls, environment lighting, and HTML overlays.
- **Animations**: GSAP or Framer Motion for complex 2D UI animations and transitions.

## Data Structure
- Project data, bio, and content should be abstracted into JSON or Markdown files (or a simple CMS) so the UI components can map over them easily.

## Performance Strategy (Enforced by QA Agent)
- **3D Assets**: Compress models using DRACO compression (`.glb`/`.gltf`).
- **Textures**: Optimize texture resolution. Bake lighting into textures where possible instead of using real-time dynamic lights.
- **Lazy Loading**: Ensure the 3D canvas does not block the initial page load. Show a stylized loading screen.
- **Fallback**: Provide a purely 2D fallback for devices that fail to initialize WebGL or have severe performance issues.
