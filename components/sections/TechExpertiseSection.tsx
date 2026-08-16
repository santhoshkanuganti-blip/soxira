'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Tech = {
  name: string;
  color: string;
  glow: string;
  icon: React.ReactNode;
};

type Group = {
  category: string;
  accent: string;
  techs: Tech[];
};

/* ─── SVG Icons ─────────────────────────────────────────────── */

function AIIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
      <rect x="11" y="11" width="18" height="18" rx="2" stroke={color} strokeWidth="1.8" />
      <line x1="11" y1="15" x2="7" y2="15" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="11" y1="20" x2="5" y2="20" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="11" y1="25" x2="7" y2="25" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="29" y1="15" x2="33" y2="15" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="29" y1="20" x2="35" y2="20" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="29" y1="25" x2="33" y2="25" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="15" y1="11" x2="15" y2="7" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20" y1="11" x2="20" y2="5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="25" y1="11" x2="25" y2="7" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="15" y1="29" x2="15" y2="33" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20" y1="29" x2="20" y2="35" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="25" y1="29" x2="25" y2="33" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="20" cy="20" r="3" fill={color} />
    </svg>
  );
}

function GenAIIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
      <path
        d="M20 4 L22.5 17.5 L36 20 L22.5 22.5 L20 36 L17.5 22.5 L4 20 L17.5 17.5 Z"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M31 8 L32 11.5 L35.5 12.5 L32 13.5 L31 17 L30 13.5 L26.5 12.5 L30 11.5 Z" fill={color} fillOpacity="0.65" />
      <circle cx="10" cy="10" r="1.5" fill={color} fillOpacity="0.5" />
    </svg>
  );
}

function OracleIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
      <circle cx="20" cy="20" r="14" stroke="#E84040" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="6" fill="#E84040" />
    </svg>
  );
}

function SnowflakeIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
      <line x1="20" y1="4" x2="20" y2="36" stroke={color} strokeWidth="2" />
      <line x1="4" y1="20" x2="36" y2="20" stroke={color} strokeWidth="2" />
      <line x1="7.51" y1="7.51" x2="32.49" y2="32.49" stroke={color} strokeWidth="2" />
      <line x1="32.49" y1="7.51" x2="7.51" y2="32.49" stroke={color} strokeWidth="2" />
      <polyline points="16,8 20,12 24,8" stroke={color} strokeWidth="1.6" />
      <polyline points="16,32 20,28 24,32" stroke={color} strokeWidth="1.6" />
      <polyline points="8,16 12,20 8,24" stroke={color} strokeWidth="1.6" />
      <polyline points="32,16 28,20 32,24" stroke={color} strokeWidth="1.6" />
      <circle cx="20" cy="20" r="2.5" fill={color} />
    </svg>
  );
}

function DBTIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
      <path
        d="M20 5 L34 30 L6 30 Z"
        stroke={color} strokeWidth="2" strokeLinejoin="round"
        fill={color} fillOpacity="0.15"
      />
      <path d="M20 24 L27 14 L13 14 Z" fill={color} fillOpacity="0.55" />
    </svg>
  );
}

function AWSIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
      <path
        d="M11 23 C7 23 5 20 5 17 C5 14 7.5 11.5 10.5 11.5 C10.2 10.7 10 9.9 10 9 C10 5.7 12.7 3 16 3 C18.3 3 20.3 4.3 21.4 6.2 C22.2 5.4 23.3 5 24.5 5 C27.5 5 30 7.5 30 10.5 C30 10.8 30 11.1 29.9 11.4 C31.7 12 33 13.6 33 15.5 C33 18 31 20 28.5 20 L26 20"
        stroke={color} strokeWidth="2"
      />
      <path d="M9 31 C12 34 28 34 31 31" stroke={color} strokeWidth="2.2" />
      <path d="M8 31.5 L10.5 29" stroke={color} strokeWidth="2" />
      <path d="M32 31.5 L29.5 29" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function AzureIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
      <path
        d="M17 4 L4 32 L13 32 L20 16 L27 32 L36 32 L22 4 Z"
        stroke={color} strokeWidth="2" strokeLinejoin="round"
        fill={color} fillOpacity="0.12"
      />
      <line x1="9" y1="24" x2="31" y2="24" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}

function GCPIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
      <polygon
        points="20,4 33,11.5 33,28.5 20,36 7,28.5 7,11.5"
        stroke={color} strokeWidth="2" strokeLinejoin="round"
        fill={color} fillOpacity="0.1"
      />
      <circle cx="20" cy="14" r="2.2" fill={color} />
      <circle cx="12" cy="24" r="2.2" fill={color} />
      <circle cx="28" cy="24" r="2.2" fill={color} />
      <line x1="20" y1="14" x2="12" y2="24" stroke={color} strokeWidth="1.5" />
      <line x1="20" y1="14" x2="28" y2="24" stroke={color} strokeWidth="1.5" />
      <line x1="12" y1="24" x2="28" y2="24" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function PythonIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" strokeLinecap="round" className="h-10 w-10">
      <path d="M20 4 C14 4 11 7 11 12 L11 17 C11 17 14 19 20 19" stroke="#4B8BBE" strokeWidth="2.2" />
      <path d="M11 14 L8 14" stroke="#4B8BBE" strokeWidth="2" />
      <circle cx="16" cy="11" r="2" fill="#4B8BBE" />
      <path d="M20 21 C26 21 29 24 29 29 L29 34 C29 34 26 36 20 36" stroke="#FFD43B" strokeWidth="2.2" />
      <path d="M29 26 L32 26" stroke="#FFD43B" strokeWidth="2" />
      <circle cx="24" cy="29" r="2" fill="#FFD43B" />
      <path d="M20 19 L20 21" stroke="#9B9B9B" strokeWidth="1.5" />
    </svg>
  );
}

function DotNetIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
      <rect x="4" y="4" width="32" height="32" rx="3" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.08" />
      <circle cx="10" cy="23" r="2" fill={color} />
      <path d="M14 26 L14 18 L19 26 L19 18" stroke={color} strokeWidth="1.8" />
      <path d="M22 18 L22 26 M22 22 L26 22 M22 18 L26 18 M22 26 L26 26" stroke={color} strokeWidth="1.8" />
      <path d="M28 18 L33 18 M30.5 18 L30.5 26" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}

function NextJSIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
      <circle cx="20" cy="20" r="16" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.08" />
      <path d="M13 27 L13 13 L23 27 L23 13" stroke={color} strokeWidth="2.2" />
      <path d="M23 22 L27 27" stroke={color} strokeWidth="2.2" strokeOpacity="0.5" />
    </svg>
  );
}

function ReactIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" strokeLinecap="round" className="h-10 w-10">
      <ellipse cx="20" cy="20" rx="16" ry="6.5" stroke={color} strokeWidth="1.8" />
      <ellipse cx="20" cy="20" rx="16" ry="6.5" stroke={color} strokeWidth="1.8" transform="rotate(60 20 20)" />
      <ellipse cx="20" cy="20" rx="16" ry="6.5" stroke={color} strokeWidth="1.8" transform="rotate(-60 20 20)" />
      <circle cx="20" cy="20" r="2.8" fill={color} />
    </svg>
  );
}

function PostgreSQLIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" strokeLinecap="round" className="h-10 w-10">
      <ellipse cx="20" cy="10" rx="13" ry="5" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12" />
      <line x1="7" y1="10" x2="7" y2="28" stroke={color} strokeWidth="2" />
      <line x1="33" y1="10" x2="33" y2="28" stroke={color} strokeWidth="2" />
      <ellipse cx="20" cy="28" rx="13" ry="5" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12" />
      <path d="M7 19 C10 22 30 22 33 19" stroke={color} strokeWidth="1.2" strokeDasharray="2 2" />
    </svg>
  );
}

function SupabaseIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
      <path
        d="M22 4 L10 22 L18 22 L18 36 L30 18 L22 18 Z"
        stroke={color} strokeWidth="2"
        fill={color} fillOpacity="0.2"
      />
    </svg>
  );
}

/* ─── Tech data ─────────────────────────────────────────────── */

