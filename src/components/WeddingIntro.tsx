import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export const WeddingIntro: React.FC = () => {
  return (
    <section id="wedding-intro" className="wedding-section">
      <motion.div 
        className="royal-card ornate-border"
        style={{ textAlign: 'center', padding: '4rem 2rem' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-subtitle">Divine Blessings</div>
        <h2 className="section-main-title gold-text" style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>
          Shubham Bhavatu
        </h2>

        <div style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.25rem', color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: 1.8 }}>
          "Two souls bound by destiny, guided by love, and blessed by elders. We cordially request the honor of your presence as we unite in holy matrimony."
        </div>

        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', color: 'var(--gold-primary)' }}>
          <Sparkles size={20} />
          <span style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.2em', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            Celebration of Eternal Love
          </span>
          <Sparkles size={20} />
        </div>
      </motion.div>
    </section>
  )
}
