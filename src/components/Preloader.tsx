import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Crown } from 'lucide-react'

interface PreloaderProps {
  progress: number
  isReady: boolean
}

export const Preloader: React.FC<PreloaderProps> = ({ progress, isReady }) => {
  if (isReady) return null

  return (
    <motion.div 
      className="preloader-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Crown className="preloader-mandapam-icon" size={64} />
      <div className="script-font gold-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        Balaji & Sanjana
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
        Opening Royal Mandapam Gates...
      </div>

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
    </motion.div>
  )
}
