import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const memories = [
    {
        id: 1,
        caption: 'Khoảnh khắc đẹp 💕',
        gradient: 'linear-gradient(135deg, #ff6b8a 0%, #c9a0dc 100%)',
        emoji: '🌸',
    },
    {
        id: 2,
        caption: 'Nụ cười của em 🌹',
        gradient: 'linear-gradient(135deg, #f5e6c8 0%, #ff6b8a 100%)',
        emoji: '✨',
    },
    {
        id: 3,
        caption: 'Bên nhau mãi 💗',
        gradient: 'linear-gradient(135deg, #c9a0dc 0%, #f8c8d4 100%)',
        emoji: '🦋',
    },
    {
        id: 4,
        caption: 'Kỷ niệm ngọt ngào 🍀',
        gradient: 'linear-gradient(135deg, #9b59b6 0%, #ff6b8a 100%)',
        emoji: '💐',
    },
    {
        id: 5,
        caption: 'Yêu thương vô bờ 💝',
        gradient: 'linear-gradient(135deg, #ff6b8a 0%, #ffd700 100%)',
        emoji: '🌷',
    },
    {
        id: 6,
        caption: 'Hạnh phúc nhỏ bé 🌼',
        gradient: 'linear-gradient(135deg, #f8c8d4 0%, #9b59b6 100%)',
        emoji: '🎀',
    },
]

export default function MemoryGallery() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
    const scrollContainerRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
        const handler = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [])

    // Handle scroll snap for mobile carousel
    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const scrollLeft = scrollContainerRef.current.scrollLeft
            const cardWidth = scrollContainerRef.current.offsetWidth * 0.78
            const newIndex = Math.round(scrollLeft / cardWidth)
            setActiveIndex(Math.min(newIndex, memories.length - 1))
        }
    }

    return (
        <section ref={sectionRef} className="relative flex flex-col items-center justify-center section-padding overflow-hidden gap-3">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at 30% 50%, rgba(255,107,138,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(155,89,182,0.06) 0%, transparent 50%)',
            }} />

            {/* Section Header */}
            <motion.div
                className="text-center mb-10 md:mb-16 relative mb-4"
                style={{ zIndex: 2 }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
            >
                <motion.span
                    className="text-sm tracking-[0.3em] uppercase block mb-4"
                    style={{ color: 'rgba(248,200,212,0.6)', fontFamily: 'var(--font-sans)', fontSize: '11px' }}
                >
                    Our Memories
                </motion.span>
                <h2
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-rose"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    Kỷ Niệm Đẹp
                </h2>
                <p className="mt-4 text-base md:text-lg " style={{ color: 'rgba(248,200,212,0.6)', fontFamily: 'var(--font-script)' }}>
                    Mỗi khoảnh khắc bên em đều là kỷ niệm đẹp ✨
                </p>
            </motion.div>

            {/* Mobile Carousel */}
            {isMobile ? (
                <div className="w-full relative" style={{ zIndex: 2 }}>
                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-[11%] pb-8"
                        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
                    >
                        {memories.map((memory, i) => (
                            <motion.div
                                key={memory.id}
                                className="snap-center flex-shrink-0 w-[72vw] aspect-[3/4] rounded-3xl relative overflow-hidden"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                            >
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center"
                                    style={{ background: memory.gradient }}
                                >
                                    <span className="text-6xl mb-4">{memory.emoji}</span>
                                    <p className="text-white text-lg font-medium px-8 text-center" style={{ fontFamily: 'var(--font-display)' }}>
                                        {memory.caption}
                                    </p>
                                    <p className="text-white/60 text-xs mt-2">Tap to add your photo</p>
                                </div>
                                {/* Glass overlay */}
                                <div className="absolute inset-x-0 bottom-0 h-1/3" style={{
                                    background: 'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, transparent 100%)',
                                }} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Dots indicator */}
                    <div className="flex justify-center gap-2 !mt-6">
                        {memories.map((_, i) => (
                            <div
                                key={i}
                                className="rounded-full transition-all duration-300"
                                style={{
                                    width: activeIndex === i ? '24px' : '6px',
                                    height: '6px',
                                    background: activeIndex === i
                                        ? 'linear-gradient(90deg, #ff6b8a, #c9a0dc)'
                                        : 'rgba(248,200,212,0.3)',
                                }}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                /* Desktop Grid */
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto w-full relative" style={{ zIndex: 2 }}>
                    {memories.map((memory, i) => (
                        <motion.div
                            key={memory.id}
                            className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer"
                            initial={{ opacity: 0, y: 50, rotateY: -10 }}
                            animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                            transition={{ delay: i * 0.15, duration: 0.8, ease: 'easeOut' }}
                            whileHover={{ scale: 1.03, y: -8 }}
                        >
                            <div
                                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500"
                                style={{ background: memory.gradient }}
                            >
                                <span className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-500">{memory.emoji}</span>
                                <p className="text-white text-xl font-medium px-8 text-center" style={{ fontFamily: 'var(--font-display)' }}>
                                    {memory.caption}
                                </p>
                                <p className="text-white/50 text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Click to add your photo
                                </p>
                            </div>
                            {/* Hover glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    boxShadow: 'inset 0 0 60px rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '24px',
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    )
}
