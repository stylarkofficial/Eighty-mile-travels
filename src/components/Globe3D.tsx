import { Suspense, useMemo, useRef, useState, type MouseEvent } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, OrbitControls, Points, PointMaterial, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function SphereCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const auraRef = useRef<THREE.Mesh>(null);
  const ringRefs = useRef<THREE.Mesh[]>([]);
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i += 1) {
      const radius = 2.6 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return positions;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.28;
      coreRef.current.rotation.x = Math.sin(t * 0.18) * 0.08;
    }
    if (auraRef.current) {
      auraRef.current.scale.setScalar(1 + Math.sin(t * 1.4) * 0.03);
    }
    ringRefs.current.forEach((ring, index) => {
      if (!ring) return;
      ring.rotation.x = index * 0.9 + t * (0.18 + index * 0.08);
      ring.rotation.y = index * 0.6 + t * (0.22 + index * 0.06);
      ring.rotation.z = index * 0.3 + t * (0.12 + index * 0.04);
    });
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -t * 0.06;
    }
  });

  return (
    <Float speed={1.3} rotationIntensity={0.18} floatIntensity={0.22}>
      <group>
        <Sphere ref={auraRef} args={[1.7, 64, 64]}>
          <meshBasicMaterial color="#e0bc63" transparent opacity={0.08} />
        </Sphere>

        <Sphere ref={coreRef} args={[1.25, 64, 64]}>
          <meshPhysicalMaterial color="#f3e4c2" transmission={0.96} roughness={0.05} thickness={0.9} envMapIntensity={2.4} clearcoat={1} clearcoatRoughness={0.12} ior={1.35} />
        </Sphere>

        <Sphere args={[1.255, 36, 36]}>
          <meshBasicMaterial color="#efe7dc" transparent opacity={0.12} wireframe />
        </Sphere>

        {[1.75, 2.15, 2.55].map((radius, index) => (
          <Torus
            key={radius}
            ref={(node) => {
              if (node) ringRefs.current[index] = node;
            }}
            args={[radius, 0.028, 16, 180]}
          >
            <meshBasicMaterial color={index === 1 ? '#d4a010' : '#c9b79a'} transparent opacity={0.34} />
          </Torus>
        ))}

        <Points ref={pointsRef} positions={particles} stride={3}>
          <PointMaterial color="#f7efe3" size={0.045} transparent opacity={0.75} sizeAttenuation depthWrite={false} />
        </Points>

        <Line points={[[-3.1, 0.42, 0], [3.1, 0.42, 0]]} color="#d1a63c" lineWidth={1.2} transparent opacity={0.4} />
      </group>
    </Float>
  );
}

export default function Globe3D() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { damping: 20, stiffness: 150 });
  const smoothTiltY = useSpring(tiltY, { damping: 20, stiffness: 150 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(-y * 10);
    tiltY.set(x * 10);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
    setIsHovering(false);
  };

  return (
    <motion.div
      ref={wrapperRef}
      className="relative mx-auto aspect-square max-w-[34rem] cursor-image"
      style={{ rotateX: smoothTiltX, rotateY: smoothTiltY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={resetTilt}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(209,166,60,0.16)_0%,rgba(140,29,24,0.08)_34%,transparent_72%)] blur-3xl"
        animate={{ scale: isHovering ? 1.06 : 1, opacity: isHovering ? 0.95 : 0.72 }}
      />

      <div className="mesh-overlay absolute inset-[12%] rounded-full opacity-30" />

      <div className="absolute inset-0 overflow-hidden rounded-full border border-[rgba(209,166,60,0.2)] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),rgba(255,255,255,0.03)_35%,transparent_55%)] shadow-[0_30px_120px_rgba(47,44,41,0.28)]">
        <Canvas camera={{ position: [0, 0, 6.4], fov: 42 }}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={1.2} />
          <pointLight position={[4, 4, 4]} intensity={18} color="#f0d78d" />
          <pointLight position={[-4, -2, 4]} intensity={12} color="#b88a00" />
          <Suspense fallback={null}>
            <SphereCore />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.38} />
        </Canvas>
      </div>

      <motion.div
        className="absolute inset-x-[18%] top-[22%] h-px bg-[linear-gradient(90deg,transparent,rgba(209,166,60,0.75),transparent)]"
        animate={{ y: ['0%', '180%', '0%'], opacity: [0.15, 0.8, 0.15] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute inset-0 rounded-full border border-[rgba(209,166,60,0.1)]"
          animate={{ scale: [1, 1.08 + index * 0.04], opacity: [0.32, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, delay: index * 1.1, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  );
}
