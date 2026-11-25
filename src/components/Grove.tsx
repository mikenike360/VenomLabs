"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";

const INK = 0x10120e;
const VENOM = 0xd6ff3e;
const SCREEN_GLOW = 0xb8ff4a;
const TERMINAL_URL = "/grove/workstation.glb";

type Placement = {
  url: string;
  height: number;
  x: number;
  z: number;
  rot: number;
  /** Sink into the ground/chair after grounding (for a seated pose). */
  sink?: number;
  /** Raise after grounding (put a monitor on a desk, etc.). */
  lift?: number;
  skipDim?: boolean;
  glowScreen?: boolean;
  /** Measure only mesh geometry — ignores oversized armatures on rigged characters. */
  meshBounds?: boolean;
};

/** A 2000s workstation in the open right of the headline. */
const placements: Placement[] = [
  {
    url: TERMINAL_URL,
    height: 1.15,
    x: 2.7,
    z: 0.2,
    rot: -0.2,
    skipDim: true,
    glowScreen: true,
  },
];

function meshBoundingBox(object: THREE.Object3D) {
  object.updateMatrixWorld(true);
  const box = new THREE.Box3();
  let found = false;
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh || !mesh.geometry) return;
    if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
    if (!mesh.geometry.boundingBox) return;
    const geoBox = mesh.geometry.boundingBox.clone();
    geoBox.applyMatrix4(mesh.matrixWorld);
    if (!found) {
      box.copy(geoBox);
      found = true;
    } else {
      box.union(geoBox);
    }
  });
  return found ? box : new THREE.Box3().setFromObject(object);
}

function sitOnGround(
  object: THREE.Object3D,
  height: number,
  sink = 0,
  lift = 0,
  meshBounds = false,
) {
  const box = meshBounds ? meshBoundingBox(object) : new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  if (size.y > 0) {
    object.scale.multiplyScalar(height / size.y);
  }
  const grounded = meshBounds ? meshBoundingBox(object) : new THREE.Box3().setFromObject(object);
  object.position.y -= grounded.min.y + sink;
  object.position.y += lift;
}

function dimMaterials(object: THREE.Object3D, amount = 0.7) {
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const material of materials) {
      const colored = material as THREE.MeshStandardMaterial;
      if (colored.color) colored.color.multiplyScalar(amount);
      colored.fog = true;
    }
  });
}

/** The CRT text is M_screen_brightgreen and faces mostly +Z. */
function lightUpTerminal(object: THREE.Object3D) {
  let screen: THREE.Mesh | null = null;
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const material of materials) {
      if (!(material instanceof THREE.MeshStandardMaterial)) continue;
      if (material.name !== "M_screen_brightgreen") continue;
      material.emissive.setHex(VENOM);
      material.emissiveIntensity = 0.55;
      material.toneMapped = false;
      screen = mesh;
    }
  });

  object.updateMatrixWorld(true);
  const light = new THREE.PointLight(SCREEN_GLOW, 0.45, 2.4);
  if (screen) {
    const center = new THREE.Box3().setFromObject(screen).getCenter(new THREE.Vector3());
    const normal = new THREE.Vector3(0, 0.34, 0.94).transformDirection(object.matrixWorld);
    center.addScaledVector(normal, 0.28);
    object.worldToLocal(center);
    light.position.copy(center);
  }
  object.add(light);
}

export default function Grove() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0 };
    let frame = 0;
    let running = true;
    let visible = true;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(INK, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(INK, 0.055);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.set(1.6, 1.7, 8.6);

    scene.add(new THREE.AmbientLight(0x9aa890, 0.72));
    const sun = new THREE.DirectionalLight(0xd7e2cf, 0.85);
    sun.position.set(-5, 9, 4);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x6a7a90, 0.28);
    fill.position.set(4, 3, 6);
    scene.add(fill);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(18, 48),
      new THREE.MeshStandardMaterial({ color: 0x171d14, roughness: 1 }),
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    const loader = new GLTFLoader();
    const cache = new Map<string, THREE.Group>();
    const originals: THREE.Object3D[] = [];

    const resize = () => {
      const width = root.clientWidth;
      const height = root.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const render = (time = 0) => {
      const sway = reduced ? 0 : Math.sin(time * 0.00035) * 0.04;
      camera.position.x += (1.6 + pointer.x * 0.35 - camera.position.x) * 0.04;
      camera.position.y += (1.7 + sway + pointer.y * -0.12 - camera.position.y) * 0.04;
      camera.lookAt(2.1, 0.75, 0.2);
      renderer.render(scene, camera);
    };

    const loop = (time: number) => {
      if (!running) return;
      frame = window.requestAnimationFrame(loop);
      if (visible) render(time);
    };

    const onPointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);
    observer.observe(root);
    if (!reduced) window.addEventListener("pointermove", onPointer);

    Promise.all(
      [...new Set(placements.map((item) => item.url))].map(
        (url) =>
          new Promise<void>((resolve) => {
            loader.load(
              url,
              (gltf) => {
                cache.set(url, gltf.scene);
                originals.push(gltf.scene);
                resolve();
              },
              undefined,
              () => resolve(),
            );
          }),
      ),
    ).then(() => {
      if (!running) return;
      for (const placement of placements) {
        const source = cache.get(placement.url);
        if (!source) continue;
        // Skinned Quaternius characters break with Object3D.clone — use SkeletonUtils.
        const object = cloneSkinned(source);
        if (!placement.skipDim) dimMaterials(object, 0.55);
        sitOnGround(
          object,
          placement.height,
          placement.sink ?? 0,
          placement.lift ?? 0,
          placement.meshBounds,
        );
        object.position.x = placement.x;
        object.position.z = placement.z;
        object.rotation.y = placement.rot;
        if (placement.glowScreen) lightUpTerminal(object);
        scene.add(object);
      }
      render(0);
      if (!reduced) loop(0);
    });

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      resizeObserver.disconnect();
      observer.disconnect();
      scene.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry?.dispose();
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const material of materials) material?.dispose();
      });
      originals.forEach((object) => {
        object.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (!mesh.isMesh) return;
          mesh.geometry?.dispose();
        });
      });
      ground.geometry.dispose();
      (ground.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
