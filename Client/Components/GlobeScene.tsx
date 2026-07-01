import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import {
  Sphere,
  Float,
  Stars,
  PerspectiveCamera,
  Html,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

// Standard coordinates for India's center
// Fine-tuned for the standard world map projection used in Three.js textures
const INDIA_LAT = 20.5937;
const INDIA_LON = 78.9629;

// Local World Map Texture to avoid network errors
const WORLD_MAP_URL = "/earth-night.jpg";

// Helper to convert Lat/Lon to 3D Cartesian coordinates
const latLonToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
};

const LocationPin = () => {
  const pinPos = useMemo(() => latLonToVector3(INDIA_LAT, INDIA_LON, 2.05), []);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (pulseRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
      pulseRef.current.scale.set(s, s, s);
      // Explicitly cast to MeshBasicMaterial to access opacity
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.8 - Math.sin(state.clock.elapsedTime * 4) * 0.4;
    }
  });

  return (
    <group position={pinPos}>
      {/* Anchor point */}
      <mesh>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* Pulse effect */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.5} />
      </mesh>

      {/* Pin Label */}
      <Html distanceFactor={10} position={[0, 0.25, 0]}>
        <div className="location-label">
          <div className="label-dot"></div>
          WAVEWORLD INDIA
        </div>
      </Html>
    </group>
  );
};

const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  // Load the world map texture
  const texture = useTexture(WORLD_MAP_URL);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0012;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.0025;
      ringRef.current.rotation.y += 0.001;
    }

    // Smooth camera drift based on mouse
    state.camera.position.lerp(
      new THREE.Vector3(state.mouse.x * 0.7, state.mouse.y * 0.7, 6),
      0.03,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={meshRef}>
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.15}>
        {/* The World Map Globe */}
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            map={texture}
            emissive="#6366f1"
            emissiveIntensity={1.5}
            emissiveMap={texture}
            transparent
            opacity={0.9}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Outer Emissive Glow / Atmosphere */}
        <mesh>
          <sphereGeometry args={[2.05, 64, 64]} />
          <meshBasicMaterial
            color="#4f46e5"
            wireframe={true}
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* India Location Pin & Pulse */}
        <LocationPin />

        {/* Orbiting Data Rings */}
        <group ref={ringRef}>
          <mesh rotation={[Math.PI / 2.2, 0, 0]}>
            <torusGeometry args={[2.7, 0.003, 16, 120]} />
            <meshBasicMaterial color="#ec4899" transparent opacity={0.3} />
          </mesh>
          <mesh rotation={[-Math.PI / 3.2, 0.6, 0]}>
            <torusGeometry args={[2.9, 0.002, 16, 120]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.25} />
          </mesh>
        </group>
      </Float>

      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={3.5} color="#818cf8" />
      <pointLight position={[-10, -5, -10]} intensity={2.0} color="#ec4899" />
    </group>
  );
};

const GlobeScene = () => {
  return (
    <div className="globe-canvas-container">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={1}
          fade
          speed={1}
        />
        <Suspense fallback={null}>
          <Globe />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.15}
              luminanceSmoothing={0.9}
              intensity={1.8}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
      <div className="canvas-overlay"></div>
    </div>
  );
};

export default GlobeScene;
