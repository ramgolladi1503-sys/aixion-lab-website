"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";

type StaticReason = "reduced-motion" | "data-saver" | "low-resources" | "webgl-unavailable" | "context-lost" | "scene-error";
type SceneCanvasProps = {
  pointer: { current: { x: number; y: number } };
  progress: { current: number };
  view: { x: number; y: number };
  driftPaused: boolean;
  resetKey: number;
  onReady: () => void;
  onFailure: (reason: StaticReason) => void;
};

const particleVertex = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  varying float vAlpha;
  void main() {
    vec3 point = position;
    point.y += sin(uTime * 0.14 + aPhase) * 0.028;
    point.x += cos(uTime * 0.11 + aPhase * 1.7) * 0.018;
    vec4 viewPosition = modelViewMatrix * vec4(point, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = clamp(aSize * (260.0 / max(1.0, -viewPosition.z)), 0.7, 2.1);
    vAlpha = 0.2 + 0.38 * (0.5 + 0.5 * sin(uTime * 0.18 + aPhase));
  }
`;

const particleFragment = /* glsl */ `
  varying float vAlpha;
  void main() {
    vec2 centered = gl_PointCoord - vec2(0.5);
    float radius = length(centered);
    float edge = 1.0 - smoothstep(0.12, 0.5, radius);
    gl_FragColor = vec4(0.78, 0.59, 0.39, edge * vAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function createFoldedCurve() {
  const points: THREE.Vector3[] = [];
  const count = 64;
  for (let index = 0; index < count; index += 1) {
    const angle = (index / count) * Math.PI * 2;
    const radius = 1.18 + 0.16 * Math.cos(angle * 3 + 0.5) + 0.06 * Math.sin(angle * 5);
    points.push(new THREE.Vector3(
      radius * Math.cos(angle),
      0.34 * Math.sin(angle * 2) + 0.12 * Math.sin(angle * 3 + 0.4),
      (0.82 + 0.12 * Math.cos(angle * 2)) * Math.sin(angle),
    ));
  }
  return new THREE.CatmullRomCurve3(points, true, "centripetal", 0.5);
}

function createOrbitCurve() {
  const points: THREE.Vector3[] = [];
  const count = 64;
  for (let index = 0; index < count; index += 1) {
    const angle = (index / count) * Math.PI * 2;
    points.push(new THREE.Vector3(
      1.31 * Math.cos(angle),
      0.54 * Math.sin(angle) + 0.13 * Math.sin(angle * 2),
      0.74 * Math.sin(angle),
    ));
  }
  return new THREE.CatmullRomCurve3(points, true, "centripetal", 0.5);
}

const graphPositions: [number, number, number][] = [
  [-1.35, 0.72, 0.05], [-0.62, 1.03, -0.08], [0.02, 0.48, 0.12], [0.74, 0.91, -0.06],
  [1.38, 0.48, 0.08], [-1.08, -0.28, -0.11], [-0.38, -0.63, 0.1], [0.36, -0.18, -0.04],
  [1.05, -0.46, 0.12], [1.34, -1.0, -0.1], [0.02, -1.03, 0.04], [-0.79, -1.12, -0.05],
];

const systemPositions: [number, number, number][] = [
  [-1.17, 0.68, 0.02], [-1.5, 0.87, 0.02], [-0.84, 0.88, -0.08],
  [1.17, 0.68, -0.02], [1.5, 0.87, -0.02], [0.84, 0.88, 0.08],
  [-1.17, -0.68, -0.04], [-1.5, -0.87, -0.04], [-0.84, -0.88, 0.06],
  [1.17, -0.68, 0.04], [1.5, -0.87, 0.04], [0.84, -0.88, -0.06],
];

const graphEdges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [8, 9], [6, 10], [10, 11],
  [2, 6], [2, 7], [3, 7], [4, 8], [5, 11], [0, 3], [3, 9], [9, 6], [6, 0],
];

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
}

function pointOnArrival(index: number) {
  const angle = (index / 12) * Math.PI * 2;
  const radius = 1.18 + 0.16 * Math.cos(angle * 3 + 0.5) + 0.06 * Math.sin(angle * 5);
  return [
    radius * Math.cos(angle),
    0.34 * Math.sin(angle * 2) + 0.12 * Math.sin(angle * 3 + 0.4),
    (0.82 + 0.12 * Math.cos(angle * 2)) * Math.sin(angle),
  ] as [number, number, number];
}

function EngineeringNetwork({ progress, mobile }: { progress: { current: number }; mobile: boolean }) {
  const instances = useRef<THREE.InstancedMesh>(null);
  const connections = useRef<THREE.LineSegments>(null);
  const group = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const nodes = useMemo(() => graphPositions.map((_, index) => pointOnArrival(index)), []);
  const currentPositions = useMemo(() => graphPositions.map(() => new THREE.Vector3()), []);
  const linePositions = useMemo(() => new Float32Array(graphEdges.length * 6), []);
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    return geometry;
  }, [linePositions]);
  const nodeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#ffffff", vertexColors: true, roughness: 0.28, metalness: 0.12,
    emissive: "#3c6960", emissiveIntensity: 0.72, transparent: true, opacity: 0,
  }), []);
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: "#a9d2c8", transparent: true, opacity: 0, depthWrite: false }), []);
  const framesGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.9, 0.58, 0.16)), []);
  const frameMaterials = useMemo(() => ["#d2a77d", "#d7d0c2", "#83b8b1", "#c68d7d"].map((color) => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false })), []);
  const frameRefs = useRef<(THREE.LineSegments | null)[]>([]);
  const nodeTint = useMemo(() => ["#e0b58c", "#e9dfca", "#addbd1", "#dda396"].map((color) => new THREE.Color(color)), []);
  const frameTargets: [number, number, number][] = [[-1.17, 0.68, 0], [1.17, 0.68, 0], [-1.17, -0.68, 0], [1.17, -0.68, 0]];
  const frameStarts: [number, number, number][] = [graphPositions[0], graphPositions[4], graphPositions[11], graphPositions[9]];

  useEffect(() => () => {
    lineGeometry.dispose();
    nodeMaterial.dispose();
    lineMaterial.dispose();
    framesGeometry.dispose();
    frameMaterials.forEach((material) => material.dispose());
  }, [lineGeometry, nodeMaterial, lineMaterial, framesGeometry, frameMaterials]);

  useFrame(() => {
    const amount = progress.current;
    const graphIn = smoothstep(0.2, 0.5, amount);
    const systemsIn = smoothstep(0.69, 0.94, amount);
    const networkAlpha = smoothstep(0.24, 0.48, amount);
    if (group.current) {
      group.current.position.set(mobile ? 0.55 : 1.6, mobile ? 3.0 : 0.02, 0);
      group.current.scale.setScalar(mobile ? 0.68 : 0.7);
    }
    if (nodeMaterial) nodeMaterial.opacity = networkAlpha * (1 - systemsIn * 0.12);
    lineMaterial.opacity = networkAlpha * 0.74;

    if (instances.current && connections.current) {
      for (let index = 0; index < nodes.length; index += 1) {
        const [sx, sy, sz] = nodes[index];
        const [gx, gy, gz] = graphPositions[index];
        const [tx, ty, tz] = systemPositions[index];
        const x = THREE.MathUtils.lerp(THREE.MathUtils.lerp(sx, gx, graphIn), tx, systemsIn);
        const y = THREE.MathUtils.lerp(THREE.MathUtils.lerp(sy, gy, graphIn), ty, systemsIn);
        const z = THREE.MathUtils.lerp(THREE.MathUtils.lerp(sz, gz, graphIn), tz, systemsIn);
        currentPositions[index].set(x, y, z);
        dummy.position.set(x, y, z);
        const radius = 0.64 + Math.sin(index * 2.1 + amount * 4) * 0.05;
        dummy.scale.setScalar(radius);
        dummy.updateMatrix();
        instances.current.setMatrixAt(index, dummy.matrix);
        instances.current.setColorAt(index, nodeTint[Math.floor(index / 3)]);
      }
      instances.current.instanceMatrix.needsUpdate = true;
      if (instances.current.instanceColor) instances.current.instanceColor.needsUpdate = true;

      const positions = lineGeometry.getAttribute("position") as THREE.BufferAttribute;
      graphEdges.forEach(([start, end], edgeIndex) => {
        const startPoint = currentPositions[start];
        const endPoint = currentPositions[end];
        positions.setXYZ(edgeIndex * 2, startPoint.x, startPoint.y, startPoint.z);
        positions.setXYZ(edgeIndex * 2 + 1, endPoint.x, endPoint.y, endPoint.z);
      });
      positions.needsUpdate = true;
    }

    frameRefs.current.forEach((frame, index) => {
      if (!frame) return;
      const t = systemsIn;
      frame.position.set(
        THREE.MathUtils.lerp(frameStarts[index][0], frameTargets[index][0], t),
        THREE.MathUtils.lerp(frameStarts[index][1], frameTargets[index][1], t),
        THREE.MathUtils.lerp(frameStarts[index][2], frameTargets[index][2], t),
      );
      frame.scale.setScalar(Math.max(0.001, t));
      frameMaterials[index].opacity = t * 0.82;
    });
  });

  return (
    <group ref={group}>
      <lineSegments ref={connections} geometry={lineGeometry} material={lineMaterial} frustumCulled={false} />
      <instancedMesh ref={instances} args={[undefined, undefined, graphPositions.length]} material={nodeMaterial} frustumCulled={false}>
        <sphereGeometry args={[0.065, 16, 12]} />
      </instancedMesh>
      {frameTargets.map((_, index) => (
        <lineSegments key={index} ref={(instance) => { frameRefs.current[index] = instance; }} geometry={framesGeometry} material={frameMaterials[index]} />
      ))}
    </group>
  );
}

