import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function RomanticMessage() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.romantic-bg-glow',
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        end: 'center center',
                        scrub: 1,
                    },
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center section-padding overflow-hidden"
        >
            {/* Background glow */}
            <div className="romantic-bg-glow absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(155,89,182,0.1) 0%, transparent 60%)',
            }} />

            {/* Decorative particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 20 }, (_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${2 + Math.random() * 4}px`,
                            height: `${2 + Math.random() * 4}px`,
                            background: i % 3 === 0 ? 'rgba(255,107,138,0.4)' : i % 3 === 1 ? 'rgba(201,160,220,0.3)' : 'rgba(255,215,0,0.3)',
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative max-w-2xl mx-auto text-center" style={{ zIndex: 2 }}>
                {/* Decorative quote marks */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 0.15, scale: 1 } : {}}
                    transition={{ duration: 1 }}
                    className="text-6xl md:text-8xl absolute -top-8 -left-4 md:-left-12"
                    style={{ fontFamily: 'var(--font-display)', color: 'rgba(255,107,138,0.3)' }}
                >
                    &ldquo;
                </motion.div>

                <motion.p
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-8"
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontStyle: 'italic',
                        color: '#f8c8d4',
                        lineHeight: 1.8,
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.2, delay: 0.2 }}
                >
                    Cảm ơn em vì đã đến bên anh.
                </motion.p>

                <motion.p
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed"
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontStyle: 'italic',
                        color: 'rgba(248,200,212,0.8)',
                        lineHeight: 1.8,
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.2, delay: 0.6 }}
                >
                    Cuộc sống của anh trở nên đẹp hơn từ khi có em.
                </motion.p>

                {/* Decorative closing quote */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 0.15, scale: 1 } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-6xl md:text-8xl absolute -bottom-8 -right-4 md:-right-12"
                    style={{ fontFamily: 'var(--font-display)', color: 'rgba(255,107,138,0.3)' }}
                >
                    &rdquo;
                </motion.div>

                {/* Decorative line */}
                <motion.div
                    className="mx-auto mt-12 h-[1px] w-32"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,138,0.4), transparent)' }}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, delay: 1 }}
                />

                {/* Heart */}
                <motion.div
                    className="mt-6 text-2xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 1.2, type: 'spring' }}
                >
                    💗
                </motion.div>
            </div>
        </section>
    )
}
