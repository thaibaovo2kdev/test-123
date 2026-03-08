import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

function Confetti({ count = 40 }) {
    const confetti = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: 50 + (Math.random() - 0.5) * 60,
        color: ['#ff6b8a', '#c9a0dc', '#ffd700', '#f8c8d4', '#ff3366', '#9b59b6'][Math.floor(Math.random() * 6)],
        delay: Math.random() * 0.5,
        size: 4 + Math.random() * 8,
        rotation: Math.random() * 720,
        xDrift: (Math.random() - 0.5) * 200,
        duration: 1.5 + Math.random() * 2,
    }))

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
            {confetti.map((c) => (
                <motion.div
                    key={c.id}
                    className="absolute"
                    style={{
                        left: `${c.x}%`,
                        top: '50%',
                        width: `${c.size}px`,
                        height: `${c.size * 0.6}px`,
                        background: c.color,
                        borderRadius: '2px',
                    }}
                    initial={{ y: 0, x: 0, opacity: 1, rotate: 0, scale: 0 }}
                    animate={{
                        y: [0, -150, 300],
                        x: [0, c.xDrift * 0.3, c.xDrift],
                        opacity: [0, 1, 0],
                        rotate: [0, c.rotation],
                        scale: [0, 1.2, 0.5],
                    }}
                    transition={{ duration: c.duration, delay: c.delay, ease: 'easeOut' }}
                />
            ))}
        </div>
    )
}

function BurstHearts({ count = 12 }) {
    const hearts = Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2
        const distance = 80 + Math.random() * 120
        return {
            id: i,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance - 50,
            emoji: ['❤️', '💕', '💗', '💖', '🌹', '✨', '🌸', '💐'][Math.floor(Math.random() * 8)],
            delay: Math.random() * 0.3,
            size: 16 + Math.random() * 20,
        }
    })

    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 1 }}>
            {hearts.map((h) => (
                <motion.span
                    key={h.id}
                    className="absolute"
                    style={{ fontSize: `${h.size}px` }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{
                        x: h.x,
                        y: h.y,
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1.3, 1, 0.5],
                    }}
                    transition={{ duration: 2, delay: h.delay, ease: 'easeOut' }}
                >
                    {h.emoji}
                </motion.span>
            ))}
        </div>
    )
}

export default function GiftBox() {
    const [isOpened, setIsOpened] = useState(false)
    const [showEffects, setShowEffects] = useState(false)
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

    const handleOpen = useCallback(() => {
        if (!isOpened) {
            setIsOpened(true)
            setShowEffects(true)
            setTimeout(() => setShowEffects(false), 4000)
        }
    }, [isOpened])

    return (
        <section ref={sectionRef} className="relative min-h-[70vh] md:min-h-screen flex flex-col items-center justify-center section-padding overflow-hidden gap-3">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(255,107,138,0.08) 0%, transparent 50%)',
            }} />

            {/* Header */}
            <motion.div
                className="text-center mb-12 relative"
                style={{ zIndex: 2 }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
            >
                <span className="text-sm tracking-[0.3em] uppercase block mb-4"
                    style={{ color: 'rgba(248,200,212,0.6)', fontFamily: 'var(--font-sans)', fontSize: '11px' }}>
                    A Special Gift
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-rose"
                    style={{ fontFamily: 'var(--font-display)' }}>
                    Món Quà Dành Cho Em
                </h2>
            </motion.div>

            {/* Gift Box */}
            <motion.div
                className="relative cursor-pointer"
                style={{ zIndex: 5 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
                onClick={handleOpen}
                whileHover={!isOpened ? { scale: 1.05, y: -5 } : {}}
                whileTap={!isOpened ? { scale: 0.95 } : {}}
            >
                <AnimatePresence mode="wait">
                    {!isOpened ? (
                        <motion.div
                            key="closed"
                            className="relative flex flex-col items-center"
                            exit={{ scale: 1.1, opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Box body */}
                            <div className="relative">
                                {/* Lid */}
                                <motion.div
                                    className="relative w-48 h-12 md:w-60 md:h-14 rounded-t-2xl flex items-center justify-center"
                                    style={{
                                        background: 'linear-gradient(180deg, #ff6b8a 0%, #e8879b 100%)',
                                        boxShadow: '0 -4px 20px rgba(255,107,138,0.3)',
                                    }}
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                                >
                                    {/* Ribbon on lid */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-full"
                                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.5), transparent)' }} />
                                    {/* Bow */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl">🎀</div>
                                </motion.div>
                                {/* Box */}
                                <div className="w-48 h-36 md:w-60 md:h-44 rounded-b-2xl relative overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(180deg, #e8879b 0%, #c9597a 100%)',
                                        boxShadow: '0 8px 40px rgba(255,107,138,0.3)',
                                    }}>
                                    {/* Vertical ribbon */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-full"
                                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.4), transparent)' }} />
                                    {/* Horizontal ribbon */}
                                    <div className="absolute top-1/2 left-0 w-full h-6 -translate-y-1/2"
                                        style={{ background: 'linear-gradient(180deg, transparent, rgba(255,215,0,0.4), transparent)' }} />
                                    {/* Shine effect */}
                                    <div className="absolute inset-0"
                                        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)' }} />
                                </div>
                            </div>

                            {/* Pulse ring */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl"
                                style={{ border: '2px solid rgba(255,107,138,0.3)' }}
                                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                            />

                            {/* Tap hint */}
                            <motion.p
                                className="mt-6 text-sm"
                                style={{ color: 'rgba(248,200,212,0.6)', fontFamily: 'var(--font-sans)' }}
                                animate={{ opacity: [0.4, 0.8, 0.4] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                ✨ Chạm để mở quà ✨
                            </motion.p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="opened"
                            className="flex flex-col items-center"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                        >
                            {/* Opened message */}
                            <motion.div
                                className="glass-card-strong !px-4 !py-4 md:px-12 md:py-14 text-center max-w-[85vw] sm:max-w-sm md:max-w-md"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                            >
                                <motion.div
                                    className="text-5xl md:text-6xl mb-4"
                                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                >
                                    🌹
                                </motion.div>
                                <motion.h3
                                    className="text-2xl md:text-3xl font-bold mb-3"
                                    style={{ fontFamily: 'var(--font-display)', color: '#f8c8d4' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Happy Women&apos;s Day!
                                </motion.h3>
                                <motion.p
                                    className="text-base md:text-lg leading-relaxed"
                                    style={{ fontFamily: 'var(--font-script)', color: 'rgba(248,200,212,0.8)' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    Khoảng thời gian gần 1 năm qua, để em chịu nhiều thiệt thòi, em đừng bùn he! Hẹn gặp ngày 1/6 sẽ có món quà siu to khổng lồ bù lại cho em ...hehe 💝
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Burst effects */}
                {showEffects && (
                    <>
                        <BurstHearts count={15} />
                        <Confetti count={50} />
                    </>
                )}
            </motion.div>
        </section>
    )
}
