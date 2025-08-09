import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield, Cpu, Settings, Sun, Network, Monitor, Zap, CheckCircle2, Star, ArrowDown } from 'lucide-react';
import  Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
//Mock components for Navbar and Footer
//const Navbar = () => <nav className="fixed top-0 w-full z-50 bg-brand-dark/20 backdrop-blur-xl border-b border-brand-orange/20 h-16"></nav>;
//const Footer = () => <footer className="w-full bg-brand-dark/20 backdrop-blur-xl border-t border-brand-orange/20 h-20"></footer>;

const ServiceCard = ({ title, description, icon: Icon, features, imageUrl, delay = 0, isActive, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative bg-brand-dark/10 backdrop-blur-2xl rounded-3xl overflow-hidden border transition-all duration-700 cursor-pointer transform ${
        isActive || isHovered 
          ? 'border-brand-orange/80 scale-[1.02] shadow-2xl shadow-brand-orange/20' 
          : 'border-brand-orange/20 hover:border-brand-orange/60'
      }`}
      style={{ 
        animationDelay: `${delay}ms`,
        background: 'linear-gradient(135deg, rgba(26, 59, 68, 0.1) 0%, rgba(10, 25, 47, 0.15) 100%)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onToggle}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-brand-accent/5 opacity-0 transition-opacity duration-700 ${
        isActive || isHovered ? 'opacity-100' : ''
      }`}></div>
      
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-brand-orange/20 to-brand-accent/20 rounded-3xl blur opacity-0 transition-opacity duration-700 ${
        isActive || isHovered ? 'opacity-100' : ''
      }`}></div>
      
      {/* Hero Image */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <Image 
          src={imageUrl} 
          alt={title} 
          className={`w-full h-56 lg:h-64 object-cover transition-all duration-700 ${
            isActive || isHovered ? 'scale-110' : 'scale-100'
          }`}
          onError={(e) => { 
            e.currentTarget.onerror = null; 
            e.currentTarget.src = `https://placehold.co/600x400/1A3B44/DC713E?text=${encodeURIComponent(title)}`; 
          }} 
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent transition-opacity duration-700 ${
          isActive || isHovered ? 'opacity-90' : 'opacity-60'
        }`}></div>
        
        {/* Floating Icon */}
        <div className={`absolute top-6 right-6 p-3 rounded-xl bg-brand-dark/60 backdrop-blur-sm border border-brand-orange/40 transition-all duration-500 ${
          isActive || isHovered ? 'bg-brand-orange/20 border-brand-orange/80 scale-110' : ''
        }`}>
          <Icon className={`w-6 h-6 transition-colors duration-500 ${
            isActive || isHovered ? 'text-brand-orange' : 'text-brand-light'
          }`} />
        </div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className={`text-2xl lg:text-3xl font-bold transition-all duration-500 ${
            isActive || isHovered ? 'text-brand-orange' : 'text-white'
          }`}>
            {title}
          </h3>
          <div className={`h-1 bg-gradient-to-r from-brand-orange to-brand-accent rounded-full mt-3 transition-all duration-700 ${
            isActive || isHovered ? 'w-24' : 'w-12'
          }`}></div>
        </div>
      </div>
      
      <div className="relative p-8 lg:p-10">
        {/* Content starts here - removed duplicate title since it's now on image */}

        {/* Description */}
        <p className={`text-lg leading-relaxed mb-6 transition-colors duration-500 ${
          isActive || isHovered ? 'text-brand-light' : 'text-brand-light/80'
        }`}>
          {description}
        </p>

        {/* Features */}
        <div className={`space-y-3 transition-all duration-700 transform ${
          isActive || isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-80'
        }`}>
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
              <span className="text-brand-light/90 leading-relaxed text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* Action button */}
        <div className={`mt-8 transition-all duration-700 transform ${
          isActive || isHovered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}>
          <button className="group/btn w-full bg-gradient-to-r from-brand-orange to-brand-accent text-brand-dark font-bold py-4 px-6 rounded-xl transition-all duration-500 hover:shadow-xl hover:shadow-brand-orange/30 transform hover:scale-[1.02]">
            <span className="flex items-center justify-center space-x-2">
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const FloatingElement = ({ children, delay = 0, className = "" }) => (
  <div 
    className={`animate-float ${className}`}
    style={{ 
      animationDelay: `${delay}ms`,
      animationDuration: '6s'
    }}
  >
    {children}
  </div>
);

const StatsCard = ({ number, label, delay = 0 }) => (
  <div 
    className="text-center transform transition-all duration-700 hover:scale-110"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="text-4xl lg:text-5xl font-black text-brand-orange mb-2 animate-pulse-glow">
      {number}
    </div>
    <div className="text-brand-light/80 font-medium">{label}</div>
  </div>
);

const Section = ({ className = '', children, transparent = false }) => (
  <section className={`min-h-screen w-full flex flex-col justify-center items-center p-4 md:p-8 lg:p-16 relative ${className}`}>
    <div className="max-w-7xl w-full animate-fade-in-up">
      {children}
    </div>
  </section>
);

