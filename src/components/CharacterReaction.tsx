import React, { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX, Minimize2, Maximize2 } from 'lucide-react'
import videoSrc from '../assets/video.mp4'

export const CharacterReaction: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    let animId: number

    // Attempt video playback
    video.muted = isMuted
    video.play().catch(() => {
      // If autoplay fails, retry on user interaction
      const handleUserTouch = () => {
        video.play().catch(() => {})
        window.removeEventListener('touchstart', handleUserTouch)
        window.removeEventListener('click', handleUserTouch)
      }
      window.addEventListener('touchstart', handleUserTouch, { once: true })
      window.addEventListener('click', handleUserTouch, { once: true })
    })

    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    const processFrame = () => {
      if (!video || !canvas || !ctx || video.paused || video.ended) {
        animId = requestAnimationFrame(processFrame)
        return
      }

      // Maintain high quality processing resolution (max width 360px for performance)
      const vWidth = video.videoWidth || 320
      const vHeight = video.videoHeight || 320

      if (vWidth > 0 && vHeight > 0) {
        const targetWidth = Math.min(vWidth, 360)
        const targetHeight = Math.round((targetWidth / vWidth) * vHeight)

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
          canvas.width = targetWidth
          canvas.height = targetHeight
        }

        // Draw current video frame to canvas
        ctx.drawImage(video, 0, 0, targetWidth, targetHeight)

        // Extract pixel data for chroma keying & top/bottom border cleaning
        const frameData = ctx.getImageData(0, 0, targetWidth, targetHeight)
        const data = frameData.data
        const len = data.length

        // Green Screen & Top/Bottom Border Removal Algorithm
        for (let i = 0; i < len; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

          const pixelIndex = i / 4
          const y = Math.floor(pixelIndex / targetWidth)

          // Detect green dominance (chroma green removal)
          const isGreen = (g > 50 && g > r * 1.08 && g > b * 1.08) || (g > 35 && g > r * 1.15 && g > b * 1.15)
          
          // Detect top/bottom black letterboxing or dark padding borders
          const isDarkBorder = (r < 35 && g < 35 && b < 35) && (y < targetHeight * 0.08 || y > targetHeight * 0.92)

          if (isGreen || isDarkBorder) {
            const maxOther = Math.max(r, b)
            const greenDiff = g - maxOther

            if (greenDiff > 25 || isDarkBorder) {
              // Completely transparent green or top/bottom dark border pixels
              data[i + 3] = 0
            } else {
              // Smooth edge blending to prevent harsh green outlines
              const alpha = 1 - greenDiff / 25
              data[i + 3] = Math.floor(alpha * 255)
              // De-spill green fringe: adjust green channel to match red/blue max
              data[i + 1] = maxOther
            }
          }
        }

        // Render transparent frame back to canvas
        ctx.putImageData(frameData, 0, 0)
      }

      animId = requestAnimationFrame(processFrame)
    }

    animId = requestAnimationFrame(processFrame)

    return () => {
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  // Sync mute state
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(!isMinimized)
  }

  return (
    <div className={`character-video-container ${isMinimized ? 'minimized' : ''}`}>
      {/* Hidden HTML5 video source element */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="hidden-video-source"
      />

      {/* Chroma Key Transparent Canvas Render */}
      <div className="character-canvas-wrapper" onClick={toggleMinimize}>
        <canvas ref={canvasRef} className="character-transparent-canvas" />

        {/* Action Controls */}
        <div className="character-controls">
          <button 
            onClick={toggleMute} 
            className="character-ctrl-btn" 
            title={isMuted ? 'Unmute Video Audio' : 'Mute Video Audio'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <button 
            onClick={toggleMinimize} 
            className="character-ctrl-btn" 
            title={isMinimized ? 'Expand Video' : 'Minimize Video'}
          >
            {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
        </div>
      </div>
    </div>
  )
}
