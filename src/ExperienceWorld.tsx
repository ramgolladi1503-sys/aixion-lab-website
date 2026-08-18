import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type ExperienceWorldProps = {
  storyId: string;
};

function roundedRectGeometry(width: number, depth: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -depth / 2;
  const r = Math.min(radius, width / 2, depth / 2);

  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + depth - r);
  shape.quadraticCurveTo(x + width, y + depth, x + width - r, y + depth);
  shape.lineTo(x + r, y + depth);
  shape.quadraticCurveTo(x, y + depth, x, y + depth - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: height,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: Math.min(0.08, height * 0.28),
    bevelThickness: Math.min(0.08, height * 0.28),
    curveSegments: 6,
  });
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, -height / 2, 0);
  geometry.computeVertexNormals();
  return geometry;
}

export default function ExperienceWorld({ storyId }: ExperienceWorldProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 760px)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true, powerPreference: 'high-performance' });
    } catch {
      host.dataset.webgl = 'unavailable';
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = !mobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.05 : 1.5));
    renderer.domElement.className = 'experience-world-canvas';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf5eee5, mobile ? 0.023 : 0.016);

    const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 80);
    camera.position.set(0.45, 5.95, 11.25);
    camera.lookAt(0, 0.08, 0);

    const world = new THREE.Group();
    world.rotation.y = -0.16;
    world.rotation.x = -0.025;
    world.scale.setScalar(mobile ? 0.9 : 1.04);
    scene.add(world);

    const disposableGeometries = new Set<THREE.BufferGeometry>();
    const disposableMaterials = new Set<THREE.Material>();
    const trackGeometry = <T extends THREE.BufferGeometry>(geometry: T) => {
      disposableGeometries.add(geometry);
      return geometry;
    };
    const trackMaterial = <T extends THREE.Material>(material: T) => {
      disposableMaterials.add(material);
      return material;
    };

    const ivory = trackMaterial(new THREE.MeshPhysicalMaterial({
      color: 0xf8f2e9,
      roughness: 0.34,
      metalness: 0.035,
      clearcoat: 0.58,
      clearcoatRoughness: 0.22,
    }));
    const ivorySoft = trackMaterial(new THREE.MeshPhysicalMaterial({
      color: 0xeee4d7,
      roughness: 0.45,
      metalness: 0.018,
      clearcoat: 0.32,
    }));
    const aqua = trackMaterial(new THREE.MeshPhysicalMaterial({
      color: 0xa9d8d5,
      transparent: true,
      opacity: 0.56,
      roughness: 0.11,
      metalness: 0.015,
      transmission: mobile ? 0 : 0.12,
      thickness: 0.16,
      clearcoat: 0.92,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
    }));
    const aquaGlow = trackMaterial(new THREE.MeshBasicMaterial({
      color: 0xbce9e5,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    const gold = trackMaterial(new THREE.MeshStandardMaterial({
      color: 0xd0a45f,
      metalness: 0.76,
      roughness: 0.24,
    }));
    const goldLine = trackMaterial(new THREE.LineBasicMaterial({
      color: 0xd6ad6a,
      transparent: true,
      opacity: 0.58,
    }));
    const glass = trackMaterial(new THREE.MeshPhysicalMaterial({
      color: 0xeaf8f5,
      transparent: true,
      opacity: mobile ? 0.18 : 0.25,
      roughness: 0.08,
      metalness: 0,
      transmission: mobile ? 0 : 0.58,
      thickness: 0.12,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      side: THREE.DoubleSide,
      depthWrite: false,
    }));
    const cloudMaterial = trackMaterial(new THREE.PointsMaterial({
      color: 0xffffff,
      size: mobile ? 0.2 : 0.24,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      sizeAttenuation: true,
    }));
    const cloudMeshMaterial = trackMaterial(new THREE.MeshLambertMaterial({
      color: 0xfffcf6,
      transparent: true,
      opacity: mobile ? 0.13 : 0.18,
      depthWrite: false,
    }));

    scene.add(new THREE.HemisphereLight(0xfffbf2, 0x9bb0ae, 2.8));
    const key = new THREE.DirectionalLight(0xfff6e7, 5.9);
    key.position.set(-4, 10, 7);
    key.castShadow = !mobile;
    key.shadow.mapSize.set(mobile ? 512 : 1024, mobile ? 512 : 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 32;
    key.shadow.camera.left = -10;
    key.shadow.camera.right = 10;
    key.shadow.camera.top = 10;
    key.shadow.camera.bottom = -10;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xbce7e4, 1.45);
    fill.position.set(7, 4, -5);
    scene.add(fill);

    const rim = new THREE.PointLight(0xffdeb0, 15, 24, 2);
    rim.position.set(0, 4.7, 2.7);
    scene.add(rim);

    const poolBase = new THREE.Mesh(
      trackGeometry(roundedRectGeometry(6.45, 5.05, 0.25, 0.66)),
      ivorySoft,
    );
    poolBase.position.y = -0.32;
    poolBase.receiveShadow = !mobile;
    world.add(poolBase);

    const pool = new THREE.Mesh(
      trackGeometry(roundedRectGeometry(5.96, 4.58, 0.1, 0.56)),
      aqua,
    );
    pool.position.y = -0.08;
    world.add(pool);

    const poolUnderlight = new THREE.Mesh(
      trackGeometry(roundedRectGeometry(5.55, 4.15, 0.02, 0.5)),
      aquaGlow,
    );
    poolUnderlight.position.y = -0.015;
    world.add(poolUnderlight);

    const mapRing = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(1.5, 0.018, 8, 84)),
      gold,
    );
    mapRing.rotation.x = Math.PI / 2;
    mapRing.position.y = 0.055;
    world.add(mapRing);

    const mapRing2 = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.92, 0.013, 8, 72)),
      aquaGlow,
    );
    mapRing2.rotation.x = Math.PI / 2;
    mapRing2.position.y = 0.068;
    world.add(mapRing2);

    // Calm concentric guide lines on the aqua plane — visual metaphor, not telemetry.
    for (let i = 1; i <= 4; i += 1) {
      const guide = new THREE.Mesh(
        trackGeometry(new THREE.TorusGeometry(0.38 + i * 0.34, 0.006, 6, 64)),
        i % 2 ? goldLine : aquaGlow,
      );
      guide.rotation.x = Math.PI / 2;
      guide.position.y = 0.07;
      world.add(guide);
    }

    const core = new THREE.Mesh(trackGeometry(new THREE.SphereGeometry(0.32, 32, 32)), aqua);
    core.position.set(0, 0.53, 0);
    world.add(core);

    const coreHalo = new THREE.Mesh(trackGeometry(new THREE.SphereGeometry(0.5, 24, 24)), aquaGlow);
    coreHalo.position.copy(core.position);
    world.add(coreHalo);

    type IslandSpec = { x: number; z: number; scale: number; mountain?: boolean; levels: number };
    const islandSpecs: IslandSpec[] = [
      { x: -3.65, z: 2.55, scale: 0.95, mountain: true, levels: 2 },
      { x: 3.52, z: 2.48, scale: 0.93, levels: 3 },
      { x: -3.76, z: -2.56, scale: 0.85, levels: 3 },
      { x: 3.62, z: -2.62, scale: 0.87, mountain: true, levels: 2 },
      { x: 0, z: 3.82, scale: 0.86, mountain: true, levels: 3 },
      { x: 0.28, z: -3.78, scale: 0.76, levels: 2 },
    ];

    const islands: THREE.Group[] = [];

    const createIsland = (spec: IslandSpec, index: number) => {
      const group = new THREE.Group();
      group.position.set(spec.x, 0.02 + (index % 2) * 0.04, spec.z);
      group.scale.setScalar(spec.scale);

      const platform = new THREE.Mesh(
        trackGeometry(roundedRectGeometry(2.6, 1.78, 0.25, 0.35)),
        ivory,
      );
      platform.castShadow = !mobile;
      platform.receiveShadow = !mobile;
      group.add(platform);

      const accent = new THREE.Mesh(
        trackGeometry(roundedRectGeometry(2.38, 1.56, 0.045, 0.31)),
        gold,
      );
      accent.position.y = 0.165;
      group.add(accent);

      const top = new THREE.Mesh(
        trackGeometry(roundedRectGeometry(2.3, 1.49, 0.11, 0.29)),
        ivorySoft,
      );
      top.position.y = 0.245;
      group.add(top);

      for (let level = 0; level < spec.levels; level += 1) {
        const radius = 0.55 - level * 0.108;
        const tower = new THREE.Mesh(
          trackGeometry(new THREE.CylinderGeometry(radius, radius * 1.08, 0.19, 40)),
          level === 1 ? aqua : ivory,
        );
        tower.position.set((level % 2) * 0.08, 0.4 + level * 0.19, 0);
        tower.castShadow = !mobile;
        group.add(tower);

        const ring = new THREE.Mesh(
          trackGeometry(new THREE.TorusGeometry(radius * 0.83, 0.018, 8, 40)),
          gold,
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.set(tower.position.x, tower.position.y + 0.105, 0);
        group.add(ring);
      }

      const dome = new THREE.Mesh(trackGeometry(new THREE.SphereGeometry(0.23, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2)), aqua);
      dome.position.set(0.46, 0.43, -0.3);
      group.add(dome);

      const antenna = new THREE.Mesh(trackGeometry(new THREE.CylinderGeometry(0.015, 0.015, 0.78, 10)), gold);
      antenna.position.set(0, 0.84 + spec.levels * 0.17, 0);
      group.add(antenna);

      const marker = new THREE.Mesh(trackGeometry(new THREE.SphereGeometry(0.095, 16, 16)), aqua);
      marker.position.set(0, antenna.position.y + 0.43, 0);
      group.add(marker);

      if (spec.mountain) {
        const mountain = new THREE.Mesh(trackGeometry(new THREE.ConeGeometry(0.49, 1.02, 7)), ivorySoft);
        mountain.position.set(-0.62, 0.69, 0.16);
        mountain.rotation.y = index * 0.31;
        mountain.castShadow = !mobile;
        group.add(mountain);
        const peak = new THREE.Mesh(trackGeometry(new THREE.ConeGeometry(0.26, 0.67, 7)), ivory);
        peak.position.set(-0.96, 0.54, -0.22);
        group.add(peak);
      }

      // Fine architectural spires echo the approved concept art without implying telemetry.
      for (let i = 0; i < (mobile ? 2 : 5); i += 1) {
        const angle = (i / 5) * Math.PI * 2 + index * 0.42;
        const spire = new THREE.Mesh(trackGeometry(new THREE.CylinderGeometry(0.008, 0.014, 0.34 + (i % 2) * 0.18, 7)), gold);
        spire.position.set(Math.cos(angle) * 0.84, 0.47, Math.sin(angle) * 0.48);
        group.add(spire);
      }

      world.add(group);
      islands.push(group);
      return group;
    };

    islandSpecs.forEach(createIsland);

    // Gold pathways tie each island to the intelligence plane without fake telemetry.
    islandSpecs.forEach((spec, index) => {
      const points = [
        new THREE.Vector3(spec.x * 0.84, 0.18, spec.z * 0.84),
        new THREE.Vector3(spec.x * 0.5, 0.145 + (index % 2) * 0.04, spec.z * 0.5),
        new THREE.Vector3(0, 0.13, 0),
      ];
      const curve = new THREE.CatmullRomCurve3(points);
      const positions = curve.getPoints(34);
      const geometry = trackGeometry(new THREE.BufferGeometry().setFromPoints(positions));
      world.add(new THREE.Line(geometry, goldLine));
    });

    // Lightweight point atmosphere around the world.
    const cloudCount = mobile ? 70 : 145;
    const cloudPositions = new Float32Array(cloudCount * 3);
    for (let i = 0; i < cloudCount; i += 1) {
      const angle = (i / cloudCount) * Math.PI * 2 + (i % 7) * 0.23;
      const radius = 5.5 + (i % 13) * 0.19;
      cloudPositions[i * 3] = Math.cos(angle) * radius;
      cloudPositions[i * 3 + 1] = -1.02 + ((i * 17) % 31) / 22;
      cloudPositions[i * 3 + 2] = Math.sin(angle) * radius - 0.65;
    }
    const cloudGeometry = trackGeometry(new THREE.BufferGeometry());
    cloudGeometry.setAttribute('position', new THREE.BufferAttribute(cloudPositions, 3));
    const clouds = new THREE.Points(cloudGeometry, cloudMaterial);
    scene.add(clouds);

    // Soft cloud banks give the scene the luminous depth of the approved references.
    const cloudSphereGeometry = trackGeometry(new THREE.SphereGeometry(0.78, mobile ? 10 : 16, mobile ? 8 : 12));
    const cloudBanks = new THREE.Group();
    const cloudBankSpecs = mobile
      ? [[-4.8, -1.6, 2.8], [4.9, -1.4, 2.1], [0, -1.8, -5.4]]
      : [[-5.2, -1.4, 3.2], [5.3, -1.35, 2.8], [-5.7, -1.5, -2.4], [5.8, -1.45, -2.2], [0.4, -1.75, -5.6], [0, -1.7, 5.5]];
    cloudBankSpecs.forEach(([x, y, z], bankIndex) => {
      for (let i = 0; i < (mobile ? 4 : 7); i += 1) {
        const puff = new THREE.Mesh(cloudSphereGeometry, cloudMeshMaterial);
        puff.position.set(x + Math.sin(i * 1.7 + bankIndex) * 0.75, y + (i % 3) * 0.18, z + Math.cos(i * 1.3 + bankIndex) * 0.62);
        puff.scale.set(1.2 + (i % 2) * 0.5, 0.72 + (i % 3) * 0.12, 1.05 + ((i + 1) % 2) * 0.4);
        cloudBanks.add(puff);
      }
    });
    scene.add(cloudBanks);

    // Floating glass architecture. Text remains accessible in DOM overlays.
    const glassPanels: THREE.Mesh[] = [];
    const glassPanelSpecs = [
      [-2.65, 2.35, 1.15, -0.12],
      [2.75, 2.25, 0.72, 0.12],
      [-1.82, 1.92, -2.55, 0.08],
      [2.28, 1.84, -2.48, -0.08],
    ] as const;
    glassPanelSpecs.forEach(([x, y, z, rotY]) => {
      const pane = new THREE.Mesh(trackGeometry(roundedRectGeometry(1.22, 0.055, 1.58, 0.12)), glass);
      pane.position.set(x, y, z);
      pane.rotation.z = Math.PI / 2;
      pane.rotation.y = rotY;
      world.add(pane);
      glassPanels.push(pane);
    });

    const markerPositions = [
      [-2.45, 2.5, 0.7],
      [2.7, 2.25, 0.35],
      [-1.65, 2.0, -2.3],
      [2.15, 1.85, -2.35],
    ] as const;
    markerPositions.forEach(([x, y, z], index) => {
      const ring = new THREE.Mesh(trackGeometry(new THREE.TorusGeometry(0.18, 0.02, 8, 30)), gold);
      ring.position.set(x, y, z);
      ring.rotation.set(Math.PI / 2, 0.18 * index, 0);
      world.add(ring);
      const orb = new THREE.Mesh(trackGeometry(new THREE.SphereGeometry(0.115, 18, 18)), index % 2 ? aqua : ivory);
      orb.position.set(x, y, z);
      world.add(orb);
    });

    let width = 1;
    let height = 1;
    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    let visible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible && !document.hidden && !raf) raf = window.requestAnimationFrame(renderFrame);
    }, { threshold: 0.02 });
    visibilityObserver.observe(host);

    const pointerTarget = new THREE.Vector2();
    const pointer = new THREE.Vector2();
    const onPointerMove = (event: PointerEvent) => {
      if (mobile || prefersReducedMotion) return;
      const rect = host.getBoundingClientRect();
      pointerTarget.x = ((event.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
      pointerTarget.y = ((event.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
    };
    const onPointerLeave = () => pointerTarget.set(0, 0);
    host.addEventListener('pointermove', onPointerMove, { passive: true });
    host.addEventListener('pointerleave', onPointerLeave);

    const getProgress = () => {
      const story = document.getElementById(storyId);
      if (!story) return 0;
      const rect = story.getBoundingClientRect();
      const distance = Math.max(1, story.offsetHeight - window.innerHeight);
      return THREE.MathUtils.clamp(-rect.top / distance, 0, 1);
    };

    const clock = new THREE.Clock();
    let raf = 0;

    function renderFrame() {
      raf = 0;
      if (!visible || document.hidden) return;

      const elapsed = clock.getElapsedTime();
      const progress = prefersReducedMotion ? 0.34 : getProgress();
      pointer.lerp(pointerTarget, prefersReducedMotion ? 1 : 0.045);

      const eased = progress * progress * (3 - 2 * progress);
      const compact = mobile ? 0.74 : 1;
      const baseX = THREE.MathUtils.lerp(0.48, -0.62, eased);
      const baseY = THREE.MathUtils.lerp(5.92, 4.65, eased);
      const baseZ = THREE.MathUtils.lerp(11.2, 8.9, eased) / compact;

      camera.position.x = baseX + pointer.x * (mobile ? 0 : 0.2);
      camera.position.y = baseY - pointer.y * (mobile ? 0 : 0.13);
      camera.position.z = baseZ;
      camera.lookAt(THREE.MathUtils.lerp(0, -0.14, eased), 0.08, THREE.MathUtils.lerp(0.12, -0.48, eased));

      world.rotation.y = -0.16 + eased * 0.29 + pointer.x * 0.021;
      world.rotation.x = -0.025 + pointer.y * 0.01;
      world.position.y = THREE.MathUtils.lerp(0, 0.14, eased);

      if (!prefersReducedMotion) {
        core.position.y = 0.53 + Math.sin(elapsed * 0.54) * 0.032;
        coreHalo.position.copy(core.position);
        coreHalo.scale.setScalar(1 + Math.sin(elapsed * 0.61) * 0.028);
        mapRing.rotation.z = elapsed * 0.03;
        mapRing2.rotation.z = -elapsed * 0.024;
        islands.forEach((island, index) => {
          island.position.y = 0.02 + (index % 2) * 0.04 + Math.sin(elapsed * 0.3 + index * 0.82) * 0.012;
        });
        glassPanels.forEach((pane, index) => {
          pane.position.y += Math.sin(elapsed * 0.24 + index) * 0.00028;
        });
        clouds.rotation.y = elapsed * 0.0022;
        cloudBanks.rotation.y = elapsed * 0.0008;
      }

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(renderFrame);
    }

    const start = () => {
      if (!raf && visible && !document.hidden) raf = window.requestAnimationFrame(renderFrame);
    };
    const onVisibility = () => start();
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      disposableGeometries.forEach((geometry) => geometry.dispose());
      disposableMaterials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [storyId]);

  return <div ref={hostRef} className="experience-world" data-webgl="ready" />;
}
