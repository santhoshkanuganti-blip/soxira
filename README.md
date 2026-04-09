This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Recommended deployment steps

1. Install dependencies:

```bash
npm install
```

2. Build and preview locally:

```bash
npm run build
npm run start
```

3. Connect the repository to Vercel and deploy.

### Vercel environment variables

This site sends contact form submissions from the server and supports two delivery options:

1. SMTP (recommended for Hostinger mailboxes such as `info@soxira.com`)
2. Resend API fallback

Required for all setups:

- `CONTACT_FROM_EMAIL` (example: `Soxira Contact <info@soxira.com>`)
- `CONTACT_NOTIFICATION_RECIPIENTS` (optional comma-separated list, defaults to info inboxes)

SMTP option:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE` (`true` for SSL/465, typically)
- `SMTP_USER`
- `SMTP_PASS`

Resend option (used when SMTP is not configured):

- `RESEND_API_KEY`

A ready-to-use template is available in `.env.example`.

### Hostinger Production Setup

If your website and mailbox are on Hostinger (`soxira.com`, `info@soxira.com`), use SMTP.

1. Copy `.env.example` to `.env.local` for local development.
2. Set `SMTP_PASS` to your real mailbox password for `info@soxira.com`.
3. Keep this password only in environment variables, never in Git.
4. In production hosting, add the same variables in your hosting environment settings:
	- `CONTACT_FROM_EMAIL`
	- `CONTACT_NOTIFICATION_RECIPIENTS`
	- `SMTP_HOST`
	- `SMTP_PORT`
	- `SMTP_SECURE`
	- `SMTP_USER`
	- `SMTP_PASS`

Recommended SMTP values for Hostinger:

- `SMTP_HOST=smtp.hostinger.com`
- `SMTP_PORT=465`
- `SMTP_SECURE=true`
- `SMTP_USER=info@soxira.com`

Production-grade checklist:

1. Use a strong mailbox password and rotate it periodically.
2. Enable SPF, DKIM, and DMARC for `soxira.com` DNS.
3. Keep `CONTACT_NOTIFICATION_RECIPIENTS` restricted to internal inboxes.
4. Monitor logs for `429` responses (rate-limit) and repeated failures.

### Google Search Console & Analytics

1. Submit the generated sitemap at `https://soxira.com/sitemap.xml`.
2. Add the site to Google Search Console and verify ownership.
3. Use the Search Console URL inspection tool to request indexing for the homepage and key pages.
4. Install Google Analytics or Google Tag Manager in the app if desired.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
