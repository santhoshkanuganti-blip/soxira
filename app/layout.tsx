import type { Metadata } from 'next';
import { Inter, Orbitron, Poppins, Space_Grotesk } from 'next/font/google';
import ChatBot from '@/components/ChatBot';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import PromoBar from '@/components/PromoBar';
import { db } from '@/lib/db';
import './globals.css';

const headingFont = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-heading' });
const orbitronFont = Orbitron({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-orbitron' });
const bodyFont = Inter({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-body' });
const poppinsFont = Poppins({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-poppins' });

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
