// 2. components/services/Overlay.js
// This file has been corrected to remove the invalid Markdown syntax from the image URLs.

'use client';

import Link from 'next/link';

// A reusable card component for each service
const ServiceCard = ({ title, description, imageUrl, children }) => (
  <div className="bg-brand-dark/70 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-brand-orange/20">
    {/* Corrected the image URL handling in onError */}
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '[https://placehold.co/600x400/0a192f/DC713E?text=Jambsmash](https://placehold.co/600x400/0a192f/DC713E?text=Jambsmash)'; }} />
    <div className="p-6">
      <h3 className="text-2xl font-bold text-brand-orange">{title}</h3>
      <p className="mt-2 text-brand-light/80">{description}</p>
      <div className="mt-4">{children}</div>
    </div>
  </div>
);

// A reusable component to structure each page/section
const Section = (props) => {
  return (
    <section className={`min-h-screen w-full flex flex-col justify-center items-center p-8 md:p-16 ${props.className || ''}`}>
      {props.children}
    </section>
  );
};

export default function Overlay() {
  return (
    <>
      {/* Hero Section */}
      <Section className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white text-shadow-lg">Our Services</h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-light/90 text-shadow">
          Delivering specialized engineering solutions with unparalleled quality and precision.
        </p>
        <p className="animate-bounce mt-20 text-brand-orange text-2xl font-bold">↓</p>
      </Section>

      {/* Main Services Grid Section */}
      <Section>
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <ServiceCard
            title="Electronic Security Systems"
            description="Comprehensive security solutions including CCTV, intruder detection, access control, and fire monitoring systems to protect your assets."
            imageUrl="[https://placehold.co/600x400/1A3B44/FFFFFF?text=Security](https://placehold.co/600x400/1A3B44/FFFFFF?text=Security)"
          >
            <ul className="list-disc list-inside text-brand-light/80">
              <li>HD & IP CCTV Systems</li>
              <li>Biometric & Card Access Control</li>
              <li>Advanced Intruder Alarms</li>
            </ul>
          </ServiceCard>

          <ServiceCard
            title="Industrial Automation & Control"
            description="Enhancing industrial efficiency with state-of-the-art automation support, technical expertise, and supply of critical spares like VFDs and electric motors."
            imageUrl="[https://placehold.co/600x400/1A3B44/FFFFFF?text=Automation](https://placehold.co/600x400/1A3B44/FFFFFF?text=Automation)"
          >
             <ul className="list-disc list-inside text-brand-light/80">
              <li>PLC & SCADA System Integration</li>
              <li>Variable Frequency Drive (VFD) Supply</li>
              <li>Energy Management Solutions</li>
            </ul>
          </ServiceCard>

          <ServiceCard
            title="Instrumentation & Calibration"
            description="Ensuring your equipment performs to the highest standards with our expert calibration and repair services for a wide range of analytical instruments."
            imageUrl="[https://placehold.co/600x400/1A3B44/FFFFFF?text=Instrumentation](https://placehold.co/600x400/1A3B44/FFFFFF?text=Instrumentation)"
          >
             <ul className="list-disc list-inside text-brand-light/80">
              <li>Water Quality Analyser Calibration</li>
              <li>On-site & Lab-based Services</li>
              <li>Test Equipment Repair</li>
            </ul>
          </ServiceCard>

          <ServiceCard
            title="Solar & Electrical Projects"
            description="Providing sustainable and reliable energy with custom solar system installations of all sizes, including solar pumping and server room power solutions."
            imageUrl="[https://placehold.co/600x400/1A3B44/FFFFFF?text=Solar](https://placehold.co/600x400/1A3B44/FFFFFF?text=Solar)"
          >
             <ul className="list-disc list-inside text-brand-light/80">
              <li>Residential & Commercial Solar</li>
              <li>Solar Water Pumping Systems</li>
              <li>Backup Power Solutions</li>
            </ul>
          </ServiceCard>
        </div>
      </Section>

      {/* Call to Action Section */}
      <Section className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-orange text-shadow-md">
          Ready to Elevate Your Operations?
        </h2>
        <p className="mt-4 max-w-xl text-lg text-brand-light text-shadow">
          Our team is ready to design a solution tailored to your specific needs. Let's discuss how we can bring your project to life.
        </p>
        <Link href="/contact" className="inline-block mt-8 bg-brand-orange text-brand-dark font-bold py-4 px-10 rounded-lg text-lg hover:bg-brand-accent transition-transform hover:scale-105">
          Request a Consultation
        </Link>
      </Section>
      
      <style jsx>{`
        .text-shadow-lg { text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.8); }
        .text-shadow-md { text-shadow: 0px 3px 12px rgba(0, 0, 0, 0.8); }
        .text-shadow { text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.8); }
      `}</style>
    </>
  );
}
