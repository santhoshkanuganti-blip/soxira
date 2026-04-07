import { siteConfig } from '@/config/site';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `https://${siteConfig.domain}/sitemap.xml`,
    host: `https://${siteConfig.domain}`,
  };
}
