
import { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X } from 'lucide-react';

export function BloomingRoseSurprise() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasBloomed, setHasBloomed] = useState(false);

  const uniqueId = useId().replace(/:/g, '');
  const stemGradient = `stem-${uniqueId}`;
  const leafGradient = `leaf-${uniqueId}`;
  const outerPetal = `outer-${uniqueId}`;
  const innerPetal = `inner-${uniqueId}`;
  const roseShadow = `shadow-${uniqueId}`;

  const floatingPetals = [
    { left: '8%', top: '35%', delay: 0, duration: 5.5, rotate: 35 },
    { left: '84%', top: '25%', delay: 1.1, duration: 6.5, rotate: -40 },
    { left: '15%', top: '72%', delay: 2, duration: 5.8, rotate: 65 },
    { left: '88%', top: '68%', delay: 0.7, duration: 7, rotate: -55 },
    { left: '50%', top: '8%', delay: 1.8, duration: 6, rotate: 25 },
  ];

  return (
    <section className="rose-surprise-wrapper">

      {/* Heading */}
      <div className="secret-copy">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          One last little surprise...
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          There's something
          <br />
          hidden here for you.
        </motion.h2>
      </div>

      {/* Rose Stage */}
      <motion.div
        className="blooming-rose-stage"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8 }}
        onViewportEnter={() => setHasBloomed(true)}
      >

        {/* Ambient glow */}
        <motion.div
          className="rose-ambient-circle"
          animate={{
            scale: [0.96, 1.07, 0.96],
            opacity: [0.35, 0.58, 0.35],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating petals */}
        <div className="rose-floating-petals" aria-hidden="true">
          {floatingPetals.map((petal, index) => (
            <motion.span
              key={index}
              className="floating-rose-petal"
              style={{
                left: petal.left,
                top: petal.top,
              }}
              animate={{
                y: [-8, 12, -8],
                x: [-5, 8, -5],
                rotate: [petal.rotate, petal.rotate + 35, petal.rotate],
                opacity: [0.25, 0.8, 0.25],
              }}
              transition={{
                duration: petal.duration,
                delay: petal.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              ✿
            </motion.span>
          ))}
        </div>

        {/* Main interactive rose */}
        <motion.button
          type="button"
          className={`rose-bloom-btn ${isRevealed ? 'bloomed-active' : ''}`}
          onClick={() => setIsRevealed(prev => !prev)}
          aria-label={
            isRevealed
              ? 'Close romantic secret message'
              : 'Open romantic secret message'
          }
          aria-expanded={isRevealed}
          whileHover={{ scale: 1.035 }}
          whileTap={{ scale: 0.96 }}
        >

          <motion.svg
            viewBox="0 0 220 280"
            className="blooming-rose-svg"
            xmlns="http://www.w3.org/2000/svg"
            initial="hidden"
            animate={hasBloomed ? 'visible' : 'hidden'}
          >
            <defs>

              <linearGradient id={stemGradient} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9ab77d" />
                <stop offset="55%" stopColor="#648b51" />
                <stop offset="100%" stopColor="#3e683c" />
              </linearGradient>

              <linearGradient id={leafGradient} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#b3ce91" />
                <stop offset="50%" stopColor="#729b60" />
                <stop offset="100%" stopColor="#456c40" />
              </linearGradient>

              <linearGradient id={outerPetal} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffd0da" />
                <stop offset="38%" stopColor="#f38ca6" />
                <stop offset="75%" stopColor="#dc5278" />
                <stop offset="100%" stopColor="#a92e53" />
              </linearGradient>

              <linearGradient id={innerPetal} x1="0" y1="0" x2="0.8" y2="1">
                <stop offset="0%" stopColor="#ffb6c8" />
                <stop offset="45%" stopColor="#ed6689" />
                <stop offset="100%" stopColor="#9e234c" />
              </linearGradient>

              <radialGradient id={`core-${uniqueId}`}>
                <stop offset="0%" stopColor="#8f1f43" />
                <stop offset="55%" stopColor="#d83e6c" />
                <stop offset="100%" stopColor="#f7a3b7" />
              </radialGradient>

              <filter id={roseShadow} x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="5" />
              </filter>

            </defs>

            {/* Rose shadow */}
            <ellipse
              cx="110"
              cy="255"
              rx="43"
              ry="6"
              fill="#b64c6a"
              opacity="0.13"
              filter={`url(#${roseShadow})`}
            />

            {/* Stem and leaves */}
            <motion.g
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >

              <motion.path
                d="M110 257 C100 219 122 184 110 148"
                stroke={`url(#${stemGradient})`}
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={hasBloomed ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
              />

              {/* Left leaf */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={hasBloomed ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{
                  transformOrigin: '104px 205px',
                }}
              >
                <path
                  d="M105 208 C75 215 55 193 63 180 C78 177 101 190 105 208Z"
                  fill={`url(#${leafGradient})`}
                />
                <path
                  d="M103 207 Q83 192 66 183"
                  stroke="#d1dfad"
                  strokeWidth="1.2"
                  fill="none"
                  opacity="0.8"
                />
              </motion.g>

              {/* Right leaf */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={hasBloomed ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                style={{
                  transformOrigin: '114px 185px',
                }}
              >
                <path
                  d="M113 190 C137 184 157 166 154 151 C137 150 119 167 113 190Z"
                  fill={`url(#${leafGradient})`}
                />
                <path
                  d="M115 188 Q137 166 150 154"
                  stroke="#d1dfad"
                  strokeWidth="1.2"
                  fill="none"
                  opacity="0.8"
                />
              </motion.g>

              {/* Small third leaf */}
              <motion.path
                d="M108 230 C88 228 81 213 86 207 C98 209 106 219 108 230Z"
                fill={`url(#${leafGradient})`}
                initial={{ scale: 0 }}
                animate={hasBloomed ? { scale: 1 } : {}}
                transition={{ delay: 1.1, duration: 0.7 }}
                style={{ transformOrigin: '108px 230px' }}
              />
            </motion.g>

            {/* Sepals */}
            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              animate={hasBloomed ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.8 }}
              style={{ transformOrigin: '110px 145px' }}
            >
              <path
                d="M110 150 C91 145 83 134 85 125 C100 130 108 137 110 150Z"
                fill="#527c48"
              />
              <path
                d="M110 150 C129 145 137 134 135 125 C120 130 112 137 110 150Z"
                fill="#638c50"
              />
            </motion.g>

            {/* Flower sway */}
            <motion.g
              animate={
                hasBloomed
                  ? { rotate: [0, 1.5, 0, -1.5, 0] }
                  : { rotate: 0 }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: '110px 150px' }}
            >

              {/* Outer petals */}
              <motion.path
                d="M110 150 C72 158 40 132 43 96 C45 63 76 51 101 75 C109 91 111 123 110 150Z"
                fill={`url(#${outerPetal})`}
                stroke="#d65a79"
                strokeWidth="0.8"
                initial={{ opacity: 0, scale: 0.45, rotate: -25 }}
                animate={hasBloomed ? {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                } : {}}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: '110px 150px' }}
              />

              <motion.path
                d="M110 150 C148 158 180 132 177 96 C175 63 144 51 119 75 C111 91 109 123 110 150Z"
                fill={`url(#${outerPetal})`}
                stroke="#d65a79"
                strokeWidth="0.8"
                initial={{ opacity: 0, scale: 0.45, rotate: 25 }}
                animate={hasBloomed ? {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                } : {}}
                transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: '110px 150px' }}
              />

              {/* Top back petal */}
              <motion.path
                d="M110 145 C75 117 72 73 91 48 C103 31 121 31 133 48 C152 73 145 117 110 145Z"
                fill={`url(#${outerPetal})`}
                stroke="#df6481"
                strokeWidth="0.8"
                initial={{ opacity: 0, scale: 0.3, y: 18 }}
                animate={hasBloomed ? {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                } : {}}
                transition={{ duration: 1.3, delay: 1, ease: 'easeOut' }}
                style={{ transformOrigin: '110px 145px' }}
              />

              {/* Front lower petal */}
              <motion.path
                d="M69 119 C72 151 91 164 110 165 C130 164 150 151 151 119 C138 131 126 135 110 137 C94 135 82 131 69 119Z"
                fill={`url(#${outerPetal})`}
                stroke="#cf5273"
                strokeWidth="0.8"
                initial={{ opacity: 0, scale: 0.3, y: 12 }}
                animate={hasBloomed ? {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                } : {}}
                transition={{ duration: 1.1, delay: 1.15 }}
                style={{ transformOrigin: '110px 145px' }}
              />

              {/* Inner petals */}
              <motion.path
                d="M110 137 C83 122 82 92 96 73 C108 58 129 67 133 88 C139 110 124 129 110 137Z"
                fill={`url(#${innerPetal})`}
                stroke="#c53d65"
                strokeWidth="0.7"
                initial={{ opacity: 0, scale: 0.2, rotate: -25 }}
                animate={hasBloomed ? {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                } : {}}
                transition={{ duration: 1.1, delay: 1.25 }}
                style={{ transformOrigin: '110px 137px' }}
              />

              <motion.path
                d="M110 137 C137 122 138 92 124 73 C112 58 91 67 87 88 C81 110 96 129 110 137Z"
                fill={`url(#${innerPetal})`}
                stroke="#c53d65"
                strokeWidth="0.7"
                initial={{ opacity: 0, scale: 0.2, rotate: 25 }}
                animate={hasBloomed ? {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                } : {}}
                transition={{ duration: 1.1, delay: 1.35 }}
                style={{ transformOrigin: '110px 137px' }}
              />

              {/* Central curled petals */}
              <motion.path
                d="M110 125 C91 110 96 82 111 78 C126 76 134 96 121 109 C115 115 105 112 105 103 C104 96 112 91 118 96 C124 102 117 108 112 106"
                stroke="#8f2448"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={hasBloomed ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 1.55 }}
              />

              <motion.path
                d="M110 123 C100 114 102 101 111 97 C119 94 124 105 117 111"
                stroke="#ffb4c6"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={hasBloomed ? { pathLength: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.8 }}
              />

              {/* Petal highlights */}
              <motion.path
                d="M70 91 Q77 64 96 66"
                stroke="#ffe2e8"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ opacity: 0 }}
                animate={hasBloomed ? { opacity: 0.75 } : {}}
                transition={{ delay: 1.5, duration: 1 }}
              />

              <motion.path
                d="M150 91 Q143 64 124 66"
                stroke="#ffe2e8"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ opacity: 0 }}
                animate={hasBloomed ? { opacity: 0.75 } : {}}
                transition={{ delay: 1.6, duration: 1 }}
              />

            </motion.g>

            {/* Tiny centre sparkle */}
            <motion.circle
              cx="110"
              cy="105"
              r="3"
              fill="#fff1d6"
              animate={
                hasBloomed
                  ? { scale: [0.8, 1.5, 0.8], opacity: [0.5, 1, 0.5] }
                  : { opacity: 0 }
              }
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

          </motion.svg>

          <span className="rose-tap-hint">
            <Heart size={13} fill="#e26a87" color="#e26a87" />
            {isRevealed ? 'a little secret for you' : 'tap the rose to reveal a secret'}
          </span>

        </motion.button>

        {/* Secret message */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              className="secret-card"
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.92,
                rotate: -2,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
                y: 15,
                scale: 0.95,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="secret-card-top">
                <Sparkles size={18} color="#e0728c" />

                <span className="secret-card-badge">
                  A whispered truth
                </span>

                <button
                  onClick={() => setIsRevealed(false)}
                  aria-label="Close secret message"
                  className="secret-close-btn"
                >
                  <X size={15} />
                </button>
              </div>

              <p>
                You make the world feel softer, brighter and so much more
                beautiful. That is the little secret. ♡
              </p>

              <span className="secret-card-sign">
                for Jitisha, always and truly.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </section>
  );
}
