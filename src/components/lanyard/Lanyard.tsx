"use client";

import * as THREE from "three";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, extend, useFrame, useThree, type ThreeElement } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
  type RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { profile } from "@/data/portfolio";
import { CARD_H, CARD_W, drawBack, drawFront, makeBandTexture, makeCardTexture } from "./textures";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    // Constructor params are optional at runtime; props set them instead
    meshLineMaterial: Omit<ThreeElement<typeof MeshLineMaterial>, "args">;
  }
}

const RING_TOP = CARD_H / 2 + 0.3; // top of the metal ring, where the rope attaches

type Body = RapierRigidBody & { lerped?: THREE.Vector3 };

export default function Lanyard({ active = true, eventSource }: { active?: boolean; eventSource: RefObject<HTMLElement | null> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 25 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      frameloop={active ? "always" : "never"}
      // Canvas is click-through; pointer events come from the hero section so text and buttons stay usable
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={Math.PI} />
      {/* updatePriority < 0: step + interpolate bodies before Band reads them, so the rope never lags a frame */}
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60} paused={!active} updatePriority={-1}>
        <Rig />
      </Physics>
      <Environment blur={0.75}>
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>
  );
}

function useCardTextures() {
  const [tex] = useState(() => ({
    front: makeCardTexture((c) => drawFront(c)),
    back: makeCardTexture(drawBack),
    band: makeBandTexture(),
  }));

  useEffect(() => {
    let alive = true;
    const img = new Image();
    // Redraw once web fonts and the photo are ready; missing photo keeps the initials
    const redraw = (photo?: HTMLImageElement) => {
      if (!alive) return;
      drawFront(tex.front.image as HTMLCanvasElement, photo);
      drawBack(tex.back.image as HTMLCanvasElement);
      tex.front.needsUpdate = tex.back.needsUpdate = true;
    };
    document.fonts.ready.then(() => {
      img.onload = () => redraw(img);
      img.onerror = () => redraw();
      img.src = profile.photo;
    });
    return () => {
      alive = false;
      tex.front.dispose();
      tex.back.dispose();
      tex.band.dispose();
    };
  }, [tex]);

  return tex;
}

/** Hangs the lanyard over the right grid column on desktop, centred on mobile. */
function Rig() {
  const { size, viewport } = useThree();
  // Right column centre ≈ a quarter of the max-w-6xl (1152px) content width right of centre
  const px = size.width >= 1024 ? Math.min(size.width, 1152) / 4 : 0;
  const x = Math.round(px * (viewport.width / size.width) * 2) / 2;
  // Physics bodies keep their spawn position, so remount when the anchor moves (resize)
  return <Band key={x} x={x} />;
}

function Band({ x = 0, maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef<THREE.Mesh<MeshLineGeometry>>(null!);
  const fixed = useRef<Body>(null!);
  const j1 = useRef<Body>(null!);
  const j2 = useRef<Body>(null!);
  const j3 = useRef<Body>(null!);
  const card = useRef<Body>(null!);
  const ringTop = useRef<THREE.Object3D>(null!);
  const tex = useCardTextures();
  const { width, height } = useThree((s) => s.size);
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  const [vec, ang, rot, dir] = useMemo(() => [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()], []);
  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]);
    c.curveType = "chordal";
    return c;
  });

  const segment: RigidBodyProps = { type: "dynamic", canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 };

  // Chain: fixed point -> 3 rope segments -> card (hangs from the ring above its top edge)
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, RING_TOP, 0]]);

  useEffect(() => {
    if (!dragged) return;
    // The canvas now overlaps the hero text; don't select it while dragging the card across
    document.body.style.userSelect = "none";
    return () => {
      document.body.style.userSelect = "";
    };
  }, [dragged]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      // Project the pointer onto the card's plane (z = 0)
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp());
      card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (!fixed.current) return;
    // Smooth the middle joints to hide jitter when the rope is over-stretched
    [j1, j2].forEach((r) => {
      const b = r.current;
      if (!b.lerped) b.lerped = new THREE.Vector3().copy(b.translation());
      const d = Math.max(0.1, Math.min(1, b.lerped.distanceTo(b.translation())));
      // Clamp: a long frame (or resuming from pause) would overshoot and blow up to NaN
      b.lerped.lerp(b.translation(), Math.min(1, delta * (minSpeed + d * (maxSpeed - minSpeed))));
    });
    // Pin the rope end to the rendered ring, not the (slightly springy) joint body
    ringTop.current.getWorldPosition(curve.points[0]);
    curve.points[1].copy(j2.current.lerped!);
    curve.points[2].copy(j1.current.lerped!);
    curve.points[3].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.getPoints(32));
    // Gently turn the card back to face the camera
    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());
    card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, false); // false: let the card fall asleep once it settles
  });

  return (
    <>
      <group position={[x, 4, 0]}>
        <RigidBody ref={fixed} {...segment} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segment}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segment}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segment}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, -1.5, 0]} ref={card} {...segment} linearDamping={4} angularDamping={6} /* heavier damping than the rope: card settles fast, throws still swing */ type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[CARD_W / 2, CARD_H / 2, 0.01]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              (e.target as Element).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              (e.target as Element).setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <RoundedBox args={[CARD_W, CARD_H, 0.02]} radius={0.01} smoothness={2}>
              <meshPhysicalMaterial color="#0a0a0a" roughness={0.4} metalness={0.6} clearcoat={1} />
            </RoundedBox>
            <mesh position={[0, 0, 0.0115]}>
              <planeGeometry args={[CARD_W, CARD_H]} />
              <meshPhysicalMaterial map={tex.front} alphaTest={0.5} clearcoat={1} clearcoatRoughness={0.15} roughness={0.6} metalness={0.3} />
            </mesh>
            <mesh position={[0, 0, -0.0115]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[CARD_W, CARD_H]} />
              <meshPhysicalMaterial map={tex.back} alphaTest={0.5} clearcoat={1} clearcoatRoughness={0.15} roughness={0.6} metalness={0.3} />
            </mesh>
            {/* Metal clip + ring */}
            <mesh position={[0, CARD_H / 2 + 0.03, 0]}>
              <boxGeometry args={[0.36, 0.14, 0.06]} />
              <meshStandardMaterial color="#9ca3af" metalness={1} roughness={0.25} />
            </mesh>
            <object3D ref={ringTop} position={[0, RING_TOP, 0]} />
            <mesh position={[0, CARD_H / 2 + 0.2, 0]}>
              <torusGeometry args={[0.1, 0.022, 12, 32]} />
              <meshStandardMaterial color="#d4d4d4" metalness={1} roughness={0.2} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={new THREE.Vector2(width, height)}
          useMap={1}
          map={tex.band}
          repeat={new THREE.Vector2(-4, 1)}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
