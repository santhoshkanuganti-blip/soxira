'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { safeImageUrl } from '@/lib/safe-image';

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
      className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-line bg-surface p-6 shadow-[0_16px_40px_rgba(20,25,50,0.06)] transition-all"
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => onOpen(leader)}
    >
      <div className="relative flex flex-col items-center text-center">
        <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-accent-tint transition-all group-hover:border-accent/40">
          {safeImageUrl(leader.imageUrl) ? (
            <Image src={safeImageUrl(leader.imageUrl)!} alt={leader.name} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-accent text-2xl font-bold text-white">
              {leader.name.charAt(0)}
            </div>
          )}
        </div>
        <h3 className="text-base font-semibold text-ink">{leader.name}</h3>
        <p className="mt-1 text-xs text-accent">{leader.designation}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {leader.expertise.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-accent-tint px-2.5 py-0.5 text-[10px] font-medium text-accent ring-1 ring-accent-tint">
              {tag}
            </span>
          ))}
          {leader.expertise.length > 3 && (
            <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[10px] text-ink-muted ring-1 ring-line">
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
              className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-tint text-accent ring-1 ring-accent-tint transition hover:bg-accent hover:text-white"
            >
              <LinkedInIcon />
            </a>
          )}
          <span className="text-xs text-ink-muted underline-offset-2 hover:text-ink">View Profile →</span>
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
        <div className="absolute inset-0 bg-surface -sm" />
        <motion.div
          className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-line bg-paper p-8 shadow-2xl"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-ink-muted hover:bg-line hover:text-ink"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-6">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-accent-tint">
              {safeImageUrl(leader.imageUrl) ? (
                <Image src={safeImageUrl(leader.imageUrl)!} alt={leader.name} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-accent text-2xl font-bold text-white">
                  {leader.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-ink">{leader.name}</h2>
              <p className="mt-1 text-sm text-accent">{leader.designation}</p>
              {leader.linkedinUrl && (
                <a href={leader.linkedinUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent">
                  <LinkedInIcon /> LinkedIn Profile
                </a>
              )}
            </div>
          </div>
          {leader.quote && (
            <blockquote className="mt-6 rounded-2xl border-l-4 border-line bg-accent-tint p-4 text-sm italic text-ink-muted">
              &ldquo;{leader.quote}&rdquo;
            </blockquote>
          )}
          <p className="mt-6 text-sm leading-7 text-ink-muted whitespace-pre-line">{leader.bio}</p>
          <div className="mt-6">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-ink-muted">Areas of Expertise</p>
            <div className="flex flex-wrap gap-2">
              {leader.expertise.map((tag) => (
                <span key={tag} className="rounded-full bg-accent-tint px-3 py-1 text-xs font-medium text-accent ring-1 ring-accent-tint">
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
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Leadership</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">Meet Our Leadership</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink-muted">
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
