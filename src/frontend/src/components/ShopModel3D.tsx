import {
  ContactShadows,
  Environment,
  OrbitControls,
  Text,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type * as THREE from "three";

function ShopBuilding() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle idle sway
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  // Shop dimensions: 19ft x 11ft, scaled to 3D units (1 unit = ~1ft)
  const W = 3.8; // width (19ft)
  const D = 2.2; // depth (11ft)
  const H = 2.8; // height

  // Colors
  const wallColor = "#f5f0e8";
  const floorColor = "#d4c9b0";
  const ceilingColor = "#ede8de";
  const shutterColor = "#2a2a3a";
  const glassColor = "#a8d8ea";
  const frameColor = "#3a3a4a";
  const furnitureColor = "#8b6f47";
  const counterColor = "#6b4f2a";
  const signColor = "#1a1a2e";

  return (
    <group ref={groupRef}>
      {/* === FLOOR === */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[W, 0.08, D]} />
        <meshStandardMaterial color={floorColor} roughness={0.6} />
      </mesh>

      {/* Floor tiles pattern */}
      {[-1.2, -0.4, 0.4, 1.2].map((x) =>
        [-0.7, 0, 0.7].map((z) => (
          <mesh key={`tile-${x}-${z}`} position={[x, 0.042, z]} receiveShadow>
            <boxGeometry args={[0.75, 0.005, 0.65]} />
            <meshStandardMaterial
              color="#c8bca0"
              roughness={0.5}
              metalness={0.05}
            />
          </mesh>
        )),
      )}

      {/* === BACK WALL === */}
      <mesh position={[0, H / 2, -D / 2]} castShadow receiveShadow>
        <boxGeometry args={[W, H, 0.1]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>

      {/* === LEFT WALL === */}
      <mesh position={[-W / 2, H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, H, D]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>

      {/* === RIGHT WALL === */}
      <mesh position={[W / 2, H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, H, D]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>

      {/* === CEILING === */}
      <mesh position={[0, H, 0]} receiveShadow>
        <boxGeometry args={[W, 0.08, D]} />
        <meshStandardMaterial color={ceilingColor} roughness={0.8} />
      </mesh>

      {/* === FRONT FACADE: Double Shutter (left half) === */}
      {/* Left shutter panel */}
      <mesh position={[-W / 4 - 0.05, H / 2 - 0.15, D / 2]} castShadow>
        <boxGeometry args={[W / 2 - 0.15, H - 0.3, 0.08]} />
        <meshStandardMaterial
          color={shutterColor}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      {/* Shutter horizontal lines left */}
      {[0.4, 0.8, 1.2, 1.6, 2.0, 2.4].map((y) => (
        <mesh
          key={`shutter-l-${y}`}
          position={[-W / 4 - 0.05, y, D / 2 + 0.045]}
        >
          <boxGeometry args={[W / 2 - 0.18, 0.04, 0.02]} />
          <meshStandardMaterial
            color="#1a1a2a"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Right shutter panel */}
      <mesh position={[W / 4 + 0.05, H / 2 - 0.15, D / 2]} castShadow>
        <boxGeometry args={[W / 2 - 0.15, H - 0.3, 0.08]} />
        <meshStandardMaterial
          color={shutterColor}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      {/* Shutter horizontal lines right */}
      {[0.4, 0.8, 1.2, 1.6, 2.0, 2.4].map((y) => (
        <mesh
          key={`shutter-r-${y}`}
          position={[W / 4 + 0.05, y, D / 2 + 0.045]}
        >
          <boxGeometry args={[W / 2 - 0.18, 0.04, 0.02]} />
          <meshStandardMaterial
            color="#1a1a2a"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Shutter center divider */}
      <mesh position={[0, H / 2 - 0.15, D / 2 + 0.04]}>
        <boxGeometry args={[0.08, H - 0.3, 0.04]} />
        <meshStandardMaterial
          color={frameColor}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Shutter handles */}
      <mesh position={[-0.12, H / 2 - 0.15, D / 2 + 0.08]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#c0a060" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.12, H / 2 - 0.15, D / 2 + 0.08]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#c0a060" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* === MODULAR GLASS TRANSOM (above shutters) === */}
      {/* Glass panel - full width above shutters */}
      <mesh position={[0, H - 0.2, D / 2 + 0.01]}>
        <boxGeometry args={[W - 0.1, 0.3, 0.05]} />
        <meshPhysicalMaterial
          color={glassColor}
          transparent
          opacity={0.45}
          roughness={0}
          metalness={0.1}
          transmission={0.5}
        />
      </mesh>
      {/* Glass frame top */}
      <mesh position={[0, H - 0.05, D / 2]}>
        <boxGeometry args={[W - 0.08, 0.06, 0.1]} />
        <meshStandardMaterial color={frameColor} metalness={0.6} />
      </mesh>
      {/* Glass frame bottom divider */}
      <mesh position={[0, H - 0.35, D / 2]}>
        <boxGeometry args={[W - 0.08, 0.06, 0.1]} />
        <meshStandardMaterial color={frameColor} metalness={0.6} />
      </mesh>
      {/* Vertical glass frame dividers */}
      {[-1.2, -0.6, 0, 0.6, 1.2].map((x) => (
        <mesh key={`gframe-${x}`} position={[x, H - 0.2, D / 2]}>
          <boxGeometry args={[0.05, 0.32, 0.1]} />
          <meshStandardMaterial color={frameColor} metalness={0.6} />
        </mesh>
      ))}

      {/* === FRONT FRAME / HEADER === */}
      <mesh position={[0, H - 0.02, D / 2]}>
        <boxGeometry args={[W, 0.04, 0.12]} />
        <meshStandardMaterial
          color={frameColor}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[-W / 2, H / 2, D / 2]}>
        <boxGeometry args={[0.1, H, 0.12]} />
        <meshStandardMaterial
          color={frameColor}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[W / 2, H / 2, D / 2]}>
        <boxGeometry args={[0.1, H, 0.12]} />
        <meshStandardMaterial
          color={frameColor}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* === SHOP SIGN BOARD === */}
      <mesh position={[0, H + 0.3, D / 2 - 0.05]} castShadow>
        <boxGeometry args={[W - 0.2, 0.5, 0.08]} />
        <meshStandardMaterial color={signColor} roughness={0.5} />
      </mesh>
      <Text
        position={[0, H + 0.3, D / 2]}
        fontSize={0.18}
        color="#f0c040"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.4}
      >
        SHOP FOR RENT
      </Text>
      <Text
        position={[0, H + 0.12, D / 2]}
        fontSize={0.1}
        color="#aaaacc"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.4}
      >
        Sipri Bazar, Jhansi
      </Text>

      {/* === INTERIOR FURNITURE === */}

      {/* Back wall shelf/rack */}
      {[0.5, 1.0, 1.5, 2.0].map((y) => (
        <mesh key={`shelf-${y}`} position={[0, y, -D / 2 + 0.15]} castShadow>
          <boxGeometry args={[W - 0.3, 0.06, 0.3]} />
          <meshStandardMaterial
            color={furnitureColor}
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
      ))}
      {/* Shelf supports */}
      {[-1.6, -0.8, 0, 0.8, 1.6].map((x) => (
        <mesh
          key={`shelf-support-${x}`}
          position={[x, 1.1, -D / 2 + 0.12]}
          castShadow
        >
          <boxGeometry args={[0.06, 2.2, 0.25]} />
          <meshStandardMaterial color={counterColor} roughness={0.6} />
        </mesh>
      ))}

      {/* Counter / reception desk */}
      <mesh position={[0, 0.75, 0.4]} castShadow>
        <boxGeometry args={[W - 0.6, 0.08, 0.6]} />
        <meshStandardMaterial
          color={counterColor}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0, 0.37, 0.4]} castShadow>
        <boxGeometry args={[W - 0.6, 0.7, 0.55]} />
        <meshStandardMaterial color={furnitureColor} roughness={0.5} />
      </mesh>

      {/* Items on shelves */}
      {[-1.4, -0.9, -0.4, 0.1, 0.6, 1.1, 1.6].map((x) =>
        [0.5, 1.0, 1.5, 2.0].map((y) => (
          <mesh
            key={`item-${x}-${y}`}
            position={[x, y + 0.1, -D / 2 + 0.2]}
            castShadow
          >
            <boxGeometry
              args={[
                0.12 + Math.sin(x * 3) * 0.04,
                0.15 + Math.cos(y * 5) * 0.05,
                0.15,
              ]}
            />
            <meshStandardMaterial
              color={
                ["#e87040", "#4080d0", "#60c060", "#d0c040", "#a060c0"][
                  Math.abs(Math.round(x * 3 + y * 2)) % 5
                ]
              }
              roughness={0.4}
            />
          </mesh>
        )),
      )}

      {/* Ceiling light fixtures */}
      {[-1.2, 0, 1.2].map((x) => (
        <group key={`light-${x}`} position={[x, H - 0.1, 0]}>
          <mesh>
            <boxGeometry args={[0.6, 0.06, 0.15]} />
            <meshStandardMaterial color="#e0e0e0" roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[0.55, 0.04, 0.12]} />
            <meshStandardMaterial
              color="#fffff0"
              emissive="#ffffcc"
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      ))}

      {/* Side wall AC unit */}
      <mesh position={[W / 2 - 0.07, H - 0.5, -0.5]} castShadow>
        <boxGeometry args={[0.06, 0.35, 0.7]} />
        <meshStandardMaterial color="#ddd" roughness={0.4} metalness={0.2} />
      </mesh>
    </group>
  );
}

