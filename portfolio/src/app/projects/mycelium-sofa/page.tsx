'use client';
import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

const MyceliumSofaScene = dynamic(() => import('@/components/MyceliumSofaScene'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '500px',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '12px'
    }}>
      <p>Loading 3D Scene...</p>
    </div>
  )
});

export default function MyceliumSofaPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main style={{
      minHeight: '100vh',
      paddingTop: 'calc(var(--nav-h) + 2rem)',
      paddingLeft: 'clamp(1.5rem, 5vw, 3.5rem)',
      paddingRight: 'clamp(1.5rem, 5vw, 3.5rem)',
      paddingBottom: '5rem',
      backgroundColor: 'white',
      fontFamily: 'MavenPro, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        
        {/* Header */}
        <header style={{
          marginBottom: '3rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out'
        }}>
          <h1 style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            marginBottom: '1rem',
            color: '#111',
            letterSpacing: '0.03em',
            lineHeight: '1.1'
          }}>
            Design of a Modular Sofa in Mycelium
          </h1>
        </header>

        {/* Project Introduction */}
        <section style={{
          marginBottom: '0rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out 0.2s'
        }}>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.8',
            maxWidth: '900px'
          }}>
            The objective of this project was to design a modular sofa using mycelium, an innovative organic material. The choice of mycelium aligns with an ecological approach, aiming to create sustainable and biodegradable furniture. This material is notable for its lightness, insulating properties, shock resistance, and low environmental impact. In addition to its practical qualities, it allows for eco-responsible manufacturing while offering interesting aesthetic possibilities thanks to its natural textures and compatibility with biodegradable pigments.
          </p>
        </section>

        {/* 3D Scene */}
        <section style={{
          marginBottom: '0.5rem',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease-out 0.3s'
        }}>
          <Suspense fallback={<div>Loading...</div>}>
            <MyceliumSofaScene />
          </Suspense>
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

        {/* Fabrication Protocol */}
        <section style={{
          marginBottom: '3rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out 0.5s'
        }}>
          <div className="protocol-header-section">
            <div className="protocol-text-wrapper">
              <h2 style={{
                fontFamily: 'BebasNeue, sans-serif',
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                marginBottom: '1.5rem',
                color: '#111',
                letterSpacing: '0.03em'
              }}>
                Fabrication Protocol
              </h2>

              {/* Disinfection */}
              <div className="protocol-section" style={{
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  fontFamily: 'BebasNeue, sans-serif',
                  fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
                  marginBottom: '0.8rem',
                  color: '#111',
                  letterSpacing: '0.03em'
                }}>
                  Disinfection
                </h3>
                <p style={{
                  fontSize: '1.05rem',
                  color: '#555',
                  lineHeight: '1.8'
                }}>
                  The process begins with the thorough disinfection of the tools and the work area. Gloves, molds, and the mixer must be cleaned with 70% isopropyl alcohol to prevent any contamination of the mycelium. The use of sterile gloves and maintaining a clean environment are essential.
                </p>
              </div>
            </div>
            
            <img 
              src="/assets/projects/Mycelium/Mycelium_Sketch.png" 
              alt="Disinfection tools"
              className="protocol-header-image"
            />
          </div>

          {/* Substrate Preparation */}
          <div className="protocol-section substrate-section" style={{
            marginBottom: '2.5rem'
          }}>
            <img 
              src="/assets/projects/Mycelium/Mycelium_Sketch2.png" 
              alt="Substrate preparation"
              className="substrate-image"
            />
            <div className="substrate-text-content">
              <h3 style={{
                fontFamily: 'BebasNeue, sans-serif',
                fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
                marginBottom: '0.8rem',
                color: '#111',
                letterSpacing: '0.03em'
              }}>
                Substrate Preparation
              </h3>
              <p style={{
                fontSize: '1.05rem',
                color: '#555',
                lineHeight: '1.8'
              }}>
                The substrate used, made from cellulose-rich materials like straw, is mixed with nutrients such as corn flour to accelerate colonization by the mycelium. An amount of distilled water, representing 20-30% of the total volume, is added to achieve a sticky consistency. The substrate must be pasteurized or sterilized to eliminate any competitive organisms.
              </p>
            </div>
          </div>

          {/* Mold Filling */}
          <div style={{
            marginBottom: '2.5rem'
          }}>
            <h3 style={{
              fontFamily: 'BebasNeue, sans-serif',
              fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
              marginBottom: '0.8rem',
              color: '#111',
              letterSpacing: '0.03em'
            }}>
              Mold Filling
            </h3>
            <p style={{
              fontSize: '1.05rem',
              color: '#555',
              lineHeight: '1.8',
              maxWidth: '900px',
              marginBottom: '1.5rem'
            }}>
              The prepared substrate is then compacted into a 3D-printed mold, which is also disinfected. This compacting ensures an even distribution of the substrate. Once filled, the mold is sealed airtight and wrapped to preserve moisture and prevent contamination.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1.5rem'
            }}>
              <img 
                src="/assets/projects/Mycelium/Mycelium_Sketch3.png" 
                alt="Mold filling process"
                style={{
                  width: '100%',
                  maxWidth: '600px',
                  height: 'auto'
                }}
              />
            </div>
          </div>

          {/* Incubation */}
          <div>
            <h3 style={{
              fontFamily: 'BebasNeue, sans-serif',
              fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
              marginBottom: '0.8rem',
              color: '#111',
              letterSpacing: '0.03em'
            }}>
              Incubation
            </h3>
            <p style={{
              fontSize: '1.05rem',
              color: '#555',
              lineHeight: '1.8',
              maxWidth: '900px'
            }}>
              The mold is placed in an incubator, maintained at a temperature between 24 and 30°C, in total darkness to simulate the natural growth conditions of mycelium. After 2 days, distilled water is added to maintain adequate humidity and stimulate growth. Incubation usually lasts between 5 and 10 days, until the mycelium has fully colonized the substrate.
            </p>
          </div>
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

        {/* Aesthetic Intent */}
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
            The Aesthetic Intent
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.8',
            maxWidth: '900px'
          }}>
            The aesthetic intent is to create an elegant, functional sofa that can adapt to various spaces. The design is characterized by clean lines and a natural texture, resulting from the use of mycelium. In terms of color, natural pigments are used to add a subtle touch while maintaining the organic look of the material. The assembly of the modules conveys a sense of flexibility and personalization, allowing each user to rearrange the pieces according to their preferences. This project offers a design that is both practical and environmentally friendly, while highlighting the use of sustainable materials.
          </p>
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
          marginBottom: '3rem',
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
            Technologies
          </h2>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {['SolidWorks', '3D Modeling', '3D Printing', 'Biomaterials', 'Mycelium Cultivation', 'Three.js', 'React Three Fiber'].map(tech => (
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

      <style jsx>{`
        /* Desktop landscape layout */
        @media (min-width: 768px) and (orientation: landscape) {
          .protocol-header-section {
            display: grid;
            grid-template-columns: 1fr 200px;
            gap: 2rem;
            align-items: start;
            margin-bottom: 0.5rem;
          }
          
          .protocol-text-wrapper {
            display: flex;
            flex-direction: column;
          }
          
          .protocol-header-image {
            width: 100%;
            max-height: 280px;
            object-fit: contain;
            object-position: top;
          }

          .substrate-section {
            display: grid;
            grid-template-columns: 250px 1fr;
            gap: 2rem;
            align-items: center;
          }

          .substrate-text-content {
            display: flex;
            flex-direction: column;
          }
          
          .substrate-image {
            width: 100%;
            max-height: 280px;
            object-fit: contain;
          }
        }

        /* Desktop portrait layout */
        @media (min-width: 768px) and (orientation: portrait) {
          .protocol-header-section {
            display: grid;
            grid-template-columns: 1fr 180px;
            gap: 1.5rem;
            align-items: start;
            margin-bottom: 0.5rem;
          }
          
          .protocol-text-wrapper {
            display: flex;
            flex-direction: column;
          }
          
          .protocol-header-image {
            width: 100%;
            max-height: 250px;
            object-fit: contain;
            object-position: top;
          }

          .substrate-section {
            display: grid;
            grid-template-columns: 220px 1fr;
            gap: 1.5rem;
            align-items: center;
          }

          .substrate-text-content {
            display: flex;
            flex-direction: column;
          }
          
          .substrate-image {
            width: 100%;
            max-height: 260px;
            object-fit: contain;
          }
        }

        /* Mobile layout */
        @media (max-width: 767px) {
          .protocol-header-section {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            margin-bottom: 0.5rem;
          }
          
          .protocol-header-image {
            width: 100%;
            max-width: 250px;
            height: auto;
            margin: 0 auto;
          }
          
          .substrate-section {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .substrate-text-content {
            display: flex;
            flex-direction: column;
          }
          
          .substrate-image {
            width: 100%;
            max-width: 280px;
            height: auto;
            margin: 0 auto;
          }
        }
      `}</style>
    </main>
  );
}

