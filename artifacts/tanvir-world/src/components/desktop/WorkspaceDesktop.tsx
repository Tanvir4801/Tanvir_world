"use client";

import { motion } from "framer-motion";
import { Code2, FolderKanban, Globe2, TerminalSquare, X, ArrowUpRight, Wifi } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

type AppId = "finder" | "safari" | "vscode" | "terminal";

const apps: { id: AppId; label: string; icon: typeof Code2; tint: string }[] = [
  { id: "finder", label: "Finder", icon: FolderKanban, tint: "#82d6c6" },
  { id: "safari", label: "Safari", icon: Globe2, tint: "#9dc8ef" },
  { id: "vscode", label: "VS Code", icon: Code2, tint: "#65a9ff" },
  { id: "terminal", label: "Terminal", icon: TerminalSquare, tint: "#e3b577" },
];

function WindowContent({ app }: { app: AppId }) {
  if (app === "finder") return <div className="grid gap-3 sm:grid-cols-2">
    {[["atlas-web", "Product surface · TypeScript"], ["quiet-hours", "Mobile system · React Native"], ["edge-notes", "Infrastructure · Go / AWS"], ["world-room", "Interactive scene · Three.js"]].map(([name, detail]) => (
      <button key={name} className="group rounded-xl border border-white/10 bg-white/[.035] p-4 text-left transition hover:border-[#82d6c6]/50 hover:bg-white/[.07]">
        <div className="mb-7 flex items-center justify-between"><FolderKanban size={17} color="#82d6c6" /><ArrowUpRight size={14} className="opacity-30 transition group-hover:opacity-100" /></div>
        <div className="text-sm font-semibold text-white/90">{name}</div><div className="mt-1 text-[11px] text-white/40">{detail}</div>
      </button>
    ))}
  </div>;
  if (app === "safari") return <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0b1014]">
    <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3"><div className="flex-1 rounded-md bg-white/[.06] px-3 py-1.5 text-[11px] text-white/45">tanvir.dev / selected-work</div><Wifi size={14} className="text-[#9dc8ef]" /></div>
    <div className="grid min-h-[260px] place-items-center p-8 text-center"><div><div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-[#9dc8ef]/10 text-[#9dc8ef]"><Globe2 /></div><h3 className="text-lg font-semibold">Live demos are docked for launch</h3><p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-white/45">The browser surface is ready. Selected projects will open here as their public builds go live.</p><button className="mt-5 rounded-full border border-[#9dc8ef]/30 px-4 py-2 text-[11px] text-[#9dc8ef] transition hover:bg-[#9dc8ef]/10">View project index</button></div></div>
  </div>;
  if (app === "vscode") return <div className="overflow-hidden rounded-xl border border-white/10 bg-[#091016]"><div className="flex border-b border-white/10 px-4 py-2 text-[10px] text-white/35">architecture.ts <span className="ml-auto text-[#65a9ff]">● synced</span></div><pre className="overflow-auto p-5 text-[11px] leading-6 text-white/65"><code><span className="text-[#65a9ff]">export const</span> workspace = {"{"}{"\n"}  intent: <span className="text-[#e3b577]">"make complex things feel quiet"</span>,{"\n"}  stack: [<span className="text-[#82d6c6]">"react"</span>, <span className="text-[#82d6c6]">"three"</span>, <span className="text-[#82d6c6]">"cloud"</span>],{"\n"}  principles: [<span className="text-[#e3b577]">"measure twice"</span>, <span className="text-[#e3b577]">"ship clearly"</span>],{"\n"}{"}"};</code></pre></div>;
  return <div className="rounded-xl border border-white/10 bg-[#0a0d0d] p-5 font-mono text-[11px] leading-6 text-white/55"><div><span className="text-[#82d6c6]">tanvir@workspace</span>:<span className="text-[#e3b577]">~</span>$ ./status</div><div className="mt-3 text-[#82d6c6]">systems nominal</div><div>deploy pipeline ........ ready</div><div>observability .......... active</div><div>last release ........... 2025.02.14</div><div className="mt-3"><span className="text-[#82d6c6]">tanvir@workspace</span>:<span className="text-[#e3b577]">~</span>$ <span className="animate-pulse">_</span></div></div>;
}

export function WorkspaceDesktop() {
  const progress = useAppStore((state) => state.scrollProgress);
  const setDesktopApp = useAppStore((state) => state.setDesktopApp);
  const active = useAppStore((state) => state.desktopApp) as AppId | null;
  const clock = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const entered = progress > 0.68;
  const exit = () => { setDesktopApp(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  if (!entered) return null;
  return <motion.section className="fixed inset-0 z-40 flex items-center justify-center bg-[#05090b]/90 p-3 backdrop-blur-2xl sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} aria-label="Tanvir workspace desktop">
    <div className="desktop-in relative flex h-[min(850px,calc(100dvh-24px))] w-full max-w-[1240px] flex-col overflow-hidden rounded-[22px] border border-white/15 bg-[#11191d] shadow-2xl shadow-black/60">
      <div className="flex h-11 shrink-0 items-center gap-3 border-b border-white/10 bg-[#192327] px-4 text-[11px] text-white/50"><div className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#e57d70]" /><i className="h-2.5 w-2.5 rounded-full bg-[#e1b66c]" /><i className="h-2.5 w-2.5 rounded-full bg-[#76c6ad]" /></div><span className="ml-2 font-medium text-white/70">Tanvir’s Workspace</span><span className="ml-auto mono hidden text-[10px] sm:block">PRIVATE / LOCAL SESSION</span></div>
      <div className="relative flex flex-1 overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(79,132,137,.16),transparent_35%),linear-gradient(135deg,#142126,#0d1417_58%,#10191c)]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(180,220,220,.08) 1px, transparent 1px),linear-gradient(90deg,rgba(180,220,220,.08) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <aside className="relative z-10 flex w-[82px] shrink-0 flex-col items-center border-r border-white/10 bg-[#10191d]/70 py-6 sm:w-[210px] sm:items-stretch sm:px-4">
          <div className="mb-8 px-2 text-[10px] tracking-[.24em] text-white/30">APPS</div>
          <div className="space-y-2">{apps.map(({ id, label, icon: Icon, tint }) => <button key={id} onClick={() => setDesktopApp(id)} className={`flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left transition sm:px-3 ${active === id ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/[.06] hover:text-white/80"}`}><Icon size={18} color={tint} /><span className="hidden text-xs font-semibold sm:block">{label}</span></button>)}</div>
          <button onClick={exit} className="mt-auto flex items-center gap-3 rounded-xl px-2 py-3 text-left text-white/40 transition hover:bg-white/[.06] hover:text-white sm:px-3"><X size={17} /><span className="hidden text-xs sm:block">Return to room</span></button>
        </aside>
        <main className="relative z-10 flex-1 overflow-auto p-5 sm:p-10">{active ? <div className="mx-auto max-w-3xl"><div className="mb-7 flex items-end justify-between"><div><div className="mono mb-2 text-[10px] tracking-[.2em] text-[#82d6c6]">APPLICATION / {active.toUpperCase()}</div><h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">{apps.find((a) => a.id === active)?.label}</h1></div><button onClick={() => setDesktopApp(null)} className="text-white/30 hover:text-white"><X size={18} /></button></div><WindowContent app={active} /></div> : <div className="flex h-full flex-col justify-between"><div className="pt-10 sm:pt-16"><div className="mono mb-5 text-[10px] tracking-[.28em] text-[#82d6c6]">WORKSPACE / 02</div><h1 className="max-w-2xl text-4xl font-bold leading-[1.02] tracking-[-.04em] text-white sm:text-7xl">A quiet place<br /><span className="text-white/35">to build loud ideas.</span></h1><p className="mt-7 max-w-md text-sm leading-6 text-white/50">Welcome inside the working surface. Choose an application to inspect the systems, products, and habits behind the work.</p></div><div className="flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-5 text-[10px] text-white/35"><span>DESIGNED + BUILT BY TANVIR</span><span className="mono">{clock} · LOCAL</span></div></div>}</main>
      </div>
    </div>
  </motion.section>;
}