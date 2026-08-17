import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Navigation, Phone, Mail, Sparkles, Rocket } from 'lucide-react'

export const VenueLocation: React.FC = () => {
  const [isRocketFlying, setIsRocketFlying] = useState(false)

  const addressQuery = encodeURIComponent(
    'Salem - Tirupattur - Vaniyambadi Road Kalandra Post, Chinnakallupalli, Vaniyambadi, Tamil Nadu 635751, India'
  )
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`

  const handleDirectionsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isRocketFlying) return

    setIsRocketFlying(true)

    // Take a long epic rocket flight (~2.6 seconds) from center view across screen before opening maps
    setTimeout(() => {
      window.open(mapsUrl, '_blank', 'noopener,noreferrer')
      setTimeout(() => {
        setIsRocketFlying(false)
      }, 600)
    }, 2600)
  }

  return (
    <section className="wedding-section">
      <div className="section-title-wrapper">
        <div className="section-subtitle">Venue & Location</div>
        <h2 className="section-main-title gold-text">Royal Wedding Venue</h2>
      </div>

      {/* Fullscreen Epic Rocket Launch Animation Overlay */}
      <AnimatePresence>
        {isRocketFlying && (
          <motion.div
            className="rocket-launch-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rocket-launch-backdrop" />
            
            {/* Center Status Card */}
            <motion.div
              className="rocket-launch-card royal-card"
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="rocket-badge">
                <Sparkles size={24} className="gold-text animated-sparkle" />
                <span className="rocket-phase-badge">MISSION: MANDAPAM NAVIGATION</span>
              </div>
              
              <div className="rocket-launch-text gold-text">
                🚀 LAUNCHING ROCKET TO VENUE...
              </div>
              <div className="rocket-launch-subtext">
                Taking off to Chinnakallupalli, Vaniyambadi • Opening Google Maps
              </div>

              {/* Progress Bar Animation */}
              <div className="rocket-progress-bar-bg">
                <motion.div 
                  className="rocket-progress-bar-fill"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.6, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>

            {/* Giant Center Rocket Launch Trajectory */}
            <motion.div
              className="epic-rocket-ship"
              initial={{ x: '-50%', y: '15vh', scale: 1, rotate: -45, opacity: 0 }}
              animate={{
                x: ['-50%', '-50%', '-30%', '20vw', '60vw'],
                y: ['15vh', '5vh', '-25vh', '-70vh', '-130vh'],
                scale: [1, 1.4, 2.2, 2.8, 1.5],
                rotate: [-45, -45, -35, -25, -15],
                opacity: [0, 1, 1, 1, 0]
              }}
              transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rocket-thruster-fire" />
              <div className="rocket-flame-glow" />
              <Rocket size={64} color="var(--gold-light)" className="rocket-lucide-icon" />
              
              {/* Long Rocket Smoke & Star Particle Trail */}
              <div className="rocket-trail-particles">
                <motion.div 
                  className="trail-sparkle-group"
                  animate={{ scale: [1, 1.5, 0.8], opacity: [0.6, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 0.2 }}
                >
                  <Sparkles size={32} color="var(--gold-primary)" />
                  <Sparkles size={24} color="#fff" />
                  <Sparkles size={20} color="var(--gold-light)" />
                </motion.div>
                <div className="rocket-smoke-cloud" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="royal-card ornate-border"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--gold-primary)', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
              Chinnakallupalli Mandapam
            </h3>
            
            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.25rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
              <MapPin size={22} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '4px' }} />
              <div>
                <strong>Salem - Tirupattur - Vaniyambadi Road</strong><br />
                Kalandra Post, Chinnakallupalli,<br />
                Vaniyambadi, Tamil Nadu 635751, India
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
              <Phone size={18} color="var(--gold-dark)" />
              <span>Wedding Concierge: +91 98765 43210</span>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
              <Mail size={18} color="var(--gold-dark)" />
              <span>rsvp@balajisanjana.wedding</span>
            </div>

            {/* Perfectly Centered Directions Rocket Action Button */}
            <div className="venue-action-wrapper">
              <button 
                onClick={handleDirectionsClick} 
                className="btn-gold venue-map-btn"
                title="Get Google Maps Directions"
              >
                <div className="rocket-icon-wrapper">
                  <Navigation size={18} className="rocket-icon" />
                </div>

                <span>{isRocketFlying ? 'Launching Rocket...' : 'Get Google Maps Directions'}</span>

                <AnimatePresence>
                  {isRocketFlying && (
                    <motion.span
                      className="rocket-trail-sparkles"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Sparkles size={14} color="var(--gold-light)" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-gold)', height: '300px', background: '#1c0a10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <iframe
              title="Venue Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${addressQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

