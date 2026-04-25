import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A minimal, mouse-reactive polypeptide chain rendered as a soft backdrop.
 * Designed to live behind section content — low opacity, monochrome glacier blue.
 */
function Chain({ count = 90, hue = 0.57 }: { count?: number; hue?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.InstancedMesh>(null);
  const tubeRef = useRef<THREE.InstancedMesh>(null);
  const { mouse, viewport } = useThree();

  const rest = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const x = (t - 0.5) * 18;
      const angle = t * Math.PI * 2 * 9;
      const r = 0.55;
      arr.push(new THREE.Vector3(x, Math.cos(angle) * r, Math.sin(angle) * r));
    }
    return arr;
  }, [count]);

  const live = useMemo(() => rest.map((v) => v.clone()), [rest]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const mid = useMemo(() => new THREE.Vector3(), []);
  const quat = useMemo(() => new THREE.Quaternion(), []);
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;
    target.set(mx, my, 0);

    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.05 + mouse.x * 0.1;
      groupRef.current.rotation.y = Math.cos(t * 0.12) * 0.1 + mouse.x * 0.15;
    }

    for (let i = 0; i < count; i++) {
      const r = rest[i];
      const l = live[i];
      const wave = Math.sin(t * 1.0 + i * 0.35) * 0.08;
      const desiredX = r.x;
      const desiredY = r.y * (1 + wave);
      const desiredZ = r.z * (1 + wave);

      // mouse repulsion
      const wp = new THREE.Vector3(l.x, l.y, l.z);
      if (groupRef.current) wp.applyMatrix4(groupRef.current.matrixWorld);
      dir.set(wp.x - target.x, wp.y - target.y, 0);
      const dist = dir.length() + 0.001;
      const influence = Math.min(0.8, 0.6 / (dist * dist));
      dir.normalize().multiplyScalar(influence * 0.25);

      const k = Math.min(1, delta * 4);
      l.x += (desiredX - l.x) * k;
      l.y += (desiredY + dir.y - l.y) * k;
      l.z += (desiredZ - l.z) * k;
    }

    if (sphereRef.current) {
      for (let i = 0; i < count; i++) {
        const l = live[i];
        const s = 0.11 + Math.sin(t * 1.6 + i * 0.4) * 0.015;
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
        dummy.scale.set(0.025, len, 0.025);
        dummy.updateMatrix();
        tubeRef.current.setMatrixAt(i, dummy.matrix);
      }
      tubeRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const sphereColor = new THREE.Color().setHSL(hue, 0.55, 0.55);
  const tubeColor = new THREE.Color().setHSL(hue, 0.45, 0.72);

  return (
    <group ref={groupRef}>
      <instancedMesh ref={sphereRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshPhysicalMaterial
          color={sphereColor}
          roughness={0.25}
          metalness={0.1}
          clearcoat={1}
          transmission={0.35}
          thickness={0.5}
          ior={1.4}
        />
      </instancedMesh>
      <instancedMesh ref={tubeRef} args={[undefined, undefined, count - 1]}>
        <cylinderGeometry args={[1, 1, 1, 8, 1, true]} />
        <meshPhysicalMaterial color={tubeColor} roughness={0.35} metalness={0.05} transparent opacity={0.7} />
      </instancedMesh>
    </group>
  );
}

export const SimplePeptideBackdrop = ({
  hue = 0.57,
  className = "",
}: {
  hue?: number;
  className?: string;
}) => {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 3, 4]} intensity={0.9} color="#ffffff" />
          <pointLight position={[0, 0, 4]} intensity={0.5} color="#7cc6ff" />
          <Chain hue={hue} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SimplePeptideBackdrop;
