// No 'use client' needed — uses Date at render time (SSR is fine)
const NAV_IDS = ['about','skills','experience','projects','research','contact']

export default function Footer() {
  const now = new Date()
  const lastUpdated = now.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })
  const year = now.getFullYear()

  return (
    <footer style={{
      position:'relative', zIndex:10,
      borderTop:'1px solid #0d1520',
      padding:'32px 40px',
      background:'rgba(6,10,15,.92)',
    }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>

        {/* Logo */}
        <div style={{ fontFamily:'"Orbitron",monospace', fontSize:13, fontWeight:700, letterSpacing:'.2em', textAlign:'center' }}>
          <span style={{ color:'#5a7a8a' }}>root@sudeep</span>
          <span style={{ color:'#00d4ff' }}>:~# </span>
          <span style={{ color:'#00ff9d' }}>./portfolio.sh</span>
          <span className="cursor-blink" style={{ color:'#00d4ff', marginLeft:2 }}>▌</span>
        </div>

        {/* Nav links — client interaction via inline onclick */}
        <div style={{ display:'flex', gap:22, flexWrap:'wrap', justifyContent:'center' }}>
          {NAV_IDS.map(id => (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' })}
              style={{
                background:'none', border:'none', cursor:'pointer',
                fontFamily:'var(--font-geist-mono,monospace)', fontSize:10,
                letterSpacing:'.15em', color:'#5a7a8a', textTransform:'uppercase',
                transition:'color .2s',
              }}
              onMouseEnter={e => e.target.style.color='#00d4ff'}
              onMouseLeave={e => e.target.style.color='#5a7a8a'}
            >
              {id}
            </button>
          ))}
        </div>

        <div style={{ fontFamily:'var(--font-geist-mono,monospace)', fontSize:11, color:'#3f4a55', textAlign:'center' }}>
          Designed &amp; Built by <span style={{ color:'#4c6a80' }}>Sudeep Ravichandran</span>
        </div>

        <div style={{ fontFamily:'var(--font-geist-mono,monospace)', fontSize:10, color:'#52575c', letterSpacing:'.1em' }}>
          Last updated: {lastUpdated}
        </div>

        <div style={{ fontFamily:'var(--font-geist-mono,monospace)', fontSize:10, color:'#4e5258', letterSpacing:'.1em' }}>
          © {year} — All rights reserved
        </div>
      </div>
    </footer>
  )
}
