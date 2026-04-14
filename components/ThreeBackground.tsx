"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import FluidScene from "./backgrounds/FluidScene";
import FluxScene from "./backgrounds/FluxScene";
import { useTheme } from "@/context/ThemeContext";

function DefaultParticles() {
  const meshRef = useRef<THREE.Points>(null!);
  const { mouse } = useThree();

  const [positions, colors] = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color("#7c3aed");
    const color2 = new THREE.Color("#06b6d4");
    const color3 = new THREE.Color("#f59e0b");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const t = Math.random();
      let c: THREE.Color;
      if (t < 0.5) c = color1.clone().lerp(color2, t * 2);
      else c = color2.clone().lerp(color3, (t - 0.5) * 2);

      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.04 + mouse.x * 0.3;
      meshRef.current.rotation.x = t * 0.02 + mouse.y * 0.15;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingShapes() {
  return (
    <>
      <mesh position={[3.5, 0, -4]}>
        <torusGeometry args={[1.5, 0.3, 16, 60]} />
        <meshStandardMaterial color="#7c3aed" wireframe transparent opacity={0.25} emissive="#7c3aed" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-4, 1, -6]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.1} emissive="#06b6d4" emissiveIntensity={0.4} />
      </mesh>
    </>
  );
}

export default function ThreeBackground() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 1,
      }}
    >
      <Canvas
        key={theme}
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#7c3aed" />
        <pointLight position={[-5, -3, 3]} intensity={0.4} color="#06b6d4" />
        
        {theme === "default" && (
          <>
            <DefaultParticles />
            <FloatingShapes />
          </>
        )}
        
        {theme === "fluid" && <FluidScene />}
        {theme === "flux" && <FluxScene />}
      </Canvas>
    </div>
  );
}
