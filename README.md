# Tanvir's World 🌍💻

Welcome to **Tanvir's World** — a premium, interactive 3D developer studio built to showcase personal branding, skills, and projects through an immersive web experience.

## ✨ Features

- **Immersive 3D Environment**: Built with React Three Fiber and Three.js, presenting a high-fidelity 3D developer room.
- **Dynamic Workstations**:
  - **Developer Zone**: A large L-shaped desk featuring a powerful PC setup, multiple monitors, mechanical keyboard, and warm desk lighting.
  - **Personal Technology Zone**: A sleek cyberpunk table featuring a MacBook, iPhone stand, and decorative bonsai, representing mobile and personal tech.
- **Mathematical Layout Engine**: A custom bounding-box layout system (`AutoPlace`) that automatically measures GLB models and logically snaps them into perfect physical hierarchies, preventing floating objects.
- **Cinematic Lighting**: Soft point lights and ambient environmental lighting create a moody, premium dark-studio aesthetic.
- **Real-time Tweaking**: Integrated Leva controls allow for real-time manipulation of room coordinates, lighting, and camera angles.
- **Responsive Architecture**: Fully responsive Next.js foundation optimized for both desktop and mobile viewing.

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **3D Engine**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- **3D Utilities**: [React Three Drei](https://github.com/pmndrs/drei)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Controls/Debugging**: [Leva](https://github.com/pmndrs/leva)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tanvir4801/Tanvir_world.git
   cd Tanvir_world
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the 3D room.

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router entry points
├── components/
│   ├── camera/           # Camera controllers (inspection, cinematic)
│   ├── hud/              # 2D HTML Overlays (Titles, Loading Screens)
│   ├── lighting/         # 3D Environment and Point Lights
│   ├── models/           # GLTF/GLB Model Components (Auto-generated via gltfjsx)
│   └── world/            # Core 3D Composition (Zones, AutoPlace logic)
├── config/               # Global scene configurations and constants
├── store/                # Zustand global state (bounds, heights, scroll progress)
└── ui/                   # Reusable UI components
```

## 📐 Architecture Highlights

### The `AutoPlace` Engine
Instead of manually guessing world coordinates, `AutoPlace` dynamically wraps raw 3D models, temporarily strips their scale, measures their exact physical bounding boxes (`THREE.Box3`), recalculates the scale to match a desired real-world width, and broadcasts the world coordinates to the Zustand store. This guarantees that hardware sits perfectly flush on tabletops regardless of the original model's origin point.

### Strict Parent-Child Grouping
The scene uses a strict nested component hierarchy. If the `DeveloperZone` is moved to snap to a corner, all child equipment (PC, Lamp, Monitors) automatically inherits the translation.

## 📄 License

This project is open-source and available for personal and educational use.

---
*Built by [Tanvir](https://github.com/Tanvir4801)*
