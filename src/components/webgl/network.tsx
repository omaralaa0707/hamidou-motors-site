"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";
import { BRANCHES, type Branch } from "@/content/media";

const RED = new THREE.Color("#e3212f");
const KM_PER_DEG_LAT = 111.0;
const WORLD_PER_KM = 1 / 45;

type Placed = Branch & { x: number; z: number };

/** Flat local projection relative to the HQ (Dokki), computed once from
 *  plain lat/lon arithmetic -- no Box3, no post-mount measurement, so there
 *  is nothing here that depends on r3f's own render timing. Re-centred on
 *  the four branches' own centroid (not on the HQ) so the auto-rotate spins
 *  the whole real layout around its own middle rather than around whichever
 *  pin happens to sit at the projection's origin. */
function projectBranches(branches: Branch[]): Placed[] {
  const hq = branches.find((b) => b.status === "hq") ?? branches[0];
  const kmPerDegLon = KM_PER_DEG_LAT * Math.cos((hq.lat * Math.PI) / 180);
  const raw = branches.map((b) => {
    const eastKm = (b.lon - hq.lon) * kmPerDegLon;
    const northKm = (b.lat - hq.lat) * KM_PER_DEG_LAT;
    return { ...b, x: eastKm * WORLD_PER_KM, z: -northKm * WORLD_PER_KM };
  });
  const cx = raw.reduce((s, p) => s + p.x, 0) / raw.length;
  const cz = raw.reduce((s, p) => s + p.z, 0) / raw.length;
  return raw.map((p) => ({ ...p, x: p.x - cx, z: p.z - cz }));
}

const PLACED = projectBranches(BRANCHES);
const HQ = PLACED.find((p) => p.status === "hq")!;
const MAX_RADIUS = Math.max(...PLACED.map((p) => Math.hypot(p.x, p.z)));

// Markers are drawn at a deliberately exaggerated scale relative to the
// real-world distances -- the way every map pin on every real map is far
// bigger than the place it marks -- so they stay legible at the distance
// needed to fit a layout this lopsided in frame.
function Pin({ p }: { p: Placed }) {
  const isHq = p.status === "hq";
  const height = isHq ? 1.0 : 0.68;
  return (
    <group position={[p.x, 0, p.z]}>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[isHq ? 0.05 : 0.036, isHq ? 0.05 : 0.036, height, 10]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0, height + 0.13, 0]}>
        <sphereGeometry args={[isHq ? 0.19 : 0.14, 16, 16]} />
        <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={1.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[isHq ? 0.22 : 0.16, isHq ? 0.3 : 0.22, 28]} />
        <meshBasicMaterial color={RED} transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// A tube (real width in world units) rather than a THREE.Line, whose pixel
// width most WebGL backends clamp to 1px regardless of the material's
// linewidth -- invisible at the camera distance this scene needs.
function Route({ from, to }: { from: Placed; to: Placed }) {
  const geometry = useMemo(() => {
    const mid = new THREE.Vector3((from.x + to.x) / 2, 0.22, (from.z + to.z) / 2);
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(from.x, 0.015, from.z),
      mid,
      new THREE.Vector3(to.x, 0.015, to.z)
    );
    return new THREE.TubeGeometry(curve, 32, 0.022, 8, false);
  }, [from, to]);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.7} roughness={0.5} transparent opacity={0.85} />
    </mesh>
  );
}

const GROUND_SIZE = MAX_RADIUS * 2.6;

function Ground() {
  return (
    <>
      <mesh position={[0, -0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[GROUND_SIZE, GROUND_SIZE]} />
        <meshStandardMaterial color="#171c21" roughness={0.95} />
      </mesh>
      <gridHelper args={[GROUND_SIZE, 18, "#3a2226", "#22282e"]} position={[0, -0.008, 0]} />
    </>
  );
}

function Rig() {
  const group = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const azimuth = useRef(0.5);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      lastX.current = e.clientX;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      azimuth.current += dx * 0.006;
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  useFrame((_, dt) => {
    if (!dragging.current) azimuth.current += dt * 0.09;
    if (group.current) group.current.rotation.y = azimuth.current;
  });

  return (
    <group ref={group}>
      <Ground />
      {PLACED.filter((p) => p.status !== "hq").map((p) => (
        <Route key={p.id} from={HQ} to={p} />
      ))}
      {PLACED.map((p) => (
        <Pin key={p.id} p={p} />
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#0d1114"]} />
      <fog attach="fog" args={["#0d1114", MAX_RADIUS * 1.6, MAX_RADIUS * 3.4]} />
      <Rig />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 2]} intensity={1.1} />
      <directionalLight position={[-3, 2, -3]} intensity={0.3} color="#5a6b7a" />
    </>
  );
}

// Isometric-leaning camera: elevated enough to read as a real 3D plan, not
// a flat top-down map. Distance derived from the true (unrotated) bounding
// radius against the vertical fov, per the frustum-fit lesson from 09 --
// z = radius / (0.8 * tan(fov/2)) -- then split across an elevation so the
// straight-line camera distance, not just its height, clears that radius.
// An elevated, off-axis camera position has no rotation of its own by
// default (r3f's default camera keeps its identity "look down -Z"
// rotation), so it has to be pointed at the origin explicitly once on
// creation -- a plain lookAt at a hardcoded target, not a measurement of
// anything, so it carries none of the Box3/render-timing fragility.
const FOV = 48;
const ELEVATION = 0.58; // fraction of camera distance spent on height
const CAM_DIST = MAX_RADIUS / (0.85 * Math.tan((FOV * Math.PI) / 360));
const CAM_Y = CAM_DIST * ELEVATION;
const CAM_Z = Math.sqrt(Math.max(CAM_DIST * CAM_DIST - CAM_Y * CAM_Y, 0.01));

export function Network() {
  const [ready, setReady] = useState<boolean | null>(null);
  const { lost, bind } = useWebglHealth();

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const ctx = c.getContext("webgl2") || c.getContext("webgl");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReady(!!ctx);
    } catch {
      setReady(false);
    }
  }, []);

  return (
    <div className="network-host relative aspect-square w-full min-w-0 overflow-hidden rounded-sm bg-panel sm:aspect-[16/9]">
      {ready && !lost ? (
        <Canvas
          camera={{ position: [0, CAM_Y, CAM_Z], fov: FOV }}
          dpr={[1, 1.5]}
          onCreated={({ gl, camera }) => {
            camera.lookAt(0, 0, 0);
            bind(gl.domElement);
          }}
        >
          <Scene />
        </Canvas>
      ) : (
        <div className="flex h-full w-full items-center justify-center p-6 text-center">
          <p className="fine text-muted">WebGL unavailable.</p>
        </div>
      )}
    </div>
  );
}
