/* sections: hero, about, stack, projects, timeline, contact */

import React, { useEffect, useRef, useState } from "react";
import { Icon, TechIcon } from "./icons.jsx";
import { PROJECTS } from "./data/projects.js";

/* ─── Reveal on scroll wrapper ─── */
function Reveal({ children, delay = 0, as: As = "div", className = "", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("in"), delay);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "-50px 0px -100px 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <As ref={ref} className={`reveal ${className}`} {...rest}>{children}</As>;
}

/* ─── Nav ─── */
const NAV_LINKS = [
  ["about", "profile"], ["stack", "modules"], ["skills", "capabilities"],
  ["work", "deployments"], ["journey", "changelog"], ["contact", "contact"],
];

function Nav({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const els = NAV_LINKS.map(([id]) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-35% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="logo" data-cursor-hover>
          <span className="logo-mark">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 2h5.5C11 2 13 4 13 7s-2 5-4.5 5H3V2z" fill="white"/>
              <path d="M9.5 2L13 7l-3.5 5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span>marc-daniel.sys</span>
        </a>
        <button
          className="nav-menu"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "close" : "menu"}
        </button>
        <div className={`nav-links${menuOpen ? " is-open" : ""}`} id="primary-navigation">
          {NAV_LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </div>
        <div className="nav-status">
          <button
            className="theme-btn terminal-btn"
            data-cursor-hover
            onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "`", bubbles: true }))}
            aria-label="open terminal"
            title="open terminal (or press `)"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M2 4l4 3.5L2 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="theme-btn" data-cursor-hover onClick={toggleTheme} aria-label="toggle theme">
            {theme === "dark" ? <Icon.sun /> : <Icon.moon />}
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function FactTile({ label, children }) {
  return (
    <div className="status-tile">
      <span className="status-tile-label">{label}</span>
      <span className="status-tile-value">{children}</span>
    </div>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-content">
        <Reveal className="status-panel">
          <div className="status-panel-head">
            <span className="status-panel-title">marc-daniel.sys</span>
            <span className="status-panel-context">portfolio / systems work</span>
          </div>

          <div className="status-panel-body">
            <div className="status-panel-id">
              <h1>marc daniel dela cruz</h1>
              <p className="status-panel-role">full-stack developer · cavite, ph</p>
              <p className="status-panel-lead">
                I build booking, inventory, and route-pricing tools. My work runs from the data model through the interface and deploy.
              </p>
              <div className="status-panel-meta">
                <div className="meta-block">
                  <span className="k">available</span>
                  <span className="v">junior roles + freelance · q3 2026</span>
                </div>
                <div className="meta-block">
                  <span className="k">working since</span>
                  <span className="v">2023</span>
                </div>
              </div>
              <div className="hero-cta">
                <a className="btn primary" href="#work" data-cursor-hover>
                  see case files <Icon.arrow className="arrow" width={14} height={14} />
                </a>
                <a className="btn ghost" href="#contact" data-cursor-hover>
                  <Icon.mail width={14} height={14} /> get in touch
                </a>
                <a className="btn ghost" href="/resume.pdf" download="Marc_Daniel_Dela_Cruz_Resume.pdf" data-cursor-hover>
                  <Icon.download width={14} height={14} /> download cv
                </a>
              </div>
            </div>

            <div className="status-grid">
              <FactTile label="moto-tech">7 roles</FactTile>
              <FactTile label="d.c. transport">27 route bands</FactTile>
              <FactTile label="klori">mobile app</FactTile>
              <figure className="polaroid status-tile--photo" data-cursor-hover>
                <img src="/pfp.jpg" alt="Marc Daniel portrait" className="hero-photo" />
                <figcaption className="polaroid-cap">
                  <span>feed: cavite, ph</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  );
}

