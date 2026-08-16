import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { db } from '@/lib/db';

// Keep in sync with the INDUSTRIES keys in app/industries/[slug]/page.tsx
const INDUSTRY_SLUGS = ['msmes', 'distributors', 'manufacturing', 'finance', 'insurance', 'healthcare'];

// Keep in sync with the SOLUTIONS keys in app/solutions/[slug]/page.tsx
const SOLUTION_SLUGS = [
  'oracle-scm-for-manufacturing',
  'oracle-financials-for-finance',
  'cloud-migration-for-insurance',
  'ai-dashboards-for-finance',
  'data-engineering-for-insurance',
  'cloud-migration-for-healthcare',
];

// Keep in sync with the COMPARISONS keys in app/compare/[slug]/page.tsx
const COMPARISON_SLUGS = [
  'oracle-fusion-cloud-vs-sap-s4hana',
  'vitaranai-vs-legacy-distribution-management',
];

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '', changeFrequency: 'daily', priority: 1.0 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog', changeFrequency: 'daily', priority: 0.7 },
  { path: '/case-studies', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/distributor-management-software', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/saop-platform', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/product-development-company', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/cloud-migration-services', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/data-engineering-snowflake-dbt', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/ai-dashboard-consulting', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/oracle-erp', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/oracle-erp/finance', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/oracle-erp/scm', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/oracle-erp/hcm', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/oracle-fusion-cloud', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/oracle-fusion-cloud/financials', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/oracle-fusion-cloud/scm', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/oracle-fusion-cloud/hcm', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/oracle-integration-cloud', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/oracle-implementation-services', changeFrequency: 'weekly', priority: 0.85 },
];

async function getPublishedBlogSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  try {
    return await db.blog.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true },
    });
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://${siteConfig.domain}`;
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const industryEntries: MetadataRoute.Sitemap = INDUSTRY_SLUGS.map((slug) => ({
    url: `${baseUrl}/industries/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const solutionEntries: MetadataRoute.Sitemap = SOLUTION_SLUGS.map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const comparisonEntries: MetadataRoute.Sitemap = COMPARISON_SLUGS.map((slug) => ({
    url: `${baseUrl}/compare/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogSlugs = await getPublishedBlogSlugs();
  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map(({ slug, updatedAt }) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...industryEntries, ...solutionEntries, ...comparisonEntries, ...blogEntries];
}
