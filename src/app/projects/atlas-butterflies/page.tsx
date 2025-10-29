'use client';

import { useState, useEffect } from 'react';

export default function AtlasButterfliesPage() {
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
            ATLAS BUTTERFLIES – KINETIC INSTALLATION
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#555',
            maxWidth: '800px',
            lineHeight: '1.8',
            marginBottom: '0'
          }}>
            Worked on the Atlas Butterflies project with artist Marie-Luce Nadal, an upcoming exhibition (2026) combining artistic design and engineering innovation.
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

        {/* Project Description */}
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
            Project Overview
          </h2>
          <ul style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.8',
            maxWidth: '800px',
            paddingLeft: '1.5rem'
          }}>
            <li>Designed and prototyped innovative structures blending mechanical and electronic elements with artistic vision.</li>
            <li>Material selection & rapid iterations to optimize performance and aesthetics.</li>
            <li>Mechanical/electronic integration, testing, and documenting assembly procedures.</li>
            <li>Collaboration with creative and technical stakeholders, coordinating tasks and sharing progress.</li>
            <li>Delivered a final functional prototype, demonstrating a seamless integration of design and engineering.</li>
          </ul>
        </section>

        {/* Separator */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #ddd, transparent)',
          margin: '3rem 0',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease-out 0.4s'
        }} />

        {/* Outcome */}
        <section style={{
          marginBottom: '3rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out 0.5s'
        }}>
          <h2 style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            marginBottom: '1rem',
            color: '#111',
            letterSpacing: '0.03em'
          }}>
            Outcome
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.8',
            maxWidth: '800px'
          }}>
            Gained hands-on experience across the full development cycle, from concept to working prototype, enhancing both technical and creative skills in a collaborative environment.
          </p>
        </section>

        {/* Separator */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #ddd, transparent)',
          margin: '3rem 0',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease-out 0.6s'
        }} />

        {/* Video Section */}
        <section style={{
          marginBottom: '3rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out 0.7s'
        }}>
          <h2 style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            marginBottom: '1rem',
            color: '#111',
            letterSpacing: '0.03em'
          }}>
            3D Model with Butterfly Wing Movements
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.7',
            marginBottom: '1.5rem',
            maxWidth: '800px'
          }}>
            3D model in motion with butterfly wing flapping.
          </p>
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden'
          }}>
            <iframe
              src="https://www.youtube.com/embed/HQT_1Cvtitk"
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

        {/* Images Side by Side - Always 2 columns */}
        <section style={{
          marginBottom: '3rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out 0.9s'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem'
          }}>
            <img 
              src="/assets/projects/Project_1/Papillon_Image2.png" 
              alt="Atlas Butterflies Detail 2"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
              }}
            />
            <img 
              src="/assets/projects/Project_1/Papillon_Image1.png" 
              alt="Atlas Butterflies Detail 1"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
              }}
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
          transition: 'opacity 0.8s ease-out 1s'
        }} />

        {/* Technical Schema */}
        <section style={{
          marginBottom: '3rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out 1.1s'
        }}>
          <h2 style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            marginBottom: '1rem',
            color: '#111',
            letterSpacing: '0.03em'
          }}>
            Technical Schema
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.7',
            marginBottom: '1.5rem',
            maxWidth: '800px'
          }}>
            Detailed technical drawings and mechanism design for the butterfly wing movements.
          </p>
          <img 
            src="/assets/projects/Project_1/Schéma.png" 
            alt="Atlas Butterflies Technical Schema"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            }}
          />
        </section>

        {/* Separator */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #ddd, transparent)',
          margin: '3rem 0',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease-out 1.2s'
        }} />

        {/* Technologies */}
        <section style={{
          marginBottom: '4rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out 1.3s'
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
            {['Mechanical Design', 'Electronics', 'Arduino', 'Fabric', '3D Modeling', 'Prototyping', 'Installation Art'].map((tech) => (
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

          p, li {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </main>
  );
}

