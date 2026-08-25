"use client";

import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Briefcase,
  Building2,
  CalendarDays,
  ChevronRight,
  Globe2,
  Layers,
  MapPin,
  Sparkles,
  Timer,
} from "lucide-react";
import CareerMap from "./CareerMap";
import { EXPERIENCES, MAX_MONTHS, TRACKS, type ExperienceEntry, type TrackId } from "./experience-data";

const MODE_ICON = {
  "On-site": Building2,
  Hybrid: Layers,
  Remote: Globe2,
  Campus: Sparkles,
} as const;

/** Animated integer counter that runs once when scrolled into view. */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  return (
    <motion.span
      onViewportEnter={() => {
        if (started.current) return;
        started.current = true;
        const duration = 1100;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          // easeOutCubic
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
      viewport={{ once: true }}
    >
      {value}
      {suffix}
    </motion.span>
  );
}

function StatTile({
  icon,
  value,
  suffix,
  label,
  color,
  delay,
}: {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      className="exp-stat"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6 }}
      style={{ borderColor: `${color}28` }}
    >
      <div className="exp-stat-icon" style={{ color, background: `${color}18` }}>
        {icon}
      </div>
      <div className="exp-stat-value" style={{ color }}>
        <Counter to={value} suffix={suffix} />
      </div>
      <div className="exp-stat-label">{label}</div>
    </motion.div>
  );
}

function ExperienceCard({ exp, index }: { exp: ExperienceEntry; index: number }) {
  const ModeIcon = MODE_ICON[exp.mode];
  // Open by default — the bullets are the substance; the toggle is for compacting.
  const [open, setOpen] = useState(true);

  return (
    <motion.article
      layout
      className="exp-card"
      style={{ ["--accent" as string]: exp.color }}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3) }}
    >
      {/* node on the rail */}
      <span className="exp-node" aria-hidden>
        <span className="exp-node-core" />
        {exp.current && <span className="exp-node-pulse" />}
      </span>

      <div className="exp-card-inner">
        <span className="exp-card-sheen" aria-hidden />

        <header className="exp-card-head">
          <div className="exp-logo">
            <Image src={exp.logo} alt={exp.company} width={56} height={56} className="exp-logo-img" />
          </div>

          <div className="exp-head-text">
            <div className="exp-title-row">
              <h3 className="exp-role">{exp.title}</h3>
              {exp.current && (
                <span className="exp-live">
                  <span className="exp-live-dot" />
                  CURRENT
                </span>
              )}
            </div>

            <p className="exp-company">
              {exp.company}
              <span className="exp-employment">· {exp.employment}</span>
            </p>

            <div className="exp-meta">
              <span className="exp-meta-item">
                <CalendarDays className="exp-meta-icon" />
                {exp.period}
              </span>
              <span className="exp-meta-item">
                <Timer className="exp-meta-icon" />
                {exp.durationLabel}
              </span>
              <span className="exp-meta-item">
                <MapPin className="exp-meta-icon" />
                {exp.location}
              </span>
              <span className="exp-mode">
                <ModeIcon className="exp-meta-icon" />
                {exp.mode}
              </span>
            </div>
          </div>
        </header>

        {/* tenure bar — length is relative to the longest stint */}
        <div className="exp-tenure" title={`${exp.durationLabel} tenure`}>
          <motion.span
            className="exp-tenure-fill"
            initial={{ width: 0 }}
            whileInView={{ width: `${Math.max(8, (exp.months / MAX_MONTHS) * 100)}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {exp.highlights.length > 0 && (
          <>
            <button
              type="button"
              className="exp-toggle"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.25 }} className="inline-flex">
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.span>
              {open ? "Hide details" : `Show ${exp.highlights.length} highlights`}
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.ul
                  className="exp-points"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  {exp.highlights.map((point, i) => (
                    <motion.li
                      key={i}
                      className="exp-point"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.06 * i }}
                    >
                      <span className="exp-bullet" aria-hidden />
                      {point}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </>
        )}

        <div className="exp-chips">
          {exp.skills.map((skill, i) => (
            <motion.span
              key={skill}
              className="exp-chip"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.03 * i }}
              whileHover={{ y: -2, scale: 1.05 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Experience() {
  const [track, setTrack] = useState<TrackId | "all">("all");
  const railRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 55%"],
  });
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const railGlow = useTransform(scrollYProgress, [0, 1], [0.35, 1]);

  const visible = useMemo(
    () => (track === "all" ? EXPERIENCES : EXPERIENCES.filter((e) => e.track === track)),
    [track]
  );

  const stats = useMemo(() => {
    const totalMonths = EXPERIENCES.filter((e) => e.track !== "volunteering").reduce(
      (sum, e) => sum + e.months,
      0
    );
    const skills = new Set(EXPERIENCES.flatMap((e) => e.skills));
    return {
      years: Math.round((totalMonths / 12) * 10) / 10,
      organisations: new Set(EXPERIENCES.map((e) => e.company)).size,
      roles: EXPERIENCES.length,
      technologies: skills.size,
    };
  }, []);

  return (
    <section id="experience" className="experience-section py-24 relative">
      <div className="container px-4 mx-auto max-w-5xl">
        {/* ── header ── */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="exp-eyebrow">
            <Briefcase className="w-3.5 h-3.5" />
            CAREER LOG
          </span>
          <h2 className="exp-heading">Professional Experience</h2>
          <p className="exp-subheading">
            From mine planning at CMPDI to 3D environments and digital twins — the full run.
          </p>
        </motion.div>

        {/* ── stat strip ── */}
        <div className="exp-stats">
          <StatTile icon={<Timer className="w-4 h-4" />} value={stats.years} suffix="+ yrs" label="Experience" color="#00e5ff" delay={0} />
          <StatTile icon={<Building2 className="w-4 h-4" />} value={stats.organisations} suffix="" label="Organisations" color="#a855f7" delay={0.08} />
          <StatTile icon={<Briefcase className="w-4 h-4" />} value={stats.roles} suffix="" label="Roles Held" color="#22c55e" delay={0.16} />
          <StatTile icon={<Layers className="w-4 h-4" />} value={stats.technologies} suffix="+" label="Technologies" color="#fbbf24" delay={0.24} />
        </div>

        {/* ── career map visualisation ── */}
        <CareerMap />

        {/* ── filter tabs ── */}
        <div className="exp-filters" role="tablist" aria-label="Filter experience by track">
          {TRACKS.map((t) => {
            const active = track === t.id;
            const count = t.id === "all" ? EXPERIENCES.length : EXPERIENCES.filter((e) => e.track === t.id).length;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => setTrack(t.id)}
                className={`exp-filter ${active ? "is-active" : ""}`}
                style={{ ["--accent" as string]: t.color }}
              >
                {active && (
                  <motion.span
                    layoutId="exp-filter-pill"
                    className="exp-filter-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="exp-filter-label">
                  {t.label}
                  <span className="exp-filter-count">{count}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* ── timeline ── */}
        <div className="exp-rail-wrap" ref={railRef}>
          <div className="exp-rail" aria-hidden>
            <motion.div className="exp-rail-fill" style={{ scaleY: railScale, opacity: railGlow }} />
          </div>

          <motion.div layout className="exp-list">
            <AnimatePresence mode="popLayout">
              {visible.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.32 }}
                >
                  <ExperienceCard exp={exp} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
