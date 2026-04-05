'use client'

import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { useScrollRuntimeSelector } from '@/features/motion/runtime/scrollRuntime.ts'
import type { SceneChapterConfig } from '@/features/experience/scene.types'

export type MinimalWebGLLayerProps = {
  chapter: SceneChapterConfig
}

type ChapterGraphicsPreset = {
  color: string
  glowColor: string
  sparkles: number
  sparkleScale: number
  sparkleSpeed: number
  sparkleSize: number
  sparkleOpacity: number
  drift: number
  haloOpacity: number
}

type AnimatedGroupRef = {
  rotation: { x: number; y: number; z: number }
  position: { x: number; y: number; z: number }
  scale: { setScalar: (value: number) => void }
}

const graphicsByChapter: Record<SceneChapterConfig['id'], ChapterGraphicsPreset> = {
  identity: {
    color: '#7dd3fc',
    glowColor: '#38bdf8',
    sparkles: 72,
    sparkleScale: 8.5,
    sparkleSpeed: 0.12,
    sparkleSize: 1.6,
    sparkleOpacity: 0.18,
    drift: 0.28,
    haloOpacity: 0.07,
  },
  proof: {
    color: '#93c5fd',
    glowColor: '#60a5fa',
    sparkles: 96,
    sparkleScale: 9.2,
    sparkleSpeed: 0.22,
    sparkleSize: 1.8,
    sparkleOpacity: 0.24,
    drift: 0.42,
    haloOpacity: 0.1,
  },
  trust: {
    color: '#cbd5e1',
    glowColor: '#e2e8f0',
    sparkles: 58,
    sparkleScale: 7.8,
    sparkleSpeed: 0.08,
    sparkleSize: 1.45,
    sparkleOpacity: 0.14,
    drift: 0.18,
    haloOpacity: 0.05,
  },
  cta: {
    color: '#fdba74',
    glowColor: '#fb923c',
    sparkles: 54,
    sparkleScale: 7.2,
    sparkleSpeed: 0.06,
    sparkleSize: 1.35,
    sparkleOpacity: 0.12,
    drift: 0.14,
    haloOpacity: 0.045,
  },
}

const createSeededRandom = (seedText: string) => {
  let seed = 0

  for (let index = 0; index < seedText.length; index += 1) {
    seed = (seed * 31 + seedText.charCodeAt(index)) >>> 0
  }

  return () => {
    seed += 0x6d2b79f5
    let value = Math.imul(seed ^ (seed >>> 15), seed | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function AmbientOrbit({ chapter, preset }: { chapter: SceneChapterConfig; preset: ChapterGraphicsPreset }) {
  const groupRef = useRef<AnimatedGroupRef | null>(null)
  const runtime = useScrollRuntimeSelector((snapshot) => ({
    reducedMotion: snapshot.reducedMotion,
    globalProgress: snapshot.globalProgress,
    immersiveProgress: snapshot.immersiveProgress,
    velocity: snapshot.velocity,
    direction: snapshot.direction,
  }))

  const points = useMemo(() => {
    const random = createSeededRandom(`${chapter.id}:${chapter.sectionId}`)
    const positions = new Float32Array(preset.sparkles * 3)

    for (let index = 0; index < preset.sparkles; index += 1) {
      const base = index * 3
      positions[base] = (random() - 0.5) * 22
      positions[base + 1] = (random() - 0.5) * 14
      positions[base + 2] = (random() - 0.5) * 18
    }

    return positions
  }, [chapter.id, chapter.sectionId, preset.sparkles])

  useFrame(({ clock }) => {
    const group = groupRef.current

    if (!group) {
      return
    }

    const progressInfluence = runtime.immersiveProgress * 0.18 + runtime.globalProgress * 0.08
    const velocityInfluence = Math.min(1, Math.abs(runtime.velocity) * 0.02)
    const directionInfluence = runtime.direction === 'down' ? 1 : runtime.direction === 'up' ? -1 : 0
    const motionFactor = runtime.reducedMotion ? 0.15 : 1
    const elapsedTime = clock.getElapsedTime()

    group.rotation.z = (chapter.intensity === 'expressive' ? 0.08 : 0.04) * elapsedTime * motionFactor + progressInfluence * 0.5
    group.rotation.y = (runtime.globalProgress - 0.5) * 0.35 + directionInfluence * 0.08
    group.rotation.x = chapter.id === 'trust' ? -0.06 : 0.04
    group.position.x = (runtime.globalProgress - 0.5) * preset.drift * 1.6
    group.position.y = runtime.direction === 'down' ? -preset.drift * 0.45 : runtime.direction === 'up' ? preset.drift * 0.45 : 0
    group.scale.setScalar(1 + progressInfluence * 0.12 + velocityInfluence * 0.04)
  })

  return (
    <group ref={groupRef}>
      <Sparkles
        count={preset.sparkles}
        scale={preset.sparkleScale}
        size={preset.sparkleSize}
        speed={preset.sparkleSpeed}
        opacity={runtime.reducedMotion ? preset.sparkleOpacity * 0.55 : preset.sparkleOpacity}
        color={preset.color}
        noise={0.7}
      />
      <mesh position={[3.8, 1.2, -2.4]} scale={[2.2, 2.2, 2.2]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={preset.glowColor} transparent opacity={runtime.reducedMotion ? preset.haloOpacity * 0.6 : preset.haloOpacity} blending={2} depthWrite={false} />
      </mesh>
      <mesh position={[-4.2, -1.4, -2.8]} scale={[1.6, 1.6, 1.6]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={preset.color} transparent opacity={runtime.reducedMotion ? preset.haloOpacity * 0.45 : preset.haloOpacity} blending={2} depthWrite={false} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color={preset.color}
          transparent
          opacity={runtime.reducedMotion ? 0.05 : 0.09}
          depthWrite={false}
          blending={2}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

export default function MinimalWebGLLayer({ chapter }: MinimalWebGLLayerProps) {
  const preset = graphicsByChapter[chapter.id]

  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      dpr={[1, 1.35]}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance', depth: false, stencil: false }}
      frameloop="always"
      style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
        gl.domElement.style.display = 'block'
      }}
    >
      <Suspense fallback={null}>
        <AmbientOrbit chapter={chapter} preset={preset} />
      </Suspense>
    </Canvas>
  )
}
