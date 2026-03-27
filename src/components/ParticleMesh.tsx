import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 2.5;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, []);

  const colors = useMemo(() => {
    const c = new Float32Array(PARTICLE_COUNT * 3);
    const purple = new THREE.Color("#7C3AED");
    const tealColor = new THREE.Color("#0D9488");
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const col = new THREE.Color().lerpColors(purple, tealColor, Math.random());
      c[i * 3] = col.r;
      c[i * 3 + 1] = col.g;
      c[i * 3 + 2] = col.b;
    }
    return c;
  }, []);

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const maxLines = PARTICLE_COUNT * PARTICLE_COUNT;
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3));
    g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3));
    return g;
  }, []);

  useFrame(({ pointer }) => {
    mouse.current.set(pointer.x * viewport.width * 0.5, pointer.y * viewport.height * 0.5);
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
      arr[ix] += velocities[ix];
      arr[iy] += velocities[iy];
      arr[iz] += velocities[iz];
      // mouse repulsion
      const dx = arr[ix] - mouse.current.x;
      const dy = arr[iy] - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2) {
        arr[ix] += dx * 0.002;
        arr[iy] += dy * 0.002;
      }
      // bounds
      if (Math.abs(arr[ix]) > 7) velocities[ix] *= -1;
      if (Math.abs(arr[iy]) > 5) velocities[iy] *= -1;
      if (Math.abs(arr[iz]) > 3) velocities[iz] *= -1;
    }
    posAttr.needsUpdate = true;

    // lines
    const linePosArr = lineGeo.attributes.position.array as Float32Array;
    const lineColArr = lineGeo.attributes.color.array as Float32Array;
    let lineIdx = 0;
    const purple = new THREE.Color("#7C3AED");
    const tealC = new THREE.Color("#0D9488");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const ddx = arr[i * 3] - arr[j * 3];
        const ddy = arr[i * 3 + 1] - arr[j * 3 + 1];
        const ddz = arr[i * 3 + 2] - arr[j * 3 + 2];
        const d = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);
        if (d < CONNECTION_DISTANCE) {
          const idx = lineIdx * 6;
          linePosArr[idx] = arr[i * 3];
          linePosArr[idx + 1] = arr[i * 3 + 1];
          linePosArr[idx + 2] = arr[i * 3 + 2];
          linePosArr[idx + 3] = arr[j * 3];
          linePosArr[idx + 4] = arr[j * 3 + 1];
          linePosArr[idx + 5] = arr[j * 3 + 2];
          const alpha = 1 - d / CONNECTION_DISTANCE;
          const col = new THREE.Color().lerpColors(purple, tealC, (i + j) / (PARTICLE_COUNT * 2));
          lineColArr[idx] = col.r; lineColArr[idx + 1] = col.g; lineColArr[idx + 2] = col.b;
          lineColArr[idx + 3] = col.r; lineColArr[idx + 4] = col.g; lineColArr[idx + 5] = col.b;
          lineIdx++;
        }
      }
    }
    lineGeo.setDrawRange(0, lineIdx * 2);
    (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (lineGeo.attributes.color as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial vertexColors transparent opacity={0.15} />
      </lineSegments>
    </>
  );
}

export default function ParticleMesh() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.5]} style={{ background: "transparent" }}>
        <Particles />
      </Canvas>
    </div>
  );
}
