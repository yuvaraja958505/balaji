import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Phone, Mail } from 'lucide-react'

export const VenueLocation: React.FC = () => {
  const addressQuery = encodeURIComponent(
    'Salem - Tirupattur - Vaniyambadi Road Kalandra Post, Chinnakallupalli, Vaniyambadi, Tamil Nadu 635751, India'
  )

  return (
    <section className="wedding-section">
      <div className="section-title-wrapper">
        <div className="section-subtitle">Venue & Location</div>
        <h2 className="section-main-title gold-text">Royal Wedding Venue</h2>
      </div>

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

            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
              <Mail size={18} color="var(--gold-dark)" />
              <span>rsvp@balajisanjana.wedding</span>
            </div>

            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${addressQuery}`} 
              target="_blank" 
              rel="noreferrer" 
              className="btn-gold"
            >
              <Navigation size={18} /> Get Google Maps Directions
            </a>
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