const GROUPS: Group[] = [
  {
    category: 'AI & GenAI',
    accent: '#8B5CF6',
    techs: [
      { name: 'Artificial Intelligence', color: '#8B5CF6', glow: 'rgba(139,92,246,0.35)', icon: <AIIcon color="#8B5CF6" /> },
      { name: 'Generative AI', color: '#A855F7', glow: 'rgba(168,85,247,0.35)', icon: <GenAIIcon color="#A855F7" /> },
    ],
  },
  {
    category: 'Oracle Cloud',
    accent: '#E84040',
    techs: [
      { name: 'Oracle ERP', color: '#E84040', glow: 'rgba(232,64,64,0.3)', icon: <OracleIcon /> },
      { name: 'Oracle Fusion', color: '#E84040', glow: 'rgba(232,64,64,0.3)', icon: <OracleIcon /> },
      { name: 'Oracle SCM', color: '#E84040', glow: 'rgba(232,64,64,0.3)', icon: <OracleIcon /> },
      { name: 'Oracle Financials', color: '#E84040', glow: 'rgba(232,64,64,0.3)', icon: <OracleIcon /> },
      { name: 'Oracle HCM', color: '#E84040', glow: 'rgba(232,64,64,0.3)', icon: <OracleIcon /> },
      { name: 'Oracle OIC', color: '#E84040', glow: 'rgba(232,64,64,0.3)', icon: <OracleIcon /> },
    ],
  },
  {
    category: 'Data & Analytics',
    accent: '#29B5E8',
    techs: [
      { name: 'Snowflake', color: '#29B5E8', glow: 'rgba(41,181,232,0.35)', icon: <SnowflakeIcon color="#29B5E8" /> },
      { name: 'DBT', color: '#FF6B35', glow: 'rgba(255,107,53,0.35)', icon: <DBTIcon color="#FF6B35" /> },
    ],
  },
  {
    category: 'Cloud Platforms',
    accent: '#FF9900',
    techs: [
      { name: 'Amazon AWS', color: '#FF9900', glow: 'rgba(255,153,0,0.35)', icon: <AWSIcon color="#FF9900" /> },
      { name: 'Microsoft Azure', color: '#0EA5E9', glow: 'rgba(0,120,212,0.35)', icon: <AzureIcon color="#0EA5E9" /> },
      { name: 'Google Cloud', color: '#4285F4', glow: 'rgba(66,133,244,0.35)', icon: <GCPIcon color="#4285F4" /> },
    ],
  },
  {
    category: 'Development',
    accent: '#61DAFB',
    techs: [
      { name: 'Python', color: '#4B8BBE', glow: 'rgba(75,139,190,0.35)', icon: <PythonIcon /> },
      { name: '.NET', color: '#7C3AED', glow: 'rgba(81,43,212,0.35)', icon: <DotNetIcon color="#7C3AED" /> },
      { name: 'Next.js', color: '#E2E8F0', glow: 'rgba(226,232,240,0.2)', icon: <NextJSIcon color="#E2E8F0" /> },
      { name: 'React', color: '#61DAFB', glow: 'rgba(97,218,251,0.35)', icon: <ReactIcon color="#61DAFB" /> },
      { name: 'PostgreSQL', color: '#5B9BD5', glow: 'rgba(91,155,213,0.35)', icon: <PostgreSQLIcon color="#5B9BD5" /> },
      { name: 'Supabase', color: '#3ECF8E', glow: 'rgba(62,207,142,0.35)', icon: <SupabaseIcon color="#3ECF8E" /> },
    ],
  },
];

/* ─── Card ──────────────────────────────────────────────────── */

function TechCard({ tech }: { tech: Tech }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? tech.color + '55' : 'rgba(255,255,255,0.07)',
        boxShadow: hovered ? `0 0 22px ${tech.glow}` : 'none',
      }}
      className="flex flex-col items-center gap-3 rounded-2xl border bg-surface-2 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-surface-2"
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-300"
        style={{ background: hovered ? `${tech.color}18` : 'rgba(255,255,255,0.04)' }}
      >
        {tech.icon}
      </div>
      <p
        className="text-xs font-medium leading-tight transition-colors duration-300"
        style={{ color: hovered ? tech.color : '#94a3b8' }}
      >
        {tech.name}
      </p>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────────── */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export default function TechExpertiseSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Technology Expertise
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
            Enterprise-Grade Technology Stack
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink-muted">
            From AI and GenAI to Oracle Cloud, modern data platforms, and full-stack development — certified across the technologies powering enterprise digital transformation.
          </p>
        </div>

        <div className="space-y-12">
          {GROUPS.map((group) => (
            <div key={group.category}>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px flex-1 opacity-20" style={{ background: group.accent }} />
                <span
                  className="rounded-full border px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{
                    color: group.accent,
                    borderColor: group.accent + '44',
                    background: group.accent + '12',
                  }}
                >
                  {group.category}
                </span>
                <span className="h-px flex-1 opacity-20" style={{ background: group.accent }} />
              </div>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
              >
                {group.techs.map((tech) => (
                  <TechCard key={tech.name} tech={tech} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-2">
          {['AWS Partner', 'Azure Partner', 'Google Cloud Partner', 'Oracle Partner', 'Snowflake Partner', 'dbt Partner'].map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-line bg-surface-2 px-4 py-1.5 text-[11px] font-medium text-ink-muted"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
