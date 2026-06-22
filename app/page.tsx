"use client";

import { useState, useEffect } from "react";

const STACK_WORDS = [
  "Next.js",
  "TypeScript",
  "Express",
  "MongoDB",
  "OpenAI",
  "Socket.io",
  "Stripe",
  "Tailwind",
  "Vercel",
  "REST APIs",
];

function useTypewriter(words: string[], speed = 80, pause = 1400) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(current.slice(0, charIdx + 1));
          if (charIdx + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIdx((c) => c + 1);
          }
        } else {
          setDisplay(current.slice(0, charIdx - 1));
          if (charIdx - 1 === 0) {
            setDeleting(false);
            setWordIdx((w) => (w + 1) % words.length);
            setCharIdx(0);
          } else {
            setCharIdx((c) => c - 1);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

const PROJECTS = [
  {
    featured: true,
    label: "Featured Project",
    name: "Nexora AI",
    tagline: "Autonomous AI workspace management",
    badge: "Autonomous AI agent runs 24/7 without user input",
    description:
      "A full-stack AI SaaS platform with an autonomous agent that creates tasks, detects gaps, and runs background workspace analysis — without any user prompting. Built with SSE streaming, role-based access, Stripe billing, real-time WebSockets, and a custom AI orchestration engine.",
    tech: [
      "Next.js 14",
      "Express",
      "TypeScript",
      "MongoDB",
      "OpenAI",
      "Socket.io",
      "Stripe",
      "Vercel",
      "Render",
    ],
    github: "https://github.com/fizo20/nexora-ai",
    live: "https://nexora-ai-rho-ashy.vercel.app",
  },
  {
    featured: false,
    label: "Full-Stack App",
    name: "The Wild Oasis — Website",
    tagline: "Luxury cabin booking & reservation platform",
    badge: null,
    description:
      "A customer-facing Next.js 14 booking platform for a luxury cabin resort in the Italian Dolomites. Features Google OAuth via NextAuth, cabin browsing with real-time availability filtering, full reservation management (create, update, delete), and a personal account dashboard — all powered by Supabase.",
    tech: [
      "Next.js 14",
      "React",
      "Supabase",
      "NextAuth",
      "Tailwind CSS",
      "date-fns",
      "Vercel",
    ],
    github: "https://github.com/fizo20/the-wild-oasis-website",
    live: "https://the-wild-oasis-website-phi-ivory.vercel.app",
  },
  {
    featured: false,
    label: "Full-Stack App",
    name: "The Wild Oasis — Dashboard",
    tagline: "Internal hotel management system",
    badge: null,
    description:
      "A feature-rich internal dashboard for hotel staff to manage bookings, cabins, check-ins/check-outs, and guests. Includes real-time stats with Recharts, dark mode, advanced filtering, and server-state management via React Query — all backed by Supabase with row-level security.",
    tech: [
      "React",
      "Vite",
      "Supabase",
      "React Query",
      "React Hook Form",
      "Recharts",
      "Styled Components",
    ],
    github: "https://github.com/fizo20/the-wild-oasis",
    live: "https://the-wild-oasis-chi-sage.vercel.app/login",
  },
  {
    featured: false,
    label: "Frontend Project",
    name: "Friker — FricaLearn",
    tagline: "African language e-learning platform for children",
    badge: null,
    description:
      "A responsive educational platform that helps children of African heritage learn Yoruba, Igbo, and Hausa through interactive, culturally rich lessons. Features course pages, demo classes, enrollment flows, and an FAQ section — built with pure HTML, Tailwind CSS, and AOS animations.",
    tech: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "AOS", "Vercel"],
    github: "https://github.com/fizo20/friker",
    live: "https://friker.vercel.app",
  },
];

export default function Portfolio() {
  const word = useTypewriter(STACK_WORDS);

  return (
    <div
      style={{
        backgroundColor: "#0a0a0f",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* NAV */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/5"
        style={{
          background: "rgba(10,10,15,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <span className="font-black text-[16px]">
          K<span className="text-[#7c6dfa]">.</span>
        </span>
        <div className="hidden md:flex gap-8">
          {["about", "projects", "skills", "contact"].map((l) => (
            <a
              key={l}
              href={`#${l}`}
              className="text-[12px] font-medium capitalize text-white/35 hover:text-white/80 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
        <a
          href="mailto:fizotm20@gmail.com"
          className="text-[12px] font-semibold px-4 py-2 rounded-lg text-[#7c6dfa] hover:bg-[#7c6dfa]/10 transition-colors"
          style={{ border: "1px solid rgba(124,109,250,0.35)" }}
        >
          Hire me
        </a>
      </nav>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-6 overflow-hidden">
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, #7c6dfa 0%, #4f46e5 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="relative space-y-5 max-w-3xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold text-[#34d399]"
            style={{
              border: "1px solid rgba(52,211,153,0.2)",
              background: "rgba(52,211,153,0.08)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#34d399] animate-pulse" />
            Available for new opportunities
          </div>

          <h1
            className="font-black leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(44px,8vw,72px)", letterSpacing: "-2px" }}
          >
            Kareem
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg,#7c6dfa 0%,#a78bfa 50%,#c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tosin
            </span>
          </h1>

          <p className="text-[16px] text-white/45 leading-relaxed max-w-md mx-auto">
            Fullstack developer building{" "}
            <span className="text-white/75 font-medium">
              production-grade AI products
            </span>{" "}
            — from database to deployment.
          </p>

          <div
            className="inline-flex items-center gap-3 rounded-xl px-5 py-3 font-mono text-[13px]"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <span className="text-[#7c6dfa]">›</span>
            <span className="text-white/35">building with</span>
            <span className="text-white font-bold min-w-[90px] text-left">
              {word}
              <span className="text-[#7c6dfa] animate-pulse">|</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-bold text-white hover:opacity-88 hover:scale-[1.02] transition-all"
              style={{ background: "linear-gradient(135deg,#7c6dfa,#a78bfa)" }}
            >
              View my work ↓
            </a>
            <a
              href="https://github.com/fizo20"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-semibold text-white/60 hover:text-white transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#7c6dfa] mb-3">
          About me
        </p>
        <h2 className="text-[clamp(26px,4vw,36px)] font-black text-white tracking-tight leading-tight">
          I build things that
          <br />
          actually ship.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10 items-start">
          <div className="space-y-4">
            <p className="text-[14px] leading-[1.8] text-white/45">
              I&apos;m a fullstack developer focused on building complete,
              production-ready products — not just prototypes. I work across the
              entire stack, from database schema and API design to polished
              frontends and deployment.
            </p>
            <p className="text-[14px] leading-[1.8] text-white/45">
              My latest project, Nexora AI, is a full SaaS platform with
              autonomous AI agents, Stripe billing, real-time WebSockets, and
              role-based multi-tenant workspaces — built and deployed entirely
              by me.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                ["1+", "Years building"],
                ["5+", "Technologies"],
                ["4", "Live projects"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-[24px] font-black text-white">{n}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/28 mt-1">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="rounded-2xl p-6 space-y-1"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              background:
                "linear-gradient(135deg,rgba(124,109,250,0.07) 0%,rgba(255,255,255,0.02) 100%)",
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7c6dfa] mb-4">
              What I focus on
            </p>
            {[
              [
                "⚡",
                "Full-stack products",
                "End-to-end ownership — from API design to final deployment.",
              ],
              [
                "🤖",
                "AI integration",
                "Streaming, agents, tool-calling with OpenAI API.",
              ],
              [
                "🔐",
                "Auth & security",
                "JWT, refresh tokens, RBAC, workspace isolation.",
              ],
              [
                "💳",
                "Payments & billing",
                "Stripe subscriptions, webhooks, upgrade flows.",
              ],
            ].map(([icon, title, body]) => (
              <div
                key={title as string}
                className="flex gap-3 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <span className="text-[18px] shrink-0 mt-0.5">{icon}</span>
                <div>
                  <p className="text-[13px] font-semibold text-white">
                    {title}
                  </p>
                  <p className="text-[11px] text-white/35 leading-relaxed mt-0.5">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 max-w-5xl mx-auto">
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#7c6dfa] mb-3">
          What I&apos;ve built
        </p>
        <h2 className="text-[clamp(26px,4vw,36px)] font-black text-white tracking-tight">
          Projects
        </h2>
        <p className="text-[14px] text-white/38 mt-2 mb-8 max-w-lg">
          Production-deployed applications built end-to-end.
        </p>

        <div className="flex flex-col gap-4">
          {PROJECTS.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl overflow-hidden transition-all hover:border-[#7c6dfa]/30"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                background: p.featured
                  ? "linear-gradient(135deg,rgba(124,109,250,0.06),rgba(255,255,255,0.02))"
                  : "rgba(255,255,255,0.02)",
              }}
            >
              {p.featured && (
                <div
                  className="h-px"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,rgba(124,109,250,0.5),transparent)",
                  }}
                />
              )}
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#7c6dfa] mb-1">
                      {p.label}
                    </p>
                    <h3 className="text-[20px] font-black text-white tracking-tight">
                      {p.name}
                    </h3>
                    <p className="text-[12px] text-white/38 mt-0.5">
                      {p.tagline}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-white/40 hover:text-white transition-colors"
                      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      ↗ Code
                    </a>
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg text-[12px] font-bold text-white hover:opacity-85 transition-opacity"
                      style={{
                        background: "linear-gradient(135deg,#7c6dfa,#a78bfa)",
                      }}
                    >
                      Live ↗
                    </a>
                  </div>
                </div>
                {p.badge && (
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium text-[#34d399] mb-4"
                    style={{
                      border: "1px solid rgba(52,211,153,0.18)",
                      background: "rgba(52,211,153,0.07)",
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#34d399] animate-pulse shrink-0" />
                    {p.badge}
                  </div>
                )}
                <p className="text-[13px] leading-[1.8] text-white/45 mb-5">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium text-white/45"
                      style={{
                        border: "1px solid rgba(255,255,255,0.07)",
                        background: "rgba(255,255,255,0.04)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-4 rounded-2xl p-8 text-center"
          style={{ border: "1px dashed rgba(255,255,255,0.1)" }}
        >
          <p className="text-[13px] text-white/28 font-medium">
            More projects coming soon
          </p>
          <a
            href="https://github.com/fizo20"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-[12px] font-semibold text-[#7c6dfa] hover:underline"
          >
            github.com/fizo20 ↗
          </a>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 px-6 max-w-5xl mx-auto">
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#7c6dfa] mb-3">
          Tech stack
        </p>
        <h2 className="text-[clamp(26px,4vw,36px)] font-black text-white tracking-tight mb-10">
          Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              label: "Frontend",
              items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML/CSS"],
            },
            {
              label: "Backend",
              items: ["Node.js", "Express", "REST APIs", "WebSockets", "SSE"],
            },
            { label: "Database", items: ["MongoDB", "Mongoose", "Supabase", "Atlas"] },
            {
              label: "AI & Infra",
              items: ["OpenAI API", "AI Agents", "Vercel", "Render", "Git"],
            },
            {
              label: "Payments & Auth",
              items: ["Stripe", "Webhooks", "NextAuth", "JWT", "RBAC"],
            },
            {
              label: "Tools & Libraries",
              items: ["React Query", "React Hook Form", "Recharts", "Styled Components", "Vite"],
            },
          ].map(({ label, items }) => (
            <div
              key={label}
              className="rounded-xl p-5 transition-colors hover:border-[#7c6dfa]/28"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7c6dfa] mb-3">
                {label}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md text-[11px] font-medium text-white/55"
                    style={{
                      border: "1px solid rgba(255,255,255,0.07)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 text-center">
        <div className="max-w-lg mx-auto">
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#7c6dfa] mb-3">
            Get in touch
          </p>
          <h2 className="text-[clamp(26px,4vw,36px)] font-black text-white tracking-tight">
            Let&apos;s work together
          </h2>
          <p className="text-[14px] text-white/38 leading-[1.8] mt-4 mb-8">
            I&apos;m open to freelance projects, full-time roles, and
            collaboration. If you have an idea or opportunity, reach out.
          </p>
          <a
            href="mailto:fizotm20@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-[15px] font-bold text-white hover:opacity-90 hover:scale-[1.02] transition-all"
            style={{ background: "linear-gradient(135deg,#7c6dfa,#a78bfa)" }}
          >
            Say hello →
          </a>
          <div className="flex justify-center gap-6 mt-8">
            {[
              ["GitHub", "https://github.com/fizo20"],
              ["LinkedIn", "https://linkedin.com"],
              ["Twitter", "https://x.com/fizotm20"],
            ].map(([l, h]) => (
              <a
                key={l}
                href={h}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-medium text-white/28 hover:text-white/65 transition-colors"
              >
                {l} ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer
        className="py-8 px-6 text-center text-[11px] text-white/20"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        © {new Date().getFullYear()} Kareem Tosin · Built with Next.js &amp;
        Tailwind CSS · Deployed on Vercel
      </footer>
    </div>
  );
}
