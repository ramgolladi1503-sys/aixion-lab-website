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

    // 1. Scene & Atmospheric Settings
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#efded9");
    scene.fog = new THREE.FogExp2("#efded9", 0.032);

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 1.7, 6.8);
    camera.lookAt(0, 0.9, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // Warm Mediterranean Natural Sun & Ambient Skies
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 2.4);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(0xfffaf0, 2.6);
    sun.position.set(6, 9, 5);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 25;
    sun.shadow.bias = -0.0001;
    scene.add(sun);

    const skyFill = new THREE.DirectionalLight(0xffeedd, 1.1);
    skyFill.position.set(-6, 5, -2);
    scene.add(skyFill);

    // 2. High-Albedo Warm Clay Ground Platform
    const groundGeo = new THREE.PlaneGeometry(36, 36, 64, 64);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xfaeee8,
      roughness: 0.88,
      metalness: 0.0,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.05;
    ground.receiveShadow = true;
    scene.add(ground);

    // 3. Fluid Specular Water Surface with Wave Ripple Dynamics
    const waterGeo = new THREE.PlaneGeometry(16, 16, 128, 128);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0xf3e5e0,
      roughness: 0.06,
      metalness: 0.45,
      transparent: true,
      opacity: 0.72,
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.y = 0.02;
    water.receiveShadow = true;
    scene.add(water);

    // 4. Natural Organic Rock Formations
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0xf2e1db,
      roughness: 0.9,
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

    createRock([1.1, 0.6, 0.9], [2.2, 0.15, 0.2], 0.4);
    createRock([0.65, 0.4, 0.6], [2.9, 0.1, 1.0], 0.8);
    createRock([0.95, 0.7, 0.85], [-2.3, 0.2, -0.4], 1.2);
    createRock([0.5, 0.35, 0.5], [-1.6, 0.08, 0.7], 0.2);

    // 5. Iridescent Pearl Orb (Kinetic Floating Core)
    const pearlGeo = new THREE.SphereGeometry(0.72, 64, 64);
    const pearlMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.05,
      metalness: 0.08,
      transmission: 0.52,
      ior: 1.5,
      iridescence: 1.0,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [100, 450],
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
    });
    const pearl = new THREE.Mesh(pearlGeo, pearlMat);
    pearl.position.set(0.2, 1.35, -0.6);
    pearl.castShadow = true;
    scene.add(pearl);

    // 6. External GLTF 3D Nature Models
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    // Diffuse Transmission Botanical Plant (Left rock bank)
    gltfLoader.load(
      "/models/plant.glb",
      (gltf) => {
        const plant = gltf.scene;
        plant.scale.set(1.4, 1.4, 1.4);
        plant.position.set(-2.0, 0.15, -0.2);
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

    // Botanical Glass Flowers (Right rock bank)
    gltfLoader.load(
      "/models/flowers.glb",
      (gltf) => {
        const flowers = gltf.scene;
        flowers.scale.set(7.5, 7.5, 7.5);
        flowers.position.set(2.35, 0.28, 0.4);
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

    // 7. Kinetic Fluid Dynamics & Mouse Parallax Loop
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.7;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMouseMove);

    const getResponsiveCameraConfig = (w: number, h: number) => {
      const aspect = w / h;
      if (aspect < 0.8) {
        // Mobile portrait: wider view so rocks and orb fit proportionally
        return { z: 11.5, y: 1.5, lookY: 0.8, pearlScale: 0.7 };
      } else if (aspect < 1.2) {
        // Tablet portrait / square
        return { z: 9.0, y: 1.6, lookY: 0.85, pearlScale: 0.85 };
      }
      // Desktop landscape
      return { z: 6.8, y: 1.7, lookY: 0.9, pearlScale: 1.0 };
    };

    let camConfig = getResponsiveCameraConfig(width, height);
    camera.position.set(0, camConfig.y, camConfig.z);
    camera.lookAt(0, camConfig.lookY, 0);
    pearl.scale.set(camConfig.pearlScale, camConfig.pearlScale, camConfig.pearlScale);

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camConfig = getResponsiveCameraConfig(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      pearl.scale.set(camConfig.pearlScale, camConfig.pearlScale, camConfig.pearlScale);
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let animationId: number;
    let startTime = performance.now();

    // Cache water plane vertex positions for fluid motion
    const waterPos = waterGeo.attributes.position;
    const initialY = new Float32Array(waterPos.count);
    for (let i = 0; i < waterPos.count; i++) {
      initialY[i] = waterPos.getY(i);
    }

    const animate = () => {
      const elapsed = (performance.now() - startTime) * 0.001;

      // 1. Smooth responsive camera inertia with adaptive distance
      targetX += (mouseX - targetX) * 0.045;
      targetY += (mouseY - targetY) * 0.045;

      camera.position.x = targetX * 1.4;
      camera.position.y = camConfig.y - targetY * 0.5;
      camera.position.z = camConfig.z;
      camera.lookAt(0, camConfig.lookY, 0);

      // 2. Pearl breathing float & smooth rotation
      pearl.position.y = 1.35 + Math.sin(elapsed * 1.3) * 0.04;
      pearl.rotation.y = elapsed * 0.14;

      // 3. Kinetic water wave ripples
      for (let i = 0; i < waterPos.count; i++) {
        const x = waterPos.getX(i);
        const z = waterPos.getZ(i);
        const wave = Math.sin(x * 1.5 + elapsed * 1.8) * 0.018 +
                     Math.cos(z * 1.5 + elapsed * 1.6) * 0.018 +
                     Math.sin((x + z) * 2.0 + elapsed * 2.2) * 0.012;
        waterPos.setY(i, initialY[i] + wave);
      }
      waterPos.needsUpdate = true;
      waterGeo.computeVertexNormals();

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
