"use client";

import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";

export function WorldHUD() {
  const scrollProgress = useAppStore((state) => state.scrollProgress);
  const sceneLabel = useAppStore((state) => state.sceneLabel);
  
  const showScrollHint = scrollProgress < 0.85;
  const isOnline = scrollProgress > 0.05;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-8">
      
      {/* Top Bar */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="flex flex-col">
          <span className="text-white font-semibold tracking-widest text-sm">TANVIR</span>
          <span className="text-white/50 text-xs tracking-[0.2em] mt-1">ENGINEERING WORLD</span>
        </div>

        <nav className="flex gap-8 text-xs tracking-widest text-white/70">
          <button className="hover:text-brand transition-colors">WORK</button>
          <button className="hover:text-brand transition-colors">ABOUT</button>
          <button className="hover:text-brand transition-colors">CONTACT</button>
        </nav>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end pointer-events-auto relative">
        
        {/* Scroll Hint */}
        <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${showScrollHint ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-white/50 text-[10px] tracking-widest">SCROLL TO ENTER</span>
          <span className="text-brand animate-bounce">↓</span>
        </div>

        {/* Scene Indicator (Center) */}
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
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-brand' : 'bg-white/20'}`} />
          <span className="text-white/50 text-[10px] tracking-widest">
            {isOnline ? 'WORLD ONLINE' : 'STANDBY'}
          </span>
        </div>

      </div>
    </div>
  );
}
