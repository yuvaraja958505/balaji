import React from 'react'
import { motion } from 'framer-motion'
import { Crown, Sparkles } from 'lucide-react'

export const FamilyBlessings: React.FC = () => {
  return (
    <section className="wedding-section">
      <div className="section-title-wrapper">
        <div className="section-subtitle">With Love & Gratitude</div>
        <h2 className="section-main-title gold-text">Family & Elders</h2>
      </div>

      <motion.div 
        className="royal-card ornate-border"
        style={{ textAlign: 'center', padding: '3.5rem 2rem' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Crown size={40} color="var(--gold-primary)" style={{ margin: '0 auto 1.5rem', display: 'block' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', marginTop: '1rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-light)', fontSize: '1.4rem', marginBottom: '0.75rem' }}>
              Groom's Family
            </h3>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}>
              Smt. & Shri. R. Krishnan
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Parents of Balaji
            </p>
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-light)', fontSize: '1.4rem', marginBottom: '0.75rem' }}>
              Bride's Family
            </h3>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}>
              Smt. & Shri. M. Sundaram
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Parents of Sanjana
            </p>
          </div>
        </div>

        <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-gold)', paddingTop: '2rem', fontStyle: 'italic', color: 'var(--gold-light)', fontSize: '1.15rem' }}>
          <Sparkles size={16} style={{ display: 'inline', marginRight: '6px' }} />
          "Best compliments from Grandparents, Relatives & Friends of both families."
        </div>
      </motion.div>
    </section>
  )
}
