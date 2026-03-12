'use client'
import { research } from '@/data/portfolio'
import { useInView } from '@/hooks/useInView'
import { SectionHeader } from './Skills'

export default function Research() {
  const { ref, inView } = useInView()

  return (
    <section id="research" ref={ref}>
      <div className="section-wrap">
        <SectionHeader num="03. RESEARCH" title="Research & Publications" inView={inView} />

        {/* Papers */}
        <div style={{ display:'flex', flexDirection:'column', gap:20, marginBottom:56 }}>
          {research.map((r, i) => (
            <div
              key={i}
              className="cyber-panel"
              style={{
                borderRadius:4,
                overflow:'hidden',
                position:'relative',
                borderColor:'#1a2a3a',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(22px)',
                transition:`opacity .6s ease ${i*.15}s, transform .6s ease ${i*.15}s`,
              }}
            >

              {/* Accent border */}
              <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:'#00d4ff' }} />

              <div style={{ padding:'26px 30px 26px 33px' }}>

                {/* Top Row */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12, flexWrap:'wrap', gap:8 }}>

                  <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
                    <span style={{
                      fontFamily:'var(--font-geist-mono,monospace)',
                      fontSize:10,
                      padding:'3px 10px',
                      background:'rgba(0,255,157,.1)',
                      color:'#00ff9d',
                      border:'1px solid rgba(0,255,157,.3)',
                      borderRadius:2,
                      letterSpacing:'.1em'
                    }}>
                      ✓ {r.status.toUpperCase()}
                    </span>

                    <span style={{
                      fontFamily:'var(--font-geist-mono,monospace)',
                      fontSize:10,
                      color:'#5a7a8a'
                    }}>
                      {r.period}
                    </span>
                  </div>

                  <div style={{ display:'flex', gap:12 }}>

                    {r.link && (
                      <a
                        href={r.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily:'var(--font-geist-mono,monospace)',
                          fontSize:10,
                          color:'#ff9a3c',
                          textDecoration:'none',
                          transition:'opacity .2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity='.7'}
                        onMouseLeave={e => e.currentTarget.style.opacity='1'}
                      >
                        PAPER ↗
                      </a>
                    )}

                    {r.github && (
                      <a
                        href={r.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily:'var(--font-geist-mono,monospace)',
                          fontSize:10,
                          color:'#5a7a8a',
                          textDecoration:'none',
                          transition:'color .2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.color='#00d4ff'}
                        onMouseLeave={e => e.currentTarget.style.color='#5a7a8a'}
                      >
                        GITHUB ↗
                      </a>
                    )}

                  </div>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily:'var(--font-geist-sans,sans-serif)',
                  fontSize:'clamp(14px,1.8vw,17px)',
                  fontWeight:600,
                  color:'#f0f8ff',
                  marginBottom:6,
                  lineHeight:1.45
                }}>
                  {r.title}
                </h3>

                {/* Venue */}
                <div style={{
                  fontFamily:'var(--font-geist-mono,monospace)',
                  fontSize:12,
                  color:'#00d4ff',
                  marginBottom:5,
                  letterSpacing:'.05em'
                }}>
                  📚 {r.venue}
                </div>

                {/* Advisor */}
                <div style={{
                  fontFamily:'var(--font-geist-mono,monospace)',
                  fontSize:11,
                  color:'#5a7a8a',
                  marginBottom:10
                }}>
                  Advisor: {r.advisor}
                </div>

                {/* Highlight */}
                {r.highlight && (
                  <div style={{
                    display:'inline-block',
                    fontFamily:'var(--font-geist-mono,monospace)',
                    fontSize:10,
                    color:'#00ff9d',
                    padding:'3px 12px',
                    border:'1px solid rgba(0,255,157,.3)',
                    background:'rgba(0,255,157,.06)',
                    marginBottom:14,
                    letterSpacing:'.08em'
                  }}>
                    ★ {r.highlight}
                  </div>
                )}

                {/* Summary */}
                <p style={{
                  fontFamily:'var(--font-geist-sans,sans-serif)',
                  fontSize:14,
                  color:'#9ab8cc',
                  lineHeight:1.78,
                  marginBottom:18
                }}>
                  {r.summary}
                </p>

                {/* Tags */}
                <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:r.link ? 18 : 0 }}>
                  {r.tags.map((t, j) => (
                    <span key={j} className="tech-tag">{t}</span>
                  ))}
                </div>

                {/* Read Paper Button */}
                {r.link && (
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display:'inline-flex',
                      alignItems:'center',
                      gap:6,
                      fontFamily:'var(--font-geist-mono,monospace)',
                      fontSize:11,
                      color:'#ff9a3c',
                      textDecoration:'none',
                      letterSpacing:'.1em',
                      padding:'5px 12px',
                      border:'1px solid rgba(255,154,60,.3)',
                      background:'rgba(255,154,60,.06)',
                      borderRadius:2,
                      transition:'all .2s'
                    }}
                    onMouseEnter={e=>{
                      e.currentTarget.style.background='rgba(255,154,60,.12)'
                      e.currentTarget.style.borderColor='rgba(255,154,60,.6)'
                    }}
                    onMouseLeave={e=>{
                      e.currentTarget.style.background='rgba(255,154,60,.06)'
                      e.currentTarget.style.borderColor='rgba(255,154,60,.3)'
                    }}
                  >
                    📄 READ PAPER ↗
                  </a>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}