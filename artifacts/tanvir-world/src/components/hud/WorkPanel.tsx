"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore, CameraView } from "@/store/useAppStore";
import { sceneConfig } from "@/config/sceneConfig";
import { ArrowUpRight, X } from "lucide-react";

export function WorkPanel() {
  const cameraView = useAppStore(s => s.cameraView);
  const setCameraView = useAppStore(s => s.setCameraView);
  const visible = cameraView === "work";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed right-0 top-0 bottom-0 z-30 flex flex-col justify-center pr-8 pl-4 pointer-events-auto"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-[320px] bg-[#0e1316]/90 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <div>
                <span className="text-[10px] tracking-[0.25em] text-brand block mb-1">SELECTED WORK</span>
                <h2 className="text-white font-semibold text-lg">Projects</h2>
              </div>
              <button
                onClick={() => setCameraView("hero")}
                className="text-white/40 hover:text-white transition-colors rounded-lg p-1.5 hover:bg-white/10"
                aria-label="Return to room"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {sceneConfig.projects.map((proj) => (
                <div
                  key={proj.name}
                  className="group rounded-xl border border-white/8 bg-white/[.03] hover:border-brand/30 hover:bg-white/[.06] p-4 transition-all cursor-default"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-white font-medium text-sm leading-tight">{proj.name}</span>
                    <ArrowUpRight size={14} className="text-white/20 group-hover:text-brand transition-colors shrink-0 mt-0.5" />
                  </div>
                  <p className="text-white/45 text-[11px] leading-[1.55] mb-2">{proj.description}</p>
                  <span className="text-brand/70 text-[10px] tracking-wide">{proj.tech}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCameraView("hero")}
              className="mt-5 w-full flex items-center justify-center gap-2 text-[11px] text-white/40 hover:text-white tracking-widest border border-white/10 rounded-xl py-2.5 transition-colors hover:border-white/25"
            >
              ← RETURN TO ROOM
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
