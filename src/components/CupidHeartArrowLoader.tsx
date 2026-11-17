import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================================================
// LAUNCH CONTROLS: Change the angle and position easily here
// ============================================================================
// 48 = standard diagonal (from lower-left to upper-right)
// Lower (e.g. 35) = steeper / more upright
// Higher (e.g. 58) = flatter / more horizontal
// 0 = straight vertical upwards
// Negative (e.g. -45) = from lower-right to upper-left
const LAUNCH_ANGLE = 45


interface CupidHeartArrowLoaderProps {
  onComplete?: () => void
}

export function CupidHeartArrowLoader({ onComplete }: CupidHeartArrowLoaderProps) {
  // Stages: 1: heart appears, 2: bow/arrow ready, 3: drawn back under tension, 4: shot/impact, 5: exiting
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [isInteractive, setIsInteractive] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Scroll unlock helper
  const unlockScroll = () => {
    document.body.style.overflow = ''
    document.body.style.touchAction = ''
  }

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)

    // Lock body scroll during intro
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    let isMounted = true

    // Preload critical hero photo in background
    const heroImg = new Image()
    heroImg.src = '/photos/hero-photo.png'

    // Sequence timing:
    // Stage 1 (0ms - 1000ms): Heart appears & draws
    // Stage 2 (1000ms+): Diagonal Cupid bow & arrow reveal, interaction enabled
    const timerStage2 = setTimeout(() => {
      if (!isMounted) return
      setStage(2)
      setIsInteractive(true)
    }, mq.matches ? 300 : 1050)

    return () => {
      isMounted = false
      clearTimeout(timerStage2)
      unlockScroll()
    }
  }, [])

  // Handle User Interaction: Tap/Click the arrow or bow
  const handleShootArrow = () => {
    if (!isInteractive || stage >= 3) return
    setIsInteractive(false)

    if (prefersReducedMotion) {
      setStage(4)
      setTimeout(finishAndDismiss, 800)
      return
    }

    // 1. Pull bowstring backward along the diagonal launch axis
    setStage(3)

    // 2. Release & shoot arrow diagonally into heart
    setTimeout(() => {
      setStage(4)
      // 3. Impact celebration (impact bounce + 2 heartbeat pulses + sparkles + embedded arrow)
      setTimeout(finishAndDismiss, 1400)
    }, 280)
  }

  const finishAndDismiss = () => {
    setStage(5)
    unlockScroll()
    setTimeout(() => {
      unlockScroll()
      if (onComplete) onComplete()
    }, 650)
  }

  // Heart SVG path centered at (160, 110)
  const heartPath =
    'M 160, 155 C 160, 155 105, 122 105, 90 C 105, 68 122, 55 140, 55 C 150, 55 158, 61 160, 61 C 162, 61 170, 55 180, 55 C 198, 55 215, 68 215, 90 C 215, 122 160, 155 160, 155 Z'

  return (
    <AnimatePresence onExitComplete={unlockScroll}>
      {stage !== 5 && (
        <motion.div
          key="cupid-loader-overlay"
          className="cupid-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 1.06,
            filter: 'blur(10px)',
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          }}
          role="status"
          aria-live="polite"
          aria-label="Cupid love intro loader"
        >
          {/* Ambient Warm Blush Vignette Glow */}
          <div className="cupid-ambient-glow" aria-hidden="true" />

          {/* Floating Miniature Background Hearts */}
          {!prefersReducedMotion && (
            <div className="cupid-floating-particles" aria-hidden="true">
              <span className="cupid-bg-heart h1">♡</span>
              <span className="cupid-bg-heart h2">🌸</span>
              <span className="cupid-bg-heart h3">♡</span>
              <span className="cupid-bg-heart h4">✦</span>
            </div>
          )}

          <div className="cupid-content-card">
            {/* Upper Heading Text */}
            <div className="cupid-text-zone">
              <AnimatePresence mode="wait">
                {stage === 1 && (
                  <motion.div
                    key="stage-1-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="cupid-eyebrow">A little romantic world...</span>
                    <h2 className="cupid-title">Some things are worth falling for...</h2>
                  </motion.div>
                )}

                {stage === 2 && (
                  <motion.div
                    key="stage-2-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="cupid-eyebrow">A question for your heart ♡</span>
                    <h2 className="cupid-title">Ready to fall in love?</h2>
                  </motion.div>
                )}

                {stage >= 3 && (
                  <motion.div
                    key="stage-3-text"
                    initial={{ opacity: 0, scale: 0.94, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="cupid-eyebrow hit-pulse">✦ Direct hit! ✦</span>
                    <h2 className="cupid-title cupid-title-loved">You've got my heart. ♡</h2>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cupid Stage SVG Canvas */}
            <div className="cupid-stage-wrap">
              <svg
                viewBox="0 0 320 340"
                width="300"
                height="320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cupid-svg"
              >
                <defs>
                  {/* Soft Blush-to-Rose Fluid Fill Gradient */}
                  <linearGradient id="cupidHeartGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#e26a87" />
                    <stop offset="50%" stopColor="#f07e99" />
                    <stop offset="100%" stopColor="#f8c2cd" />
                  </linearGradient>

                  {/* Elegant Cupid Bow Limb Gradient */}
                  <linearGradient id="bowLimbGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d98297" />
                    <stop offset="30%" stopColor="#b53355" />
                    <stop offset="50%" stopColor="#e0758e" />
                    <stop offset="70%" stopColor="#b53355" />
                    <stop offset="100%" stopColor="#d98297" />
                  </linearGradient>

                  {/* Sharp Triangular Arrowhead Gradient */}
                  <linearGradient id="arrowheadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#eb5b7d" />
                    <stop offset="100%" stopColor="#a31a38" />
                  </linearGradient>

                  {/* Arrow Feather Gradient */}
                  <linearGradient id="featherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffd8e2" />
                    <stop offset="100%" stopColor="#e26a87" />
                  </linearGradient>

                  {/* Drop Shadow Filter */}
                  <filter id="cupidSoftShadow" x="-25%" y="-20%" width="150%" height="145%">
                    <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#d84d72" floodOpacity="0.22" />
                  </filter>
                </defs>

                {/* 1. Impact Shockwave Ripple at Heart Center (160, 110) */}
                {stage === 4 && !prefersReducedMotion && (
                  <motion.circle
                    cx="160"
                    cy="110"
                    r="15"
                    stroke="#e26a87"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ r: 15, opacity: 0.95 }}
                    animate={{ r: 90, opacity: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  />
                )}

                {/* 2. Impact Burst Sparkles & Mini Hearts around (160, 110) */}
                {stage === 4 && !prefersReducedMotion && (
                  <g className="cupid-sparkle-burst">
                    {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
                      const rad = (angle * Math.PI) / 180
                      const x2 = 160 + Math.cos(rad) * 52
                      const y2 = 110 + Math.sin(rad) * 48
                      return (
                        <motion.circle
                          key={idx}
                          cx="160"
                          cy="110"
                          r="2.5"
                          fill="#f79bb0"
                          initial={{ cx: 160, cy: 110, opacity: 1, scale: 1 }}
                          animate={{ cx: x2, cy: y2, opacity: 0, scale: 0.4 }}
                          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.05 }}
                        />
                      )
                    })}
                  </g>
                )}

                {/* 3. Central Heart Illustration at (160, 110) */}
                <motion.g
                  className="cupid-heart-group"
                  filter="url(#cupidSoftShadow)"
                  animate={
                    stage === 4
                      ? {
                        // Impact bounce followed by two soft heartbeat pulses
                        scale: [1, 1.25, 0.94, 1.14, 0.98, 1],
                        rotate: [0, -3, 2, -1, 0],
                      }
                      : prefersReducedMotion
                        ? {}
                        : {
                          y: [-3, 3, -3],
                        }
                  }
                  transition={
                    stage === 4
                      ? { duration: 0.9, ease: 'easeInOut' }
                      : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
                  }
                  style={{ transformOrigin: '160px 110px' }}
                >
                  {/* Filled Heart Body */}
                  <motion.path
                    d={heartPath}
                    fill="url(#cupidHeartGrad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.25 }}
                  />

                  {/* Delicate Outline Drawing */}
                  <motion.path
                    d={heartPath}
                    stroke="#c84564"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: prefersReducedMotion ? 0.1 : 1.0, ease: 'easeOut' }}
                  />

                  {/* Inner Soft Heart Glow */}
                  <circle cx="160" cy="105" r="28" fill="#ffffff" opacity="0.32" filter="blur(8px)" />
                </motion.g>

                {/* 4. DIAGONAL CUPID BOW & COMPLETE ARROW GROUP */}
                {/* Rotated by LAUNCH_ANGLE around (160, 110) to aim diagonally from lower-left to upper-right */}
                <g transform={`translate(160, 110) rotate(${LAUNCH_ANGLE})`}>
                  {/* Cupid Recurve Bow (sits at local Y = 185) */}
                  <motion.g
                    className="cupid-bow-group"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={stage >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    onClick={handleShootArrow}
                    style={{ cursor: isInteractive ? 'pointer' : 'default' }}
                  >
                    {/* Bowstring: At rest straight; under tension pulls back to Y = 215; releases on shot */}
                    <motion.path
                      d={
                        stage === 3
                          ? 'M -56 187 L 0 215 L 56 187'
                          : 'M -56 185 Q 0 186 56 185'
                      }
                      stroke="rgba(196, 75, 102, 0.75)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      fill="none"
                      transition={{ duration: 0.2 }}
                    />

                    {/* Symmetrical Cupid Recurve Bow Limbs */}
                    <motion.path
                      d="M -56 185 C -46 172 -22 175 0 185 C 22 175 46 172 56 185 C 44 178 20 182 0 190 C -20 182 -44 178 -56 185 Z"
                      fill="url(#bowLimbGrad)"
                      stroke="#8e1e3b"
                      strokeWidth="0.8"
                      filter="drop-shadow(0 2px 5px rgba(180, 50, 75, 0.25))"
                      animate={
                        stage === 3
                          ? { scaleY: 0.94 } // Limbs flex slightly under tension
                          : { scaleY: 1 }
                      }
                      transition={{ duration: 0.2 }}
                      style={{ transformOrigin: '0px 185px' }}
                    />

                    {/* Central Grip with Tiny Heart Detail */}
                    <rect x="-6" y="182" width="12" height="9" rx="2.5" fill="#8e1e3b" />
                    <path
                      d="M 0 188 C -2.5 185 -5 187 -5 189 C -5 191 0 194 0 194 C 0 194 5 191 5 189 C 5 187 2.5 185 0 188 Z"
                      fill="#ffd4de"
                    />

                    {/* Bow Tip Finials */}
                    <circle cx="-56" cy="185" r="2.2" fill="#ffd4de" stroke="#8e1e3b" strokeWidth="0.8" />
                    <circle cx="56" cy="185" r="2.2" fill="#ffd4de" stroke="#8e1e3b" strokeWidth="0.8" />
                  </motion.g>

                  {/* Complete Illustrated Cupid Arrow */}
                  {/* Stage 1: hidden; Stage 2: idle resting on bowstring (Y=0); Stage 3: pulled back (Y=30); Stage 4: shoots diagonally into heart (Y=-145) */}
                  <motion.g
                    className="cupid-arrow-group"
                    initial={{ opacity: 0 }}
                    animate={
                      stage === 1
                        ? { opacity: 0 }
                        : stage === 2
                          ? {
                            opacity: 1,
                            y: [0, -4, 0],
                            transition: {
                              y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
                              opacity: { duration: 0.4 },
                            },
                          }
                          : stage === 3
                            ? {
                              opacity: 1,
                              y: 30, // Pulled back with bowstring
                              transition: { duration: 0.22, ease: 'easeOut' },
                            }
                            : {
                              // Stage 4: SHOT! Pierces diagonally right through heart center!
                              opacity: 1,
                              y: -145, // Head emerges at upper-right, shaft passes center, feathers visible at lower-left
                              transition: { duration: 0.24, ease: [0.12, 0.8, 0.32, 1] },
                            }
                    }
                    onClick={handleShootArrow}
                    style={{ cursor: isInteractive ? 'pointer' : 'default', transformOrigin: '0px 185px' }}
                  >
                    {/* Generous touch target for mobile */}
                    <rect x="-24" y="65" width="48" height="135" fill="transparent" />

                    {/* Arrow Shaft Shadow / Base Line */}
                    <line
                      x1="0"
                      y1="87"
                      x2="0"
                      y2="184"
                      stroke="#7a1a32"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />

                    {/* Main Slender Arrow Shaft */}
                    <line
                      x1="0"
                      y1="87"
                      x2="0"
                      y2="183"
                      stroke="#d65171"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />

                    {/* Delicate Highlight Along Shaft */}
                    <line
                      x1="-0.6"
                      y1="90"
                      x2="-0.6"
                      y2="178"
                      stroke="#ffe5ec"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      opacity="0.85"
                    />

                    {/* Sharp Sculpted Triangular Arrowhead (Tip at Y=72, Shoulders at Y=88) */}
                    <path
                      d="M 0 72 C 2 76 8 82 8 88 C 8 90 5 90 0 84 C -5 90 -8 90 -8 88 C -8 82 -2 76 0 72 Z"
                      fill="url(#arrowheadGrad)"
                      stroke="#7a1a32"
                      strokeWidth="1"
                    />
                    {/* Arrowhead Central Ridge Highlight */}
                    <path d="M 0 75 L 0 83" stroke="#fff0f4" strokeWidth="1" strokeLinecap="round" opacity="0.9" />

                    {/* Left Symmetrical Fletching (Feather) */}
                    <path
                      d="M -1 156 C -6 158 -11 163 -11 170 C -11 174 -8 177 -1 178 L -1 156 Z"
                      fill="url(#featherGrad)"
                      stroke="#7a1a32"
                      strokeWidth="0.8"
                    />
                    <line x1="-1" y1="161" x2="-8" y2="165" stroke="#7a1a32" strokeWidth="0.6" opacity="0.75" />
                    <line x1="-1" y1="167" x2="-9" y2="171" stroke="#7a1a32" strokeWidth="0.6" opacity="0.75" />
                    <line x1="-1" y1="173" x2="-7" y2="176" stroke="#7a1a32" strokeWidth="0.6" opacity="0.75" />

                    {/* Right Symmetrical Fletching (Feather) */}
                    <path
                      d="M 1 156 C 6 158 11 163 11 170 C 11 174 8 177 1 178 L 1 156 Z"
                      fill="url(#featherGrad)"
                      stroke="#7a1a32"
                      strokeWidth="0.8"
                    />
                    <line x1="1" y1="161" x2="8" y2="165" stroke="#7a1a32" strokeWidth="0.6" opacity="0.75" />
                    <line x1="1" y1="167" x2="9" y2="171" stroke="#7a1a32" strokeWidth="0.6" opacity="0.75" />
                    <line x1="1" y1="173" x2="7" y2="176" stroke="#7a1a32" strokeWidth="0.6" opacity="0.75" />

                    {/* Clearly Defined Nock at Tail End (Y = 183 to 187) */}
                    <path
                      d="M -2.2 183 L -2.2 187 C -1.5 185 1.5 185 2.2 187 L 2.2 183 Z"
                      fill="#fce4ec"
                      stroke="#7a1a32"
                      strokeWidth="0.8"
                    />
                  </motion.g>
                </g>
              </svg>
            </div>

            {/* Stage 2 & 3: Interactive Trigger Button */}
            <div className="cupid-action-zone">
              <AnimatePresence>
                {stage === 2 && (
                  <motion.button
                    type="button"
                    className="cupid-shoot-btn"
                    onClick={handleShootArrow}
                    initial={{ opacity: 0, scale: 0.92, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 5 }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    aria-label="Tap the arrow to shoot Cupid's heart"
                  >
                    <span className="btn-arrow-icon">🏹</span>
                    <span className="btn-text">Tap the arrow to begin ♡</span>
                  </motion.button>
                )}

                {stage === 3 && (
                  <motion.div
                    className="cupid-status-pill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span>Aiming straight for your heart... ♡</span>
                  </motion.div>
                )}

                {stage === 4 && (
                  <motion.div
                    className="cupid-status-pill success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <span>Opening Jitisha's world... 🌸</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
