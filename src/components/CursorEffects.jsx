import { useEffect, useRef, useState, useCallback } from 'react'

export default function CursorEffects() {
    const canvasRef = useRef(null)
    const particlesRef = useRef([])
    const mouseRef = useRef({ x: 0, y: 0 })
    const animationRef = useRef(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile('ontouchstart' in window || window.innerWidth < 768)
    }, [])

    // Desktop: Heart cursor trail
    useEffect(() => {
        if (isMobile) return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
            // Add heart particle
            for (let i = 0; i < 1; i++) {
                particlesRef.current.push({
                    x: e.clientX + (Math.random() - 0.5) * 10,
                    y: e.clientY + (Math.random() - 0.5) * 10,
                    size: 6 + Math.random() * 8,
                    life: 1,
                    decay: 0.015 + Math.random() * 0.01,
                    vx: (Math.random() - 0.5) * 1,
                    vy: -0.5 - Math.random() * 1,
                    color: ['#ff6b8a', '#f8c8d4', '#c9a0dc', '#ffd700'][Math.floor(Math.random() * 4)],
                    type: Math.random() > 0.5 ? 'heart' : 'dot',
                })
            }
        }

        document.addEventListener('mousemove', handleMouseMove)

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particlesRef.current = particlesRef.current.filter((p) => p.life > 0)

            particlesRef.current.forEach((p) => {
                p.x += p.vx
                p.y += p.vy
                p.life -= p.decay

                ctx.save()
                ctx.globalAlpha = p.life
                ctx.fillStyle = p.color

                if (p.type === 'heart') {
                    ctx.font = `${p.size * p.life}px serif`
                    ctx.fillText('♥', p.x, p.y)
                } else {
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.size * 0.3 * p.life, 0, Math.PI * 2)
                    ctx.fill()
                }
                ctx.restore()
            })

            // Limit particles
            if (particlesRef.current.length > 80) {
                particlesRef.current = particlesRef.current.slice(-80)
            }

            animationRef.current = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animationRef.current)
        }
    }, [isMobile])

    // Mobile: Touch sparkle effect
    const handleTouch = useCallback((e) => {
        if (!isMobile) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const touch = e.touches?.[0] || e.changedTouches?.[0]
        if (!touch) return

        const x = touch.clientX
        const y = touch.clientY

        // Create sparkle burst
        const sparkles = []
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2
            sparkles.push({
                x, y,
                vx: Math.cos(angle) * (2 + Math.random() * 2),
                vy: Math.sin(angle) * (2 + Math.random() * 2),
                life: 1,
                size: 8 + Math.random() * 10,
                color: ['#ff6b8a', '#ffd700', '#c9a0dc', '#f8c8d4'][Math.floor(Math.random() * 4)],
            })
        }

        let frame = 0
        const maxFrames = 40
        const animateSparkle = () => {
            if (frame > maxFrames) return
            frame++

            sparkles.forEach((s) => {
                s.x += s.vx
                s.y += s.vy
                s.vy += 0.05
                s.life -= 1 / maxFrames

                ctx.save()
                ctx.globalAlpha = s.life
                ctx.font = `${s.size * s.life}px serif`
                ctx.fillText('✨', s.x, s.y)
                ctx.restore()
            })

            requestAnimationFrame(animateSparkle)
        }
        animateSparkle()
    }, [isMobile])

    useEffect(() => {
        if (!isMobile) return
        const canvas = canvasRef.current
        if (!canvas) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        window.addEventListener('resize', resize)
        document.addEventListener('touchstart', handleTouch)

        return () => {
            window.removeEventListener('resize', resize)
            document.removeEventListener('touchstart', handleTouch)
        }
    }, [isMobile, handleTouch])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9999 }}
        />
    )
}
