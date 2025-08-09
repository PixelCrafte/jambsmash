'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, Users, Award, Target, Lightbulb, Shield, Zap, Sun, Globe, Leaf, Building, Factory, Home, Briefcase, ChevronRight, Star, CheckCircle } from 'lucide-react';

// Mock components for Navbar and Footer
const Navbar = () => <nav className="fixed top-0 w-full z-50 bg-brand-dark/20 backdrop-blur-xl border-b border-brand-orange/20 h-16"></nav>;
const Footer = () => <footer className="w-full bg-brand-dark/20 backdrop-blur-xl border-t border-brand-orange/20 h-20"></footer>;

// Animated typing effect component
const TypeWriter = ({ text, delay = 100, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span className={className}>{displayText}<span className="animate-pulse">|</span></span>;
};

// Intersection Observer hook for animations
const useInView = (threshold = 0.1) => {
  const [inView, setInView] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [element, threshold]);

  return [setElement, inView];
};

// Enhanced Section component with animations
const Section = ({ children, className = "", id = "" }) => {
  const [ref, inView] = useInView(0.2);

  return (
    <section 
      ref={ref}
      id={id}
      className={`min-h-screen w-full flex flex-col justify-center items-center p-4 md:p-8 lg:p-16 relative transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      } ${className}`}
    >
      <div className="w-full max-w-7xl">
        {children}
      </div>
    </section>
  );
};

// Premium value card with hover effects
const ValueCard = ({ title, description, icon: Icon, delay = 0 }) => {
  const [ref, inView] = useInView(0.3);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      ref={ref}
      className={`group relative overflow-hidden bg-brand-dark/40 backdrop-blur-2xl p-8 lg:p-10 rounded-3xl border transition-all duration-700 cursor-pointer ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      } ${
        isHovered ? 'border-brand-orange/80 scale-105 shadow-2xl shadow-brand-orange/20' : 'border-brand-orange/20 hover:border-brand-orange/60'
      }`}
      style={{ 
        transitionDelay: `${delay}ms`,
        background: 'linear-gradient(135deg, rgba(26, 59, 68, 0.1) 0%, rgba(10, 25, 47, 0.15) 100%)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-brand-accent/5 opacity-0 transition-opacity duration-700 ${
        isHovered ? 'opacity-100' : ''
      }`}></div>
      
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-brand-orange/20 to-brand-accent/20 rounded-3xl blur opacity-0 transition-opacity duration-700 ${
        isHovered ? 'opacity-100' : ''
      }`}></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div className={`p-4 rounded-2xl bg-brand-orange/10 backdrop-blur-sm border border-brand-orange/30 transition-all duration-500 mr-6 ${
            isHovered ? 'bg-brand-orange/20 border-brand-orange/60 scale-110' : ''
          }`}>
            <Icon className={`w-8 h-8 transition-colors duration-500 ${
              isHovered ? 'text-brand-orange' : 'text-brand-orange/80'
            }`} />
          </div>
          <h4 className={`text-2xl lg:text-3xl font-bold transition-colors duration-500 ${
            isHovered ? 'text-brand-orange' : 'text-white'
          }`}>
            {title}
          </h4>
        </div>
        <p className={`text-lg lg:text-xl text-brand-light/90 leading-relaxed transition-colors duration-300 ${
          isHovered ? 'text-brand-light' : ''
        }`}>
          {description}
        </p>
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-brand-orange/20 to-transparent"></div>
    </div>
  );
};