function makeParticleGeometry() {
  const count = 420;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  for (let index = 0; index < count; index += 1) {
    const seed = index + 1;
    const a = Math.sin(seed * 127.1) * 43758.5453;
    const b = Math.sin(seed * 311.7) * 24634.6345;
    const c = Math.sin(seed * 74.7) * 56445.2341;
    const unit = (value: number) => value - Math.floor(value);
    positions[index * 3] = (unit(a) - 0.5) * 6.2;
    positions[index * 3 + 1] = (unit(b) - 0.5) * 4.4;
    positions[index * 3 + 2] = (unit(c) - 0.5) * 3.8;
    sizes[index] = 2.2 + unit(Math.sin(seed * 19.19) * 9271.13) * 2.8;
    phases[index] = unit(Math.sin(seed * 41.7) * 1317.1) * Math.PI * 2;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  return geometry;
}

function ContextGuard({ onFailure }: { onFailure: (reason: StaticReason) => void }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const onLost = (event: Event) => {
      event.preventDefault();
      onFailure("context-lost");
    };
    canvas.addEventListener("webglcontextlost", onLost, false);
    return () => canvas.removeEventListener("webglcontextlost", onLost, false);
  }, [gl, onFailure]);
  return null;
}

function ResponsiveCamera() {
  const camera = useThree((state) => state.camera);
  const width = useThree((state) => state.size.width);
  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    const compact = width < 760;
    camera.position.set(0, compact ? 0.08 : 0, compact ? 9.6 : 5.4);
    camera.fov = compact ? 47 : 38;
    camera.updateProjectionMatrix();
  }, [camera, width]);
  return null;
}

