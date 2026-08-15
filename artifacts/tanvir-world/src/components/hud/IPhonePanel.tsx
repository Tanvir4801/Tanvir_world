"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { X } from "lucide-react";

export function IPhonePanel() {
  const cameraView = useAppStore(s => s.cameraView);
  const setCameraView = useAppStore(s => s.setCameraView);
  const visible = cameraView === "iphone";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-30 flex items-center justify-center pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* iOS-simulator-style frame */}
          <motion.div
            className="relative"
            initial={{ scale: 0.88, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.88, y: 30 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Device shell */}
            <div className="relative w-[280px] h-[560px] bg-[#1a1a1c] rounded-[44px] border-[6px] border-[#2a2a2c] shadow-[0_40px_80px_rgba(0,0,0,0.7)] overflow-hidden">
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 pt-3 pb-1 bg-[#1a1a1c]">
                <span className="text-white text-[11px] font-semibold">9:41</span>
                <div className="w-20 h-4 bg-[#1a1a1c] rounded-full border border-white/10" /> {/* Dynamic Island */}
                <div className="flex gap-1 items-center">
                  <div className="w-3 h-2 border border-white/50 rounded-sm"><div className="w-full h-full bg-white/50 rounded-[1px]" /></div>
                </div>
              </div>

              {/* Scrollable content area */}
              <div className="flex-1 h-[calc(100%-80px)] overflow-auto bg-[#f2f2f7]">
                {/* Placeholder screenshot slot */}
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#ddd] mb-4 flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <p className="text-[#3c3c43] font-semibold text-sm mb-2">Project screenshot</p>
                  <p className="text-[#8e8e93] text-xs leading-relaxed">
                    Coming soon — drop a real Flutter app screenshot here to replace this placeholder.
                  </p>
                </div>
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
            </div>

            {/* Return button */}
            <button
              onClick={() => setCameraView("hero")}
              className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[11px] text-white/60 hover:text-white tracking-widest border border-white/15 rounded-xl px-4 py-2 transition-colors hover:border-white/30 backdrop-blur-sm bg-black/20"
            >
              ← RETURN TO ROOM
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
