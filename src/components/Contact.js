'use client'
import { useState } from 'react'
import { personalInfo } from '@/data/portfolio'
import { useInView } from '@/hooks/useInView'
import { SectionHeader } from './Skills'

const TERMINAL_ROWS = [
  { key: '# Status',  val: 'Actively seeking roles',             col: '#5a7a8a'  },
  { key: 'Location',  val: personalInfo.location,                col: '#e2eef8'  },
  { key: 'Email',     val: personalInfo.email,                   col: '#00d4ff'  },
  { key: 'GitHub',    val: '@Sudeep72',                          col: '#00ff9d'  },
  { key: 'Focus',     val: 'Cybersecurity / AI Security',        col: '#ff9a3c'  },
  { key: 'Available', val: 'Internships · Full-time · Research', col: '#e2eef8'  },
]

export default function Contact() {
  const { ref, inView } = useInView()
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section id="contact" ref={ref}>
      <div className="section-wrap" style={{ paddingBottom:120 }}>
        <SectionHeader num="08. CONTACT" title="Get In Touch" inView={inView} />

        <div
          style={{
            display:'grid', gridTemplateColumns:'1fr 1fr', gap:40,
            opacity:   inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(22px)',
            transition:'opacity .6s ease .1s, transform .6s ease .1s',
          }}
          className="contact-grid"
        >
          {/* Left */}
          <div>
            <p style={{ fontFamily:'var(--font-geist-sans,sans-serif)', fontSize:16, color:'#9ab8cc', lineHeight:1.85, marginBottom:20 }}>
              I&apos;m actively seeking roles in{' '}
              <span style={{ color:'#00d4ff' }}>Cybersecurity Risk Management</span>,{' '}
              <span style={{ color:'#00ff9d' }}>Offensive Security</span>, SOC/IR, Threat Detection and Cloud Security.
            </p>
            <p style={{ fontFamily:'var(--font-geist-sans,sans-serif)', fontSize:15, color:'#7a9aaa', lineHeight:1.85, marginBottom:32 }}>
              Whether you have a role, a collaboration, or just want to talk CVEs, my inbox is always open.
            </p>

            {/* Email button */}
            <button
              onClick={copy}
              style={{
                display:'flex', alignItems:'center', gap:10,
                fontFamily:'var(--font-geist-mono,monospace)', fontSize:13,
                color:      copied ? '#00ff9d' : '#00d4ff',
                background: 'transparent',
                border:`1px solid ${copied ? '#00ff9d' : '#00d4ff'}`,
                padding:'13px 22px', cursor:'pointer', marginBottom:32,
                letterSpacing:'.05em', transition:'all .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(0,212,255,.06)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >
              {copied ? '✓ COPIED TO CLIPBOARD' : `📧 ${personalInfo.email}`}
            </button>

            {/* Social links */}
            <div style={{ display:'flex', gap:22, flexWrap:'wrap' }}>
              {[
                { label:'GITHUB',   href: personalInfo.github },
                { label:'LINKEDIN', href: personalInfo.linkedin },
                // { label:'WEBSITE',  href:`https://${personalInfo.website}` },
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily:'var(--font-geist-mono,monospace)', fontSize:11,
                    color:'#6a8a9a', textDecoration:'none', letterSpacing:'.1em',
                    borderBottom:'1px solid transparent', transition:'all .2s',
                    paddingBottom:2,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color='#00d4ff'; e.currentTarget.style.borderBottomColor='#00d4ff' }}
                  onMouseLeave={e => { e.currentTarget.style.color='#6a8a9a'; e.currentTarget.style.borderBottomColor='transparent' }}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Terminal panel */}
          <div>
            <div style={{ background:'rgba(10,16,24,.96)', border:'1px solid #1a2a3a', borderRadius:4, overflow:'hidden', fontFamily:'var(--font-geist-mono,monospace)' }}>
              <div style={{ background:'#0d1520', padding:'8px 16px', display:'flex', alignItems:'center', gap:8, borderBottom:'1px solid #1a2a3a' }}>
                {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
                  <div key={i} style={{ width:9, height:9, borderRadius:'50%', background:c }} />
                ))}
                <span style={{ marginLeft:8, fontSize:10, color:'#5a7a8a', letterSpacing:'.1em' }}>contact_info.sh</span>
              </div>

              <div style={{ padding:'18px 20px', fontSize:12 }}>
                {TERMINAL_ROWS.map((r, i) => (
                  <div key={i} style={{ display:'flex', gap:12, marginBottom:9, alignItems:'flex-start' }}>
                    <span style={{ color:'#5a7a8a', minWidth:78, flexShrink:0 }}>{r.key}:</span>
                    <span style={{ color:r.col, wordBreak:'break-all' }}>{r.val}</span>
                  </div>
                ))}
                <div style={{ marginTop:14, color:'#00d4ff' }}>
                  $ <span className="cursor-blink" style={{ color:'#e2eef8' }}>_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
