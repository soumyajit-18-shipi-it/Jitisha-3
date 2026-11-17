import { useEffect, useRef } from 'react'

interface Petal {
  x: number
  y: number
  size: number
  speedY: number
  swaySpeed: number
  swayAngle: number
  swayWidth: number
  rotation: number
  rotationSpeed: number
  flip: number
  flipSpeed: number
  color: string
  opacity: number
}

const PETAL_COLORS = [
  'rgba(216, 68, 98, 0.65)',   // Rose crimson
  'rgba(235, 120, 145, 0.7)',  // Blush pink
  'rgba(244, 160, 180, 0.65)', // Soft rose
  'rgba(252, 205, 216, 0.75)', // Delicate pale petal
  'rgba(196, 45, 76, 0.6)',    // Deep romantic wine-rose
]

export function FloatingPetalsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return // Respect accessibility

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const isMobile = width < 600
    const petalCount = isMobile ? 8 : 18

    const createPetal = (initialY = -20): Petal => ({
      x: Math.random() * width,
      y: initialY === -20 ? Math.random() * height : initialY,
      size: (isMobile ? 9 : 12) + Math.random() * 8,
      speedY: 0.6 + Math.random() * 0.9,
      swaySpeed: 0.015 + Math.random() * 0.02,
      swayAngle: Math.random() * Math.PI * 2,
      swayWidth: 20 + Math.random() * 35,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.2,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.02 + Math.random() * 0.03,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      opacity: 0.4 + Math.random() * 0.45,
    })

    const petals: Petal[] = Array.from({ length: petalCount }, () => createPetal(-20))

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize, { passive: true })

    const drawPetal = (p: Petal) => {
      ctx.save()
      ctx.translate(p.x + Math.sin(p.swayAngle) * p.swayWidth, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.scale(1, Math.cos(p.flip))

      ctx.beginPath()
      ctx.moveTo(0, -p.size * 0.7)
      ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.6, p.size * 0.8, p.size * 0.3, 0, p.size)
      ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.3, -p.size * 0.6, -p.size * 0.6, 0, -p.size * 0.7)

      ctx.fillStyle = p.color
      ctx.globalAlpha = p.opacity
      ctx.fill()
      ctx.restore()
    }

    let lastTime = performance.now()

    const render = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTime) / 16.67, 2.5) // Cap delta to prevent jump
      lastTime = currentTime

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i]
        p.y += p.speedY * delta
        p.swayAngle += p.swaySpeed * delta
        p.rotation += p.rotationSpeed * delta
        p.flip += p.flipSpeed * delta

        if (p.y > height + 30) {
          petals[i] = createPetal(-25)
        }

        drawPetal(p)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="floating-petals-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 4,
        width: '100vw',
        height: '100vh',
      }}
    />
  )
}
