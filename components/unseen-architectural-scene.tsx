"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

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
    scene.fog = new THREE.FogExp2("#efded9", 0.024);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.6, 6.4);
    camera.lookAt(0, 1.0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // Warm Architectural Ambient Light
    const ambientLight = new THREE.AmbientLight(0xfff7f0, 2.8);
    scene.add(ambientLight);

    // Skylight Oculus Sunbeam Light
    const oculusSun = new THREE.DirectionalLight(0xfffaf2, 3.2);
    oculusSun.position.set(0, 12, 1);
    oculusSun.castShadow = true;
    oculusSun.shadow.mapSize.width = 2048;
    oculusSun.shadow.mapSize.height = 2048;
    oculusSun.shadow.camera.near = 0.5;
    oculusSun.shadow.camera.far = 30;
    oculusSun.shadow.bias = -0.0001;
    scene.add(oculusSun);

    // Soft lateral bounce light
    const bounceLight = new THREE.DirectionalLight(0xf5e6de, 1.4);
    bounceLight.position.set(-6, 3, 4);
    scene.add(bounceLight);

    // 2. High-Resolution Architectural Curved Backdrop (The Biophilic Sanctuary)
    const textureLoader = new THREE.TextureLoader();
    const sanctuaryTex = textureLoader.load("/textures/sanctuary-room.jpg");
    sanctuaryTex.colorSpace = THREE.SRGBColorSpace;

    const bgPlaneGeo = new THREE.PlaneGeometry(16, 9);
    const bgPlaneMat = new THREE.MeshBasicMaterial({
      map: sanctuaryTex,
      depthWrite: false,
    });
    const bgPlane = new THREE.Mesh(bgPlaneGeo, bgPlaneMat);
    bgPlane.position.set(0, 1.6, -2.8);
    scene.add(bgPlane);

    // 3. Fluid Specular Water Surface with Wave Ripple Dynamics
    const waterGeo = new THREE.PlaneGeometry(12, 8, 128, 128);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0xeadfd8,
      roughness: 0.04,
      metalness: 0.5,
      transparent: true,
      opacity: 0.65,
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.set(0, -0.45, -0.4);
    water.receiveShadow = true;
    scene.add(water);

    // 4. Iridescent Pearl Orb (Kinetic Floating Core beneath Oculus)
    const pearlGeo = new THREE.SphereGeometry(0.72, 64, 64);
    const pearlMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.02,
      metalness: 0.04,
      transmission: 0.68,
      ior: 1.55,
      iridescence: 1.0,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [100, 480],
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    });
    const pearl = new THREE.Mesh(pearlGeo, pearlMat);
    pearl.position.set(0, 0.45, -0.6);
    pearl.castShadow = true;
    scene.add(pearl);

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
      pearl.position.y = 0.45 + Math.sin(elapsed * 1.3) * 0.04;
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
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0, zIndex: 1 }} />;
}
