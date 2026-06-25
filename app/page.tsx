"use client";

import { useState, useEffect, useRef } from "react";

/* ─── Typewriter ─────────────────────────────────────────── */
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
  "Supabase",
];

function useTypewriter(words: string[], speed = 75, pause = 1500) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[wi];
    const t = setTimeout(
      () => {
        if (!del) {
          setDisplay(cur.slice(0, ci + 1));
          if (ci + 1 === cur.length) setTimeout(() => setDel(true), pause);
          else setCi((c) => c + 1);
        } else {
          setDisplay(cur.slice(0, ci - 1));
          if (ci - 1 === 0) {
            setDel(false);
            setWi((w) => (w + 1) % words.length);
            setCi(0);
          } else setCi((c) => c - 1);
        }
      },
      del ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);
  return display;
}

/* ─── Scroll reveal ──────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Counter ────────────────────────────────────────────── */
function useCounter(target: number, duration = 1400) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let start = 0;
        const step = target / (duration / 16);
        const tick = () => {
          start = Math.min(start + step, target);
          setVal(Math.floor(start));
          if (start < target) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return { val, ref };
}

/* ─── Data ───────────────────────────────────────────────── */
const PROJECTS = [
  {
    featured: true,
    label: "Featured · SaaS",
    name: "Nexora AI",
    tagline: "Autonomous AI workspace management",
    badge: "Autonomous agent runs 24/7 — no user input required",
    challenge:
      "Most AI tools are just chat wrappers — they do nothing until the user types. I wanted to build something that worked like a real co-worker: one that monitors your workspace, surfaces what's missing, creates tasks, and keeps projects moving even when you're away.",
    solution:
      "Built a custom AI orchestration layer with SSE streaming so the agent can push live updates to the frontend without polling. Implemented RBAC multi-tenant workspaces so teams are fully isolated. Stripe webhooks handle tier enforcement and billing events automatically.",
    description:
      "Full-stack AI SaaS — autonomous agent, SSE streaming, role-based workspaces, Stripe billing, real-time WebSockets, custom orchestration engine.",
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
    label: "Full-Stack · Next.js",
    name: "The Wild Oasis — Booking Site",
    tagline: "Customer cabin booking & reservation platform",
    badge: null,
    challenge:
      "Build a production booking flow where guests can browse cabins, check real-time availability, reserve dates, and manage their bookings — all authenticated with Google OAuth and persisted reliably.",
    solution:
      "Leveraged Next.js 14 App Router for RSC-first data fetching so pages arrive pre-rendered with fresh Supabase data. NextAuth handles OAuth seamlessly. The reservation UI uses optimistic updates so actions feel instant even over slow connections.",
    description:
      "Next.js 14 App Router, Google OAuth, Supabase, cabin browsing, availability filtering, full CRUD reservations, personal account dashboard.",
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
    label: "Full-Stack · Dashboard",
    name: "The Wild Oasis — Staff Dashboard",
    tagline: "Internal hotel management system",
    badge: null,
    challenge:
      "Hotel staff needed one place to manage every booking, cabin, and guest — with real-time occupancy stats, quick check-in/check-out, and dark mode for night-shift use.",
    solution:
      "React Query keeps all server state fresh without manual refetches. Recharts powers the analytics dashboard. Supabase RLS ensures staff only see data they're authorised to access. The entire UI supports dark/light mode via a custom context.",
    description:
      "React + Vite, Supabase with RLS, React Query, Recharts analytics, React Hook Form, dark mode, bookings + cabins + guest management.",
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
    label: "Frontend · EdTech",
    name: "Friker — FricaLearn",
    tagline: "African language learning platform for children",
    badge: null,
    challenge:
      "Children of African heritage growing up abroad are losing connection to their native languages. The platform needed to feel fun, culturally authentic, and easy to navigate for both kids and parents.",
    solution:
      "Designed a warm, visually engaging layout using Tailwind CSS and AOS scroll animations to make the experience feel alive. Each language (Yoruba, Igbo, Hausa) has its own dedicated course flow with demo classes and enrollment paths.",
    description:
      "Responsive EdTech site — Yoruba, Igbo, Hausa courses, demo classes, enrollment flow, FAQ, AOS animations, fully deployed on Vercel.",
    tech: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "AOS", "Vercel"],
    github: "https://github.com/fizo20/friker",
    live: "https://friker.vercel.app",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Understand the problem first",
    body: "Before writing a single line of code I map the problem: what does the user actually need, what data flows where, and where could this break at scale? Most bugs are requirements misread at the start.",
  },
  {
    step: "02",
    title: "Design the data layer",
    body: "I plan schemas and API contracts before touching the UI. A clean data model is the skeleton everything else hangs on — changing it later costs ten times more than getting it right upfront.",
  },
  {
    step: "03",
    title: "Build in vertical slices",
    body: "Rather than finishing the backend then starting the frontend, I ship one working feature end-to-end at a time. This means something shippable always exists, and problems surface early.",
  },
  {
    step: "04",
    title: "Harden before shipping",
    body: "Auth edge cases, Stripe webhook retries, race conditions, loading and error states — I treat these as features, not afterthoughts. Production-readiness is baked in from the start.",
  },
];

