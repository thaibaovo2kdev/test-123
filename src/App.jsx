import { useEffect, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './components/Hero'
import FloatingPetals from './components/FloatingPetals'
import MusicToggle from './components/MusicToggle'
import CursorEffects from './components/CursorEffects'

gsap.registerPlugin(ScrollTrigger)

// Lazy load heavy sections for performance
const RomanticMessage = lazy(() => import('./components/RomanticMessage'))
const MemoryGallery = lazy(() => import('./components/MemoryGallery'))
const LoveTimeline = lazy(() => import('./components/LoveTimeline'))
const GiftBox = lazy(() => import('./components/GiftBox'))
const LoveLetter = lazy(() => import('./components/LoveLetter'))

function SectionLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: '#ff6b8a' }} />
        <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: '#c9a0dc', animationDelay: '0.3s' }} />
        <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: '#ffd700', animationDelay: '0.6s' }} />
      </div>
    </div>
  )
}

export default function App() {
  useEffect(() => {
    // Smooth scroll setup
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    })

    // Parallax effect on sections
    const sections = document.querySelectorAll('section')
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0.3 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Global effects */}
      <FloatingPetals count={18} />
      <CursorEffects />
      <MusicToggle />

      {/* Main content */}
      <main>
        <Hero />

        {/* Divider */}
        <div className="py-4 md:py-10">
          <div className="section-divider" />
        </div>

        <Suspense fallback={<SectionLoader />}>
          <RomanticMessage />
        </Suspense>
        {/* 
        <div className="py-4 md:py-10">
          <div className="section-divider" />
        </div>

        <Suspense fallback={<SectionLoader />}>
          <MemoryGallery />
        </Suspense> */}
        {/* 
        <div className="py-4 md:py-10">
          <div className="section-divider" />
        </div> */}

        {/* <Suspense fallback={<SectionLoader />}>
          <LoveTimeline />
        </Suspense> */}

        <div className="py-4 md:py-10">
          <div className="section-divider" />
        </div>

        <Suspense fallback={<SectionLoader />}>
          <GiftBox />
        </Suspense>

        <div className="py-4 md:py-10">
          <div className="section-divider" />
        </div>

        <Suspense fallback={<SectionLoader />}>
          <LoveLetter />
        </Suspense>
      </main>

      {/* Global background overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(26,10,30,0.3) 50%, transparent 100%)',
      }} />
    </div>
  )
}
