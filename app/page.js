'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>
      <OrbitControls />
    </>
  )
}

export default function Home() {
  return (
    <main className="h-screen">
      <Canvas>
        <Scene />
      </Canvas>
    </main>
  )
}