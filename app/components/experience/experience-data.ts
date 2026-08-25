export type TrackId = "work" | "internship" | "leadership" | "volunteering";
export type DomainId = "fullstack" | "threed" | "aiml" | "data" | "engineering" | "community";

/** [year, month] with month 1-12. `null` end means "still running". */
export type YearMonth = [number, number];

export interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  /** Compact label for the timeline chart, where space is tight. */
  shortName: string;
  track: TrackId;
  domain: DomainId;
  employment: string;
  period: string;
  start: YearMonth;
  end: YearMonth | null;
  /** Duration in months — drives the timeline bar. */
  months: number;
  durationLabel: string;
  location: string;
  mode: "On-site" | "Hybrid" | "Remote" | "Campus";
  current?: boolean;
  highlights: string[];
  skills: string[];
  logo: string;
  color: string;
}

export const DOMAINS: { id: DomainId; label: string; color: string }[] = [
  { id: "threed", label: "3D & Digital Twins", color: "#00e5ff" },
  { id: "fullstack", label: "Full-Stack", color: "#a855f7" },
  { id: "aiml", label: "AI / ML", color: "#22c55e" },
  { id: "data", label: "Data & APIs", color: "#fbbf24" },
  { id: "engineering", label: "Engineering", color: "#f97316" },
  { id: "community", label: "Community", color: "#ec4899" },
];

export const TRACKS: { id: TrackId | "all"; label: string; color: string }[] = [
  { id: "all", label: "All", color: "#00e5ff" },
  { id: "work", label: "Full-time", color: "#00e5ff" },
  { id: "internship", label: "Internships", color: "#a855f7" },
  { id: "leadership", label: "Leadership", color: "#22c55e" },
  { id: "volunteering", label: "Volunteering", color: "#fbbf24" },
];

