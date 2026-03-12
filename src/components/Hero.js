"use client";
import { useState, useEffect, useRef } from "react";
import { personalInfo } from "@/data/portfolio";
import SpotifyStatus from "./SpotifyStatus";

const ROLES = [
  "Offensive Security Researcher",
  "Cybersecurity Risk Management",
  "AI-Driven Security Engineer",
  "Penetration Testing Enthusiast",
  "Full Stack Developer",
];

const STATS = [
  { v: "2", l: "Published Papers" },
  { v: "66+", l: "GitHub Repos" },
  { v: "850K+", l: "Lines of Code" },
  { v: "4.0", l: "MS GPA" },
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    const cur = ROLES[roleIdx];
    let t;
    if (!deleting && displayed === cur) {
      t = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed === "") {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    } else {
      t = setTimeout(
        () => {
          setDisplayed((p) =>
            deleting ? p.slice(0, -1) : cur.slice(0, p.length + 1),
          );
        },
        deleting ? 38 : 68,
      );
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIdx]);

  const fadeStyle = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(22px)",
    transition: `opacity .75s ease ${delay}s, transform .75s ease ${delay}s`,
  });

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Ambient glows */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "-8%",
          width: "55%",
          height: "55%",
          background:
            "radial-gradient(ellipse,rgba(0,212,255,.045) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          right: "-4%",
          width: "38%",
          height: "38%",
          background:
            "radial-gradient(ellipse,rgba(0,255,157,.03) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="section-wrap"
        style={{ paddingTop: 150, paddingBottom: 80 }}
      >
        {/* Status badge */}
        <div
          style={{
            ...fadeStyle(0),
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-geist-mono,monospace)",
            fontSize: 11,
            color: "#8ab0c4",
            letterSpacing: ".15em",
            marginBottom: 28,
            padding: "6px 14px",
            border: "1px solid #1a2a3a",
            background: "rgba(13,21,32,.6)",
          }}
        >
          <div
            className="pulse-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00ff9d",
              boxShadow: "0 0 6px #00ff9d",
            }}
          />
          SYSTEM ONLINE &nbsp;·&nbsp; OPEN TO OPPORTUNITIES
        </div>

        {/* Hi */}
        <div
          style={{
            ...fadeStyle(0.05),
            fontFamily: "var(--font-geist-mono,monospace)",
            fontSize: "clamp(14px,2vw,18px)",
            color: "#00d4ff",
            marginBottom: 6,
            letterSpacing: ".1em",
          }}
        >
          Hi, I&apos;m
        </div>

        {/* Name w/ glitch */}
        <h1
          className="glitch"
          data-text="SUDEEP RAVICHANDRAN"
          style={{
            ...fadeStyle(0.1),
            fontFamily: '"Orbitron",monospace',
            fontSize: "clamp(34px,7vw,70px)",
            fontWeight: 900,
            color: "#f0f8ff",
            letterSpacing: ".05em",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          SUDEEP RAVICHANDRAN
        </h1>

        {/* Typewriter role */}
        <div
          style={{
            ...fadeStyle(0.15),
            fontFamily: "var(--font-geist-mono,monospace)",
            fontSize: "clamp(15px,2.4vw,22px)",
            color: "#00ff9d",
            marginBottom: 30,
            minHeight: "1.6em",
            letterSpacing: ".05em",
          }}
        >
          {displayed}
          <span className="cursor-blink" style={{ color: "#00d4ff" }}>
            _
          </span>
        </div>

        {/* Short bio — just a teaser on landing */}
        <p
          style={{
            ...fadeStyle(0.2),
            maxWidth: 560,
            fontFamily: "var(--font-geist-sans,sans-serif)",
            fontSize: "clamp(14px,1.5vw,15.5px)",
            color: "#9ab8cc",
            lineHeight: 1.85,
            marginBottom: 36,
          }}
        >
          MS Cybersecurity @ Indiana University Bloomington. Offensive security
          researcher, AI-driven threat detection builder, and full-stack
          developer. Turning vulnerabilities into understanding since 2021.
        </p>

        {/* Interest tags */}
        <div
          style={{
            ...fadeStyle(0.3),
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 36,
          }}
        >
          {personalInfo.interests.map((t, i) => (
            <span key={i} className="tech-tag">
              {t}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          style={{
            ...fadeStyle(0.38),
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            marginBottom: 60,
          }}
        >
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              fontFamily: "var(--font-geist-mono,monospace)",
              fontSize: 12,
              letterSpacing: ".15em",
              color: "#060a0f",
              background: "linear-gradient(135deg,#00d4ff,#00ff9d)",
              border: "none",
              padding: "12px 28px",
              cursor: "pointer",
              fontWeight: 700,
              boxShadow: "0 0 20px rgba(0,212,255,.3)",
              transition: "box-shadow .3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 32px rgba(0,212,255,.55)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,.3)")
            }
          >
            VIEW PROJECTS
          </button>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              fontFamily: "var(--font-geist-mono,monospace)",
              fontSize: 12,
              letterSpacing: ".15em",
              color: "#6a8a9a",
              background: "transparent",
              border: "1px solid #1a2a3a",
              padding: "12px 28px",
              cursor: "pointer",
              transition: "all .25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#e2eef8";
              e.currentTarget.style.borderColor = "#4a6a7a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6a8a9a";
              e.currentTarget.style.borderColor = "#1a2a3a";
            }}
          >
            GET IN TOUCH
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
          {STATS.map((s, i) => (
            <div key={i} style={fadeStyle(0.5 + i * 0.08)}>
              <div
                style={{
                  fontFamily: '"Orbitron",monospace',
                  fontSize: "clamp(22px,3vw,30px)",
                  fontWeight: 700,
                  color: "#00d4ff",
                  textShadow: "0 0 18px rgba(0,212,255,.5)",
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono,monospace)",
                  fontSize: 10,
                  color: "#5a7a8a",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Spotify — small, bottom-right corner, subtle */}
        <div
          style={{
            ...fadeStyle(0.8),
            position: "absolute",
            bottom: 60,
            right: 0,
            opacity: 0.65,
            transition: "opacity .2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = ".65")}
        >
          <SpotifyStatus />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-geist-mono,monospace)",
            fontSize: 9,
            color: "#00d4ff",
            letterSpacing: ".22em",
            textShadow: "0 0 8px rgba(0,212,255,.6)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        >
          SCROLL
        </div>
        <div
          style={{
            width: 1,
            height: 38,
            background: "linear-gradient(to bottom, #00d4ff, transparent)",
            boxShadow: "0 0 6px rgba(0,212,255,.8)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#00d4ff",
            boxShadow:
              "0 0 10px rgba(0,212,255,1), 0 0 20px rgba(0,212,255,.6)",
            animation: "scrollDot 2s ease-in-out infinite",
          }}
        />
        <style>{`
    @keyframes scrollPulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    @keyframes scrollDot {
      0%, 100% { transform: translateY(0); opacity: 0.4; }
      50% { transform: translateY(4px); opacity: 1; }
    }
  `}</style>
      </div>
    </section>
  );
}
