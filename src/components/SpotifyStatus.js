'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

/*
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SETUP (takes ~2 minutes):

  1. Join https://discord.gg/lanyard  ← just join, nothing else needed
  2. Connect Spotify to Discord:
       Discord → User Settings → Connections → Spotify
  3. Get your Discord User ID:
       Discord → Settings → Advanced → enable Developer Mode
       → right-click your username anywhere → Copy User ID
  4. Paste it below where it says YOUR_DISCORD_ID_HERE
  5. Uncomment the fetch block in useEffect

  That's it! While Spotify is playing on your device,
  it'll show the current track live on your portfolio.
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

const DISCORD_USER_ID = '749582193248043119'

export default function SpotifyStatus() {
  const [status, setStatus] = useState({
    playing: false,
    track: null,
    artist: null,
    album: null,
    albumArt: null,
  })

  useEffect(() => {
    // ── Uncomment the block below after filling in DISCORD_USER_ID ──

    async function fetchLanyard() {
      try {
        const res  = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`)
        const json = await res.json()
        const sp   = json?.data?.spotify
        if (sp) {
          setStatus({
            playing:  true,
            track:    sp.song,
            artist:   sp.artist,
            album:    sp.album,
            albumArt: sp.album_art_url,
          })
        } else {
          setStatus({ playing: false, track: null, artist: null, album: null, albumArt: null })
        }
      } catch {
        setStatus({ playing: false, track: null, artist: null, album: null, albumArt: null })
      }
    }
    
    fetchLanyard()
    const interval = setInterval(fetchLanyard, 10_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      display:    'inline-flex',
      alignItems: 'center',
      gap:        10,
      padding:    '8px 14px',
      background: 'rgba(13,21,32,.85)',
      border:     '1px solid #1a2a3a',
      borderRadius: 6,
      backdropFilter: 'blur(10px)',
      maxWidth: 290,
    }}>
      {/* Spotify wordmark icon */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill={status.playing ? '#1DB954' : '#3a5a6a'} style={{ flexShrink: 0, transition: 'fill .3s' }}>
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>

      {/* Album art */}
      {status.playing && status.albumArt && (
        <div style={{ position: 'relative', width: 32, height: 32, flexShrink: 0, borderRadius: 3, overflow: 'hidden' }}>
          <Image
            src={status.albumArt}
            alt={status.album || 'Album art'}
            fill
            sizes="32px"
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </div>
      )}

      {/* Track info */}
      <div style={{ overflow: 'hidden', flex: 1 }}>
        {status.playing ? (
          <>
            <div style={{
              fontFamily: 'var(--font-geist-sans, sans-serif)',
              fontSize: 12, fontWeight: 600,
              color: '#e2eef8',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              maxWidth: 170,
            }}>
              {status.track}
            </div>
            <div style={{
              fontFamily: 'var(--font-geist-mono, monospace)',
              fontSize: 10, color: '#5a7a8a',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              maxWidth: 170,
            }}>
              {status.artist}
            </div>
          </>
        ) : (
          <div style={{
            fontFamily: 'var(--font-geist-sans, sans-serif)',
            fontSize: 12, color: '#3a5a6a',
          }}>
            Not Playing
          </div>
        )}
      </div>

      {/* Animated bars when playing */}
      {status.playing && (
        <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 14, flexShrink: 0 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              width: 3, borderRadius: 1,
              background: '#1DB954',
              animation: `spBar${i} ${0.6 + i * 0.15}s ease-in-out infinite alternate`,
            }} />
          ))}
        </div>
      )}

      <style>{`
        @keyframes spBar1 { from { height: 4px  } to { height: 14px } }
        @keyframes spBar2 { from { height: 8px  } to { height: 10px } }
        @keyframes spBar3 { from { height: 3px  } to { height: 14px } }
      `}</style>
    </div>
  )
}