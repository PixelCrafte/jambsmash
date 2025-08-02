'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Security Systems', href: '/services#security' },
    { name: 'Industrial Automation', href: '/services#automation' },
    { name: 'Solar Solutions', href: '/services#solar' },
    { name: 'Instrumentation', href: '/services#instrumentation' },
    { name: 'Telecommunications', href: '/services#telecom' },
    { name: 'Energy Management', href: '/services#energy' },
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about#team' },
    { name: 'Projects', href: '/projects' },
    { name: 'Careers', href: '/careers' },
    { name: 'News', href: '/news' },
  ];

  const support = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Support Center', href: '/support' },
    { name: 'Documentation', href: '/docs' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Warranty', href: '/warranty' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-brand-dark via-black to-brand-dark border-t border-brand-orange/20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-brand-orange/30 rounded-full animate-ping"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="group">
                <div className="flex items-center space-x-3 mb-4">
                  {/* Logo with hover animation */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-orange via-brand-accent to-brand-orange rounded-xl flex items-center justify-center transition-all duration-700 group-hover:rotate-[360deg] shadow-lg shadow-brand-orange/30">
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        className="text-brand-dark transition-transform duration-700 group-hover:scale-110"
                        fill="currentColor"
                      >
                        <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.33L19.5 8.5L12 12.67L4.5 8.5L12 4.33ZM4 10.17L11 14.33V19.83L4 15.67V10.17ZM13 19.83V14.33L20 10.17V15.67L13 19.83Z"/>
                      </svg>
                    </div>
                    <div className="absolute inset-0 w-12 h-12 bg-brand-orange rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-md -z-10"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">
                      <span className="text-brand-orange">JAMB</span>
                      <span className="text-brand-light">SMASH</span>
                    </h3>
                    <p className="text-xs text-brand-accent font-medium tracking-widest -mt-1">INVESTMENTS</p>
                  </div>
                </div>
                
                <p className="text-brand-gray leading-relaxed mb-6">
                  Pioneering engineering solutions in automation, instrumentation, and security. 
                  Building the future with cutting-edge technology and unparalleled expertise.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-brand-light hover:text-brand-orange transition-colors duration-300">
                    <span className="text-brand-orange">📍</span>
                    <span className="text-sm">7 Tilbury Road, Willowvale, Harare</span>
                  </div>
                  <div className="flex items-center space-x-3 text-brand-light hover:text-brand-orange transition-colors duration-300">
                    <span className="text-brand-orange">📞</span>
                    <div className="text-sm">
                      <div>+263 773755716</div>
                      <div>+263 773755717</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-brand-light hover:text-brand-orange transition-colors duration-300">
                    <span className="text-brand-orange">📧</span>
                    <a href="mailto:jambsmash20@gmail.com" className="text-sm hover:underline">
                      jambsmash20@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-brand-orange relative">
                Our Services
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-brand-orange to-brand-accent"></div>
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.href}
                      className="group flex items-center space-x-2 text-brand-gray hover:text-brand-orange transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="w-1 h-1 bg-brand-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="text-sm">{service.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-brand-orange relative">
                Company
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-brand-orange to-brand-accent"></div>
              </h4>
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group flex items-center space-x-2 text-brand-gray hover:text-brand-orange transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="w-1 h-1 bg-brand-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="text-sm">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Newsletter */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-brand-orange relative">
                Support
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-brand-orange to-brand-accent"></div>
              </h4>
              <ul className="space-y-3 mb-8">
                {support.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group flex items-center space-x-2 text-brand-gray hover:text-brand-orange transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="w-1 h-1 bg-brand-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="text-sm">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-brand-dark/50 to-brand-dark/80 backdrop-blur-sm p-6 rounded-2xl border border-brand-orange/20">
                <h5 className="text-lg font-bold text-brand-light mb-3">Stay Updated</h5>
                <p className="text-brand-gray text-sm mb-4">Get the latest news and updates from Jambsmash</p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-brand-dark/50 border border-brand-orange/30 rounded-lg px-3 py-2 text-brand-light placeholder-brand-gray focus:outline-none focus:border-brand-orange transition-colors duration-300 text-sm"
                  />
                  <button className="bg-gradient-to-r from-brand-orange to-brand-accent text-brand-dark font-bold px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider with glow effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-orange/20 to-transparent h-px"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-brand-orange to-transparent"></div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
              <p className="text-brand-gray text-sm">
                © {currentYear} Jambsmash Investments. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs text-brand-gray">
                <a href="/privacy" className="hover:text-brand-orange transition-colors duration-300">Privacy Policy</a>
                <span>•</span>
                <a href="/terms" className="hover:text-brand-orange transition-colors duration-300">Terms of Service</a>
                <span>•</span>
                <a href="/cookies" className="hover:text-brand-orange transition-colors duration-300">Cookie Policy</a>
              </div>
            </div>

            {/* Social Links & Certifications */}
            <div className="flex items-center space-x-6">
              {/* Professional Badges */}
              <div className="flex items-center space-x-3">
                <div className="group relative">
                  <div className="bg-gradient-to-br from-brand-orange/20 to-brand-accent/20 p-2 rounded-lg border border-brand-orange/30 hover:border-brand-orange/50 transition-all duration-300">
                    <span className="text-xs font-bold text-brand-orange">ISO</span>
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-brand-dark/90 text-brand-light text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Quality Certified
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="bg-gradient-to-br from-brand-orange/20 to-brand-accent/20 p-2 rounded-lg border border-brand-orange/30 hover:border-brand-orange/50 transition-all duration-300">
                    <span className="text-xs font-bold text-brand-orange">ENG</span>
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-brand-dark/90 text-brand-light text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Licensed Engineers
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center space-x-3">
                <a
                  href="#"
                  className="group w-10 h-10 bg-gradient-to-br from-brand-orange/10 to-brand-accent/10 rounded-lg flex items-center justify-center border border-brand-orange/20 hover:border-brand-orange/50 hover:shadow-lg hover:shadow-brand-orange/20 transition-all duration-300"
                >
                  <span className="text-brand-orange group-hover:scale-110 transition-transform duration-300">📘</span>
                </a>
                <a
                  href="#"
                  className="group w-10 h-10 bg-gradient-to-br from-brand-orange/10 to-brand-accent/10 rounded-lg flex items-center justify-center border border-brand-orange/20 hover:border-brand-orange/50 hover:shadow-lg hover:shadow-brand-orange/20 transition-all duration-300"
                >
                  <span className="text-brand-orange group-hover:scale-110 transition-transform duration-300">💼</span>
                </a>
                <a
                  href="#"
                  className="group w-10 h-10 bg-gradient-to-br from-brand-orange/10 to-brand-accent/10 rounded-lg flex items-center justify-center border border-brand-orange/20 hover:border-brand-orange/50 hover:shadow-lg hover:shadow-brand-orange/20 transition-all duration-300"
                >
                  <span className="text-brand-orange group-hover:scale-110 transition-transform duration-300">📧</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Floating CTA */}
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <a
            href="/contact"
            className="group bg-gradient-to-r from-brand-orange to-brand-accent text-brand-dark font-bold px-6 py-3 rounded-full shadow-2xl shadow-brand-orange/30 hover:shadow-brand-orange/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center space-x-2"
          >
            <span>Quick Quote</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">⚡</span>
          </a>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 w-12 h-12 bg-gradient-to-br from-brand-orange/90 to-brand-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 z-50 group"
        >
          <span className="text-brand-dark group-hover:-translate-y-0.5 transition-transform duration-300">↑</span>
        </button>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent"></div>
    </footer>
  );
}
