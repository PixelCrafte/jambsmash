'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import AboutScene from '@/components/AboutScene2';
import Overlay from '@/components/AboutOverlay';
import Head from 'next/head';

// Enhanced loading component
const EnhancedLoader = () => (
  <div className="flex items-center justify-center h-full bg-brand-dark">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-brand-accent border-b-transparent rounded-full animate-spin animate-reverse"></div>
    </div>
  </div>
);

export default function AboutPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Simulate loading completion
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const maxScroll = scrollHeight - clientHeight;
    const scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
    setScrollPosition(scrollFraction);
  };

  /*if (isLoading) {
    return <EnhancedLoader />;
  }*/

  return (
    <>
      <Head>
        <title>About Us - Jambstronics Technologies | Engineering Excellence Since 2020</title>
        <meta name="description" content="Discover Jambstronics Technologies' journey as Zimbabwe's premier engineering solutions provider. Learn about our mission, vision, and expert leadership in telecommunications, automation, and electrical systems." />
        <meta name="keywords" content="Jambstronics Technologies, engineering solutions, telecommunications, automation, electrical systems, Zimbabwe, Pride Mashiyani, Wilbert Magaramagara" />
        <meta property="og:title" content="About Jambstronics Technologies - Engineering Excellence" />
        <meta property="og:description" content="Founded in 2020, we're Zimbabwe's leading provider of high-end engineering solutions for industry, small businesses, and domestic clients." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jambstronics.com/about" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Jambstronics Technologies",
              "foundingDate": "2020",
              "description": "Engineering solutions provider specializing in telecommunications, automation, instrumentation and electrical systems",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Pride Mashiyani",
                  "jobTitle": "Director"
                },
                {
                  "@type": "Person", 
                  "name": "Wilbert Magaramagara",
                  "jobTitle": "Director"
                }
              ]
            })
          }}
        />
      </Head>

      <main className="w-screen h-screen relative overflow-hidden">
        {/* 3D Canvas Background */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          
          <Canvas
            camera={{ position: [0, 0, 15], fov: 50 }}
            gl={{ 
              antialias: true, 
              alpha: false,
              powerPreference: "high-performance"
            }}
            dpr={[1, 2]}
          >
          {/*
          <Canvas
            camera={{ position: [15, 5, 15], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
          >*/}
            <Suspense fallback={null}>
              <AboutScene scrollPosition={scrollPosition} />
            </Suspense>
          </Canvas>
        </div>

        {/* Scrollable Content Overlay */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="absolute top-0 left-0 w-full h-full z-10 overflow-y-auto overflow-x-hidden scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <Overlay />
        </div>

        {/* Scroll Progress Indicator */}
        <div className="fixed top-0 left-0 w-full h-1 bg-brand-dark/20 z-20">
          <div 
            className="h-full bg-gradient-to-r from-brand-orange to-brand-accent transition-all duration-150 ease-out"
            style={{ width: `${scrollPosition * 100}%` }}
          />
        </div>

        {/* Floating Navigation Dots */}
        <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
          <div className="flex flex-col space-y-4">
            {['Story', 'Vision', 'Values', 'Leadership'].map((section, index) => (
              <button
                key={section}
                onClick={() => {
                  const scrollTarget = (index / 3) * (scrollRef.current.scrollHeight - scrollRef.current.clientHeight);
                  scrollRef.current.scrollTo({ top: scrollTarget, behavior: 'smooth' });
                }}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  Math.floor(scrollPosition * 4) === index
                    ? 'bg-brand-orange border-brand-orange scale-125'
                    : 'bg-transparent border-brand-light/50 hover:border-brand-orange'
                }`}
                aria-label={`Navigate to ${section} section`}
              />
            ))}
          </div>
        </nav>
      </main>
    </>
  );
}
