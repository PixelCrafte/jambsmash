// 3. components/about/Overlay.js
// This is the comprehensive overlay for the About page.

'use client';

import Link from 'next/link';

// A reusable component for structuring each section
const Section = (props) => (
  <section className={`min-h-screen w-full flex flex-col justify-center items-center p-8 md:p-16 ${props.className || ''}`}>
    <div className="w-full max-w-4xl">
      {props.children}
    </div>
  </section>
);

// A card for displaying core values
const ValueCard = ({ title, description }) => (
    <div className="bg-brand-dark/50 p-6 rounded-lg border border-brand-orange/20">
        <h4 className="text-xl font-bold text-brand-orange">{title}</h4>
        <p className="mt-2 text-brand-light/80">{description}</p>
    </div>
);

// A card for displaying director profiles
const DirectorCard = ({ name, qualifications }) => (
    <div className="text-center bg-brand-dark/70 backdrop-blur-md p-8 rounded-xl shadow-lg border border-brand-orange/30">
        <img src={`https://placehold.co/150x150/0a192f/DC713E?text=${name.charAt(0)}`} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-brand-orange" />
        <h3 className="text-2xl font-bold text-white">{name}</h3>
        <div className="mt-2 text-brand-accent">
            {qualifications.map((q, i) => <p key={i}>{q}</p>)}
        </div>
    </div>
);

export default function Overlay() {
  return (
    <>
      {/* Hero Section */}
      <Section className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white text-shadow-lg">Our Story</h1>
        <p className="mt-4 max-w-3xl text-lg text-brand-light/90 text-shadow">
          Founded in 2020, Jambstronics Technologies is a technically and professionally supported company driven by a passion for serving industry, small businesses, and domestic clients with high-end engineering solutions.
        </p>
        <p className="animate-bounce mt-20 text-brand-orange text-2xl font-bold">↓</p>
      </Section>

      {/* Mission and Vision Section */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
            <div>
                <h2 className="text-4xl font-bold text-brand-orange mb-4">Our Vision</h2>
                <p className="text-lg text-brand-light/90">To be the global leader in Telecommunication, automation, instrumentation and Electrical systems engineering through the provision of unparalleled, quality and timely service.</p>
            </div>
            <div>
                <h2 className="text-4xl font-bold text-brand-orange mb-4">Our Mission</h2>
                <p className="text-lg text-brand-light/90">To provide added value solutions through a no-compromise quality engineering approach that sustains long term reliability and functionality for our clients.</p>
            </div>
        </div>
      </Section>

      {/* Core Values Section */}
      <Section>
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ValueCard title="Innovation" description="We understand the importance of innovation in meeting the ever-changing needs of our customers." />
            <ValueCard title="Honesty" description="We are honest professionals who understand the importance of our business, exceeding expectations and avoiding politics." />
            <ValueCard title="Energy" description="Our spirited energy and engagement are evident in our commitment to our work and passion for what we do." />
            <ValueCard title="Customer Success" description="We know our customers' success is paramount to our own, based on our ability to talk openly and set clear targets." />
        </div>
      </Section>

      {/* Directors Section */}
      <Section>
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Meet Our Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <DirectorCard name="Pride Mashiyani" qualifications={["B.Tech Electronic Engineering", "HND Electrical Power Engineering"]} />
            <DirectorCard name="Wilbert Magaramagara" qualifications={["M.Sc Project Management", "M.Tech Sensor Technology"]} />
        </div>
      </Section>
      
      <style jsx>{`
        .text-shadow-lg { text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.8); }
        .text-shadow { text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.8); }
      `}</style>
    </>
  );
}