const SKILLS_GROUPS = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "REST APIs", "WebSockets", "SSE"],
  },
  {
    label: "Database",
    items: ["MongoDB", "Mongoose", "Supabase", "PostgreSQL", "Atlas"],
  },
  {
    label: "AI & Agents",
    items: ["OpenAI API", "AI Orchestration", "Streaming", "Tool-calling"],
  },
  {
    label: "Payments & Auth",
    items: ["Stripe", "Webhooks", "NextAuth", "JWT", "RBAC"],
  },
  {
    label: "Tooling",
    items: ["React Query", "React Hook Form", "Recharts", "Vite", "Git"],
  },
];

const TICKER_ITEMS = [
  "Next.js",
  "TypeScript",
  "Express",
  "MongoDB",
  "OpenAI API",
  "Socket.io",
  "Stripe",
  "Supabase",
  "Tailwind CSS",
  "Vercel",
  "Render",
  "React Query",
  "Vite",
  "JWT",
  "RBAC",
  "SSE Streaming",
  "REST APIs",
  "Recharts",
];

const ARTICLES = [
  {
    tag: "Architecture",
    title: "Why I design the database before I open my code editor",
    body: "Every complex bug I've fixed traces back to a schema decision made in a hurry. When I started Nexora AI I spent two days on the data model alone — mapping workspace ownership, member roles, agent state, and billing tiers before writing a single API route. That two-day investment saved weeks of refactoring. The lesson: data is the source of truth. Code is just the machinery that moves it around.",
  },
  {
    tag: "AI Engineering",
    title: "Building an AI agent that actually works autonomously",
    body: "Most 'AI features' are just a chat box that calls GPT. A real agent needs to decide when to act, what tools to call, and how to handle failures gracefully. For Nexora AI I built a task-detection loop that runs on a schedule, analyses workspace state, and pushes updates to the frontend via SSE without any user prompting. The hardest part wasn't the AI calls — it was making sure the agent never runs twice at the same time and handles partial failures without corrupting state.",
  },
  {
    tag: "Full-Stack",
    title: "The hidden cost of skipping error states",
    body: "Junior developers build the happy path. Senior developers build everything else. Loading spinners, empty states, network errors, expired auth tokens, Stripe webhook failures, race conditions in optimistic updates — these are the features that determine whether a product feels professional or amateur. I treat every one of them as a first-class deliverable, because users remember the one time something broke, not the hundred times it worked.",
  },
  {
    tag: "Problem Solving",
    title: "How I debug problems I've never seen before",
    body: "My process: reproduce it consistently first — a bug you can't reliably trigger is a bug you can't fix. Then bisect: remove everything until only the broken behaviour remains. Then read the actual error, the actual network response, the actual database query — not what I assume they say. 90% of hard bugs are caused by a wrong assumption about what the system is doing. The remaining 10% are timing issues, and those are actually fun to solve.",
  },
];

