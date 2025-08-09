'use client';
import Head from "next/head";
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';

import Scene from '@/components/Scene_Alternative2';
import Overlay from '@/components/Overlay';
// MODIFICATION: We will create this new component in the next step
import { SceneLoader } from '@/components/SceneLoader';

function SEOHead() {
  return (
    <Head>
      <title>Jambsmash Electronics | Leading Engineering Solutions in Zimbabwe</title>
      <meta name="description" content="Transform your business with Jambsmash Electronics' cutting-edge automation, security systems, solar solutions, and instrumentation services. Serving Zimbabwe with world-class engineering excellence." />
      <meta name="keywords" content="automation zimbabwe, security systems harare, solar installation zimbabwe, instrumentation services, industrial engineering, CCTV systems, access control, renewable energy, electrical engineering" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://jambsmash.com/" />
      <meta property="og:title" content="Jambsmash Electronics | Engineering Excellence in Zimbabwe" />
      <meta property="og:description" content="Leading provider of automation, security, solar, and instrumentation solutions. Transform your business with our world-class engineering services." />
      <meta property="og:image" content="https://jambsmash.com/images/og-image.jpg" />
      <meta property="og:site_name" content="Jambsmash Electronics" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://jambsmash.com/" />
      <meta property="twitter:title" content="Jambsmash Electronics | Engineering Solutions" />
      <meta property="twitter:description" content="Transform your business with cutting-edge automation, security, and solar solutions from Zimbabwe's engineering leaders." />
      <meta property="twitter:image" content="https://jambsmash.com/images/twitter-image.jpg" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Jambsmash Electronics" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#DC713E" />

      {/* Canonical URL */}
      <link rel="canonical" href="https://jambsmash.co.zw/" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://jambsmash.com/#organization",
                "name": "Jambsmash Electronics",
                "description": "Leading provider of automation, instrumentation, security systems, and solar solutions in Zimbabwe",
                "url": "https://jambsmash.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://jambsmash.com/logo.png",
                  "width": 300,
                  "height": 100
                },
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "telephone": "+263-773755716",
                    "contactType": "customer service",
                    "areaServed": "ZW",
                    "availableLanguage": ["English"]
                  }
                ],
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "7 Tilbury Road, Willowvale",
                  "addressLocality": "Harare",
                  "addressCountry": "ZW"
                },
                "founder": {
                  "@type": "Person",
                  "name": "Pride Mashiyani",
                  "jobTitle": "Director",
                  "alumniOf": "Electronic Engineering"
                },
                "sameAs": [
                  "https://linkedin.com/company/jambsmash-electronics",
                  "https://facebook.com/jambsmash"
                ]
              },
              {
                "@type": "WebSite",
                "@id": "https://jambsmash.com/#website",
                "url": "https://jambsmash.com",
                "name": "Jambsmash Electronics",
                "inLanguage": "en-US",
                "publisher": {
                  "@id": "https://jambsmash.com/#organization"
                }
              },
              {
                "@type": "Service",
                "serviceType": "Industrial Automation",
                "provider": {
                  "@id": "https://jambsmash.com/#organization"
                },
                "description": "Variable frequency drives, electric motors, and comprehensive automation solutions",
                "areaServed": "ZW"
              },
              {
                "@type": "Service",
                "serviceType": "Electronic Security Systems",
                "provider": {
                  "@id": "https://jambsmash.com/#organization"
                },
                "description": "CCTV, access control, fire monitoring, and hazardous gas detection systems",
                "areaServed": "ZW"
              },
              {
                "@type": "Service",
                "serviceType": "Solar Solutions",
                "provider": {
                  "@id": "https://jambsmash.com/#organization"
                },
                "description": "Solar systems installation, pumping systems, and renewable energy solutions",
                "areaServed": "ZW"
              }
            ]
          })
        }}
     />

      {/* Performance hints */}
      <link rel="preload" as="style" href="/styles/globals.css" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    </Head>
  );
}

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    if (scrollHeight - clientHeight === 0) {
      setScrollProgress(0);
      return;
    }

    const progress = scrollTop / (scrollHeight - clientHeight);
    setScrollProgress(progress);
  };

  return (
    <div className="relative w-screen h-screen bg-[#0a0a0a]">
      <SEOHead />
      <Canvas
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ antialias: true }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
        
        {/* MODIFICATION: The loader logic is now handled inside the Canvas */}
        <SceneLoader />
      </Canvas>
      
      {/* MODIFICATION: The original Loader component is removed from here */}
      
      <div
        className="absolute top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto z-10"
        onScroll={handleScroll}
      >
        <Overlay />
      </div>
    </div>
  );
}
