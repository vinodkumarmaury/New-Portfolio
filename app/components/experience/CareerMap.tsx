"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { BarChart3, GitBranch } from "lucide-react";
import { DOMAINS, EXPERIENCES, type ExperienceEntry } from "./experience-data";

/** Months since Jan 2021 — a single scalar makes the axis maths trivial. */
const toIndex = ([y, m]: [number, number]) => (y - 2021) * 12 + (m - 1);

/** Present-day cut-off for roles still running. */
const NOW: [number, number] = [2026, 8];

const AXIS_START = toIndex([2021, 12]);
const AXIS_END = toIndex([2026, 10]);
const AXIS_SPAN = AXIS_END - AXIS_START;

const pct = (index: number) => ((index - AXIS_START) / AXIS_SPAN) * 100;

const YEAR_TICKS = [2022, 2023, 2024, 2025, 2026];

function barGeometry(exp: ExperienceEntry) {
  const start = toIndex(exp.start);
  // +1 so a single-month role still has visible width.
  const end = toIndex(exp.end ?? NOW) + 1;
  const left = pct(start);
  const width = Math.max(2.5, pct(end) - left);
  return { left, width };
}

/* ── view 1: timeline ─────────────────────────────────────────── */

function TimelineView({
  active,
  setActive,
}: {
  active: string | null;
  setActive: (id: string | null) => void;
}) {
  const rows = useMemo(() => [...EXPERIENCES].reverse(), []);

  return (
    <div className="cmap-timeline">
      {/* year rails span the whole chart body */}
      <div className="cmap-grid" aria-hidden>
        {YEAR_TICKS.map((year) => (
          <div key={year} className="cmap-grid-line" style={{ left: `${pct(toIndex([year, 1]))}%` }}>
            <span className="cmap-grid-label">{`'${String(year).slice(2)}`}</span>
          </div>
        ))}
        <div className="cmap-now" style={{ left: `${pct(toIndex(NOW) + 1)}%` }}>
          <span className="cmap-now-label">NOW</span>
        </div>
      </div>

      <ul className="cmap-rows">
        {rows.map((exp, i) => {
          const { left, width } = barGeometry(exp);
          const isActive = active === exp.id;
          return (
            <li
              key={exp.id}
              className={`cmap-row ${isActive ? "is-active" : ""}`}
              style={{ ["--accent" as string]: exp.color }}
              onMouseEnter={() => setActive(exp.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(exp.id)}
              onBlur={() => setActive(null)}
              // A one-month bar is a tiny tap target; the whole row works too.
              onClick={() => setActive(isActive ? null : exp.id)}
            >
              <span className="cmap-row-label">{exp.shortName}</span>

              <div className="cmap-track">
                <motion.button
                  type="button"
                  className="cmap-bar"
                  aria-label={`${exp.title} at ${exp.company}, ${exp.period}, ${exp.durationLabel}`}
                  style={{ left: `${left}%` }}
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: `${width}%`, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setActive(isActive ? null : exp.id)}
                >
                  {/* Short stints have no room for text — the readout carries it instead. */}
                  {width >= 9 && <span className="cmap-bar-label">{exp.durationLabel}</span>}
                  {exp.current && <span className="cmap-bar-live" aria-hidden />}
                </motion.button>
              </div>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            className="cmap-readout"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            {(() => {
              const exp = EXPERIENCES.find((e) => e.id === active)!;
              return (
                <>
                  <span className="cmap-readout-dot" style={{ background: exp.color }} />
                  <span className="cmap-readout-role">{exp.title}</span>
                  <span className="cmap-readout-sep">·</span>
                  <span className="cmap-readout-company">{exp.company}</span>
                  <span className="cmap-readout-sep">·</span>
                  <span className="cmap-readout-meta">
                    {exp.period} ({exp.durationLabel})
                  </span>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── view 2: domain split ─────────────────────────────────────── */

function DomainView() {
  const data = useMemo(() => {
    // Volunteering is excluded so this agrees with the "years of experience"
    // stat — NCC ran alongside college, not as professional time.
    const counted = EXPERIENCES.filter((e) => e.track !== "volunteering");
    const totals = new Map<string, number>();
    for (const exp of counted) {
      totals.set(exp.domain, (totals.get(exp.domain) ?? 0) + exp.months);
    }
    const grand = Array.from(totals.values()).reduce((a, b) => a + b, 0);
    return DOMAINS.filter((d) => totals.has(d.id))
      .map((d) => {
        const months = totals.get(d.id)!;
        return {
          ...d,
          months,
          share: (months / grand) * 100,
          roles: counted.filter((e) => e.domain === d.id),
        };
      })
      .sort((a, b) => b.months - a.months);
  }, []);

  return (
    <div className="cmap-domains">
      {/* one stacked bar showing how the months divide up */}
      <div className="cmap-stack" role="img" aria-label="Share of experience by domain">
        {data.map((d, i) => (
          <motion.span
            key={d.id}
            className="cmap-stack-seg"
            style={{ background: d.color }}
            title={`${d.label} — ${d.months} mos`}
            initial={{ width: 0 }}
            whileInView={{ width: `${d.share}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>

      <ul className="cmap-domain-list">
        {data.map((d, i) => (
          <motion.li
            key={d.id}
            className="cmap-domain"
            style={{ ["--accent" as string]: d.color }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.06 * i }}
          >
            <div className="cmap-domain-head">
              <span className="cmap-domain-dot" />
              <span className="cmap-domain-label">{d.label}</span>
              <span className="cmap-domain-months">{d.months} mos</span>
            </div>

            <div className="cmap-domain-bar">
              <motion.span
                className="cmap-domain-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${d.share}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 + 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <p className="cmap-domain-roles">{d.roles.map((r) => r.shortName).join(" · ")}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ── shell ────────────────────────────────────────────────────── */

const VIEWS = [
  { id: "timeline", label: "Timeline", icon: GitBranch },
  { id: "domains", label: "Domains", icon: BarChart3 },
] as const;

export default function CareerMap() {
  const [view, setView] = useState<(typeof VIEWS)[number]["id"]>("timeline");
  const [active, setActive] = useState<string | null>(null);

  return (
    <motion.section
      className="cmap"
      aria-label="Career map"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55 }}
    >
      <header className="cmap-head">
        <div>
          <h3 className="cmap-title">Career Map</h3>
          <p className="cmap-sub">
            {view === "timeline"
              ? "Every role on one axis — hover or tap a bar."
              : "Where the professional months actually went."}
          </p>
        </div>

        <div className="cmap-switch" role="tablist" aria-label="Career map view">
          {VIEWS.map((v) => {
            const Icon = v.icon;
            const isOn = view === v.id;
            return (
              <button
                key={v.id}
                role="tab"
                aria-selected={isOn}
                className={`cmap-switch-btn ${isOn ? "is-on" : ""}`}
                onClick={() => {
                  setView(v.id);
                  setActive(null);
                }}
              >
                {isOn && (
                  <motion.span
                    layoutId="cmap-switch-pill"
                    className="cmap-switch-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="cmap-switch-label">
                  <Icon className="w-3.5 h-3.5" />
                  {v.label}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {view === "timeline" ? <TimelineView active={active} setActive={setActive} /> : <DomainView />}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
