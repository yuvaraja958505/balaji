import React, { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Music } from 'lucide-react'
import songUrl from '../assets/Subramaniapuram Love Theme.mp3'

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(songUrl)
    audio.loop = true
    audio.volume = 0.6
    audioRef.current = audio

    const playAudio = () => {
      if (!audioRef.current) return
      audioRef.current.play().then(() => {
        setIsPlaying(true)
        removeListeners()
      }).catch(() => {
        // Will play on first click or gesture
      })
    }

    const handleUserGesture = () => {
      playAudio()
    }

    const events = [
      'start-audio',
      'click',
      'touchstart',
      'touchend',
      'touchmove',
      'pointerdown',
      'pointermove',
      'mousemove',
      'scroll',
      'wheel',
      'keydown'
    ]

    const removeListeners = () => {
      events.forEach(evt => window.removeEventListener(evt, handleUserGesture))
    }

    // Attempt immediate autoplay
    playAudio()

    // Attach listeners for any window event or custom 'start-audio' event
    events.forEach(evt => window.addEventListener(evt, handleUserGesture, { passive: true }))

    // Backup polling check
    const intervalId = setInterval(() => {
      if (audioRef.current && audioRef.current.paused) {
        playAudio()
      } else if (audioRef.current && !audioRef.current.paused) {
        setIsPlaying(true)
        removeListeners()
        clearInterval(intervalId)
      }
    }, 600)

    return () => {
      removeListeners()
      clearInterval(intervalId)
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
