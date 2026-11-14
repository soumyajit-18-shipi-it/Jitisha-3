import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, Menu, Pause, Play, Sparkles, Volume1, Volume2, VolumeX, X } from 'lucide-react'
import { beIntehaa, chocolates, destinations, dhireDhire, favourites, flowers, letters, personalPhotos, SPOTIFY_PLAYLIST_URL } from './content'

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .7 } } }
function SectionTitle({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return <div className="section-title"><span>{eyebrow || 'A little note'}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
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
  const beAudioRef = useRef<HTMLAudioElement>(null)
  const dhireAudioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
  const scrollTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return <div className="site">
    <audio ref={beAudioRef} loop src={beIntehaa.src} aria-label="Be Intehaa audio" onEnded={() => setBePlaying(false)} />
    <audio ref={dhireAudioRef} src={dhireDhire.src} aria-label="Dhire Dhire audio" onTimeUpdate={e => setDhireProgress(e.currentTarget.duration ? e.currentTarget.currentTime / e.currentTarget.duration * 100 : 0)} onEnded={() => { setDhirePlaying(false); setDhireProgress(0) }} />
    <nav className={navSolid ? 'nav solid' : 'nav'}>
      <button className="brand" onClick={() => scrollTo('home')}>For You <span>♡</span></button>
      <div className={menuOpen ? 'nav-links open' : 'nav-links'}>
        {['About Her', 'Her Little World', 'Dream With You', 'Our Gallery', 'Little Surprises'].map((item, i) => <button key={item} onClick={() => scrollTo(['letter', 'world', 'dreams', 'gallery', 'surprises'][i])}>{item}</button>)}
      </div>
      <div className="nav-tools"><a className="spotify-link" href={SPOTIFY_PLAYLIST_URL} target="_blank" rel="noreferrer" aria-label="Open Spotify playlist"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.58 14.5a.75.75 0 0 1-1.03.25c-2.82-1.72-6.38-2.1-10.57-1.15a.75.75 0 1 1-.33-1.46c4.59-1.05 8.52-.6 11.68 1.33.35.22.46.68.25 1.03Zm1.38-3.06a.94.94 0 0 1-1.29.31c-3.23-1.98-8.16-2.55-11.98-1.4a.94.94 0 1 1-.54-1.8c4.37-1.32 9.81-.68 13.5 1.58.44.27.58.85.31 1.31Zm.12-3.2C14.2 8.1 8.15 7.9 4.65 8.96a1.13 1.13 0 1 1-.65-2.16c4.02-1.22 10.71-.97 14.68 1.39a1.13 1.13 0 0 1-.6 2.05Z" /></svg></a><button className={bePlaying ? 'song-toggle playing' : 'song-toggle'} aria-label="Play or pause Be Intehaa" onClick={toggleBeIntehaa}>{bePlaying ? <Pause size={15} /> : <Play size={15} />}<span>Be Intehaa</span></button><button aria-label={volume === 0 ? 'Unmute sound' : `Set volume to ${volume === 1 ? 'mute' : volume === .5 ? 'low' : 'very low'}`} className={volume > 0 ? 'active' : ''} onClick={cycleVolume}>{volume === 0 ? <VolumeX size={15} /> : volume === 1 ? <Volume2 size={15} /> : <Volume1 size={15} />}</button><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu"><Menu size={20} /></button></div>
    </nav>

    <main>
      <section id="home" className="hero">
        <div className="hero-wash" />
        <div className="petals"><i>✦</i><i>♡</i><i>✦</i><i>·</i></div>
        <motion.div className="hero-copy" initial="hidden" animate="visible" variants={reveal}>
          <span className="eyebrow">For the girl who makes my world brighter...</span>
          <h1>Jitisha <em>♡</em></h1>
          <p>A little corner of the internet, made with a whole lot of love.</p>
          <small>Every little thing here reminds me of you ♡</small>
          <button className="primary" onClick={() => scrollTo('letter')}>Enter your little world <ArrowDown size={16} /></button>
        </motion.div>
        <motion.div className="hero-polaroid" initial={{ opacity: 0, y: 35, rotate: 5 }} animate={{ opacity: 1, y: 0, rotate: 4 }} transition={{ delay: .35, duration: .9 }}>
          <img src={personalPhotos[0].src} alt={personalPhotos[0].alt} /><span>{personalPhotos[0].caption}</span>
        </motion.div>
        <div className="hero-stamp">made<br />with<br /><b>love</b></div>
      </section>

      <section id="letter" className="letter-section section-pad">
        <motion.div className="paper-letter" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal}>
          <div className="letter-image"><img src={personalPhotos[2].src} alt={personalPhotos[2].alt} /><span>you make ordinary moments beautiful</span></div>
          <div className="letter-copy"><SectionTitle eyebrow="A letter for you" title="A Few Words About You ♡" /><p>Sometimes, there are people who make the simplest things feel special.</p><p>The little things about you, your smile, your dreams, the way you enjoy the world around you, and all those tiny details that make you who you are.</p><p>I don't think words can ever completely explain how special someone can be. But I wanted to create this little place for you — a place filled with things you love, little memories, beautiful dreams and a few words from my heart.</p><p>Because you deserve to be reminded of how special you are. And this is my little way of doing that. ♡</p><div className="signature">With love, always.</div></div>
        </motion.div>
      </section>

      <section id="world" className="world section-pad">
        <SectionTitle eyebrow="Her little world" title="Everything That Makes You Smile ♡" copy="A little collection of all the things that make your world beautiful." />
        <div className="world-grid">{favourites.map(([name, src], i) => <motion.article className={`favourite-card card-${i}`} key={name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}><img src={src} alt={name} loading="lazy" /><div><span>{i % 2 ? 'your kind of happiness' : 'little things, big happiness ♡'}</span><h3>{name}</h3></div></motion.article>)}</div>
        <div className="flowers"><div><span>Flowers that remind me of you</span><h3>Soft, beautiful,<br /><i>and impossible to forget.</i></h3></div><div className="flower-photos">{flowers.map(([name, src]) => <figure key={name}><img src={src} alt={name} loading="lazy" /><figcaption>{name} ♡</figcaption></figure>)}</div></div>
      </section>

      <section id="dreams" className="dreams section-pad">
        <SectionTitle eyebrow="Dream with you" title="Places I Dream of Exploring With You ♡" copy="Some places are beautiful. Some would be even more beautiful with you." />
        <div className="destination-scroller">{destinations.map(([name, copy, src]) => <article className="destination-card" key={name}><img src={src} alt={name} loading="lazy" /><div><span>dream destination 0{destinations.findIndex(d => d[0] === name) + 1}</span><h3>{name}</h3><p>{copy}</p></div></article>)}</div>
      </section>

      <section className="cinematic section-pad"><SectionTitle eyebrow="Little dreams" title="Little Things I'd Love to Experience With You." /><div className="cinematic-grid"><article style={{ backgroundImage: "url('/photos/sunset-dream.png')" }}><span>01 — sunset</span><p>Watching the sky change colours, and forgetting about everything else for a while.</p></article><article style={{ backgroundImage: "url('/photos/long-drives.png')" }}><span>02 — long drives</span><p>Favourite songs, endless conversations and nowhere particular to be.</p></article><article style={{ backgroundImage: "url('/photos/beach-proposal.png')" }}><span>03 — by the sea</span><p>Somewhere by the sea, under a beautiful sunset, making a moment worth remembering forever.</p></article></div></section>

      <section id="gallery" className="gallery section-pad"><div className="gallery-petals" aria-hidden="true"><i>♡</i><i>✦</i><i>❀</i><i>♡</i></div><SectionTitle eyebrow="Our gallery" title="My Favourite Little Moments ♡" copy="Because some photographs deserve their own little place in the world." /><div className="gallery-stage"><span className="gallery-note note-left">my favourite<br />little view ♡</span><span className="gallery-note note-right">the sunshine<br />in every photo</span><div className="gallery-ribbon" aria-hidden="true" /><div className="photo-grid">{personalPhotos.map((item, i) => <button className={`gallery-photo gp-${i}`} key={item.src} onClick={() => setPhoto(i)}><img src={item.src} alt={item.alt} loading="lazy" /><span>{item.caption}</span></button>)}</div></div></section>

      <section className="music-section section-pad"><SectionTitle eyebrow="A little music for you" title="Songs That Feel Like You ♡" copy="Some feelings sound better as songs." /><div className="music-player"><div className={dhirePlaying ? 'record spinning' : 'record'}><div className="record-label">♡</div></div><div className="track-info"><span>now playing</span><h3>{dhireDhire.title}</h3><p>{dhireDhire.artist} · a little song for the road home</p><div className="progress"><i style={{ width: `${dhireProgress}%` }} /></div><small className="music-waves">♪ ♫ ♪ &nbsp; press play when you want a little magic</small></div><button className="play-button" onClick={toggleDhire} aria-label={dhirePlaying ? 'Pause Dhire Dhire' : 'Play Dhire Dhire'}>{dhirePlaying ? <Pause /> : <Play />}</button></div></section>

      <section id="surprises" className="surprises section-pad"><SectionTitle eyebrow="Little surprises" title="Little Letters, Just for You." copy="Open one whenever you need a little warmth." /><div className="letter-grid">{letters.map(([label], i) => <button className={`envelope letter-${i}`} key={label} onClick={() => setLetter(i)}><span className="letter-flower">✽</span><span className="envelope-icon"><i /></span><strong>{label}</strong><small>tap to open ♡</small></button>)}</div>
        <div className={giftOpen ? 'gift-card opened' : 'gift-card'}><div className="gift-copy"><span>Sending you a little sweetness</span><h3>A box filled with<br /><i>your favourite things.</i></h3><p>If I could send you a little happiness in a box, it would probably be filled with your favourite chocolates. And maybe a little extra love too. ♡</p></div><button className="gift" onClick={() => setGiftOpen(!giftOpen)} aria-label={giftOpen ? 'Close chocolate gift' : 'Open chocolate gift'}><div className="gift-lid">♡</div><div className="gift-body"><b>for Jitisha</b></div><div className="chocolate-reveal">{chocolates.map(([name, src]) => <figure key={name}><img src={src} alt={name} /><figcaption>{name}</figcaption></figure>)}</div>{giftOpen && <span className="gift-note">You are sweeter than all of these.</span>}</button></div>
        <div className="rose-surprise"><div className="secret-copy"><span>One last little surprise...</span><h2>There's something<br />hidden here for you.</h2><button className="secret-discover" onClick={() => setRoseOpen(open => !open)}>Discover <b>→</b></button></div><motion.button className={roseOpen ? 'secret-illustration opened' : 'secret-illustration'} onClick={() => setRoseOpen(open => !open)} aria-label={roseOpen ? 'Close the secret surprise' : 'Discover the secret surprise'} animate={{ y: roseOpen ? -5 : 0 }}><span className="secret-glow" aria-hidden="true" /><span className="secret-flower flower-one" aria-hidden="true"><i /><i /><b /></span><span className="secret-flower flower-two" aria-hidden="true"><i /><i /><b /></span><span className="secret-envelope" aria-hidden="true"><i className="envelope-flap" /><i className="envelope-fold left" /><i className="envelope-fold right" /><b className="wax-seal">✦</b></span><span className="secret-leaves leaves-left" aria-hidden="true"><i /><i /><i /></span><span className="secret-leaves leaves-right" aria-hidden="true"><i /><i /><i /></span><span className="secret-sparkles" aria-hidden="true">✦　✧　✦</span></motion.button>{roseOpen && <motion.div className="secret-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }}><Sparkles size={18} /><button onClick={() => setRoseOpen(false)} aria-label="Close secret message">×</button><p>You make the world feel softer, brighter and more beautiful. That is the little secret. ♡</p></motion.div>}</div>
      </section>

      <section className="final"><div className="final-overlay" /><div className="final-copy"><span>No matter where life takes you...</span><h2>I hope you always have beautiful places to explore, little reasons to smile, dreams to chase, songs to sing and countless moments that make your heart happy.</h2><p>You deserve all the beautiful things this world has to offer.</p><div className="signature">Made with love, just for you, Jitisha. ♡</div></div></section>
    </main>
    <footer><span>A little world of you ♡</span><span>made with intention, affection & a little magic</span></footer>

    <AnimatePresence>{letter !== null && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLetter(null)}><motion.div className="letter-modal" initial={{ y: 30, scale: .96 }} animate={{ y: 0, scale: 1 }} onClick={e => e.stopPropagation()}><button className="close" onClick={() => setLetter(null)} aria-label="Close letter"><X /></button><span>for you, always</span><h2>{letters[letter][0]}</h2><p>{letters[letter][1]}</p><div className="signature">with love ♡</div></motion.div></motion.div>}</AnimatePresence>
    <AnimatePresence>{photo !== null && <motion.div className="modal-backdrop photo-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPhoto(null)}><button className="close" onClick={() => setPhoto(null)} aria-label="Close photo"><X /></button><button className="lightbox-arrow left" onClick={e => { e.stopPropagation(); setPhoto((photo + personalPhotos.length - 1) % personalPhotos.length) }} aria-label="Previous photo"><ArrowLeft /></button><img src={personalPhotos[photo].src} alt={personalPhotos[photo].alt} onClick={e => e.stopPropagation()} /><button className="lightbox-arrow right" onClick={e => { e.stopPropagation(); setPhoto((photo + 1) % personalPhotos.length) }} aria-label="Next photo"><ArrowRight /></button></motion.div>}</AnimatePresence>
  </div>
}

export default App
