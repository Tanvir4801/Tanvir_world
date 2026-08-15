"use client";

import { Model as IPhoneModel } from "../models/IPhoneModel";
import { AutoPlace } from "./AutoPlace";
import { sceneConfig } from "@/config/sceneConfig";

import { useState } from "react";
import { Html } from "@react-three/drei";
import { useAppStore } from "@/store/useAppStore";

function IPhoneScreenContent() {
  const [activeTab, setActiveTab] = useState(0);

  const projects = [
    { 
      name: "Trackify", 
      tech: "React Native · GPS", 
      color: "#4DD0E1",
      desc: "Real-time location tracking dashboard for delivery teams. Features live map view, ETA calculations, and active driver monitoring with a 5-second polling interval.",
    },
    { 
      name: "ParkNow", 
      tech: "Flutter · Stripe", 
      color: "#A78BFA",
      desc: "Smart parking finder and payment platform. Allows users to locate available parking spots, book them in advance, and pay seamlessly using Stripe integration.",
    },
    { 
      name: "GaamRide", 
      tech: "React · Maps", 
      color: "#34D399",
      desc: "Ride-sharing web application built for local gaming event circuits. Integrates with Google Maps API for route optimization and real-time driver tracking.",
    },
    { 
      name: "AI DevOps", 
      tech: "Python · OpenAI", 
      color: "#F59E0B",
      desc: "AI-powered monitoring dashboard with anomaly detection. Uses OpenAI models to analyze server logs and predict potential outages before they occur.",
    },
  ];

  const activeProject = projects[activeTab];

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    }}>
      
      {/* ── Project Details Panel (Left Side) ─────────────────────────── */}
      <div style={{ 
        width: 320, 
        marginRight: 60,
        display: "flex", flexDirection: "column",
        color: "#fff",
        background: "rgba(20, 20, 20, 0.6)",
        padding: "30px",
        borderRadius: 20,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#888", marginBottom: 20 }}>SELECT PROJECT</div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 30 }}>
          {projects.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActiveTab(i)}
              style={{
                background: activeTab === i ? "rgba(255,255,255,0.1)" : "transparent",
                border: "1px solid",
                borderColor: activeTab === i ? "rgba(255,255,255,0.15)" : "transparent",
                borderRadius: 12,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                textAlign: "left",
                color: activeTab === i ? "#fff" : "rgba(255,255,255,0.6)",
                transition: "all 0.2s"
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color }} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>{p.name}</span>
            </button>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px 0" }}>{activeProject.name}</h2>
          <div style={{ color: activeProject.color, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
            {activeProject.tech}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.5, color: "rgba(255,255,255,0.7)", margin: 0 }}>
            {activeProject.desc}
          </p>
        </div>
      </div>

      {/* ── iOS Simulator Frame (Right Side) ─────────────────────────── */}
      <div style={{
        width: 320,
        height: 650,
        background: "#000",
        borderRadius: 45,
        border: "6px solid #222",
        boxShadow: "0 0 0 2px #444, 0 20px 40px rgba(0,0,0,0.5)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Notch Area */}
        <div style={{
          position: "absolute",
          top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: 120, height: 25,
          background: "#222",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          zIndex: 20
        }} />

        {/* Status Bar */}
        <div style={{ 
          height: 44, 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          padding: "0 24px",
          color: "#fff",
          fontSize: 13,
          fontWeight: 600,
          zIndex: 10,
          position: "relative"
        }}>
          <span>9:41</span>
          <div style={{ display: "flex", gap: 5 }}>
            <span style={{ fontSize: 10 }}>●●●●</span>
            <span style={{ fontSize: 10 }}>LTE</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Simulator Screen Content */}
        <div style={{ 
          flex: 1, 
          background: "#111", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          padding: 20,
          position: "relative"
        }}>
          {/* Scrollable/Swipeable screenshot slot placeholder */}
          <div style={{
            width: "100%",
            aspectRatio: "9/19",
            background: `linear-gradient(135deg, ${activeProject.color}40, ${activeProject.color}10)`,
            borderRadius: 20,
            border: `1px solid ${activeProject.color}40`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 20,
            gap: 10
          }}>
            <div style={{ fontSize: 40 }}>📱</div>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>{activeProject.name}</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>screenshot coming soon</div>
          </div>
        </div>

        {/* Home Indicator */}
        <div style={{
          position: "absolute",
          bottom: 8, left: "50%",
          transform: "translateX(-50%)",
          width: 100, height: 4,
          borderRadius: 2,
          background: "#fff",
          zIndex: 10
        }} />
      </div>

    </div>
  );
}

export function IPhone({ standHeight }: { standHeight: number }) {
  const cameraView = useAppStore(state => state.cameraView);
  const isZoomedIn = cameraView === "iphone";

  // Portrait, leaning back slightly (-0.18 radians = ~10°), centered in stand
  return (
    <group
      position={[0, standHeight * 0.55, 0.01]}
      rotation={[-0.18, 0, 0]}
    >
      <AutoPlace targetWidth={sceneConfig.iphone.targetWidth} surfaceY={0}>
        <IPhoneModel />
      </AutoPlace>

      {/* ── Camera Anchors ────────────────────────────────────────────── */}
      <group position={[0, sceneConfig.iphone.targetWidth * 1.0, 0]}>
        <group name="iphone-camera-target" position={[0, 0, 0]} />
        <group name="iphone-camera-pos" position={[0, 0, 0.4]} />
      </group>

      {/* ── Background Dimmer ────────────────────────────────────────── */}
      {isZoomedIn && (
        <mesh position={[0, 0, -0.4]}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.85} />
        </mesh>
      )}

      {/* ── Embedded Screen Content ───────────────────────────────────── */}
      {isZoomedIn && (
        <group position={[0, sceneConfig.iphone.targetWidth * 1.0, sceneConfig.iphone.targetWidth * 0.05]}>
          <Html
            transform
            distanceFactor={0.5}
            style={{
              width: "900px",
              height: "700px",
              pointerEvents: "auto",
            }}
            zIndexRange={[100, 200]}
          >
            <IPhoneScreenContent />
          </Html>
        </group>
      )}
    </group>
  );
}
