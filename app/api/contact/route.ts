import { siteConfig } from '@/config/site';

type ContactPayload = {
  name: string;
  email: string;
  requirement: string;
  website?: string;
};

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

type ContactEmailInput = {
  fromEmail: string;
  recipients: string[];
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  existing.count += 1;
  rateLimitStore.set(key, existing);
  return false;
}

function parseSmtpPort(value: string | undefined): number {
  const parsed = Number.parseInt(value || '', 10);
  return Number.isFinite(parsed) ? parsed : 465;
}

function shouldUseSmtp(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );
}

function hasResendConfig(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

async function sendWithSmtp(input: ContactEmailInput): Promise<void> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error('SMTP settings are incomplete.');
  }

  const smtpPort = parseSmtpPort(process.env.SMTP_PORT);
  const smtpSecure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === 'true'
    : smtpPort === 465;

  const nodemailer = await import('nodemailer');

  const transport = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transport.sendMail({
    from: input.fromEmail,
    to: input.recipients,
    replyTo: input.replyTo,
    subject: input.subject,
    text: input.text,
    html: input.html,
  });
}

async function sendWithResend(input: ContactEmailInput): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    throw new Error('RESEND_API_KEY is missing.');
  }

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: input.fromEmail,
      to: input.recipients,
      reply_to: input.replyTo,
      subject: input.subject,
      text: input.text,
      html: input.html,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    throw new Error(`Resend API error ${resendResponse.status}: ${errorText}`);
  }
}

function normalizeRecipient(value: string): string | null {
  const cleaned = value.trim().toLowerCase();
  if (!cleaned) {
    return null;
  }

  if (cleaned.includes('@')) {
    return cleaned;
  }

  // Allow plain domains such as "soxirasolutions.com" by converting to info@domain.
  if (/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(cleaned)) {
    return `info@${cleaned}`;
  }

  return null;
}

function getRecipients(): string[] {
  const rawRecipients = process.env.CONTACT_NOTIFICATION_RECIPIENTS
    ? process.env.CONTACT_NOTIFICATION_RECIPIENTS.split(',')
    : siteConfig.contact.leadRecipients;

  const recipients = rawRecipients
    .map((value) => normalizeRecipient(value))
    .filter((value): value is string => Boolean(value));

  return [...new Set(recipients)];
}

function isValidPayload(payload: ContactPayload): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const name = payload.name?.trim() || '';
  const email = payload.email?.trim() || '';
  const requirement = payload.requirement?.trim() || '';
  const website = payload.website?.trim() || '';

  return Boolean(
    name &&
      requirement &&
      name.length <= 120 &&
      requirement.length <= 5000 &&
      email.length <= 320 &&
      emailRegex.test(email) &&
      website.length === 0
  );
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return Response.json(
        { message: 'Too many requests. Please wait a few minutes and try again.' },
        { status: 429 }
      );
    }

    const payload = (await request.json()) as ContactPayload;

    if (!isValidPayload(payload)) {
      return Response.json(
        { message: 'Please enter a valid name, email, and requirement.' },
        { status: 400 }
      );
    }

    const fromEmail = process.env.CONTACT_FROM_EMAIL || `Soxira Contact <${siteConfig.contact.email}>`;
    const recipients = getRecipients();

    if (recipients.length === 0) {
      console.error('Contact form configuration missing.');
      return Response.json(
        { message: 'Contact service is not configured yet. Please try again shortly.' },
        { status: 500 }
      );
    }

    const name = payload.name.trim();
    const email = payload.email.trim();
    const requirement = payload.requirement.trim();

    const subject = `New consultation request from ${name}`;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeRequirement = escapeHtml(requirement).replace(/\n/g, '<br />');

    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Requirement:</strong></p>
      <p>${safeRequirement}</p>
    `;

    const text = [
      'New Contact Form Submission',
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Requirement:',
      requirement,
    ].join('\n');

    const emailInput: ContactEmailInput = {
      fromEmail,
      recipients,
      replyTo: email,
      subject,
      text,
      html,
    };

    if (!shouldUseSmtp() && !hasResendConfig()) {
      return Response.json(
        { message: 'SMTP is not configured yet. Add SMTP_PASS in .env.local and restart the server.' },
        { status: 500 }
      );
    }

    try {
      if (shouldUseSmtp()) {
        await sendWithSmtp(emailInput);
      } else {
        await sendWithResend(emailInput);
      }
    } catch (error) {
      console.error('Contact email send error', error);
      return Response.json(
        { message: 'Unable to send your message right now. Please try again later.' },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Contact route error', error);
    return Response.json(
      { message: 'Unable to process your request right now. Please try again later.' },
      { status: 500 }
    );
  }
}
