import { motion } from 'framer-motion'

export default function ScrollIndicator() {
    return (
        <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
        >
            <motion.span
                className="text-sm tracking-[0.2em] uppercase"
                style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'rgba(248, 200, 212, 0.6)',
                    fontSize: '11px',
                    letterSpacing: '0.25em'
                }}
            >
                Scroll down
            </motion.span>
            <motion.div
                className="w-[1px] h-8"
                style={{ background: 'linear-gradient(180deg, rgba(255,107,138,0.6) 0%, transparent 100%)' }}
                animate={{ scaleY: [1, 0.5, 1], opacity: [0.8, 0.3, 0.8] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,107,138,0.6)" strokeWidth="2">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
            </motion.div>
        </motion.div>
    )
}
