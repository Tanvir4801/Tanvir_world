"use client";

import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";

export function WorldHUD() {
  const scrollProgress = useAppStore(s => s.scrollProgress);
  const sceneLabel = useAppStore(s => s.sceneLabel);
  const setCameraView = useAppStore(s => s.setCameraView);
  const cameraView = useAppStore(s => s.cameraView);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isZoomed = cameraView !== "hero";
  const showScrollHint = !isZoomed;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-5 sm:p-8">

      {/* ── Top Bar ──────────────────────────────────────────────── */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="flex flex-col">
          <span className="text-white font-semibold tracking-widest text-sm">TANVIR</span>
          <span className="text-white/50 text-[10px] tracking-[0.2em] mt-1">ENGINEERING WORLD</span>
        </div>

        <nav className="hidden gap-8 text-xs tracking-widest text-white/70 sm:flex">
          {!isZoomed && (
            <>
              {/* WORK → cinematic zoom to monitor */}
              <button
                onClick={() => setCameraView("work")}
                className="hover:text-brand transition-colors"
              >
                WORK
              </button>
              {/* ABOUT → wide-angle certificate wall shot */}
              <button
                onClick={() => setCameraView("about")}
                className="hover:text-brand transition-colors"
              >
                ABOUT
              </button>
              {/* CONTACT → personal zone focus */}
              <button
                onClick={() => setCameraView("contact")}
                className="hover:text-brand transition-colors"
              >
                CONTACT
              </button>
            </>
          )}
          {/* ROOM → always snaps back to hero */}
          {isZoomed && (
            <button
              onClick={() => setCameraView("hero")}
              className="text-white hover:text-white transition-colors font-medium"
            >
              ↩ ROOM
            </button>
          )}
        </nav>
      </div>

      {/* ── Bottom Bar ───────────────────────────────────────────── */}
      <div className="flex justify-between items-end pointer-events-auto relative">

        {/* Scroll hint */}
        {showScrollHint && (
          <div className="flex flex-col items-center gap-2 opacity-70">
            <span className="text-white/50 text-[10px] tracking-widest">SCROLL TO EXPLORE</span>
            <span className="text-brand animate-pulse text-xs">↓</span>
          </div>
        )}

        {/* Center label */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center gap-3">
          <span className="text-white/70 text-[10px] tracking-[0.3em]">{sceneLabel}</span>
          <div className="w-32 h-[1px] bg-white/20 relative">
            <div
              className="absolute left-0 top-0 h-full bg-brand transition-all duration-100"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
          <span className="text-white/50 text-[10px] tracking-widest">WORLD ONLINE</span>
        </div>
      </div>
    </div>
  );
}
