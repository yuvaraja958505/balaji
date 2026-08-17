import React, { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Send, CheckCircle2, Heart } from 'lucide-react'

export const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '1',
    events: 'all',
    wishes: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) return

    setSubmitted(true)

    // Trigger golden celebration confetti
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e6c875', '#fef1cc', '#b81424', '#ffffff']
    })
  }

  return (
    <section className="wedding-section">
      <div className="section-title-wrapper">
        <div className="section-subtitle">Join Our Celebration</div>
        <h2 className="section-main-title gold-text">R.S.V.P</h2>
      </div>

      <motion.div 
        className="royal-card rsvp-form-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <CheckCircle2 size={64} color="var(--gold-primary)" style={{ margin: '0 auto 1.25rem' }} />
            </motion.div>
            
            <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--gold-light)', marginBottom: '0.75rem' }}>
              Thank You, {formData.name}!
            </h3>
            
            <p style={{ color: 'var(--text-primary)', fontSize: '1.15rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              Your RSVP has been graciously received. We cannot wait to celebrate our special day with you!
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-primary)', fontFamily: 'var(--font-script)', fontSize: '1.8rem' }}>
              <Heart size={20} fill="var(--gold-primary)" /> Balaji & Sanjana
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Your Full Name *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Ramesh Kumar"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Phone / Email</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="+91 98765 00000"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Number of Guests</label>
                <select 
                  className="form-select"
                  value={formData.guests}
                  onChange={e => setFormData({ ...formData, guests: e.target.value })}
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4+">4+ Persons (Family)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Attending Events</label>
              <select 
                className="form-select"
                value={formData.events}
                onChange={e => setFormData({ ...formData, events: e.target.value })}
              >
                <option value="all">Both Events (Grand Reception & Kalyana Muhurtham)</option>
                <option value="reception">Grand Reception Only (12th Sept Evening)</option>
                <option value="muhurtham">Kalyana Muhurtham Only (13th Sept Morning)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Warm Wishes & Blessings</label>
              <textarea 
                className="form-textarea" 
                rows={4}
                placeholder="Write your blessings for Balaji & Sanjana..."
                value={formData.wishes}
                onChange={e => setFormData({ ...formData, wishes: e.target.value })}
              />
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                <Send size={18} /> Confirm RSVP & Bless Couple
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </section>
  )
}
