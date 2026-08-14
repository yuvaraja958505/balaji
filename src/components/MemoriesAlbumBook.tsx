import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Sparkles, Heart, ChevronLeft, ChevronRight, Eye, X } from 'lucide-react'

// Import all memory images dynamically
const memoryModules = import.meta.glob<{ default: string }>('../assets/memories/*.jpeg', { eager: true })
const memoryImages: string[] = Object.keys(memoryModules).map(key => memoryModules[key].default || (memoryModules[key] as unknown as string))

const memoryCaptions = [
  "The Best Thing About Memories Is Making Them",
  "A Glimpse of Eternal Sunshine",
  "Laughs, Whispers & Sweet Promises",
  "Hand in Hand towards Forever",
  "Moments Captured in Time",
  "Pure Joy & Endless Smiles",
  "Two Hearts, One Rhythm",
  "Surrounded by Love & Blessings",
  "The Magic of Togetherness",
  "Unforgettable Memories",
  "Our Love Story Continues..."
]

export const MemoriesAlbumBook: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const totalPages = Math.ceil(memoryImages.length / 2) + 1 // Cover + spreads

  // Scroll position driver for photobook page turning
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const scrollableHeight = rect.height - window.innerHeight
      if (scrollableHeight <= 0) return

      const progress = Math.min(1, Math.max(0, -rect.top / scrollableHeight))
      const pageIndex = Math.min(totalPages - 1, Math.floor(progress * totalPages))
      setCurrentPage(pageIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [totalPages])

  const scrollToPage = (pageIndex: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const containerTop = window.scrollY + rect.top
    const scrollableHeight = rect.height - window.innerHeight
    if (scrollableHeight <= 0) {
      setCurrentPage(pageIndex)
      return
    }
    const targetScroll = containerTop + (pageIndex / (totalPages - 1)) * scrollableHeight
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    setCurrentPage(pageIndex)
  }

  const nextPage = () => scrollToPage(Math.min(totalPages - 1, currentPage + 1))
  const prevPage = () => scrollToPage(Math.max(0, currentPage - 1))

  return (
    <section ref={containerRef} className="memories-scroll-container">
      <div className="memories-sticky-view">
        {/* Section Header */}
        <div className="memories-header">
          <div className="memories-header-subtitle">
            <BookOpen size={18} />
            <span>OUR MEMORY ALBUM</span>
            <BookOpen size={18} />
          </div>
          <h2 className="section-main-title gold-text memories-header-title">
            Book of Memories
          </h2>
        </div>

        {/* 3D Photobook Container */}
        <div className="photobook-stage">
          <motion.div className="photobook-spine" />

          {/* Render Book Cover or Spreads based on currentPage */}
          <AnimatePresence mode="wait">
            {currentPage === 0 ? (
              /* ALBUM COVER PAGE */
              <motion.div 
                key="cover"
                className="album-page cover-page royal-card"
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="album-ring-binder" />
                <div className="album-cover-content">
                  <Sparkles size={32} color="var(--gold-primary)" style={{ marginBottom: '0.75rem' }} />
                  <div className="script-font gold-text album-cover-title">
                    The Best Thing About Memories Is Making Them
                  </div>
                  <div className="album-cover-couple">
                    BALAJI & SANJANA
                  </div>
                  <div className="album-cover-subtitle">
                    ✦ A Treasury of Cherished Moments ✦
                  </div>
                  <button onClick={nextPage} className="btn-gold album-cover-btn">
                    Open Memory Book <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* SPREAD PAGES */
              <motion.div 
                key={`spread-${currentPage}`}
                className="album-spread"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6 }}
              >
                <div className="album-ring-binder" />

                {/* LEFT PAGE */}
                <div className="album-page page-left">
                  {memoryImages[(currentPage - 1) * 2] && (
                    <div className="polaroid-frame" onClick={() => setSelectedPhoto(memoryImages[(currentPage - 1) * 2])}>
                      <div className="tape-top-left" />
                      <div className="photo-container">
                        <img 
                          src={memoryImages[(currentPage - 1) * 2]} 
                          alt="Memory" 
                          className="polaroid-img"
                        />
                        <div className="photo-hover-overlay">
                          <Eye size={22} color="white" />
                        </div>
                      </div>
                      <div className="polaroid-caption script-font">
                        {memoryCaptions[((currentPage - 1) * 2) % memoryCaptions.length]}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT PAGE */}
                <div className="album-page page-right">
                  {memoryImages[(currentPage - 1) * 2 + 1] ? (
                    <div className="polaroid-frame" onClick={() => setSelectedPhoto(memoryImages[(currentPage - 1) * 2 + 1])}>
                      <div className="tape-top-right" />
                      <div className="photo-container">
                        <img 
                          src={memoryImages[(currentPage - 1) * 2 + 1]} 
                          alt="Memory" 
                          className="polaroid-img"
                        />
                        <div className="photo-hover-overlay">
                          <Eye size={22} color="white" />
                        </div>
                      </div>
                      <div className="polaroid-caption script-font">
                        {memoryCaptions[((currentPage - 1) * 2 + 1) % memoryCaptions.length]}
                      </div>
                    </div>
                  ) : (
                    <div className="empty-page-placeholder">
                      <Heart size={40} color="var(--gold-primary)" style={{ margin: '0 auto 0.75rem', display: 'block' }} />
                      <div className="script-font gold-text" style={{ fontSize: '1.6rem' }}>
                        To Infinity & Beyond
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Book Navigation Controls */}
        <div className="book-controls">
          <button 
            className="btn-outline-gold" 
            onClick={prevPage} 
            disabled={currentPage === 0}
            style={{ opacity: currentPage === 0 ? 0.4 : 1 }}
          >
            <ChevronLeft size={18} /> Prev
          </button>
          <div className="page-counter">
            Page {currentPage + 1} of {totalPages}
          </div>
          <button 
            className="btn-outline-gold" 
            onClick={nextPage} 
            disabled={currentPage === totalPages - 1}
            style={{ opacity: currentPage === totalPages - 1 ? 0.4 : 1 }}
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            className="photo-lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="lightbox-close-btn"
            >
              <X size={24} />
            </button>

            <motion.img 
              src={selectedPhoto} 
              alt="Memory Enlarged"
              className="lightbox-img"
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
