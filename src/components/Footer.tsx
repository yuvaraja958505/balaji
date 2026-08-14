import React from 'react'
import { Heart, ArrowUp } from 'lucide-react'

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="wedding-footer">
      <div className="script-font gold-text" style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>
        Balaji & Sanjana
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-primary)', letterSpacing: '0.2em', fontSize: '1rem', marginBottom: '1.5rem' }}>
        12 • 13 SEPTEMBER 2026
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
        Thank you for being a part of our magical journey. We eagerly look forward to seeing you at our wedding!
      </p>

      <button 
        onClick={scrollToTop} 
        className="btn-outline-gold" 
        style={{ padding: '0.6rem 1.4rem', fontSize: '0.8rem' }}
      >
        <ArrowUp size={14} /> Back to Gate Opening
      </button>

      <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(230,200,117,0.1)', paddingTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        Crafted with <Heart size={14} color="var(--gold-primary)" style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }} /> for Balaji & Sanjana's Royal Wedding.
      </div>
    </footer>
  )
}
