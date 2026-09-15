"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export function UnseenArchitecturalScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene & Warm Atmospheric Lighting
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#efded9");
    scene.fog = new THREE.FogExp2("#efded9", 0.04);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 7.2);
    camera.lookAt(0, 1.0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // Warm Ambient and Sunlight (matching unseen.co warm palette)
    const ambientLight = new THREE.AmbientLight(0xfff6ee, 2.6);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(0xfffaf0, 2.4);
    sun.position.set(6, 9, 5);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 25;
    sun.shadow.bias = -0.0001;
    scene.add(sun);

    const skyFill = new THREE.DirectionalLight(0xffeedd, 1.2);
    skyFill.position.set(-6, 5, -2);
    scene.add(skyFill);

    // 2. High-Albedo Warm Clay Basin & Sand Bed
    const groundGeo = new THREE.PlaneGeometry(36, 36, 64, 64);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xfaeee8,
      roughness: 0.85,
      metalness: 0.0,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = 0.0;
    ground.receiveShadow = true;
    scene.add(ground);

    // 3. Calm Luminous Specular Water Pool
    const poolGeo = new THREE.CircleGeometry(5.2, 64);
    poolGeo.rotateX(-Math.PI / 2);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0xf5e8e4,
      roughness: 0.05,
      metalness: 0.35,
      transparent: true,
      opacity: 0.65,
    });
    const pool = new THREE.Mesh(poolGeo, waterMat);
    pool.position.y = 0.02;
    pool.receiveShadow = true;
    scene.add(pool);

    // 4. Natural Sculptural Clay Stones
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0xf3e3dd,
      roughness: 0.88,
      metalness: 0.0,
      flatShading: true,
    });

    const createRock = (scale: [number, number, number], p: [number, number, number], rotY: number = 0) => {
      const geo = new THREE.DodecahedronGeometry(1, 1);
      const rock = new THREE.Mesh(geo, rockMat);
      rock.scale.set(...scale);
      rock.position.set(...p);
      rock.rotation.y = rotY;
      rock.castShadow = true;
      rock.receiveShadow = true;
      scene.add(rock);
      return rock;
    };

    createRock([1.2, 0.7, 1.0], [2.2, 0.15, 0.3], 0.4);
    createRock([0.7, 0.45, 0.65], [2.9, 0.1, 1.1], 0.8);
    createRock([1.0, 0.8, 0.9], [-2.3, 0.2, -0.3], 1.2);
    createRock([0.55, 0.35, 0.55], [-1.6, 0.08, 0.8], 0.2);

    // 5. Iridescent Pearl Orb (Aixion Monolith)
    const pearlGeo = new THREE.SphereGeometry(0.72, 64, 64);
    const pearlMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.05,
      metalness: 0.05,
      transmission: 0.5,
      ior: 1.5,
      iridescence: 1.0,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [100, 450],
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
    });
    const pearl = new THREE.Mesh(pearlGeo, pearlMat);
    pearl.position.set(0.6, 1.45, -0.5);
    pearl.castShadow = true;
    scene.add(pearl);

    // 6. Real Botanical GLTF Models
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    // Botanical Plant on the left rock bank
    gltfLoader.load(
      "/models/plant.glb",
      (gltf) => {
        const plant = gltf.scene;
        plant.scale.set(1.5, 1.5, 1.5);
        plant.position.set(-2.0, 0.15, -0.1);
        plant.rotation.y = 0.5;
        plant.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        scene.add(plant);
      },
      undefined,
      (err) => console.warn("Plant load:", err)
    );

    // Botanical Glass Vase with Flowers on the right rock bank
    gltfLoader.load(
      "/models/flowers.glb",
      (gltf) => {
        const flowers = gltf.scene;
        flowers.scale.set(2.6, 2.6, 2.6);
        flowers.position.set(2.0, 0.25, 0.3);
        flowers.rotation.y = -0.3;
        flowers.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        scene.add(flowers);
      },
      undefined,
      (err) => console.warn("Flowers load:", err)
    );

    // 7. Mouse Parallax & Dynamic Life Loop
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.7;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let animationId: number;
    let startTime = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTime) * 0.001;

      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX * 1.4;
      camera.position.y = 1.8 - targetY * 0.5;
      camera.lookAt(0, 1.0, 0);

      // Pearl breathing float
      pearl.position.y = 1.45 + Math.sin(elapsed * 1.3) * 0.04;
      pearl.rotation.y = elapsed * 0.16;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationId);
      dracoLoader.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0, zIndex: 1 }} />;
}