export const EXPERIENCES: ExperienceEntry[] = [
  {
    id: "machani",
    shortName: "Machani Group",
    domain: "threed",
    start: [2026, 5],
    end: null,
    title: "Software Engineer",
    company: "Machani Group",
    track: "work",
    employment: "Full-time",
    period: "May 2026 — Present",
    months: 4,
    durationLabel: "4 mos",
    location: "Bengaluru, Karnataka",
    mode: "On-site",
    current: true,
    highlights: [
      "Building interactive 3D environments and 2D-to-3D conversion pipelines across Unity, Unreal Engine and CityEngine.",
      "Developing custom plugins for Revit and SketchUp to automate modelling and engineering workflows.",
      "Shipping business platforms end to end — a full-stack HRMS portal, a booking engine and the company website.",
      "Built an ML-based product affinity and recommendation system driven by real user behaviour.",
      "Integrating sensor and IoT data into digital-twin style 3D visualisations.",
    ],
    skills: ["Revit", "Unity", "Unreal Engine", "SketchUp", "CityEngine", "3D Visualization", "Digital Twins", "React", "Next.js", "Machine Learning"],
    logo: "/images/logos/machani.png",
    color: "#00e5ff",
  },
  {
    id: "enerzyflow",
    shortName: "Enerzyflow",
    domain: "fullstack",
    start: [2025, 8],
    end: [2026, 3],
    title: "Software Engineer",
    company: "Enerzyflow India",
    track: "work",
    employment: "Full-time",
    period: "Aug 2025 — Mar 2026",
    months: 8,
    durationLabel: "8 mos",
    location: "Kolkata, West Bengal",
    mode: "Hybrid",
    highlights: [
      "Designed and developed scalable backend services and REST APIs for processing energy consumption data, enabling efficient storage, retrieval and real-time reporting.",
      "Built interactive frontend dashboards in React/Next.js visualising energy usage patterns, trends and insights to improve user decision-making.",
      "Applied machine learning for energy consumption analysis and forecasting, helping optimise usage patterns and improve efficiency.",
      "Optimised full-stack performance across API response time, frontend rendering and data pipelines for faster loads and a smoother experience.",
    ],
    skills: ["React", "Next.js", "REST APIs", "Machine Learning", "Forecasting", "Data Pipelines", "Performance"],
    logo: "/images/logos/enerzyflow.png",
    color: "#22c55e",
  },
  {
    id: "claimbuddy",
    shortName: "ClaimBuddy",
    domain: "data",
    start: [2025, 5],
    end: [2025, 7],
    title: "Full Stack Developer",
    company: "ClaimBuddy",
    track: "internship",
    employment: "Internship",
    period: "May 2025 — Jul 2025",
    months: 3,
    durationLabel: "3 mos",
    location: "Gurugram, Haryana",
    mode: "On-site",
    highlights: [
      "Built Django modules on PostgreSQL to fetch and analyse insurance data, streamlining key operations.",
      "Integrated the Gmail API to notify users and admins instantly on new hospital and city registrations.",
      "Coded regex-based OCR parsers and Next.js APIs with a Prisma schema to extract portal emails from the database.",
      "Designed a CSV/Excel upload format enforcing columns, data types and UTR/eNACH updates, plus UI work on icons, dates and search constraints.",
    ],
    skills: ["Django", "PostgreSQL", "SQL", "Next.js", "Prisma", "Gmail API", "OCR"],
    logo: "/images/logos/claimbuddy.png",
    color: "#ff7a59",
  },
  {
    id: "delishia",
    shortName: "Delishia",
    domain: "aiml",
    start: [2025, 2],
    end: [2025, 4],
    title: "Full Stack Developer",
    company: "Delishia Analytics",
    track: "internship",
    employment: "Internship",
    period: "Feb 2025 — Apr 2025",
    months: 3,
    durationLabel: "3 mos",
    location: "Remote",
    mode: "Remote",
    highlights: [
      "Developed responsive web dashboards with Next.js and Tailwind CSS presenting real-time political insights.",
      "Integrated the Google Maps API to display Bihar constituencies including party data and MLA details.",
      "Engineered the DeepSense module to analyse YouTube comments for voter sentiment and issue tracking.",
      "Delivered data-driven campaign strategies by analysing social media trends and electoral data patterns.",
    ],
    skills: ["Next.js", "Tailwind CSS", "Google Maps API", "Sentiment Analysis", "Data Visualization"],
    logo: "/images/delishia-logo.png",
    color: "#3b82f6",
  },
  {
    id: "bluestock",
    shortName: "Bluestock",
    domain: "fullstack",
    start: [2024, 7],
    end: [2024, 7],
    title: "Frontend Developer",
    company: "Bluestock™",
    track: "internship",
    employment: "Internship",
    period: "Jul 2024",
    months: 1,
    durationLabel: "1 mo",
    location: "Remote",
    mode: "Remote",
    highlights: [
      "Developed and debugged UI components with React.js, JavaScript and CSS to improve user experience.",
      "Collaborated on internal assignments and resolved customer query issues to boost response turnaround.",
      "Redesigned website layouts and added transactional flows to lift visual appeal and engagement.",
    ],
    skills: ["React.js", "JavaScript", "CSS", "UI Development"],
    logo: "/images/logos/bluestock.png",
    color: "#a855f7",
  },
  {
    id: "cmpdi",
    shortName: "CMPDI",
    domain: "engineering",
    start: [2024, 5],
    end: [2024, 6],
    title: "Intern",
    company: "Central Mine Planning & Design Institute",
    track: "internship",
    employment: "Internship",
    period: "May 2024 — Jun 2024",
    months: 2,
    durationLabel: "2 mos",
    location: "Ranchi, Jharkhand",
    mode: "On-site",
    highlights: [
      "Analysed geological reports and site data to determine optimal mining methods, boosting efficiency by 20%.",
      "Studied borehole lithologs, structural setups and mineralisation to enhance mineability assessments.",
      "Designed extraction plans using AutoCAD and MINEX, reducing mine planning turnaround time.",
      "Performed ventilation modelling with VentSIM to reduce safety risks and improve air quality standards.",
    ],
    skills: ["AutoCAD", "MINEX", "VentSIM", "Mine Planning", "Underground Ventilation"],
    logo: "/images/cmpdi.jpg",
    color: "#fbbf24",
  },
  {
    id: "tmes",
    shortName: "TMES",
    domain: "fullstack",
    start: [2022, 9],
    end: [2023, 1],
    title: "Core Team Member",
    company: "TMES, IIT Kharagpur",
    track: "leadership",
    employment: "Core Team",
    period: "Sep 2022 — Jan 2023",
    months: 5,
    durationLabel: "5 mos",
    location: "IIT Kharagpur",
    mode: "Campus",
    highlights: [
      "Collaborated with the team to design visually appealing, user-friendly websites tailored to client needs.",
      "Identified and resolved UI bugs to ensure functional consistency and minimise user-side disruptions.",
      "Implemented new features and enhancements to boost performance, usability and overall experience.",
    ],
    skills: ["Web Development", "UI/UX", "Team Collaboration"],
    logo: "/images/TMES.jpeg",
    color: "#22c55e",
  },
  {
    id: "greatstep",
    shortName: "GREAT STEP",
    domain: "fullstack",
    start: [2022, 9],
    end: [2023, 1],
    title: "Core Team Member",
    company: "GREAT STEP, IIT Kharagpur",
    track: "leadership",
    employment: "Core Team",
    period: "Sep 2022 — Jan 2023",
    months: 5,
    durationLabel: "5 mos",
    location: "IIT Kharagpur",
    mode: "Campus",
    highlights: [
      "Contributed to the society's web presence and technical initiatives as part of the core team.",
    ],
    skills: ["Web Development"],
    logo: "/images/logos/greatstep.png",
    color: "#8b5cf6",
  },
  {
    id: "ncc",
    shortName: "NCC Air Wing",
    domain: "community",
    start: [2021, 12],
    end: [2023, 4],
    title: "Cadet",
    company: "National Cadet Corps — India",
    track: "volunteering",
    employment: "Volunteering · Education",
    period: "Dec 2021 — Apr 2023",
    months: 17,
    durationLabel: "1 yr 5 mos",
    location: "IIT Kharagpur",
    mode: "Campus",
    highlights: [
      "Volunteered in the NCC Air Wing at IIT Kharagpur, earning the prestigious 'B' Certificate.",
      "Coordinated the Republic Day Parade — leading drills, logistics and cadet participation.",
      "Actively participated in Puneet Sagar Abhiyan, promoting environmental and coastal cleanliness.",
    ],
    skills: ["Leadership", "Discipline", "Event Coordination"],
    logo: "/images/logos/ncc.png",
    color: "#ef4444",
  },
];

export const MAX_MONTHS = Math.max(...EXPERIENCES.map((e) => e.months));
