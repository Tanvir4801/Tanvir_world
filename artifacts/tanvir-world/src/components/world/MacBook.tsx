"use client";

import { Html } from "@react-three/drei";
import { Model as MacBookModel } from "../models/MacBookModel";
import { AutoPlace } from "./AutoPlace";
import { useAppStore } from "@/store/useAppStore";
import { sceneConfig } from "@/config/sceneConfig";
import { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── MacBook Screen Content ──────────────────────────────────────────────────
// A macOS Safari-style HTML overlay pinned to the screen in 3D space
function MacScreenContent() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "Portfolio — Tanvir", favicon: "🌐" },
    { title: "GitHub — Tanvir4801", favicon: "🐙" },
    { title: "Trackify App", favicon: "📍" },
  ];

  const addressMap = [
    "tanvir.dev/work",
    "github.com/Tanvir4801",
    "trackify.app/dashboard",
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#1c1c1e",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
      {/* ── macOS Traffic Lights + Title Bar ────────────────────── */}
      <div style={{ background: "#2d2d2f", padding: "10px 14px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
          <span style={{ marginLeft: "auto", color: "#888", fontSize: 11 }}>Safari</span>
        </div>

        {/* Tab Bar */}
        <div style={{ display: "flex", gap: "2px" }}>
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                padding: "6px 14px",
                background: activeTab === i ? "#1c1c1e" : "transparent",
                border: "none",
                borderRadius: "6px 6px 0 0",
                color: activeTab === i ? "#fff" : "#888",
                fontSize: 11,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                flexShrink: 0,
                maxWidth: 130,
                overflow: "hidden",
              }}
            >
              <span>{tab.favicon}</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {tab.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Address Bar ─────────────────────────────────────────── */}
      <div style={{ background: "#2d2d2f", padding: "8px 14px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 6 }}>
          <button style={{ background: "none", border: "none", color: "#888", fontSize: 14, cursor: "pointer" }}>‹</button>
          <button style={{ background: "none", border: "none", color: "#888", fontSize: 14, cursor: "pointer" }}>›</button>
        </div>
        <div style={{
          flex: 1,
          background: "#3a3a3c",
          borderRadius: 7,
          padding: "5px 10px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
          <span style={{ color: "#4caf50", fontSize: 11 }}>🔒</span>
          <span style={{ color: "#ccc", fontSize: 12 }}>{addressMap[activeTab]}</span>
        </div>
      </div>

      {/* ── Page Content ────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: "hidden", background: "#fff" }}>
        {activeTab === 0 && <PortfolioPage />}
        {activeTab === 1 && <GitHubPage />}
        {activeTab === 2 && <TrackifyPage />}
      </div>
    </div>
  );
}

// ── TAB CONTENTS ─────────────────────────────────────────────────────────────

function PortfolioPage() {
  return (
    <div style={{ height: "100%", background: "#0a0a0f", color: "#fff", padding: "28px 32px", overflow: "auto" }}>
      {/* Hero */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "#4DD0E1", letterSpacing: "0.2em", marginBottom: 8 }}>FULL-STACK DEVELOPER</div>
        <h1 style={{ fontSize: 28, fontWeight: 300, letterSpacing: "0.1em", margin: 0, lineHeight: 1.2 }}>
          TANVIR'S<br />WORLD
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 10, lineHeight: 1.7 }}>
          Building Web, Mobile & Cloud Systems
        </p>
      </div>

      {/* Projects Grid */}
      <div style={{ fontSize: 10, color: "#4DD0E1", letterSpacing: "0.2em", marginBottom: 12 }}>SELECTED WORK</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { name: "Trackify", tech: "React Native · GPS", color: "#4DD0E1" },
          { name: "ParkNow", tech: "Flutter · Stripe", color: "#A78BFA" },
          { name: "GaamRide", tech: "React · Maps", color: "#34D399" },
          { name: "AI DevOps", tech: "Python · OpenAI", color: "#F59E0B" },
        ].map(p => (
          <div key={p.name} style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: "12px 14px",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, marginBottom: 8 }} />
            <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{p.name}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>{p.tech}</div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 10, color: "#4DD0E1", letterSpacing: "0.2em", marginBottom: 10 }}>TECH STACK</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["React", "Next.js", "Flutter", "Node.js", "Firebase", "AWS", "Python", "TypeScript"].map(s => (
            <span key={s} style={{
              background: "rgba(77,208,225,0.1)",
              border: "1px solid rgba(77,208,225,0.2)",
              color: "#4DD0E1",
              fontSize: 10,
              padding: "3px 8px",
              borderRadius: 4,
            }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function GitHubPage() {
  const repos = [
    { name: "tanvir-world", desc: "3D interactive portfolio built with Three.js", lang: "TypeScript", stars: 12 },
    { name: "trackify-app", desc: "Real-time location tracking for delivery teams", lang: "Dart", stars: 8 },
    { name: "parknow", desc: "Smart parking finder + payment platform", lang: "TypeScript", stars: 5 },
    { name: "ai-devops-dashboard", desc: "AI-powered monitoring with anomaly detection", lang: "Python", stars: 19 },
    { name: "gaamride", desc: "Ride-sharing for gaming event circuit", lang: "JavaScript", stars: 3 },
  ];

  const langColor: Record<string, string> = {
    TypeScript: "#3178c6",
    Dart: "#0175c2",
    Python: "#3572a5",
    JavaScript: "#f7df1e",
  };

  return (
    <div style={{ height: "100%", background: "#0d1117", color: "#e6edf3", padding: "20px 24px", overflow: "auto" }}>
      {/* Profile header */}
      <div style={{ display: "flex", gap: 14, marginBottom: 20, alignItems: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#21262d", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
          🐙
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Tanvir4801</div>
          <div style={{ color: "#8b949e", fontSize: 11, marginTop: 2 }}>Full-Stack Developer · Open to work</div>
          <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
            <span style={{ color: "#8b949e", fontSize: 10 }}>⭐ {repos.reduce((a, r) => a + r.stars, 0)} total stars</span>
            <span style={{ color: "#8b949e", fontSize: 10 }}>📦 {repos.length} repos</span>
          </div>
        </div>
      </div>

      {/* Repos */}
      <div style={{ fontSize: 11, color: "#8b949e", marginBottom: 10 }}>PINNED REPOSITORIES</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {repos.map(r => (
          <div key={r.name} style={{
            background: "#161b22",
            border: "1px solid #30363d",
            borderRadius: 8,
            padding: "12px 14px",
          }}>
            <div style={{ color: "#58a6ff", fontWeight: 600, fontSize: 12, marginBottom: 4 }}>{r.name}</div>
            <div style={{ color: "#8b949e", fontSize: 10, lineHeight: 1.5 }}>{r.desc}</div>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#8b949e" }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: langColor[r.lang] || "#ccc", display: "inline-block" }} />
                {r.lang}
              </span>
              <span style={{ fontSize: 10, color: "#8b949e" }}>⭐ {r.stars}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrackifyPage() {
  return (
    <div style={{ height: "100%", background: "#0f1923", color: "#fff", display: "flex", flexDirection: "column", overflow: "auto" }}>
      {/* App header */}
      <div style={{ background: "#1a2840", padding: "16px 20px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "#4DD0E1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📍</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Trackify</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Live Dashboard · 3 active drivers</div>
        </div>
        <div style={{ marginLeft: "auto", background: "#4DD0E1", color: "#000", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 12 }}>● LIVE</div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: "16px 20px" }}>
        {[
          { label: "Active Deliveries", value: "12", icon: "🚗" },
          { label: "Avg ETA", value: "8 min", icon: "⏱️" },
          { label: "Completed Today", value: "47", icon: "✅" },
        ].map(s => (
          <div key={s.label} style={{ background: "#1a2840", borderRadius: 10, padding: "12px", textAlign: "center" }}>
            <div style={{ fontSize: 18 }}>{s.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#4DD0E1", marginTop: 4 }}>{s.value}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Map placeholder */}
      <div style={{
        margin: "0 20px",
        flex: 1,
        background: "#1a2840",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 6,
        border: "1px solid rgba(77,208,225,0.2)",
        minHeight: 100,
        padding: 20,
      }}>
        <div style={{ fontSize: 28 }}>🗺️</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Live Map View</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>
          3 drivers currently tracked<br />Real-time GPS updates every 5s
        </div>
        {/* fake driver pings */}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {["Driver A", "Driver B", "Driver C"].map(d => (
            <span key={d} style={{
              background: "rgba(77,208,225,0.15)",
              border: "1px solid rgba(77,208,225,0.3)",
              color: "#4DD0E1",
              fontSize: 9,
              padding: "3px 8px",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4DD0E1" }} />
              {d}
            </span>
          ))}
        </div>
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
}

// ─── Main MacBook Component ───────────────────────────────────────────────────
export function MacBook({ tableHeight }: { tableHeight: number }) {
  const setCameraView = useAppStore(state => state.setCameraView);
  const cameraView = useAppStore(state => state.cameraView);
  const isZoomedIn = cameraView === "macbook";

  // The macBook screen mesh (Object_4 = glass/screen)
  // The screen in the GLB faces +Z when upright. After AutoPlace scales it,
  // the screen sits roughly at local Y = tableHeight + screenHeight, Z ≈ 0.
  // We use Html `transform` to attach a flat plane to 3D space.

  return (
    <group
      position={[0.0, tableHeight, -0.08]}
      onClick={() => setCameraView(cameraView === "macbook" ? "hero" : "macbook")}
    >
      <AutoPlace targetWidth={sceneConfig.macbook.targetWidth} surfaceY={0}>
        <MacBookModel />
      </AutoPlace>

      {/* ── Camera Anchors ──────────────────────────────────────────────
          We place a target precisely on the screen and a camera position
          directly in front of it, matching the lid's tilt (-15 deg).
      ─────────────────────────────────────────────────────────────── */}
      <group
        position={[0, sceneConfig.macbook.targetWidth * 0.52, sceneConfig.macbook.targetWidth * 0.04]}
        rotation={[-0.26, 0, 0]}
      >
        <group name="macbook-camera-target" position={[0, 0, 0]} />
        <group name="macbook-camera-pos" position={[0, 0, 0.42]} />
      </group>

      {/* ── Background Dimmer ──────────────────────────────────────────
          When zoomed in, fade a dark plane behind the MacBook to focus 
          the user entirely on the screen and keyboard.
      ─────────────────────────────────────────────────────────────── */}
      {isZoomedIn && (
        <mesh position={[0, sceneConfig.macbook.targetWidth * 0.5, -0.4]}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.85} />
        </mesh>
      )}

      {/* ── Embedded Screen Content ─────────────────────────────────────
          Rendered as an HTML overlay pinned exactly to where the screen
          face is in 3D space. Only shown when camera is zoomed in so
          it doesn't occlude the 3D scene from the hero angle.
      ─────────────────────────────────────────────────────────────── */}
      {isZoomedIn && (
        <group
          // Position the HTML plane to sit on the screen face of the MacBook.
          // The MacBook lid screen face is approximately:
          //   - Y above table: ~ 60% of macbook height from bottom
          //   - Tilted back ~15° (open lid angle in the model)
          //   - Facing roughly +Z
          position={[0, sceneConfig.macbook.targetWidth * 0.52, sceneConfig.macbook.targetWidth * 0.04]}
          rotation={[-0.26, 0, 0]}   // match the lid's open angle
        >
          <Html
            transform
            distanceFactor={0.38}   // match to targetWidth scale
            style={{
              width: "580px",
              height: "370px",
              pointerEvents: "auto",
            }}
            zIndexRange={[100, 200]}
          >
            <MacScreenContent />
          </Html>
        </group>
      )}
    </group>
  );
}
