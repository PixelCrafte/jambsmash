'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/**
 * Overlay Component
 * * This component renders the entire 2D UI on top of the 3D scene.
 * It's designed to be visually appealing, highly readable, and consistent with the brand identity.
 * Key enhancements include:
 * - **Glassmorphism Effect**: Sections use a blurred background (`backdrop-blur-xl`) and semi-transparent colors (`bg-brand-dark/80`) to create a sense of depth while keeping the 3D scene visible.
 * - **Enhanced Typography**: Improved font sizes, weights, and spacing (`tracking`, `leading`) for superior readability and visual hierarchy.
 * - **Refined Animations**: Subtle, smooth transitions and animations are used for a more professional feel.
 * - **Beautiful, Accessible Buttons**: Buttons are redesigned with gradients, shadows, and clear hover/active states for better user interaction on all devices.
 * - **Consistent Brand Colors**: All elements are styled using the provided brand color palette.
 */
export default function Overlay() {
  return (
    <>
      {/* Navbar remains sticky at the top */}
      <div className="sticky top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main content container for all sections */}
      <div className="w-full relative z-10 font-family-sans">

        {/* Section 1: Hero */}
        <section className="flex flex-col justify-center items-center p-4 sm:p-8 pt-20 sm:pt-24 relative" style={{ minHeight: '100vh' }}>
          {/* Faint gradient to darken the bottom, improving text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/10 to-brand-dark/50 pointer-events-none"></div>
          
          <div className="text-center z-20 relative">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-4 text-shadow-lg">
              <span className="text-brand-orange drop-shadow-[0_2px_10px_rgba(220,113,62,0.4)]">JAMB</span>
              <span className="text-brand-light">SMASH</span>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-accent mt-2 tracking-widest uppercase">Electronics</div>
            </h1>
            <p className="mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl text-brand-light font-light max-w-4xl mx-auto leading-relaxed bg-brand-dark/30 backdrop-blur-sm rounded-xl p-4">
              Pioneering solutions in <span className="font-semibold text-brand-accent">automation</span>,
              <span className="font-semibold text-brand-accent"> instrumentation</span>, and
              <span className="font-semibold text-brand-accent"> security</span>.
            </p>
            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              {/* Enhanced Primary Button */}
              <a 
                href="/services" 
                className="group bg-gradient-to-br from-brand-orange to-brand-accent text-brand-dark font-bold py-3 md:py-4 px-8 md:px-10 rounded-full shadow-lg hover:shadow-2xl active:shadow-2xl hover:shadow-brand-orange/50 active:shadow-brand-orange/50 transition-all duration-300 transform hover:scale-105 active:scale-105 hover:-translate-y-1 active:-translate-y-1 text-base md:text-lg"
              >
                Explore Our Services <span className="ml-2 inline-block group-hover:translate-x-1 group-active:translate-x-1 transition-transform duration-300">→</span>
              </a>
              {/* Enhanced Secondary Button */}
              <a 
                href="/contact" 
                className="group border-2 border-brand-orange text-brand-light font-bold py-3 md:py-4 px-8 md:px-10 rounded-full shadow-lg hover:shadow-brand-orange/20 active:shadow-brand-orange/20 hover:bg-brand-orange hover:text-brand-dark active:bg-brand-orange active:text-brand-dark transition-all duration-300 transform hover:scale-105 active:scale-105 text-base md:text-lg"
              >
                Get Started Today <span className="ml-2 inline-block group-hover:rotate-12 group-active:rotate-12 transition-transform duration-300">✦</span>
              </a>
            </div>
          </div>
          {/* Refined Scroll Indicator */}
          <div className="absolute bottom-8 md:bottom-12 text-center z-20 opacity-70">
            <div className="animate-bounce text-brand-accent text-3xl">↓</div>
            <p className="text-brand-light text-xs md:text-sm mt-1 tracking-widest uppercase">Discover</p>
          </div>
        </section>

        {/* Section 2: Services */}
        <section className="flex flex-col justify-center items-center p-4 sm:p-8 bg-transparent relative z-10" style={{ minHeight: '100vh' }}>
          <div className="max-w-7xl w-full">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-orange tracking-tighter">
                Our Core Services
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-brand-light max-w-3xl mx-auto mt-4 leading-relaxed">
                Comprehensive engineering solutions designed to power your future.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Service Card Template */}
              {[
                { icon: '🔒', title: 'Electronic Security Systems', desc: 'CCTV, access control, fire monitoring, and hazardous gas detection systems.' },
                { icon: '⚙️', title: 'Industrial Automation', desc: 'Variable frequency drives, electric motors, and comprehensive automation solutions.' },
                { icon: '🔬', title: 'Instrumentation & Calibration', desc: 'pH meters, conductivity analyzers, turbidity meters, and calibration services.' },
                { icon: '☀️', title: 'Solar Solutions', desc: 'Solar systems installation, pumping systems, and renewable energy solutions.' },
                { icon: '📡', title: 'Telecommunications', desc: 'Network infrastructure, multimedia equipment, and communication solutions.' },
                { icon: '⚡', title: 'Energy Management', desc: 'Energy monitoring, data logging, and efficiency optimization solutions.' }
              ].map((service, index) => (
                <div key={index} className="group bg-brand-dark/70 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-brand-gray/20 hover:border-brand-orange/60 active:border-brand-orange/60 transition-all duration-300 hover:shadow-2xl active:shadow-2xl hover:shadow-brand-orange/20 active:shadow-brand-orange/20 transform hover:-translate-y-2 active:-translate-y-2">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-light mb-3">{service.title}</h3>
                  <p className="text-brand-light/80 leading-relaxed mb-4">{service.desc}</p>
                  <div className="text-brand-accent font-semibold group-hover:text-brand-orange active:text-brand-orange transition-colors duration-300">Learn More →</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: About */}
        <section className="flex flex-col justify-center items-center p-4 sm:p-8" style={{ minHeight: '100vh' }}>
          <div className="max-w-5xl w-full">
            <div className="bg-brand-dark/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-brand-gray/20 shadow-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-orange mb-8 md:mb-10 text-center tracking-tighter">About Jambsmash</h2>
              <div className="grid md:grid-cols-2 gap-8 md:gap-10 mb-10">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-accent mb-4">Our Mission</h3>
                  <p className="text-brand-light leading-relaxed text-base md:text-lg">
                    To provide added value solutions through a no-compromise quality engineering approach that sustains long term reliability and functionality for our clients.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-accent mb-4">Our Vision</h3>
                  <p className="text-brand-light leading-relaxed text-base md:text-lg">
                    To be the global leader in Telecommunication, automation, instrumentation and Electrical systems engineering through the provision of unparalleled, quality and timely service.
                  </p>
                </div>
              </div>
              <div className="text-center mb-8 bg-brand-dark/50 p-6 rounded-2xl border border-brand-gray/30">
                <h3 className="text-3xl md:text-4xl font-bold text-brand-orange mb-4">Meet Our Director</h3>
                <h4 className="text-2xl md:text-3xl font-bold text-brand-light mb-2">Pride Mashiyani</h4>
                <p className="text-brand-accent font-semibold mb-1 text-base md:text-lg">B.Tech Electronic Engineering (Honours)</p>
                <p className="text-brand-accent text-base md:text-lg">HND Electrical Power Engineering</p>
                <p className="text-brand-light/90 mt-4 italic text-base md:text-lg">
                  "Leading innovation in engineering solutions with passion and expertise."
                </p>
              </div>
              <div className="text-center mt-10">
                <a href="/about" className="group border-2 border-brand-orange text-brand-light font-bold py-3 md:py-4 px-8 md:px-10 rounded-full shadow-lg hover:shadow-brand-orange/20 active:shadow-brand-orange/20 hover:bg-brand-orange hover:text-brand-dark active:bg-brand-orange active:text-brand-dark transition-all duration-300 transform hover:scale-105 active:scale-105 text-base md:text-lg">
                  Learn More About Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Customer Reviews */}
        <section className="flex flex-col justify-center items-center p-4 sm:p-8 bg-transparent relative z-10" style={{ minHeight: '100vh' }}>
          <div className="max-w-7xl w-full">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-orange mb-12 md:mb-16 text-center tracking-tighter">
              What Our Clients Say
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { stars: 5, quote: "Exceptional service in solar installation. The team was professional, efficient, and delivered exactly what was promised. Our energy costs have dropped significantly!", client: "Mining Corporation", project: "20kVA Solar System Installation" },
                { stars: 5, quote: "Their security system installation exceeded our expectations. The CCTV and access control integration is seamless and provides peace of mind.", client: "Manufacturing Plant", project: "Complete Security System" },
                { stars: 5, quote: "Outstanding automation solutions that have improved our operational efficiency by 40%. Highly recommend their technical expertise.", client: "Industrial Client", project: "Automation & Control Systems" }
              ].map((review, index) => (
                <div key={index} className="bg-brand-dark/70 backdrop-blur-xl p-8 rounded-3xl border border-brand-gray/20 flex flex-col">
                  <div className="flex text-brand-accent text-2xl mb-4">{'★'.repeat(review.stars)}</div>
                  <p className="text-brand-light mb-6 italic leading-relaxed flex-grow">
                    "{review.quote}"
                  </p>
                  <div>
                    <p className="text-brand-accent font-semibold text-lg">{review.client}</p>
                    <p className="text-brand-gray text-sm">{review.project}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Contact */}
        <section className="flex flex-col justify-center items-center p-4 sm:p-8 relative" style={{ minHeight: '100vh' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent pointer-events-none"></div>
          <div className="text-center z-10 max-w-4xl px-4">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-brand-orange mb-4 md:mb-6 tracking-tighter">
              Let's Build the Future
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-brand-light mb-6 md:mb-8 leading-relaxed">
              Ready to transform your business with cutting-edge engineering solutions?
            </p>
            <p className="text-base md:text-lg text-brand-gray mb-10 md:mb-12 max-w-3xl mx-auto">
              Contact us today for a free consultation and discover how Jambsmash can power your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a href="mailto:jambsmash20@gmail.com" className="group bg-gradient-to-br from-brand-orange to-brand-accent text-brand-dark font-bold py-3 md:py-4 px-8 md:px-10 rounded-full shadow-lg hover:shadow-2xl active:shadow-2xl hover:shadow-brand-orange/50 active:shadow-brand-orange/50 transition-all duration-300 transform hover:scale-105 active:scale-105 hover:-translate-y-1 active:-translate-y-1 text-base md:text-lg">
                <span className="mr-2 inline-block group-hover:-rotate-6 group-active:-rotate-6 transition-transform duration-300">📧</span> Email Us Now <span className="ml-2 inline-block group-hover:translate-x-1 group-active:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <a href="/contact" className="group border-2 border-brand-orange text-brand-light font-bold py-3 md:py-4 px-8 md:px-10 rounded-full shadow-lg hover:shadow-brand-orange/20 active:shadow-brand-orange/20 hover:bg-brand-orange hover:text-brand-dark active:bg-brand-orange active:text-brand-dark transition-all duration-300 transform hover:scale-105 active:scale-105 text-base md:text-lg">
                <span className="mr-2">🤝</span> Full Contact Info <span className="ml-2 inline-block group-hover:rotate-12 group-active:rotate-12 transition-transform duration-300">✦</span>
              </a>
            </div>
            <div className="text-brand-gray text-base">
              <p className="mb-2">📍 7 Tilbury Road, Willowvale, Harare</p>
              <p>📱 +263 773755716 | +263 773755717</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer is the final element */}
      <Footer />
    </>
  );
}

