import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Mouse-reactive polypeptide chains.
 * Multiple alpha-helix-like backbones float in space. Each vertex is gently
 * pulled toward / pushed from a 3D cursor projection, simulating an
 * interactive macromolecular field.
 */

type ChainProps = {
  count: number;
  radius: number;
  pitch: number;
  turns: number;
  offset: THREE.Vector3;
  hue: number;
  speed: number;
  phase: number;
};

function HelixChain({ count, radius, pitch, turns, offset, hue, speed, phase }: ChainProps) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.InstancedMesh>(null);
  const tubeRef = useRef<THREE.InstancedMesh>(null);
  const { mouse, viewport } = useThree();

  // Pre-compute the rest helix positions
  const rest = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const angle = t * turns * Math.PI * 2 + phase;
      arr.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          (t - 0.5) * pitch,
          Math.sin(angle) * radius
        )
      );
    }
    return arr;
  }, [count, radius, pitch, turns, phase]);

  const live = useMemo(() => rest.map((v) => v.clone()), [rest]);

  // reusable
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const mid = useMemo(() => new THREE.Vector3(), []);
  const quat = useMemo(() => new THREE.Quaternion(), []);
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * speed;

    // 3D mouse target in world space (loosely projected)
    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;
    target.set(mx - offset.x, my - offset.y, 0);

    // Update vertex positions: rest + breathing + mouse field
    for (let i = 0; i < count; i++) {
      const r = rest[i];
      const l = live[i];

      // breathing wave along the helix
      const wave = Math.sin(t * 1.6 + i * 0.45) * 0.08;
      const desiredX = r.x * (1 + wave);
      const desiredZ = r.z * (1 + wave);
      const desiredY = r.y + Math.sin(t * 0.9 + i * 0.3) * 0.05;

      // mouse repulsion field (in local space)
      dir.set(l.x - target.x, l.y - target.y, l.z - target.z);
      const dist = dir.length() + 0.001;
      const influence = Math.min(1.6, 1.4 / (dist * dist));
      dir.normalize().multiplyScalar(influence * 0.6);

      // ease toward desired + push
      l.x += ((desiredX + dir.x) - l.x) * Math.min(1, delta * 4);
      l.y += ((desiredY + dir.y) - l.y) * Math.min(1, delta * 4);
      l.z += ((desiredZ + dir.z) - l.z) * Math.min(1, delta * 4);
    }

    // Spheres
    if (sphereRef.current) {
      for (let i = 0; i < count; i++) {
        const l = live[i];
        const s = 0.085 + Math.sin(t * 2 + i * 0.6) * 0.012;
        dummy.position.copy(l);
        dummy.scale.setScalar(s);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        sphereRef.current.setMatrixAt(i, dummy.matrix);
      }
      sphereRef.current.instanceMatrix.needsUpdate = true;
    }

    // Tubes between consecutive vertices (the peptide bonds)
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
        dummy.scale.set(0.022, len, 0.022);
        dummy.updateMatrix();
        tubeRef.current.setMatrixAt(i, dummy.matrix);
      }
      tubeRef.current.instanceMatrix.needsUpdate = true;
    }

    // Slow autonomous rotation of the whole chain
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12 * speed;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
      // subtle parallax to mouse
      groupRef.current.position.x = offset.x + mouse.x * 0.4;
      groupRef.current.position.y = offset.y + mouse.y * 0.3;
      groupRef.current.position.z = offset.z;
    }
  });

  // colors
  const sphereColor = new THREE.Color().setHSL(hue, 0.7, 0.55);
  const tubeColor = new THREE.Color().setHSL(hue, 0.55, 0.72);

  return (
    <group ref={groupRef}>
      <instancedMesh ref={sphereRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshPhysicalMaterial
          color={sphereColor}
          roughness={0.18}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.2}
          transmission={0.35}
          thickness={0.6}
          ior={1.4}
        />
      </instancedMesh>
      <instancedMesh ref={tubeRef} args={[undefined, undefined, count - 1]}>
        <cylinderGeometry args={[1, 1, 1, 10, 1, true]} />
        <meshPhysicalMaterial
          color={tubeColor}
          roughness={0.3}
          metalness={0.05}
          transparent
          opacity={0.85}
        />
      </instancedMesh>
    </group>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 220;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={new THREE.Color().setHSL(0.57, 0.6, 0.7)}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export const PolypeptideScene = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#bfe2ff" />
        <pointLight position={[0, 0, 4]} intensity={0.7} color="#7cc6ff" />

        <HelixChain
          count={42}
          radius={0.85}
          pitch={4.2}
          turns={4}
          offset={new THREE.Vector3(-1.2, 0.2, 0)}
          hue={0.57}
          speed={1}
          phase={0}
        />
        <HelixChain
          count={36}
          radius={0.7}
          pitch={3.6}
          turns={3.5}
          offset={new THREE.Vector3(1.4, -0.3, -0.6)}
          hue={0.54}
          speed={0.8}
          phase={Math.PI / 2}
        />
        <HelixChain
          count={28}
          radius={0.55}
          pitch={2.8}
          turns={3}
          offset={new THREE.Vector3(0.2, 1.4, -1.2)}
          hue={0.6}
          speed={1.2}
          phase={Math.PI}
        />

        <FloatingParticles />
      </Suspense>
    </Canvas>
  );
};

export default PolypeptideScene;
