"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export function UnseenArchitecturalScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene & Atmosphere Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 20000);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.22;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Realistic Three.js Ocean Water Mesh
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    const textureLoader = new THREE.TextureLoader();
    const waterNormals = textureLoader.load("/textures/waternormals.jpg", (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    });

    const sun = new THREE.Vector3();

    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined,
    });
    water.rotation.x = -Math.PI / 2;
    scene.add(water);

    // 3. Three.js Atmospheric Skydome
    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

    const skyUniforms = sky.material.uniforms;
    skyUniforms["turbidity"].value = 10;
    skyUniforms["rayleigh"].value = 2;
    skyUniforms["mieCoefficient"].value = 0.005;
    skyUniforms["mieDirectionalG"].value = 0.8;

    // Atmospheric Sun Calculation
    const parameters = {
      elevation: 2,
      azimuth: 180,
    };

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const sceneEnv = new THREE.Scene();
    let renderTarget: THREE.WebGLRenderTarget | undefined;

    function updateSun() {
      const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
      const theta = THREE.MathUtils.degToRad(parameters.azimuth);

      sun.setFromSphericalCoords(1, phi, theta);

      sky.material.uniforms["sunPosition"].value.copy(sun);
      water.material.uniforms["sunDirection"].value.copy(sun).normalize();

      if (renderTarget !== undefined) renderTarget.dispose();

      sceneEnv.add(sky);
      renderTarget = pmremGenerator.fromScene(sceneEnv);
      scene.add(sky);

      scene.environment = renderTarget.texture;
    }

    updateSun();

    // Natural Sunlight & Ambient Lighting for Rocks and Flora
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff0dd, 2.8);
    dirLight.position.set(30, 40, 50);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // 4. Central Architectural Stone Platform & Floating Kinetic Orb
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0xead9d2,
      roughness: 0.88,
      metalness: 0.05,
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

    // Natural stone formation rising out of the water on both flanks
    createRock([32, 16, 26], [42, 6, -20], 0.4);
    createRock([20, 12, 18], [55, 4, 10], 0.8);
    createRock([30, 18, 24], [-42, 7, -25], 1.2);
    createRock([18, 10, 16], [-28, 4, 15], 0.2);

    // Iridescent Pearl Orb (Floating Kinetic Centerpiece)
    const pearlGeo = new THREE.SphereGeometry(11, 64, 64);
    const pearlMat = new THREE.MeshPhysicalMaterial({
      color: 0xfffcf9,
      roughness: 0.04,
      metalness: 0.05,
      transmission: 0.55,
      ior: 1.5,
      iridescence: 1.0,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [100, 450],
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });
    const pearl = new THREE.Mesh(pearlGeo, pearlMat);
    pearl.position.set(0, 14, 5);
    pearl.castShadow = true;
    scene.add(pearl);

    // 5. Botanical 3D Nature Assets on Rock Outcrops
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    // Botanical Plant (Left Outcrop)
    gltfLoader.load(
      "/models/plant.glb",
      (gltf) => {
        const plant = gltf.scene;
        plant.scale.set(24, 24, 24);
        plant.position.set(-42, 12, -35);
        plant.rotation.y = 0.5;
        scene.add(plant);
      },
      undefined,
      (err) => console.warn("Plant load:", err)
    );

    // Botanical Glass Flowers (Right Outcrop)
    gltfLoader.load(
      "/models/flowers.glb",
      (gltf) => {
        const flowers = gltf.scene;
        flowers.scale.set(130, 130, 130);
        flowers.position.set(45, 9, -25);
        flowers.rotation.y = -0.3;
        scene.add(flowers);
      },
      undefined,
      (err) => console.warn("Flowers load:", err)
    );

    // 6. Responsive Camera Framing & Dynamic Inertia
    const getResponsiveCameraConfig = (w: number, h: number) => {
      const aspect = w / h;
      if (aspect < 0.8) {
        // Mobile portrait: further back and higher elevation
        return { x: 0, y: 22, z: 140, lookY: 15, pearlScale: 0.8 };
      } else if (aspect < 1.2) {
        // Tablet
        return { x: 0, y: 20, z: 115, lookY: 15, pearlScale: 0.9 };
      }
      // Desktop landscape
      return { x: 0, y: 16, z: 95, lookY: 14, pearlScale: 1.0 };
    };

    let camConfig = getResponsiveCameraConfig(width, height);
    camera.position.set(camConfig.x, camConfig.y, camConfig.z);
    camera.lookAt(0, camConfig.lookY, 0);

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

    // 7. Kinetic Parallax & Realtime Fluid Animation Loop
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    let animationId: number;
    let startTime = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTime) * 0.001;

      // Realtime ocean wave optics animation
      water.material.uniforms["time"].value += 1.0 / 60.0;

      // Smooth responsive camera inertia
      targetX += (mouseX - targetX) * 0.045;
      targetY += (mouseY - targetY) * 0.045;

      camera.position.x = camConfig.x + targetX * 14;
      camera.position.y = camConfig.y - targetY * 6;
      camera.position.z = camConfig.z;
      camera.lookAt(0, camConfig.lookY, 0);

      // Kinetic pearl breathing float & gentle rotation
      pearl.position.y = 14 + Math.sin(elapsed * 1.4) * 0.9;
      pearl.rotation.y = elapsed * 0.15;

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
      pmremGenerator.dispose();
      if (renderTarget) renderTarget.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0, zIndex: 1 }} />;
}

