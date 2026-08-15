import { WorldScene } from "@/components/world/WorldScene";
import { WorldHUD } from "@/components/hud/WorldHUD";
import { IntroOverlay } from "@/components/hud/IntroOverlay";
import { WorkPanel } from "@/components/hud/WorkPanel";
import { IPhonePanel } from "@/components/hud/IPhonePanel";
import { ScrollArea } from "@/components/camera/ScrollArea";

// NOTE: WorkspaceDesktop has been REMOVED — its Finder/Safari/VSCode overlay
// concept has been replaced with cinematic camera zooms via cameraView store.

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      {/* 3D Canvas Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <WorldScene />
      </div>

      {/* HTML Overlays */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <WorldHUD />
        <IntroOverlay />
      </div>

      {/* Content Panels — shown when camera zooms to that target */}
      <WorkPanel />
      <IPhonePanel />

      {/* Invisible Scroll Area to drive the camera */}
      <ScrollArea />
    </main>
  );
}
