'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ContactScene from '@/components/ContactScene';
import Overlay from '@/components/ContactOverlay';
import Head from 'next/head';

// Premium loading component
const PremiumLoader = () => (
  <div className="flex items-center justify-center h-full bg-gradient-to-br from-brand-dark via-brand-dark/95 to-brand-dark">
    <div className="relative">
      {/* Outer ring */}
      <div className="w-20 h-20 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
      {/* Inner ring */}
      <div className="absolute inset-2 w-16 h-16 border-4 border-brand-accent border-b-transparent rounded-full animate-spin animate-reverse"></div>
      {/* Core */}
      <div className="absolute inset-6 w-8 h-8 bg-gradient-to-r from-brand-orange to-brand-accent rounded-full animate-pulse"></div>
      {/* Glow effect */}
      <div className="absolute inset-0 w-20 h-20 bg-brand-orange/20 rounded-full blur-xl animate-pulse"></div>
    </div>
  </div>
);

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isLoading) {
    return <PremiumLoader />;
  }

  return (
    <>
      <Head>
        <title>Contact Jambstronics Technologies | Get in Touch with Zimbabwe&#39;s Premier Engineering Firm</title>
        <meta name="description" content="Contact Jambstronics Technologies for expert engineering solutions in telecommunications, automation, and electrical systems. Located in Harare, Zimbabwe. Call +263 773 755 716/717" />
        <meta name="keywords" content="contact Jambstronics, engineering consultation Zimbabwe, telecommunications support, automation services Harare, electrical systems contact" />
        <meta property="og:title" content="Contact Jambstronics Technologies - Expert Engineering Support" />
        <meta property="og:description" content="Ready to transform your project? Contact Zimbabwe's leading engineering solutions provider. Expert consultation available." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jambsmash.com/co.zw" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "mainEntity": {
                "@type": "Organization",
                "name": "Jambstronics Technologies",
                "telephone": ["+263773755716", "+263773755717"],
                "email": "jambsmash20@gmail.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "7 Tilbury Road, Willowvale",
                  "addressLocality": "Harare",
                  "addressCountry": "Zimbabwe"
                },
                "areaServed": "Zimbabwe",
                "serviceType": ["Engineering Solutions", "Telecommunications", "Automation", "Electrical Systems"]
              }
            })
          }}
        />
      </Head>

      <main className="w-screen h-screen relative overflow-hidden">
        {/* Interactive 3D Background */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Canvas
            camera={{ position: [0, 0, 12], fov: 50 }}
            gl={{ 
              antialias: true, 
              alpha: false,
              powerPreference: "high-performance"
            }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <ContactScene mousePosition={mousePosition} />
            </Suspense>
          </Canvas>
        </div>

        {/* Content Overlay */}
        <div className="absolute top-0 left-0 w-full h-full z-10 overflow-y-auto overflow-x-hidden">
          <Overlay />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none z-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-brand-orange/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Ambient glow effects */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000"></div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.3;
            }
            25% { 
              transform: translateY(-20px) rotate(90deg); 
              opacity: 0.8;
            }
            50% { 
              transform: translateY(-40px) rotate(180deg); 
              opacity: 0.5;
            }
            75% { 
              transform: translateY(-20px) rotate(270deg); 
              opacity: 0.8;
            }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </main>
    </>
  );
}
