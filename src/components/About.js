"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { personalInfo } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";
import { SectionHeader } from "./Skills";

function GlitchTagline() {
  const text = "Eat. Hack. Sleep. Repeat.";
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 320);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          fontFamily: '"Orbitron", monospace',
          fontSize: "clamp(20px, 3.5vw, 32px)",
          fontWeight: 900,
          color: "#00ff9d",
          letterSpacing: ".06em",
          textShadow: glitching
            ? "2px 0 #ff3860, -2px 0 #00d4ff, 0 0 20px rgba(0,255,157,.5)"
            : "0 0 20px rgba(0,255,157,.35)",
          transition: "text-shadow .1s",
          display: "inline-block",
          transform: glitching ? "translateX(2px)" : "none",
        }}
      >
        {text}
      </span>
      {glitching && (
        <>
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 2,
              fontFamily: '"Orbitron", monospace',
              fontSize: "clamp(20px, 3.5vw, 32px)",
              fontWeight: 900,
              color: "#ff3860",
              opacity: 0.5,
              letterSpacing: ".06em",
              clipPath: "polygon(0 30%, 100% 30%, 100% 55%, 0 55%)",
            }}
          >
            {text}
          </span>
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: -2,
              fontFamily: '"Orbitron", monospace',
              fontSize: "clamp(20px, 3.5vw, 32px)",
              fontWeight: 900,
              color: "#00d4ff",
              opacity: 0.5,
              letterSpacing: ".06em",
              clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
            }}
          >
            {text}
          </span>
        </>
      )}
    </div>
  );
}

const STATUS_ITEMS = [
  {
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#00d4ff"
        strokeWidth="2"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    color: "#00d4ff",
    label: "STUDYING",
    text: "MS Cybersecurity Risk Management",
    sub: "Indiana University Bloomington",
  },
  {
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#00ff9d"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    color: "#00ff9d",
    label: "RESEARCHING",
    text: "AI-driven threat detection",
    sub: "Offensive security & adversarial ML",
  },
  {
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffaa55"
        strokeWidth="2"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    color: "#ffaa55",
    label: "OPEN TO",
    text: "Internships & Full-time roles",
    sub: "Cybersecurity · Red Team · AppSec",
  },
];

