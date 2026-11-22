"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const INK = 0x10120e;

type Placement = {
  url: string;
  height: number;
  x: number;
  z: number;
  rot: number;
};

const placements: Placement[] = [
  { url: "/grove/cottage.glb", height: 1.8, x: -1.5, z: -2.4, rot: 0.35 },
  { url: "/grove/tree-kenney.glb", height: 2.5, x: -3.8, z: -0.6, rot: 0.4 },
  { url: "/grove/tree-quaternius.glb", height: 2.9, x: -2.4, z: 0.5, rot: 1.1 },
  { url: "/grove/tree-kenney.glb", height: 2.1, x: 0.2, z: -1.6, rot: 0.2 },
  { url: "/grove/tree-quaternius.glb", height: 3.1, x: 2.2, z: -0.2, rot: 0.7 },
  { url: "/grove/tree-kenney.glb", height: 2.3, x: 4.1, z: 0.6, rot: 2.2 },
  { url: "/grove/tree-quaternius.glb", height: 2.4, x: -5.1, z: -1.4, rot: 0.9 },
  { url: "/grove/rock.glb", height: 0.42, x: -0.3, z: 1.5, rot: 0.5 },
  { url: "/grove/rock.glb", height: 0.3, x: 1.5, z: 1.7, rot: 1.3 },
];

function sitOnGround(object: THREE.Object3D, height: number) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  if (size.y > 0) {
    object.scale.multiplyScalar(height / size.y);
  }
  const grounded = new THREE.Box3().setFromObject(object);
  object.position.y -= grounded.min.y;
}

function dimMaterials(object: THREE.Object3D) {
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const material of materials) {
      const colored = material as THREE.MeshStandardMaterial;
      if (colored.color) colored.color.multiplyScalar(0.62);
      colored.fog = true;
    }
  });
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
    scene.fog = new THREE.FogExp2(INK, 0.11);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
    camera.position.set(0, 2.15, 9.2);

    scene.add(new THREE.AmbientLight(0x8ea090, 0.55));
    const sun = new THREE.DirectionalLight(0xd7e2cf, 1.15);
    sun.position.set(-4, 8, 6);
    scene.add(sun);
    const windowLight = new THREE.PointLight(0xffb15a, 4, 7);
    windowLight.position.set(-1.4, 1.2, -2);
    scene.add(windowLight);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(14, 40),
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
      const sway = reduced ? 0 : Math.sin(time * 0.00035) * 0.05;
      camera.position.x += (pointer.x * 0.55 - camera.position.x) * 0.04;
      camera.position.y += (2.15 + sway + pointer.y * -0.18 - camera.position.y) * 0.04;
      camera.lookAt(0, 1.05, 0);
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
                dimMaterials(gltf.scene);
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
        const object = source.clone(true);
        sitOnGround(object, placement.height);
        object.position.x = placement.x;
        object.position.z = placement.z;
        object.rotation.y = placement.rot;
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
