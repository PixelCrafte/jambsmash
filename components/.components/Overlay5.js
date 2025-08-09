'use client';

import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

// Enhanced Navbar with better animations and accessibility
function EnhancedNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-brand-dark/95 backdrop-blur-2xl shadow-2xl shadow-brand-orange/20 border-b border-brand-orange/30' 
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo with animation */}
          <div className="flex-shrink-0 group">
            <a href="/" className="flex items-center space-x-3" aria-label="Jambsmash Electronics Home">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-orange to-brand-accent rounded-xl shadow-lg group-hover:shadow-2xl group-hover:shadow-brand-orange/50 transform group-hover:rotate-6 transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center text-brand-dark font-black text-xl">
                    J
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-orange to-brand-accent rounded-xl opacity-0 group-hover:opacity-100 animate-pulse"></div>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-black text-brand-light group-hover:text-brand-orange transition-colors duration-300">
                  JAMBSMASH
                </h1>
                <p className="text-xs text-brand-accent font-semibold tracking-widest uppercase">
                  Electronics
                </p>
              </div>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {[
                { name: 'Services', href: '/services' },
                { name: 'About', href: '/about' },
                { name: 'Projects', href: '/projects' },
                { name: 'Contact', href: '/contact' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group relative text-brand-light hover:text-brand-orange transition-colors duration-300 font-medium"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-orange to-brand-accent group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              <a
                href="tel:+263773755716"
                className="bg-gradient-to-r from-brand-orange to-brand-accent text-brand-dark px-6 py-2 rounded-full font-bold hover:shadow-lg hover:shadow-brand-orange/50 transform hover:scale-105 transition-all duration-300"
                aria-label="Call us at +263 773755716"
              >
                Call Now
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-light hover:text-brand-orange transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span className={`block w-full h-0.5 bg-current transform transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-current transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-current transform transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-dark/95 backdrop-blur-2xl border-t border-brand-orange/30">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {[
              { name: 'Services', href: '/services' },
              { name: 'About', href: '/about' },
              { name: 'Projects', href: '/projects' },
              { name: 'Contact', href: '/contact' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-brand-light hover:text-brand-orange hover:bg-brand-orange/10 rounded-md transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// Enhanced Footer with better structure and animations
function EnhancedFooter() {
  return (
    <footer className="bg-brand-dark text-brand-light relative overflow-hidden" role="contentinfo">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-brand-orange rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${3 + Math.random() * 2}s infinite ${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-orange to-brand-accent rounded-xl shadow-lg flex items-center justify-center">
                <span className="text-brand-dark font-black text-2xl">J</span>
              </div>
              <div>
                <h3 className="text-3xl font-black text-brand-orange">JAMBSMASH</h3>
                <p className="text-brand-accent font-semibold tracking-widest uppercase text-sm">Electronics</p>
              </div>
            </div>
            <p className="text-brand-light/80 text-lg leading-relaxed mb-6 max-w-md">
              Leading the future of engineering solutions through innovative automation, security systems, and sustainable energy technologies.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-brand-accent mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Our Services', href: '/services' },
                { name: 'About Us', href: '/about' },
                { name: 'Projects', href: '/projects' },
                { name: 'Careers', href: '/careers' },
                { name: 'Blog', href: '/blog' }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-brand-light/70 hover:text-brand-orange transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-brand-accent mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-brand-orange text-lg">📍</span>
                <div>
                  <p className="text-brand-light font-medium">Address</p>
                  <p className="text-brand-light/70">7 Tilbury Road, Willowvale<br />Harare, Zimbabwe</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-brand-orange text-lg">📱</span>
                <div>
                  <p className="text-brand-light font-medium">Phone</p>
                  <p className="text-brand-light/70">+263 773755716<br />+263 773755717</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-brand-orange text-lg">✉️</span>
                <div>
                  <p className="text-brand-light font-medium">Email</p>
                  <p className="text-brand-light/70">jambsmash20@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-brand-gray/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-brand-light/60 text-sm">
              © {new Date().getFullYear()} Jambsmash Electronics. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-brand-light/60 hover:text-brand-orange transition-colors duration-300">Privacy Policy</a>
              <a href="/terms" className="text-brand-light/60 hover:text-brand-orange transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </footer>
  );
}

// Enhanced Overlay Component with proper scroll handling
export default function EnhancedOverlay({ scrollProgress = 0, contentHeight = 0 }) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const testimonials = [
    {
      id: 1,
      stars: 5,
      quote: "Exceptional service in solar installation. The team was professional, efficient, and delivered exactly what was promised. Our energy costs have dropped significantly!",
      client: "Zimplats Mining Corporation",
      project: "50kVA Solar System Installation",
      location: "Harare, Zimbabwe"
    },
    {
      id: 2,
      stars: 5,
      quote: "Their security system installation exceeded our expectations. The CCTV and access control integration is seamless and provides complete peace of mind for our facility.",
      client: "Delta Beverages Manufacturing",
      project: "Complete Security System Overhaul",
      location: "Harare, Zimbabwe"
    },
    {
      id: 3,
      stars: 5,
      quote: "Outstanding automation solutions that have improved our operational efficiency by 40%. The instrumentation calibration service is world-class. Highly recommend their technical expertise.",
      client: "Olivine Industries",
      project: "Industrial Automation & Control Systems",
      location: "Harare, Zimbabwe"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full min-h-screen">
      {/* SEO Meta Tags (would typically be in Head component) */}
      <div style={{ display: 'none' }}>
        <h1>Jambsmash Electronics - Leading Engineering Solutions in Zimbabwe</h1>
        <meta name="description" content="Professional automation, instrumentation, security systems, and solar solutions in Harare, Zimbabwe. Expert electrical engineering services with 15+ years experience." />
        <meta name="keywords" content="automation systems Zimbabwe, security systems Harare, solar installation Zimbabwe, electrical engineering, instrumentation calibration, industrial automation" />
      </div>

      <EnhancedNavbar />

      {/* Main content wrapper */}
      <div className="relative z-10 font-sans antialiased">
        {/* Hero Section - Enhanced with better animations and accessibility */}
        <section 
          id="hero"
          className="flex flex-col justify-center items-center p-4 sm:p-8 pt-24 sm:pt-32 relative"
          style={{ minHeight: '100vh' }}
          data-animate
          role="banner"
          aria-labelledby="hero-heading"
        >
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/20 via-transparent to-brand-dark/60 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent pointer-events-none"></div>

          {/* Floating particles animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-brand-orange to-brand-accent rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 10}s infinite linear ${Math.random() * 5}s`
                }}
              />
            ))}
          </div>

          <div className={`text-center z-20 relative max-w-6xl mx-auto transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 
              id="hero-heading"
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6 perspective-1000"
            >
              <span className="inline-block animate-pulse text-brand-orange drop-shadow-2xl filter brightness-110 hover:brightness-125 transition-all duration-300 transform hover:scale-105">
                JAMB
              </span>
              <span className="inline-block animate-bounce delay-300 text-brand-light filter drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300 transform hover:scale-105">
                SMASH
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-accent mt-4 tracking-widest uppercase relative">
                <span className="relative z-10">Electronics</span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/20 to-brand-accent/20 blur-lg transform scale-110"></div>
              </div>
            </h1>

            <p className="mt-8 md:mt-10 text-xl sm:text-2xl md:text-3xl text-brand-light font-light max-w-5xl mx-auto leading-relaxed">
              <span className="bg-brand-dark/40 backdrop-blur-md rounded-2xl p-6 inline-block shadow-2xl border border-brand-orange/20">
                Pioneering the future through 
                <span className="font-semibold text-brand-accent bg-gradient-to-r from-brand-accent to-brand-orange bg-clip-text text-transparent"> cutting-edge automation</span>,
                <span className="font-semibold text-brand-accent bg-gradient-to-r from-brand-accent to-brand-orange bg-clip-text text-transparent"> precision instrumentation</span>, and
                <span className="font-semibold text-brand-accent bg-gradient-to-r from-brand-accent to-brand-orange bg-clip-text text-transparent"> advanced security solutions</span>.
              </span>
            </p>

            <div className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center">
              <a 
                href="/services" 
                className="group relative bg-gradient-to-br from-brand-orange to-brand-accent text-brand-dark font-bold py-4 md:py-5 px-10 md:px-12 rounded-full shadow-2xl hover:shadow-3xl active:shadow-3xl hover:shadow-brand-orange/60 active:shadow-brand-orange/60 transition-all duration-500 transform hover:scale-110 active:scale-110 hover:-translate-y-2 active:-translate-y-2 text-lg md:text-xl overflow-hidden"
                aria-label="Explore our engineering services"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-accent to-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center">
                  🚀 Explore Our Services
                  <span className="ml-3 inline-block group-hover:translate-x-2 group-active:translate-x-2 transition-transform duration-300 text-2xl">→</span>
                </span>
              </a>

              <a 
                href="tel:+263773755716" 
                className="group relative border-3 border-brand-orange text-brand-light font-bold py-4 md:py-5 px-10 md:px-12 rounded-full shadow-xl hover:shadow-brand-orange/30 active:shadow-brand-orange/30 backdrop-blur-md bg-brand-dark/20 hover:bg-brand-orange hover:text-brand-dark active:bg-brand-orange active:text-brand-dark transition-all duration-500 transform hover:scale-110 active:scale-110 text-lg md:text-xl overflow-hidden"
                aria-label="Call us now at +263 773755716"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/20 to-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center">
                  📞 Call Now: +263 773755716
                  <span className="ml-3 inline-block group-hover:rotate-12 group-active:rotate-12 transition-transform duration-300">✨</span>
                </span>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: '15+', label: 'Years Experience' },
                { number: '500+', label: 'Projects Completed' },
                { number: '24/7', label: 'Support Available' },
                { number: '100%', label: 'Client Satisfaction' }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl md:text-5xl font-black text-brand-orange mb-2 group-hover:text-brand-accent transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-brand-light/80 font-medium text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 text-center z-20 opacity-80">
            <div className="animate-bounce text-brand-accent text-4xl mb-2">⬇</div>
            <p className="text-brand-light text-xs md:text-sm tracking-widest uppercase font-semibold">
              Discover Excellence
            </p>
            <div className="w-0.5 h-16 bg-gradient-to-b from-brand-accent to-transparent mx-auto mt-4"></div>
          </div>

          <style jsx>{`
            @keyframes float {
              0% { transform: translateY(0px) rotate(0deg); }
              33% { transform: translateY(-10px) rotate(120deg); }
              66% { transform: translateY(5px) rotate(240deg); }
              100% { transform: translateY(0px) rotate(360deg); }
            }
            .perspective-1000 {
              perspective: 1000px;
            }
            .border-3 {
              border-width: 3px;
            }
          `}</style>
        </section>

        {/* Enhanced Services Section */}
        <section 
          id="services"
          className="flex flex-col justify-center items-center p-4 sm:p-8 py-24 bg-transparent relative z-10"
          style={{ minHeight: '100vh' }}
          data-animate
          aria-labelledby="services-heading"
        >
          <div className="max-w-8xl w-full">
            <div className={`text-center mb-20 transition-all duration-1000 delay-200 ${isVisible.services ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 
                id="services-heading"
                className="text-5xl md:text-6xl lg:text-7xl font-black text-brand-orange tracking-tighter mb-6 relative"
              >
                <span className="relative">
                  Our Engineering Excellence
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-brand-orange to-brand-accent rounded-full"></div>
                </span>
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-brand-light max-w-4xl mx-auto leading-relaxed font-light">
                Comprehensive solutions engineered to power Zimbabwe's industrial future
              </p>
            </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {[
                { 
                  icon: '🔒', 
                  title: 'Electronic Security Systems', 
                  desc: 'State-of-the-art CCTV surveillance, biometric access control, intelligent fire monitoring, and hazardous gas detection systems with 24/7 monitoring capabilities.',
                  features: ['HD IP Camera Systems', 'Biometric Access Control', 'Fire & Gas Detection', '24/7 Monitoring']
                },
                { 
                  icon: '⚙️', 
                  title: 'Industrial Automation', 
                  desc: 'Advanced variable frequency drives, high-efficiency electric motors, PLC programming, and comprehensive SCADA systems for complete industrial automation.',
                  features: ['PLC Programming', 'SCADA Systems', 'VFD Integration', 'Motor Control Centers']
                },
                { 
                  icon: '🔬', 
                  title: 'Instrumentation & Calibration', 
                  desc: 'Precision pH meters, conductivity analyzers, turbidity meters, flow measurement, and NIST-traceable calibration services for accurate process control.',
                  features: ['NIST Calibration', 'Process Analytics', 'Flow Measurement', 'Quality Assurance']
                },
                { 
                  icon: '☀️', 
                  title: 'Solar & Renewable Energy', 
                  desc: 'Complete solar photovoltaic systems, solar water pumping, battery storage solutions, and grid-tie systems for sustainable energy independence.',
                  features: ['Grid-Tie Systems', 'Bry Storage', 'Solar Pumping', 'Energy Management']
                },
                { 
                  icon: '📡', 
                  title: 'Telecommunications', 
                  desc: 'Fiber optic networks, structured cabling, wireless solutions, and multimedia communication systems for seamless connectivity.',
                  features: ['Fiber Optic Networks', 'Wireless Solutions', 'Structured Cabling', 'Network Security']
                },
                { 
                  icon: '⚡', 
              title: 'Energy Management', 
                  desc: 'Smart energy monitoring systems, power quality analysis, load management, and efficiency optimization for reduced operational costs.',
                  features: ['Power Quality Analysis', 'Load Management', 'Energy Audits', 'Cost Optimization']
                }
              ].map((service, index) => (
                <div 
                  key={index} 
                  className={`group relative bg-gradient-to-br from-brand-dark/80 to-brand-dark/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl border-2 border-brand-gray/20 hover:border-brand-orange/80 active:border-brand-orange/80 transition-all duration-500 hover:shadow-3xl active:shadow-3xl hover:shadow-brand-orange/30 active:shadow-brand-orange/30 transform hover:-translate-y-4 active:-translate-y-4 hover:scale-105 overflow-hidden transition-all duration-700 delay-${index * 100} ${isVisible.services ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-orange/10 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-brand-light mb-4 group-hover:text-brand-orange transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-brand-light/90 leading-relaxed mb-6 text-base md:text-lg">
                      {service.desc}
                    </p>
                    
                    {/* Feature list */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-brand-light/80 text-sm">
                          <span className="w-2 h-2 bg-brand-accent rounded-full mr-3 group-hover:bg-brand-orange transition-colors duration-300"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-brand-accent font-bold group-hover:text-brand-orange transition-colors duration-300 text-lg">
                        Learn More
                      </span>
                      <span className="text-2xl group-hover:translate-x-2 group-hover:text-brand-orange transition-all duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style jsx>{`
            .shadow-3xl {
              box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05);
            }
          `}</style>
        </section>

        {/* Enhanced About Section */}
        <section 
          id="about"
          className="flex flex-col justify-center items-center p-4 sm:p-8 py-24"
          style={{ minHeight: '100vh' }}
          data-animate
          aria-labelledby="about-heading"
        >
          <div className="max-w-7xl w-full">
            <div className={`transition-all duration-1000 delay-300 ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-gradient-to-br from-brand-dark/90 to-brand-dark/70 backdrop-blur-2xl p-10 md:p-16 rounded-3xl border-2 border-brand-orange/30 shadow-3xl relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-brand-orange to-brand-accent rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-10 left-10 w-60 h-60 bg-gradient-to-br from-brand-accent to-brand-orange rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10">
                  <h2 
                    id="about-heading"
                    className="text-5xl md:text-6xl lg:text-7xl font-black text-brand-orange mb-12 text-center tracking-tighter"
                  >
                    <span className="bg-gradient-to-r from-brand-orange to-brand-accent bg-clip-text text-transparent">
                      About Jambsmash
                    </span>
                  </h2>

                  <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-16">
                    <div className="group">
                      <div className="bg-gradient-to-br from-brand-orange/10 to-brand-accent/10 p-8 rounded-2xl border border-brand-orange/20 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-xl">
                        <h3 className="text-3xl md:text-4xl font-black text-brand-accent mb-6 flex items-center">
                          <span className="text-4xl mr-4">🎯</span>
                          Our Mission
                        </h3>
                        <p className="text-brand-light leading-relaxed text-lg md:text-xl">
                          To provide <span className="font-bold text-brand-orange">added value solutions</span> through a no-compromise quality engineering approach that sustains long-term reliability and functionality for our clients across Zimbabwe and beyond.
                        </p>
                    </div>
                    </div>

                    <div className="group">
                      <div className="bg-gradient-to-br from-brand-accent/10 to-brand-orange/10 p-8 rounded-2xl border border-brand-accent/20 hover:border-brand-accent/50 transition-all duration-300 hover:shadow-xl">
                        <h3 className="text-3xl md:text-4xl font-black text-brand-accent mb-6 flex items-center">
                          <span className="text-4xl mr-4">🚀</span>
                          Our Vion
                        </h3>
                        <p className="text-brand-light leading-relaxed text-lg md:text-xl">
                          To be the <span className="font-bold text-brand-orange">global leader</span> in telecommunications, automation, instrumentation and electrical systems engineering through unparalleled, quality and timely service delivery.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Director Section */}
                  <div className="text-center mb-12 relative">
                    <div className="bg-gradient-to-br from-brand-dark/80 to-brand-dark/60 p-10 rounded-3xl border-2 border-brand-gray/30 hover:border-brand-orange/50 transition-all duration-500 hover:shadow-2xl group">
                      {/* Decorative elements */}
                      <div className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-brand-orange/30 group-hover:border-brand-orange transition-colors duration-300"></div>
                      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-brand-orange/30 group-hover:border-brand-orange transition-colors duration-300"></div>
                      
                      <div className="relative z-10">
                        <div className="w-32 h-32 bg-gradient-to-br from-brand-orange to-brand-accent rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl group-hover:shadow-brand-orange/50 transition-all duration-300 group-hover:scale-110">
                          <span className="text-6xl font-black text-brand-dark">P</span>
                        </div>
                        
                        <h3 className="text-4xl md:text-5xl font-black text-brand-orange mb-4">
                          Meet Our Director
                        </h3>
                        <h4 className="text-3xl md:text-4xl font-bold text-brand-light mb-4">
                          Pride Mashiyani
                        </h4>
                        
                        <div className="space-y-2 mb-6">
                          <p className="text-brand-accent font-bold text-xl flex items-center justify-center">
                            <span className="text-2xl mr-2">🎓</span>
                            B.Tech Electronic Engineering (Honours)
                          </p>
                          <p className="text-brand-accent text-lg flex items-center justify-center">
                            <span className="text-xl mr-2">⚡</span>
                            HND Electrical Power Engineering
                          </p>
                        </div>
                        
                        <blockquote className="text-brand-light/90 text-xl md:text-2xl italic relative">
                          <span className="text-6xl text-brand-orange/30 absolute -top-4 -left-4">"</span>
                          <span className="relative z-10">
                            Leading innovation in engineeri solutions with passion, expertise, and an unwavering commitment to excellence.
                          </span>
                          <span className="text-6xl text-brand-orange/30 absolute -bottom-8 -right-4">"</span>
                        </blockquote>
                      </div>
                    </div>
                  </div>

                  {/* Company Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {[
                      { number: '2008', label: 'Established', icon: '🏢' },
                      { number: '15+', label: 'Years Excellence', icon: '⭐' },
                      { number: '500+', label: 'Projects Done', icon: '✅' },
                      { number: '24/7', label: 'Support', icon: '🛠️' }
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="text-center group hover:scale-105 transition-transform duration-300"
                      >
                        <div className="text-4xl mb-2">{stat.icon}</div>
                        <div className="text-3xl md:text-4xl font-black text-brand-orange mb-2 group-hover:text-brand-accent transition-colors duration-300">
                          {stat.number}
                        </div>
                        <div className="text-brand-light/80 font-medium text-sm md:text-base">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <a 
                      href="/about" 
                      className="group inline-flex items-center bg-gradient-to-r from-transparent to-transparent border-3 border-brand-orange text-brand-light font-bold py-4 md:py-5 px-10 md:px-12 rounded-full shadow-xl hover:shadow-brand-orange/30 backdrop-blur-md hover:bg-brand-orange hover:text-brand-dark transition-all duration-500 transform hover:scale-110 text-lg md:text-xl"
                      aria-label="Learn more about Jambsmash Electronics"
                    >
                      <span className="text-2xl mr-3 group-hover:rotate-12 transition-transform duration-300">🔍</span>
                      Discover Our Full Story
                      <span className="ml-3 text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </section>

        {/* Enhanced Customer Reviews Section */}
        <section 
          id="testimonials"
          className="flex flex-col justify-center items-center p-4 sm:p-8 py-24 bg-transparent relative z-10"
          style={{ minHeight: '100vh' }}
          data-animate
          aria-labelledby="testimonials-heading"
        >
          <div className="max-w-8xl w-full">
            <div className={`text-center mb-20 transition-all duration-1000 delay-400 ${isVisible.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 
                id="testimonials-heading"
                className="text-5xl md:text-6xl lg:text-7xl font-black text-brand-orange mb-6 tracking-tighter relative"
              >
                <span className="bg-gradient-to-r from-brand-orange to-brand-accent bg-clip-text text-transparent">
                  Client Success Stories
                </span>
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-brand-light max-w-4xl mx-auto leading-relaxed font-light">
                Trusted by Zimbabwe's leading industries
              </p>
            </div>

            {/* Featured Testimonial Carousel */}
            <div className="relative max-w-6xl mx-auto mb-16">
              <div className="bg-gradient-to-br from-brand-dark/90 to-brand-dark/70 backdrop-blur-2xl p-12 md:p-16 rounded-3xl border-2 border-brand-orange/30 shadow-3xl overflow-hidden relative">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-orange/5 to-brand-accent/5 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  {/* Star Rating */}
                  <div className="flex justify-center text-brand-accent text-4xl mb-8">
                    {'★'.repeat(testimonials[currentTestimonial].stars)}
                  </div>
                  
                {/* Quote */}
                  <blockquote className="text-2xl md:text-3xl text-brand-light text-center leading-relaxed mb-10 italic relative">
                    <span className="text-8xl text-brand-orange/20 absolute -top-8 left-0">"</span>
                    <span className="relative z-10 px-8">
                      {testimonials[currentTestimonial].quote}
                    </span>
                    <span className="text-8xl text-brand-orange/20 absolute -bottom-8 right-0">"</span>
                  </blockquote>
                  
                  {/* Client Info */}
                  <div className="text-center">
                    <h4 className="text-2xl md:text-3xl font-bold text-brand-accent mb-2">
                      {testimonials[currentTestimonial].client}
                    </h4>
                    <p className="text-brand-light text-lg md:text-xl mb-2">
                      {testimonials[currentTestimonial].project}
                    </p>
                    <p className="text-brand-gray text-base md:text-lg">
                      📍 {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-brand-orange shadow-lg shadow-brand-orange/50' 
                        : 'bg-brand-gray/50 hover:bg-brand-gray'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Additional Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🏆',
                  title: 'Award-Winning Service',
                  desc: 'Recognized for excellence in engineering solutions across multiple industries.'
                },
                {
                  icon: '🔧',
                  title: 'Expert Technical Team',
                  desc: 'Certified engineers with decades of combined experience in industrial systems.'
                },
                {               icon: '🛡️',
                  title: 'Quality Guaranteed',
                  desc: 'Comprehensive warranties and ongoing support for all our installations.'
                }
              ].map((item, index) => (
                <div key={index} className="group bg-brand-dark/60 backdrop-blur-xl p-8 rounded-2xl border border-brand-gray/20 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div className="text-5xl mb-4 group-r:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-light mb-3 group-hover:text-brand-orange transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-brand-light/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Contact Section */}
        <section 
          id="contact"
          className="flex flex-col justify-center items-center p-4 sm:p-8 py-24 relative"
          style={{ minHeight: '100vh' }}
          data-animate
          aria-labelledby="contact-heading"
        >
          {/* Enhanced background gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/40 via-transparent to-brand-dark/80 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent pointer-events-none"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-brand-orange to-brand-accent rounded-full opacity-10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `pulse ${3 + Math.random() * 4}s infinite ${Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          <div className={`text-center z-10 max-w-6xl px-4 transition-all duration-1000 delay-500 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 
              id="contact-heading"
              className="text-5xl md:text-6xl lg:text-8xl font-black text-brand-orange mb-8 tracking-tighter"
            >
              <span className="bg-gradient-to-r from-brand-orange to-brand-accent bg-clip-text text-transparent">
                Let's Engineer Your Future
              </span>
            </h2>
            
            <p className="text-2xl md:text-3xl lg:text-4xl text-brand-light mb-8 leading-relaxed font-light">
              Ready to transform your business with 
              <span className="font-bold text-brand-accent"> world-class engineering solutions?</span>
            </p>
            
            <p className="text-lg md:text-xl text-brand-gray mb-16 max-w-4xl mx-auto leading-relaxed">
              Join hundreds of satisfied clients across Zimbabwe who trust Jambsmash for their automation, security, and energy needs. Get your free consultation today.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
              <a 
                href="mailto:jambsmash20@gmail.com" 
                className="group relative bg-gradient-to-br from-brand-orange to-brand-accent text-brand-dark font-black py-5 md:py-6 px-12 md:px-16 rounded-full shadow-3xl hover:shadow-4xl active:shadow-4xl transition-all duration-500 transform hover:scale-110 active:scale-110 hover:-translate-y-3 active:-translate-y-3 text-xl md:text-2xl overflow-hidden"
                aria-label="Send us an email at jambsmash20@gmail.com"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-accent to-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center">
                  <span className="text-3xl mr-4 group-hover:-rotate-12 group-active:-rotate-12 transition-transform duration-300">📧</span>
                  Get Free Quote Now
                  <span className="ml-4 text-3xl group-hover:translate-x-2 group-acte:translate-x-2 transition-transform duration-300">→</span>
                </span>
              </a>

              <a 
                href="tel:+263773755716" 
                className="group relative border-4 border-brand-orange text-brand-light font-black py-5 md:py-6 px-12 md:px-16 rounded-full shadow-2xl hover:shadow-brand-orange/40 active:shadow-brand-orange/40 backdrop-blur-xl bg-brand-dark/30 hover:bg-brand-orange hover:text-brand-dark active:bg-brand-orange active:text-brand-dark transition-a duration-500 transform hover:scale-110 active:scale-110 text-xl md:text-2xl overflow-hidden"
                aria-label="Call us immediately at +263 773755716"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/10 to-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center">
                  <span className="text-3xl mr-4 group-hover:animate-bounce">📱</span>                 Call: +263 773755716
                  <span className="ml-4 text-3xl group-hover:rotate-12 group-active:rotate-12 transition-transform duration-300">✨</span>
                </span>
              </a>
            </div>

            {/* Enhanced Contact Information */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: '📍',
                  title: 'Visit Our Office',
                  info: '7 Tilbury R Willowvale',
                  sub: 'Harare, Zimbabwe',
                  link: 'https://maps.google.com/?q=7+Tilbury+Road,+Willowvale,+Harare'
                },
                {
                  icon: '📱',
                  title: 'Call Us 24/7',
                  info: '+263 773755716',
                  sub: '+263 773755717',
                  link: 'tel:+263773755716'
                },
                {
                  icon: '✉️',
                  title: 'Email Support',
                  info: 'jambsmash20@gmail.com',
                  sub: 'Quick response guaranteed',
                  link: 'mailto:jambsmash20@gmail.com'
                }
              ].map((contact, index) => (
                <a
                  key={index}
                  href={contact.link}
                  className="group bg-brand-dark/60 backdrop-blur-xl p-8 rounded-2xl border-2 border-brand-gray/20 hover:border-brand-orange/60 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 block"
                  aria-label={`${contact.title}: ${contact.info}`}
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {contact.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-accent mb-2 group-hover:text-brand-orange transition-colors duration-300">
                    {contact.title}
                  </h3>
                  <p className="text-brand-light font-semibold text-lg mb-1">
                    {contact.info}
                  </p>
                  <p className="text-brand-light/70 text-base">
                    {contact.sub}
                  </p>
                </a>
              ))}
            </div>

            {/* Business Hours */}
            <div className="mt-16 bg-brand-dark/40 backdrop-blur-xl p-8 rounded-2xl border border-brand-orange/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-brand-accent mb-4 flex items-center justify-center">
                <span className="text-3xl mr-3">🕒</span>
                Business Hours
              </h3>
              <div className="grid grid-cols-2 gap-4 text-brand-light">
                <div>
                  <p className="font-semibold">Monday - Friday</p>
                  <p className="text-brand-light/80">8:00 AM - 5:00 PM</p>
                </div>
                <div>
                  <p className="font-semibold">Emergency Support</p>
                  <p className="text-brand-accent">24/7 Available</p>
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes pulse {
              0%, 100% { opacity: 0.1; transform: scale(1); }
              50% { opacity: 0.3; transform: scale(1.1); }
            }
            .shadow-4xl {
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05);
            }
            .border-4 {
              border-width: 4px;
            }
          `}</style>
        </section>
      </div>

      <EnhancedFooter />
    </div>
  );
}
