"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

interface Particle {
  position: [number, number, number];
  scale: number;
  speed: number;
  direction: [number, number, number];
}

function Particles() {
  const prefersReducedMotion = useReducedMotion();
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const particlesArray: Particle[] = [];
    for (let i = 0; i < 100; i++) {
      particlesArray.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
        ] as [number, number, number],
        scale: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.02 + 0.01,
        direction: [
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
        ] as [number, number, number],
      });
    }
    return particlesArray;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particles.flatMap((p) => p.position));
    const sizes = new Float32Array(particles.map((p) => p.scale * 2));
    
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    
    return geo;
  }, [particles]);

  useFrame(() => {
    if (!particlesRef.current || prefersReducedMotion) return;

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      positions[i * 3] += particle.direction[0] * particle.speed;
      positions[i * 3 + 1] += particle.direction[1] * particle.speed;
      positions[i * 3 + 2] += particle.direction[2] * particle.speed;

      // Wrap around boundaries
      if (Math.abs(positions[i * 3]) > 15) particle.direction[0] *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 15) particle.direction[1] *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 15) particle.direction[2] *= -1;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.1}
        color="#10b981"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
      />
    </points>
  );
}

function RotatingCube() {
  const cubeRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame(() => {
    if (!cubeRef.current || prefersReducedMotion) return;
    cubeRef.current.rotation.x += 0.003;
    cubeRef.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={cubeRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshPhongMaterial
        color="#10b981"
        emissive="#059669"
        wireframe={true}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

export function Hero3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 75 }}
      className="w-full"
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <RotatingCube />
      <Particles />
    </Canvas>
  );
}
