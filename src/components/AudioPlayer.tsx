import React, { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Music } from 'lucide-react'
import songUrl from '../assets/Subramaniapuram Love Theme.mp3'

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(songUrl)
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio

    const attemptPlay = () => {
      audio.play().then(() => {
        setIsPlaying(true)
        removeListeners()
      }).catch((err) => {
        console.log('Autoplay waiting for user gesture:', err)
        setIsPlaying(false)
      })
    }

    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
          removeListeners()
        }).catch(() => {})
      }
    }

    const removeListeners = () => {
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
      window.removeEventListener('touchmove', handleFirstInteraction)
      window.removeEventListener('pointerdown', handleFirstInteraction)
      window.removeEventListener('scroll', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }

    // Try autoplay immediately
    attemptPlay()

    // Attach listeners for user gesture to fulfill browser autoplay policy
    window.addEventListener('click', handleFirstInteraction, { passive: true })
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true })
    window.addEventListener('touchmove', handleFirstInteraction, { passive: true })
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true })
    window.addEventListener('scroll', handleFirstInteraction, { passive: true })
    window.addEventListener('keydown', handleFirstInteraction, { passive: true })

    return () => {
      removeListeners()
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(err => {
        console.error('Audio play error:', err)
      })
    }
  }

  return (
    <button 
      className="audio-control-btn" 
      onClick={toggleAudio}
      title={isPlaying ? "Pause Music" : "Play Wedding Song"}
      aria-label="Toggle Wedding Song"
    >
      {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      {isPlaying && (
        <span style={{ position: 'absolute', top: '-4px', right: '-4px', display: 'flex', gap: '2px' }}>
          <Music size={14} className="gold-text" />
        </span>
      )}
    </button>
  )
}

