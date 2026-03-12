'use client'
import { useState, useRef } from 'react'
import { skills, certifications } from '@/data/portfolio'
import { useInView } from '@/hooks/useInView'

const ICONS = {
  'Security Tools': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  'Security Frameworks': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  'Programming': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  'Web / Fullstack': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  'Cloud & DevOps': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  ),
  'Databases': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  'AI / ML': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
}

const IS_SEC = (cat) => cat === 'Security Tools' || cat === 'Security Frameworks'
const CERT_ISSUERS = ['Indiana University', 'Google', 'University of Colorado', 'IBM', 'Others']
const ISSUER_COLOR = {
  'Indiana University':    { border: 'rgba(100,120,255,.4)', bg: 'rgba(100,120,255,.07)', text: '#8899ff', dot: '#8899ff' },
  'Google':                { border: 'rgba(66,133,244,.4)',  bg: 'rgba(66,133,244,.07)',  text: '#7fb3ff', dot: '#7fb3ff' },
  'University of Colorado':{ border: 'rgba(200,100,0,.4)',   bg: 'rgba(200,100,0,.07)',   text: '#ffaa55', dot: '#ffaa55' },
  'IBM':                   { border: 'rgba(0,130,220,.4)',   bg: 'rgba(0,130,220,.07)',   text: '#55ccff', dot: '#55ccff' },
  'Others':                { border: 'rgba(0,212,255,.25)',  bg: 'rgba(0,212,255,.05)',   text: '#00d4ff', dot: '#00d4ff' },
}

const INITIAL_SHOW = 6

