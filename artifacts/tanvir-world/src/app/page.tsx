import { WorldScene } from "@/components/world/WorldScene";
import { WorldHUD } from "@/components/hud/WorldHUD";
import { IntroOverlay } from "@/components/hud/IntroOverlay";
import { ScrollArea } from "@/components/camera/ScrollArea";
import { WorkspaceDesktop } from "@/components/desktop/WorkspaceDesktop";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      {/* 3D Canvas Background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <WorldScene />
      </div>

      {/* HTML Overlays */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <WorldHUD />
        <IntroOverlay />
      </div>
      <WorkspaceDesktop />

      {/* Invisible Scroll Area to drive the camera */}
      <ScrollArea />
    </main>
  );
}
