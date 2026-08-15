"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AutoPlaceProps {
  children: React.ReactNode;
  targetWidth: number;
  surfaceY?: number;       // world-Y of the surface to sit on (defaults to 0 = floor)
  id?: string;             // broadcast measured bounds to store
  onHeightCalculated?: (height: number) => void;
}

import { useAppStore } from "@/store/useAppStore";
import React from "react";

export function AutoPlace({
  children,
  targetWidth,
  surfaceY = 0,
  id,
  onHeightCalculated,
}: AutoPlaceProps) {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const measuredRef = useRef(false);           // measure only once
  const prevBoundsStr = useRef("");

  const setTableBounds = useAppStore(state => state.setTableBounds);
  const setTableHeight = useAppStore(state => state.setTableHeight);

  // We need to wait one frame for the GLB to load its geometry
  useFrame(() => {
    if (measuredRef.current) return;
    if (!innerRef.current || !outerRef.current) return;

    // Force matrix world so setFromObject reads correct world coords
    innerRef.current.updateWorldMatrix(true, true);

    // 1) Measure unscaled
    innerRef.current.scale.set(1, 1, 1);
    const rawBox = new THREE.Box3().setFromObject(innerRef.current);
    const rawSize = new THREE.Vector3();
    rawBox.getSize(rawSize);

    if (rawSize.x === 0 || rawSize.y === 0 || rawSize.z === 0) return;  // geometry not ready yet

    // 2) Scale so width == targetWidth (uniform)
    const scale = targetWidth / rawSize.x;
    innerRef.current.scale.setScalar(scale);
    innerRef.current.updateWorldMatrix(true, true);

    // 3) Re-measure after scale
    const scaledBox = new THREE.Box3().setFromObject(innerRef.current);

    // 4) Lift outer group so the model's bottom face sits exactly on surfaceY
    outerRef.current.position.y = surfaceY - scaledBox.min.y;
    outerRef.current.updateWorldMatrix(true, true);

    // 5) Measure the outer group's local (relative) bounds for children to use
    const localBox = new THREE.Box3().setFromObject(outerRef.current);

    const bounds = {
      minX: localBox.min.x, maxX: localBox.max.x,
      minY: localBox.min.y, maxY: localBox.max.y,
      minZ: localBox.min.z, maxZ: localBox.max.z,
      width: localBox.max.x - localBox.min.x,
      height: localBox.max.y - localBox.min.y,
      depth: localBox.max.z - localBox.min.z,
    };

    const boundsStr = JSON.stringify(bounds);
    if (id && prevBoundsStr.current !== boundsStr) {
      prevBoundsStr.current = boundsStr;
      setTableBounds(id, bounds);
      setTableHeight(id, bounds.height);
      console.log(`[AutoPlace] ${id} measured:`, bounds);
    }

    onHeightCalculated?.(bounds.height);

    measuredRef.current = true;
  });

  return (
    <group ref={outerRef}>
      <group ref={innerRef}>{children}</group>
    </group>
  );
}
