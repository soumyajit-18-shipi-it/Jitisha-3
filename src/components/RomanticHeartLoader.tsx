import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RomanticHeartLoaderProps {
  onComplete?: () => void
}

export function RomanticHeartLoader({ onComplete }: RomanticHeartLoaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isFinishing, setIsFinishing] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Standard organic romantic heart path centered in 160 x 150 viewBox
  const heartPath =
    'M 80, 132 C 80, 132 22, 92 22, 54 C 22, 28 42, 16 62, 16 C 72, 16 78, 24 80, 24 C 82, 24 88, 16 98, 16 C 118, 16 138, 28 138, 54 C 138, 92 80, 132 80, 132 Z'

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Helper to safely unlock scroll
    const unlockScroll = () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }

    // Lock body scroll while loader is actively presenting
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    let isMounted = true
    const startTime = Date.now()
    const minDisplayTime = mediaQuery.matches ? 400 : 1800 // Ensure smooth romantic sequence
    const maxSafetyTimeout = 3200 // Never block the user indefinitely

    const finishLoading = () => {
      if (!isMounted) return
      setIsFinishing(true)
      // Restore scrolling immediately when finishing/fadeout begins
      unlockScroll()
      // Allow final gentle heartbeat pulse before smooth fadeout
      setTimeout(() => {
        if (!isMounted) return
        unlockScroll()
        setIsVisible(false)
        if (onComplete) onComplete()
      }, mediaQuery.matches ? 100 : 450)
    }

    // Preload critical hero photo
    const heroImg = new Image()
    heroImg.src = '/photos/hero-photo.png'

    const checkReady = () => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minDisplayTime - elapsed)
      setTimeout(finishLoading, remaining)
    }

    if (heroImg.complete && document.readyState === 'complete') {
      checkReady()
    } else {
      let isReadyTriggered = false
      const onReady = () => {
        if (isReadyTriggered) return
        isReadyTriggered = true
        checkReady()
      }
      heroImg.onload = onReady
      heroImg.onerror = onReady
      window.addEventListener('load', onReady, { once: true })

      // Maximum safety fallback
      const timer = setTimeout(onReady, maxSafetyTimeout)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('load', onReady)
        isMounted = false
        unlockScroll()
      }
    }

    return () => {
      isMounted = false
      unlockScroll()
    }
  }, [onComplete])

  const unlockScroll = () => {
    document.body.style.overflow = ''
    document.body.style.touchAction = ''
  }

  return (
    <AnimatePresence onExitComplete={unlockScroll}>
      {isVisible && (
        <motion.div
          key="romantic-loader-overlay"
          className={`romantic-loader-overlay ${isFinishing ? 'finishing' : ''}`}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: prefersReducedMotion ? 0.2 : 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          role="status"
          aria-live="polite"
          aria-label="Preparing a little world of love"
        >
          {/* Subtle Romantic Ambient Glow */}
          <div className="loader-ambient-glow" aria-hidden="true" />

          <div className="loader-content">
            {/* Central Heart Canvas */}
            <div className="loader-heart-wrap">
              {/* Miniature Floating Hearts drifting upward */}
              {!prefersReducedMotion && (
                <div className="loader-floating-hearts" aria-hidden="true">
                  <motion.span
                    className="floating-mini-heart heart-left"
                    initial={{ opacity: 0, y: 0, x: -12, scale: 0.6 }}
                    animate={{
                      opacity: [0, 0.9, 0],
                      y: [-8, -42, -68],
                      x: [-12, -26, -20],
                      scale: [0.6, 1, 0.75],
                    }}
                    transition={{
                      delay: 0.8,
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  >
                    ♡
                  </motion.span>
                  <motion.span
                    className="floating-mini-heart heart-right"
                    initial={{ opacity: 0, y: 4, x: 14, scale: 0.55 }}
                    animate={{
                      opacity: [0, 0.85, 0],
                      y: [-4, -40, -64],
                      x: [14, 28, 22],
                      scale: [0.55, 0.95, 0.7],
                    }}
                    transition={{
                      delay: 1.1,
                      duration: 2.6,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  >
                    ♡
                  </motion.span>
                  <motion.span
                    className="floating-mini-heart heart-top"
                    initial={{ opacity: 0, y: -4, x: 0, scale: 0.5 }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      y: [-12, -48, -75],
                      x: [0, 8, -4],
                      scale: [0.5, 0.88, 0.65],
                    }}
                    transition={{
                      delay: 1.4,
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  >
                    ♡
                  </motion.span>
                </div>
              )}

              {/* Heart SVG with Drawing Outline, Liquid Fill, and Inner Pulse */}
              <motion.div
                className="loader-heart-svg-box"
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                      scale: isFinishing ? [1, 1.16, 1] : [1, 1.07, 1.01, 1.08, 1],
                    }
                }
                transition={
                  prefersReducedMotion
                    ? {}
                    : {
                      duration: isFinishing ? 0.45 : 1.45,
                      repeat: isFinishing ? 0 : Infinity,
                      repeatDelay: 0.25,
                      ease: 'easeInOut',
                      delay: 0.5,
                    }
                }
              >
                <svg
                  viewBox="0 0 160 150"
                  width="136"
                  height="126"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="loader-heart-svg"
                >
                  <defs>
                    {/* Soft Blush-to-Rose Fluid Fill Gradient */}
                    <linearGradient id="loaderFillGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#e26a87" />
                      <stop offset="55%" stopColor="#ea849b" />
                      <stop offset="100%" stopColor="#f8c2cd" />
                    </linearGradient>

                    {/* Inner Heart Glow Gradient */}
                    <radialGradient id="innerGlowGrad" cx="50%" cy="45%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                      <stop offset="60%" stopColor="#ffd8e2" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#ea849b" stopOpacity="0" />
                    </radialGradient>

                    {/* Fluid Rising Liquid Clip */}
                    <clipPath id="loaderHeartLiquidClip">
                      <motion.rect
                        x="10"
                        width="140"
                        initial={{ y: prefersReducedMotion ? 10 : 140, height: prefersReducedMotion ? 130 : 0 }}
                        animate={{ y: 10, height: 130 }}
                        transition={{
                          duration: prefersReducedMotion ? 0.1 : 1.25,
                          delay: prefersReducedMotion ? 0 : 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </clipPath>

                    {/* Romantic Soft Glow Filter */}
                    <filter id="loaderHeartFilter" x="-25%" y="-20%" width="150%" height="145%">
                      <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#d84d72" floodOpacity="0.25" />
                    </filter>
                  </defs>

                  {/* 1. Fluid Filling Layer (Masked from bottom to top) */}
                  <g filter="url(#loaderHeartFilter)">
                    <path d={heartPath} fill="url(#loaderFillGrad)" clipPath="url(#loaderHeartLiquidClip)" />
                  </g>

                  {/* 2. Delicate Progressive Heart Outline Drawing */}
                  <motion.path
                    d={heartPath}
                    stroke="#d4637e"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: prefersReducedMotion ? 1 : 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.1 : 1.05,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                  />

                  {/* 3. Tiny Glowing Heart at Core */}
                  {!prefersReducedMotion && (
                    <motion.path
                      d="M 80, 78 C 80, 78 58, 64 58, 50 C 58, 41 65, 36 73, 36 C 77, 36 79.5, 39.5 80, 39.5 C 80.5, 39.5 83, 36 87, 36 C 95, 36 102, 41 102, 50 C 102, 64 80, 78 80, 78 Z"
                      fill="url(#innerGlowGrad)"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{
                        opacity: [0, 0.9, 0.55, 0.95, 0.6],
                        scale: [0.6, 1, 0.93, 1.06, 0.95],
                      }}
                      transition={{
                        delay: 0.7,
                        duration: 2.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{ transformOrigin: '80px 56px' }}
                    />
                  )}
                </svg>
              </motion.div>
            </div>

            {/* Typography & Messages */}
            <motion.div
              className="loader-text-area"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0.1 : 0.65, duration: 0.8, ease: 'easeOut' }}
            >
              <h2 className="loader-title">Preparing a little world of love...</h2>
              <p className="loader-subtitle">Just for you, Jitisha ♡</p>

              {/* Subtle Animated Progress Track */}
              <div className="loader-progress-track">
                <motion.div
                  className="loader-progress-fill"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: prefersReducedMotion ? 0.2 : 1.85,
                    ease: 'easeInOut',
                  }}
                />
              </div>

              {/* Soft Sparkling Accents */}
              <div className="loader-sparkles" aria-hidden="true">
                <span>✦</span>
                <span className="heart-dot">♡</span>
                <span>✦</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
