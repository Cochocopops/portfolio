'use client';

import { useState, useEffect } from 'react';

export default function KombuchaPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main style={{ 
      minHeight: '100vh',
      backgroundColor: 'white',
      color: '#111',
      paddingTop: '120px',
      paddingBottom: '4rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        {/* Header */}
        <section style={{
          marginBottom: '3rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontFamily: 'BebasNeue, sans-serif',
            marginBottom: '1.5rem',
            letterSpacing: '0.05em',
            color: '#111'
          }}>
            BioHybrid Device Kombucha
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#555',
            maxWidth: '800px',
            lineHeight: '1.8',
            marginBottom: '0'
          }}>
            Exploring the future of Bio-Hybrid Devices: where living materials meet interactive electronics.
          </p>
        </section>

        {/* Separator */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #ddd, transparent)',
          margin: '3rem 0',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease-out 0.2s'
        }} />

        {/* Project 1: Grown Capacitive Touch Sensor */}
        <section style={{
          marginBottom: '3rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out 0.3s'
        }}>
          <h2 style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            marginBottom: '1rem',
            color: '#111',
            letterSpacing: '0.03em'
          }}>
            Grown Capacitive Touch Sensor
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.7',
            marginBottom: '1.5rem',
            maxWidth: '800px'
          }}>
            A PLA-based interface encapsulated within grown bacterial cellulose. A fully biodegradable capacitive sensor designed for soft interfaces and wearable experiences.
          </p>
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden'
          }}>
            <iframe
              src="https://www.youtube.com/embed/p4RAqJeBp-E"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* Separator */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #ddd, transparent)',
          margin: '3rem 0',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease-out 0.5s'
        }} />

        {/* Project 2: Grown Deformation Sensor */}
        <section style={{
          marginBottom: '3rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out 0.6s'
        }}>
          <h2 style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            marginBottom: '1rem',
            color: '#111',
            letterSpacing: '0.03em'
          }}>
            Grown Deformation Sensor
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.7',
            marginBottom: '1.5rem',
            maxWidth: '800px'
          }}>
            A flexible stretch sensor grown directly around conductive textiles, enabling bio-integrated physical interaction.
          </p>
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden'
          }}>
            <iframe
              src="https://www.youtube.com/embed/7VfcNE-34SI"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* Separator */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #ddd, transparent)',
          margin: '3rem 0',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease-out 0.8s'
        }} />

        {/* Technologies */}
        <section style={{
          marginBottom: '4rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out 0.9s'
        }}>
          <h2 style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            marginBottom: '1.5rem',
            color: '#111',
            letterSpacing: '0.03em'
          }}>
            TECHNOLOGIES
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.8rem',
            alignItems: 'flex-start'
          }}>
            {['Arduino', 'Biomaterials', 'Electronics', '3D Print', 'Conductive Textiles', 'Material Science'].map((tech) => (
              <span key={tech} style={{
                padding: '0.6rem 1.2rem',
                background: '#000',
                color: '#fff',
                borderRadius: 999,
                fontSize: '0.95rem',
                fontFamily: 'MavenPro, sans-serif',
                fontWeight: '500'
              }}>
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          section {
            margin-bottom: 2rem !important;
          }
          
          h1 {
            font-size: 2rem !important;
            margin-bottom: 1rem !important;
          }
          
          h2 {
            font-size: 1.5rem !important;
          }

          p {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </main>
  );
}

