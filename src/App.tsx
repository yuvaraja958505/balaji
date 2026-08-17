import { useState } from 'react'
import { Preloader } from './components/Preloader'
import { AudioPlayer } from './components/AudioPlayer'
import { CharacterReaction } from './components/CharacterReaction'
import { GateCanvasHero } from './components/GateCanvasHero'
import { MandapamScrollCanvas } from './components/MandapamScrollCanvas'
import { MemoriesAlbumBook } from './components/MemoriesAlbumBook'
import { WeddingIntro } from './components/WeddingIntro'
import { CoupleStory } from './components/CoupleStory'
import { InvitationCard } from './components/InvitationCard'
import { EventsSchedule } from './components/EventsSchedule'
import { VenueLocation } from './components/VenueLocation'
import { PhotoGallery } from './components/PhotoGallery'
import { FamilyBlessings } from './components/FamilyBlessings'
import { Footer } from './components/Footer'
import './App.css'

export function App() {
  const [preloadProgress, setPreloadProgress] = useState(0)
  const [isPreloadComplete, setIsPreloadComplete] = useState(false)

  return (
    <div className="wedding-app">
      {/* Preloader overlay while caching gate frames */}
      <Preloader 
        progress={preloadProgress} 
        isReady={isPreloadComplete} 
      />

      {/* Floating Audio Control */}
      <AudioPlayer />

      {/* Floating Left Bottom Transparent Video Character */}
      <CharacterReaction />

      {/* Hero Section — 3D Gate Opening Scroll Canvas (93 frames) */}
      <GateCanvasHero 
        onPreloadProgress={setPreloadProgress}
        onPreloadComplete={() => setIsPreloadComplete(true)}
      />

      {/* Second Scroll Section — 3D Mandapam & Couple Ceremony Canvas (41 frames from m_photos) */}
      <MandapamScrollCanvas />

      {/* Third Scroll Section — Interactive Spiral Photo Album of Memories */}
      <MemoriesAlbumBook />

      {/* Wedding Content Sections */}
      <WeddingIntro />
      <CoupleStory />
      <InvitationCard />
      <EventsSchedule />
      <PhotoGallery />
      <FamilyBlessings />
      <VenueLocation />
      <Footer />
    </div>
  )
}

export default App