import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Crown, Music } from 'lucide-react'

interface PreloaderProps {
  progress: number
  isReady: boolean
  onEnter?: () => void
}

export const Preloader: React.FC<PreloaderProps> = ({ progress, isReady, onEnter }) => {
  const [hasDismissed, setHasDismissed] = useState(false)

  const handleStart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    // Dispatch events to instantly trigger unmuted audio playback on user gesture
    window.dispatchEvent(new Event('start-audio'))
    window.dispatchEvent(new Event('click'))
    setHasDismissed(true)
    if (onEnter) onEnter()
  }

  if (hasDismissed) return null

  const isComplete = isReady || progress >= 100

  return (
    <AnimatePresence>
      <motion.div 
        className="preloader-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8 }}
        onClick={isComplete ? handleStart : undefined}
        style={{ cursor: isComplete ? 'pointer' : 'default' }}
      >
        <Crown className="preloader-mandapam-icon" size={64} />
        <div className="script-font gold-text" style={{ fontSize: '2.8rem', marginBottom: '0.5rem', textAlign: 'center' }}>
          Balaji & Sanjana
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1.5rem', textAlign: 'center' }}>
          {isComplete ? 'THE SACRED UNION AWAITS' : 'OPENING ROYAL MANDAPAM GATES...'}
        </div>

        {!isComplete ? (
          <>
            <div className="preloader-progress-bar">
              <div 
                className="preloader-progress-fill" 
                style={{ width: `${Math.min(100, Math.max(5, progress))}%` }} 
              />
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-primary)', fontSize: '0.95rem', fontWeight: 600 }}>
              <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} />
              {Math.round(progress)}% Loaded
            </div>
          </>
        ) : (
          <motion.button 
            className="btn-gold"
            onClick={handleStart}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              marginTop: '1rem',
              padding: '1rem 2.4rem',
              fontSize: '1rem',
              boxShadow: '0 0 30px rgba(230, 200, 117, 0.6)'
            }}
          >
            <Music size={20} />
            <span>ENTER WEDDING INVITATION</span>
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
