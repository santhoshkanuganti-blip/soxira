
"use client";
import Navbar from '../components/Navbar';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-body relative z-10 bg-[#F3F0FF]">
      <Navbar />
      {/* Hero Section */}
      <Section className="flex flex-col items-center justify-center min-h-[80vh] text-center relative bg-[radial-gradient(circle_at_60%_40%,_#B39DDB_0%,_#F3F0FF_100%)] rounded-b-3xl shadow-lg overflow-hidden w-full p-0 m-0">
        <motion.h1
          className="text-4xl md:text-6xl font-heading font-bold text-[#232946] mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Engineering Intelligent Futures with AI Excellence
        </motion.h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#444] mb-8">
          Soxira AI Solutions delivers premium IT products, consulting, and enterprise AI services for the world’s most ambitious organizations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary">Get Started</Button>
          <Button variant="outline">Our Services</Button>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 gold-gradient">About Soxira</h2>
        <p className="max-w-2xl mx-auto text-lg text-silver mb-2">
          Soxira AI Solutions is a leader in AI-driven IT consulting and enterprise solutions. We empower businesses to innovate, scale, and secure their digital future with cutting-edge technology and 20+ years of expertise.
        </p>
      </Section>

      {/* Services Section */}
      <Section id="services">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 gold-gradient text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <h3 className="text-2xl font-heading gold-gradient mb-2">IT Products</h3>
            <p className="text-silver">Premium AI-powered software and platforms tailored for enterprise needs.</p>
          </Card>
          <Card>
            <h3 className="text-2xl font-heading gold-gradient mb-2">IT Consulting</h3>
            <p className="text-silver">Expert guidance for digital transformation, strategy, and innovation.</p>
          </Card>
          <Card>
            <h3 className="text-2xl font-heading gold-gradient mb-2">IT Services</h3>
            <p className="text-silver">End-to-end managed IT, support, and enterprise integration.</p>
          </Card>
        </div>
      </Section>

      {/* Why Choose Us Section */}
      <Section>
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 gold-gradient text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="flex flex-col items-center text-center py-8">
            <span className="text-4xl gold-gradient mb-2">🤖</span>
            <span className="font-heading text-xl mb-1">AI-first Approach</span>
            <span className="text-silver">We lead with AI innovation in every solution.</span>
          </Card>
          <Card className="flex flex-col items-center text-center py-8">
            <span className="text-4xl gold-gradient mb-2">📈</span>
            <span className="font-heading text-xl mb-1">Scalable Solutions</span>
            <span className="text-silver">Our platforms grow with your business.</span>
          </Card>
          <Card className="flex flex-col items-center text-center py-8">
            <span className="text-4xl gold-gradient mb-2">🔒</span>
            <span className="font-heading text-xl mb-1">Enterprise Security</span>
            <span className="text-silver">Security and compliance at every layer.</span>
          </Card>
          <Card className="flex flex-col items-center text-center py-8">
            <span className="text-4xl gold-gradient mb-2">🏆</span>
            <span className="font-heading text-xl mb-1">20+ Years Expertise</span>
            <span className="text-silver">Decades of proven IT leadership.</span>
          </Card>
        </div>
      </Section>

      {/* Industries Section */}
      <Section id="industries">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 gold-gradient text-center">Industries We Serve</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {['Construction', 'Healthcare', 'Retail', 'Logistics', 'Finance'].map((industry) => (
            <Card key={industry} className="flex flex-col items-center py-6 hover:gold-glow transition">
              <span className="font-heading text-xl gold-gradient mb-2">{industry}</span>
            </Card>
          ))}
        </div>
      </Section>

      {/* Featured Solutions Section */}
      <Section>
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 gold-gradient text-center">Featured Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <h3 className="text-xl font-heading gold-gradient mb-2">Distribution Management System</h3>
            <p className="text-silver">AI-driven logistics and supply chain optimization for enterprises.</p>
          </Card>
          <Card>
            <h3 className="text-xl font-heading gold-gradient mb-2">Inventory AI</h3>
            <p className="text-silver">Smart inventory tracking, forecasting, and automation.</p>
          </Card>
          <Card>
            <h3 className="text-xl font-heading gold-gradient mb-2">Voice Ordering</h3>
            <p className="text-silver">Futuristic voice-enabled order management for businesses.</p>
          </Card>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 gold-gradient text-center">Contact Us</h2>
        <form className="max-w-xl mx-auto p-8 flex flex-col gap-6 border-gold rounded-2xl shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #2E026D 0%, #6C2BD7 60%, #A259FF 100%)',
            boxShadow: '0 8px 40px 0 rgba(46,2,109,0.22), 0 1.5px 8px 0 rgba(108,43,215,0.13)'
          }}>
          <input
            type="text"
            placeholder="Name"
            className="bg-transparent border-b-2 border-silver focus:border-gold outline-none py-2 px-3 text-white placeholder-silver focus:gold-glow transition"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent border-b-2 border-silver focus:border-gold outline-none py-2 px-3 text-white placeholder-silver focus:gold-glow transition"
            required
          />
          <textarea
            placeholder="Message"
            className="bg-transparent border-b-2 border-silver focus:border-gold outline-none py-2 px-3 text-white placeholder-silver focus:gold-glow transition min-h-[120px]"
            required
          />
          <Button variant="primary" type="submit" className="w-full mt-2">Send Message</Button>
        </form>
      </Section>

      {/* Footer */}
      <footer className="w-full border-t gold-border py-6 text-center text-silver mt-8">
        <div className="font-heading text-lg gold-gradient mb-1">Soxira AI Solutions</div>
        <div className="text-sm">Innovating Intelligence. Delivering Excellence.</div>
      </footer>
    </div>
  );
}
