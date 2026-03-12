'use client'
import { useState, useCallback } from 'react'
import LoadingScreen  from './LoadingScreen'
import Navbar         from './Navbar'
import SidebarLinks   from './SidebarLinks'
import Hero           from './Hero'
import About          from './About'
import Skills         from './Skills'
import Experience     from './Experience'
import Projects       from './Projects'
import Research       from './Research'
import Volunteering   from './Volunteering'
import Contact        from './Contact'
import Footer         from './Footer'

export default function ClientShell() {
  const [loaded, setLoaded] = useState(false)
  const onLoadDone = useCallback(() => setLoaded(true), [])

  return (
    <>
      {!loaded && <LoadingScreen onComplete={onLoadDone} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease', minHeight: '100vh' }}>
        <div className="noise" aria-hidden="true" />
        <Navbar />
        <SidebarLinks />
        <main>
          <Hero />
          <About />
          <Skills />
          <Research />
          <Projects />
          <Experience />
          <Volunteering />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
