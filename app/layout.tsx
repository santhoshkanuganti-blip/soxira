import type { Metadata } from 'next';
import localFont from 'next/font/local';
import ChatBot from '@/components/ChatBot';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import PromoBar from '@/components/PromoBar';
import { db } from '@/lib/db';
import './globals.css';

// Fonts are self-hosted from the @fontsource packages so the build never
// depends on fetching from Google Fonts (which intermittently fails on Vercel).
const headingFont = localFont({
  src: [
    { path: '../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-heading',
  display: 'swap',
});
const orbitronFont = localFont({
  src: [
    { path: '../node_modules/@fontsource/orbitron/files/orbitron-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../node_modules/@fontsource/orbitron/files/orbitron-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-orbitron',
  display: 'swap',
});
const bodyFont = localFont({
  src: [
    { path: '../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
});
const poppinsFont = localFont({
  src: [
    { path: '../node_modules/@fontsource/poppins/files/poppins-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../node_modules/@fontsource/poppins/files/poppins-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Soxira AI Solutions',
  description: 'AI, Cloud, Data Engineering and Product Development services for enterprises and distributors.',
  metadataBase: new URL('https://www.soxira.com'),
};

async function getActivePromoBarPromotions() {
  try {
    return await db.promotion.findMany({
      where: {
        active: true,
        OR: [{ endDate: null }, { endDate: { gte: new Date() } }],
      },
      orderBy: { createdAt: 'desc' },
      select: { title: true, description: true, ctaText: true, ctaUrl: true },
    });
  } catch {
    return [];
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const promos = await getActivePromoBarPromotions();

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${headingFont.variable} ${orbitronFont.variable} ${bodyFont.variable} ${poppinsFont.variable} h-full antialiased`}>
      <body className="font-body min-h-screen bg-paper text-ink overflow-x-hidden">
        <PromoBar promos={promos} />
        {children}
        <ChatBot />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
