"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type MarkerPositions = Record<string, [number, number, number]>;

type MarkerConfig = {
  id: string;
  nodes?: string[];
  position: [number, number, number];
};

// Positions mirror the Human Performance section's 2D hotspot layout
// (body normalized to height 2, centered at origin: head ~y=+1, feet ~y=-1).
const MARKERS: MarkerConfig[] = [
  { id: "brain", position: [0, 0.94, 0.12] },
  { id: "neck", nodes: ["MUSCLE_TRAP_1", "MUSCLE_TRAP_2"], position: [0, 0.74, 0.12] },
  { id: "shoulder", nodes: ["MUSCLE_DELTS"], position: [-0.1, 0.62, 0.12] },
  { id: "lungs", nodes: ["MUSCLE_PECS"], position: [-0.06, 0.48, 0.12] },
  { id: "heart", position: [0.03, 0.44, 0.12] },
  { id: "elbow", nodes: ["MUSCLE_BICEPS", "MUSCLE_FOREARMS"], position: [-0.12, 0.3, 0.12] },
  { id: "core", nodes: ["MUSCLE_ABS"], position: [0, 0.3, 0.12] },
  { id: "spine", nodes: ["MUSCLE_LAT_1", "MUSCLE_LAT_2"], position: [0, 0.16, -0.12] },
  { id: "wrist", nodes: ["MUSCLE_FOREARMS"], position: [-0.15, 0.06, 0.12] },
  { id: "hip", nodes: ["MUSCLE_QUAD_1", "MUSCLE_QUAD_2"], position: [-0.08, 0.06, 0.12] },
  { id: "knee", nodes: ["MUSCLE_HAM_1", "MUSCLE_HAM_2"], position: [0.05, -0.52, 0.12] },
  { id: "ankle", nodes: ["MUSCLE_CALF_1", "MUSCLE_CALF_2"], position: [0.04, -0.84, 0.12] },
];

const TARGET_HEIGHT = 2;

const MUSCLE_COLOR = "#b8402f";

const SELECTED_GLOW = new THREE.Color("#f97316");

function muscleGroupsFor(id: string): string[] | null {
  const marker = MARKERS.find((m) => m.id === id);
  return marker?.nodes ?? null;
}

// Preload the 3D model immediately when module loads so it is cached before scroll
useGLTF.preload("/models/bodyMuscles.glb");

export default function MuscleModel({
  selected,
  onPositions,
}: {
  selected: string;
  onPositions: (positions: MarkerPositions) => void;
}) {
  const { scene } = useGLTF("/models/bodyMuscles.glb");
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo<MarkerPositions>(() => {
    if (!scene) return {};

    scene.scale.set(1, 1, 1);
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
    scene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const scale = size.y > 0 ? TARGET_HEIGHT / size.y : 1;

    scene.scale.set(scale, scale, scale);
    scene.updateMatrixWorld(true);

    const result: MarkerPositions = {};

    for (const marker of MARKERS) {
      result[marker.id] = [...marker.position] as [number, number, number];
    }

    return result;
  }, [scene]);

  /* Apply anatomy-atlas materials once (idempotent via userData flag). */
  useEffect(() => {
    if (!scene || (scene as THREE.Object3D).userData.styled) return;

    scene.traverse((obj) => {
      const isMesh =
        (obj as THREE.Mesh).isMesh === true ||
        (obj as THREE.SkinnedMesh).isSkinnedMesh === true;
      if (!isMesh) return;

      const mat = new THREE.MeshStandardMaterial({
        color: MUSCLE_COLOR,
        roughness: 0.72,
        metalness: 0.05,
      });

      (obj as THREE.Mesh).material = mat;
    });

    (scene as THREE.Object3D).userData.styled = true;
  }, [scene]);

  /* Highlight the selected muscle group. */
  useEffect(() => {
    if (!scene) return;

    const groups = muscleGroupsFor(selected);
    const active = new Set(groups ?? []);

    scene.traverse((obj) => {
      const isMesh =
        (obj as THREE.Mesh).isMesh === true ||
        (obj as THREE.SkinnedMesh).isSkinnedMesh === true;
      if (!isMesh) return;
      const mesh = obj as THREE.Mesh;
      if (Array.isArray(mesh.material)) return;

      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (!mat) return;

      const glow = active.has(obj.name);
      mat.emissive.copy(glow ? SELECTED_GLOW : new THREE.Color("#000000"));
      mat.emissiveIntensity = glow ? 0.45 : 0;
    });
  }, [scene, selected]);

  useEffect(() => {
    if (Object.keys(positions).length > 0) {
      onPositions(positions);
    }
  }, [positions, onPositions]);

  return <group ref={groupRef}>{scene ? <primitive object={scene} /> : null}</group>;
}
