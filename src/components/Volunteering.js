'use client'
import { useState } from 'react'
import { volunteering } from '@/data/portfolio'
import { useInView } from '@/hooks/useInView'
import { SectionHeader } from './Skills'

const DOMAIN_STYLE = {
  'Science and Technology': { border:'rgba(0,212,255,.35)', bg:'rgba(0,212,255,.07)', text:'#00d4ff' },
  'Social Services':        { border:'rgba(0,255,157,.35)', bg:'rgba(0,255,157,.07)', text:'#00ff9d' },
}
const ORG_ICON = {
  'Google Developers Group':  '🌐',
  'National Service Scheme':  '🤝',
  'U-Report India':           '🌍',
}

export default function Volunteering() {
  const { ref, inView } = useInView()
  const [active, setActive] = useState(0)
  const cur = volunteering[active]
  const dc = DOMAIN_STYLE[cur.domain] || DOMAIN_STYLE['Social Services']

  return (
    <section id="volunteering" ref={ref}>
      <div className="section-wrap">
        <SectionHeader num="07. VOLUNTEERING" title="Community Work" inView={inView} />

        <div
          className="vol-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '190px 1fr',
            border: '1px solid #1a2a3a',
            borderRadius: 4,
            overflow: 'hidden',
            opacity:   inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity .6s ease, transform .6s ease',
          }}
        >
          {/* Tab list */}
          <div style={{ borderRight:'1px solid #1a2a3a', background:'rgba(13,21,32,.5)' }}>
            {volunteering.map((v, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  display:'block', width:'100%', textAlign:'left',
                  padding:'14px 16px',
                  background: active===i ? 'rgba(0,212,255,.07)' : 'transparent',
                  border:'none',
                  borderLeft:`2px solid ${active===i ? '#00d4ff' : 'transparent'}`,
                  borderBottom:'1px solid #0d1520',
                  cursor:'pointer', transition:'all .2s',
                  fontFamily:'var(--font-geist-mono, monospace)',
                  fontSize:10, letterSpacing:'.05em',
                  color: active===i ? '#00d4ff' : '#6a8a9a',
                  fontWeight: active===i ? 600 : 400,
                  lineHeight:1.5,
                }}
                onMouseEnter={e => { if(active!==i) e.currentTarget.style.background='rgba(0,212,255,.03)' }}
                onMouseLeave={e => { if(active!==i) e.currentTarget.style.background='transparent' }}
              >
                <div>{ORG_ICON[v.org] || '🏛'} {v.org}</div>
                <div style={{ fontSize:9, color:'#4a6a7a', marginTop:2 }}>{v.role}</div>
              </button>
            ))}
          </div>

          {/* Content pane */}
          <div style={{ padding:'28px 32px' }} className="vol-content">
            <h3 style={{
              fontFamily:'"Orbitron", monospace',
              fontSize:'clamp(13px, 2vw, 17px)',
              fontWeight:600, color:'#f0f8ff', marginBottom:5,
            }}>
              {cur.role}
              <span style={{ color:'#00d4ff' }}> @ {cur.org}</span>
            </h3>

            <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center', marginBottom:18 }}>
              <span style={{ fontFamily:'var(--font-geist-mono, monospace)', fontSize:11, color:'#5a7a8a' }}>
                {cur.period} · {cur.duration}
              </span>
              <span style={{
                fontFamily:'var(--font-geist-mono, monospace)', fontSize:9,
                padding:'2px 10px',
                border:`1px solid ${dc.border}`,
                background:dc.bg, color:dc.text,
                borderRadius:2, letterSpacing:'.1em',
              }}>
                {cur.domain.toUpperCase()}
              </span>
            </div>

            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10 }}>
              {cur.points.map((pt, i) => (
                <li key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                  <span style={{ color:'#00d4ff', fontSize:12, flexShrink:0, marginTop:3 }}>▸</span>
                  <span style={{ fontFamily:'var(--font-geist-sans, sans-serif)', fontSize:14, color:'#9ab8cc', lineHeight:1.75 }}>
                    {pt}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .vol-grid { grid-template-columns: 1fr !important; }
          .vol-grid > div:first-child { border-right:none !important; border-bottom:1px solid #1a2a3a; display:flex; overflow-x:auto; }
          .vol-grid > div:first-child button { min-width:max-content; border-left:none !important; border-bottom:none !important; border-right:2px solid transparent; }
          .vol-content { padding:20px 18px !important; }
        }
      `}</style>
    </section>
  )
}
