import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Heart } from 'lucide-react'

// Import all m_photos frame images dynamically
const mPhotoModules = import.meta.glob<{ default: string }>('../assets/m_photos/*.png', { eager: true })

// Sort photos sequentially (img1.png, pic1.png to pic41.png)
const mPhotoUrls: string[] = Object.keys(mPhotoModules)
  .filter(key => !key.includes('couple.png')) // Exclude standalone portrait if any
  .sort((a, b) => {
    if (a.includes('img1')) return -1
    if (b.includes('img1')) return 1
    const numA = parseInt(a.match(/pic\s*(\d+)/)?.[1] || '0', 10)
    const numB = parseInt(b.match(/pic\s*(\d+)/)?.[1] || '0', 10)
    return numA - numB
  })
  .map(key => mPhotoModules[key].default || (mPhotoModules[key] as unknown as string))

interface MandapamScrollCanvasProps {
  onPreloadProgress?: (loaded: number, total: number) => void
}

interface Petal {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  rotation: number
  rotSpeed: number
  opacity: number
}

export const MandapamScrollCanvas: React.FC<MandapamScrollCanvasProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])

  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const petalsRef = useRef<Petal[]>([])

  // Preload all m_photos frames
  useEffect(() => {
    let loadedCount = 0
    const total = mPhotoUrls.length
    const loadedImages: HTMLImageElement[] = []

    if (total === 0) return

    mPhotoUrls.forEach((url, index) => {
      const img = new Image()
      img.src = url
      img.onload = () => {
        loadedCount++
        if (loadedCount === total) {
          imagesRef.current = loadedImages
          setImagesLoaded(true)
        }
      }
      img.onerror = () => {
        loadedCount++
        if (loadedCount === total) {
          imagesRef.current = loadedImages
          setImagesLoaded(true)
        }
      }
      loadedImages[index] = img
    })
  }, [])

  // Initialize floating flower petals
  useEffect(() => {
    const petals: Petal[] = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 8 + 5,
      speedX: (Math.random() - 0.5) * 0.7,
      speedY: Math.random() * 1.1 + 0.5,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.2,
      opacity: Math.random() * 0.5 + 0.4
    }))
    petalsRef.current = petals
  }, [])

  // Draw frame on canvas with parallax cover scaling
  const renderFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const images = imagesRef.current
    if (!images || images.length === 0) return

    const totalFrames = images.length
    const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.floor(progress * (totalFrames - 1))))
    const currentImg = images[frameIndex]

    if (!currentImg || !currentImg.complete) return

    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    // Aspect ratio cover scale calculation
    const imgRatio = currentImg.naturalWidth / currentImg.naturalHeight
    const canvasRatio = width / height

    let drawW = width
    let drawH = height
    let offsetX = 0
    let offsetY = 0

    if (canvasRatio > imgRatio) {
      drawH = width / imgRatio
      offsetY = (height - drawH) / 2
    } else {
      drawW = height * imgRatio
      offsetX = (width - drawW) / 2
    }

    // 3D Dolly Zoom scaling effect
    const dollyScale = 1 + progress * 0.06
    ctx.save()
    ctx.translate(width / 2, height / 2)
    ctx.scale(dollyScale, dollyScale)
    ctx.translate(-width / 2, -height / 2)
    ctx.drawImage(currentImg, offsetX, offsetY, drawW, drawH)
    ctx.restore()

    // Draw floating rose/gold flower petals
    petalsRef.current.forEach(petal => {
      ctx.save()
      ctx.translate(petal.x, petal.y)
      ctx.rotate((petal.rotation * Math.PI) / 180)
      ctx.globalAlpha = petal.opacity

      ctx.fillStyle = '#e6c875'
      ctx.beginPath()
      ctx.ellipse(0, 0, petal.size, petal.size * 0.6, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      petal.y += petal.speedY
      petal.x += petal.speedX + Math.sin(petal.y * 0.01) * 0.4
      petal.rotation += petal.rotSpeed

      if (petal.y > height + 20) {
        petal.y = -20
        petal.x = Math.random() * width
      }
    })
  }, [])

  // Canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (canvas) {
        const dpr = window.devicePixelRatio || 1
        canvas.width = window.innerWidth * dpr
        canvas.height = window.innerHeight * dpr
      }
      renderFrame(scrollProgress)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [renderFrame, scrollProgress])

  // Scroll position mapping
  useEffect(() => {
    let animId: number

    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const scrollableHeight = rect.height - window.innerHeight

      if (scrollableHeight <= 0) return

      const progress = Math.min(1, Math.max(0, -rect.top / scrollableHeight))
      setScrollProgress(progress)

      animId = requestAnimationFrame(() => {
        renderFrame(progress)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [renderFrame, imagesLoaded])

  return (
    <div ref={containerRef} className="mandapam-scroll-container">
      <div className="mandapam-sticky-view">
        {/* Full-bleed Canvas */}
        <canvas ref={canvasRef} className="mandapam-canvas" />

        {/* Ambient Warm Golden Overlay */}
        <div className="cinematic-overlay" style={{ opacity: 0.35 }} />
        <div className="vignette-layer" />

        {/* Dynamic Story Quotes based on scroll progress */}
        <div className="mandapam-reveal-content">
          <AnimatePresence mode="wait">
            {scrollProgress < 0.35 && (
              <motion.div 
                key="phase1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', padding: '0 2rem' }}
              >
                <div className="script-font gold-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                  The Journey Within
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-primary)', letterSpacing: '0.1em' }}>
                  STEPPING INTO THE SACRED MANDAPAM
                </div>
              </motion.div>
            )}

            {scrollProgress >= 0.35 && scrollProgress < 0.7 && (
              <motion.div 
                key="phase2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', padding: '0 2rem' }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-primary)', marginBottom: '0.5rem' }}>
                  <Sparkles size={20} />
                  <span style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.2em', fontSize: '0.85rem' }}>
                    DIVINE UNION
                  </span>
                  <Sparkles size={20} />
                </div>
                <div className="script-font" style={{ fontSize: '3rem', color: 'var(--gold-light)' }}>
                  Two Hearts, One Eternal Promise
                </div>
              </motion.div>
            )}

            {scrollProgress >= 0.7 && (
              <motion.div 
                key="phase3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                style={{ textAlign: 'center', padding: '0 2rem' }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', fontWeight: 800, letterSpacing: '0.12em' }} className="gold-text">
                  BALAJI <Heart className="gold-text" size={28} style={{ display: 'inline', margin: '0 0.4rem', verticalAlign: 'middle', fill: 'var(--gold-primary)' }} /> SANJANA
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--gold-light)', letterSpacing: '0.2em', marginTop: '0.5rem' }}>
                  12 • 13 SEPTEMBER 2026
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
