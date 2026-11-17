import { useState } from 'react'
import { motion } from 'framer-motion'

export function UnfoldingLoveLetter() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="unfolding-letter-container">
      <motion.div
        className="unfolding-letter-wrap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        onViewportEnter={() => {
          setTimeout(() => setIsOpen(true), 400)
        }}
      >
        {/* Ambient Warm Glow */}
        <div className="unfolding-letter-glow" aria-hidden="true" />

        {/* Envelope Base Body */}
        <div className="unfolding-envelope">
          {/* Back Paper */}
          <div className="env-back" />

          {/* Unfolding Handwritten Letter Note */}
          <motion.div
            className="unfolding-parchment"
            initial={{ y: 20, opacity: 0, scale: 0.92 }}
            animate={
              isOpen
                ? {
                    y: -45,
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: 0.55,
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }
                : { y: 20, opacity: 0, scale: 0.92 }
            }
          >
            <div className="parchment-inner">
              <span className="parchment-flower" aria-hidden="true">
                🌸
              </span>
              <p className="parchment-text">
                “Just a little reminder that somewhere in this big world, someone is always wishing you the happiest days. ♡”
              </p>
              <span className="parchment-sign">for you, always ♡</span>
            </div>
          </motion.div>

          {/* Front Flaps (Folds that mask the bottom of letter) */}
          <div className="env-pocket" />

          {/* Top Flap that opens */}
          <motion.div
            className="env-top-flap"
            initial={{ rotateX: 0 }}
            animate={
              isOpen
                ? {
                    rotateX: 180,
                    zIndex: 1,
                    transition: {
                      duration: 0.7,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  }
                : { rotateX: 0, zIndex: 10 }
            }
          >
            <div className="env-flap-triangle">
              <span className="env-heart-seal" aria-hidden="true">
                ♡
              </span>
            </div>
          </motion.div>
        </div>

        {/* Little invitation caption */}
        <motion.p
          className="unfolding-subcaption"
          initial={{ opacity: 0, y: 10 }}
          animate={isOpen ? { opacity: 1, y: 0, transition: { delay: 1.1, duration: 0.6 } } : {}}
        >
          <span>✦ A personal message before your four letters ✦</span>
        </motion.p>
      </motion.div>
    </div>
  )
}
