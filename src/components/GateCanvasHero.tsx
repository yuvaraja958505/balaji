import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Sparkles, Heart } from 'lucide-react'

// Import all gate frame images dynamically
const frameModules = import.meta.glob<{ default: string }>('../assets/gate/*.jpg', { eager: true })

// Sort frames numerically (ezgif-frame-008.jpg to ezgif-frame-100.jpg)
const frameUrls: string[] = Object.keys(frameModules)
  .sort((a, b) => {
    const numA = parseInt(a.match(/frame-(\d+)/)?.[1] || '0', 10)
    const numB = parseInt(b.match(/frame-(\d+)/)?.[1] || '0', 10)
    return numA - numB
  })
  .map(key => frameModules[key].default || (frameModules[key] as unknown as string))

interface GateCanvasHeroProps {
  onPreloadProgress: (progress: number) => void
  onPreloadComplete: () => void
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

export const GateCanvasHero: React.FC<GateCanvasHeroProps> = ({
  onPreloadProgress,
  onPreloadComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])

  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const petalsRef = useRef<Petal[]>([])

  // Preload all 93 image frames
  useEffect(() => {
    let loadedCount = 0
    const total = frameUrls.length
    const loadedImages: HTMLImageElement[] = []

    if (total === 0) return

    frameUrls.forEach((url, index) => {
      const img = new Image()
      img.src = url
      img.onload = () => {
        loadedCount++
        onPreloadProgress((loadedCount / total) * 100)
        if (loadedCount === total) {
          imagesRef.current = loadedImages
          setImagesLoaded(true)
          onPreloadComplete()
        }
      }
      img.onerror = () => {
        loadedCount++
        onPreloadProgress((loadedCount / total) * 100)
        if (loadedCount === total) {
          imagesRef.current = loadedImages
          setImagesLoaded(true)
          onPreloadComplete()
        }
      }
      loadedImages[index] = img
    })
  }, [onPreloadProgress, onPreloadComplete])

  // Initialize floating flower petals
  useEffect(() => {
    const petals: Petal[] = Array.from({ length: 35 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 8 + 6,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: Math.random() * 1.2 + 0.6,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.6 + 0.3
    }))
    petalsRef.current = petals
  }, [])

  // Draw current frame & particles on canvas
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

    // Calculate aspect ratio cover scale
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

    // Subtle 3D dolly zoom scaling
    const dollyScale = 1 + progress * 0.08
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

      // Draw petal shape
      ctx.fillStyle = progress > 0.5 ? '#e6c875' : '#b81424'
      ctx.beginPath()
      ctx.ellipse(0, 0, petal.size, petal.size * 0.6, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Update petal position
      petal.y += petal.speedY
      petal.x += petal.speedX + Math.sin(petal.y * 0.01) * 0.5
      petal.rotation += petal.rotSpeed

      if (petal.y > height + 20) {
        petal.y = -20
        petal.x = Math.random() * width
      }
    })
  }, [])

  // Window resize handler for Canvas resolution
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

  // Scroll position calculation
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

  const scrollToContent = () => {
    const nextSection = document.getElementById('wedding-intro')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div ref={containerRef} className="hero-scroll-container">
      <div className="hero-sticky-view">
        {/* Full-bleed HTML5 Canvas */}
        <canvas ref={canvasRef} className="gate-canvas" />

        {/* Ambient Warm Volumetric Light Overlay */}
        <div 
          className="cinematic-overlay" 
          style={{ opacity: 0.3 + scrollProgress * 0.4 }}
        />
        <div className="vignette-layer" />

        {/* Hero Reveal Text (Fades in when gate is opening) */}
        <AnimatePresence>
          {scrollProgress > 0.55 && (
            <motion.div 
              className={`hero-reveal-content ${scrollProgress > 0.75 ? 'active' : ''}`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div 
                className="wedding-pre-title script-font"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                The Royal Wedding Ceremony of
              </motion.div>

              <motion.h1 
                className="wedding-main-title gold-text"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                BALAJI <Heart className="gold-text" size={36} style={{ display: 'inline', margin: '0 0.5rem', verticalAlign: 'middle', fill: 'var(--gold-primary)' }} /> SANJANA
              </motion.h1>

              <motion.div 
                className="wedding-dates-badge"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Sparkles size={18} />
                <span>12 • 13 SEPTEMBER</span>
                <Sparkles size={18} />
              </motion.div>

              <motion.div 
                className="scroll-indicator-btn"
                onClick={scrollToContent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <span>Scroll to Enter Celebration</span>
                <ChevronDown size={22} color="var(--gold-primary)" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
