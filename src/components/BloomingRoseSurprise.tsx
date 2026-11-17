import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Heart } from 'lucide-react'

export function BloomingRoseSurprise() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [hasBloomed, setHasBloomed] = useState(false)

  return (
    <div className="rose-surprise-wrapper">
      <div className="secret-copy">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          One last little surprise...
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          There's something<br />hidden here for you.
        </motion.h2>
        <motion.button
          className="secret-discover"
          onClick={() => setIsRevealed(prev => !prev)}
          aria-expanded={isRevealed}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isRevealed ? 'Close secret' : 'Tap the rose to open'} <b>{isRevealed ? '✕' : '♡'}</b>
        </motion.button>
      </div>

      <motion.div
        className="blooming-rose-stage"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        onViewportEnter={() => setHasBloomed(true)}
      >
        {/* Soft Blush-Pink Glowing Circular Backdrop */}
        <div className="rose-ambient-circle" aria-hidden="true" />

        {/* Floating Mini Petals Drifting around the Flower */}
        <div className="rose-floating-petals" aria-hidden="true">
          <motion.span
            className="rose-petal-dot dot-1"
            animate={{
              y: [-6, 8, -6],
              x: [-4, 6, -4],
              rotate: [0, 20, 0],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            🌸
          </motion.span>
          <motion.span
            className="rose-petal-dot dot-2"
            animate={{
              y: [8, -8, 8],
              x: [6, -4, 6],
              rotate: [15, -15, 15],
              opacity: [0.5, 0.85, 0.5],
            }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            ♡
          </motion.span>
          <motion.span
            className="rose-petal-dot dot-3"
            animate={{
              y: [-4, 10, -4],
              x: [4, -6, 4],
              rotate: [-10, 25, -10],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            🌸
          </motion.span>
        </div>

        {/* Interactive Blooming Rose Graphic */}
        <motion.button
          type="button"
          className={`rose-bloom-btn ${isRevealed ? 'bloomed-active' : ''}`}
          onClick={() => setIsRevealed(prev => !prev)}
          aria-label={isRevealed ? 'Close romantic secret message' : 'Open romantic secret message by tapping the rose'}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <svg
            viewBox="0 0 160 220"
            width="150"
            height="210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="blooming-rose-svg"
          >
            <defs>
              <linearGradient id="roseStemGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7a9a6b" />
                <stop offset="100%" stopColor="#4f7342" />
              </linearGradient>
              <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8cb37c" />
                <stop offset="100%" stopColor="#4e7240" />
              </linearGradient>
              <linearGradient id="petalGradOuter" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fca5b7" />
                <stop offset="50%" stopColor="#eb5b7d" />
                <stop offset="100%" stopColor="#c82d50" />
              </linearGradient>
              <linearGradient id="petalGradInner" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f8839d" />
                <stop offset="100%" stopColor="#b52044" />
              </linearGradient>
              <filter id="roseGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#d84d72" floodOpacity="0.22" />
              </filter>
            </defs>

            {/* Stem — Draws naturally upward */}
            <motion.path
              d="M 80 210 Q 76 150 80 110"
              stroke="url(#roseStemGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={hasBloomed ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            />

            {/* Left Leaf */}
            <motion.path
              d="M 78 165 C 50 160 45 135 60 142 C 75 148 78 165 78 165 Z"
              fill="url(#leafGrad)"
              initial={{ scale: 0, opacity: 0 }}
              animate={hasBloomed ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              style={{ transformOrigin: '78px 165px' }}
            />

            {/* Right Leaf */}
            <motion.path
              d="M 80 145 C 108 140 115 115 100 122 C 85 128 80 145 80 145 Z"
              fill="url(#leafGrad)"
              initial={{ scale: 0, opacity: 0 }}
              animate={hasBloomed ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: 'easeOut' }}
              style={{ transformOrigin: '80px 145px' }}
            />

            {/* Sepals / Base under bud */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={hasBloomed ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <path d="M 70 112 C 72 105 79 108 80 110 C 81 108 88 105 90 112 C 85 116 75 116 70 112 Z" fill="#587c4b" />
            </motion.g>

            {/* Blooming Rose Petals Group */}
            <g filter="url(#roseGlowFilter)">
              {/* Outer Left Petal — Unfurls left */}
              <motion.path
                d="M 80 110 C 50 105 38 75 52 55 C 64 38 80 52 80 110 Z"
                fill="url(#petalGradOuter)"
                initial={{ scale: 0.4, rotate: -25, opacity: 0 }}
                animate={
                  hasBloomed
                    ? { scale: 1, rotate: 0, opacity: 0.95 }
                    : { scale: 0.4, rotate: -25, opacity: 0 }
                }
                transition={{ duration: 1.1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: '80px 110px' }}
              />

              {/* Outer Right Petal — Unfurls right */}
              <motion.path
                d="M 80 110 C 110 105 122 75 108 55 C 96 38 80 52 80 110 Z"
                fill="url(#petalGradOuter)"
                initial={{ scale: 0.4, rotate: 25, opacity: 0 }}
                animate={
                  hasBloomed
                    ? { scale: 1, rotate: 0, opacity: 0.95 }
                    : { scale: 0.4, rotate: 25, opacity: 0 }
                }
                transition={{ duration: 1.1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: '80px 110px' }}
              />

              {/* Center Back Petal */}
              <motion.path
                d="M 80 110 C 58 85 55 45 80 35 C 105 45 102 85 80 110 Z"
                fill="url(#petalGradInner)"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={
                  hasBloomed
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.3, opacity: 0 }
                }
                transition={{ duration: 1.2, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: '80px 110px' }}
              />

              {/* Inner Swirl Petal Left */}
              <motion.path
                d="M 80 98 C 65 85 64 60 76 50 C 86 42 88 58 80 98 Z"
                fill="#fca5b7"
                initial={{ scale: 0.2, rotate: -15, opacity: 0 }}
                animate={
                  hasBloomed
                    ? { scale: 1, rotate: 0, opacity: 0.92 }
                    : { scale: 0.2, rotate: -15, opacity: 0 }
                }
                transition={{ duration: 1.0, delay: 1.0, ease: 'easeOut' }}
                style={{ transformOrigin: '80px 98px' }}
              />

              {/* Inner Swirl Petal Right / Bud Core */}
              <motion.path
                d="M 80 98 C 95 85 96 60 84 50 C 74 42 72 58 80 98 Z"
                fill="#ffccd7"
                initial={{ scale: 0.2, rotate: 15, opacity: 0 }}
                animate={
                  hasBloomed
                    ? { scale: 1, rotate: 0, opacity: 0.95 }
                    : { scale: 0.2, rotate: 15, opacity: 0 }
                }
                transition={{ duration: 1.0, delay: 1.0, ease: 'easeOut' }}
                style={{ transformOrigin: '80px 98px' }}
              />

              {/* Golden Core Heart Sparkle */}
              <motion.circle
                cx="80"
                cy="62"
                r="3.5"
                fill="#fff6d6"
                initial={{ scale: 0, opacity: 0 }}
                animate={hasBloomed ? { scale: [1, 1.3, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 1.8, delay: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </g>
          </svg>

          <span className="rose-tap-hint">
            <Heart size={13} fill="#e26a87" color="#e26a87" /> tap rose to reveal secret
          </span>
        </motion.button>

        {/* Revealed Secret Note Modal Card */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              className="secret-card"
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="secret-card-top">
                <Sparkles size={18} color="#e0728c" />
                <span className="secret-card-badge">A whispered truth</span>
                <button
                  onClick={() => setIsRevealed(false)}
                  aria-label="Close secret message"
                  className="secret-close-btn"
                >
                  ✕
                </button>
              </div>
              <p>You make the world feel softer, brighter and so much more beautiful. That is the little secret. ♡</p>
              <span className="secret-card-sign">for Jitisha, always and truly.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