export default function About() {
  const { ref, inView } = useInView();

  const fadeIn = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity .65s ease ${delay}s, transform .65s ease ${delay}s`,
  });

  return (
    <section id="about" ref={ref}>
      <div className="section-wrap">
        <SectionHeader num="01. ABOUT" title="About Me" inView={inView} />

        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: personalInfo.photo ? "1fr 260px" : "1fr",
            gap: 52,
            alignItems: "start",
          }}
        >
          {/* ─── Left col ─── */}
          <div>
            {/* Tagline card */}
            <div
              style={{
                ...fadeIn(0),
                marginBottom: 32,
                padding: "24px 28px",
                background: "rgba(0,255,157,.04)",
                border: "1px solid rgba(0,255,157,.18)",
                borderLeft: "3px solid #00ff9d",
                borderRadius: 4,
              }}
            >
              <GlitchTagline />
              <div
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: 11,
                  color: "#5a7a8a",
                  letterSpacing: ".15em",
                  marginTop: 8,
                }}
              >
                // the hacker&apos;s infinite loop
              </div>
            </div>

            {/* Bio */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                marginBottom: 28,
              }}
            >
              {personalInfo.bio.map((para, i) => (
                <p
                  key={i}
                  style={{
                    ...fadeIn(0.15 + i * 0.1),
                    fontFamily: "var(--font-geist-sans, sans-serif)",
                    fontSize: "clamp(14px, 1.5vw, 15.5px)",
                    color: "#9ab8cc",
                    lineHeight: 1.85,
                    margin: 0,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Fun fact chips */}
            <div
              style={{
                ...fadeIn(0.4),
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 28,
              }}
            >
              {[
                "🎮 Gaming",
                "✈️ Traveling",
                "🧩 Problem Solving",
                "🎵 Music",
                "🏆 Hackathons",
              ].map((f, i) => (
                <span
                  key={i}
                  style={{
                    padding: "5px 12px",
                    border: "1px solid #1a2a3a",
                    borderRadius: 20,
                    background: "rgba(13,21,32,.6)",
                    fontFamily: "var(--font-geist-sans, sans-serif)",
                    fontSize: 12,
                    color: "#8ab0c4",
                  }}
                >
                  {f}
                </span>
              ))}
            </div>

            {/* ─── Redesigned Currently section ─── */}
            <div style={{ ...fadeIn(0.5) }}>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: 10,
                  color: "#5a7a8a",
                  letterSpacing: ".2em",
                  marginBottom: 14,
                }}
              >
                CURRENTLY
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {STATUS_ITEMS.map((item, i) => (
                  <StatusRow
                    key={i}
                    item={item}
                    delay={0.55 + i * 0.08}
                    inView={inView}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ─── Right col: photo ─── */}
          {personalInfo.photo ? (
            <div style={{ ...fadeIn(0.25) }}>
              <div style={{ position: "relative", maxWidth: 260 }}>
                <div
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    width: 36,
                    height: 36,
                    borderTop: "2px solid #00d4ff",
                    borderRight: "2px solid #00d4ff",
                    zIndex: 2,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: -8,
                    left: -8,
                    width: 36,
                    height: 36,
                    borderBottom: "2px solid #00ff9d",
                    borderLeft: "2px solid #00ff9d",
                    zIndex: 2,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "3/4",
                  }}
                >
                  <Image
                    src={personalInfo.photo}
                    alt="Sudeep Ravichandran"
                    fill
                    sizes="260px"
                    style={{
                      objectFit: "cover",
                      borderRadius: 4,
                      border: "1px solid #1a2a3a",
                      filter: "grayscale(15%)",
                      transition: "filter .3s, transform .3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = "grayscale(0%)";
                      e.currentTarget.style.transform = "scale(1.01)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "grayscale(15%)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,212,255,.07) 0%, transparent 50%)",
                    borderRadius: 4,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          ) : (
            <div style={{ ...fadeIn(0.25), display: "none" }} />
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function StatusRow({ item, delay, inView }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 16px",
        background: hov
          ? `rgba(${item.color === "#00d4ff" ? "0,212,255" : item.color === "#00ff9d" ? "0,255,157" : "255,170,85"},.06)`
          : "rgba(13,21,32,.4)",
        borderTop: `1px solid ${hov ? item.color + "40" : "#1a2a3a"}`,
        borderRight: `1px solid ${hov ? item.color + "40" : "#1a2a3a"}`,
        borderBottom: `1px solid ${hov ? item.color + "40" : "#1a2a3a"}`,
        borderLeft: `2px solid ${item.color}`,
        borderRadius: 3,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-12px)",
        transition: `opacity .5s ease ${delay}s, transform .5s ease ${delay}s, background .2s, border-color .2s`,
        cursor: "default",
      }}
    >
      {/* Icon bubble */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          flexShrink: 0,
          background: `${item.color}12`,
          border: `1px solid ${item.color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 2,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: 9,
              letterSpacing: ".15em",
              color: item.color,
              opacity: 0.8,
            }}
          >
            {item.label}
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-geist-sans, sans-serif)",
            fontSize: 13,
            fontWeight: 500,
            color: "#d0e8f8",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.text}
        </div>
        <div
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: 10,
            color: "#4a6a7a",
            marginTop: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.sub}
        </div>
      </div>

      {/* Live dot for first item */}
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          flexShrink: 0,
          background: item.color,
          boxShadow: `0 0 6px ${item.color}`,
          animation: "livePulse 2s ease-in-out infinite",
          animationDelay: `${["0s", "0.66s", "1.33s"][STATUS_ITEMS.findIndex((s) => s.label === item.label)]}`,
        }}
      />

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .4; transform: scale(.7); }
        }
      `}</style>
    </div>
  );
}
