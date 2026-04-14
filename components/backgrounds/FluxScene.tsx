"use client";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uPos1;
  uniform vec2 uPos2;
  uniform vec2 uPos3;

  void main() {
    float dist1 = distance(vUv, uPos1);
    float dist2 = distance(vUv, uPos2);
    float dist3 = distance(vUv, uPos3);

    float blob1 = smoothstep(0.6, 0.0, dist1);
    float blob2 = smoothstep(0.5, 0.0, dist2);
    float blob3 = smoothstep(0.7, 0.0, dist3);

    vec3 color1 = vec3(0.486, 0.227, 0.929); // #7c3aed
    vec3 color2 = vec3(0.023, 0.713, 0.831); // #06b6d4
    vec3 color3 = vec3(0.961, 0.620, 0.043); // #f59e0b

    vec3 finalColor = color1 * blob1 + color2 * blob2 + color3 * blob3;
    gl_FragColor = vec4(finalColor, min(0.4, blob1 + blob2 + blob3) * 0.5);
  }
`;

export default function FluxScene() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPos1: { value: new THREE.Vector2(0.3, 0.3) },
    uPos2: { value: new THREE.Vector2(0.7, 0.6) },
    uPos3: { value: new THREE.Vector2(0.5, 0.5) },
  }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    uniforms.uTime.value = t;
    
    // Random-ish circular motion
    uniforms.uPos1.value.set(
      0.5 + Math.sin(t * 0.5) * 0.3,
      0.5 + Math.cos(t * 0.3) * 0.3
    );
    uniforms.uPos2.value.set(
      0.5 + Math.cos(t * 0.4) * 0.4,
      0.5 + Math.sin(t * 0.6) * 0.2
    );
    uniforms.uPos3.value.set(
      0.5 + Math.sin(t * 0.2) * 0.2,
      0.5 + Math.cos(t * 0.5) * 0.4
    );
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[40, 40]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}
