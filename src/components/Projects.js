"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { projects } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";
import { SectionHeader } from "./Skills";

const FILTERS = ["ALL", "SECURITY", "WEB", "ML"];
const CAT_ICON = { security: "🔐", ml: "🤖", web: "🌐" };

export default function Projects() {
  const { ref, inView } = useInView();
  const [filter, setFilter] = useState("ALL");

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const filtered =
    filter === "ALL"
      ? projects
      : projects.filter((p) => p.category.toUpperCase() === filter);

  return (
    <section id="projects" ref={ref}>
      <div className="section-wrap">
        <SectionHeader
          num="05. PROJECTS"
          title="Things I've Built"
          inView={inView}
        />

        {/* Filter bar */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 36,
            flexWrap: "wrap",
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: 11,
                letterSpacing: ".1em",
                padding: "5px 14px",
                background:
                  filter === f ? "rgba(0,212,255,.12)" : "transparent",
                border: `1px solid ${filter === f ? "#00d4ff" : "#1a2a3a"}`,
                color: filter === f ? "#00d4ff" : "#6a8a9a",
                cursor: "pointer",
                transition: "all .2s",
                borderRadius: 2,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {filter === "ALL" ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                marginBottom: 36,
              }}
            >
              {featured.map((p, i) => (
                <FeaturedCard
                  key={p.name}
                  project={p}
                  index={i}
                  inView={inView}
                />
              ))}
            </div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: 10,
                color: "#5a7a8a",
                letterSpacing: ".2em",
                marginBottom: 18,
              }}
            >
              OTHER NOTEWORTHY PROJECTS
            </div>
            <OtherProjects projects={others} inView={inView} />
          </>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 14,
              alignItems: "start",
            }}
          >
            {filtered.map((p, i) => (
              <SmallCard
                key={p.name}
                project={p}
                index={i}
                inView={inView}
                alwaysExpanded
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(12px); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .proj-img-col { display: none !important; } }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   OtherProjects — smooth 3-step show/collapse
───────────────────────────────────────────── */
function OtherProjects({ projects: others, inView }) {
  const [expanded, setExpanded] = useState(false);
  const [collapsing, setCollapsing] = useState(false);
  const headerRef = useRef(null);
  const LIMIT = 6;

  const visible = others.slice(0, expanded ? others.length : LIMIT);
  const remaining = others.length - LIMIT;

  const handleCollapse = () => {
    setCollapsing(true);
    setTimeout(() => {
      headerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        setExpanded(false);
        setCollapsing(false);
      }, 500);
    }, 300);
  };

  return (
    <div ref={headerRef}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
          gap: 14,
          alignItems: "start",
        }}
      >
        {visible.map((p, i) => {
          const isExtra = i >= LIMIT;
          return (
            <div
              key={p.name}
              style={{
                opacity: 0,
                animation:
                  collapsing && isExtra
                    ? "fadeSlideOut 0.3s ease forwards"
                    : `fadeSlideIn 0.35s ease ${Math.min(i, 10) * 0.05}s forwards`,
              }}
            >
              <SmallCard project={p} index={i} inView={inView} />
            </div>
          );
        })}
      </div>

      {others.length > LIMIT && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 28 }}
        >
          <button
            onClick={() => (expanded ? handleCollapse() : setExpanded(true))}
            disabled={collapsing}
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: 11,
              padding: "11px 36px",
              background: "transparent",
              border: "1px solid #1a2a3a",
              color: "#5a7a8a",
              cursor: collapsing ? "default" : "pointer",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              gap: 10,
              transition: "all .2s",
              letterSpacing: ".1em",
              opacity: collapsing ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!collapsing) {
                e.currentTarget.style.borderColor = "#00d4ff";
                e.currentTarget.style.color = "#00d4ff";
                e.currentTarget.style.background = "rgba(0,212,255,.05)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#1a2a3a";
              e.currentTarget.style.color = "#5a7a8a";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {expanded ? (
              <>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
                {collapsing ? "CLOSING…" : "SHOW LESS"}
              </>
            ) : (
              <>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                {remaining} MORE PROJECTS
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Screenshot helpers
───────────────────────────────────────────── */
function getScreenshotUrl(website) {
  return `https://api.microlink.io/?url=${encodeURIComponent(website)}&screenshot=true&meta=false&embed=screenshot.url`;
}

function MiniPreview({ website, name }) {
  const [state, setState] = useState("loading");
  const src = getScreenshotUrl(website);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 130,
        marginBottom: 12,
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid #1a2a3a",
        background: "#060a0f",
        flexShrink: 0,
      }}
    >
      {state === "loading" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 6,
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              border: "2px solid #1a2a3a",
              borderTop: "2px solid #00d4ff",
              borderRadius: "50%",
              animation: "spin .8s linear infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: 8,
              color: "#4a6a7a",
            }}
          >
            Loading…
          </span>
        </div>
      )}
      {state !== "error" && (
        <Image
          src={src}
          alt={`${name} preview`}
          fill
          sizes="300px"
          style={{
            objectFit: "cover",
            objectPosition: "top",
            opacity: state === "loaded" ? 0.92 : 0,
            transition: "opacity .4s ease",
          }}
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
          unoptimized
        />
      )}
      {state === "error" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: 9,
              color: "#2a4050",
            }}
          >
            preview unavailable
          </span>
        </div>
      )}
    </div>
  );
}

