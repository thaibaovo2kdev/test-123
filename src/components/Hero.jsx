import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import Heart3D from './Heart3D'
import Particles3D from './Particles3D'
import ScrollIndicator from './ScrollIndicator'

function MiniHeart({ delay, x, y, size }) {
    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{ left: `${x}%`, top: `${y}%`, fontSize: `${size}px` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 0.6, 0.3, 0.6, 0],
                scale: [0.5, 1, 0.8, 1, 0.5],
                y: [0, -20, -10, -30, -50],
            }}
            transition={{ delay, duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
            💕
        </motion.div>
    )
}

export default function Hero() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
        const handler = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [])

    const miniHearts = Array.from({ length: isMobile ? 5 : 10 }, (_, i) => ({
        id: i,
        delay: i * 0.8,
        x: 10 + Math.random() * 80,
        y: 20 + Math.random() * 60,
        size: 12 + Math.random() * 14,
    }))

    return (
        <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
            {/* Background gradient */}
            <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse at 50% 30%, rgba(155,89,182,0.15) 0%, rgba(26,10,30,0.95) 60%, #1a0a1e 100%)'
            }} />

            {/* 3D Canvas */}
            <div className="absolute inset-0" style={{ zIndex: 1 }}>
                <Suspense fallback={null}>
                    <Canvas
                        camera={{ position: [0, 0, 5], fov: 45 }}
                        dpr={isMobile ? 1 : 1.5}
                        style={{ background: 'transparent' }}
                    >
                        <ambientLight intensity={0.3} />
                        <pointLight position={[5, 5, 5]} intensity={0.8} color="#ff6b8a" />
                        <pointLight position={[-5, -3, 3]} intensity={0.4} color="#c9a0dc" />
                        <pointLight position={[0, 3, 2]} intensity={0.6} color="#ffd700" />
                        <Heart3D scale={isMobile ? 0.55 : 1} position={[0, isMobile ? 0.6 : -0.2, 0]} />
                        <Particles3D count={isMobile ? 20 : 80} color="#ff6b8a" spread={isMobile ? 4 : 6} />
                        <Particles3D count={isMobile ? 10 : 40} color="#c9a0dc" spread={isMobile ? 3.5 : 5} speed={0.2} />
                        <Particles3D count={isMobile ? 8 : 25} color="#ffd700" spread={isMobile ? 3 : 4} speed={0.15} />
                    </Canvas>
                </Suspense>
            </div>

            {/* Mini floating hearts */}
            <div className="absolute inset-0" style={{ zIndex: 2 }}>
                {miniHearts.map((h) => (
                    <MiniHeart key={h.id} {...h} />
                ))}
            </div>

            {/* Text overlay */}
            <div className="relative flex flex-col items-center text-center px-6 mt-auto mb-[15vh] md:mb-auto md:mt-auto" style={{ zIndex: 3 }}>
                {/* Subtitle above */}
                <motion.p
                    className="text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase mb-3 md:mb-4"
                    style={{ fontFamily: 'var(--font-sans)', color: 'rgba(248,200,212,0.7)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    March 8th
                </motion.p>

                {/* Main title */}
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6"
                    style={{ fontFamily: 'var(--font-display)', lineHeight: 1.15 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
                >
                    <span className="text-gradient-rose">Happy</span>
                    <br />
                    <span className="text-gradient-rose">Women&apos;s Day</span>
                    <motion.span
                        className="inline-block ml-2 text-2xl sm:text-3xl md:text-6xl lg:text-7xl"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    >
                        ❤️
                    </motion.span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="text-base sm:text-lg md:text-2xl max-w-lg px-4"
                    style={{
                        fontFamily: 'var(--font-script)',
                        color: 'rgba(248,200,212,0.85)',
                        lineHeight: 1.6,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    For the most special girl in my life
                </motion.p>

                {/* Decorative line */}
                <motion.div
                    className="mt-4 md:mt-6 h-[1px] w-20 md:w-24"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,138,0.5), transparent)' }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                />
            </div>

            {/* Scroll indicator */}
            <ScrollIndicator />

            {/* Bottom vignette */}
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{
                background: 'linear-gradient(0deg, #1a0a1e 0%, transparent 100%)',
                zIndex: 3,
            }} />
        </section>
    )
}