// Enhanced director card with 3D hover effect
const DirectorCard = ({ name, qualifications, image, delay = 0 }) => {
  const [ref, inView] = useInView(0.3);

  return (
    <div 
      ref={ref}
      className={`group relative perspective-1000 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative transform-gpu transition-all duration-700 group-hover:rotate-y-6 group-hover:scale-105">
        <div className="relative overflow-hidden bg-brand-dark/10 backdrop-blur-2xl p-8 lg:p-10 rounded-3xl shadow-2xl border border-brand-orange/20 group-hover:border-brand-orange/80 group-hover:shadow-brand-orange/30"
             style={{ background: 'linear-gradient(135deg, rgba(26, 59, 68, 0.15) 0%, rgba(10, 25, 47, 0.2) 100%)' }}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-brand-orange via-brand-accent to-brand-orange bg-size-400 animate-gradient-x"></div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="relative inline-block mb-8">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-r from-brand-orange to-brand-accent p-1 group-hover:scale-110 transition-transform duration-500">
                <img 
                  src={image || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face`} 
                  alt={name}
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => { 
                    e.currentTarget.onerror = null; 
                    e.currentTarget.src = `https://placehold.co/200x200/1A3B44/DC713E?text=${name.charAt(0)}`; 
                  }}
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-accent rounded-full animate-bounce"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-brand-orange rounded-full animate-pulse"></div>
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-brand-light bg-clip-text text-transparent mb-6 group-hover:scale-105 transition-transform duration-300">
              {name}
            </h3>
            
            <div className="space-y-3">
              {qualifications.map((qualification, i) => (
                <div 
                  key={i}
                  className="inline-block bg-brand-orange/10 backdrop-blur-sm px-4 py-2 rounded-full text-brand-accent font-medium text-sm border border-brand-orange/30 group-hover:border-brand-orange/60 transition-colors duration-300 m-1"
                >
                  {qualification}
                </div>
              ))}
            </div>
          </div>
          
          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-orange/20 to-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        </div>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ number, label, icon: Icon, delay = 0 }) => {
  const [ref, inView] = useInView(0.3);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const target = parseInt(number);
      const duration = 2000;
      const steps = 50;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, number]);

  return (
    <div 
      ref={ref}
      className={`group text-center bg-brand-dark/10 backdrop-blur-2xl p-6 lg:p-8 rounded-2xl border border-brand-orange/20 hover:border-brand-orange/60 transition-all duration-700 hover:scale-105 hover:shadow-xl hover:shadow-brand-orange/20 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ 
        transitionDelay: `${delay}ms`,
        background: 'linear-gradient(135deg, rgba(26, 59, 68, 0.1) 0%, rgba(10, 25, 47, 0.15) 100%)'
      }}
    >
      <div className="mb-4">
        <Icon className="w-8 h-8 text-brand-orange mx-auto group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="text-4xl lg:text-5xl font-black text-brand-orange mb-2 animate-pulse-glow">
        {count}{number.includes('+') ? '+' : ''}
      </div>
      <div className="text-brand-light/80 font-medium">{label}</div>
    </div>
  );
};

// Client Card Component
const ClientCard = ({ name, sector, logo, testimonial, delay = 0 }) => {
  const [ref, inView] = useInView(0.3);

  return (
    <div 
      ref={ref}
      className={`group bg-brand-dark/10 backdrop-blur-2xl p-6 lg:p-8 rounded-2xl border border-brand-orange/20 hover:border-brand-orange/60 transition-all duration-700 hover:scale-105 hover:shadow-xl hover:shadow-brand-orange/20 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ 
        transitionDelay: `${delay}ms`,
        background: 'linear-gradient(135deg, rgba(26, 59, 68, 0.1) 0%, rgba(10, 25, 47, 0.15) 100%)'
      }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-orange to-brand-accent flex items-center justify-center text-white font-bold mr-4">
          {logo}
        </div>
        <div>
          <h4 className="text-lg font-bold text-white group-hover:text-brand-orange transition-colors duration-300">{name}</h4>
          <p className="text-brand-accent text-sm">{sector}</p>
        </div>
      </div>
      <p className="text-brand-light/90 italic leading-relaxed group-hover:text-brand-light transition-colors duration-300">
        "{testimonial}"
      </p>
      <div className="flex mt-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-brand-accent fill-current" />
        ))}
      </div>
    </div>
  );
};

