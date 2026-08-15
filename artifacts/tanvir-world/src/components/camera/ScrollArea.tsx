"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useAppStore } from "@/store/useAppStore";

export function ScrollArea() {
  const setScrollProgress = useAppStore((state) => state.setScrollProgress);
  const setSceneLabel = useAppStore((state) => state.setSceneLabel);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on("scroll", (e: any) => {
      // scroll progress from 0 to 1
      const progress = e.scroll / e.limit;
      if (!isNaN(progress)) {
        setScrollProgress(progress);
        setSceneLabel(progress > 0.68 ? "DESKTOP" : progress > 0.18 ? "MACBOOK ZONE" : "ROOM");
      }
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [setScrollProgress, setSceneLabel]);

  return (
    // This invisible div defines the total scroll height
    <div
      style={{ height: "520vh", width: "100%", pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
