import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timelineEvents = [
    {
        id: 1,
        title: 'Lần đầu gặp nhau',
        description: 'Khoảnh khắc đầu tiên nhìn thấy em, anh đã biết em là người đặc biệt.',
        emoji: '💫',
        color: '#ff6b8a',
    },
    {
        id: 2,
        title: 'Lần đầu nắm tay',
        description: 'Đôi bàn tay ấm áp ấy đã làm trái tim anh rung động.',
        emoji: '🤝',
        color: '#c9a0dc',
    },
    {
        id: 3,
        title: 'Lần hẹn hò đầu tiên',
        description: 'Một buổi tối lung linh, chỉ có anh và em dưới bầu trời đầy sao.',
        emoji: '🌟',
        color: '#ffd700',
    },
    {
        id: 4,
        title: 'Nói lời yêu thương',
        description: 'Ba chữ ấy thay đổi cuộc đời anh mãi mãi – "Anh yêu em".',
        emoji: '❤️',
        color: '#ff6b8a',
    },
    {
        id: 5,
        title: 'Kỷ niệm ngọt ngào',
        description: 'Mỗi ngày bên em đều là một kỷ niệm đáng quý.',
        emoji: '🎁',
        color: '#c9a0dc',
    },
    {
        id: 6,
        title: 'Hôm nay – 8/3',
        description: 'Ngày hôm nay, anh muốn nói với em rằng: Em là điều tuyệt vời nhất.',
        emoji: '🌹',
        color: '#ff6b8a',
    },
]

function TimelineNode({ event, index, isInView }) {
    const isLeft = index % 2 === 0

    return (
        <motion.div
            className={`relative flex items-start gap-4 md:gap-8 mb-10 md:mb-16 ${
                /* Mobile: always left-aligned; Desktop: alternate */
                'flex-row md:' + (isLeft ? 'flex-row' : 'flex-row-reverse')
                }`}
            initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
        >
            {/* Timeline dot */}
            <div className="flex-shrink-0 relative">
                <motion.div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl relative"
                    style={{
                        background: `linear-gradient(135deg, ${event.color}33, ${event.color}11)`,
                        border: `2px solid ${event.color}66`,
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {event.emoji}
                    {/* Glow ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ border: `1px solid ${event.color}33` }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>
                {/* Connecting line (not on last item) */}
                {index < timelineEvents.length - 1 && (
                    <div
                        className="absolute left-1/2 top-14 w-[1px] h-12 md:h-16 -translate-x-1/2"
                        style={{
                            background: `linear-gradient(180deg, ${event.color}44 0%, transparent 100%)`,
                        }}
                    />
                )}
            </div>

            {/* Content card */}
            <motion.div
                className="glass-card px-6 py-5 md:px-8 md:py-6 flex-1 max-w-md"
                whileHover={{ scale: 1.02, y: -2 }}
                style={{
                    borderColor: `${event.color}22`,
                    boxShadow: `0 4px 30px ${event.color}10`,
                }}
            >
                <h3
                    className="text-lg md:text-xl font-semibold mb-2"
                    style={{ fontFamily: 'var(--font-display)', color: event.color }}
                >
                    {event.title}
                </h3>
                <p
                    className="text-sm md:text-base leading-relaxed"
                    style={{ color: 'rgba(248,200,212,0.75)', fontFamily: 'var(--font-sans)' }}
                >
                    {event.description}
                </p>
            </motion.div>
        </motion.div>
    )
}

export default function LoveTimeline() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.timeline-line',
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                        end: 'bottom 80%',
                        scrub: 1,
                    },
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative min-h-screen section-padding overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at 50% 30%, rgba(255,107,138,0.05) 0%, transparent 50%)',
            }} />

            {/* Section Header */}
            <motion.div
                className="text-center mb-12 md:mb-20"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
            >
                <span
                    className="text-sm tracking-[0.3em] uppercase block mb-4"
                    style={{ color: 'rgba(248,200,212,0.6)', fontFamily: 'var(--font-sans)', fontSize: '11px' }}
                >
                    Our Journey
                </span>
                <h2
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-rose"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    Hành Trình Yêu Thương
                </h2>
            </motion.div>

            {/* Timeline */}
            <div className="relative max-w-2xl mx-auto">
                {/* Central line (GSAP animated) */}
                <div
                    className="timeline-line absolute left-6 md:left-7 top-0 bottom-0 w-[1px] origin-top"
                    style={{
                        background: 'linear-gradient(180deg, rgba(255,107,138,0.4) 0%, rgba(201,160,220,0.3) 50%, transparent 100%)',
                    }}
                />

                {/* Events */}
                {timelineEvents.map((event, i) => (
                    <TimelineNode key={event.id} event={event} index={i} isInView={isInView} />
                ))}
            </div>
        </section>
    )
}
