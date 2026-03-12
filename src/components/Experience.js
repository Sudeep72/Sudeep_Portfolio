'use client'
import { useState } from 'react'
import { experience, education, achievements } from '@/data/portfolio'
import { useInView } from '@/hooks/useInView'
import { SectionHeader } from './Skills'

export default function Experience() {
  const { ref, inView } = useInView()
  const [tab, setTab] = useState(0)
  const cur = experience[tab]

  return (
    <section id="experience" ref={ref}>
      <div className="section-wrap">
        <SectionHeader num="05. EXPERIENCE" title="Where I've Worked" inView={inView} />

        {/* Experience tabs */}
        <div
          style={{
            display:'grid',
            gridTemplateColumns:'200px 1fr',
            gap:0,
            opacity:   inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(22px)',
            transition:'opacity .6s ease .1s, transform .6s ease .1s',
          }}
          className="exp-grid"
        >
          {/* Tab list */}
          <div style={{ borderRight:'1px solid #1a2a3a' }}>
            {experience.map((e, i) => (
              <button
                key={i}
                onClick={() => setTab(i)}
                style={{
                  display:'block', width:'100%', textAlign:'left',
                  padding:'13px 18px',
                  background: tab===i ? 'rgba(0,212,255,.06)' : 'transparent',
                  border:'none',
                  borderLeft:`2px solid ${tab===i ? '#00d4ff' : 'transparent'}`,
                  borderBottom:'1px solid #0d1520',
                  cursor:'pointer', transition:'all .2s',
                  fontFamily:'var(--font-geist-mono,monospace)',
                  fontSize:11,
                  letterSpacing:'.05em',
                  color: tab===i ? '#00d4ff' : '#6a8a9a',
                  fontWeight: tab===i ? 600 : 400,
                }}
                onMouseEnter={e => { if(tab!==i) e.currentTarget.style.background='rgba(0,212,255,.03)' }}
                onMouseLeave={e => { if(tab!==i) e.currentTarget.style.background='transparent' }}
              >
                {e.org}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ padding:'26px 34px' }} className="exp-content">
            <h3 style={{ fontFamily:'"Orbitron",monospace', fontSize:'clamp(15px,2vw,19px)', fontWeight:600, color:'#f0f8ff', marginBottom:5 }}>
              {cur.role} <span style={{ color:'#00d4ff' }}>@ {cur.org}</span>
            </h3>
            <div style={{ fontFamily:'var(--font-geist-mono,monospace)', fontSize:12, color:'#5a7a8a', marginBottom:5, letterSpacing:'.08em' }}>
              {cur.period}
            </div>
            <div style={{ fontFamily:'var(--font-geist-mono,monospace)', fontSize:11, color:'#5a7a8a', marginBottom:22, display:'flex', gap:14 }}>
              <span>{cur.type}</span><span>·</span><span>{cur.location}</span>
            </div>
            <ul style={{ listStyle:'none', padding:0, display:'flex', flexDirection:'column', gap:11 }}>
              {cur.points.map((pt, i) => (
                <li key={i} style={{ display:'flex', gap:11, alignItems:'flex-start' }}>
                  <span style={{ color:'#00d4ff', fontSize:13, flexShrink:0, marginTop:2 }}>▸</span>
                  <span style={{ fontFamily:'var(--font-geist-sans,sans-serif)', fontSize:14, color:'#9ab8cc', lineHeight:1.75 }}>
                    {pt}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Education + Achievements */}
        <div
          style={{
            display:'grid', gridTemplateColumns:'1fr 1fr', gap:24,
            marginTop:56,
            opacity:   inView ? 1 : 0,
            transition:'opacity .8s ease .4s',
          }}
          className="edu-row"
        >
          {/* Education */}
          <div>
            <div style={{ fontFamily:'var(--font-geist-mono,monospace)', fontSize:10, color:'#5a7a8a', letterSpacing:'.2em', marginBottom:18 }}>EDUCATION</div>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {education.map((e, i) => (
                <div key={i} className="cyber-panel" style={{ padding:'18px 22px', borderRadius:2 }}>
                  <div style={{ fontFamily:'"Orbitron",monospace', fontSize:11, fontWeight:600, color:'#00d4ff', marginBottom:4, letterSpacing:'.05em' }}>
                    {e.school}
                  </div>
                  <div style={{ fontFamily:'var(--font-geist-sans,sans-serif)', fontSize:13, color:'#e2eef8', marginBottom:4 }}>
                    {e.degree}
                  </div>
                  <div style={{ display:'flex', gap:14, fontFamily:'var(--font-geist-mono,monospace)', fontSize:11, color:'#5a7a8a', marginBottom:10 }}>
                    <span>{e.period}</span>
                    <span style={{ color:'#00ff9d' }}>GPA: {e.gpa}</span>
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                    {e.courses.slice(0,3).map((c, j) => (
                      <span key={j} style={{ fontFamily:'var(--font-geist-mono,monospace)', fontSize:10, padding:'2px 7px', border:'1px solid #1a2a3a', color:'#6a8a9a', borderRadius:2 }}>{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div style={{ fontFamily:'var(--font-geist-mono,monospace)', fontSize:10, color:'#5a7a8a', letterSpacing:'.2em', marginBottom:18 }}>ACHIEVEMENTS</div>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {achievements.map((a, i) => (
                <div key={i} className="cyber-panel" style={{ padding:'18px 22px', borderRadius:2, borderLeft:'2px solid #ff9a3c' }}>
                  <div style={{ fontFamily:'"Orbitron",monospace', fontSize:12, fontWeight:600, color:'#ff9a3c', marginBottom:4, letterSpacing:'.05em' }}>
                    🏆 {a.title}
                  </div>
                  <div style={{ fontFamily:'var(--font-geist-mono,monospace)', fontSize:11, color:'#5a7a8a', marginBottom:8 }}>
                    {a.org} · {a.year}
                  </div>
                  <p style={{ fontFamily:'var(--font-geist-sans,sans-serif)', fontSize:13, color:'#9ab8cc', lineHeight:1.65 }}>
                    {a.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 600px) {
          .exp-grid { grid-template-columns: 1fr !important; }
          .exp-grid > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid #1a2a3a;
            display: flex; overflow-x: auto;
          }
          .exp-grid > div:first-child button {
            min-width: max-content;
            border-left: none !important;
          }
          .exp-content { padding: 22px 0 !important; }
          .edu-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}