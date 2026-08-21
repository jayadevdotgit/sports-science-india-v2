"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MuscleModel from "./MuscleModel";

type Props = {
  selected: string;
  onSelect: (id: string) => void;
};

function FaintGrid() {
  return (
    <gridHelper args={[4, 16, "#f97316", "#f97316"]} position={[0, -1, 0]}>
      <lineBasicMaterial transparent opacity={0.16} />
    </gridHelper>
  );
}

function LoadingHologram() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

function SceneContent({
  selected,
}: {
  selected: string;
}) {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <>
      <Suspense fallback={<LoadingHologram />}>
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

export default function MuscleScene({ selected }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "300px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0.15, 3.1], fov: 42 }}
        dpr={[1, 1.25]}
        frameloop={isVisible ? "always" : "demand"}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <SceneContent selected={selected} />
      </Canvas>
    </div>
  );
}
