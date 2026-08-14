import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import maplaImg from '../assets/mapla.png'
import ponnuImg from '../assets/ponnu.png'

export const CoupleStory: React.FC = () => {
  return (
    <section className="wedding-section">
      <div className="section-title-wrapper">
        <div className="section-subtitle">Meet The Couple</div>
        <h2 className="section-main-title gold-text">Balaji & Sanjana</h2>
      </div>

      <div className="couple-grid">
        {/* Groom Card */}
        <motion.div 
          className="royal-card couple-card"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="couple-avatar">
            <img src={maplaImg} alt="Balaji" />
          </div>
          <h3 className="couple-name">Balaji</h3>
          <div className="couple-role">The Groom</div>
          <p className="couple-bio">
            A vision of strength, warmth, and devotion. Balaji embraces life with enthusiasm, commitment, and a heartwarming smile that lights up every room.
          </p>
        </motion.div>

        {/* Heart Divider Icon */}
        <div style={{ textAlign: 'center', color: 'var(--gold-primary)' }}>
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Heart size={48} style={{ fill: 'var(--gold-primary)', filter: 'drop-shadow(0 0 10px rgba(230, 200, 117, 0.6))' }} />
          </motion.div>
        </div>

        {/* Bride Card */}
        <motion.div 
          className="royal-card couple-card"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="couple-avatar">
            <img src={ponnuImg} alt="Sanjana" />
          </div>
          <h3 className="couple-name">Sanjana</h3>
          <div className="couple-role">The Bride</div>
          <p className="couple-bio">
            Graceful, kind, and full of joy. Sanjana brings elegance, laughter, and endless affection to everyone around her as she walks into this beautiful new chapter.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
