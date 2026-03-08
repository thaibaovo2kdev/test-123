import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Heart3D({ scale = 1, position = [0, 0, 0] }) {
    const meshRef = useRef()
    const glowRef = useRef()

    const heartShape = useMemo(() => {
        const shape = new THREE.Shape()
        const x = 0, y = 0
        shape.moveTo(x, y + 0.5)
        shape.bezierCurveTo(x, y + 0.5, x - 0.1, y + 0.35, x - 0.5, y + 0.35)
        shape.bezierCurveTo(x - 1, y + 0.35, x - 1, y + 0.75, x - 1, y + 0.75)
        shape.bezierCurveTo(x - 1, y + 1.1, x - 0.7, y + 1.45, x, y + 1.9)
        shape.bezierCurveTo(x + 0.7, y + 1.45, x + 1, y + 1.1, x + 1, y + 0.75)
        shape.bezierCurveTo(x + 1, y + 0.75, x + 1, y + 0.35, x + 0.5, y + 0.35)
        shape.bezierCurveTo(x + 0.1, y + 0.35, x, y + 0.5, x, y + 0.5)
        return shape
    }, [])

    const geometry = useMemo(() => {
        const extrudeSettings = {
            steps: 2,
            depth: 0.4,
            bevelEnabled: true,
            bevelThickness: 0.15,
            bevelSize: 0.1,
            bevelOffset: 0,
            bevelSegments: 8,
        }
        const geo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings)
        geo.center()
        return geo
    }, [heartShape])

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3 + state.clock.elapsedTime * 0.2
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1 + position[1]
        }
        if (glowRef.current) {
            glowRef.current.rotation.copy(meshRef.current.rotation)
            glowRef.current.position.copy(meshRef.current.position)
            const s = 1.08 + Math.sin(state.clock.elapsedTime * 2) * 0.03
            glowRef.current.scale.set(s, s, s)
        }
    })

    return (
        <group scale={scale} rotation={[Math.PI, 0, 0]}>
            {/* Glow outer shell */}
            <mesh ref={glowRef} geometry={geometry}>
                <meshBasicMaterial
                    color="#ff6b8a"
                    transparent
                    opacity={0.15}
                    side={THREE.DoubleSide}
                />
            </mesh>
            {/* Main heart */}
            <mesh ref={meshRef} geometry={geometry} position={position}>
                <meshStandardMaterial
                    color="#ff6b8a"
                    emissive="#ff3366"
                    emissiveIntensity={0.6}
                    roughness={0.2}
                    metalness={0.3}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    )
}
