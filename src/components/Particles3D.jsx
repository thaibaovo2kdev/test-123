import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ count = 50, color = '#ff6b8a', spread = 5, speed = 0.3 }) {
    const meshRef = useRef()

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const scales = new Float32Array(count)
        const speeds = new Float32Array(count)
        const offsets = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * spread
            positions[i * 3 + 1] = (Math.random() - 0.5) * spread
            positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5
            scales[i] = Math.random() * 0.5 + 0.2
            speeds[i] = Math.random() * speed + speed * 0.5
            offsets[i] = Math.random() * Math.PI * 2
        }
        return { positions, scales, speeds, offsets }
    }, [count, spread, speed])

    useFrame((state) => {
        if (!meshRef.current) return
        const positions = meshRef.current.geometry.attributes.position.array
        for (let i = 0; i < count; i++) {
            const t = state.clock.elapsedTime * particles.speeds[i] + particles.offsets[i]
            positions[i * 3 + 1] += Math.sin(t) * 0.002
            positions[i * 3] += Math.cos(t * 0.7) * 0.001

            if (positions[i * 3 + 1] > spread / 2) {
                positions[i * 3 + 1] = -spread / 2
            }
        }
        meshRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={particles.positions}
                    count={count}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color={color}
                size={0.05}
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}
