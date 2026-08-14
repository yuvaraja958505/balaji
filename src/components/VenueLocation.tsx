import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Phone, Mail } from 'lucide-react'

export const VenueLocation: React.FC = () => {
  return (
    <section className="wedding-section">
      <div className="section-title-wrapper">
        <div className="section-subtitle">Venue & Location</div>
        <h2 className="section-main-title gold-text">The Royal Palace Mandapam</h2>
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
              Royal Palace Gardens & Mandapam
            </h3>
            
            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <MapPin size={22} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
              <div>
                100 Palace Road, Grand Heritage Enclave,<br />
                Bengaluru / Chennai, South India
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
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-gold"
            >
              <Navigation size={18} /> Get Directions
            </a>
          </div>

          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-gold)', height: '280px', background: '#1c0a10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <iframe
              title="Venue Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9796068393664!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjciTiA3N8KwMzUnNDAuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
