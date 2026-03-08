import { useMemo, useEffect, useState } from 'react'

export default function FloatingPetals({ count = 15 }) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const actualCount = isMobile ? Math.floor(count / 2) : count

    const petals = useMemo(() => {
        return Array.from({ length: actualCount }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 15,
            duration: 10 + Math.random() * 15,
            size: 8 + Math.random() * 12,
            opacity: 0.2 + Math.random() * 0.4,
            rotate: Math.random() * 360,
            type: Math.random() > 0.5 ? 'heart' : 'petal',
        }))
    }, [actualCount])

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
            {petals.map((petal) => (
                <div
                    key={petal.id}
                    style={{
                        position: 'absolute',
                        left: `${petal.left}%`,
                        top: '-20px',
                        width: `${petal.size}px`,
                        height: `${petal.size}px`,
                        opacity: petal.opacity,
                        animation: `fall ${petal.duration}s ${petal.delay}s linear infinite`,
                        transform: `rotate(${petal.rotate}deg)`,
                    }}
                >
                    {petal.type === 'heart' ? (
                        <span style={{ fontSize: `${petal.size}px`, filter: 'blur(0.5px)' }}>🌸</span>
                    ) : (
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                background: `radial-gradient(ellipse, rgba(248,200,212,0.8) 0%, rgba(255,107,138,0.4) 60%, transparent 70%)`,
                                borderRadius: '50% 0 50% 0',
                                transform: `rotate(${45 + petal.rotate}deg)`,
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}
