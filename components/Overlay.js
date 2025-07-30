// 5. Replace the contents of: components/Overlay.js

'use client';

import { Scroll } from '@react-three/drei';

export default function Overlay() {
  return (
    <Scroll html style={{ width: '100%' }}>
      <div className="w-screen">
        
        {/* Section 1: Hero */}
        <section className="h-screen flex flex-col justify-center items-center p-4 pt-20">
          <h1 className="text-4xl md:text-6xl font-bold text-center">
            <span className="text-brand-orange">JAMBSMASH</span> INVESTMENTS
          </h1>
          <p className="mt-4 text-lg md:text-xl text-brand-light font-medium text-center">
            Pioneering solutions in automation, instrumentation, and security.
          </p>
          <p className="animate-bounce mt-16 text-brand-orange text-lg">
            Scroll Down
          </p>
        </section>

        {/* Section 2: Vision */}
        <section className="flex justify-start items-center p-8 md:p-20">
          <div className="max-w-md bg-brand-dark/70 backdrop-blur-md p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-brand-orange mb-4">Our Vision</h2>
            <p className="text-brand-light">
              To be the global leader in Telecommunication, automation, instrumentation and Electrical systems engineering through the provision of unparalleled, quality and timely service.
            </p>
          </div>
        </section>
        
        {/* Section 3: Services */}
        <section className="h-screen flex justify-end items-center p-8 md:p-20">
          <div className="max-w-md bg-brand-dark/70 backdrop-blur-md p-8 rounded-lg text-right">
            <h2 className="text-3xl font-bold text-brand-orange mb-4">Core Services</h2>
            <ul className="list-none space-y-2">
              <li>Electronic Security Systems</li>
              <li>Industrial Automation & Control</li>
              <li>Instrumentation & Calibration</li>
              <li>Solar & Electrical Projects</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Team */}
        <section className="h-screen flex flex-col justify-center items-center p-8 md:p-20">
          <div className="w-full max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-brand-orange mb-12">Meet the Directors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-brand-dark/70 backdrop-blur-md p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-brand-light">Pride Mashiyani</h3>
                <p className="text-brand-accent mt-2">B.Tech Electronic Engineering</p>
                <p className="text-brand-gray">HND Electrical Power Engineering</p>
              </div>
              <div className="bg-brand-dark/70 backdrop-blur-md p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-brand-light">Wilbert Magaramagara</h3>
                <p className="text-brand-accent mt-2">M.Sc Project Management</p>
                <p className="text-brand-gray">M.Tech Sensor Technology</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Contact */}
        <section className="h-screen flex flex-col justify-center items-center p-4">
          <h2 className="text-3xl font-bold text-brand-orange mb-4">Let's Build the Future</h2>
          <p className="text-lg text-brand-light mb-8">Get in touch to discuss your project.</p>
          <a
            href="mailto:jambsmash20@gmail.com"
            className="bg-brand-orange text-brand-dark font-bold py-3 px-8 rounded-lg hover:bg-brand-accent transition-colors"
          >
            Contact Us
          </a>
        </section>

      </div>
    </Scroll>
  );
}

