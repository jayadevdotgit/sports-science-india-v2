"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import MuscleModel from "./MuscleModel";

type Props = {
  selected: string;
  onSelect: (id: string) => void;
};

function FaintGrid() {
  const ref = useRef<THREE.GridHelper>(null);

  useFrame(() => {
    if (ref.current) {
      const mat = ref.current.material as THREE.LineBasicMaterial;
      mat.transparent = true;
      mat.opacity = 0.16;
    }
  });

  return <gridHelper ref={ref} args={[4, 16, "#f97316", "#f97316"]} position={[0, -1, 0]} />;
}

function SceneContent({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <>
      <Suspense fallback={null}>
        <MuscleModel selected={selected} onPositions={() => {}} />
      </Suspense>

      {/* Lighting */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 4]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#ffffff" />
      <directionalLight position={[0, 1, -5]} intensity={0.5} color="#ffd9b3" />
      <pointLight position={[0, 1.2, 2.5]} intensity={0.3} color="#ffffff" />

      {/* Floor grid / glow */}
      <FaintGrid />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={2.2}
        maxDistance={5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI * 0.62}
        autoRotate={autoRotate}
        autoRotateSpeed={1.6}
        target={[0, 0, 0]}
        onStart={() => setAutoRotate(false)}
        onEnd={() => {
          setTimeout(() => setAutoRotate(true), 3000);
        }}
      />
    </>
  );
}

export default function MuscleScene({ selected, onSelect }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 3.1], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneContent selected={selected} onSelect={onSelect} />
    </Canvas>
  );
}
