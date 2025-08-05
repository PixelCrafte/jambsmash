'use client';

import { Scroll } from '@react-three/drei';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Overlay() {
  return (
    <Scroll html style={{ width: '100%', position: 'relative', zIndex: 10 }}>
      <div className="sticky top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="w-full relative z-10">

        {/* Section 1: Hero */}
        <section className="flex flex-col justify-center items-center p-4 pt-20 relative" style={{ minHeight: '100dvh' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark/30 pointer-events-none"></div>
          <div className="text-center z-20 relative">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
              <span className="inline-block animate-pulse text-brand-orange drop-shadow-2xl">JAMB</span>
              <span className="inline-block animate-bounce delay-300 text-brand-light"> SMASH</span>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-accent mt-2 tracking-widest">INVESTMENTS</div>
            </h1>
            <p className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl text-brand-light font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              Pioneering solutions in <span className="text-brand-orange font-semibold">automation</span>,
              <span className="text-brand-orange font-semibold"> instrumentation</span>, and
              <span className="text-brand-orange font-semibold"> security</span>
            </p>
            <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              <a href="/services" className="group bg-gradient-to-r from-brand-orange to-brand-accent text-brand-dark font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl hover:shadow-2xl hover:shadow-brand-orange/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-sm md:text-base">
                Explore Our Services <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <a href="/contact" className="group border-2 border-brand-orange text-brand-orange font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl hover:bg-brand-orange hover:text-brand-dark transition-all duration-300 transform hover:scale-105 text-sm md:text-base">
                Get Started Today <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">✦</span>
              </a>
            </div>
          </div>
          <div className="absolute bottom-6 md:bottom-10 animate-bounce z-20">
            <div className="text-brand-orange text-xl md:text-2xl">↓</div>
            <p className="text-brand-light text-xs md:text-sm mt-2">Scroll to Discover</p>
          </div>
        </section>

        {/* Section 2: Services */}
        <section className="flex flex-col justify-center items-center p-4 md:p-8 bg-transparent relative z-10" style={{ minHeight: '100dvh' }}>
          <div className="max-w-6xl w-full">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-orange mb-4 tracking-tight">
                Our Core Services
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-brand-light max-w-2xl mx-auto">
                Comprehensive engineering solutions designed to power your future
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="group bg-brand-dark/80 backdrop-blur-lg p-4 md:p-6 rounded-2xl border border-brand-orange/20 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/10 hover:-translate-y-1">
                <div className="text-3xl text-brand-orange mb-2">🔒</div>
                <h3 className="text-base sm:text-lg font-bold text-brand-light mb-2">Electronic Security Systems</h3>
                <p className="text-brand-gray mb-3 text-sm">CCTV, access control, fire monitoring, and hazardous gas detection systems</p>
                <div className="text-brand-accent font-semibold group-hover:text-brand-orange transition-colors text-sm">Learn More →</div>
              </div>
              <div className="group bg-brand-dark/80 backdrop-blur-lg p-4 md:p-6 rounded-2xl border border-brand-orange/20 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/10 hover:-translate-y-1">
                <div className="text-3xl text-brand-orange mb-2">⚙️</div>
                <h3 className="text-base sm:text-lg font-bold text-brand-light mb-2">Industrial Automation</h3>
                <p className="text-brand-gray mb-3 text-sm">Variable frequency drives, electric motors, and comprehensive automation solutions</p>
                <div className="text-brand-accent font-semibold group-hover:text-brand-orange transition-colors text-sm">Learn More →</div>
              </div>
              <div className="group bg-brand-dark/80 backdrop-blur-lg p-4 md:p-6 rounded-2xl border border-brand-orange/20 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/10 hover:-translate-y-1">
                <div className="text-3xl text-brand-orange mb-2">🔬</div>
                <h3 className="text-base sm:text-lg font-bold text-brand-light mb-2">Instrumentation & Calibration</h3>
                <p className="text-brand-gray mb-3 text-sm">pH meters, conductivity analyzers, turbidity meters, and calibration services</p>
                <div className="text-brand-accent font-semibold group-hover:text-brand-orange transition-colors text-sm">Learn More →</div>
              </div>
              <div className="group bg-brand-dark/80 backdrop-blur-lg p-4 md:p-6 rounded-2xl border border-brand-orange/20 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/10 hover:-translate-y-1">
                <div className="text-3xl text-brand-orange mb-2">☀️</div>
                <h3 className="text-base sm:text-lg font-bold text-brand-light mb-2">Solar Solutions</h3>
                <p className="text-brand-gray mb-3 text-sm">Solar systems installation, pumping systems, and renewable energy solutions</p>
                <div className="text-brand-accent font-semibold group-hover:text-brand-orange transition-colors text-sm">Learn More →</div>
              </div>
              <div className="group bg-brand-dark/80 backdrop-blur-lg p-4 md:p-6 rounded-2xl border border-brand-orange/20 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/10 hover:-translate-y-1">
                <div className="text-3xl text-brand-orange mb-2">📡</div>
                <h3 className="text-base sm:text-lg font-bold text-brand-light mb-2">Telecommunications</h3>
                <p className="text-brand-gray mb-3 text-sm">Network infrastructure, multimedia equipment, and communication solutions</p>
                <div className="text-brand-accent font-semibold group-hover:text-brand-orange transition-colors text-sm">Learn More →</div>
              </div>
              <div className="group bg-brand-dark/80 backdrop-blur-lg p-4 md:p-6 rounded-2xl border border-brand-orange/20 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/10 hover:-translate-y-1">
                <div className="text-3xl text-brand-orange mb-2">⚡</div>
                <h3 className="text-base sm:text-lg font-bold text-brand-light mb-2">Energy Management</h3>
                <p className="text-brand-gray mb-3 text-sm">Energy monitoring, data logging, and efficiency optimization solutions</p>
                <div className="text-brand-accent font-semibold group-hover:text-brand-orange transition-colors text-sm">Learn More →</div>
              </div>
            </div>
            <div className="text-center mt-8">
              <a href="/services" className="inline-block bg-gradient-to-r from-brand-orange to-brand-accent text-brand-dark font-bold py-3 px-6 rounded-xl hover:shadow-2xl hover:shadow-brand-orange/50 transition-all duration-300 transform hover:scale-105 text-sm md:text-base">
                View All Services & Solutions
              </a>
            </div>
          </div>
        </section>

        {/* Section 3: About */}
        <section className="flex justify-center items-center p-4" style={{ minHeight: '100dvh' }}>
          <div className="max-w-4xl w-full">
            <div className="bg-brand-dark/80 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-brand-orange/20 shadow-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-orange mb-6 md:mb-8 text-center">About Jambsmash</h2>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-brand-accent mb-3">Our Mission</h3>
                  <p className="text-brand-light leading-relaxed text-sm md:text-base">
                    To provide added value solutions through a no-compromise quality engineering approach that sustains long term reliability and functionality for our clients.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-brand-accent mb-3">Our Vision</h3>
                  <p className="text-brand-light leading-relaxed text-sm md:text-base">
                    To be the global leader in Telecommunication, automation, instrumentation and Electrical systems engineering through the provision of unparalleled, quality and timely service.
                  </p>
                </div>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-brand-orange mb-4">Meet Our Director</h3>
                <div className="bg-gradient-to-r from-brand-dark to-brand-dark/50 p-6 rounded-2xl border border-brand-orange/30">
                  <h4 className="text-xl md:text-2xl font-bold text-brand-light mb-2">Pride Mashiyani</h4>
                  <p className="text-brand-accent font-semibold mb-2 text-sm md:text-base">B.Tech Electronic Engineering (Honours)</p>
                  <p className="text-brand-gray text-sm md:text-base">HND Electrical Power Engineering</p>
                  <p className="text-brand-light mt-3 md:mt-4 italic text-sm md:text-base">
                    "Leading innovation in engineering solutions with passion and expertise."
                  </p>
                </div>
              </div>
              <div className="text-center">
                <a href="/about" className="inline-block border-2 border-brand-orange text-brand-orange font-bold py-3 px-6 rounded-xl hover:bg-brand-orange hover:text-brand-dark transition-all duration-300 transform hover:scale-105 text-sm md:text-base">
                  Learn More About Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Customer Reviews */}
        <section className="flex flex-col justify-center items-center p-4 md:p-8 bg-transparent relative z-10" style={{ minHeight: '100dvh' }}>
          <div className="max-w-6xl w-full">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-orange mb-12 md:mb-16 text-center tracking-tight">
              What Our Clients Say
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-brand-dark/80 backdrop-blur-lg p-8 rounded-2xl border border-brand-orange/20 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/10">
                <div className="flex text-brand-orange mb-4">★★★★★</div>
                <p className="text-brand-light mb-6 italic">
                  "Exceptional service in solar installation. The team was professional, efficient, and delivered exactly what was promised. Our energy costs have dropped significantly!"
                </p>
                <div>
                  <p className="text-brand-accent font-semibold">Mining Corporation</p>
                  <p className="text-brand-gray text-sm">20kVA Solar System Installation</p>
                </div>
              </div>
              <div className="bg-brand-dark/80 backdrop-blur-lg p-8 rounded-2xl border border-brand-orange/20 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/10">
                <div className="flex text-brand-orange mb-4">★★★★★</div>
                <p className="text-brand-light mb-6 italic">
                  "Their security system installation exceeded our expectations. The CCTV and access control integration is seamless and provides peace of mind."
                </p>
                <div>
                  <p className="text-brand-accent font-semibold">Manufacturing Plant</p>
                  <p className="text-brand-gray text-sm">Complete Security System</p>
                </div>
              </div>
              <div className="bg-brand-dark/80 backdrop-blur-lg p-8 rounded-2xl border border-brand-orange/20 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/10">
                <div className="flex text-brand-orange mb-4">★★★★★</div>
                <p className="text-brand-light mb-6 italic">
                  "Outstanding automation solutions that have improved our operational efficiency by 40%. Highly recommend their technical expertise."
                </p>
                <div>
                  <p className="text-brand-accent font-semibold">Industrial Client</p>
                  <p className="text-brand-gray text-sm">Automation & Control Systems</p>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <p className="text-brand-light text-lg mb-6">
                Join dozens of satisfied clients who trust Jambsmash for their engineering needs
              </p>
              <a href="/contact" className="inline-block bg-gradient-to-r from-brand-orange to-brand-accent text-brand-dark font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-brand-orange/50 transition-all duration-300 transform hover:scale-105">
                Start Your Project Today
              </a>
            </div>
          </div>
        </section>

        {/* Section 5: Contact */}
        <section className="flex flex-col justify-center items-center p-4 relative" style={{ minHeight: '100dvh' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
          <div className="text-center z-10 max-w-4xl px-4">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-brand-orange mb-4 md:mb-6 tracking-tight">
              Let's Build the Future
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-brand-light mb-6 md:mb-8 leading-relaxed">
              Ready to transform your business with cutting-edge engineering solutions?
            </p>
            <p className="text-base md:text-lg text-brand-gray mb-8 md:mb-12 max-w-2xl mx-auto">
              Contact us today for a free consultation and discover how Jambsmash can power your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a href="mailto:jambsmash20@gmail.com" className="group bg-gradient-to-r from-brand-orange to-brand-accent text-brand-dark font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-brand-orange/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <span className="mr-2">📧</span> Email Us Now <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <a href="/contact" className="group border-2 border-brand-orange text-brand-orange font-bold py-4 px-8 rounded-xl hover:bg-brand-orange hover:text-brand-dark transition-all duration-300 transform hover:scale-105">
                <span className="mr-2">🤝</span> Get Full Contact Info <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">✦</span>
              </a>
            </div>
            <div className="text-brand-gray">
              <p className="mb-2">📍 7 Tilbury Road, Willowvale, Harare</p>
              <p>📱 +263 773755716 | +263 773755717</p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </Scroll>
  );
}

