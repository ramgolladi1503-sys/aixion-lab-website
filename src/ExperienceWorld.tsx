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
    curveSegments: 5,
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
    renderer.toneMappingExposure = 1.04;
    renderer.shadowMap.enabled = !mobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.55));
    renderer.domElement.className = 'experience-world-canvas';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xe6dccd, mobile ? 0.031 : 0.024);

    const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 80);
    camera.position.set(0.5, 6.1, 11.2);
    camera.lookAt(0, 0, 0);

    const world = new THREE.Group();
    world.rotation.y = -0.18;
    world.rotation.x = -0.02;
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
      color: 0xf0e8dc,
      roughness: 0.43,
      metalness: 0.06,
      clearcoat: 0.44,
      clearcoatRoughness: 0.34,
    }));
    const ivorySoft = trackMaterial(new THREE.MeshPhysicalMaterial({
      color: 0xe4d8c9,
      roughness: 0.55,
      metalness: 0.02,
      clearcoat: 0.24,
    }));
    const aqua = trackMaterial(new THREE.MeshPhysicalMaterial({
      color: 0x82b8b6,
      transparent: true,
      opacity: 0.46,
      roughness: 0.17,
      metalness: 0.04,
      clearcoat: 0.82,
      clearcoatRoughness: 0.16,
      side: THREE.DoubleSide,
    }));
    const aquaGlow = trackMaterial(new THREE.MeshBasicMaterial({
      color: 0x87c8c6,
      transparent: true,
      opacity: 0.26,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    const gold = trackMaterial(new THREE.MeshStandardMaterial({
      color: 0xc7964a,
      metalness: 0.72,
      roughness: 0.31,
    }));
    const goldLine = trackMaterial(new THREE.LineBasicMaterial({
      color: 0xc89b5b,
      transparent: true,
      opacity: 0.48,
    }));
    const cloudMaterial = trackMaterial(new THREE.PointsMaterial({
      color: 0xffffff,
      size: mobile ? 0.13 : 0.16,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      sizeAttenuation: true,
    }));

    scene.add(new THREE.HemisphereLight(0xfff7ea, 0x78888c, 2.35));
    const key = new THREE.DirectionalLight(0xfff0d4, 5.2);
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

    const fill = new THREE.DirectionalLight(0xaee7e3, 1.1);
    fill.position.set(7, 4, -5);
    scene.add(fill);

    const rim = new THREE.PointLight(0xffd99a, 13, 22, 2);
    rim.position.set(0, 4.5, 2.5);
    scene.add(rim);

    // Central glass intelligence plane.
    const poolBase = new THREE.Mesh(
      trackGeometry(roundedRectGeometry(6.2, 4.9, 0.22, 0.62)),
      ivorySoft,
    );
    poolBase.position.y = -0.3;
    poolBase.receiveShadow = !mobile;
    world.add(poolBase);

    const pool = new THREE.Mesh(
      trackGeometry(roundedRectGeometry(5.72, 4.42, 0.09, 0.54)),
      aqua,
    );
    pool.position.y = -0.1;
    world.add(pool);

    const mapRing = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(1.42, 0.018, 8, 72)),
      gold,
    );
    mapRing.rotation.x = Math.PI / 2;
    mapRing.position.y = 0.03;
    world.add(mapRing);

    const mapRing2 = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.88, 0.014, 8, 64)),
      aquaGlow,
    );
    mapRing2.rotation.x = Math.PI / 2;
    mapRing2.position.y = 0.05;
    world.add(mapRing2);

    const core = new THREE.Mesh(trackGeometry(new THREE.SphereGeometry(0.31, 32, 32)), aqua);
    core.position.set(0, 0.5, 0);
    world.add(core);

    const coreHalo = new THREE.Mesh(trackGeometry(new THREE.SphereGeometry(0.47, 24, 24)), aquaGlow);
    coreHalo.position.copy(core.position);
    world.add(coreHalo);

    type IslandSpec = { x: number; z: number; scale: number; mountain?: boolean; levels: number };
    const islandSpecs: IslandSpec[] = [
      { x: -3.55, z: 2.55, scale: 0.92, mountain: true, levels: 2 },
      { x: 3.42, z: 2.45, scale: 0.9, levels: 3 },
      { x: -3.68, z: -2.5, scale: 0.82, levels: 3 },
      { x: 3.55, z: -2.58, scale: 0.84, mountain: true, levels: 2 },
      { x: 0, z: 3.75, scale: 0.83, mountain: true, levels: 3 },
      { x: 0.25, z: -3.72, scale: 0.72, levels: 2 },
    ];

    const islands: THREE.Group[] = [];

    const createIsland = (spec: IslandSpec, index: number) => {
      const group = new THREE.Group();
      group.position.set(spec.x, 0.02 + (index % 2) * 0.04, spec.z);
      group.scale.setScalar(spec.scale);

      const platform = new THREE.Mesh(
        trackGeometry(roundedRectGeometry(2.55, 1.72, 0.24, 0.34)),
        ivory,
      );
      platform.castShadow = !mobile;
      platform.receiveShadow = !mobile;
      group.add(platform);

      const accent = new THREE.Mesh(
        trackGeometry(roundedRectGeometry(2.32, 1.5, 0.045, 0.3)),
        gold,
      );
      accent.position.y = 0.16;
      group.add(accent);

      const top = new THREE.Mesh(
        trackGeometry(roundedRectGeometry(2.25, 1.43, 0.11, 0.28)),
        ivorySoft,
      );
      top.position.y = 0.24;
      group.add(top);

      for (let level = 0; level < spec.levels; level += 1) {
        const radius = 0.52 - level * 0.105;
        const tower = new THREE.Mesh(
          trackGeometry(new THREE.CylinderGeometry(radius, radius * 1.08, 0.18, 36)),
          level === 1 ? aqua : ivory,
        );
        tower.position.set((level % 2) * 0.08, 0.39 + level * 0.18, 0);
        tower.castShadow = !mobile;
        group.add(tower);

        const ring = new THREE.Mesh(
          trackGeometry(new THREE.TorusGeometry(radius * 0.83, 0.018, 8, 36)),
          gold,
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.set(tower.position.x, tower.position.y + 0.1, 0);
        group.add(ring);
      }

      const antenna = new THREE.Mesh(trackGeometry(new THREE.CylinderGeometry(0.015, 0.015, 0.75, 10)), gold);
      antenna.position.set(0, 0.83 + spec.levels * 0.16, 0);
      group.add(antenna);

      const marker = new THREE.Mesh(trackGeometry(new THREE.SphereGeometry(0.09, 16, 16)), aqua);
      marker.position.set(0, antenna.position.y + 0.42, 0);
      group.add(marker);

      if (spec.mountain) {
        const mountain = new THREE.Mesh(trackGeometry(new THREE.ConeGeometry(0.46, 0.95, 7)), ivorySoft);
        mountain.position.set(-0.62, 0.66, 0.16);
        mountain.rotation.y = index * 0.31;
        mountain.castShadow = !mobile;
        group.add(mountain);
        const peak = new THREE.Mesh(trackGeometry(new THREE.ConeGeometry(0.24, 0.62, 7)), ivory);
        peak.position.set(-0.94, 0.51, -0.22);
        group.add(peak);
      }

      world.add(group);
      islands.push(group);
      return group;
    };

    islandSpecs.forEach(createIsland);

    // Gold pathways tie each island to the intelligence plane without fake telemetry.
    islandSpecs.forEach((spec, index) => {
      const points = [
        new THREE.Vector3(spec.x * 0.82, 0.17, spec.z * 0.82),
        new THREE.Vector3(spec.x * 0.47, 0.13 + (index % 2) * 0.04, spec.z * 0.47),
        new THREE.Vector3(0, 0.12, 0),
      ];
      const curve = new THREE.CatmullRomCurve3(points);
      const positions = curve.getPoints(28);
      const geometry = trackGeometry(new THREE.BufferGeometry().setFromPoints(positions));
      world.add(new THREE.Line(geometry, goldLine));
    });

    // Air/cloud depth: lightweight points rather than heavy volumetric effects.
    const cloudCount = mobile ? 55 : 110;
    const cloudPositions = new Float32Array(cloudCount * 3);
    for (let i = 0; i < cloudCount; i += 1) {
      const angle = (i / cloudCount) * Math.PI * 2 + (i % 7) * 0.23;
      const radius = 5.7 + (i % 13) * 0.19;
      cloudPositions[i * 3] = Math.cos(angle) * radius;
      cloudPositions[i * 3 + 1] = -0.8 + ((i * 17) % 31) / 18;
      cloudPositions[i * 3 + 2] = Math.sin(angle) * radius - 0.8;
    }
    const cloudGeometry = trackGeometry(new THREE.BufferGeometry());
    cloudGeometry.setAttribute('position', new THREE.BufferAttribute(cloudPositions, 3));
    const clouds = new THREE.Points(cloudGeometry, cloudMaterial);
    scene.add(clouds);

    // Floating glass markers above the world.
    const markerPositions = [
      [-2.45, 2.3, 0.7],
      [2.7, 2.05, 0.35],
      [-1.65, 1.8, -2.3],
      [2.15, 1.65, -2.35],
    ] as const;
    markerPositions.forEach(([x, y, z], index) => {
      const ring = new THREE.Mesh(trackGeometry(new THREE.TorusGeometry(0.17, 0.02, 8, 28)), gold);
      ring.position.set(x, y, z);
      ring.rotation.set(Math.PI / 2, 0.18 * index, 0);
      world.add(ring);
      const orb = new THREE.Mesh(trackGeometry(new THREE.SphereGeometry(0.11, 16, 16)), index % 2 ? aqua : ivory);
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

    const renderFrame = () => {
      raf = 0;
      if (!visible || document.hidden) return;

      const elapsed = clock.getElapsedTime();
      const progress = prefersReducedMotion ? 0.38 : getProgress();
      pointer.lerp(pointerTarget, prefersReducedMotion ? 1 : 0.055);

      const eased = progress * progress * (3 - 2 * progress);
      const compact = mobile ? 0.72 : 1;
      const baseX = THREE.MathUtils.lerp(0.55, -0.7, eased);
      const baseY = THREE.MathUtils.lerp(6.15, 4.55, eased);
      const baseZ = THREE.MathUtils.lerp(11.3, 8.75, eased) / compact;

      camera.position.x = baseX + pointer.x * (mobile ? 0 : 0.24);
      camera.position.y = baseY - pointer.y * (mobile ? 0 : 0.16);
      camera.position.z = baseZ;
      camera.lookAt(THREE.MathUtils.lerp(0, -0.2, eased), 0.05, THREE.MathUtils.lerp(0.15, -0.55, eased));

      world.rotation.y = -0.18 + eased * 0.34 + pointer.x * 0.025;
      world.rotation.x = -0.02 + pointer.y * 0.012;
      world.position.y = THREE.MathUtils.lerp(0, 0.18, eased);

      if (!prefersReducedMotion) {
        core.position.y = 0.5 + Math.sin(elapsed * 0.65) * 0.045;
        coreHalo.position.copy(core.position);
        coreHalo.scale.setScalar(1 + Math.sin(elapsed * 0.72) * 0.035);
        mapRing.rotation.z = elapsed * 0.045;
        mapRing2.rotation.z = -elapsed * 0.035;
        islands.forEach((island, index) => {
          island.position.y = 0.02 + (index % 2) * 0.04 + Math.sin(elapsed * 0.38 + index * 0.82) * 0.016;
        });
        clouds.rotation.y = elapsed * 0.004;
      }

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(renderFrame);
    };

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
