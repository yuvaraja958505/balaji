import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Sparkles, Calendar, MapPin, Heart, Crown, Clock } from 'lucide-react'
import maplaImg from '../assets/mapla.png'
import ponnuImg from '../assets/ponnu.png'

export const InvitationCard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D Tilt State for Mouse / Touch interaction
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  // Scroll Parallax logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Smooth springs for Parallax offsets
  const yBg = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 40]), { stiffness: 100, damping: 20 })
  const yCard = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), { stiffness: 100, damping: 20 })
  const yContent = useSpring(useTransform(scrollYProgress, [0, 1], [60, -60]), { stiffness: 100, damping: 20 })
  const rotateScroll = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const rY = ((mouseX - width / 2) / (width / 2)) * 12
    const rX = -((mouseY - height / 2) / (height / 2)) * 12

    setRotateX(rX)
    setRotateY(rY)
    setGlowPos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100
    })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <section ref={containerRef} className="wedding-section invitation-parallax-section">
      <div className="section-title-wrapper">
        <div className="section-subtitle">Royal Summons</div>
        <h2 className="section-main-title gold-text">Official Invitation Card</h2>
      </div>

      <div className="parallax-card-wrapper" perspective="1200px">
        {/* Layer 1: Parallax Background Glow & Sparkles */}
        <motion.div 
          className="invitation-parallax-bg"
          style={{ y: yBg }}
        />

        {/* Layer 2: Main Interactive 3D Parallax Invitation Card */}
        <motion.div
          ref={cardRef}
          className="invitation-card royal-card ornate-border"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            y: yCard,
            rotateX: rotateX,
            rotateY: rotateY,
            rotateZ: rotateScroll,
            transformStyle: 'preserve-3d',
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(230, 200, 117, 0.15) 0%, rgba(26, 8, 12, 0.95) 70%)`
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          {/* Decorative Corner Filigree Ornaments */}
          <div className="filigree-corner top-left">✦</div>
          <div className="filigree-corner top-right">✦</div>
          <div className="filigree-corner bottom-left">✦</div>
          <div className="filigree-corner bottom-right">✦</div>

          {/* Layer 3: Elevated Floating Content */}
          <motion.div className="invitation-card-content" style={{ y: yContent, translateZ: 40 }}>
            {/* Royal Crown Crest */}
            <div className="invitation-crest">
              <Crown size={42} className="gold-text crest-icon" />
              <div className="crest-line" />
            </div>

            <div className="invitation-header-script script-font gold-text">
              Together with their Families
            </div>

            <p className="invitation-request-text">
              Cordially request the honor of your esteemed presence and blessings at the auspicious wedding ceremony of
            </p>

            {/* Couple Names & Avatars */}
            <div className="invitation-couple-row">
              <div className="invitation-couple-avatar">
                <img src={maplaImg} alt="Balaji" />
              </div>
              
              <div className="invitation-couple-names">
                <div className="invitation-groom gold-text">BALAJI</div>
                <div className="invitation-and">
                  <Heart size={20} className="gold-text heart-pulse" />
                  <span>&</span>
                  <Heart size={20} className="gold-text heart-pulse" />
                </div>
                <div className="invitation-bride gold-text">SANJANA</div>
              </div>

              <div className="invitation-couple-avatar">
                <img src={ponnuImg} alt="Sanjana" />
              </div>
            </div>

            {/* Divider */}
            <div className="invitation-gold-divider">
              <Sparkles size={16} />
              <span>• SHUBHAM MUHURTHAM •</span>
              <Sparkles size={16} />
            </div>

            {/* Event Date & Time Grid */}
            <div className="invitation-details-grid">
              <div className="invitation-detail-card">
                <Calendar size={22} className="gold-text" />
                <div className="detail-title">DATES</div>
                <div className="detail-value">12 • 13 SEPTEMBER 2026</div>
              </div>

              <div className="invitation-detail-card">
                <Clock size={22} className="gold-text" />
                <div className="detail-title">MUHURTHAM</div>
                <div className="detail-value">07:30 AM – 09:00 AM</div>
              </div>
            </div>

            {/* Venue Location */}
            <div className="invitation-venue-box">
              <MapPin size={22} className="gold-text venue-pin" />
              <div>
                <div className="venue-name">Chinnakallupalli Mandapam</div>
                <div className="venue-address">
                  Salem - Tirupattur - Vaniyambadi Road, Kalandra Post, Vaniyambadi, Tamil Nadu 635751
                </div>
              </div>
            </div>

            {/* Interactive RSVP Action */}
            <div className="invitation-footer-action">
              <a href="#rsvp-section" className="btn-gold">
                <Sparkles size={18} /> Confirm RSVP
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