export default function Skills() {
  const { ref, inView } = useInView()
  const [certFilter, setCertFilter] = useState('All')
  const [expanded, setExpanded] = useState(false)
  const [collapsing, setCollapsing] = useState(false)
  const certsRef = useRef(null)

  const filters = ['All', ...CERT_ISSUERS.filter(g =>
    certifications.some(c => (CERT_ISSUERS.includes(c.issuer) ? c.issuer : 'Others') === g)
  )]

  const filtered = certFilter === 'All'
    ? certifications
    : certifications.filter(c =>
        (CERT_ISSUERS.includes(c.issuer) ? c.issuer : 'Others') === certFilter
      )

  const visible = filtered.slice(0, expanded ? filtered.length : INITIAL_SHOW)
  const remaining = filtered.length - INITIAL_SHOW

  // 3-step smooth collapse:
  // 1) Mark collapsing → extra cards play fadeSlideOut (300ms)
  // 2) Scroll certs header into view smoothly
  // 3) After scroll settles (500ms), actually remove extra cards & clear flag
  const handleCollapse = () => {
    setCollapsing(true)
    setTimeout(() => {
      certsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => {
        setExpanded(false)
        setCollapsing(false)
      }, 500)
    }, 300)
  }

  return (
    <section id="skills" ref={ref}>
      <div className="section-wrap">

        <SectionHeader num="02. SKILLS" title="Technical Arsenal" inView={inView} />

        {/* Skills grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
          gap: 14,
          marginBottom: 52,
        }}>
          {Object.entries(skills).map(([cat, items], i) => (
            <div
              key={cat}
              className="cyber-panel glow-hover"
              style={{
                padding: 24, borderRadius: 2,
                opacity:   inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(22px)',
                transition: `opacity .5s ease ${i * .07}s, transform .5s ease ${i * .07}s`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
                {ICONS[cat]}
                <span style={{
                  fontFamily: '"Orbitron", monospace',
                  fontSize: 10, fontWeight: 600,
                  color: IS_SEC(cat) ? '#00ff9d' : '#00d4ff',
                  letterSpacing: '.1em',
                }}>
                  {cat.toUpperCase()}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {items.map((sk, j) => (
                  <span key={j} style={{
                    fontFamily: 'var(--font-geist-mono, monospace)',
                    fontSize: 11, padding: '3px 9px',
                    border: `1px solid ${IS_SEC(cat) ? 'rgba(0,255,157,.25)' : 'rgba(0,212,255,.2)'}`,
                    color:      IS_SEC(cat) ? '#00ff9d' : '#8ab0c4',
                    background: IS_SEC(cat) ? 'rgba(0,255,157,.05)' : 'rgba(0,212,255,.04)',
                    borderRadius: 2,
                  }}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div ref={certsRef} style={{ opacity: inView ? 1 : 0, transition: 'opacity .8s ease .4s' }}>

          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: 10, letterSpacing: '.2em', color: '#5a7a8a' }}>
                CERTIFICATIONS
              </div>
              <div style={{
                fontFamily: 'var(--font-geist-mono, monospace)', fontSize: 10,
                padding: '2px 8px',
                background: 'rgba(0,212,255,.08)',
                border: '1px solid rgba(0,212,255,.2)',
                color: '#00d4ff', borderRadius: 20,
              }}>
                {certifications.length}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {filters.map(f => (
                <button key={f} onClick={() => { setCertFilter(f); setExpanded(false) }} style={{
                  fontFamily: 'var(--font-geist-mono, monospace)', fontSize: 10,
                  padding: '3px 10px',
                  background: certFilter === f ? 'rgba(0,212,255,.12)' : 'transparent',
                  border: `1px solid ${certFilter === f ? '#00d4ff' : '#1a2a3a'}`,
                  color:  certFilter === f ? '#00d4ff' : '#5a7a8a',
                  cursor: 'pointer', borderRadius: 2, transition: 'all .2s',
                }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Cert grid */}
          <div
            className="cert-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 10,
            }}
          >
            {visible.map((c, i) => {
              const group = CERT_ISSUERS.includes(c.issuer) ? c.issuer : 'Others'
              const col = ISSUER_COLOR[group]
              const isExtra = i >= INITIAL_SHOW
              return (
                <div
                  key={`${certFilter}-${i}`}
                  style={{
                    opacity: 0,
                    animation: collapsing && isExtra
                      ? `fadeSlideOut 0.3s ease forwards`
                      : `fadeSlideIn 0.35s ease ${Math.min(i, 11) * 0.04}s forwards`,
                  }}
                >
                  <div
                    className="cyber-panel cert-card"
                    style={{
                      padding: '16px 18px',
                      borderRadius: 2,
                      borderLeft: `2px solid ${col.border}`,
                      background: col.bg,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 10,
                      height: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Name */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                      <div style={{
                        width: 7, height: 7, borderRadius: '50%',
                        background: col.dot, flexShrink: 0, marginTop: 5,
                      }} />
                      <div style={{
                        fontFamily: 'var(--font-geist-sans, sans-serif)',
                        fontSize: 13, fontWeight: 600,
                        color: '#e2eef8', lineHeight: 1.4,
                      }}>
                        {c.name}
                      </div>
                    </div>

                    {/* Meta */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', paddingLeft: 16 }}>
                      <span style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: 10, color: col.text }}>
                        {c.issuer}
                      </span>
                      <span style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: 10, color: '#4a6a7a' }}>
                        {c.year}
                      </span>
                      {c.credId && (
                        <span style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: 9, color: '#3a5060', letterSpacing: '.04em' }}>
                          ID: {c.credId}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Expand / Collapse */}
          {filtered.length > INITIAL_SHOW && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
              <button
                onClick={() => expanded ? handleCollapse() : setExpanded(true)}
                disabled={collapsing}
                style={{
                  fontFamily: 'var(--font-geist-mono, monospace)', fontSize: 11,
                  padding: '10px 32px',
                  background: 'transparent',
                  border: '1px solid #1a2a3a',
                  color: '#5a7a8a',
                  cursor: collapsing ? 'default' : 'pointer',
                  borderRadius: 2,
                  display: 'flex', alignItems: 'center', gap: 10,
                  transition: 'all .2s', letterSpacing: '.1em',
                  opacity: collapsing ? 0.5 : 1,
                }}
                onMouseEnter={e => { if (!collapsing) { e.currentTarget.style.borderColor='#00d4ff'; e.currentTarget.style.color='#00d4ff' }}}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#1a2a3a'; e.currentTarget.style.color='#5a7a8a' }}
              >
                {expanded ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18 15 12 9 6 15"/>
                    </svg>
                    {collapsing ? 'CLOSING...' : 'SHOW LESS'}
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                    {remaining} MORE CERTIFICATIONS
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(10px); }
        }
        .cert-card { height: 100%; box-sizing: border-box; }
        @media (max-width: 900px) { .cert-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .cert-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

export function SectionHeader({ num, title, inView }) {
  return (
    <div style={{
      marginBottom: 52,
      opacity:   inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(18px)',
      transition: 'opacity .6s ease, transform .6s ease',
    }}>
      <div className="section-num">{num}</div>
      <h2 style={{
        fontFamily: '"Orbitron", monospace',
        fontSize: 'clamp(26px, 4vw, 40px)',
        fontWeight: 700, color: '#f0f8ff',
        display: 'flex', alignItems: 'center', gap: 18,
      }}>
        {title}
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #1a2a3a, transparent)', maxWidth: 280 }} />
      </h2>
    </div>
  )
}