function SceneLoader() {
  return (
    <mesh position={[0, 1.4, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#aaa" wireframe />
    </mesh>
  );
}

export default function ShopModel3D() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-border shadow-hero bg-gradient-to-b from-sky-100 to-slate-100"
      style={{ height: 480 }}
    >
      <Canvas
        shadows
        camera={{ position: [5, 4, 7], fov: 42 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={<SceneLoader />}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[8, 10, 6]}
            intensity={1.4}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={30}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
          />
          <pointLight position={[-4, 5, -4]} intensity={0.4} color="#ffe8cc" />
          <pointLight position={[0, 2.6, 0]} intensity={0.8} color="#fffaee" />

          {/* Shop */}
          <ShopBuilding />

          {/* Ground shadow */}
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.35}
            scale={12}
            blur={2}
            far={4}
          />

          {/* Environment */}
          <Environment preset="city" background={false} />

          {/* Controls */}
          <OrbitControls
            enablePan={false}
            minDistance={4}
            maxDistance={14}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.1}
            autoRotate
            autoRotateSpeed={0.6}
          />
        </Suspense>
      </Canvas>

      {/* Overlay label */}
      <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center">
        <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          Drag to rotate &nbsp;·&nbsp; Scroll to zoom
        </span>
      </div>
    </div>
  );
}
