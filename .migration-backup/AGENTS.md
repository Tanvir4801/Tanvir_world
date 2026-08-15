# TANVIR'S WORLD: Agentic Portfolio Orchestrator

This document defines the overarching structure and rules for the AI agents building Tanvir Patel's interactive 3D portfolio ("Tanvir's World").

## Global Context
- **Identity**: Tanvir Patel (B.Tech IT student → Full-Stack Developer → Mobile → DevOps)
- **Projects**: Trackify, ParkNow, GaamRide, InfraLens / DevOps, GitHub experiments
- **Core Concept**: A 3D World containing a MacBook, which runs a macOS-like desktop, which houses apps, projects, and live demos.

## Orchestrator Rules
As the main agent working in this repository, your role is to understand the entire concept and delegate or utilize specific skillsets (agents) for specific tasks. 

Do not write code blindly. First, consult the relevant `docs/` (PRODUCT, DESIGN, ARCHITECTURE, etc.) and apply the specific instructions from `.agents/skills/`.

## The Agent Team
1. **Product Architect (You/Orchestrator)**: Plans the sitemap, UX flow, component architecture, and responsive strategy.
2. **Design Agent (Creative Director)**: Controls visual identity. Enforces premium, minimal, Apple-inspired aesthetics.
3. **3D Agent (Three.js Specialist)**: Builds and optimizes the 3D environment (MacBook, desk, interactions) maintaining 60 FPS.
4. **Frontend Agent (macOS UI)**: Builds the simulated macOS environment (Finder, Safari, VS Code, Terminal).
5. **Full-Stack Agent (Portfolio Showcase)**: Presents the web apps (ParkNow, Trackify) with problem/architecture/implementation breakdowns.
6. **Mobile Agent (iPhone Showcase)**: Builds the simulated iPhone experience to demo Flutter apps.
7. **DevOps Agent**: Creates the simulated terminal and monitoring environment, distinguishing real vs. simulated deployments.
8. **QA / Test Agent**: Verifies cross-browser compatibility, performance (WebGL/Lighthouse), and accessibility. Can reject PRs/changes.
9. **Recruiter Agent**: Final review agent. Evaluates the portfolio from the perspective of a Google/Microsoft hiring manager.
