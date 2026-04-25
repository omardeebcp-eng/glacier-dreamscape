import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A thin polypeptide chain meant to live along a screen edge.
 * The helix axis runs along the X axis. Mouse interaction gently
 * deforms the chain in Y/Z.
 */
type Edge = "top" | "bottom" | "left" | "right";

function EdgeChain({ count = 60, edge, hue, speed = 1, phase = 0 }: { count?: number; edge: Edge; hue: number; speed?: number; phase?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.InstancedMesh>(null);
  const tubeRef = useRef<THREE.InstancedMesh>(null);
  const { mouse, viewport } = useThree();

  const rest = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    // length spans the full viewport along the edge
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const x = (t - 0.5) * 14; // long axis
      const angle = t * Math.PI * 2 * 6 + phase; // turns
      const r = 0.18; // tight helix radius — thin border
      arr.push(new THREE.Vector3(x, Math.cos(angle) * r, Math.sin(angle) * r));
    }
    return arr;
  }, [count, phase]);

  const live = useMemo(() => rest.map((v) => v.clone()), [rest]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const mid = useMemo(() => new THREE.Vector3(), []);
  const quat = useMemo(() => new THREE.Quaternion(), []);
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * speed;
    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;
    target.set(mx, my, 0);

    for (let i = 0; i < count; i++) {
      const r = rest[i];
      const l = live[i];
      const wave = Math.sin(t * 1.4 + i * 0.5) * 0.06;
      const desiredX = r.x;
      const desiredY = r.y * (1 + wave);
      const desiredZ = r.z * (1 + wave);

      // mouse repulsion in world (group-relative) — small influence so the border stays clean
      const wp = new THREE.Vector3(l.x, l.y, l.z);
      if (groupRef.current) wp.applyMatrix4(groupRef.current.matrixWorld);
      dir.set(wp.x - target.x, wp.y - target.y, 0);
      const dist = dir.length() + 0.001;
      const influence = Math.min(0.6, 0.5 / (dist * dist));
      dir.normalize().multiplyScalar(influence * 0.18);

      l.x += (desiredX - l.x) * Math.min(1, delta * 5);
      l.y += ((desiredY + dir.y) - l.y) * Math.min(1, delta * 5);
      l.z += (desiredZ - l.z) * Math.min(1, delta * 5);
    }

    if (sphereRef.current) {
      for (let i = 0; i < count; i++) {
        const l = live[i];
        const s = 0.05 + Math.sin(t * 2 + i * 0.6) * 0.008;
        dummy.position.copy(l);
        dummy.scale.setScalar(s);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        sphereRef.current.setMatrixAt(i, dummy.matrix);
      }
      sphereRef.current.instanceMatrix.needsUpdate = true;
    }
    if (tubeRef.current) {
      for (let i = 0; i < count - 1; i++) {
        const a = live[i];
        const b = live[i + 1];
        mid.addVectors(a, b).multiplyScalar(0.5);
        dir.subVectors(b, a);
        const len = dir.length();
        dir.normalize();
        quat.setFromUnitVectors(up, dir);
        dummy.position.copy(mid);
        dummy.quaternion.copy(quat);
        dummy.scale.set(0.014, len, 0.014);
        dummy.updateMatrix();
        tubeRef.current.setMatrixAt(i, dummy.matrix);
      }
      tubeRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  // Orient the chain depending on the edge.
  // Default chain runs along X. For left/right we rotate to run along Y.
  const rotation: [number, number, number] =
    edge === "left" || edge === "right" ? [0, 0, Math.PI / 2] : [0, 0, 0];

  const sphereColor = new THREE.Color().setHSL(hue, 0.7, 0.55);
  const tubeColor = new THREE.Color().setHSL(hue, 0.55, 0.72);

  return (
    <group ref={groupRef} rotation={rotation}>
      <instancedMesh ref={sphereRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshPhysicalMaterial
          color={sphereColor}
          roughness={0.2}
          metalness={0.15}
          clearcoat={1}
          transmission={0.3}
          thickness={0.4}
          ior={1.4}
        />
      </instancedMesh>
      <instancedMesh ref={tubeRef} args={[undefined, undefined, count - 1]}>
        <cylinderGeometry args={[1, 1, 1, 8, 1, true]} />
        <meshPhysicalMaterial color={tubeColor} roughness={0.3} metalness={0.05} transparent opacity={0.85} />
      </instancedMesh>
    </group>
  );
}

export const PolypeptideBorder = ({ edge, hue = 0.57, speed = 1, phase = 0 }: { edge: Edge; hue?: number; speed?: number; phase?: number }) => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 4]} intensity={1} color="#ffffff" />
        <pointLight position={[0, 0, 3]} intensity={0.6} color="#7cc6ff" />
        <EdgeChain edge={edge} hue={hue} speed={speed} phase={phase} />
      </Suspense>
    </Canvas>
  );
};

export default PolypeptideBorder;
