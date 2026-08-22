// Several admin-editable fields (Promotion.bannerUrl, Product.imageUrl, Leadership.imageUrl,
// Blog.imageUrl, Testimonial.photo, CaseStudy.images) are free-text URL inputs, not file uploads.
// next/image throws a hard render error — crashing the whole page — for any host not listed in
// next.config.ts's images.remotePatterns. This keeps a typo'd or wrong URL from taking a page down:
// callers get null back and skip the image instead of crashing.
const ALLOWED_IMAGE_HOSTS = ['res.cloudinary.com'];

export function safeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const { protocol, hostname } = new URL(url);
    if (protocol !== 'https:') return null;
    return ALLOWED_IMAGE_HOSTS.includes(hostname) ? url : null;
  } catch {
    return null;
  }
}
