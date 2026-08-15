"use client";

import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroOverlay() {
  const scrollProgress = useAppStore((state) => state.scrollProgress);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const cameraView = useAppStore((state) => state.cameraView);
  const visible = scrollProgress < 0.12 && cameraView === "hero";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          className="absolute inset-0 z-10 flex flex-col items-center pointer-events-none pt-[15vh]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div 
            className="flex flex-col items-center text-center"
            style={{ opacity: Math.max(0, 1 - (scrollProgress / 0.12) * 1.5) }}
          >
            <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] text-white mb-4">
              TANVIR'S WORLD
            </h1>
            <p className="text-brand tracking-widest text-sm md:text-base mb-6">
              FULL-STACK DEVELOPER
            </p>
            <p className="text-white/60 tracking-wider text-xs md:text-sm max-w-md">
              A private workspace for web, mobile, and cloud systems
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
