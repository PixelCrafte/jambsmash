'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Services', href: '/services', icon: '⚙️' },
    { name: 'About', href: '/about', icon: '🏢' },
    /*{ name: 'Projects', href: '/projects', icon: '📋' },*/
    { name: 'Contact', href: '/contact', icon: '📞' },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-brand-dark/95 backdrop-blur-xl border-b border-brand-orange/30 shadow-2xl shadow-brand-orange/10' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="group flex items-center space-x-3">
                {/* Actual Logo with 360° spin animation */}
                <div className="relative">
                  <Image
                    src="/icons/jambsmash_logo.svg" 
                    alt="Jambsmash Logo"
                    width={40} // matches w-10 (10 × 4px)
                    height={40}
                    className="w-10 h-10 md:w-12 md:h-12 transition-all duration-700 group-hover:rotate-[360deg] group-active:rotate-[360deg] animate-[spin_1s_ease-out]"
                    onError={(e) => {
                      // Fallback to PNG if SVG fails
                      e.target.src = "/icons/jambsmash_logo.png";
                    }}
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl md:text-2xl font-black tracking-tight">
                    <span className="text-brand-orange drop-shadow-lg">JAMB</span>
                    <span className="text-brand-light">SMASH</span>
                  </h1>
                  <p className="text-xs text-brand-accent font-medium tracking-widest -mt-1">INVESTMENTS</p>
                </div>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-brand-orange/10"
                >
                  <span className="flex items-center space-x-2 text-brand-light group-hover:text-brand-orange transition-colors duration-300">
                    <span className="text-sm opacity-70 group-hover:opacity-100">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </span>
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-orange to-brand-accent group-hover:w-3/4 group-hover:left-[12.5%] transition-all duration-300"></div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-lg bg-brand-orange opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/contact"
                className="group bg-gradient-to-r from-brand-orange to-brand-accent text-brand-dark font-bold px-6 py-2.5 rounded-xl hover:shadow-2xl hover:shadow-brand-orange/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
              >
                <span className="flex items-center space-x-2">
                  <span>Get Quote</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">⚡</span>
                </span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 rounded-lg bg-brand-orange/10 hover:bg-brand-orange/20 transition-colors duration-300 flex items-center justify-center"
              >
                <div className="w-5 h-4 relative">
                  <span className={`absolute top-0 left-0 w-full h-0.5 bg-brand-orange transition-all duration-300 ${
                    isOpen ? 'rotate-45 top-1.5' : ''
                  }`}></span>
                  <span className={`absolute top-1.5 left-0 w-full h-0.5 bg-brand-orange transition-all duration-300 ${
                    isOpen ? 'opacity-0' : ''
                  }`}></span>
                  <span className={`absolute top-3 left-0 w-full h-0.5 bg-brand-orange transition-all duration-300 ${
                    isOpen ? '-rotate-45 top-1.5' : ''
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-brand-dark/98 backdrop-blur-xl border-t border-brand-orange/20 shadow-2xl">
            <div className="px-4 py-6 space-y-2">
              {menuItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="group block px-4 py-3 rounded-xl bg-brand-dark/50 hover:bg-brand-orange/10 transition-all duration-300 transform hover:translate-x-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="flex items-center space-x-3 text-brand-light group-hover:text-brand-orange transition-colors duration-300">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </span>
                </a>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4 border-t border-brand-orange/20">
                <a
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-gradient-to-r from-brand-orange to-brand-accent text-brand-dark font-bold text-center py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Get Your Quote Today ⚡
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
