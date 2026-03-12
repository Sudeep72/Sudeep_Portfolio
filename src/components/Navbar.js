'use client'
import { useState, useEffect } from 'react'

const NAV = [
  { label: '01. ABOUT',      id: 'about'       },
  { label: '02. SKILLS',     id: 'skills'      },
  { label: '03. RESEARCH',   id: 'research'    },
  { label: '04. PROJECTS',   id: 'projects'    },
  { label: '05. EXPERIENCE', id: 'experience'  },
  { label: '06. VOLUNTEER',  id: 'volunteering'},
  { label: '07. CONTACT',    id: 'contact'     },
]

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [active,    setActive]    = useState('')
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [closing,   setClosing]   = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const hit = [...NAV].reverse().find(({ id }) => {
        const el = document.getElementById(id)
        return el && el.getBoundingClientRect().top <= 130
      })
      if (hit) setActive(hit.id)
    }

    onScroll() // run once immediately on mount
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openMenu = () => {
    setClosing(false)
    setMenuOpen(true)
  }

  const closeMenu = () => {
    setClosing(true)
    setTimeout(() => {
      setMenuOpen(false)
      setClosing(false)
    }, 280)
  }

  const toggleMenu = () => menuOpen ? closeMenu() : openMenu()

  const handleNavClick = (id) => {
    scrollTo(id)
    closeMenu()
  }

  const linkStyle = (id) => ({
    background:    'none',
    border:        'none',
    cursor:        'pointer',
    fontFamily:    '"JetBrains Mono",monospace',
    fontSize:      11,
    letterSpacing: '.08em',
    color:         active === id ? '#00d4ff' : '#6a8a9a',
    borderBottom:  `1px solid ${active === id ? '#00d4ff' : 'transparent'}`,
    paddingBottom: 2,
    transition:    'color .2s, border-color .2s',
  })

  return (
    <>
      <nav style={{
        position:       'fixed',
        top: 0, left: 0, right: 0,
        zIndex:         100,
        height:         64,
        padding:        '0 40px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        background:     scrolled ? 'rgba(6,10,15,.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom:   scrolled ? '1px solid rgba(26,42,58,.7)' : 'none',
        transition:     'all .3s ease',
      }}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <div style={{
            width: 32, height: 32,
            border: '1px solid #00d4ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <span style={{
              fontFamily: '"Orbitron",monospace',
              fontSize: 14, fontWeight: 700,
              color: '#00d4ff',
              textShadow: '0 0 10px #00d4ff',
            }}>S</span>
            <div style={{
              position: 'absolute', bottom: -4, right: -4,
              width: 7, height: 7,
              background: '#00ff9d',
              boxShadow: '0 0 7px #00ff9d',
            }} />
          </div>
          <span
            style={{
              fontFamily: '"Orbitron",monospace',
              fontSize: 12, fontWeight: 600,
              color: '#c8d8e8',
              letterSpacing: '.15em',
            }}
            className="nav-logo-text"
          >
            SUDEEP<span style={{ color: '#00d4ff' }}>_SEC</span>
          </span>
        </button>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 26, alignItems: 'center' }} className="nav-desktop">
          {NAV.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={linkStyle(id)}
              onMouseEnter={e => e.currentTarget.style.color = '#00d4ff'}
              onMouseLeave={e => e.currentTarget.style.color = active === id ? '#00d4ff' : '#6a8a9a'}
            >
              {label}
            </button>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 11,
              letterSpacing: '.1em',
              color: '#00d4ff',
              border: '1px solid #00d4ff',
              padding: '6px 16px',
              textDecoration: 'none',
              transition: 'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,255,.1)'; e.currentTarget.style.boxShadow = '0 0 14px rgba(0,212,255,.2)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none' }}
          >
            RESUME
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="nav-hamburger"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
        >
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 22, height: 1.5,
              background: menuOpen ? '#00d4ff' : '#c8d8e8',
              marginBottom: i < 2 ? 5 : 0,
              transition: 'all .3s',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(4.5px,4.5px)'
                : i === 2 ? 'rotate(-45deg) translate(4.5px,-4.5px)'
                : 'scaleX(0)'
                : 'none',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position:       'fixed',
          top:            64,
          left:           0,
          right:          0,
          zIndex:         99,
          background:     'rgba(6,10,15,.98)',
          backdropFilter: 'blur(20px)',
          borderBottom:   '1px solid #1a2a3a',
          overflow:       'hidden',
          animation:      closing
            ? 'menuSlideUp 0.28s ease forwards'
            : 'menuSlideDown 0.28s ease forwards',
        }}>
          <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {NAV.map(({ label, id }, i) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                style={{
                  background:    'none',
                  border:        'none',
                  cursor:        'pointer',
                  fontFamily:    '"JetBrains Mono",monospace',
                  fontSize:      13,
                  letterSpacing: '.1em',
                  color:         active === id ? '#00d4ff' : '#c8d8e8',
                  textAlign:     'left',
                  padding:       '12px 0',
                  borderBottom:  '1px solid #0d1520',
                  opacity:       0,
                  animation:     closing
                    ? `menuItemFadeOut 0.15s ease forwards`
                    : `menuItemFadeIn 0.25s ease ${i * 0.04}s forwards`,
                }}
              >
                {label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily:     '"JetBrains Mono",monospace',
                fontSize:       12,
                color:          '#00d4ff',
                border:         '1px solid #00d4ff',
                padding:        '10px 20px',
                textDecoration: 'none',
                textAlign:      'center',
                marginTop:      12,
                opacity:        0,
                animation:      closing
                  ? `menuItemFadeOut 0.15s ease forwards`
                  : `menuItemFadeIn 0.25s ease ${NAV.length * 0.04}s forwards`,
              }}
            >
              RESUME
            </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes menuSlideDown {
          from { max-height: 0;     opacity: 0; transform: translateY(-8px); }
          to   { max-height: 600px; opacity: 1; transform: translateY(0);    }
        }
        @keyframes menuSlideUp {
          from { max-height: 600px; opacity: 1; transform: translateY(0);    }
          to   { max-height: 0;     opacity: 0; transform: translateY(-8px); }
        }
        @keyframes menuItemFadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0);     }
        }
        @keyframes menuItemFadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @media (max-width: 768px) {
          .nav-desktop   { display: none !important;  }
          .nav-hamburger { display: block !important; }
        }
        @media (max-width: 900px) {
          .nav-logo-text { display: none !important; }
        }
      `}</style>
    </>
  )
}