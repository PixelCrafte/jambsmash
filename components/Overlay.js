'use client';

import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

// Enhanced Overlay Component with world-class design
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

  // Optimized intersection observer for SEO
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
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full min-h-screen">
      <Navbar />

      {/* Main content wrapper */}
      <div className="relative z-10 font-sans antialiased">
        
        {/* Hero Section - Clean, Modern, Captivating */}
        <section 
          id="hero"
          className="flex flex-col justify-center items-center p-4 sm:p-8 pt-24 sm:pt-32 relative"
          style={{ minHeight: '100vh' }}
          data-animate
          role="banner"
          aria-labelledby="hero-heading"
        >
          <div className={`text-center z-20 relative max-w-6xl mx-auto transition-all duration-700 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            
            {/* Enhanced Logo Typography */}
            <h1 
              id="hero-heading"
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-none mb-8"
            >
              <span className="inline-block text-brand-orange drop-shadow-2xl animate-pulse" style={{ animationDuration: '2s' }}>
                JAMB
              </span>
              <span className="inline-block text-brand-light drop-shadow-xl animate-bounce ml-2" style={{ animationDelay: '0.5s', animationDuration: '1.5s' }}>
                SMASH
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-accent mt-6 tracking-widest uppercase">
                Electronics
              </div>
            </h1>

            {/* Glassmorphic Tagline */}
            <div className="mt-10 md:mt-12">
              <p className="text-xl sm:text-2xl md:text-3xl text-brand-light font-light max-w-5xl mx-auto leading-relaxed">
                <span className="bg-brand-dark/60 backdrop-blur-xl rounded-2xl p-8 inline-block shadow-2xl border border-brand-orange/30">
                  Pioneering the future through 
                  <span className="font-semibold text-brand-accent"> cutting-edge automation</span>,
                  <span className="font-semibold text-brand-accent"> precision instrumentation</span>, and
                  <span className="font-semibold text-brand-accent"> advanced security solutions</span>.
                </span>
              </p>
            </div>

            {/* Premium CTA Buttons */}
            <div className="mt-16 md:mt-20 flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center">
              <a 
                href="/services" 
                className="group relative bg-gradient-to-br from-brand-orange to-brand-accent text-brand-dark font-bold py-5 md:py-6 px-12 md:px-14 rounded-full shadow-2xl hover:shadow-3xl active:shadow-3xl hover:shadow-brand-orange/60 active:shadow-brand-orange/60 transition-all duration-500 transform hover:scale-110 active:scale-110 hover:-translate-y-2 active:-translate-y-2 text-lg md:text-xl"
                aria-label="Explore our engineering services"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-accent to-brand-orange opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 rounded-full"></div>
                <span className="relative z-10 flex items-center">
                  Explore Our Services
                  <span className="ml-3 inline-block group-hover:translate-x-2 group-active:translate-x-2 transition-transform duration-300 text-2xl">→</span>
                </span>
              </a>

              <a 
                href="tel:+263773755716" 
                className="group relative border-3 border-brand-orange text-brand-light font-bold py-5 md:py-6 px-12 md:px-14 rounded-full shadow-xl hover:shadow-brand-orange/40 active:shadow-brand-orange/40 backdrop-blur-md bg-brand-dark/30 hover:bg-brand-orange hover:text-brand-dark active:bg-brand-orange active:text-brand-dark transition-all duration-500 transform hover:scale-110 active:scale-110 text-lg md:text-xl"
                aria-label="Call us now at +263 773755716"
              >
                <span className="relative z-10 flex items-center">
                  📞 Call Now
                  <span className="ml-3 inline-block group-hover:rotate-12 group-active:rotate-12 transition-transform duration-300">✨</span>
                </span>
              </a>
            </div>
          </div>

          {/* Enhanced Scroll Indicator 
          <div className="mt-5 bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 text-center z-20 opacity-80">
            <div className="animate-bounce text-brand-orange text-4xl mb-2">↓</div>
            <p className="text-brand-light text-xs md:text-sm tracking-widest uppercase font-semibold">
              Discover Excellence
            </p> +263 773755716
            <div className="w-0.5 h-16 bg-gradient-to-b from-brand-accent to-transparent mx-auto mt-4"></div>
          </div>*/}


        </section>

        {/* Services Section - Enhanced with Main Service Tag */}
        <section 
          id="services"
          className="flex flex-col justify-center items-center p-4 sm:p-8 py-24 relative z-10"
          style={{ minHeight: '100vh' }}
          data-animate
          aria-labelledby="services-heading"
        >
          <div className="max-w-8xl w-full">
            <div className={`text-center mb-20 transition-all duration-700 ${isVisible.services ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h2 
                id="services-heading"
                className="text-5xl md:text-6xl lg:text-7xl font-black text-brand-orange tracking-tighter mb-6 relative"
              >
                Our Engineering Excellence
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-brand-orange to-brand-accent rounded-full"></div>
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
                  features: ['PLC Programming', 'SCADA Systems', 'VFD Integration', 'Motor Control Centers'],
                  isMain: true
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
                  features: ['Grid-Tie Systems', 'Battery Storage', 'Solar Pumping', 'Energy Management']
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
                  className={`group relative bg-brand-dark/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border-2 border-brand-gray/20 hover:border-brand-orange/80 active:border-brand-orange/80 transition-all duration-500 hover:shadow-3xl active:shadow-3xl hover:shadow-brand-orange/30 active:shadow-brand-orange/30 transform hover:-translate-y-4 active:-translate-y-4 hover:scale-105 active:scale-105 overflow-hidden transition-all duration-500 ${isVisible.services ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Main Service Tag */}
                  {service.isMain && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-brand-orange to-brand-accent text-brand-dark font-bold px-4 py-2 rounded-full text-sm shadow-lg transform rotate-12 z-20">
                      Main Service
                    </div>
                  )}
                  
                  {/* Background effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-brand-accent/5 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-orange/10 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 group-active:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 group-active:scale-110 group-active:rotate-6 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-brand-light mb-4 group-hover:text-brand-orange group-active:text-brand-orange transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-brand-light/90 leading-relaxed mb-6 text-base md:text-lg">
                      {service.desc}
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-brand-light/80 text-sm">
                          <span className="w-2 h-2 bg-brand-accent rounded-full mr-3 group-hover:bg-brand-orange group-active:bg-brand-orange transition-colors duration-300"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-brand-accent font-bold group-hover:text-brand-orange group-active:text-brand-orange transition-colors duration-300 text-lg">
                        Learn More
                      </span>
                      <span className="text-2xl group-hover:translate-x-2 group-hover:text-brand-orange group-active:translate-x-2 group-active:text-brand-orange transition-all duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section - Modern Elite Design */}
        <section 
          id="about"
          className="flex flex-col justify-center items-center p-4 sm:p-8 py-24"
          style={{ minHeight: '100vh' }}
          data-animate
          aria-labelledby="about-heading"
        >
          <div className="max-w-7xl w-full">
            <div className={`transition-all duration-700 ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              
              {/* Section Header */}
              <div className="text-center mb-20">
                <h2 
                  id="about-heading"
                  className="text-5xl md:text-6xl lg:text-7xl font-black text-brand-orange mb-6 tracking-tighter"
                >
                  <span className="bg-gradient-to-r from-brand-orange to-brand-accent bg-clip-text text-transparent">
                    About Jambsmash
                  </span>
                </h2>
              </div>

              {/* Mission & Vision Cards */}
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-20">
                <div className="group relative">
                  <div className="bg-brand-dark/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-brand-orange/20 hover:border-brand-orange/50 active:border-brand-orange/50 transition-all duration-500 hover:shadow-2xl active:shadow-2xl relative overflow-hidden">
                    
                    {/* Corner decorations */}
                    <div className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-brand-orange/30 group-hover:border-brand-orange group-active:border-brand-orange transition-colors duration-300"></div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-brand-orange/30 group-hover:border-brand-orange group-active:border-brand-orange transition-colors duration-300"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-3xl md:text-4xl font-black text-brand-accent mb-6 flex items-center">
                        <span className="text-4xl mr-4">🎯</span>
                        Our Mission
                      </h3>
                      <p className="text-brand-light leading-relaxed text-lg md:text-xl">
                        To provide <span className="font-bold text-brand-orange">added value solutions</span> through a no-compromise quality engineering approach that sustains long-term reliability and functionality for our clients across Zimbabwe and beyond.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="bg-brand-dark/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-brand-accent/20 hover:border-brand-accent/50 active:border-brand-accent/50 transition-all duration-500 hover:shadow-2xl active:shadow-2xl relative overflow-hidden">
                    
                    {/* Corner decorations */}
                    <div className="absolute top-4 right-4 w-16 h-16 border-r-4 border-t-4 border-brand-accent/30 group-hover:border-brand-accent group-active:border-brand-accent transition-colors duration-300"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 border-l-4 border-b-4 border-brand-accent/30 group-hover:border-brand-accent group-active:border-brand-accent transition-colors duration-300"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-3xl md:text-4xl font-black text-brand-accent mb-6 flex items-center">
                        <span className="text-4xl mr-4">🚀</span>
                        Our Vision
                      </h3>
                      <p className="text-brand-light leading-relaxed text-lg md:text-xl">
                        To be the <span className="font-bold text-brand-orange">global leader</span> in telecommunications, automation, instrumentation and electrical systems engineering through unparalleled quality and timely service delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Director Section */}
              <div className="text-center relative">
                <div className="bg-brand-dark/60 backdrop-blur-xl p-12 md:p-16 rounded-3xl border-2 border-brand-gray/30 hover:border-brand-orange/50 active:border-brand-orange/50 transition-all duration-500 hover:shadow-3xl active:shadow-3xl group relative overflow-hidden">
                  
                  {/* Corner decorations */}
                  <div className="absolute top-6 left-6 w-20 h-20 border-l-4 border-t-4 border-brand-orange/30 group-hover:border-brand-orange group-active:border-brand-orange transition-colors duration-300"></div>
                  <div className="absolute bottom-6 right-6 w-20 h-20 border-r-4 border-b-4 border-brand-orange/30 group-hover:border-brand-orange group-active:border-brand-orange transition-colors duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="w-32 h-32 bg-gradient-to-br from-brand-orange to-brand-accent rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl group-hover:shadow-brand-orange/50 group-active:shadow-brand-orange/50 transition-all duration-300 group-hover:scale-110 group-active:scale-110">
                      <span className="text-6xl font-black text-brand-dark">P</span>
                    </div>
                    
                    <h3 className="text-4xl md:text-5xl font-black text-brand-orange mb-4">
                      Meet Our Director
                    </h3>
                    <h4 className="text-3xl md:text-4xl font-bold text-brand-light mb-6">
                      Pride Mashiyani
                    </h4>
                    
                    <div className="space-y-2 mb-8">
                      <p className="text-brand-accent font-bold text-xl flex items-center justify-center">
                        <span className="text-2xl mr-2">🎓</span>
                        B.Tech Electronic Engineering (Honours)
                      </p>
                      <p className="text-brand-accent text-lg flex items-center justify-center">
                        <span className="text-xl mr-2">⚡</span>
                        HND Electrical Power Engineering
                      </p>
                    </div>
                    
                    <blockquote className="text-brand-light/90 text-xl md:text-2xl italic relative max-w-4xl mx-auto">
                      <span className="text-6xl text-brand-orange/30 absolute -top-4 -left-4">"</span>
                      <span className="relative z-10 px-8">
                        Leading innovation in engineering solutions with passion, expertise, and an unwavering commitment to excellence.
                      </span>
                      <span className="text-6xl text-brand-orange/30 absolute -bottom-8 -right-4">"</span>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </section>

        {/* Enhanced Testimonials Section */}
        <section 
          id="testimonials"
          className="flex flex-col justify-center items-center p-4 sm:p-8 py-24 relative z-10"
          style={{ minHeight: '100vh' }}
          data-animate
          aria-labelledby="testimonials-heading"
        >
          <div className="max-w-8xl w-full">
            <div className={`text-center mb-20 transition-all duration-700 ${isVisible.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
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

            {/* Enhanced Testimonial Carousel */}
            <div className="relative max-w-6xl mx-auto mb-16">
              <div className="bg-brand-dark/60 backdrop-blur-xl p-12 md:p-16 rounded-3xl border-2 border-brand-orange/30 shadow-3xl overflow-hidden relative transition-all duration-500">
                
                {/* Animated accents */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-orange/5 to-brand-accent/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-brand-accent/5 to-brand-orange/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                <div className="relative z-10 transition-all duration-700 ease-in-out" key={currentTestimonial}>
                  {/* Star Rating with animation */}
                  <div className="flex justify-center text-brand-accent text-4xl mb-8 transform transition-all duration-300">
                    {'★'.repeat(testimonials[currentTestimonial].stars)}
                  </div>
                  
                  {/* Quote with better transitions */}
                  <blockquote className="text-2xl md:text-3xl text-brand-light text-center leading-relaxed mb-10 italic relative transform transition-all duration-700 ease-in-out">
                    <span className="text-8xl text-brand-orange/20 absolute -top-8 left-0">"</span>
                    <span className="relative z-10 px-8">
                      {testimonials[currentTestimonial].quote}
                    </span>
                    <span className="text-8xl text-brand-orange/20 absolute -bottom-8 right-0">"</span>
                  </blockquote>
                  
                  {/* Client Info with enhanced styling */}
                  <div className="text-center transform transition-all duration-700 ease-in-out">
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

              {/* Enhanced Carousel Indicators */}
              <div className="flex justify-center mt-8 space-x-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-500 transform ${
                      index === currentTestimonial 
                        ? 'bg-brand-orange shadow-lg shadow-brand-orange/50 scale-125' 
                        : 'bg-brand-gray/50 hover:bg-brand-gray hover:scale-110 active:scale-110'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
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
                {
                  icon: '🛡️',
                  title: 'Quality Guaranteed',
                  desc: 'Comprehensive warranties and ongoing support for all our installations.'
                }
              ].map((item, index) => (
                <div key={index} className="group bg-brand-dark/60 backdrop-blur-xl p-8 rounded-2xl border border-brand-gray/20 hover:border-brand-orange/50 active:border-brand-orange/50 transition-all duration-300 hover:shadow-xl active:shadow-xl hover:-translate-y-2 active:-translate-y-2">
                  <div className="text-5xl mb-4 group-hover:scale-110 group-active:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-light mb-3 group-hover:text-brand-orange group-active:text-brand-orange transition-colors duration-300">
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

        {/* Premium Contact Section */}
        <section 
          id="contact"
          className="flex flex-col justify-center items-center p-4 sm:p-8 py-24 relative"
          style={{ minHeight: '100vh' }}
          data-animate
          aria-labelledby="contact-heading"
        >
          <div className={`text-center z-10 max-w-6xl px-4 transition-all duration-700 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            
            <h2 
              id="contact-heading"
              className="text-6xl md:text-7xl lg:text-8xl font-black text-brand-orange mb-8 tracking-tighter"
            >
              <span className="bg-gradient-to-r from-brand-orange to-brand-accent bg-clip-text text-transparent">
                Let's Engineer Your Future
              </span>
            </h2>
            
            <p className="text-2xl md:text-3xl lg:text-4xl text-brand-light mb-8 leading-relaxed font-light">
              <span className="bg-brand-dark/60 backdrop-blur-xl rounded-2xl p-6 inline-block shadow-2xl border border-brand-orange/30">
                Ready to transform your business with 
                <span className="font-bold text-brand-accent"> world-class engineering solutions?</span>
              </span>
            </p>
            
            <p className="text-lg md:text-xl text-white/80 mb-16 max-w-4xl mx-auto leading-relaxed">
              Join hundreds of satisfied clients across Zimbabwe who trust Jambsmash for their automation, security, and energy needs.
            </p>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <a 
                href="/contact" 
                className="group relative bg-gradient-to-br from-brand-orange to-brand-accent text-brand-dark font-black py-6 md:py-7 px-14 md:px-16 rounded-full shadow-3xl hover:shadow-4xl active:shadow-4xl hover:shadow-brand-orange/60 active:shadow-brand-orange/60 transition-all duration-500 transform hover:scale-110 active:scale-110 hover:-translate-y-3 active:-translate-y-3 text-xl md:text-2xl overflow-hidden"
                aria-label="Get your free engineering consultation"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-accent to-brand-orange opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 rounded-full"></div>
                <span className="relative z-10 flex items-center">
      {/* <span className="text-3xl mr-4 group-hover:rotate-12 group-active:rotate-12 transition-transform duration-300">🚀</span>*/}
                  Free Consultation
                  <span className="ml-4 text-3xl group-hover:translate-x-2 group-active:translate-x-2 transition-transform duration-300">→</span>
                </span>
              </a>

              <a 
                href="tel:+263773755716" 
                className="group relative border-4 border-brand-orange text-brand-light font-black py-6 md:py-7 px-14 md:px-16 rounded-full shadow-2xl hover:shadow-brand-orange/50 active:shadow-brand-orange/50 backdrop-blur-xl bg-brand-dark/40 hover:bg-brand-orange hover:text-brand-dark active:bg-brand-orange active:text-brand-dark transition-all duration-500 transform hover:scale-110 active:scale-110 text-xl md:text-2xl overflow-hidden"
                aria-label="Call our engineering experts now"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/10 to-brand-accent/10 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 rounded-full"></div>
                <span className="relative z-10 flex items-center">
                  <span className="text-3xl mr-4 group-hover:animate-bounce">📱</span>
                  Call Us
                  <span className="ml-4 text-3xl group-hover:rotate-12 group-active:rotate-12 transition-transform duration-300">✨</span>
                </span>
              </a>
            </div>
          </div>

          <style jsx>{`
            .border-4 { border-width: 4px; }
            .border-3 { border-width: 3px; }
            .shadow-3xl {
              box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05);
            }
            .shadow-4xl {
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05);
            }
            
            @keyframes float {
              0% { transform: translateY(0px) rotate(0deg); }
              33% { transform: translateY(-10px) rotate(120deg); }
              66% { transform: translateY(5px) rotate(240deg); }
              100% { transform: translateY(0px) rotate(360deg); }
            }
            
            /* Optimized animations for performance */
            :global(.animate-pulse) {
              animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }

            :global(.animate-bounce) {
              animation: bounce 1.5s infinite;
            }

            @keyframes pulse {
              0%, 100% {
                opacity: 1;
                transform: scale(1);
              }
              50% {
                opacity: 0.8;
                transform: scale(1.05);
              }
            }

            @keyframes bounce {
              0%, 100% {
                transform: translateY(0);
                animation-timing-function: cubic-bezier(0.8,0,1,1);
              }
              50% {
                transform: translateY(-25%);
                animation-timing-function: cubic-bezier(0,0,0.2,1);
              }
            }

            /* Ensure smooth transitions */
            :global(*) {
              transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
              transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            }

            /* Performance optimizations */
            :global(.transform) {
              transform: translate3d(0, 0, 0);
            }

            /* Reduce motion for accessibility */
            @media (prefers-reduced-motion: reduce) {
              :global(.animate-pulse),
              :global(.animate-bounce) {
                animation: none;
              }
              
              :global(*) {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
              }
            }
          `}</style>
        </section>
      <Footer />
      </div>
    </div>
  );
}
