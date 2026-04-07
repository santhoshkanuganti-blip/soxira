'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { siteConfig } from '@/config/site';

const transition = { duration: 0.8, ease: 'easeInOut' as const };

const banners = [
  {
    title: 'Web Development',
    description: 'Stunning, high-performance websites built with Next.js, React, and modern cloud platforms.',
    cta: 'Explore Web Solutions',
    href: '/contact',
    bg: 'from-violet-700 via-purple-500 to-sky-400',
    icon: '🌐',
  },
  {
    title: 'Product Development with AI',
    description: 'Cutting-edge SaaS and product engineering with embedded AI insights for a competitive edge.',
    cta: 'Start Your Product',
    href: '/product-development-company',
    bg: 'from-sky-700 via-violet-500 to-pink-400',
    icon: '🤖',
  },
  {
    title: 'Mobile App Development',
    description: 'Cross-platform mobile apps for iOS and Android, designed for scale and user delight.',
    cta: 'Build My App',
    href: '/contact',
    bg: 'from-fuchsia-600 via-violet-500 to-sky-400',
    icon: '📱',
  },
  {
    title: 'SEO & Digital Transformation',
    description: 'Professional SEO, digital marketing, and transformation services to grow your business online.',
    cta: 'Boost My Growth',
    href: '/contact',
    bg: 'from-emerald-500 via-sky-400 to-violet-500',
    icon: '🚀',
  },
  {
    title: 'VitaranAI Distribution',
    description: 'AI-powered distributor management: inventory, orders, analytics. Trusted by India’s top networks.',
    cta: 'See VitaranAI',
    href: 'https://VitaranAI.in',
    bg: 'from-purple-700 via-sky-500 to-violet-400',
    icon: '🔗',
  },
];

export default function BannerRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((current) => (current + 1) % banners.length), 4200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl ring-1 ring-white/10">
      <AnimatePresence mode="wait">
        <motion.div
          key={banners[index].title}
          className={`relative flex h-[320px] md:h-[360px] items-center justify-center bg-gradient-to-br ${banners[index].bg}`}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={transition}
        >
          <div className="z-10 flex flex-col items-center justify-center text-center w-full px-8">
            <span className="mb-4 text-5xl md:text-6xl drop-shadow-lg animate-bounce-slow">{banners[index].icon}</span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-xl mb-2 animate-fade-in-up">
              {banners[index].title}
            </h3>
            <p className="mb-6 text-lg md:text-xl text-white/90 font-medium animate-fade-in-up delay-150">
              {banners[index].description}
            </p>
            <a
              href={banners[index].href}
              target={banners[index].href.startsWith('http') ? '_blank' : undefined}
              rel={banners[index].href.startsWith('http') ? 'noreferrer' : undefined}
              className="inline-block rounded-full bg-white/90 px-8 py-3 text-lg font-bold text-violet-700 shadow-lg ring-2 ring-white/30 transition hover:bg-gradient-to-r hover:from-violet-500 hover:to-sky-400 hover:text-white hover:scale-105 animate-fade-in-up delay-300"
            >
              {banners[index].cta}
            </a>
          </div>
          <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.25),transparent_70%)]" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-4 flex items-center gap-2 z-20">
        {banners.map((_, dot) => (
          <button
            key={dot}
            type="button"
            aria-label={`Show banner ${dot + 1}`}
            className={`h-2.5 w-8 rounded-full transition ${dot === index ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'bg-white/30'}`}
            onClick={() => setIndex(dot)}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.39, 0.575, 0.565, 1) both;
        }
        .delay-150 { animation-delay: 0.15s; }
        .delay-300 { animation-delay: 0.3s; }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2.8s infinite;
        }
      `}</style>
    </div>
  );
}
