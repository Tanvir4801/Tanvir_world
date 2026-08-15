# TANVIR'S WORLD — UI/UX MASTER REFERENCE

This document serves as the approved Phase 1 UI/UX source of truth for the future Antigravity production implementation of "Tanvir's World".

## 1. Project Purpose
A premium interactive developer portfolio for **Tanvir Patel, Full-Stack Developer** (Web • Mobile • Backend • Cloud & DevOps).
The experience feels like entering Tanvir's personal digital engineering workspace. It avoids conventional portfolio layouts in favor of an immersive 3D workspace centered around a MacBook.

## 2. Phase 1 Scope
This phase focuses strictly on the 3D visual presentation, camera journey, and initial interactions.
**In Scope:** 3D Room, Desk, MacBook, iPhone, Monitor, Lighting, Camera, HUD, Scroll Journey.
**Out of Scope (Future Phases):** Internal project pages, working OS, case studies, backend, auth, database.

## 3. Physical Scene & Composition
A cinematic 3/4 camera angle that frames a believable premium developer workspace.
**Required Objects:**
1. **MacBook** — Main Hero
2. **iPhone** — Mobile Development
3. **External Monitor** — Cloud / DevOps
4. Desk & Desk Lamp
5. Headphones & Notebook
6. Small Plant
7. Minimal back wall & Floor with realistic shadows

*Rule:* The objects must remain visually understandable; do not hide everything in darkness.

## 4. Camera Journey
The camera must physically travel through the workspace using position, rotation, depth, parallax, and smooth easing.

- **STATE 01 — ROOM:** Wide cinematic view of the full workspace. (Indicator: ROOM)
- **STATE 02 — WORKSPACE:** Camera moves closer, focusing on the desk setup. (Indicator: WORKSPACE)
- **STATE 03 — DESK:** Camera approaches the desk surface and accessories. (Indicator: DESK)
- **STATE 04 — MACBOOK:** Camera approaches the MacBook, which becomes visually dominant. (Indicator: MACBOOK)
- **STATE 05 — MACBOOK HERO:** MacBook screen dominates and illuminates with "ENTER TANVIR'S WORLD →". (Indicator: MACBOOK HERO)

## 5. Object Details
- **MacBook:** Realistic modern proportions, thin aluminum body, rounded display, realistic bezel/keyboard/trackpad, subtle reflections/shadows, screen glow.
- **iPhone:** One realistic smartphone representing MOBILE APPS. (Hover: "MOBILE APPS")
- **Monitor:** External monitor behind/beside the MacBook representing CLOUD & DEVOPS. Shows placeholders (API • ONLINE, DATABASE • ONLINE, DOCKER • RUNNING). (Hover: "DEVOPS & SYSTEMS")

## 6. Lighting & Color System
**Lighting Concept:** WARM ENVIRONMENT + COOL TECHNOLOGY
- Soft neutral ambient room light
- Warm desk lamp
- Subtle cool MacBook & Monitor glows
- *Avoid:* RGB, cyberpunk, excessive neon, or gaming aesthetics.

**Colors:**
- Primary: Near Black, Graphite, Charcoal
- Text: Off White
- Muted: Cool Gray
- Digital Accent: Restrained Cyan / Blue
- Environmental Accent: Warm Amber

## 7. Typography
- **Primary:** Geist / Inter / modern system sans-serif
- **Technical:** JetBrains Mono / Geist Mono

## 8. HUD & Intro
**Intro Screen:**
```
TANVIR'S WORLD
FULL-STACK DEVELOPER
Building Web, Mobile & Cloud Systems
SCROLL TO ENTER ↓
```
*(Fades out as camera enters the workspace)*

**Minimal HUD:**
- Top Left: TANVIR / ENGINEERING WORLD
- Top Right: WORK / ABOUT / CONTACT
- Bottom Left: SCROLL TO ENTER ↓
- Bottom Right: ● WORLD ONLINE

## 9. Interactions & Motion
- **MacBook Hover:** Subtle lift, screen glow, elegant tooltip ("ENTER TANVIR'S WORLD").
- **Mouse Parallax:** Very subtle reaction to cursor movement on desktop.
- **Mobile:** Dedicated composition (simplified background, reduced secondary objects, prioritize MacBook, tap instead of hover).
- **Accessibility:** Respect `prefers-reduced-motion` (minimize travel, use fades).

## 10. Future Implementation Requirements
Built for: Next.js, TypeScript, React, Three.js, React Three Fiber, Drei, GSAP, Framer Motion, Lenis, Zustand.
Assets will be optimized GLB/glTF models (lazy-loaded) utilizing high-quality licensed or CC0 models.
