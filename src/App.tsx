import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, Menu, Pause, Play, Sparkles, Volume1, Volume2, VolumeX, X, Heart, Music, ExternalLink } from 'lucide-react'
import { beIntehaa, chocolates, destinations, dhireDhire, favourites, flowers, letters, loveReasons, personalPhotos, SPOTIFY_PLAYLIST_URL } from './content'

interface HeartParticle {
  id: number
  x: number
  y: number
  symbol: string
  color: string
  size: number
  rotation: number
}

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .7 } } }
function SectionTitle({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return <div className="section-title"><span>{eyebrow || 'A little note'}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}

function MessageBoxDiagram({ variant = 0 }: { variant?: number }) {
  const themes = [
    { bg: '#fff5f7', flap: '#ffe8ee', stroke: '#c65b79', seal: '#c65b79', fold: 'rgba(198, 91, 121, 0.35)' },
    { bg: '#fff9f2', flap: '#fdefdf', stroke: '#c4687d', seal: '#b8546b', fold: 'rgba(196, 104, 125, 0.35)' },
    { bg: '#faf4fb', flap: '#f3e5f7', stroke: '#a85b88', seal: '#9d4f7d', fold: 'rgba(168, 91, 136, 0.35)' },
    { bg: '#fdf7f4', flap: '#faebe4', stroke: '#c65b79', seal: '#bd4b6b', fold: 'rgba(198, 91, 121, 0.35)' },
  ]
  const t = themes[variant % themes.length]

  return (
    <div className="envelope-diagram" aria-hidden="true">
      <svg viewBox="0 0 76 52" width="76" height="52" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft shadow rect under envelope (avoids WebKit SVG filter quirks) */}
        <rect x="4" y="5" width="68" height="44" rx="4" fill="rgba(120, 45, 70, 0.08)" />

        {/* Envelope Base Box */}
        <rect x="3" y="3" width="70" height="46" rx="4" fill={t.bg} stroke={t.stroke} strokeWidth="1.5" />

        {/* Diagonal Interior Folds */}
        <path d="M3 49 L38 27 L3 3" stroke={t.fold} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M73 49 L38 27 L73 3" stroke={t.fold} strokeWidth="1.2" strokeLinecap="round" />

        {/* Bottom Fold Contour */}
        <path d="M3 49 L38 27 L73 49 Z" fill={t.flap} fillOpacity="0.55" stroke={t.stroke} strokeWidth="1.2" strokeLinejoin="round" />

        {/* Top Folded Flap */}
        <path d="M3 3 L38 29 L73 3 Z" fill={t.flap} stroke={t.stroke} strokeWidth="1.5" strokeLinejoin="round" />

        {/* Delicate Inner Highlight */}
        <path d="M8 5 L38 27 L68 5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />

        {/* Wax Seal Outer & Inner Ring */}
        <circle cx="38" cy="29" r="8" fill={t.seal} />
        <circle cx="38" cy="29" r="6.8" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="1.5 1.5" fill="none" opacity="0.85" />

        {/* Heart Stamped in Center of Wax Seal */}
        <path
          d="M38 32 C38 32 34.5 29.5 34.5 27.5 C34.5 26.4 35.3 25.6 36.4 25.6 C37.1 25.6 37.7 26 38 26.6 C38.3 26 38.9 25.6 39.6 25.6 C40.7 25.6 41.5 26.4 41.5 27.5 C41.5 29.5 38 32 38 32 Z"
          fill="#ffffff"
        />
      </svg>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [volume, setVolume] = useState(1)
  const [bePlaying, setBePlaying] = useState(false)
  const [dhirePlaying, setDhirePlaying] = useState(false)
  const [dhireProgress, setDhireProgress] = useState(0)
  const [letter, setLetter] = useState<number | null>(null)
  const [photo, setPhoto] = useState<number | null>(null)
  const [roseOpen, setRoseOpen] = useState(false)
  const [giftOpen, setGiftOpen] = useState(false)
  const [navSolid, setNavSolid] = useState(false)
  const [hearts, setHearts] = useState<HeartParticle[]>([])
  const [reasonIndex, setReasonIndex] = useState(0)
  const [noteFlip, setNoteFlip] = useState(false)
  const [hugCount, setHugCount] = useState(0)
  const [hugMessage, setHugMessage] = useState('')
  const beAudioRef = useRef<HTMLAudioElement>(null)
  const dhireAudioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Floating tap/click heart particles
  useEffect(() => {
    const symbols = ['♡', '✨', '🌸', '💕', '✦']
    const colors = ['#c65b79', '#e8a5b5', '#d4728c', '#e2889e', '#b8506e']

    const handlePointerDown = (e: MouseEvent) => {
      // Don't spawn if clicking inside close buttons or modals
      const target = e.target as HTMLElement
      if (target.closest('.close, .drawer-close, input, textarea')) return

      const newParticle: HeartParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.floor(Math.random() * 8) + 16,
        rotation: (Math.random() - 0.5) * 40
      }

      setHearts(prev => [...prev.slice(-12), newParticle])
      setTimeout(() => {
        setHearts(prev => prev.filter(p => p.id !== newParticle.id))
      }, 950)
    }

    window.addEventListener('click', handlePointerDown)
    return () => window.removeEventListener('click', handlePointerDown)
  }, [])

  // Lock body scroll when mobile menu or modal is open
  useEffect(() => {
    if (menuOpen || letter !== null || photo !== null) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [menuOpen, letter, photo])

  useEffect(() => {
    if (beAudioRef.current) beAudioRef.current.volume = volume
    if (dhireAudioRef.current) dhireAudioRef.current.volume = volume
  }, [volume])

  const cycleVolume = () => {
    setVolume(current => current === 1 ? .5 : current === .5 ? .2 : current === .2 ? 0 : 1)
  }

  const toggleBeIntehaa = () => {
    if (!beAudioRef.current || !dhireAudioRef.current) return
    if (bePlaying) {
      beAudioRef.current.pause()
      setBePlaying(false)
      return
    }
    dhireAudioRef.current.pause()
    setDhirePlaying(false)
    beAudioRef.current.play().then(() => setBePlaying(true)).catch(() => setBePlaying(false))
  }

  const toggleDhire = () => {
    if (!beAudioRef.current || !dhireAudioRef.current) return
    if (dhirePlaying) {
      dhireAudioRef.current.pause()
      setDhirePlaying(false)
      return
    }
    beAudioRef.current.pause()
    setBePlaying(false)
    dhireAudioRef.current.play().then(() => setDhirePlaying(true)).catch(() => setDhirePlaying(false))
  }

  const handleSeekDhire = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dhireAudioRef.current || !dhireAudioRef.current.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, clickX / rect.width))
    dhireAudioRef.current.currentTime = percentage * dhireAudioRef.current.duration
    setDhireProgress(percentage * 100)
  }

  const nextReason = () => {
    setNoteFlip(true)
    setTimeout(() => {
      setReasonIndex(prev => (prev + 1) % loveReasons.length)
      setNoteFlip(false)
    }, 220)
  }

  const handleSendHug = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newCount = hugCount + 1
    setHugCount(newCount)

    const messages = [
      'A soft, gentle hug sent straight to you ♡',
      'Another warm, tight hug to make you smile 🌸',
      'Wrapping you in the coziest little hug right now!',
      'Holding you safe, warm, and happy in my thoughts ♡',
      'You are so deeply cherished and loved 💕',
      'An infinite supply of hugs, forever reserved for you ♡'
    ]
    setHugMessage(messages[(newCount - 1) % messages.length])

    // Fountain of hearts bursting from the button
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const symbols = ['♡', '💕', '🌸', '✨', '💖']
    const colors = ['#c65b79', '#e8a5b5', '#d4728c', '#e2889e']

    const burstParticles: HeartParticle[] = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      x: centerX + (Math.random() - 0.5) * 80,
      y: centerY + (Math.random() - 0.5) * 20,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.floor(Math.random() * 8) + 18,
      rotation: (Math.random() - 0.5) * 50
    }))

    setHearts(prev => [...prev.slice(-15), ...burstParticles])
  }

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const navOffset = 70
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '')
      setTimeout(() => scrollTo(id), 150)
    }
  }, [])

  const navItems = [
    { label: 'About Her', id: 'letter', icon: '💌' },
    { label: 'Her Little World', id: 'world', icon: '🌸' },
    { label: 'Dream With You', id: 'dreams', icon: '✨' },
    { label: 'Our Gallery', id: 'gallery', icon: '📷' },
    { label: 'Little Surprises', id: 'surprises', icon: '🎁' },
  ]

  return (
    <div className="site">
      {/* Interactive Tap & Click Floating Hearts */}
      <div className="tap-hearts-layer" aria-hidden="true">
        {hearts.map(h => (
          <span
            key={h.id}
            className="tap-heart"
            style={{
              left: `${h.x}px`,
              top: `${h.y}px`,
              color: h.color,
              fontSize: `${h.size}px`,
              transform: `translate(-50%, -50%) rotate(${h.rotation}deg)`
            }}
          >
            {h.symbol}
          </span>
        ))}
      </div>

      <audio ref={beAudioRef} loop src={beIntehaa.src} aria-label="Be Intehaa audio" onEnded={() => setBePlaying(false)} />
      <audio ref={dhireAudioRef} src={dhireDhire.src} aria-label="Dhire Dhire audio" onTimeUpdate={e => setDhireProgress(e.currentTarget.duration ? e.currentTarget.currentTime / e.currentTarget.duration * 100 : 0)} onEnded={() => { setDhirePlaying(false); setDhireProgress(0) }} />

      {/* Main Navbar */}
      <nav className={navSolid ? 'nav solid' : 'nav'}>
        <button className="brand" onClick={() => scrollTo('home')} aria-label="Scroll to home">
          For You <span>♡</span>
        </button>

        {/* Desktop nav links */}
        <div className="nav-links">
          {navItems.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)}>
              {item.label}
            </button>
          ))}
        </div>

        {/* Nav Tools */}
        <div className="nav-tools">
          <a className="spotify-link" href={SPOTIFY_PLAYLIST_URL} target="_blank" rel="noreferrer" aria-label="Open Spotify playlist">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.58 14.5a.75.75 0 0 1-1.03.25c-2.82-1.72-6.38-2.1-10.57-1.15a.75.75 0 1 1-.33-1.46c4.59-1.05 8.52-.6 11.68 1.33.35.22.46.68.25 1.03Zm1.38-3.06a.94.94 0 0 1-1.29.31c-3.23-1.98-8.16-2.55-11.98-1.4a.94.94 0 1 1-.54-1.8c4.37-1.32 9.81-.68 13.5 1.58.44.27.58.85.31 1.31Zm.12-3.2C14.2 8.1 8.15 7.9 4.65 8.96a1.13 1.13 0 1 1-.65-2.16c4.02-1.22 10.71-.97 14.68 1.39a1.13 1.13 0 0 1-.6 2.05Z" />
            </svg>
          </a>

          <button className={bePlaying ? 'song-toggle playing' : 'song-toggle'} aria-label={bePlaying ? 'Pause Be Intehaa' : 'Play Be Intehaa'} onClick={toggleBeIntehaa}>
            {bePlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>Be Intehaa</span>
          </button>

          <button aria-label={volume === 0 ? 'Unmute sound' : `Set volume to ${volume === 1 ? 'mute' : volume === .5 ? 'low' : 'very low'}`} className={`vol-btn ${volume > 0 ? 'active' : ''}`} onClick={cycleVolume}>
            {volume === 0 ? <VolumeX size={16} /> : volume === 1 ? <Volume2 size={16} /> : <Volume1 size={16} />}
          </button>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              <div className="drawer-header">
                <span className="drawer-brand">For You <i>♡</i></span>
                <button className="drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>

              <div className="drawer-body">
                <div className="drawer-nav-links">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      className="drawer-nav-item"
                      onClick={() => scrollTo(item.id)}
                    >
                      <span className="drawer-item-icon">{item.icon}</span>
                      <span className="drawer-item-label">{item.label}</span>
                      <span className="drawer-item-arrow">→</span>
                    </button>
                  ))}
                </div>

                <div className="drawer-divider" />

                <div className="drawer-music-panel">
                  <span className="drawer-subheading">A Little Music ♡</span>
                  <div className="drawer-music-card">
                    <button
                      className={`drawer-song-btn ${bePlaying ? 'playing' : ''}`}
                      onClick={toggleBeIntehaa}
                      aria-label={bePlaying ? 'Pause Be Intehaa' : 'Play Be Intehaa'}
                    >
                      <span className="drawer-play-icon">
                        {bePlaying ? <Pause size={16} /> : <Play size={16} />}
                      </span>
                      <div className="drawer-song-meta">
                        <strong>Be Intehaa</strong>
                        <small>Race 2 · Special Track</small>
                      </div>
                    </button>

                    <a
                      className="drawer-spotify-btn"
                      href={SPOTIFY_PLAYLIST_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.58 14.5a.75.75 0 0 1-1.03.25c-2.82-1.72-6.38-2.1-10.57-1.15a.75.75 0 1 1-.33-1.46c4.59-1.05 8.52-.6 11.68 1.33.35.22.46.68.25 1.03Zm1.38-3.06a.94.94 0 0 1-1.29.31c-3.23-1.98-8.16-2.55-11.98-1.4a.94.94 0 1 1-.54-1.8c4.37-1.32 9.81-.68 13.5 1.58.44.27.58.85.31 1.31Zm.12-3.2C14.2 8.1 8.15 7.9 4.65 8.96a1.13 1.13 0 1 1-.65-2.16c4.02-1.22 10.71-.97 14.68 1.39a1.13 1.13 0 0 1-.6 2.05Z" />
                      </svg>
                      <span>Open Playlist</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="drawer-footer">
                <span>Every little thing reminds me of you ♡</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-wash" />
          <div className="petals" aria-hidden="true"><i>✦</i><i>♡</i><i>✦</i><i>·</i></div>
          <div className="hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">For the girl who makes my world brighter...</span>
              <h1>Jitisha <em>♡</em></h1>
              <p>A little corner of the internet, made with a whole lot of love.</p>
              <small className="hero-whisper-desktop">Every little thing here reminds me of you ♡</small>
              <button className="primary hero-btn-desktop" onClick={() => scrollTo('letter')}>
                Enter your little world <ArrowDown size={16} />
              </button>
            </div>
            <div className="hero-polaroid">
              <img src={personalPhotos[0].src} alt={personalPhotos[0].alt} />
              <span>{personalPhotos[0].caption}</span>
            </div>

            {/* Mobile Action placed under the polaroid */}
            <div className="hero-mobile-action">
              <button className="primary hero-btn-mobile" onClick={() => scrollTo('letter')}>
                Enter your little world <ArrowDown size={16} />
              </button>
              <small>Every little thing here reminds me of you ♡</small>
            </div>
          </div>
          <div className="hero-stamp" aria-hidden="true">made<br />with<br /><b>love</b></div>
        </section>

        {/* Letter / About Her Section */}
        <section id="letter" className="letter-section section-pad">
          <motion.div className="paper-letter" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal}>
            <div className="letter-image">
              <img src={personalPhotos[2].src} alt={personalPhotos[2].alt} loading="lazy" />
              <span>you make ordinary moments beautiful</span>
            </div>
            <div className="letter-copy">
              <SectionTitle eyebrow="A letter for you" title="A Few Words About You ♡" />
              <p>Sometimes, there are people who make the simplest things feel special.</p>
              <p>The little things about you, your smile, your dreams, the way you enjoy the world around you, and all those tiny details that make you who you are.</p>
              <p>I don't think words can ever completely explain how special someone can be. But I wanted to create this little place for you — a place filled with things you love, little memories, beautiful dreams and a few words from my heart.</p>
              <p>Because you deserve to be reminded of how special you are. And this is my little way of doing that. ♡</p>
              <div className="signature">With love, always.</div>
            </div>
          </motion.div>
        </section>

        {/* Her Little World & Favourites Section */}
        <section id="world" className="world section-pad">
          <SectionTitle eyebrow="Her little world" title="Everything That Makes You Smile ♡" copy="A little collection of all the things that make your world beautiful." />
          <div className="world-grid">
            {favourites.map(([name, src], i) => (
              <motion.article
                className={`favourite-card card-${i}`}
                key={name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={reveal}
              >
                <img src={src} alt={name} loading="lazy" />
                <div>
                  <span>{i % 2 ? 'your kind of happiness' : 'little things, big happiness ♡'}</span>
                  <h3>{name}</h3>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="flowers">
            <div className="flowers-copy">
              <span>Flowers that remind me of you</span>
              <h3>Soft, beautiful,<br /><i>and impossible to forget.</i></h3>
            </div>
            <div className="flower-photos">
              {flowers.map(([name, src]) => (
                <figure key={name}>
                  <img src={src} alt={name} loading="lazy" />
                  <figcaption>{name} ♡</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Dream Destinations Section */}
        <section id="dreams" className="dreams section-pad">
          <SectionTitle eyebrow="Dream with you" title="Places I Dream of Exploring With You ♡" copy="Some places are beautiful. Some would be even more beautiful with you." />
          <div className="destination-scroller">
            {destinations.map(([name, copy, src]) => (
              <article className="destination-card" key={name}>
                <img src={src} alt={name} loading="lazy" />
                <div>
                  <span>dream destination 0{destinations.findIndex(d => d[0] === name) + 1}</span>
                  <h3>{name}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Romantic Dreams / Cinematic Section */}
        <section className="cinematic section-pad">
          <SectionTitle eyebrow="Little dreams" title="Little Things I'd Love to Experience With You." />
          <div className="cinematic-grid">
            <article style={{ backgroundImage: "url('/photos/sunset-dream.png')" }}>
              <span>01 — sunset</span>
              <p>Watching the sky change colours, and forgetting about everything else for a while.</p>
            </article>
            <article style={{ backgroundImage: "url('/photos/long-drives.png')" }}>
              <span>02 — long drives</span>
              <p>Favourite songs, endless conversations and nowhere particular to be.</p>
            </article>
            <article style={{ backgroundImage: "url('/photos/beach-proposal.png')" }}>
              <span>03 — by the sea</span>
              <p>Somewhere by the sea, under a beautiful sunset, making a moment worth remembering forever.</p>
            </article>
          </div>
        </section>

        {/* Photo Gallery Scrapbook Section */}
        <section id="gallery" className="gallery section-pad">
          <div className="gallery-petals" aria-hidden="true"><i>♡</i><i>✦</i><i>❀</i><i>♡</i></div>
          <SectionTitle eyebrow="Our gallery" title="My Favourite Little Moments ♡" copy="Because some photographs deserve their own little place in the world." />
          <div className="gallery-stage">
            <div className="gallery-notes-bar">
              <span className="gallery-note note-left">my favourite little view ♡</span>
              <span className="gallery-note note-right">the sunshine in every photo</span>
            </div>
            <div className="gallery-ribbon" aria-hidden="true" />
            <div className="photo-grid">
              {personalPhotos.map((item, i) => (
                <button
                  className={`gallery-photo gp-${i}`}
                  key={item.src}
                  onClick={() => setPhoto(i)}
                  aria-label={`Open photo ${i + 1}: ${item.caption}`}
                >
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <span>{item.caption}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Music Player Section */}
        <section className="music-section section-pad">
          <SectionTitle eyebrow="A little music for you" title="Songs That Feel Like You ♡" copy="Some feelings sound better as songs." />
          <div className="music-player">
            <div className={dhirePlaying ? 'record spinning' : 'record'}>
              <div className="record-label">♡</div>
            </div>
            {dhirePlaying && (
              <div className="music-notes-floating" aria-hidden="true">
                <span style={{ animationDelay: '0s' }}>♪</span>
                <span style={{ animationDelay: '0.6s' }}>♫</span>
                <span style={{ animationDelay: '1.2s' }}>♡</span>
                <span style={{ animationDelay: '1.8s' }}>♩</span>
              </div>
            )}
            <div className="track-info">
              <span>now playing</span>
              <h3>{dhireDhire.title}</h3>
              <p>{dhireDhire.artist} · a little song for the road home</p>
              <div
                className="progress"
                onClick={handleSeekDhire}
                role="slider"
                aria-label="Song progress"
                aria-valuenow={Math.round(dhireProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
                tabIndex={0}
              >
                <i style={{ width: `${dhireProgress}%` }} />
              </div>
              <small className="music-waves">♪ ♫ ♪ &nbsp; press play when you want a little magic</small>
            </div>
            <button className="play-button" onClick={toggleDhire} aria-label={dhirePlaying ? 'Pause Dhire Dhire' : 'Play Dhire Dhire'}>
              {dhirePlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>
          </div>
        </section>

        {/* Little Surprises Section */}
        <section id="surprises" className="surprises section-pad">
          <SectionTitle eyebrow="Little surprises" title="Little Letters, Just for You." copy="Open one whenever you need a little warmth." />
          <div className="letter-grid">
            {letters.map(([label], i) => (
              <button
                className={`envelope letter-${i}`}
                key={label}
                onClick={() => setLetter(i)}
                aria-label={`Open letter: ${label}`}
              >
                <span className="letter-flower" aria-hidden="true">✽</span>
                <MessageBoxDiagram variant={i} />
                <strong>{label}</strong>
                <small>tap to open ♡</small>
              </button>
            ))}
          </div>

          {/* A Little Jar of Love Reasons */}
          <div className="love-jar-card">
            <div className="love-jar-top">
              <span className="love-jar-badge">
                <Sparkles size={14} /> Reason #{reasonIndex + 1} of {loveReasons.length} <Sparkles size={14} />
              </span>
              <h3>Why You Are So Adored ♡</h3>
            </div>
            <div className={`love-jar-text ${noteFlip ? 'flipping' : ''}`}>
              <span className="quote-glyph">“</span>
              <p>{loveReasons[reasonIndex]}</p>
              <span className="quote-glyph end">”</span>
            </div>
            <div className="love-jar-actions">
              <button className="love-jar-btn" onClick={nextReason}>
                <span>Pick another reason</span>
                <b>🌸</b>
              </button>
            </div>
          </div>

          {/* Send a Warm Virtual Hug */}
          <div className="hug-container">
            <button className="hug-btn" onClick={handleSendHug} aria-label="Send a warm hug">
              <Heart className="hug-icon" size={20} fill="#c65b79" />
              <span>Send a Warm Hug to Jitisha ♡</span>
            </button>
            {hugCount > 0 && (
              <motion.div
                className="hug-toast"
                initial={{ opacity: 0, y: 10, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={hugCount}
              >
                <strong>{hugCount} {hugCount === 1 ? 'warm hug' : 'warm hugs'} sent with love!</strong>
                <p>{hugMessage}</p>
              </motion.div>
            )}
          </div>

          {/* Chocolate Gift Box */}
          <div className={giftOpen ? 'gift-card opened' : 'gift-card'}>
            <div className="gift-copy">
              <span>Sending you a little sweetness</span>
              <h3>A box filled with<br /><i>your favourite things.</i></h3>
              <p>If I could send you a little happiness in a box, it would probably be filled with your favourite chocolates. And maybe a little extra love too. ♡</p>
              <small className="gift-prompt">{giftOpen ? 'Tap box to close ♡' : 'Tap the box to open your surprise ♡'}</small>
            </div>
            <button
              className="gift"
              onClick={() => setGiftOpen(!giftOpen)}
              aria-label={giftOpen ? 'Close chocolate gift box' : 'Open chocolate gift box'}
            >
              <div className="gift-lid">♡</div>
              <div className="gift-body"><b>for Jitisha</b></div>
              <div className="chocolate-reveal">
                {chocolates.map(([name, src]) => (
                  <figure key={name}>
                    <img src={src} alt={name} loading="lazy" />
                    <figcaption>{name}</figcaption>
                  </figure>
                ))}
              </div>
              {giftOpen && <span className="gift-note">You are sweeter than all of these.</span>}
            </button>
          </div>

          {/* Rose & Secret Message Surprise */}
          <div className="rose-surprise">
            <div className="secret-copy">
              <span>One last little surprise...</span>
              <h2>There's something<br />hidden here for you.</h2>
              <button
                className="secret-discover"
                onClick={() => setRoseOpen(open => !open)}
                aria-expanded={roseOpen}
              >
                {roseOpen ? 'Close secret' : 'Discover'} <b>{roseOpen ? '✕' : '→'}</b>
              </button>
            </div>

            <motion.button
              className={roseOpen ? 'secret-illustration opened' : 'secret-illustration'}
              onClick={() => setRoseOpen(open => !open)}
              aria-label={roseOpen ? 'Close the secret envelope' : 'Open the secret envelope'}
              animate={{ y: roseOpen ? -5 : 0 }}
            >
              <span className="secret-glow" aria-hidden="true" />
              <span className="secret-flower flower-one" aria-hidden="true"><i /><i /><b /></span>
              <span className="secret-flower flower-two" aria-hidden="true"><i /><i /><b /></span>
              <span className="secret-envelope" aria-hidden="true">
                <i className="envelope-flap" />
                <i className="envelope-fold left" />
                <i className="envelope-fold right" />
                <b className="wax-seal">✦</b>
              </span>
              <span className="secret-leaves leaves-left" aria-hidden="true"><i /><i /><i /></span>
              <span className="secret-leaves leaves-right" aria-hidden="true"><i /><i /><i /></span>
              <span className="secret-sparkles" aria-hidden="true">✦　✧　✦</span>
            </motion.button>

            <AnimatePresence>
              {roseOpen && (
                <motion.div
                  className="secret-card"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                >
                  <Sparkles size={18} />
                  <button onClick={() => setRoseOpen(false)} aria-label="Close secret message">×</button>
                  <p>You make the world feel softer, brighter and more beautiful. That is the little secret. ♡</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Final Ending Section */}
        <section className="final">
          <div className="final-overlay" />
          <div className="final-copy">
            <span>No matter where life takes you...</span>
            <h2>I hope you always have beautiful places to explore, little reasons to smile, dreams to chase, songs to sing and countless moments that make your heart happy.</h2>
            <p>You deserve all the beautiful things this world has to offer.</p>
            <div className="signature">Made with love, just for you, Jitisha. ♡</div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <span className="footer-title">A little world of you ♡</span>
        <span className="footer-sub">made with intention, affection & a little magic</span>
      </footer>

      {/* Interactive Letter Modal */}
      <AnimatePresence>
        {letter !== null && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLetter(null)}
          >
            <motion.div
              className="letter-modal"
              initial={{ y: 30, scale: .96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: .96 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close" onClick={() => setLetter(null)} aria-label="Close letter">
                <X size={20} />
              </button>
              <span>for you, always</span>
              <h2>{letters[letter][0]}</h2>
              <div className="letter-body-scroll">
                <p>{letters[letter][1]}</p>
              </div>
              <div className="signature">with love ♡</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Lightbox Modal */}
      <AnimatePresence>
        {photo !== null && (
          <motion.div
            className="modal-backdrop photo-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPhoto(null)}
          >
            <button className="close lightbox-close" onClick={() => setPhoto(null)} aria-label="Close photo">
              <X size={24} />
            </button>
            <button
              className="lightbox-arrow left"
              onClick={e => {
                e.stopPropagation()
                setPhoto((photo + personalPhotos.length - 1) % personalPhotos.length)
              }}
              aria-label="Previous photo"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="lightbox-image-container" onClick={e => e.stopPropagation()}>
              <img src={personalPhotos[photo].src} alt={personalPhotos[photo].alt} />
              <div className="lightbox-caption">{personalPhotos[photo].caption}</div>
              <div className="lightbox-mobile-controls">
                <button
                  className="lightbox-arrow-mobile"
                  onClick={e => {
                    e.stopPropagation()
                    setPhoto((photo + personalPhotos.length - 1) % personalPhotos.length)
                  }}
                  aria-label="Previous photo"
                >
                  <ArrowLeft size={18} />
                </button>
                <span className="lightbox-counter">{photo + 1} / {personalPhotos.length}</span>
                <button
                  className="lightbox-arrow-mobile"
                  onClick={e => {
                    e.stopPropagation()
                    setPhoto((photo + 1) % personalPhotos.length)
                  }}
                  aria-label="Next photo"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
            <button
              className="lightbox-arrow right"
              onClick={e => {
                e.stopPropagation()
                setPhoto((photo + 1) % personalPhotos.length)
              }}
              aria-label="Next photo"
            >
              <ArrowRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
