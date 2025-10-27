'use client';

import { useState, useEffect } from 'react';

export default function Pen3DPrintPage() {
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
            TUTORIAL: 3D PRINTED PEN
          </h1>
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

        {/* 1 - Sketch */}
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
            1 – Sketch
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.8',
            maxWidth: '800px',
            marginBottom: '1.5rem'
          }}>
            I started with a sketch of my pen. This step allows me to get a visual idea of the overall dimensions and the different parts needed to create a functional pen. The goal is to visualize the shape before moving on to 3D modeling.
          </p>
          
          {/* Sketch image */}
          <img 
            src="/assets/projects/3D_Pen/Pen_Sketch2.jpg" 
            alt="Pen Sketch"
            style={{
              width: '100%',
              height: 'auto',
              marginBottom: '1.5rem'
            }}
          />

          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.8',
            maxWidth: '800px'
          }}>
            After considering several options, I decided to divide the pen into three parts:
          </p>
          <ul style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.8',
            maxWidth: '800px',
            paddingLeft: '1.5rem',
            marginTop: '1rem'
          }}>
            <li><strong>The main body</strong> is designed to hold the ink cartridge. I wanted it to be comfortable to hold, hence the relatively classic design.</li>
            <li><strong>The front tip</strong> is essential to keep the cartridge from slipping out.</li>
            <li><strong>The button</strong> allows the ink refill to stay inside or outside the main body.</li>
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

        {/* 2 - Modeling */}
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
            2 – Modeling
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.8',
            maxWidth: '800px',
            marginBottom: '1.5rem'
          }}>
            To model my pen, I used <strong>SolidWorks</strong> software. The pen is divided into three main components: the front tip, the button, and the complete assembled pen.
          </p>

          <h3 style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
            marginBottom: '0.8rem',
            color: '#111',
            letterSpacing: '0.03em'
          }}>
            Front Tip
          </h3>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.8',
            maxWidth: '800px',
            marginBottom: '1rem'
          }}>
            The front tip features threading to screw onto the main body and includes material removal to allow the ink cartridge to pass through.
          </p>
          <img 
            src="/assets/projects/3D_Pen/Pen_Solidworks_2.png" 
            alt="SolidWorks Front Tip"
            style={{
              width: '100%',
              height: 'auto',
              marginBottom: '2rem'
            }}
          />

          <h3 style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
            marginBottom: '0.8rem',
            color: '#111',
            letterSpacing: '0.03em'
          }}>
            Button Mechanism
          </h3>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.8',
            maxWidth: '800px',
            marginBottom: '1rem'
          }}>
            The button mechanism allows the ink cartridge to extend or retract. It&apos;s designed to fit securely within the main body while maintaining smooth operation.
          </p>
          <img 
            src="/assets/projects/3D_Pen/Pen_Solidworks.png" 
            alt="SolidWorks Button"
            style={{
              width: '100%',
              height: 'auto',
              marginBottom: '2rem'
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
          transition: 'opacity 0.8s ease-out 0.6s'
        }} />

        {/* Assembly */}
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
            3 – Assembly
          </h2>
          
          <img 
            src="/assets/projects/3D_Pen/Pen_Solidworks_1.png" 
            alt="Pen Assembly"
            style={{
              width: '100%',
              height: 'auto',
              marginBottom: '1.5rem'
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
          transition: 'opacity 0.8s ease-out 0.8s'
        }} />

        {/* OrcaSlicer */}
        <section style={{
          marginBottom: '3rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out 0.9s'
        }}>
          <h2 style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            marginBottom: '1rem',
            color: '#111',
            letterSpacing: '0.03em'
          }}>
            4 – Using OrcaSlicer for Printing
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.8',
            maxWidth: '800px',
            marginBottom: '1.5rem'
          }}>
            Preparing the 3D models for printing using OrcaSlicer software.
          </p>
          
          <img 
            src="/assets/projects/3D_Pen/Pen_Orca.png" 
            alt="OrcaSlicer Setup"
            style={{
              width: '100%',
              height: 'auto',
              marginBottom: '1.5rem'
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
          transition: 'opacity 0.8s ease-out 1s'
        }} />

        {/* Final Result */}
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
            5 – Final Result
          </h2>
          
          <img 
            src="/assets/projects/3D_Pen/Pen_Image3.jpg" 
            alt="Final 3D Printed Pen"
            style={{
              width: '100%',
              height: 'auto',
              marginBottom: '1.5rem'
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
            Technologies
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.8rem',
            alignItems: 'flex-start'
          }}>
            {['SolidWorks', '3D Printing', 'OrcaSlicer', 'CAD Design', 'Prototyping', 'Product Design'].map((tech) => (
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

          h3 {
            font-size: 1.3rem !important;
          }

          p, li {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </main>
  );
}

