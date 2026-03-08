import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicToggle() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const audioContextRef = useRef(null)
    const oscillatorsRef = useRef([])
    const gainNodeRef = useRef(null)
    const intervalRef = useRef(null)

    // Simple piano melody generator using Web Audio API
    const startMusic = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
        }
        const ctx = audioContextRef.current

        if (ctx.state === 'suspended') {
            ctx.resume()
        }

        const masterGain = ctx.createGain()
        masterGain.gain.value = 0.08
        masterGain.connect(ctx.destination)
        gainNodeRef.current = masterGain

        // Romantic piano notes (C major scale melody)
        const notes = [
            261.63, 329.63, 392.00, 523.25, 392.00, 329.63,
            293.66, 349.23, 440.00, 523.25, 440.00, 349.23,
            261.63, 329.63, 392.00, 523.25, 587.33, 523.25,
            440.00, 392.00, 349.23, 329.63, 293.66, 261.63,
        ]

        let noteIndex = 0
        const playNote = () => {
            const freq = notes[noteIndex % notes.length]
            const osc = ctx.createOscillator()
            const noteGain = ctx.createGain()

            osc.type = 'sine'
            osc.frequency.value = freq

            noteGain.gain.setValueAtTime(0, ctx.currentTime)
            noteGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1)
            noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5)

            osc.connect(noteGain)
            noteGain.connect(masterGain)

            osc.start(ctx.currentTime)
            osc.stop(ctx.currentTime + 1.5)

            // Add subtle harmony
            const harmOsc = ctx.createOscillator()
            const harmGain = ctx.createGain()
            harmOsc.type = 'sine'
            harmOsc.frequency.value = freq * 1.5
            harmGain.gain.setValueAtTime(0, ctx.currentTime)
            harmGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1)
            harmGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)
            harmOsc.connect(harmGain)
            harmGain.connect(masterGain)
            harmOsc.start(ctx.currentTime)
            harmOsc.stop(ctx.currentTime + 1.2)

            noteIndex++
        }

        playNote()
        intervalRef.current = setInterval(playNote, 800)
        setIsLoaded(true)
    }

    const stopMusic = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.5)
        }
    }

    const toggleMusic = () => {
        if (isPlaying) {
            stopMusic()
        } else {
            startMusic()
        }
        setIsPlaying(!isPlaying)
    }

    useEffect(() => {
        return () => {
            stopMusic()
            if (audioContextRef.current) {
                audioContextRef.current.close()
            }
        }
    }, [])

    return (
        <motion.button
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center cursor-pointer"
            style={{
                zIndex: 100,
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: isPlaying
                    ? '0 0 20px rgba(255,107,138,0.3), 0 4px 15px rgba(0,0,0,0.2)'
                    : '0 4px 15px rgba(0,0,0,0.2)',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
            title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
            <AnimatePresence mode="wait">
                {isPlaying ? (
                    <motion.div
                        key="playing"
                        className="flex items-center gap-[3px]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-[3px] rounded-full"
                                style={{ background: '#ff6b8a' }}
                                animate={{ height: [8, 16, 8] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.6,
                                    delay: i * 0.15,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <motion.span
                        key="paused"
                        className="text-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        🎵
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    )
}
