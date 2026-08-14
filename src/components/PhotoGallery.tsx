import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye } from 'lucide-react'

// Import wedding gallery photos from memories
import wedding1 from '../assets/memories/wedding1.png'
import wedding2 from '../assets/memories/wedding2.png'
import wedding3 from '../assets/memories/wedding3.png'
import wedding4 from '../assets/memories/wedding4.png'
import wedding5 from '../assets/memories/wedding5.png'

export const PhotoGallery: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null)

  const galleryItems = [
    { src: wedding1, title: 'Royal Union', caption: 'Balaji & Sanjana celebrating their special day' },
    { src: wedding2, title: 'Cherished Moments', caption: 'Laughter, joy and endless happiness' },
    { src: wedding3, title: 'Eternal Promise', caption: 'Hand in hand towards a beautiful forever' },
    { src: wedding4, title: 'Sacred Ceremony', caption: 'Traditional rituals surrounded by family love' },
    { src: wedding5, title: 'Golden Memories', caption: 'Unforgettable highlights of the wedding' }
  ]

  return (
    <section className="wedding-section">
      <div className="section-title-wrapper">
        <div className="section-subtitle">Cinematic Moments</div>
        <h2 className="section-main-title gold-text">Wedding Gallery</h2>
      </div>

      <div className="gallery-grid">
        {galleryItems.map((item, idx) => (
          <motion.div 
            key={idx}
            className="gallery-item royal-card"
            onClick={() => setSelectedImg(item.src)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <img src={item.src} alt={item.title} className="gallery-img" />
            <div className="gallery-overlay">
              <div>
                <div style={{ color: 'var(--gold-light)', fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '1.05rem' }}>
                  {item.title}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <Eye size={14} color="var(--gold-primary)" /> Click to Expand
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(0,0,0,0.92)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <button 
              onClick={() => setSelectedImg(null)}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--gold-primary)',
                color: 'var(--gold-primary)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>

            <motion.img 
              src={selectedImg} 
              alt="Gallery Preview"
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                borderRadius: '16px',
                border: '2px solid var(--border-gold-glow)',
                boxShadow: 'var(--shadow-glow)'
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
