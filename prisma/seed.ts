import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding Soxira database…');

  // ── Admin User ──────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash('Soxira@Admin2025', 12);
  await db.user.upsert({
    where: { email: 'admin@soxira.com' },
    update: {},
    create: { email: 'admin@soxira.com', name: 'Soxira Admin', role: 'SUPER_ADMIN', password: adminPassword, active: true },
  });
  console.log('✅ Admin user: admin@soxira.com / Soxira@Admin2025');

  // ── Leadership ──────────────────────────────────────────────────
  const leaders = [
    {
      name: 'Kulkarni Vinuthna',
      designation: 'Founder & Chief Executive Officer (CEO)',
      bio: `Visionary entrepreneur and business leader passionate about transforming Indian businesses through Artificial Intelligence, Digital Transformation, and Intelligent Automation.

As Founder & CEO of Soxira AI Solutions, Vinuthna leads the vision of empowering MSMEs, distributors, manufacturers, financial institutions, and enterprises with next-generation AI-powered platforms.

Under her leadership, Soxira is building innovative solutions like VitaranAI, an AI-driven business operating platform that helps organizations digitize procurement, inventory, sales, vendor management, and enterprise operations.`,
      expertise: ['Business Strategy', 'AI Transformation', 'Enterprise SaaS', 'Product Innovation', 'Strategic Partnerships', 'Finance & Insurance', 'MSME Solutions'],
      quote: 'To make intelligent technology accessible to every Indian business and enable them to digitize, automate, and scale with confidence.',
      linkedinUrl: 'https://www.linkedin.com/company/soxira-ai-solutions',
      displayOrder: 1,
    },
    {
      name: 'Santhosh K',
      designation: 'Chief AI & Product Officer',
      bio: `Technology and product leader with 20+ years of experience in enterprise software development, cloud technologies, data engineering, and AI-driven business solutions.

Leading AI strategy, product innovation, and the vision behind VitaranAI, helping Indian businesses move from manual operations to intelligent automation.`,
      expertise: ['Artificial Intelligence', 'Generative AI', 'Product Strategy', 'Data Engineering', 'Snowflake', 'DBT', 'Cloud Architecture', 'Enterprise Platforms'],
      quote: 'AI should not be limited to large enterprises. Every Indian business deserves intelligent technology.',
      linkedinUrl: 'https://www.linkedin.com/company/soxira-ai-solutions',
      displayOrder: 2,
    },
    {
      name: 'Praveen Kumar Gambheera Rao',
      designation: 'Chief Technology Officer (CTO)',
      bio: `Technology leader with 25+ years of experience in enterprise applications, Oracle ERP, Oracle Fusion Cloud, Finance, HRMS and Supply Chain Management.

At Soxira AI Solutions, Praveen leads technology strategy, enterprise architecture, and scalable AI-powered platforms.

He plays a key role in advancing VitaranAI and helping organizations modernize operations through intelligent automation and cloud technologies.`,
      expertise: ['Enterprise Architecture', 'Oracle ERP', 'Oracle Fusion Cloud', 'Cloud Technologies', 'Finance Systems', 'Supply Chain', 'HRMS', 'Digital Transformation'],
      quote: 'Technology should simplify complexity and accelerate business growth.',
      linkedinUrl: 'https://www.linkedin.com/company/soxira-ai-solutions',
      displayOrder: 3,
    },
  ];

  for (const leader of leaders) {
    await db.leadership.upsert({
      where: { id: `seed-leader-${leader.displayOrder}` },
      update: {},
      create: { id: `seed-leader-${leader.displayOrder}`, ...leader, active: true },
    });
  }
  console.log('✅ Leadership team seeded');

  // ── Promotions ──────────────────────────────────────────────────
  const promotions = [
    {
      title: 'Introducing VitaranAI',
      description: 'AI-powered operating system for Indian MSMEs and Distributors. Transform procurement, inventory, sales and analytics.',
      ctaText: 'Learn More',
      ctaUrl: '/distributor-management-software',
    },
    {
      title: 'AI Solutions for Finance & Insurance',
      description: 'Transforming BFSI organizations through AI, Cloud and Intelligent Automation. Reduce risk, improve efficiency.',
      ctaText: 'Explore',
      ctaUrl: '/contact',
    },
    {
      title: 'AI-Powered Procurement Automation',
      description: 'Automate purchase requisitions, approvals, vendors and procurement workflows. Save time and reduce costs.',
      ctaText: 'View Demo',
      ctaUrl: '/contact',
    },
  ];

  for (let i = 0; i < promotions.length; i++) {
    await db.promotion.upsert({
      where: { id: `seed-promo-${i + 1}` },
      update: {},
      create: { id: `seed-promo-${i + 1}`, ...promotions[i], active: true },
    });
  }
  console.log('✅ Promotions seeded');

  // ── Product ──────────────────────────────────────────────────────
  await db.product.upsert({
    where: { slug: 'vitaranai' },
    update: {},
    create: {
      name: 'VitaranAI',
      slug: 'vitaranai',
      tagline: 'AI-Powered Operating System for Indian Businesses',
      description: 'VitaranAI is a comprehensive AI-powered business operating platform designed specifically for Indian MSMEs, distributors, and manufacturers. It brings intelligence to every business operation — from procurement and inventory to sales, vendor management, and analytics.',
      features: ['Procurement Automation', 'Inventory Management', 'Vendor Management', 'Sales Tracking', 'Analytics & Insights', 'AI Automation', 'Supply Chain Optimization', 'Route Planning'],
      benefits: ['Reduce manual effort by 70%', 'Real-time inventory visibility', 'Automated procurement workflows', 'AI-powered demand forecasting', 'Multi-branch management', 'Mobile-ready platform'],
      industryTags: ['MSMEs', 'Distributors', 'Manufacturing', 'Cement & Steel', 'Medical Distribution', 'LPG Distribution', 'Finance', 'Insurance'],
      ctaText: 'Explore VitaranAI',
      ctaUrl: 'https://VitaranAI.in',
      displayOrder: 1,
      active: true,
    },
  });
  console.log('✅ VitaranAI product seeded');

  await db.product.upsert({
    where: { slug: 'saop' },
    update: {},
    create: {
      name: 'SAOP',
      slug: 'saop',
      tagline: 'Soxira AI Orchestration Platform — In Active Development',
      description: 'SAOP connects your existing business systems, orchestrates workflows across procurement, inventory, sales and production, and lets specialized AI agents monitor, predict and recommend — grounded in your own enterprise data.',
      features: ['AI Agent Engine', 'Workflow Engine', 'Connector Manager', 'Planning Engine', 'Business Rules', 'Knowledge Base (RAG)', 'Analytics & Dashboards', 'Security & Access Control'],
      benefits: ['Unifies fragmented systems into one orchestration layer', 'Specialized agents for procurement, inventory, sales, production', 'Every recommendation validated against approvals and compliance', 'Deployable as SaaS Cloud, Dedicated Cloud, or Customer Hosted'],
      industryTags: ['Manufacturing', 'Distribution', 'Finance', 'Insurance', 'Enterprise Operations'],
      ctaText: 'Explore SAOP',
      ctaUrl: '/saop-platform',
      displayOrder: 2,
      active: true,
    },
  });
  console.log('✅ SAOP product seeded');

  // ── Case Studies ─────────────────────────────────────────────────
  const caseStudies = [
    {
      industry: 'Cement & Steel',
      customerName: 'Leading Cement Distributor, Telangana',
      challenge: 'Manual order management and inventory tracking across 50+ dealers led to stockouts, delivery delays, and revenue leakage.',
      solution: 'Implemented VitaranAI with real-time inventory tracking, automated order processing, and AI-powered demand forecasting across all dealer locations.',
      benefits: ['Eliminated stockouts by 85%', 'Reduced order processing time from 4 hours to 15 minutes', 'Improved delivery accuracy to 98%', 'Real-time visibility across all depots'],
      metrics: { 'Stockout Reduction': '85%', 'Order Processing': '15 min', 'Revenue Growth': '28%', 'ROI': '3.5x' },
    },
    {
      industry: 'Medical Distribution',
      customerName: 'Medical Distributor, Hyderabad',
      challenge: 'Complex drug inventory management with expiry tracking, cold chain compliance, and regulatory reporting was entirely manual.',
      solution: 'Deployed AI-powered inventory system with automatic expiry alerts, cold chain monitoring, and regulatory compliance reporting.',
      benefits: ['Zero expiry waste', 'Full regulatory compliance', 'Reduced inventory holding costs by 30%', 'Automated FIFO management'],
      metrics: { 'Expiry Waste': '0%', 'Compliance': '100%', 'Cost Reduction': '30%', 'Efficiency': '60%↑' },
    },
    {
      industry: 'Commercial LPG',
      customerName: 'LPG Distributor Network, Andhra Pradesh',
      challenge: 'Route optimization for cylinder delivery across 200+ delivery points was inefficient, causing high fuel costs and missed deliveries.',
      solution: 'AI-powered route optimization with real-time tracking, automated delivery scheduling, and customer notification system.',
      benefits: ['Reduced fuel costs by 35%', '100% on-time delivery', 'Optimized delivery routes', 'Customer SMS notifications'],
      metrics: { 'Fuel Savings': '35%', 'On-Time': '100%', 'Routes Optimized': '200+', 'Customer Satisfaction': '4.8/5' },
    },
  ];

  for (let i = 0; i < caseStudies.length; i++) {
    await db.caseStudy.upsert({
      where: { id: `seed-cs-${i + 1}` },
      update: {},
      create: { id: `seed-cs-${i + 1}`, ...caseStudies[i], images: [], active: true },
    });
  }
  console.log('✅ Case studies seeded');

  // ── Testimonials ─────────────────────────────────────────────────
  const testimonials = [
    {
      customerName: 'Rajesh Agarwal',
      designation: 'Managing Director',
      company: 'Agarwal Cement Distributors',
      review: 'VitaranAI transformed our distribution operations completely. What used to take our team 4 hours of manual work every morning is now automated. Our order accuracy has improved dramatically.',
      rating: 5,
      industry: 'Cement & Steel',
    },
    {
      customerName: 'Dr. Suresh Reddy',
      designation: 'Director',
      company: 'MedPharma Distributors',
      review: 'The AI-powered inventory management from Soxira eliminated our expiry waste problem entirely. The compliance reporting saves us hours every month.',
      rating: 5,
      industry: 'Medical Distribution',
    },
    {
      customerName: 'Venkat Rao',
      designation: 'Operations Head',
      company: 'Southern LPG Network',
      review: 'Soxira\'s route optimization AI reduced our fuel costs by 35% in the first quarter itself. The ROI was clear within 3 months of implementation.',
      rating: 5,
      industry: 'Commercial LPG',
    },
  ];

  for (let i = 0; i < testimonials.length; i++) {
    await db.testimonial.upsert({
      where: { id: `seed-t-${i + 1}` },
      update: {},
      create: { id: `seed-t-${i + 1}`, ...testimonials[i], active: true },
    });
  }
  console.log('✅ Testimonials seeded');

  // ── Blog Post ────────────────────────────────────────────────────
  await db.blog.upsert({
    where: { slug: 'ai-transformation-indian-msmes' },
    update: {},
    create: {
      title: 'How AI is Transforming Indian MSMEs: A Practical Guide',
      slug: 'ai-transformation-indian-msmes',
      excerpt: 'Indian MSMEs are at an inflection point. AI is no longer just for large enterprises — discover how small and medium businesses are using AI to compete and grow.',
      category: 'AI',
      tags: ['AI', 'MSMEs', 'Digital Transformation', 'India'],
      content: '<h2>The AI Revolution for Indian MSMEs</h2><p>India\'s 63 million MSMEs form the backbone of the economy, contributing 30% of GDP and employing over 110 million people. Yet, most of these businesses operate with manual processes, paper-based systems, and outdated workflows that limit their growth potential.</p><h2>Key AI Applications for MSMEs</h2><h3>1. Procurement Automation</h3><p>AI can automate purchase requisitions, vendor selection, approval workflows, and purchase order generation — reducing procurement cycle time by up to 70%.</p><h3>2. Inventory Intelligence</h3><p>Machine learning models can predict demand patterns, optimize stock levels, and prevent stockouts or overstocking situations that tie up working capital.</p><h3>3. Sales & Collections</h3><p>AI-powered CRM systems can prioritize sales leads, automate follow-ups, and predict payment defaults — improving cash flow management.</p><h2>Getting Started with AI</h2><p>The journey to AI transformation doesn\'t require a large IT team or massive budget. Platforms like VitaranAI are specifically designed for Indian MSMEs, offering enterprise-grade AI capabilities at SME-friendly pricing.</p><p>The first step is to identify one manual process that consumes significant time and automate it. Start small, measure results, and scale.</p><h2>Conclusion</h2><p>AI is no longer optional for Indian MSMEs that want to compete and grow. The businesses that adopt intelligent automation today will have a significant competitive advantage in the years ahead.</p>',
      featured: true,
      status: 'published',
      publishedAt: new Date(),
      author: 'Santhosh K, Chief AI & Product Officer',
      seoTitle: 'How AI is Transforming Indian MSMEs | Soxira AI Solutions',
      seoDesc: 'Discover how Indian MSMEs are using AI to automate procurement, optimize inventory, and scale operations. A practical guide from Soxira AI Solutions.',
    },
  });
  console.log('✅ Sample blog post seeded');

  console.log('\n🎉 Seed complete! Access admin at: http://localhost:3000/admin');
  console.log('   Email: admin@soxira.com');
  console.log('   Password: Soxira@Admin2025');
  console.log('\n⚠️  Change the admin password immediately after first login!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
