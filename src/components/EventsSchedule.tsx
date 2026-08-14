import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, MapPin, Sparkles } from 'lucide-react'

export const EventsSchedule: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const weddingDate = new Date('2026-09-12T09:00:00+05:30').getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const difference = weddingDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [])

  const events = [
    {
      badge: '12 SEPTEMBER • EVENING',
      title: 'Sangeet & Mehendi Night',
      time: '6:00 PM Onwards',
      location: 'Grand Ballroom, Royal Mandapam',
      attire: 'Vibrant Traditional / Indo-Western',
      desc: 'An evening of music, dance, henna artistry, and joyous celebrations.'
    },
    {
      badge: '13 SEPTEMBER • MORNING',
      title: 'Kalyana Muhurtham',
      time: '7:30 AM – 9:00 AM',
      location: 'Main Temple Hall, Royal Mandapam',
      attire: 'Traditional Silk Saree & Veshti',
      desc: 'The sacred marriage ceremony amidst Vedic chants, garlands, and divine blessings.'
    },
    {
      badge: '13 SEPTEMBER • EVENING',
      title: 'Grand Reception',
      time: '7:00 PM Onwards',
      location: 'Royal Gardens & Convention Center',
      attire: 'Royal Tuxedo & Elegant Gown',
      desc: 'A magnificent feast and royal evening honoring the newlywed couple.'
    }
  ]

  return (
    <section className="wedding-section">
      <div className="section-title-wrapper">
        <div className="section-subtitle">Save The Dates</div>
        <h2 className="section-main-title gold-text">Wedding Schedule & Events</h2>
      </div>

      {/* Countdown Timer */}
      <div className="countdown-box">
        <div className="countdown-unit">
          <div className="countdown-number">{timeLeft.days}</div>
          <div className="countdown-label">Days</div>
        </div>
        <div className="countdown-unit">
          <div className="countdown-number">{timeLeft.hours}</div>
          <div className="countdown-label">Hours</div>
        </div>
        <div className="countdown-unit">
          <div className="countdown-number">{timeLeft.minutes}</div>
          <div className="countdown-label">Minutes</div>
        </div>
        <div className="countdown-unit">
          <div className="countdown-number">{timeLeft.seconds}</div>
          <div className="countdown-label">Seconds</div>
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="events-grid">
        {events.map((evt, idx) => (
          <motion.div 
            key={idx}
            className="royal-card event-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            <div className="event-badge">{evt.badge}</div>
            <h3 className="event-name">{evt.title}</h3>
            
            <div className="event-detail-item">
              <Clock size={18} color="var(--gold-primary)" />
              <span>{evt.time}</span>
            </div>
            
            <div className="event-detail-item">
              <MapPin size={18} color="var(--gold-primary)" />
              <span>{evt.location}</span>
            </div>

            <div className="event-detail-item" style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              <Sparkles size={16} color="var(--gold-dark)" />
              <span>Dress Code: {evt.attire}</span>
            </div>

            <p style={{ marginTop: '1.25rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {evt.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
