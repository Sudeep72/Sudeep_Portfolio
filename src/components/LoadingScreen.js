'use client'
import { useState, useEffect, useRef } from 'react'

const BOOT_LINES = [
  { text: '> Initializing CIPHER_NODE v2.5.1…',       delay: 0    },
  { text: '> Loading security modules…',               delay: 420  },
  { text: '> Establishing encrypted connection…',      delay: 900  },
  { text: '> Running vulnerability scan…',             delay: 1380 },
  { text: '> All systems nominal.',                    delay: 1860 },
  { text: '> Identity verified: SUDEEP RAVICHANDRAN', delay: 2340 },
  { text: '> ACCESS GRANTED',                         delay: 2820, accent: true },
]

export default function LoadingScreen({ onComplete }) {
  const [lines,    setLines]    = useState([])
  const [progress, setProgress] = useState(0)
  const [fadeOut,  setFadeOut]  = useState(false)
  const [tabState, setTabState] = useState('active') // 'active'|'away'|'reconnecting'

  const timersRef    = useRef([])
  const completedRef = useRef(false)
  const doneCountRef = useRef(0)

  useEffect(() => {
    function clearTimers() { timersRef.current.forEach(clearTimeout); timersRef.current = [] }

    function doExit() {
      if (completedRef.current) return
      completedRef.current = true
      setFadeOut(true)
      setTimeout(onComplete, 550)
    }

    function resumeFrom(startIndex) {
      clearTimers()
      const remaining = BOOT_LINES.slice(startIndex)
      if (!remaining.length) { doExit(); return }

      remaining.forEach((line, i) => {
        const t = setTimeout(() => {
          setLines(prev => prev.find(l => l.text === line.text) ? prev : [...prev, line])
          doneCountRef.current = startIndex + i + 1
          setProgress(Math.round(((startIndex + i + 1) / BOOT_LINES.length) * 100))
        }, i * 480)
        timersRef.current.push(t)
      })
      timersRef.current.push(setTimeout(doExit, remaining.length * 480 + 600))
    }

    // Initial boot
    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setLines(prev => prev.find(l => l.text === line.text) ? prev : [...prev, line])
        doneCountRef.current = i + 1
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100))
      }, line.delay)
      timersRef.current.push(t)
    })
    timersRef.current.push(setTimeout(doExit, 2820 + 600))

    function onVisibility() {
      if (completedRef.current) return

      if (document.hidden) {
        clearTimers()
        setTabState('away')
        setLines(prev => [
          ...prev,
          { text: '> CONNECTION INTERRUPTED — SESSION PAUSED', warn: true },
          { text: '> ACCESS VERIFICATION FAILED — DENIED',     warn: true },
        ])
      } else {
        setTabState('reconnecting')
        const r1 = setTimeout(() => setLines(p => [...p, { text: '> Reconnecting to secure node…', dim: true }]), 600)
        const r2 = setTimeout(() => setLines(p => [...p, { text: '> Re-establishing encrypted channel…', dim: true }]), 1200)
        const r3 = setTimeout(() => {
          setTabState('active')
          resumeFrom(doneCountRef.current)
        }, 2200)
        timersRef.current.push(r1, r2, r3)
      }
    }

    document.addEventListener('visibilitychange', onVisibility)
    return () => { clearTimers(); document.removeEventListener('visibilitychange', onVisibility) }
  }, [onComplete])

  const lineColor = (ln) => {
    if (ln.accent) return '#00ff9d'
    if (ln.warn)   return '#ff3860'
    if (ln.dim)    return '#5a7a8a'
    return '#e2eef8'
  }

  return (
    <div style={{
      position:'fixed', inset:0,
      background:'#020508',
      zIndex:9999,
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      opacity: fadeOut ? 0 : 1,
      transition:'opacity 0.55s ease',
    }}>
      {/* Grid bg */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(0,212,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.04) 1px,transparent 1px)',
        backgroundSize:'40px 40px' }} />

      {/* Corners */}
      {[
        { top:18, left:18,  borderTop:'2px solid #00d4ff', borderLeft: '2px solid #00d4ff' },
        { top:18, right:18, borderTop:'2px solid #00d4ff', borderRight:'2px solid #00d4ff' },
        { bottom:18, left:18,  borderBottom:'2px solid #00d4ff', borderLeft: '2px solid #00d4ff' },
        { bottom:18, right:18, borderBottom:'2px solid #00d4ff', borderRight:'2px solid #00d4ff' },
      ].map((s,i) => <div key={i} style={{ position:'absolute', width:36, height:36, opacity:.55, ...s }} />)}

      <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:600, padding:'0 24px' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:44 }}>
          <div style={{ fontFamily:'"Orbitron",monospace', fontSize:'clamp(22px,5vw,36px)', fontWeight:900, letterSpacing:'.15em', marginBottom:8 }}>
            <span style={{ color:'#5a7a8a' }}>root@sudeep</span>
            <span style={{ color:'#00d4ff' }}>:~# </span>
            <span style={{ color:'#00ff9d', textShadow:'0 0 18px #00ff9d' }}>init</span>
          </div>
          <div style={{ fontFamily:'var(--font-geist-mono,monospace)', fontSize:10, letterSpacing:'.3em',
            color: tabState==='away' ? '#ff3860' : tabState==='reconnecting' ? '#ff9a3c' : '#5a7a8a' }}>
            {tabState==='away' ? '⚠  SESSION PAUSED — SWITCH BACK TO RESUME'
              : tabState==='reconnecting' ? '↺  RECONNECTING…'
              : 'SECURE CHANNEL INITIALIZING'}
          </div>
        </div>

        {/* Terminal */}
        <div style={{
          background:'rgba(10,16,24,.96)',
          border:`1px solid ${tabState==='away' ? '#ff3860' : tabState==='reconnecting' ? '#ff9a3c' : '#1a2a3a'}`,
          borderRadius:4, overflow:'hidden', transition:'border-color .4s',
        }}>
          <div style={{ background:'#0d1520', padding:'8px 16px', display:'flex', alignItems:'center', gap:8, borderBottom:'1px solid #1a2a3a' }}>
            {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
              <div key={i} style={{ width:9, height:9, borderRadius:'50%', background:c, opacity:tabState==='away'?.4:1 }} />
            ))}
            <span style={{ marginLeft:8, fontFamily:'var(--font-geist-mono,monospace)', fontSize:10, color:'#5a7a8a', letterSpacing:'.1em' }}>
              {tabState==='away' ? '⚠ SESSION PAUSED' : tabState==='reconnecting' ? '↺ RECONNECTING…' : 'cipher_node — bash — 80×24'}
            </span>
          </div>
          <div style={{ padding:'18px 20px', minHeight:186, fontFamily:'var(--font-geist-mono,monospace)', fontSize:13 }}>
            {lines.map((ln,i) => (
              <div key={i} style={{
                marginBottom:6,
                color: lineColor(ln),
                fontWeight: ln.accent ? 700 : 400,
                textShadow: ln.accent ? '0 0 10px #00ff9d' : ln.warn ? '0 0 8px rgba(255,56,96,.5)' : 'none',
                animation:'ldFadeIn .3s ease forwards',
              }}>
                {ln.text}
              </div>
            ))}
            {lines.length < BOOT_LINES.length && tabState==='active' && (
              <span style={{ color:'#00d4ff' }} className="cursor-blink">█</span>
            )}
          </div>
        </div>

        {/* Progress */}
        <div style={{ marginTop:22 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
            <span style={{ fontFamily:'var(--font-geist-mono,monospace)', fontSize:10, letterSpacing:'.15em',
              color: tabState==='away' ? '#ff3860' : tabState==='reconnecting' ? '#ff9a3c' : '#5a7a8a' }}>
              {tabState==='away' ? 'PAUSED' : tabState==='reconnecting' ? 'RECONNECTING' : 'LOADING PORTFOLIO'}
            </span>
            <span style={{ fontFamily:'var(--font-geist-mono,monospace)', fontSize:10, color:'#00d4ff' }}>{progress}%</span>
          </div>
          <div style={{ height:2, background:'#1a2a3a', borderRadius:1 }}>
            <div style={{
              height:'100%', width:`${progress}%`, borderRadius:1,
              background: tabState==='away' ? 'linear-gradient(90deg,#ff3860,#ff9a3c)' : 'linear-gradient(90deg,#00d4ff,#00ff9d)',
              boxShadow: tabState==='away' ? '0 0 8px #ff3860' : '0 0 8px #00d4ff',
              transition:'width .4s ease, background .4s ease',
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ldFadeIn { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
      `}</style>
    </div>
  )
}
