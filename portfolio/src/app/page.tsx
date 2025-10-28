"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import "./globals.css";

// Dynamic loading of 3D carousel
const HomeCarousel3D = dynamic(() => import('@/components/HomeCarousel3D'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    }}>
      Loading 3D Scene...
    </div>
  )
});

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mount
    setIsVisible(true);
  }, []);

  // === PAGE ===
  return (
    <main className="home">

      {/* === HERO SECTION WITH 3D CAROUSEL === */}
      <section className="hero-section" style={{ position: 'relative' }}>
        <HomeCarousel3D />
        
        {/* Text overlay on 3D carousel - perfectly centered in 3D scene */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          textAlign: 'center',
          pointerEvents: 'none',
          width: '90%',
          maxWidth: '1200px',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-out'
        }}>
          {/* Main title PORTFOLIO */}
          <h1 style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: 'clamp(4rem, 15vw, 12rem)',
            fontWeight: 'bold',
            color: 'white',
            letterSpacing: '0.1em',
            margin: '0 0 1.5rem 0',
            textShadow: '0 0 40px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.4)',
            lineHeight: '1',
            position: 'relative',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'transform 1s ease-out'
          }}>
            PORTFOLIO
            {/* Decorative brush stroke effect */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              height: '35%',
              background: 'linear-gradient(90deg, transparent, rgba(255,182,193,0.35), transparent)',
              transform: 'translateY(-50%) skewY(-2deg)',
              pointerEvents: 'none',
              opacity: 0.8
            }} />
          </h1>

          {/* Name subtitle */}
          <p style={{
            fontFamily: 'MavenPro, sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: '0.2rem 0 0 0',
            textShadow: '0 2px 15px rgba(0,0,0,0.8)',
            fontWeight: '400',
            letterSpacing: '0.15em',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'transform 1s ease-out 0.2s'
          }}>
            CORENTIN CHANTEREAU
          </p>
          
          {/* Call-to-action buttons - positioned under name */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
            marginTop: '3.5rem',
            flexWrap: 'wrap',
            pointerEvents: 'auto',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'transform 1s ease-out 0.3s'
          }}>
          <a
            href="/projects"
              style={{
                fontFamily: 'MavenPro, sans-serif',
                fontSize: '1rem',
                fontWeight: '600',
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '14px 32px',
                borderRadius: '50px',
                border: '2px solid white',
                textDecoration: 'none',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                textShadow: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#111';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = 'white';
              }}
            >
              View Projects
            </a>

            <a
              href="/about"
              style={{
                fontFamily: 'MavenPro, sans-serif',
                fontSize: '1rem',
                fontWeight: '600',
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '14px 32px',
                borderRadius: '50px',
                border: '2px solid white',
                textDecoration: 'none',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                textShadow: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#111';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = 'white';
              }}
            >
              About Me
            </a>

            <a
              href="/assets/home/CORENTIN CHANTEREAU.pdf"
              download="CORENTIN_CHANTEREAU_CV.pdf"
              style={{
                fontFamily: 'MavenPro, sans-serif',
                fontSize: '1rem',
                fontWeight: '600',
                color: 'white',
                backgroundColor: 'rgba(255, 182, 193, 0.3)',
                padding: '14px 32px',
                borderRadius: '50px',
                border: '2px solid rgba(255, 182, 193, 0.8)',
                textDecoration: 'none',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                textShadow: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 182, 193, 0.9)';
                e.currentTarget.style.color = '#111';
                e.currentTarget.style.borderColor = 'rgba(255, 182, 193, 1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 182, 193, 0.3)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = 'rgba(255, 182, 193, 0.8)';
              }}
            >
              Download CV
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
