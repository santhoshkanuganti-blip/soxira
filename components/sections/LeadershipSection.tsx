'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

export type Leader = {
  id: string;
  name: string;
  designation: string;
  bio: string;
  expertise: string[];
  quote?: string | null;
  imageUrl?: string | null;
  linkedinUrl?: string | null;
  displayOrder: number;
};

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LeaderCard({ leader, onOpen }: { leader: Leader; onOpen: (l: Leader) => void }) {
  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 backdrop-blur-xl transition-all"
      whileHover={{ y: -6, boxShadow: '0 0 40px rgba(124,58,237,0.35)' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => onOpen(leader)}
    >
      <div className="absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.12),transparent_60%)]" />
      <div className="relative flex flex-col items-center text-center">
        <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-violet-500/40 shadow-[0_0_24px_rgba(124,58,237,0.4)] transition-all group-hover:border-violet-400 group-hover:shadow-[0_0_36px_rgba(124,58,237,0.6)]">
          {leader.imageUrl ? (
            <Image src={leader.imageUrl} alt={leader.name} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-600 to-sky-500 text-2xl font-bold text-white">
              {leader.name.charAt(0)}
            </div>
          )}
        </div>
        <h3 className="text-base font-semibold text-white">{leader.name}</h3>
        <p className="mt-1 text-xs text-violet-300">{leader.designation}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {leader.expertise.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-violet-500/15 px-2.5 py-0.5 text-[10px] font-medium text-violet-300 ring-1 ring-violet-500/20">
              {tag}
            </span>
          ))}
          {leader.expertise.length > 3 && (
            <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-400 ring-1 ring-white/10">
              +{leader.expertise.length - 3} more
            </span>
          )}
        </div>
        <div className="mt-4 flex items-center gap-3">
          {leader.linkedinUrl && (
            <a
              href={leader.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/15 text-sky-400 ring-1 ring-sky-500/20 transition hover:bg-sky-500 hover:text-white"
            >
              <LinkedInIcon />
            </a>
          )}
          <span className="text-xs text-slate-400 underline-offset-2 hover:text-white">View Profile →</span>
        </div>
      </div>
    </motion.div>
  );
}

function BioModal({ leader, onClose }: { leader: Leader; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
        <motion.div
          className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0B0B1A] p-8 shadow-2xl"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-6">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-violet-500/50 shadow-[0_0_24px_rgba(124,58,237,0.4)]">
              {leader.imageUrl ? (
                <Image src={leader.imageUrl} alt={leader.name} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-600 to-sky-500 text-2xl font-bold text-white">
                  {leader.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{leader.name}</h2>
              <p className="mt-1 text-sm text-violet-300">{leader.designation}</p>
              {leader.linkedinUrl && (
                <a href={leader.linkedinUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300">
                  <LinkedInIcon /> LinkedIn Profile
                </a>
              )}
            </div>
          </div>
          {leader.quote && (
            <blockquote className="mt-6 rounded-2xl border-l-4 border-violet-500 bg-violet-500/10 p-4 text-sm italic text-slate-300">
              "{leader.quote}"
            </blockquote>
          )}
          <p className="mt-6 text-sm leading-7 text-slate-300 whitespace-pre-line">{leader.bio}</p>
          <div className="mt-6">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">Areas of Expertise</p>
            <div className="flex flex-wrap gap-2">
              {leader.expertise.map((tag) => (
                <span key={tag} className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-300 ring-1 ring-violet-500/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function LeadershipSection({ leaders }: { leaders: Leader[] }) {
  const [selected, setSelected] = useState<Leader | null>(null);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-violet-300/80">Leadership</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Meet Our Leadership</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            Visionary leaders driving AI-powered digital transformation for Indian businesses.
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader) => (
            <LeaderCard key={leader.id} leader={leader} onOpen={setSelected} />
          ))}
        </div>
      </div>
      {selected && <BioModal leader={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