/* ─── Component ──────────────────────────────────────────── */
export default function Portfolio() {
  const word = useTypewriter(STACK_WORDS);
  useReveal();
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [openArticle, setOpenArticle] = useState<number | null>(null);

  const c4 = useCounter(4);
  const c10 = useCounter(10);
  const c15 = useCounter(15);
  const c100 = useCounter(100);

  const V = "#7c6dfa";
  const bg = "#07070d";

  return (
    <div
      style={{
        backgroundColor: bg,
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{
          background: "rgba(7,7,13,0.88)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span className="font-black text-[17px] tracking-tight">
          K<span style={{ color: V }}>.</span>
        </span>
        <div className="hidden md:flex gap-8">
          {["about", "process", "projects", "writing", "skills", "contact"].map(
            (l) => (
              <a
                key={l}
                href={`#${l}`}
                className="text-[12px] font-medium capitalize transition-colors"
                style={{ color: "rgba(255,255,255,0.32)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.32)")
                }
              >
                {l}
              </a>
            ),
          )}
        </div>
        <a
          href="mailto:abdulafeezkareem701@gmail.com"
          className="text-[12px] font-bold px-4 py-2 rounded-lg transition-all"
          style={{ color: V, border: `1px solid rgba(124,109,250,0.35)` }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "rgba(124,109,250,0.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          Hire me
        </a>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[92vh] text-center px-6 overflow-hidden">
        {/* Glow orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(124,109,250,0.13) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "60%",
              left: "25%",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(192,132,252,0.07) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
        </div>

        <div className="relative space-y-6 max-w-3xl">
          {/* Status pill */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold"
            style={{
              color: "#34d399",
              border: "1px solid rgba(52,211,153,0.22)",
              background: "rgba(52,211,153,0.08)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#34d399] animate-pulse" />
            Available for new opportunities
          </div>

          <h1
            className="font-black leading-[1.02] tracking-tight text-white"
            style={{
              fontSize: "clamp(48px,8.5vw,80px)",
              letterSpacing: "-2.5px",
            }}
          >
            Kareem
            <br />
            <span className="grad-text">Abdulafeez Tosin</span>
          </h1>

          <p
            className="text-[16px] leading-[1.75]"
            style={{
              color: "rgba(255,255,255,0.42)",
              maxWidth: 420,
              margin: "0 auto",
            }}
          >
            Fullstack developer building{" "}
            <span style={{ color: "rgba(255,255,255,0.78)", fontWeight: 600 }}>
              production-grade AI products
            </span>{" "}
            — from database schema to live deployment.
          </p>

          {/* Terminal receipt */}
          <div
            className="mx-auto text-left rounded-xl overflow-hidden"
            style={{
              maxWidth: 380,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              fontFamily: "'Menlo','Monaco','Courier New',monospace",
            }}
          >
            <div
              className="flex items-center gap-1.5 px-4 py-2.5"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span
                className="text-[10px] ml-2"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                kareem@dev ~ stack
              </span>
            </div>
            <div className="px-4 py-4 space-y-1.5 text-[12px]">
              {[
                [
                  "$",
                  "whoami",
                  "rgba(124,109,250,0.9)",
                  "rgba(255,255,255,0.55)",
                ],
                [
                  "›",
                  "fullstack developer · ai builder",
                  "rgba(52,211,153,0.8)",
                  "rgba(255,255,255,0.38)",
                ],
                [
                  "$",
                  "stack --current",
                  "rgba(124,109,250,0.9)",
                  "rgba(255,255,255,0.55)",
                ],
              ].map(([prefix, text, pc, tc], i) => (
                <div key={i} className="flex gap-2">
                  <span style={{ color: pc as string }}>{prefix}</span>
                  <span style={{ color: tc as string }}>{text}</span>
                </div>
              ))}
              <div className="flex gap-2">
                <span style={{ color: "rgba(124,109,250,0.9)" }}>›</span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontWeight: 600,
                    minWidth: 110,
                  }}
                >
                  {word}
                  <span className="cursor-blink" style={{ color: V }}>
                    █
                  </span>
                </span>
              </div>
              <div className="flex gap-2 pt-1">
                <span style={{ color: "rgba(124,109,250,0.9)" }}>$</span>
                <span style={{ color: "rgba(255,255,255,0.55)" }}>
                  projects --live
                </span>
              </div>
              <div className="flex gap-2">
                <span style={{ color: "rgba(52,211,153,0.8)" }}>›</span>
                <span style={{ color: "rgba(255,255,255,0.38)" }}>
                  4 deployed · all production
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center pt-1">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg,#7c6dfa,#a78bfa)" }}
            >
              View my work ↓
            </a>
            <a
              href="https://github.com/fizo20"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-semibold transition-colors"
              style={{
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
              }
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── TECH TICKER ─────────────────────────────────────── */}
      <div
        className="py-5 overflow-hidden"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-6 text-[12px] font-semibold whitespace-nowrap uppercase tracking-[0.12em]"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              {item} <span style={{ color: V, margin: "0 8px" }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ───────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              counter: c4,
              suffix: "",
              label: "Live projects deployed",
              sub: "All production-grade",
            },
            {
              counter: c10,
              suffix: "+",
              label: "Technologies in daily use",
              sub: "Across full stack",
            },
            {
              counter: c15,
              suffix: "+",
              label: "Core features shipped",
              sub: "Auth, billing, AI, realtime",
            },
            {
              counter: c100,
              suffix: "%",
              label: "End-to-end ownership",
              sub: "DB → deploy, solo",
            },
          ].map(({ counter, suffix, label, sub }, i) => (
            <div
              key={i}
              className="reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div
                className="rounded-2xl p-6 h-full glow-card"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div
                  className="text-[38px] font-black leading-none mb-1"
                  style={{ color: "#fff" }}
                >
                  <span ref={counter.ref}>{counter.val}</span>
                  {suffix}
                </div>
                <div className="text-[13px] font-semibold text-white mb-1">
                  {label}
                </div>
                <div
                  className="text-[11px]"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
        <p
          className="reveal text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
          style={{ color: V }}
        >
          About me
        </p>
        <h2 className="reveal text-[clamp(28px,4.5vw,42px)] font-black text-white tracking-tight leading-tight mb-12">
          I build things that
          <br />
          actually ship.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Long-form bio */}
          <div className="lg:col-span-3 space-y-5">
            <p
              className="reveal text-[15px] leading-[1.85]"
              style={{ color: "rgba(255,255,255,0.52)" }}
            >
              I&apos;m a self-driven fullstack developer with a bias for
              shipping. I don&apos;t build demos — I build products that are
              deployed, publicly accessible, and ready to handle real users.
              From the first database schema to the final Vercel deployment, I
              own the entire stack.
            </p>
            <p
              className="reveal reveal-delay-1 text-[15px] leading-[1.85]"
              style={{ color: "rgba(255,255,255,0.52)" }}
            >
              My flagship project,{" "}
              <span style={{ color: "#fff", fontWeight: 600 }}>Nexora AI</span>,
              is a full SaaS platform with an autonomous AI agent that monitors
              workspaces and creates tasks without user input, role-based
              multi-tenant access, Stripe subscription billing, and real-time
              WebSocket communication — all built and deployed solo. It&apos;s
              not a tutorial clone. It&apos;s a real product with real
              architecture decisions.
            </p>
            <p
              className="reveal reveal-delay-2 text-[15px] leading-[1.85]"
              style={{ color: "rgba(255,255,255,0.52)" }}
            >
              I care about the things that make software professional: proper
              error handling, auth security, scalable data models, and UIs that
              don&apos;t break on edge cases. I&apos;ve built booking platforms,
              internal dashboards, EdTech sites, and AI products — and every one
              of them is live.
            </p>
            <p
              className="reveal reveal-delay-3 text-[15px] leading-[1.85]"
              style={{ color: "rgba(255,255,255,0.52)" }}
            >
              I learn fast, take ownership seriously, and write code I&apos;m
              not embarrassed to show anyone. If you need someone who can take a
              product from idea to deployment without hand-holding — that&apos;s
              me.
            </p>

            {/* Value props */}
            <div className="reveal reveal-delay-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {[
                [
                  "🚀",
                  "Ships fast",
                  "I prioritise working software over perfect plans",
                ],
                [
                  "🧠",
                  "Thinks in systems",
                  "I design APIs and schemas before writing UI",
                ],
                [
                  "🔒",
                  "Security-first",
                  "Auth, RBAC, and data isolation done right",
                ],
                [
                  "📦",
                  "Zero hand-holding",
                  "I take a brief and deliver a finished product",
                ],
              ].map(([icon, title, body]) => (
                <div
                  key={title as string}
                  className="rounded-xl p-4"
                  style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[16px]">{icon}</span>
                    <span className="text-[13px] font-bold text-white">
                      {title}
                    </span>
                  </div>
                  <p
                    className="text-[12px] leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.38)" }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar focus card */}
          <div className="lg:col-span-2 reveal reveal-delay-2">
            <div
              className="rounded-2xl p-6"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background:
                  "linear-gradient(160deg,rgba(124,109,250,0.08) 0%,rgba(255,255,255,0.02) 100%)",
              }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-[0.18em] mb-5"
                style={{ color: V }}
              >
                What I specialise in
              </p>
              {[
                [
                  "⚡",
                  "Full-stack products",
                  "End-to-end: schema → API → frontend → deployment.",
                ],
                [
                  "🤖",
                  "AI integration",
                  "SSE streaming, agents, tool-calling, OpenAI API.",
                ],
                [
                  "🔐",
                  "Auth & security",
                  "JWT, refresh tokens, RBAC, workspace isolation.",
                ],
                [
                  "💳",
                  "Payments",
                  "Stripe subscriptions, webhooks, billing events.",
                ],
                [
                  "📡",
                  "Real-time",
                  "WebSockets, live updates, event-driven UIs.",
                ],
              ].map(([icon, title, body]) => (
                <div
                  key={title as string}
                  className="flex gap-3 py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span className="text-[17px] shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-[13px] font-semibold text-white">
                      {title}
                    </p>
                    <p
                      className="text-[11px] leading-relaxed mt-0.5"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW I WORK ──────────────────────────────────────── */}
      <section
        id="process"
        className="py-24 px-6"
        style={{ background: "rgba(255,255,255,0.015)" }}
      >
        <div className="max-w-5xl mx-auto">
          <p
            className="reveal text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: V }}
          >
            How I work
          </p>
          <h2 className="reveal text-[clamp(28px,4.5vw,42px)] font-black text-white tracking-tight mb-4">
            My process
          </h2>
          <p
            className="reveal text-[15px] mb-14 max-w-lg"
            style={{ color: "rgba(255,255,255,0.42)" }}
          >
            I don&apos;t just write code — I think through problems before I
            write them. Here&apos;s how every project runs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROCESS.map((step, i) => (
              <div
                key={step.step}
                className={`reveal reveal-delay-${i + 1} rounded-2xl p-7 glow-card`}
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div
                  className="text-[11px] font-black tracking-[0.2em] mb-4"
                  style={{ color: V }}
                >
                  {step.step}
                </div>
                <h3 className="text-[18px] font-black text-white mb-3 leading-snug">
                  {step.title}
                </h3>
                <p
                  className="text-[14px] leading-[1.8]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────── */}
      <section id="projects" className="py-24 px-6 max-w-5xl mx-auto">
        <p
          className="reveal text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
          style={{ color: V }}
        >
          What I&apos;ve built
        </p>
        <h2 className="reveal text-[clamp(28px,4.5vw,42px)] font-black text-white tracking-tight mb-3">
          Projects
        </h2>
        <p
          className="reveal text-[15px] mb-10 max-w-lg"
          style={{ color: "rgba(255,255,255,0.42)" }}
        >
          Production-deployed. Real challenges. Real solutions. Click any
          project to read the full breakdown.
        </p>

        <div className="flex flex-col gap-5">
          {PROJECTS.map((p, i) => {
            const isOpen = openProject === p.name;
            return (
              <div
                key={p.name}
                className={`reveal reveal-delay-${i + 1} rounded-2xl overflow-hidden glow-card`}
                style={{
                  border: `1px solid ${p.featured ? "rgba(124,109,250,0.22)" : "rgba(255,255,255,0.07)"}`,
                  background: p.featured
                    ? "linear-gradient(135deg,rgba(124,109,250,0.07),rgba(255,255,255,0.02))"
                    : "rgba(255,255,255,0.02)",
                }}
              >
                {p.featured && <div className="h-px shimmer-bar" />}
                <div className="p-7 sm:p-8">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <div>
                      <p
                        className="text-[10px] font-bold tracking-[0.15em] uppercase mb-1"
                        style={{ color: V }}
                      >
                        {p.label}
                      </p>
                      <h3 className="text-[22px] font-black text-white tracking-tight">
                        {p.name}
                      </h3>
                      <p
                        className="text-[13px] mt-0.5"
                        style={{ color: "rgba(255,255,255,0.38)" }}
                      >
                        {p.tagline}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0 flex-wrap">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#fff")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "rgba(255,255,255,0.4)")
                        }
                      >
                        ↗ Code
                      </a>
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg text-[12px] font-bold text-white transition-opacity hover:opacity-85"
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
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium mb-4"
                      style={{
                        color: "#34d399",
                        border: "1px solid rgba(52,211,153,0.2)",
                        background: "rgba(52,211,153,0.07)",
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#34d399] animate-pulse shrink-0" />
                      {p.badge}
                    </div>
                  )}

                  <p
                    className="text-[13px] leading-[1.8] mb-4"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {p.description}
                  </p>

                  {/* Expand toggle */}
                  <button
                    onClick={() => setOpenProject(isOpen ? null : p.name)}
                    className="text-[12px] font-semibold mb-5 transition-colors flex items-center gap-1.5"
                    style={{
                      color: V,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    {isOpen ? "▲ Hide breakdown" : "▼ Challenge & solution"}
                  </button>

                  {isOpen && (
                    <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className="rounded-xl p-5"
                        style={{
                          border: "1px solid rgba(255,82,82,0.15)",
                          background: "rgba(255,82,82,0.04)",
                        }}
                      >
                        <p
                          className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2"
                          style={{ color: "rgba(255,130,130,0.8)" }}
                        >
                          The challenge
                        </p>
                        <p
                          className="text-[13px] leading-[1.8]"
                          style={{ color: "rgba(255,255,255,0.52)" }}
                        >
                          {p.challenge}
                        </p>
                      </div>
                      <div
                        className="rounded-xl p-5"
                        style={{
                          border: "1px solid rgba(52,211,153,0.15)",
                          background: "rgba(52,211,153,0.04)",
                        }}
                      >
                        <p
                          className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2"
                          style={{ color: "rgba(52,211,153,0.8)" }}
                        >
                          My solution
                        </p>
                        <p
                          className="text-[13px] leading-[1.8]"
                          style={{ color: "rgba(255,255,255,0.52)" }}
                        >
                          {p.solution}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium"
                        style={{
                          color: "rgba(255,255,255,0.45)",
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
            );
          })}
        </div>

        <div
          className="mt-5 rounded-2xl p-8 text-center reveal"
          style={{ border: "1px dashed rgba(255,255,255,0.1)" }}
        >
          <p
            className="text-[13px] font-medium"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            More projects coming soon
          </p>
          <a
            href="https://github.com/fizo20"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-[12px] font-semibold hover:underline"
            style={{ color: V }}
          >
            github.com/fizo20 ↗
          </a>
        </div>
      </section>

      {/* ── WRITING / ARTICLES ──────────────────────────────── */}
      <section
        id="writing"
        className="py-24 px-6"
        style={{ background: "rgba(255,255,255,0.015)" }}
      >
        <div className="max-w-5xl mx-auto">
          <p
            className="reveal text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: V }}
          >
            How I think
          </p>
          <h2 className="reveal text-[clamp(28px,4.5vw,42px)] font-black text-white tracking-tight mb-3">
            Engineering notes
          </h2>
          <p
            className="reveal text-[15px] mb-12 max-w-lg"
            style={{ color: "rgba(255,255,255,0.42)" }}
          >
            Things I&apos;ve learned building real products. Click any card to
            read the full note.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ARTICLES.map((a, i) => {
              const isOpen = openArticle === i;
              return (
                <div
                  key={i}
                  className={`reveal reveal-delay-${(i % 4) + 1} rounded-2xl p-7 glow-card cursor-pointer`}
                  style={{
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                  onClick={() => setOpenArticle(isOpen ? null : i)}
                >
                  <div
                    className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] mb-4"
                    style={{
                      color: V,
                      background: "rgba(124,109,250,0.12)",
                      border: `1px solid rgba(124,109,250,0.2)`,
                    }}
                  >
                    {a.tag}
                  </div>
                  <h3 className="text-[17px] font-black text-white leading-snug mb-3">
                    {a.title}
                  </h3>
                  <p
                    className="text-[13px] leading-[1.8]"
                    style={{ color: "rgba(255,255,255,0.42)" }}
                  >
                    {isOpen ? a.body : a.body.slice(0, 120) + "..."}
                  </p>
                  <button
                    className="mt-4 text-[12px] font-semibold flex items-center gap-1"
                    style={{
                      color: V,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    {isOpen ? "▲ Collapse" : "▼ Read more"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────── */}
      <section id="skills" className="py-24 px-6 max-w-5xl mx-auto">
        <p
          className="reveal text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
          style={{ color: V }}
        >
          Tech stack
        </p>
        <h2 className="reveal text-[clamp(28px,4.5vw,42px)] font-black text-white tracking-tight mb-12">
          Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS_GROUPS.map(({ label, items }, i) => (
            <div
              key={label}
              className={`reveal reveal-delay-${(i % 4) + 1} rounded-2xl p-6 glow-card`}
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-[0.18em] mb-4"
                style={{ color: V }}
              >
                {label}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-lg text-[12px] font-medium"
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Philosophy bar */}
        <div
          className="reveal mt-8 rounded-2xl p-8"
          style={{
            border: "1px solid rgba(124,109,250,0.18)",
            background:
              "linear-gradient(135deg,rgba(124,109,250,0.07),rgba(255,255,255,0.02))",
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3"
            style={{ color: V }}
          >
            My philosophy
          </p>
          <p className="text-[16px] font-semibold leading-[1.7] text-white max-w-2xl">
            "Technologies are tools. The real skill is knowing which tool fits
            which problem — and being able to pick up a new one quickly when the
            job demands it."
          </p>
          <p
            className="text-[12px] mt-3"
            style={{ color: "rgba(255,255,255,0.32)" }}
          >
            — Kareem Abdulafeez Tosin
          </p>
        </div>
      </section>

      {/* ── WHY HIRE ME ─────────────────────────────────────── */}
      <section
        className="py-24 px-6"
        style={{ background: "rgba(255,255,255,0.015)" }}
      >
        <div className="max-w-5xl mx-auto">
          <p
            className="reveal text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: V }}
          >
            Why work with me
          </p>
          <h2 className="reveal text-[clamp(28px,4.5vw,42px)] font-black text-white tracking-tight mb-12">
            What you actually get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: "🧩",
                title: "A complete product, not a partial one",
                body: "I ship full features: frontend, API, database, auth, error handling, and deployment. You won't get a half-built backend or a UI with no data.",
              },
              {
                icon: "⚡",
                title: "Speed without cutting corners",
                body: "I move fast because I plan well. I don't skip tests, error states, or security. I've learned the hard way that shortcuts early create bottlenecks later.",
              },
              {
                icon: "🔭",
                title: "Ownership and proactivity",
                body: "I don't wait to be told what to do next. I spot problems, propose solutions, and follow through. You hire a developer, you get a collaborator.",
              },
              {
                icon: "📖",
                title: "Clean, readable code",
                body: "Code I write is code you (or a future hire) can understand in six months. Consistent naming, logical structure, and no magic numbers buried in the middle.",
              },
              {
                icon: "🌐",
                title: "End-to-end fluency",
                body: "I can have a production conversation about Postgres schemas in the morning and CSS layout debugging in the afternoon. No hand-offs required.",
              },
              {
                icon: "🤝",
                title: "Communication that doesn't waste your time",
                body: "Clear updates, honest blockers, no vague progress reports. If something is going to be late, you'll know early enough to do something about it.",
              },
            ].map(({ icon, title, body }, i) => (
              <div
                key={title}
                className={`reveal reveal-delay-${(i % 4) + 1} rounded-2xl p-7 glow-card`}
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span className="text-[28px] block mb-4">{icon}</span>
                <h3 className="text-[16px] font-black text-white mb-3 leading-snug">
                  {title}
                </h3>
                <p
                  className="text-[13px] leading-[1.8]"
                  style={{ color: "rgba(255,255,255,0.42)" }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────── */}
      <section id="contact" className="py-32 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <p
            className="reveal text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: V }}
          >
            Get in touch
          </p>
          <h2 className="reveal text-[clamp(30px,5vw,52px)] font-black text-white tracking-tight mb-4">
            Let&apos;s build
            <br />
            <span className="grad-text">something great.</span>
          </h2>
          <p
            className="reveal text-[15px] leading-[1.8] mt-4 mb-10 max-w-md mx-auto"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            I&apos;m open to freelance projects, full-time roles, and ambitious
            collaborations. If you have an idea or opportunity — let&apos;s
            talk.
          </p>
          <div className="reveal flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:abdulafeezkareem701@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-[15px] font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg,#7c6dfa,#a78bfa)" }}
            >
              Say hello →
            </a>
            <a
              href="https://github.com/fizo20"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-[15px] font-semibold transition-colors"
              style={{
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
              }
            >
              View GitHub ↗
            </a>
          </div>

          <div className="reveal reveal-delay-2 flex justify-center gap-8 mt-12">
            {[
              ["GitHub", "https://github.com/fizo20"],
              ["LinkedIn", "https://linkedin.com"],
              ["Twitter / X", "https://x.com/fizotm20"],
              ["Email", "mailto:abdulafeezkareem701@gmail.com"],
            ].map(([l, h]) => (
              <a
                key={l}
                href={h}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-medium transition-colors"
                style={{ color: "rgba(255,255,255,0.28)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.28)")
                }
              >
                {l} ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer
        className="py-8 px-6 text-center text-[11px]"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          color: "rgba(255,255,255,0.18)",
        }}
      >
        © {new Date().getFullYear()} Kareem Abdulafeez Tosin · Built with
        Next.js &amp; Tailwind CSS · Deployed on Vercel
      </footer>
    </div>
  );
}
