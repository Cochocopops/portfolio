'use client';

import { useState, useEffect } from 'react';

export default function HighVoltageFogHarvestingPage() {
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
            Electrostatically Enhanced Fog Harvesting
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#555',
            maxWidth: '900px',
            lineHeight: '1.8',
            marginBottom: '0'
          }}>
            An innovative approach to water collection using high-voltage electrical fields to enhance fog harvesting efficiency. Inspired by groundbreaking MIT research on space charge injection.
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

        {/* MIT Research Context */}
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
            Research Context
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.8',
            marginBottom: '1.5rem',
            maxWidth: '900px'
          }}>
            This project is based on a pioneering 2018 MIT study titled <strong>&quot;Electrostatically driven fog collection using space charge injection&quot;</strong>. The research demonstrated that by applying an electrical charge of approximately 10,000 volts to fog droplets using an ion emitter, water droplets can be electrostatically attracted to a grounded collection mesh, significantly improving collection efficiency compared to traditional passive fog nets.
          </p>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.8',
            marginBottom: '1.5rem',
            maxWidth: '900px'
          }}>
            The MIT team showed that this technique could increase water collection rates by up to 3 times, making it a promising solution for arid regions where fog is present but rainfall is scarce.
          </p>
          
          {/* Video embed */}
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden',
            marginTop: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <iframe
              src="https://www.youtube.com/embed/askK_1SZZ-g"
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

        {/* System Design */}
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
            System Architecture
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.8',
            marginBottom: '2rem',
            maxWidth: '900px'
          }}>
            The system consists of several key components working together to enhance fog collection efficiency:
          </p>

          {/* System diagram */}
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <img 
              src="/assets/projects/High_Voltage/Fonctionnement.png" 
              alt="System functioning diagram"
              style={{
                width: '100%',
                maxWidth: '1000px',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          {/* Components breakdown */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8f8f8',
              borderRadius: '8px'
            }}>
              <h3 style={{
                fontFamily: 'BebasNeue, sans-serif',
                fontSize: '1.4rem',
                marginBottom: '0.8rem',
                color: '#111',
                letterSpacing: '0.03em'
              }}>
                Ion Emitter (35kV)
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#666',
                lineHeight: '1.6'
              }}>
                High-voltage ion emitter charges incoming fog droplets with electrical charges, preparing them for electrostatic attraction.
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8f8f8',
              borderRadius: '8px'
            }}>
              <h3 style={{
                fontFamily: 'BebasNeue, sans-serif',
                fontSize: '1.4rem',
                marginBottom: '0.8rem',
                color: '#111',
                letterSpacing: '0.03em'
              }}>
                Collection Mesh
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#666',
                lineHeight: '1.6'
              }}>
                Grounded mesh electrode that attracts charged droplets through electrostatic forces, significantly increasing capture efficiency.
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8f8f8',
              borderRadius: '8px'
            }}>
              <h3 style={{
                fontFamily: 'BebasNeue, sans-serif',
                fontSize: '1.4rem',
                marginBottom: '0.8rem',
                color: '#111',
                letterSpacing: '0.03em'
              }}>
                Water Collection
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#666',
                lineHeight: '1.6'
              }}>
                Captured water droplets coalesce on the mesh and flow down to a collection reservoir for storage and distribution.
              </p>
            </div>
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

        {/* Applied Research */}
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
            Implementation & Research
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            lineHeight: '1.8',
            marginBottom: '2rem',
            maxWidth: '900px'
          }}>
            This project explores the practical implementation of electrostatically enhanced fog harvesting, investigating optimal voltage levels, electrode configurations, and environmental conditions for maximum water collection efficiency. The research focuses on making this technology accessible and scalable for real-world applications in water-scarce regions.
          </p>

          {/* Research documents */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '700px'
          }}>
            <a 
              href="/assets/projects/High_Voltage/Applied_Research_Corentin_Chantereau_Electrostatically_Enhanced_Fog_Harvesting.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1.2rem 1.5rem',
                backgroundColor: '#111',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
              }}
            >
              <span style={{ marginRight: '1rem', fontSize: '1.5rem' }}>📄</span>
              <div>
                <div style={{
                  fontFamily: 'BebasNeue, sans-serif',
                  fontSize: '1.2rem',
                  letterSpacing: '0.03em'
                }}>
                  Applied Research Document
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  opacity: 0.8,
                  marginTop: '0.2rem'
                }}>
                  Corentin Chantereau - Electrostatically Enhanced Fog Harvesting
                </div>
              </div>
            </a>

            <a 
              href="/assets/projects/High_Voltage/eaao5323.full.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1.2rem 1.5rem',
                backgroundColor: '#f0f0f0',
                color: '#111',
                textDecoration: 'none',
                borderRadius: '8px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
              }}
            >
              <span style={{ marginRight: '1rem', fontSize: '1.5rem' }}>📚</span>
              <div>
                <div style={{
                  fontFamily: 'BebasNeue, sans-serif',
                  fontSize: '1.2rem',
                  letterSpacing: '0.03em'
                }}>
                  MIT Research Paper (2018)
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  opacity: 0.7,
                  marginTop: '0.2rem'
                }}>
                  Electrostatically driven fog collection using space charge injection
                </div>
              </div>
            </a>
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

        {/* Applications */}
        <section style={{
          marginBottom: '3rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out 1.1s'
        }}>
          <h2 style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            marginBottom: '1.5rem',
            color: '#111',
            letterSpacing: '0.03em'
          }}>
            Potential Applications
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              padding: '1.5rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>💧</div>
              <h3 style={{
                fontFamily: 'BebasNeue, sans-serif',
                fontSize: '1.2rem',
                marginBottom: '0.5rem',
                letterSpacing: '0.03em'
              }}>
                Water-Scarce Regions
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#666',
                lineHeight: '1.6'
              }}>
                Provide sustainable water sources in coastal desert regions with regular fog presence.
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>🌾</div>
              <h3 style={{
                fontFamily: 'BebasNeue, sans-serif',
                fontSize: '1.2rem',
                marginBottom: '0.5rem',
                letterSpacing: '0.03em'
              }}>
                Agricultural Irrigation
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#666',
                lineHeight: '1.6'
              }}>
                Support small-scale farming operations in areas where traditional water sources are limited.
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>🏘️</div>
              <h3 style={{
                fontFamily: 'BebasNeue, sans-serif',
                fontSize: '1.2rem',
                marginBottom: '0.5rem',
                letterSpacing: '0.03em'
              }}>
                Remote Communities
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#666',
                lineHeight: '1.6'
              }}>
                Enable water independence for isolated communities in fog-prone mountainous areas.
              </p>
            </div>
          </div>
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
            {[
              'High Voltage Electronics',
              'Ion Emitters',
              'Electrostatics',
              'Water Harvesting',
              'Sustainable Engineering',
              'Circuit Design',
              'Environmental Science'
            ].map((tech) => (
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