// Sustainability Card
const SustainabilityCard = ({ title, description, icon: Icon, delay = 0 }) => {
  const [ref, inView] = useInView(0.3);

  return (
    <div 
      ref={ref}
      className={`group bg-brand-dark/10 backdrop-blur-2xl p-6 lg:p-8 rounded-2xl border border-green-500/20 hover:border-green-500/60 transition-all duration-700 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ 
        transitionDelay: `${delay}ms`,
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(16, 185, 129, 0.1) 100%)'
      }}
    >
      <div className="mb-4">
        <Icon className="w-10 h-10 text-green-500 group-hover:scale-110 transition-transform duration-300" />
      </div>
      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">{title}</h4>
      <p className="text-brand-light/90 leading-relaxed group-hover:text-brand-light transition-colors duration-300">{description}</p>
    </div>
  );
};

// Floating action button
const FloatingCTA = () => (
  <div className="fixed bottom-8 right-8 z-30">
    <button className="group flex items-center space-x-3 bg-gradient-to-r from-brand-orange to-brand-accent hover:from-brand-accent hover:to-brand-orange text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-brand-orange/50 transform hover:scale-105 transition-all duration-300">
      <span className="font-semibold">Let's Connect</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
);

export default function AboutOverlay() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Dynamic cursor follower */}
      <div 
        className="fixed pointer-events-none z-50 w-8 h-8 rounded-full bg-gradient-to-r from-brand-orange to-brand-accent opacity-50 mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      <Navbar />
      
      {/* Hero Section */}
      <Section id="hero" className="text-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <span className="inline-block px-6 py-3 bg-brand-dark/20 backdrop-blur-xl border border-brand-orange/30 rounded-full text-brand-orange font-semibold text-sm tracking-wide uppercase animate-fade-in">
              Est. 2020 • Engineering Excellence
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-white via-brand-light to-white bg-clip-text text-transparent animate-text-shimmer bg-size-200">
              Our
            </span>
            <span className="block bg-gradient-to-r from-brand-orange via-brand-accent to-brand-orange bg-clip-text text-transparent animate-text-shimmer bg-size-200 delay-500">
              Story
            </span>
          </h1>
          
          <div className="max-w-4xl mx-auto mb-12 bg-brand-dark/10 backdrop-blur-2xl p-8 rounded-2xl border border-brand-orange/20">
            <p className="text-xl md:text-2xl text-brand-light/90 leading-relaxed font-light">
              <TypeWriter 
                text="Founded in 2020, Jambstronics Technologies emerged as Zimbabwe's beacon of engineering innovation, transforming industries through cutting-edge solutions in telecommunications, automation, and electrical systems."
                delay={50}
              />
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <button className="group inline-flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-accent hover:from-brand-accent hover:to-brand-orange text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-brand-orange/50 transform hover:scale-105 transition-all duration-300">
              <span>Discover Our Vision</span>
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
            <button className="group inline-flex items-center space-x-2 border-2 border-brand-orange hover:border-brand-accent text-brand-orange hover:text-brand-accent px-8 py-4 rounded-full font-semibold text-lg hover:bg-brand-orange/10 transition-all duration-300">
              <span>View Our Work</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-brand-orange/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-brand-orange rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </Section>

      {/* Mission and Vision Section */}
      <Section id="vision" className="relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-brand-orange to-brand-accent bg-clip-text text-transparent mb-6">
            Vision & Mission
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-orange to-brand-accent mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 to-brand-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-brand-dark/10 backdrop-blur-2xl p-10 lg:p-12 rounded-3xl border border-brand-orange/20 hover:border-brand-orange/60 transition-all duration-500 hover:scale-105"
                 style={{ background: 'linear-gradient(135deg, rgba(26, 59, 68, 0.1) 0%, rgba(10, 25, 47, 0.15) 100%)' }}>
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-orange to-brand-accent rounded-2xl flex items-center justify-center text-3xl mr-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-xl lg:text-2xl text-brand-light/90 leading-relaxed">
                To be the global leader in Telecommunication, automation, instrumentation and Electrical systems engineering through the provision of unparalleled, quality and timely service that shapes the future of technology.
              </p>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-brand-orange/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-brand-dark/10 backdrop-blur-2xl p-10 lg:p-12 rounded-3xl border border-brand-accent/20 hover:border-brand-accent/60 transition-all duration-500 hover:scale-105"
                 style={{ background: 'linear-gradient(135deg, rgba(26, 59, 68, 0.1) 0%, rgba(10, 25, 47, 0.15) 100%)' }}>
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-accent to-brand-orange rounded-2xl flex items-center justify-center text-3xl mr-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-xl lg:text-2xl text-brand-light/90 leading-relaxed">
                To provide added value solutions through a no-compromise quality engineering approach that sustains long-term reliability and functionality, exceeding our clients' expectations at every turn.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Core Values Section */}
      <Section id="values" className="relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-brand-orange to-brand-accent bg-clip-text text-transparent mb-6">
            Core Values
          </h2>
          <p className="text-xl lg:text-2xl text-brand-light/80 max-w-4xl mx-auto bg-brand-dark/10 backdrop-blur-2xl p-6 rounded-2xl border border-brand-orange/20">
            The principles that guide every decision, every project, and every relationship we build
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <ValueCard 
            title="Innovation" 
            description="We embrace cutting-edge technologies and creative solutions to meet the ever-evolving needs of our customers in an increasingly digital world. Our commitment to innovation drives us to explore new possibilities and push the boundaries of what's possible in engineering."
            icon={Lightbulb}
            delay={0}
          />
          <ValueCard 
            title="Integrity" 
            description="We are honest professionals who understand the importance of transparency, ethical practices, and building trust through every interaction. Our word is our bond, and we deliver on every promise with unwavering commitment to excellence."
            icon={Shield}
            delay={200}
          />
          <ValueCard 
            title="Excellence" 
            description="Our spirited energy and passion drive us to deliver exceptional results that exceed expectations and set new industry standards. We pursue perfection in every project, ensuring quality that stands the test of time."
            icon={Award}
            delay={400}
          />
          <ValueCard 
            title="Partnership" 
            description="We believe our customers' success is paramount to our own, built on open communication, collaboration, and shared achievement. Together, we create solutions that transform businesses and drive sustainable growth."
            icon={Users}
            delay={600}
          />
        </div>
      </Section>

      {/* Company Stats Section */}
      <Section id="stats" className="relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-brand-orange to-brand-accent bg-clip-text text-transparent mb-6">
            Our Impact
          </h2>
          <p className="text-xl text-brand-light/80 max-w-3xl mx-auto bg-brand-dark/10 backdrop-blur-2xl p-6 rounded-2xl border border-brand-orange/20">
            Numbers that reflect our commitment to excellence and innovation
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <StatsCard number="150+" label="Projects Completed" icon={CheckCircle} delay={0} />
          <StatsCard number="50+" label="Happy Clients" icon={Users} delay={200} />
          <StatsCard number="5" label="Core Services" icon={Briefcase} delay={400} />
          <StatsCard number="4" label="Years Experience" icon={Award} delay={600} />
        </div>
      </Section>

      {/* Clients Section */}
      <Section id="clients" className="relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-brand-orange to-brand-accent bg-clip-text text-transparent mb-6">
            Trusted by Leading Organizations
          </h2>
          <p className="text-xl text-brand-light/80 max-w-3xl mx-auto bg-brand-dark/10 backdrop-blur-2xl p-6 rounded-2xl border border-brand-orange/20">
            From industrial giants to innovative startups, we've partnered with diverse clients across multiple sectors
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ClientCard 
            name="ZimCorp Industries"
            sector="Manufacturing"
            logo="ZI"
            testimonial="Jambstronics transformed our automation systems, increasing efficiency by 40% while reducing operational costs significantly."
            delay={0}
          />
          <ClientCard 
            name="Harare Medical Center"
            sector="Healthcare"
            logo="HM"
            testimonial="Their security systems and network infrastructure gave us the reliability and peace of mind we needed for critical operations."
            delay={200}
          />
          <ClientCard 
            name="SolarTech Solutions"
            sector="Renewable Energy"
            logo="ST"
            testimonial="Outstanding solar installation project. Professional execution from design to commissioning. Highly recommended!"
            delay={400}
          />
          <ClientCard 
            name="AgriMax Farming"
            sector="Agriculture"
            logo="AM"
            testimonial="The solar water pumping system revolutionized our irrigation. Sustainable, efficient, and perfectly engineered."
            delay={600}
          />
          <ClientCard 
            name="TechHub Zimbabwe"
            sector="Technology"
            logo="TH"
            testimonial="Incredible network design and installation. Our connectivity improved dramatically, boosting productivity across all departments."
            delay={800}
          />
          <ClientCard 
            name="Industrial Park Ltd"
            sector="Real Estate"
            logo="IP"
            testimonial="Complete electrical and security integration for our complex. Jambstronics delivered beyond expectations with exceptional quality."
            delay={1000}
          />
        </div>
      </Section>

      {/* Sustainability Section */}
      <Section id="sustainability" className="relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-6">
            Sustainability & Environment
          </h2>
          <p className="text-xl text-brand-light/80 max-w-4xl mx-auto bg-brand-dark/10 backdrop-blur-2xl p-6 rounded-2xl border border-green-500/20">
            Committed to environmental responsibility through innovative engineering solutions that prioritize sustainability and ecological preservation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SustainabilityCard 
            title="Clean Energy Solutions"
            description="Specializing in solar power systems and renewable energy installations that reduce carbon footprint while providing reliable, cost-effective power solutions for residential, commercial, and industrial applications."
            icon={Sun}
            delay={0}
          />
          <SustainabilityCard 
            title="Energy Efficiency"
            description="Implementing smart energy management systems, VFDs, and automation technologies that optimize power consumption, reduce waste, and improve overall operational efficiency across all sectors."
            icon={Zap}
            delay={200}
          />
          <SustainabilityCard 
            title="Environmental Compliance"
            description="Ensuring all our operations and installations meet stringent environmental standards while promoting eco-friendly practices throughout our supply chain and project lifecycle management."
            icon={Leaf}
            delay={400}
          />
          <SustainabilityCard 
            title="Waste Reduction"
            description="Minimizing electronic waste through proper equipment lifecycle management, refurbishment programs, and responsible disposal practices that protect our environment for future generations."
            icon={Globe}
            delay={600}
          />
          <SustainabilityCard 
            title="Green Building Integration"
            description="Designing and implementing building automation systems that support LEED certification and green building standards, contributing to sustainable construction practices."
            icon={Building}
            delay={800}
          />
          <SustainabilityCard 
            title="Carbon Footprint Reduction"
            description="Actively working to reduce our operational carbon footprint through digital workflows, remote monitoring capabilities, and sustainable transportation practices for our field services."
            icon={Leaf}
            delay={1000}
          />
        </div>
        
        {/* Environmental Impact Stats */}
        <div className="mt-16 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-2xl p-8 rounded-3xl border border-green-500/20">
          <h3 className="text-3xl font-bold text-center text-green-400 mb-8">Environmental Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-black text-green-400 mb-2">2.5MW+</div>
              <div className="text-brand-light/80">Solar Capacity Installed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-400 mb-2">40%</div>
              <div className="text-brand-light/80">Energy Savings Achieved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-400 mb-2">100+</div>
              <div className="text-brand-light/80">Tonnes CO₂ Offset</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-400 mb-2">95%</div>
              <div className="text-brand-light/80">Waste Reduion Rate</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Leadership Section */}
      <Section id="leadership" className="relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-brand-orange to-brand-accent bg-clip-text text-transparent mb-6">
            Leadership Excellence
          </h2>
          <p className="text-xl lg:text-2xl text-brand-light/80 max-w-4xl mx-auto bg-brand-dark/10 backdrop-blur-2xl p-6 rounded-2xl border border-brand-orange/20">
            Meet the visionary leaders driving innovation and excellence at Jambstronics Technologies
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          <DirectorCard 
            name="Pride Mashiyani"
            qualifications={[
              "B.Tech Electronic Engineering",
              "HND Electrical Power Engineering",
              "Innovation Strategist",
              "Technical Leadership"
            ]}
            image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
            delay={0}
          />
          <DirectorCard 
            name="Wilbert Magaramagara"
            qualifications={[
              "M.Sc Project Management",
              "M.Tech Sensor Technology", 
              "Technical Director",
              "Systems Integration Expert"
            ]}
            image="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face"
            delay={300}
          />
        </div>
        
        {/* Leadership Philosophy */}
        <div className="mt-16 max-w-4xl mx-auto bg-brand-dark/10 backdrop-blur-2xl p-8 lg:p-12 rounded-3xl border border-brand-orange/20">
          <h3 className="text-3xl font-bold text-center text-brand-orange mb-8">Leadership Philosophy</h3>
          <p className="text-xl text-brand-light/90 leading-relaxed text-center">
            Our leadership team combines decades of technical expertise with visionary thinking, fostering a culture of innovation, 
            continuous learning, and excellence. We believe in empowering our team to push boundaries, embrace challenges, 
            and deliver solutions that not only meet but exceed our clients' expectations.
          </p>
        </div>
      </Section>

      {/* Quality & Compliance Section */}
      <Section id="quality" className="relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-brand-orange to-brand-accent bg-clip-text text-transparent mb-6">
            Quality & Compliance
          </h2>
          <p className="text-xl text-brand-light/80 max-w-3xl mx-auto bg-brand-dark/10 backdrop-blur-2xl p-6 rounded-2xl border border-brand-orange/20">
            Upholding the highest standards of safety, quality, and regulatory compliance in every aspect of our operations
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="bg-brand-dark/10 backdrop-blur-2xl p-8 lg:p-10 rounded-3xl border border-brand-orange/20 hover:border-brand-orange/60 transition-all duration-500 hover:scale-105">
            <div className="mb-6">
              <Shield className="w-12 h-12 text-brand-orange mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Safety First</h3>
            </div>
            <p className="text-brand-light/90 leading-relaxed mb-6">
              All work activities are conducted with utmost safety considerations, protecting our team, clients, and the environment through rigorous safety protocols and continuous training.
            </p>
            <ul className="space-y-3 text-brand-light/80">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-brand-accent mr-3" />
                Zero-incident safety record
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-brand-accent mr-3" />
                Regular safety audits
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-brand-accent mr-3" />
                Certified safety procedures
              </li>
            </ul>
          </div>
          
          <div className="bg-brand-dark/10 backdrop-blur-2xl p-8 lg:p-10 rounded-3xl border border-green-500/20 hover:border-green-500/60 transition-all duration-500 hover:scale-105">
            <div className="mb-6">
              <Leaf className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Environmental Responsibility</h3>
            </div>
            <p className="text-brand-light/90 leading-relaxed mb-6">
              Committed to environmentally conscious practices that minimize ecological impact while delivering sustainable engineering solutions for a greener future.
            </p>
            <ul className="space-y-3 text-brand-light/80">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                Eco-friendly operations
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                Waste reduction programs
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                Sustainable sourcing
              </li>
            </ul>
          </div>
          
          <div className="bg-brand-dark/10 backdrop-blur-2xl p-8 lg:p-10 rounded-3xl border border-blue-500/20 hover:border-blue-500/60 transition-all duration-500 hover:scale-105">
            <div className="mb-6">
              <Award className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Quality Standards</h3>
            </div>
            <p className="text-brand-light/90 leading-relaxed mb-6">
              Maintaining internationally recognized quality management systems with consistent methodology and disciplined processes that ensure superior outcomes.
            </p>
            <ul className="space-y-3 text-brand-light/80">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-400 mr-3" />
                ISO compliance standards
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-400 mr-3" />
                Continuous improvement
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-400 mr-3" />
                Customer satisfaction focus
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="text-center relative">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
            Ready to Transform Your Vision?
          </h2>
          <div className="bg-brand-dark/10 backdrop-blur-2xl p-8 lg:p-12 rounded-3xl border border-brand-orange/20 mb-12">
            <p className="text-xl lg:text-2xl text-brand-light/90 mb-8 leading-relaxed">
              Join the growing list of satisfied clients who trust Jambstronics Technologies to deliver exceptional engineering solutions 
              that drive success, innovation, and sustainable growth for their organizations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-black text-brand-orange mb-2">24/7</div>
                <div className="text-brand-light/80">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-brand-accent mb-2">99.9%</div>
                <div className="text-brand-light/80">Project Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-brand-orange mb-2">100%</div>
                <div className="text-brand-light/80">Client Satisfaction</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <button className="group inline-flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-accent hover:from-brand-accent hover:to-brand-orange text-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-brand-orange/50 transform hover:scale-105 transition-all duration-300">
              <span>Start Your Project</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group inline-flex items-center space-x-2 border-2 border-white hover:border-brand-orange text-white hover:text-brand-orange px-10 py-5 rounded-full font-bold text-xl hover:bg-white/10 transition-all duration-300">
              <span>Explore Services</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-16 bg-brand-dark/10 backdrop-blur-2xl rounded-3xl p-8 lg:p-12 border border-brand-orange/20 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-brand-orange mb-8">Get In Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-brand-light/90">
              <div>
                <div className="font-bold text-brand-light mb-3 text-lg">Phone</div>
                <div className="space-y-1">
                  <div>+263 773 755 716</div>
                  <div>+263 773 755 717</div>
                  <div>+263 719 180 300</div>
                </div>
              </div>
              <div>
                <div className="font-bold text-brand-light mb-3 text-lg">Contact</div>
                <div className="space-y-1">
                  <div>jambsmash20@gmail.com</div>
                  <div>7 Tilbury Road, Willowvale</div>
                  <div>Harare, Zimbabwe</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <FloatingCTA />
      <Footer />

      {/* Custom styles */}
      <style jsx>{`
        .animate-text-shimmer {
          background-size: 200% 200%;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }
        
        .bg-size-400 {
          background-size: 400% 400%;
        }
        
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 2s ease-out;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .rotate-y-6 {
          transform: rotateY(6deg);
        }
        
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(220, 113, 62, 0.5); }
          50% { text-shadow: 0 0 40px rgba(220, 113, 62, 0.8), 0 0 60px rgba(255, 167, 38, 0.3); }
        }
        
        /* Mobile touch improvements */
        @media (hover: none) {
          .group:active .group-hover\\:scale-110 { transform: scale(1.1); }
          .group:active .group-hover\\:translate-x-1 { transform: translateX(4px); }
          .group:active .group-hover\\:translate-y-1 { transform: translateY(4px); }
          .group:active .group-hover\\:bg-brand-orange\\/20 { background-color: rgba(220, 113, 62, 0.2); }
          .group:active .group-hover\\:text-brand-orange { color: #DC713E; }
          .group:active .group-hover\\:border-brand-orange\\/60 { border-color: rgba(220, 113, 62, 0.6); }
        }
        
        /* Smooth scrolling */
        .scroll-smooth {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #1A3B44;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #DC713E, #FFA726);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
