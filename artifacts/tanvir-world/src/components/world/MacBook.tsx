"use client";

import { Html } from "@react-three/drei";
import { Model as MacBookModel } from "../models/MacBookModel";
import { AutoPlace } from "./AutoPlace";
import { useAppStore } from "@/store/useAppStore";
import { sceneConfig } from "@/config/sceneConfig";
import { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function MacScreenContent() {
  const [activeTab, setActiveTab] = useState(0);

  const projects = [
    { 
      name: "Trackify", 
      tech: "React Native · GPS", 
      color: "#4DD0E1",
      desc: "Real-time location tracking dashboard for delivery teams. Features live map view, ETA calculations, and active driver monitoring with a 5-second polling interval.",
      github: "github.com/Tanvir4801/trackify",
      link: "trackify.app"
    },
    { 
      name: "ParkNow", 
      tech: "Flutter · Stripe", 
      color: "#A78BFA",
      desc: "Smart parking finder and payment platform. Allows users to locate available parking spots, book them in advance, and pay seamlessly using Stripe integration.",
      github: "github.com/Tanvir4801/parknow",
      link: "parknow.io"
    },
    { 
      name: "GaamRide", 
      tech: "React · Maps", 
      color: "#34D399",
      desc: "Ride-sharing web application built for local gaming event circuits. Integrates with Google Maps API for route optimization and real-time driver tracking.",
      github: "github.com/Tanvir4801/gaamride",
      link: "gaamride.com"
    },
    { 
      name: "AI DevOps", 
      tech: "Python · OpenAI", 
      color: "#F59E0B",
      desc: "AI-powered monitoring dashboard with anomaly detection. Uses OpenAI models to analyze server logs and predict potential outages before they occur.",
      github: "github.com/Tanvir4801/ai-devops",
      link: "devops-ai.net"
    },
  ];

  const activeProject = projects[activeTab];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop') center/cover",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── macOS Menu Bar ──────────────────────────────────────── */}
      <div style={{ 
        height: 24, 
        background: "rgba(0, 0, 0, 0.4)", 
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex", 
        alignItems: "center", 
        padding: "0 12px",
        fontSize: 12,
        color: "#fff",
        fontWeight: 500,
        gap: 16,
        zIndex: 10
      }}>
        <div style={{ fontSize: 14 }}></div>
        <div style={{ fontWeight: 600 }}>Finder</div>
        <div>File</div>
        <div>Edit</div>
        <div>View</div>
        <div>Window</div>
        <div>Help</div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <span>100%</span>
          <span>Sat Aug 15</span>
          <span>11:22 PM</span>
        </div>
      </div>

      {/* ── Desktop Area ────────────────────────────────────────── */}
      <div style={{ flex: 1, position: "relative", padding: 20 }}>
        
        {/* Project Browser Window */}
        <div style={{
          width: "480px",
          height: "280px",
          background: "rgba(30, 30, 30, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 10,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          margin: "0 auto",
          marginTop: "10px"
        }}>
          
          {/* Window Title Bar */}
          <div style={{ 
            height: 38, 
            display: "flex", 
            alignItems: "center", 
            padding: "0 14px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)"
          }}>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", border: "1px solid rgba(0,0,0,0.2)" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", border: "1px solid rgba(0,0,0,0.2)" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", border: "1px solid rgba(0,0,0,0.2)" }} />
            </div>
            <div style={{ 
              flex: 1, 
              textAlign: "center", 
              color: "#aaa", 
              fontSize: 13, 
              fontWeight: 600,
              marginRight: 44 // balance traffic lights
            }}>
              Project Browser
            </div>
          </div>

          {/* Window Content (Sidebar + Main) */}
          <div style={{ display: "flex", flex: 1, height: "calc(100% - 38px)" }}>
            
            {/* Sidebar (Project List) */}
            <div style={{ 
              width: 160, 
              background: "rgba(0,0,0,0.2)",
              borderRight: "1px solid rgba(255, 255, 255, 0.05)",
              padding: "10px 8px",
              display: "flex",
              flexDirection: "column",
              gap: 4
            }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600, padding: "4px 8px", marginBottom: 4 }}>
                REPOSITORIES
              </div>
              
              {projects.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setActiveTab(i)}
                  style={{
                    background: activeTab === i ? "#0a84ff" : "transparent",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                    textAlign: "left",
                    color: activeTab === i ? "#fff" : "rgba(255,255,255,0.8)"
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />
                  <span style={{ fontSize: 12, fontWeight: 500 }}>{p.name}</span>
                </button>
              ))}
            </div>

            {/* Main Preview Pane */}
            <div style={{ 
              flex: 1, 
              padding: "20px", 
              display: "flex", 
              flexDirection: "column",
              background: "rgba(255,255,255,0.02)" 
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ 
                  width: 48, height: 48, 
                  borderRadius: 12, 
                  background: `linear-gradient(135deg, ${activeProject.color}40, ${activeProject.color}10)`,
                  border: `1px solid ${activeProject.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24
                }}>
                  {activeProject.name.charAt(0)}
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: 18, color: "#fff", fontWeight: 600 }}>{activeProject.name}</h2>
                  <div style={{ color: activeProject.color, fontSize: 12, marginTop: 4, fontWeight: 500 }}>
                    {activeProject.tech}
                  </div>
                </div>
              </div>

              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.5, margin: "0 0 20px 0" }}>
                {activeProject.desc}
              </p>

              <div style={{ marginTop: "auto", display: "flex", gap: 10 }}>
                <div style={{ background: "rgba(255,255,255,0.1)", padding: "6px 12px", borderRadius: 6, fontSize: 11, color: "#fff" }}>
                  <span style={{ opacity: 0.5, marginRight: 6 }}>GitHub</span>
                  {activeProject.github}
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>

      {/* ── macOS Dock ──────────────────────────────────────────── */}
      <div style={{ 
        position: "absolute", 
        bottom: 8, 
        left: "50%", 
        transform: "translateX(-50%)",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 16,
        padding: "6px",
        display: "flex",
        gap: 8,
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
      }}>
        {/* Finder Icon */}
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(180deg, #1fa2ff 0%, #12d8fa 100%)", position: "relative" }}>
          <div style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.8)" }} />
        </div>
        {/* Browser Icon */}
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(180deg, #ff4b2b 0%, #ff416c 100%)" }} />
        {/* Terminal Icon */}
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "#1e1e1e", border: "1px solid #333" }} />
        {/* VS Code Icon */}
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(180deg, #0078d7 0%, #00bcf2 100%)" }} />
      </div>

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