function Atmosphere() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(makeParticleGeometry, []);
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: particleVertex,
    fragmentShader: particleFragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
    if (points.current) points.current.rotation.y = Math.sin(clock.elapsedTime * 0.03) * 0.018;
  });

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}

function FoldedInstrument({ pointer, progress, view, driftPaused, resetKey }: Pick<SceneCanvasProps, "pointer" | "progress" | "view" | "driftPaused" | "resetKey">) {
  const form = useRef<THREE.Group>(null);
  const previousResetKey = useRef(resetKey);
  const width = useThree((state) => state.size.width);
  const foldedCurve = useMemo(createFoldedCurve, []);
  const orbitCurve = useMemo(createOrbitCurve, []);
  const foldedGeometry = useMemo(() => new THREE.TubeGeometry(foldedCurve, 360, 0.105, 24, true), [foldedCurve]);
  const orbitGeometry = useMemo(() => new THREE.TubeGeometry(orbitCurve, 320, 0.022, 10, true), [orbitCurve]);
  const height = useThree((state) => state.size.height);
  const bronze = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#9d714a"),
    metalness: 0.78,
    roughness: 0.24,
    clearcoat: 0.72,
    clearcoatRoughness: 0.2,
    transparent: true,
    opacity: 1,
    depthWrite: false,
  }), []);
  const edge = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#d1ac7c"),
    metalness: 0.88,
    roughness: 0.2,
    transparent: true,
    opacity: 1,
    depthWrite: false,
  }), []);
  const core = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#332d27"),
    metalness: 0.82,
    roughness: 0.28,
    clearcoat: 0.9,
    clearcoatRoughness: 0.16,
    transparent: true,
    opacity: 1,
    depthWrite: false,
  }), []);
  const spark = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#e1bb87", metalness: 0.75, roughness: 0.24, emissive: "#422c1d", emissiveIntensity: 0.3,
    transparent: true, opacity: 1, depthWrite: false,
  }), []);

  useEffect(() => {
    if (previousResetKey.current !== resetKey) {
      if (form.current) form.current.rotation.set(0, 0, 0);
      previousResetKey.current = resetKey;
    }
  }, [resetKey]);

  useEffect(() => {
    if (!form.current) return;
    const compact = width < 760;
    const shortViewport = height < 760;
    form.current.position.set(compact ? 0 : 1.02, compact ? (shortViewport ? 1.65 : 1.05) : -0.04, 0);
    form.current.scale.setScalar(compact ? 0.82 : 0.91);
  }, [height, width]);

  useEffect(() => () => {
    foldedGeometry.dispose();
    orbitGeometry.dispose();
    bronze.dispose();
    edge.dispose();
    core.dispose();
    spark.dispose();
  }, [foldedGeometry, orbitGeometry, bronze, edge, core, spark]);

  useFrame((_, delta) => {
    const group = form.current;
    if (!group) return;
    const progressToGraph = smoothstep(0.22, 0.5, progress.current);
    const opacity = 1 - progressToGraph;
    bronze.opacity = opacity;
    edge.opacity = opacity;
    core.opacity = opacity;
    spark.opacity = opacity;
    const compact = width < 760;
    group.position.x = THREE.MathUtils.lerp(compact ? 0 : 1.02, compact ? 0 : 0.2, progressToGraph);
    group.position.y = THREE.MathUtils.lerp(compact ? (height < 760 ? 1.65 : 1.05) : -0.04, 0, progressToGraph);
    group.scale.setScalar(THREE.MathUtils.lerp(compact ? 0.82 : 0.91, compact ? 0.55 : 0.72, progressToGraph));
    const targetX = view.x + pointer.current.y * 0.21;
    const targetY = view.y + pointer.current.x * 0.32;
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 2.1, delta);
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetY, 2.1, delta);
    if (!driftPaused) group.rotation.z += Math.min(delta, 0.05) * 0.035;
  });

  return (
    <group ref={form} rotation={[0.1, -0.1, -0.23]}>
      <mesh geometry={foldedGeometry} material={bronze} castShadow receiveShadow />
      <mesh geometry={orbitGeometry} material={edge} rotation={[0.24, 0.08, 0.14]} />
      <mesh position={[0, 0, 0]} scale={[0.62, 0.79, 0.57]}>
        <sphereGeometry args={[0.54, 72, 52]} />
        <primitive object={core} attach="material" />
      </mesh>
      <mesh position={[-0.48, 0.18, 0.14]} scale={[0.035, 0.035, 0.035]}>
        <icosahedronGeometry args={[1, 2]} />
        <primitive object={spark} attach="material" />
      </mesh>
    </group>
  );
}

