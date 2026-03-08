import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import audioSrc from '../assets/audio.mp3'

const letterLines = [
    'Chúc em một ngày 8/3 thật hạnh phúc, ngày càng xinh đẹp, iu anh hơn nữa ❤️',
    'Cảm ơn em vì đã luôn ở bên anh.',
    'Mong là tụi mình sẽ mãi ở bên nhau, cùng nhau đi hết con đường phía trước.',
    'Anh iu emmmm ❤️',
]

function TypingLine({ text, isActive, onComplete }) {
    const [displayed, setDisplayed] = useState('')
    const [showCursor, setShowCursor] = useState(false)
    const [done, setDone] = useState(false)

    useEffect(() => {
        if (!isActive || done) return
        setShowCursor(true)
        let i = 0
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayed(text.slice(0, i + 1))
                i++
            } else {
                clearInterval(interval)
                setDone(true)
                setTimeout(() => {
                    setShowCursor(false)
                    onComplete?.()
                }, 600)
            }
        }, 50)
        return () => clearInterval(interval)
    }, [text, isActive, done, onComplete])

    if (!isActive && !done) {
        return <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4 min-h-[1.6em]" />
    }

    return (
        <p
            className="text-base sm:text-lg md:text-xl leading-relaxed mb-4 min-h-[1.6em]"
            style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                color: 'rgba(248,200,212,0.9)',
                borderRight: showCursor && !done ? '2px solid rgba(255,107,138,0.8)' : '2px solid transparent',
                display: 'inline-block',
                animation: showCursor && !done ? 'typing-cursor 1s infinite' : 'none',
            }}
        >
            {displayed}
        </p>
    )
}

export default function LoveLetter() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
    const [activeLineIndex, setActiveLineIndex] = useState(-1)

    // Start the first line after section comes into view
    useEffect(() => {
        if (isInView && activeLineIndex === -1) {
            const timer = setTimeout(() => setActiveLineIndex(0), 1000)
            return () => clearTimeout(timer)
        }
    }, [isInView, activeLineIndex])

    const handleLineComplete = useCallback(() => {
        setActiveLineIndex((prev) => prev + 1)
    }, [])

    const allLinesComplete = activeLineIndex >= letterLines.length
    const audioRef = useRef(null)

    // Auto-play audio when all lines finish typing
    useEffect(() => {
        if (allLinesComplete && !audioRef.current) {
            const audio = new Audio(audioSrc)
            audio.volume = 0.7
            audio.loop = true
            audioRef.current = audio
            audio.play().catch(() => {
                // If autoplay blocked, play on next user interaction
                const playOnInteraction = () => {
                    audio.play()
                    document.removeEventListener('click', playOnInteraction)
                    document.removeEventListener('touchstart', playOnInteraction)
                }
                document.addEventListener('click', playOnInteraction)
                document.addEventListener('touchstart', playOnInteraction)
            })
        }
        return () => {
            // Don't stop audio on unmount — let it keep playing
        }
    }, [allLinesComplete])

    return (
        <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center section-padding overflow-hidden gap-4">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(155,89,182,0.1) 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, rgba(255,107,138,0.05) 0%, transparent 40%)',
            }} />

            {/* Floating decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-2xl"
                        style={{
                            left: `${15 + Math.random() * 70}%`,
                            top: `${10 + Math.random() * 80}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            x: [0, 10, 0],
                            opacity: [0.1, 0.3, 0.1],
                            rotate: [0, 10, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                        }}
                    >
                        {['✉️', '💌', '🌸', '✨', '🕊️', '🌹'][i]}
                    </motion.div>
                ))}
            </div>

            {/* Header */}
            <motion.div
                className="text-center mb-14 md:mb-14 relative"
                style={{ zIndex: 2 }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
            >
                <span className="text-sm tracking-[0.3em] uppercase block mb-4"
                    style={{ color: 'rgba(248,200,212,0.6)', fontFamily: 'var(--font-sans)', fontSize: '11px' }}>
                    Love Letter
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-rose"
                    style={{ fontFamily: 'var(--font-display)' }}>
                    Đôi Lời Gửi Em
                </h2>
            </motion.div>

            {/* Letter card */}
            <motion.div
                className="relative max-w-lg md:max-w-2xl w-full mx-auto"
                style={{ zIndex: 2 }}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
            >
                <div className="glass-card-strong !px-4 !py-4 sm:px-8 sm:py-10 md:px-12 md:py-14 relative overflow-hidden">
                    {/* Corner decorations */}
                    <div className="absolute top-3 left-3 text-xl opacity-30">🌸</div>
                    <div className="absolute top-3 right-3 text-xl opacity-30">🌸</div>
                    <div className="absolute bottom-3 left-3 text-xl opacity-30">✨</div>
                    <div className="absolute bottom-3 right-3 text-xl opacity-30">✨</div>

                    {/* Greeting */}
                    <motion.p
                        className="text-lg md:text-xl mb-8"
                        style={{ fontFamily: 'var(--font-script)', color: 'rgba(255,107,138,0.7)' }}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 }}
                    >
                        Gửi em yêu,
                    </motion.p>

                    {/* Typing lines — sequential */}
                    <div className="space-y-2">
                        {letterLines.map((line, i) => (
                            <TypingLine
                                key={i}
                                text={line}
                                isActive={i === activeLineIndex}
                                onComplete={handleLineComplete}
                            />
                        ))}
                    </div>

                    {/* Signature */}
                    <motion.div
                        className="mt-10 text-right"
                        initial={{ opacity: 0 }}
                        animate={allLinesComplete ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <p className="text-lg md:text-xl italic" style={{ fontFamily: 'var(--font-script)', color: 'rgba(255,107,138,0.6)' }}>
                            Mãi yêu em,
                        </p>
                        <p className="text-2xl md:text-3xl mt-2" style={{ fontFamily: 'var(--font-script)', color: '#f8c8d4' }}>
                            Baodeptrai 💕
                        </p>
                    </motion.div>

                    {/* Inner glow */}
                    <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{
                        background: 'linear-gradient(135deg, rgba(255,107,138,0.03) 0%, transparent 50%, rgba(155,89,182,0.03) 100%)',
                    }} />
                </div>
            </motion.div>

            {/* Footer */}
            <motion.div
                className="mt-16 text-center relative"
                style={{ zIndex: 2 }}
                initial={{ opacity: 0 }}
                animate={allLinesComplete ? { opacity: 1 } : {}}
                transition={{ delay: 0.8, duration: 1 }}
            >
                <motion.div
                    className="text-4xl mb-4"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    ❤️
                </motion.div>
                <p className="text-sm" style={{ color: 'rgba(248,200,212,0.4)', fontFamily: 'var(--font-sans)' }}>
                    Happy Women&apos;s Day 2026
                </p>
            </motion.div>
        </section>
    )
}
