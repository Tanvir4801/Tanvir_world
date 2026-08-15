import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useAppStore } from "@/store/useAppStore";

interface AutoPlaceProps {
  children: React.ReactNode;
  targetWidth: number;
  surfaceY: number;
  id?: string; // ID to register local bounds in global store
}

export function AutoPlace({ children, targetWidth, surfaceY, id }: AutoPlaceProps) {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const setTableBounds = useAppStore(state => state.setTableBounds);
  const setTableHeight = useAppStore(state => state.setTableHeight);
  
  // Track previous bounds to prevent infinite loops
  const prevBoundsRef = useRef<string>("");

  useEffect(() => {
    if (!innerRef.current || !outerRef.current) return;

    // Reset scale to calculate original size accurately
    innerRef.current.scale.set(1, 1, 1);
    
    // Calculate bounding box of the unscaled object
    const box = new THREE.Box3().setFromObject(innerRef.current);
    const size = new THREE.Vector3();
    box.getSize(size);

    if (size.x === 0 || size.y === 0 || size.z === 0) return;

    // Determine scale to hit targetWidth
    const scale = targetWidth / size.x;
    
    // Apply scale
    innerRef.current.scale.set(scale, scale, scale);
    
    // Recalculate box after scaling
    const scaledBox = new THREE.Box3().setFromObject(innerRef.current);
    
    // Shift the outer group so that the bottom (min.y) sits exactly at surfaceY
    outerRef.current.position.y = surfaceY - scaledBox.min.y;

    // We no longer automatically shift X or Z! We just measure the local bounds.
    const localBox = new THREE.Box3().setFromObject(outerRef.current);
    
    if (id) {
      const newBounds = {
        minX: localBox.min.x,
        maxX: localBox.max.x,
        minY: localBox.min.y,
        maxY: localBox.max.y,
        minZ: localBox.min.z,
        maxZ: localBox.max.z,
        width: localBox.max.x - localBox.min.x,
        height: localBox.max.y - localBox.min.y,
        depth: localBox.max.z - localBox.min.z,
      };

      const boundsString = JSON.stringify(newBounds);
      
      // Only trigger Zustand update if the physical bounds actually changed
      if (prevBoundsRef.current !== boundsString) {
        prevBoundsRef.current = boundsString;
        setTableBounds(id, newBounds);
        setTableHeight(id, newBounds.height);
      }
    }
  // Remove children from dependency array to prevent infinite loops when parent re-renders!
  }, [targetWidth, surfaceY, id, setTableBounds, setTableHeight]);

  return (
    <group ref={outerRef}>
      <group ref={innerRef}>{children}</group>
    </group>
  );
}
