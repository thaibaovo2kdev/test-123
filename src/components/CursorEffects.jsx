import { useEffect, useRef, useState } from 'react'

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

    // On mobile, don't render canvas at all
    if (isMobile) return null

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9999 }}
        />
    )
}