export default function ServicesOverlay() {
  const [activeService, setActiveService] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: "Electronic Security Systems",
      icon: Shield,
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center",
      description: "Comprehensive security solutions including HD CCTV with AI analytics, biometric access control, intruder detection, fire monitoring, and hazardous gas detection systems. Protecting your most valuable assets with cutting-edge technology and 24/7 monitoring capabilities.",
      features: [
        "HD & IP CCTV Systems with AI-powered analytics and facial recognition",
        "Biometric & Smart Card Access Control with multi-factor authentication",
        "Advanced Intruder Detection with smart sensors and mobile alerts",
        "Fire & Hazardous Gas Monitoring with automated emergency response",
        "24/7 Remote Monitoring and instant notification systems",
        "Integration with existing security infrastructure"
      ]
    },
    {
      title: "Industrial Automation & Control",
      icon: Cpu,
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&crop=center",
      description: "Revolutionizing industrial operations with state-of-the-art automation systems, PLC/SCADA integration, variable frequency drives, and smart energy management solutions. Enhancing efficiency while reducing operational costs through intelligent control systems.",
      features: [
        "PLC & SCADA System Design, Integration and Programming",
        "Variable Frequency Drive (VFD) Supply and Configuration",
        "Electric Motors and Industrial Drive Systems",
        "Smart Energy Management with real-time monitoring",
        "Process Automation and Control System Optimization",
        "Technical Expertise and Comprehensive Spare Parts Supply"
      ]
    },
    {
      title: "Instrumentation & Calibration",
      icon: Settings,
      imageUrl: "https://images.unsplash.com/photo-1565608438257-fac3c27beb36?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Precision instrumentation services ensuring your equipment performs to the highest standards. Comprehensive calibration and repair services for water quality analyzers, pH meters, conductivity monitors, turbidity meters, and chlorine detection systems.",
      features: [
        "Water Quality Analyzer Calibration (pH, Conductivity, Turbidity)",
        "Chlorine Monitors and Chemical Detection Equipment",
        "On-site & Laboratory-based Calibration Services",
        "Precision Test Equipment Repair and Maintenance",
        "Quality Standards Compliance and Certification",
        "Measurement Drift Correction and Performance Optimization"
      ]
    },
    {
      title: "Solar & Electrical Solutions",
      icon: Sun,
      imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop&crop=center",
      description: "Sustainable energy solutions with custom solar installations, solar pumping systems, energy management, and comprehensive electrical services. From residential to industrial scale projects with uninterruptible power solutions and energy optimization.",
      features: [
        "Solar Systems of Any Size - Residential to Industrial Scale",
        "Solar Water Pumping and Storage Systems",
        "20kVA+ Solar Systems for Critical Infrastructure",
        "Uninterruptible Power Solutions (UPS) and Battery Backup",
        "Energy Management Solutions with Data Logging",
        "Variable Frequency Drives and Motor Control Systems"
      ]
    },
    {
      title: "Network & Communication",
      icon: Network,
      imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop&crop=center",
      description: "Advanced network infrastructure and communication solutions including network design, cabling, routing, multimedia equipment installation, and comprehensive troubleshooting services for small businesses and enterprises.",
      features: [
        "Network Design and Architecture for Small Businesses",
        "Professional Network Cabling and Infrastructure",
        "Routing, Switching and Media Converter Solutions",
        "Multimedia Equipment Supply and Installation",
        "Network Troubleshooting and Optimization",
        "End-to-End Communication System Integration"
      ]
    }
  ];

  return (
    <div className="relative min-h-screen">
      <Navbar />
      
      {/* Floating decorative elements */}
      <FloatingElement delay={0} className="fixed top-20 left-10 opacity-20">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-orange to-brand-accent blur-xl"></div>
      </FloatingElement>
      
      <FloatingElement delay={2000} className="fixed top-1/3 right-16 opacity-20">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-accent to-brand-orange blur-2xl"></div>
      </FloatingElement>
      
      <FloatingElement delay={4000} className="fixed bottom-1/4 left-1/4 opacity-20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-orange/50 to-brand-accent/50 blur-xl"></div>
      </FloatingElement>

      {/* Hero Section */}
      <Section className="text-center relative" transparent>
        <div 
          className="absolute inset-0 bg-gradient-radial from-brand-orange/10 via-transparent to-transparent"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-brand-dark/20 backdrop-blur-xl px-6 py-3 rounded-full border border-brand-orange/30">
              <Star className="w-5 h-5 text-brand-orange" />
              <span className="text-brand-accent font-semibold">Engineering Excellence Since 2020</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-brand-orange to-brand-accent animate-gradient-x">
              Our Services
            </span>
          </h1>
          
          <p className="mt-8 max-w-4xl mx-auto text-xl md:text-2xl text-brand-light/90 leading-relaxed font-light">
            Delivering specialized engineering solutions with 
            <span className="text-brand-accent font-semibold"> unparalleled quality</span>, 
            <span className="text-brand-accent font-semibold"> precision</span>, and 
            <span className="text-brand-accent font-semibold"> innovation</span>.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 mb-16">
            <StatsCard number="5+" label="Core Services" delay={0} />
            <StatsCard number="100+" label="Projects Delivered" delay={200} />
            <StatsCard number="24/7" label="Support Available" delay={400} />
            <StatsCard number="2020" label="Founded" delay={600} />
          </div>

          <div className="animate-bounce-slow">
            <div className="inline-flex items-center space-x-2 text-brand-orange text-lg font-medium">
              <span>Explore Our Expertise</span>
              <ArrowDown className="w-6 h-6 animate-pulse" />
            </div>
          </div>
        </div>
      </Section>

      {/* Services Grid Section */}
      <Section transparent>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-accent mb-6">
            Engineering Excellence
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-brand-orange to-brand-accent mx-auto rounded-full"></div>
          <p className="mt-8 max-w-3xl mx-auto text-xl text-brand-light/80 leading-relaxed">
            From security systems to industrial automation, we deliver cutting-edge solutions 
            that drive innovation and efficiency across all sectors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              features={service.features}
              imageUrl={service.imageUrl}
              delay={index * 200}
              isActive={activeService === index}
              onToggle={() => setActiveService(activeService === index ? null : index)}
            />
          ))}
        </div>
      </Section>

      {/* Why Choose Us Section */}
      <Section transparent>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Jambstronics?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-accent to-brand-orange mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Proven Expertise",
              description: "Highly qualified engineers with BTech Electronic Engineering and MSc Project Management credentials delivering excellence since 2020."
            },
            {
              icon: Zap,
              title: "Rapid Response",
              description: "Our spirited energy and engagement ensure fast turnaround times without compromising on quality or attention to detail."
            },
            {
              icon: Settings,
              title: "Quality Assurance",
              description: "No-compromise quality engineering approach with adherence to international standards and best practices in all operations."
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="group bg-brand-dark/10 backdrop-blur-xl rounded-2xl p-8 border border-brand-orange/20 hover:border-brand-orange/60 transition-all duration-700 hover:scale-105 hover:shadow-xl hover:shadow-brand-orange/20"
            >
              <div className="p-4 rounded-xl bg-brand-orange/10 backdrop-blur-sm border border-brand-orange/30 w-fit mb-6 group-hover:bg-brand-orange/20 group-hover:scale-110 transition-all duration-500">
                <item.icon className="w-8 h-8 text-brand-orange" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-orange transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-brand-light/80 leading-relaxed group-hover:text-brand-light transition-colors duration-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Call to Action Section */}
      <Section className="text-center relative" transparent>
        <div 
          className="absolute inset-0 bg-gradient-radial from-brand-accent/10 via-transparent to-transparent"
          style={{ transform: `translateY(${scrollY * -0.3}px)` }}
        ></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-orange via-brand-accent to-brand-orange animate-gradient-x mb-8">
            Ready to Transform Your Operations?
          </h2>
          
          <p className="mt-8 max-w-3xl mx-auto text-xl md:text-2xl text-brand-light/90 leading-relaxed">
            Our team of specialists is ready to design and implement solutions tailored to your specific requirements. 
            Let&#39;s collaborate to bring your vision to life with precision engineering and unmatched expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
           <a href="/contact">
            <button className="group inline-flex items-center bg-gradient-to-r from-brand-orange to-brand-accent text-brand-dark font-bold py-6 px-12 rounded-2xl text-xl hover:shadow-2xl hover:shadow-brand-orange/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
              <span>Request Consultation</span>
              <ArrowRight className="ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" />
            </button>
           </a>
           
           <a href="/about">
            <button className="group inline-flex items-center bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-brand-dark font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
              <Monitor className="mr-3 w-6 h-6" />
              <span>View Portfolio</span>
            </button>
           </a>
          </div>

          {/* Contact Info */}
          <div className="mt-16 bg-brand-dark/10 backdrop-blur-2xl rounded-2xl p-8 border border-brand-orange/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-brand-orange mb-6">Get In Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-brand-light/80">
              <div>
                <div className="font-semibold text-brand-light mb-2">Phone</div>
                <div>+263 773 755 716</div>
                <div>+263 719 180 300</div>
              </div>
              <div>
                <div className="font-semibold text-brand-light mb-2">Email</div>
                <div>jambsmash20@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(220, 113, 62, 0.5); }
          50% { text-shadow: 0 0 40px rgba(220, 113, 62, 0.8), 0 0 60px rgba(255, 167, 38, 0.3); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-gradient-x { 
          animation: gradient-x 8s ease infinite;
          background-size: 200% 200%;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }

        /* Mobile touch improvements */
        @media (hover: none) {
          .group:active .group-hover\\:scale-110 { transform: scale(1.1); }
          .group:active .group-hover\\:translate-x-2 { transform: translateX(8px); }
          .group:active .group-hover\\:bg-brand-orange\\/20 { background-color: rgba(220, 113, 62, 0.2); }
          .group:active .group-hover\\:text-brand-orange { color: #DC713E; }
          .group:active .group-hover\\:border-brand-orange\\/60 { border-color: rgba(220, 113, 62, 0.6); }
        }
      `}</style>
    </div>
  );
}