/* ─── About ─── */
function About() {
  return (
    <section id="about">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="section-num">01 — About</div>
            <h2 className="section-title">
              I build the boring parts so the <span className="accent-word">fun parts</span> can ship.
            </h2>
          </div>
          <div className="right">
            ships full products<br/>
            not just prototypes<br/>
            available Q3 2026
          </div>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-text" delay={100}>
            <p>
              I got serious about development when assignments became booking flows and dashboards that somebody had to use. School gave me the foundation. Client work and capstone deadlines taught me to trace the awkward paths before they turn into support messages.
            </p>
            <p>
              Cavite Moto-Tech Hub gave me the chance to model seven roles across bookings, inventory, service work, billing, and reporting. D.C. Transport pushed me into route rules, map pinning, OTP verification, and quotes. I handle the schema, API, interface, and deploy because those decisions shape each other.
            </p>
            <p>
              Outside code, I spend too long in games, reorganize playlists, and keep returning to <span className="highlight">Blender</span>. I am finishing BSIT at NCST and building from Cavite.
            </p>
          </Reveal>

          <Reveal className="about-card" delay={220} as="aside">
            <div className="card-head">
              <span className="dots"><i></i><i></i><i></i></span>
              about.json
            </div>
            <div className="row"><span className="k">name</span><span className="v">"Marc Daniel U. Dela Cruz"</span></div>
            <div className="row"><span className="k">role</span><span className="v">"full-stack dev"</span></div>
            <div className="row"><span className="k">edu</span><span className="v">"BSIT · 4th yr"</span></div>
            <div className="row"><span className="k">stack</span><span className="v">[vue, react, laravel, php, ts, postgres]</span></div>
            <div className="row"><span className="k">status</span>
              <span className="v"><span className="pill">● open</span>freelance + collabs</span>
            </div>
            <div className="row"><span className="k">vices</span><span className="v">"gaming, music, blender fails"</span></div>
            <div className="comment">// last updated · May 2026</div>
            <div className="comment" style={{ marginTop: "6px", opacity: ".7" }}>// press ` to go deeper</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Stack ─── */
function Stack() {
  const groups = [
    {
      id: "frontend",
      label: "Frontend",
      tag: "client side",
      hint: "what users actually see",
      items: [
        { name: "Vue 3",   cat: "ui",      icon: "vue"      },
        { name: "Vite",    cat: "build",   icon: "vite"     },
        { name: "Tailwind",cat: "styling", icon: "tailwind" },
        { name: "Figma",   cat: "design",  icon: "figma"    },
        { name: "React",      cat: "ui",       icon: "react"      },
        { name: "TypeScript", cat: "lang",     icon: "ts"         },
        { name: "JavaScript", cat: "lang",     icon: "javascript" },
        { name: "Bootstrap",  cat: "styling",  icon: "bootstrap"  },
        { name: "shadcn/ui",  cat: "components", icon: "shadcnui" },
        { name: "Vue Router", cat: "routing",  icon: "vuerouter"  },
      ],
    },
    {
      id: "backend",
      label: "Backend",
      tag: "server side",
      hint: "framework, lang & db",
      items: [
        { name: "Laravel", cat: "framework", icon: "laravel" },
        { name: "PHP",     cat: "lang",      icon: "php"     },
        { name: "MySQL",   cat: "database",  icon: "mysql"   },
        { name: "Pusher",  cat: "realtime",  icon: "pusher"  },
        { name: "PostgreSQL",        cat: "database", icon: "postgres" },
        { name: "Supabase",          cat: "backend",  icon: "supabase" },
        { name: "Firebase",          cat: "backend",  icon: "firebase" },
        { name: "MongoDB",           cat: "database", icon: "mongodb"  },
      ],
    },
    {
      id: "tools",
      label: "Tools & Services",
      tag: "everything else",
      hint: "3d · mobile · maps · vcs",
      items: [
        { name: "Three.js",  cat: "3d",     icon: "three"     },
        { name: "Capacitor", cat: "mobile", icon: "capacitor" },
        { name: "Leaflet",   cat: "maps",   icon: "leaflet"   },
        { name: "Git",       cat: "vcs",    icon: "git"       },
        { name: "GitHub",        cat: "repo",       icon: "github"   },
        { name: "Vercel",        cat: "deploy",     icon: "vercel"   },
        { name: "Blender",       cat: "3d",         icon: "blender"  },
      ],
    },
  ];
  const totalItems = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section id="stack">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="section-num">02 — Stack</div>
            <h2 className="section-title">
              Tools I reach for <span className="accent-word">without thinking</span>.
            </h2>
          </div>
          <div className="right">
            {totalItems} things I trust,<br/>
            split across 3 layers.
          </div>
        </Reveal>

        <div className="stack-groups">
          {groups.map((g, gi) => (
            <Reveal key={g.id} delay={gi * 80} className="stack-group">
              <header className="stack-group-head">
                <div className="stack-group-label">
                  <span className="stack-group-dot" />
                  <span className="stack-group-name">{g.label}</span>
                  <span className="stack-group-tag">{g.tag}</span>
                </div>
                <div className="stack-group-hint">{g.hint}</div>
                <div className="stack-group-count">
                  <span>{String(g.items.length).padStart(2, "0")}</span>
                  <span className="stack-group-count-label">tools</span>
                </div>
              </header>
              <div className="stack-grid">
                {g.items.map((it, i) => (
                  <div className="stack-chip" data-cursor-hover key={it.name}
                    style={{ transitionDelay: `${i * 20}ms` }}>
                    <div className="icon"><TechIcon name={it.icon} /></div>
                    <div className="name">{it.name}</div>
                    <div className="cat">{it.cat}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Technical Skills ─── */
function TechSkills() {
  const skills = [
    {
      name: "Role-Based Access Control",
      short: "RBAC",
      desc: "Multi-role user systems with granular permission gates. Built with Spatie Permissions on Laravel — 7 roles in production.",
      tags: ["Laravel", "Spatie", "middleware"],
      usedIn: { label: "Moto-Tech Hub", href: "https://cavitemototech.ogm1.com" },
    },
    {
      name: "REST API Design",
      short: "APIs",
      desc: "Resource-oriented endpoints, auth middleware, versioning, and consistent response structures consumed by web + mobile clients.",
      tags: ["Laravel", "JSON", "Sanctum"],
      usedIn: { label: "Moto-Tech Hub", href: "https://cavitemototech.ogm1.com" },
    },
    {
      name: "Automated Email",
      short: "mail",
      desc: "Queued notifications, templated SMTP mail (quotations, OTP, confirmations) with Laravel Queues + Mail facades.",
      tags: ["Laravel", "SMTP", "queues"],
      usedIn: { label: "DC Transport", href: "https://dctransport.ogm1.com" },
    },
    {
      name: "Real-time Events",
      short: "live",
      desc: "WebSocket broadcasting via Pusher for live dashboards, instant notifications, and collaborative UX.",
      tags: ["Pusher", "Laravel Echo", "WebSockets"],
      usedIn: { label: "Moto-Tech Hub", href: "https://cavitemototech.ogm1.com" },
    },
    {
      name: "OTP & Auth Flows",
      short: "auth",
      desc: "Guest OTP verification via SMS/email, session management, Sanctum token auth for SPA + mobile.",
      tags: ["Sanctum", "OTP", "sessions"],
      usedIn: { label: "DC Transport", href: "https://dctransport.ogm1.com" },
    },
    {
      name: "Database Design",
      short: "schema",
      desc: "Relational schema modeling, migrations, normalization, and query optimization across MySQL and PostgreSQL.",
      tags: ["MySQL", "PostgreSQL", "migrations"],
      usedIn: { label: "Moto-Tech Hub", href: "https://cavitemototech.ogm1.com" },
    },
    {
      name: "Frontend Architecture",
      short: "UI",
      desc: "Component-driven UIs with Vue 3 + React. State management with Pinia, routing, reusable design systems, and Tailwind-based layouts that work on every screen size.",
      tags: ["Vue 3", "React", "Pinia", "Tailwind"],
      usedIn: { label: "DC Transport", href: "https://dctransport.ogm1.com" },
    },
    {
      name: "Mobile App Deployment",
      short: "iOS/Android",
      desc: "Web apps packaged as native mobile apps via Capacitor — handles device APIs, build pipeline, and deployment to Android. The Moto-Tech companion app runs this way in production.",
      tags: ["Capacitor", "Android", "Vue 3"],
      usedIn: { label: "Moto-Tech Hub", href: "https://cavitemototech.ogm1.com" },
    },
    {
      name: "3D on the Web",
      short: "3D",
      desc: "Three.js-powered interactive experiences inside the browser. Built a live CVT part configurator for a motorcycle ERP — users pick and preview real components in 3D.",
      tags: ["Three.js", "WebGL", "Blender"],
      usedIn: { label: "Moto-Tech Hub", href: "https://cavitemototech.ogm1.com" },
    },
  ];

  return (
    <section id="skills">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="section-num">03 — Skills</div>
            <h2 className="section-title">
              What I know how to <span className="accent-word">actually do</span>.
            </h2>
          </div>
          <div className="right">
            cross-cutting capabilities,<br/>
            not just tool names.
          </div>
        </Reveal>

        <div className="skills-grid">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 60} className="skill-card" data-cursor-hover>
              <span className="skill-idx" aria-hidden="true">#{String(i + 1).padStart(2, "0")}</span>
              <div className="skill-card-head">
                <span className="skill-short">{s.short}</span>
                <span className="skill-name">{s.name}</span>
              </div>
              <p className="skill-desc">{s.desc}</p>
              <div className="skill-footer">
                <div className="skill-tags">
                  {s.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
                {s.usedIn && (
                  <a className="skill-used-in" href={s.usedIn.href} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                    used in → {s.usedIn.label}
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Project preview art (placeholder for live screenshots) ─── */
function ProjectArt({ kind, imgSrc }) {
  if (kind === "img") {
    return (
      <div className="placeholder-art" style={{
        background: "linear-gradient(135deg, #111120 0%, #1a1a30 100%)",
        padding: "20px",
      }}>
        <img src={imgSrc} alt="" style={{ maxWidth: "75%", maxHeight: "75%", objectFit: "contain" }} />
      </div>
    );
  }
  if (kind === "moto") {
    return (
      <div className="placeholder-art" style={{
        background: "linear-gradient(135deg, #ff8a65, #a78bfa)",
        color: "white",
      }}>
        <svg viewBox="0 0 200 100" width="80%" height="80%" fill="none" stroke="white" strokeWidth="2">
          <circle cx="50" cy="70" r="20" />
          <circle cx="150" cy="70" r="20" />
          <path d="M50 70 L90 40 L130 40 L150 70" />
          <path d="M85 40 L70 25 L100 25" />
          <circle cx="50" cy="70" r="6" fill="white" />
          <circle cx="150" cy="70" r="6" fill="white" />
        </svg>
      </div>
    );
  }
  if (kind === "van") {
    return (
      <div className="placeholder-art" style={{
        background: "linear-gradient(135deg, #5eead4, #818cf8)",
        color: "white",
      }}>
        <svg viewBox="0 0 200 100" width="80%" height="80%" fill="none" stroke="white" strokeWidth="2">
          <path d="M20 70 L20 40 L60 30 L160 30 L180 50 L180 70" />
          <circle cx="55" cy="75" r="10" />
          <circle cx="145" cy="75" r="10" />
          <line x1="65" y1="40" x2="65" y2="65" />
          <line x1="100" y1="40" x2="100" y2="65" />
          <line x1="135" y1="40" x2="135" y2="65" />
        </svg>
      </div>
    );
  }
  if (kind === "portfolio") {
    return (
      <div className="placeholder-art" style={{
        background: "linear-gradient(135deg, #fcd34d, #f472b6)",
        color: "white",
      }}>
        <svg viewBox="0 0 200 100" width="70%" height="70%" fill="white">
          <rect x="20" y="20" width="160" height="60" rx="8" fill="none" stroke="white" strokeWidth="2" />
          <rect x="32" y="34" width="40" height="8" rx="2" />
          <rect x="32" y="48" width="80" height="4" rx="2" opacity=".7" />
          <rect x="32" y="58" width="60" height="4" rx="2" opacity=".5" />
          <circle cx="155" cy="50" r="14" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      </div>
    );
  }
  return null;
}

/* ─── Project gallery icon ─── */
function GalleryIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  );
}

/* ─── Projects ─── */
function CaseFile({ project, onClose }) {
  const openGallery = () => {
    if (project.gallery) {
      window.dispatchEvent(new CustomEvent("open-gallery", { detail: { slug: project.gallery } }));
    }
  };

  return (
    <article className="case-file" id={`case-${project.slug}`} aria-labelledby={`${project.slug}-case-title`}>
      <header className="case-file-head">
        <div>
          <span className="case-file-label">case file</span>
          <h3 id={`${project.slug}-case-title`}>{project.title}</h3>
        </div>
        <button type="button" className="case-file-close" onClick={onClose}>close</button>
      </header>
      <div className="case-file-grid">
        <div className="case-file-notes">
          <div>
            <h4>Problem</h4>
            <p>{project.caseFile.problem}</p>
          </div>
          <div>
            <h4>Decisions</h4>
            <ul>{project.caseFile.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
          </div>
          <div>
            <h4>Result</h4>
            <p>{project.caseFile.result}</p>
          </div>
          <p className="case-file-stack">{project.stack}</p>
          <div className="case-file-actions">
            {project.gallery && <button type="button" onClick={openGallery}>view all screens</button>}
            {project.href && <a href={project.href} target="_blank" rel="noopener noreferrer">visit live site</a>}
          </div>
        </div>
        {project.caseFile.screens && (
          <div className={`case-file-screens${project.slug === "klori" ? " case-file-screens-mobile" : ""}`}>
            {project.caseFile.screens.map((screen) => (
              <button key={screen.src} type="button" onClick={openGallery} aria-label={`Open ${screen.alt} in gallery`}>
                <img src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function Projects() {
  const [activeSlug, setActiveSlug] = useState(null);
  const activeProject = PROJECTS.find((project) => project.slug === activeSlug);

  const selectCaseFile = (slug, shouldScroll = false) => {
    setActiveSlug(slug);
    window.history.replaceState(null, "", `#case-${slug}`);
    if (shouldScroll) window.setTimeout(() => document.getElementById(`case-${slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const closeCaseFile = () => {
    setActiveSlug(null);
    window.history.replaceState(null, "", "#work");
  };

  useEffect(() => {
    const slug = window.location.hash.replace("#case-", "");
    if (PROJECTS.some((project) => project.slug === slug)) selectCaseFile(slug, true);
    const openFromTerminal = (event) => selectCaseFile(event.detail.slug, true);
    window.addEventListener("open-case-file", openFromTerminal);
    return () => window.removeEventListener("open-case-file", openFromTerminal);
  }, []);

  return (
    <section id="work">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="section-num">04 — Work</div>
            <h2 className="section-title">Projects with the <span className="accent-word">hard parts</span> included.</h2>
          </div>
          <div className="right">Select a project<br/>to open its case file.</div>
        </Reveal>

        <Reveal>
          <div className="project-list">
            {PROJECTS.map((project) => {
              const isActive = project.slug === activeSlug;
              return (
                <React.Fragment key={project.slug}>
                  <button
                    className={`project-row${isActive ? " is-active" : ""}`}
                    type="button"
                    data-cursor-hover
                    aria-expanded={isActive}
                    aria-controls={`case-${project.slug}`}
                    onClick={() => isActive ? closeCaseFile() : selectCaseFile(project.slug)}
                    onMouseMove={(event) => {
                      const row = event.currentTarget;
                      const rect = row.getBoundingClientRect();
                      const preview = row.querySelector(".preview");
                      if (preview) {
                        preview.style.left = `${event.clientX - rect.left}px`;
                        preview.style.top = `${event.clientY - rect.top}px`;
                      }
                    }}
                  >
                    <span className="title">{project.title}</span>
                    <span className="meta">
                      <span className="desc">{project.desc}</span>
                      <span className="stack-used">{project.stack}</span>
                    </span>
                    <span className="year">{project.year}</span>
                    <span className="go" aria-hidden="true"><Icon.arrow width={14} height={14} /></span>
                    <div className="preview"><ProjectArt kind={project.art} imgSrc={project.imgSrc} /></div>
                  </button>
                  {isActive && <CaseFile project={project} onClose={closeCaseFile} />}
                </React.Fragment>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Timeline ─── */
function Journey() {
  const items = [
    {
      when: "2026 · NOW",
      version: "v3.0.0",
      what: "Final year + open for work",
      where: "BSIT · finishing strong",
      detail: "Wrapping up my capstone while shipping client and personal projects on the side. Open to junior / intern roles from Q3 2026.",
      tags: ["thesis", "freelance", "open to work"],
    },
    {
      when: "2025",
      version: "v2.0.0",
      what: "Started freelancing + personal builds",
      where: "self-taught → real projects",
      detail: "Stopped just learning and started shipping. First paying client, first deployed app, first time someone outside my family actually used something I built.",
      tags: ["freelance", "laravel", "vue.js", "full-stack"],
    },
    {
      when: "2023",
      version: "v1.0.0",
      what: "Started BSIT",
      where: "National College of Science and Technology",
      detail: "Picked up the basics, then went off-syllabus fast. School gave me the foundation — everything else came from building things that had to actually work.",
      tags: ["beginnings"],
    },
  ];

  return (
    <section id="journey">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="section-num">05 — Journey</div>
            <h2 className="section-title">
              From <span className="accent-word">fixing spreadsheets</span> to shipping platforms.
            </h2>
          </div>
          <div className="right">
            chronological.<br/>
            mostly truthful.
          </div>
        </Reveal>

        <Reveal>
          <div className="timeline">
            {items.map((t, i) => (
              <div className="tl-item" key={i} data-cursor-hover>
                <div className="when"><span className="tl-version">{t.version}</span> · {t.when}</div>
                <h3 className="what">{t.what}</h3>
                <div className="where">{t.where}</div>
                <p className="detail" dangerouslySetInnerHTML={{ __html: t.detail }} />
                <div className="tags">{t.tags.map((tag, j) => <span key={j}>{tag}</span>)}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "marcdanieldelacruz599@gmail.com";
  const phone = "09602020493";
  const copy = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="contact" id="contact">
      <div className="wrap contact-inner">
        <Reveal>
          <div className="eyebrow">new request</div>
          <h2>
            got something <span className="accent-word">weird</span><br/>to build?
          </h2>
          <p style={{ color: "var(--ink-soft)", fontSize: 18, maxWidth: 540, margin: "0 auto", textWrap: "pretty" }}>
            I&rsquo;m taking on a few freelance projects after thesis. Custom platforms, internal tools, and very specific 3D side-quests welcome.
          </p>
          <button className="email-btn" onClick={copy} data-cursor-hover data-magnet>
            <Icon.mail width={16} height={16} className="email-btn-icon" />
            <span className="email-btn-text">{copied ? "copied to clipboard ✓" : email}</span>
            {!copied && <Icon.copy width={14} height={14} className="email-btn-icon" />}
          </button>
          <div className="endpoints">
            <a href="https://www.facebook.com/daniel.502270/" target="_blank" rel="noopener noreferrer me" data-cursor-hover>→ facebook</a>
            <a href={`tel:+63${phone.slice(1)}`} data-cursor-hover>→ {phone}</a>
            <a href="https://github.com/jckdanielss" target="_blank" rel="noopener noreferrer me" data-cursor-hover>→ github</a>
            <a href="https://www.linkedin.com/in/marc-daniel-dela-cruz-8a16b43b9/" target="_blank" rel="noopener noreferrer me" data-cursor-hover>→ linkedin</a>
          </div>
        </Reveal>

        <footer className="foot">
          <span>marc-daniel.sys · v2.0</span>
          <span>© 2026 Marc Daniel Dela Cruz</span>
          <span>uptime: since 2023</span>
        </footer>
      </div>
    </section>
  );
}

export { Reveal, Nav, Hero, About, Stack, TechSkills, Projects, Journey, Contact };
