"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useAppStore } from "@/store/useAppStore";

export function ScrollArea() {
  const setScrollProgress = useAppStore((state) => state.setScrollProgress);

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
  }, [setScrollProgress]);

  return (
    // This invisible div defines the total scroll height
    <div
      style={{ height: "400vh", width: "100%", pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
