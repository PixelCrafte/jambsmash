'use client';
import Image from "next/image";

import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Linkedin, 
  MessageCircle,
  ArrowUp 
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Security Systems', href: '/services' },
    { name: 'Industrial Automation', href: '/services' },
    { name: 'Solar Solutions', href: '/services' },
    { name: 'Instrumentation', href: '/services' },
    { name: 'Telecommunications', href: '/services' },
    { name: 'Energy Management', href: '/services' },
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about' },
    { name: 'Projects', href: '/about' },
    //{ name: 'Careers', href: '/careers' },
    //{ name: 'News', href: '/news' },
  ];

  const support = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Support Center', href: '/contact' },
    //{ name: 'Documentation', href: '/docs' },
    //{ name: 'FAQ', href: '/faq' },
    //{ name: 'Warranty', href: '/warranty' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-brand-dark via-gray-900 to-brand-dark border-t border-brand-orange/30 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-orange/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-accent/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-brand-orange/40 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="group">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative group">
                    <Image 
                      src="/icons/jambsmash_logo.svg" 
                      alt="Jambsmash Logo"
                      width="56" 
                      height="56" 
                      className="w-14 h-14 transition-all duration-700 group-hover:rotate-[360deg] group-active:rotate-[360deg]"
                      style={{ animation: 'spinOnce 1s ease-out' }}
                      onError={(e) => {
                        // Fallback to PNG if SVG fails
                        e.target.src = "/icons/jambsmash_logo.png";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black">
                      <span className="text-brand-orange">JAMB</span>
                      <span className="text-brand-light">SMASH</span>
                    </h3>
                    <p className="text-xs text-brand-accent font-semibold tracking-widest -mt-1">INVESTMENTS</p>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-8 text-base">
                  Pioneering engineering solutions in automation, instrumentation, and security. 
                  Building the future with cutting-edge technology and unparalleled expertise.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 text-brand-light hover:text-brand-orange transition-colors duration-300 group">
                    <MapPin className="text-brand-orange w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200 group-hover:text-brand-orange transition-colors duration-300">7 Tilbury Road, Willowvale, Harare</span>
                  </div>
                  <div className="flex items-start space-x-4 text-brand-light hover:text-brand-orange transition-colors duration-300 group">
                    <Phone className="text-brand-orange w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="text-gray-200 group-hover:text-brand-orange transition-colors duration-300">
                      <div>+263 773755716</div>
                      <div>+263 773755717</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 text-brand-light hover:text-brand-orange transition-colors duration-300 group">
                    <Mail className="text-brand-orange w-5 h-5 mt-0.5 flex-shrink-0" />
                    <a href="mailto:jambsmash20@gmail.com" className="text-gray-200 group-hover:text-brand-orange transition-colors duration-300 hover:underline">
                      jambsmash20@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-8">
              <h4 className="text-2xl font-bold text-brand-orange relative">
                Our Services
                <div className="absolute -bottom-3 left-0 w-16 h-1 bg-gradient-to-r from-brand-orange to-brand-accent rounded-full"></div>
              </h4>
              <ul className="space-y-4">
                {services.map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.href}
                      className="group flex items-center space-x-3 text-gray-200 hover:text-brand-orange transition-all duration-300 hover:translate-x-2"
                    >
                      <span className="w-2 h-2 bg-brand-orange rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125"></span>
                      <span className="text-base font-normal">{service.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-8">
              <h4 className="text-2xl font-bold text-brand-orange relative">
                Company
                <div className="absolute -bottom-3 left-0 w-16 h-1 bg-gradient-to-r from-brand-orange to-brand-accent rounded-full"></div>
              </h4>
              <ul className="space-y-4">
                {company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group flex items-center space-x-3 text-gray-200 hover:text-brand-orange transition-all duration-300 hover:translate-x-2"
                    >
                      <span className="w-2 h-2 bg-brand-orange rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125"></span>
                      <span className="text-base font-normal">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Social */}
            <div className="space-y-8">
              <h4 className="text-2xl font-bold text-brand-orange relative">
                Support
                <div className="absolute -bottom-3 left-0 w-16 h-1 bg-gradient-to-r from-brand-orange to-brand-accent rounded-full"></div>
              </h4>
              <ul className="space-y-4 mb-10">
                {support.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group flex items-center space-x-3 text-gray-200 hover:text-brand-orange transition-all duration-300 hover:translate-x-2"
                    >
                      <span className="w-2 h-2 bg-brand-orange rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125"></span>
                      <span className="text-base font-normal">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social Media */}
              <div>
                <h5 className="text-lg font-bold text-brand-light mb-6">Connect With Us</h5>
                <div className="flex items-center space-x-4">
                  <a
                    href="#"
                    className="group w-12 h-12 bg-gradient-to-br from-brand-orange/20 to-brand-accent/20 rounded-2xl flex items-center justify-center border border-brand-orange/30 hover:border-brand-orange hover:shadow-xl hover:shadow-brand-orange/30 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 active:scale-110 active:-translate-y-1"
                  >
                    <Facebook className="text-brand-orange w-5 h-5 group-hover:scale-110 group-active:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="#"
                    className="group w-12 h-12 bg-gradient-to-br from-brand-orange/20 to-brand-accent/20 rounded-2xl flex items-center justify-center border border-brand-orange/30 hover:border-brand-orange hover:shadow-xl hover:shadow-brand-orange/30 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 active:scale-110 active:-translate-y-1"
                  >
                    <Linkedin className="text-brand-orange w-5 h-5 group-hover:scale-110 group-active:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="#"
                    className="group w-12 h-12 bg-gradient-to-br from-brand-orange/20 to-brand-accent/20 rounded-2xl flex items-center justify-center border border-brand-orange/30 hover:border-brand-orange hover:shadow-xl hover:shadow-brand-orange/30 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 active:scale-110 active:-translate-y-1"
                  >
                    <MessageCircle className="text-brand-orange w-5 h-5 group-hover:scale-110 group-active:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Divider */}
        <div className="relative mx-6 lg:mx-8">
          <div className="h-px bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent"></div>
          <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-brand-orange/80 to-transparent blur-sm"></div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-300 text-base font-medium">
                © {currentYear} Jambsmash Investments. All rights reserved.
              </p>
            </div>

            {/* Made by Pixelcrafte */}
            <div className="text-center lg:text-right">
              <p className="text-gray-400 text-sm">
                Made with ❤️ by{' '}
                <a 
                  href="https://pixelcrafte.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-orange hover:text-brand-accent transition-colors duration-300 font-semibold hover:underline"
                >
                  Pixelcrafte
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-8 w-14 h-14 bg-gradient-to-br from-brand-orange to-brand-accent backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl shadow-brand-orange/30 hover:shadow-brand-orange/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 hover:rotate-[360deg] active:scale-110 active:-translate-y-2 active:rotate-[360deg] z-50 group"
        >
          <ArrowUp className="text-brand-dark w-6 h-6 group-hover:-translate-y-1 group-active:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent blur-sm"></div>
      
      {/* Custom CSS for logo rotation */}
      <style jsx>{`
        @keyframes spinOnce {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </footer>
  );
}