function WebsitePreview({ project: p }) {
  const [state, setState] = useState("loading");
  const src = getScreenshotUrl(p.website);
  let hostname = "";
  try {
    hostname = new URL(p.website).hostname;
  } catch {}

  return (
    <div
      className="proj-img-col"
      style={{
        borderLeft: "1px solid #1a2a3a",
        background: "#060a0f",
        display: "flex",
        flexDirection: "column",
        minHeight: 220,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#0d1520",
          padding: "7px 12px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          borderBottom: "1px solid #1a2a3a",
          flexShrink: 0,
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
          <div
            key={i}
            style={{ width: 8, height: 8, borderRadius: "50%", background: c }}
          />
        ))}
        <div
          style={{
            flex: 1,
            background: "#060a0f",
            borderRadius: 3,
            height: 16,
            marginLeft: 6,
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
            border: "1px solid #1a2a3a",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: 9,
              color: "#4a6a7a",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {hostname}
          </span>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          minHeight: 180,
        }}
      >
        {state === "loading" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 8,
              zIndex: 2,
              background: "#060a0f",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                border: "2px solid #1a2a3a",
                borderTop: "2px solid #00d4ff",
                borderRadius: "50%",
                animation: "spin .8s linear infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: 9,
                color: "#4a6a7a",
              }}
            >
              Loading preview…
            </span>
          </div>
        )}
        {state !== "error" && (
          <Image
            src={src}
            alt={`${p.name} preview`}
            fill
            sizes="320px"
            style={{
              objectFit: "cover",
              objectPosition: "top",
              opacity: state === "loaded" ? 0.92 : 0,
              transition: "opacity .4s ease",
            }}
            onLoad={() => setState("loaded")}
            onError={() => setState("error")}
            unoptimized
          />
        )}
        {state === "error" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: 24,
              background: "linear-gradient(135deg,#060a0f 0%,#0d1520 100%)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(0,212,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.04) 1px,transparent 1px)",
                backgroundSize: "24px 24px",
                pointerEvents: "none",
              }}
            />
            <div
              style={{ position: "relative", zIndex: 1, textAlign: "center" }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1px solid rgba(0,212,255,.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 10px",
                  background: "rgba(0,212,255,.05)",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00d4ff"
                  strokeWidth="1.5"
                  opacity=".6"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: 10,
                  color: "#4a6a7a",
                  marginBottom: 4,
                }}
              >
                {hostname}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: 9,
                  color: "#2a4050",
                }}
              >
                preview unavailable
              </div>
            </div>
          </div>
        )}
      </div>
      <a
        href={p.website}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "9px",
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: 10,
          color: "#00ff9d",
          textDecoration: "none",
          letterSpacing: ".1em",
          background: "rgba(0,255,157,.05)",
          borderTop: "1px solid rgba(0,255,157,.15)",
          transition: "background .2s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(0,255,157,.1)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(0,255,157,.05)")
        }
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        VISIT SITE
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FeaturedCard
───────────────────────────────────────────── */
function FeaturedCard({ project: p, index, inView }) {
  const [hov, setHov] = useState(false);
  const isSec = p.category === "security";
  const hasWebPreview = p.website || p.image;

  return (
    <div
      className="cyber-panel"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        borderColor: hov ? "rgba(0,212,255,.42)" : "#1a2a3a",
        boxShadow: hov ? "0 0 28px rgba(0,212,255,.08)" : "none",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(22px)",
        transition: `opacity .6s ease ${index * 0.15}s, transform .6s ease ${index * 0.15}s, border-color .25s, box-shadow .25s`,
        display: hasWebPreview ? "grid" : "block",
        gridTemplateColumns: hasWebPreview ? "1fr 320px" : undefined,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "38%",
          height: "100%",
          background: `radial-gradient(ellipse at right,${isSec ? "rgba(0,255,157,.03)" : "rgba(0,212,255,.03)"} 0%,transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, padding: 28 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 10,
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: 10,
                padding: "3px 10px",
                background: isSec ? "rgba(0,255,157,.1)" : "rgba(0,212,255,.1)",
                color: isSec ? "#00ff9d" : "#00d4ff",
                border: `1px solid ${isSec ? "rgba(0,255,157,.3)" : "rgba(0,212,255,.3)"}`,
                borderRadius: 2,
                letterSpacing: ".1em",
              }}
            >
              {p.category.toUpperCase()}
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: 10,
                color: "#5a7a8a",
              }}
            >
              {p.period}
            </span>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {p.paper && (
              <a
                href={p.paper}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: 10,
                  color: "#ff9a3c",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = ".7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                PAPER ↗
              </a>
            )}
            {p.website && (
              <a
                href={p.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: 10,
                  color: "#00ff9d",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = ".7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                LIVE ↗
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: 10,
                  color: "#5a7a8a",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#5a7a8a")}
              >
                GITHUB ↗
              </a>
            )}
          </div>
        </div>
        <h3
          style={{
            fontFamily: '"Orbitron", monospace',
            fontSize: "clamp(14px, 2vw, 18px)",
            fontWeight: 700,
            color: "#f0f8ff",
            marginBottom: 5,
          }}
        >
          {p.name}
        </h3>
        <div
          style={{
            fontFamily: "var(--font-geist-sans, sans-serif)",
            fontSize: 13,
            color: "#5a7a8a",
            fontStyle: "italic",
            marginBottom: 12,
          }}
        >
          {p.subtitle}
        </div>
        {p.highlight && (
          <div
            style={{
              display: "inline-block",
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: 10,
              color: "#00ff9d",
              padding: "3px 12px",
              border: "1px solid rgba(0,255,157,.3)",
              background: "rgba(0,255,157,.06)",
              marginBottom: 14,
              letterSpacing: ".08em",
            }}
          >
            ★ {p.highlight}
          </div>
        )}
        <p
          style={{
            fontFamily: "var(--font-geist-sans, sans-serif)",
            fontSize: 14,
            color: "#9ab8cc",
            lineHeight: 1.78,
            marginBottom: 18,
          }}
        >
          {p.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {p.tags.map((t, i) => (
            <span key={i} className="tech-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
      {hasWebPreview && <WebsitePreview project={p} />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SmallCard

   Layout contract:
   • grid rows keep alignment via alignItems:"start"
     on the parent grid — each card is its own
     independent height.
   • Description is always CSS-clamped to 3 lines.
   • "read more" simply removes the clamp on THIS
     card only — no absolute overlays, no z-index
     tricks, no visibility hacks. The card grows
     naturally; other cards are unaffected because
     the grid uses alignItems:"start" (not stretch).
   • Smooth expand/collapse via max-height CSS
     transition on the description wrapper.
───────────────────────────────────────────── */
function SmallCard({ project: p, index, inView, alwaysExpanded }) {
  const [hov, setHov] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const showToggle = !alwaysExpanded && p.description.length > 130;

  // line-height 1.68 × 13px ≈ 21.84px per line × 3 = ~65.5px
  // We use a generous max-height for collapsed (66px) and large for expanded
  const LINE_HEIGHT = 1.68;
  const FONT_SIZE = 13;
  const LINES = 3;
  const collapsedHeight = `${Math.ceil(FONT_SIZE * LINE_HEIGHT * LINES)}px`;

  return (
    <div
      className="cyber-panel"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 4,
        borderColor: hov ? "rgba(0,212,255,.35)" : "#1a2a3a",
        boxShadow: hov ? "0 0 18px rgba(0,212,255,.06)" : "none",
        display: "flex",
        flexDirection: "column",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(22px)",
        transition: `opacity .5s ease ${index * 0.07}s, transform .5s ease ${index * 0.07}s, border-color .25s, box-shadow .25s`,
        padding: 22,
        // No overflow:hidden — let the card grow freely
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 18 }}>{CAT_ICON[p.category] || "💡"}</span>
        <div style={{ display: "flex", gap: 10 }}>
          {p.paper && (
            <a
              href={p.paper}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: 10,
                color: "#ff9a3c",
                textDecoration: "none",
              }}
            >
              PAPER ↗
            </a>
          )}
          {p.website && (
            <a
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: 10,
                color: "#00ff9d",
                textDecoration: "none",
              }}
            >
              LIVE ↗
            </a>
          )}
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: 10,
                color: "#5a7a8a",
                textDecoration: "none",
                transition: "color .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#5a7a8a")}
            >
              GITHUB ↗
            </a>
          )}
        </div>
      </div>

      {/* Mini screenshot */}
      {p.website && <MiniPreview website={p.website} name={p.name} />}

      {/* Title */}
      <h3
        style={{
          fontFamily: '"Orbitron", monospace',
          fontSize: 13,
          fontWeight: 600,
          color: "#f0f8ff",
          marginBottom: 5,
        }}
      >
        {p.name}
      </h3>

      {/* Highlight */}
      {p.highlight && (
        <div
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: 10,
            color: "#00ff9d",
            marginBottom: 9,
          }}
        >
          {p.highlight}
        </div>
      )}

      {/* Description with smooth max-height expand */}
      <div
        style={{
          maxHeight: alwaysExpanded || readMore ? "600px" : collapsedHeight,
          overflow: "hidden",
          transition: "max-height 0.35s ease",
          marginBottom: 4,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-sans, sans-serif)",
            fontSize: 13,
            color: "#7a9aaa",
            lineHeight: LINE_HEIGHT,
            margin: 0,
          }}
        >
          {p.description}
        </p>
      </div>

      {/* Trailing ellipsis hint when clamped — fades out when expanded */}
      {showToggle && !readMore && (
        <div
          style={{
            fontFamily: "var(--font-geist-sans, sans-serif)",
            fontSize: 13,
            color: "#3a5060",
            marginBottom: 2,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {/* gradient fade bottom edge */}
        </div>
      )}

      {/* Read more / show less */}
      {showToggle && (
        <button
          onClick={() => setReadMore((s) => !s)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 0 10px",
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: 10,
            color: "#00d4ff",
            textAlign: "left",
            letterSpacing: ".05em",
            display: "flex",
            alignItems: "center",
            gap: 4,
            transition: "opacity .2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = ".7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {readMore ? (
            <>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
              show less
            </>
          ) : (
            <>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              read more
            </>
          )}
        </button>
      )}

      {/* Tags */}
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: "auto" }}
      >
        {p.tags.slice(0, 6).map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: 10,
              padding: "2px 7px",
              border: "1px solid #1a2a3a",
              color: "#4a6a7a",
              borderRadius: 2,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
