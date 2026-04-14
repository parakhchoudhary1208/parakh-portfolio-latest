"use client";
import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function NeuralScene() {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const { mouse } = useThree();

  const count = 150;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 15;
      p[i * 3 + 1] = (Math.random() - 0.5) * 15;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  const velocities = useMemo(() => {
    return Array.from({ length: count }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 0.015,
      (Math.random() - 0.5) * 0.015,
      (Math.random() - 0.5) * 0.015
    ));
  }, []);

  const linePositions = useMemo(() => new Float32Array(count * count * 6), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const lineAttr = linesRef.current.geometry.attributes.position;
    let lineIdx = 0;

    for (let i = 0; i < count; i++) {
      let x = posAttr.getX(i) + velocities[i].x;
      let y = posAttr.getY(i) + velocities[i].y;
      let z = posAttr.getZ(i) + velocities[i].z;

      // Mouse attraction logic for that "techy" interaction
      const dx = mouse.x * 10 - x;
      const dy = mouse.y * 10 - y;
      const distToMouse = Math.sqrt(dx * dx + dy * dy);
      if (distToMouse < 5) {
        x += dx * 0.01;
        y += dy * 0.01;
      }

      // Bounds
      if (Math.abs(x) > 12) velocities[i].x *= -1;
      if (Math.abs(y) > 12) velocities[i].y *= -1;
      if (Math.abs(z) > 8) velocities[i].z *= -1;

      posAttr.setXYZ(i, x, y, z);

      // Connecting Lines
      for (let j = i + 1; j < count; j++) {
        const x2 = posAttr.getX(j);
        const y2 = posAttr.getY(j);
        const z2 = posAttr.getZ(j);

        const d = Math.sqrt((x - x2)**2 + (y - y2)**2 + (z - z2)**2);
        if (d < 3.5) {
          lineAttr.setXYZ(lineIdx++, x, y, z);
          lineAttr.setXYZ(lineIdx++, x2, y2, z2);
        }
      }
    }

    posAttr.needsUpdate = true;
    lineAttr.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIdx);
    
    groupRef.current.rotation.y = t * 0.05;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.12} color="#06b6d4" transparent opacity={0.8} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#7c3aed" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </lineSegments>
      {/* Techy wireframe cage */}
      <mesh>
        <boxGeometry args={[25, 25, 15]} />
        <meshBasicMaterial wireframe color="#7c3aed" transparent opacity={0.03} />
      </mesh>
    </group>
  );
}