function SceneContent({ pointer, progress, view, driftPaused, resetKey, onFailure }: SceneCanvasProps) {
  const width = useThree((state) => state.size.width);
  return (
    <>
      <color attach="background" args={["#090c0e"]} />
      <fog attach="fog" args={["#090c0e", 5.5, 12]} />
      <ambientLight intensity={0.68} color="#d0c2ae" />
      <directionalLight position={[-3.8, 4.5, 4]} intensity={5.6} color="#f6d8ae" />
      <pointLight position={[3.8, 0.8, 2.8]} intensity={30} distance={10} color="#b98655" />
      <pointLight position={[-2.4, -2.5, -2.7]} intensity={21} distance={9} color="#607c89" />
      <spotLight position={[0, 5, -2]} intensity={48} angle={0.62} penumbra={0.72} distance={11} color="#f0dfc8" />
      <ResponsiveCamera />
      <FoldedInstrument pointer={pointer} progress={progress} view={view} driftPaused={driftPaused} resetKey={resetKey} />
      <EngineeringNetwork progress={progress} mobile={width < 760} />
      <Atmosphere />
      <ContextGuard onFailure={onFailure} />
    </>
  );
}

export function SceneCanvas(props: SceneCanvasProps) {
  return (
    <Canvas
      data-testid="motion-lab-canvas"
      camera={{ position: [0, 0, 5.4], fov: 38, near: 0.1, far: 30 }}
      dpr={[1, 1.35]}
      frameloop="always"
      gl={{ alpha: false, antialias: true, depth: true, stencil: false, powerPreference: "high-performance" }}
      fallback={<span>WebGL is unavailable. The static sculpture remains available.</span>}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.2;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        props.onReady();
      }}
    >
      <SceneContent {...props} />
    </Canvas>
  );
}
