'use client';

import Image from 'next/image';

export default function DroneHackathonPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        paddingTop: '120px',
        paddingLeft: '3.5rem',
        paddingRight: '3.5rem',
        paddingBottom: '4rem',
        background: 'white',
        color: '#111',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Title */}
        <h1
          style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: 'clamp(2.4rem, 3.2vw, 3.4rem)',
            marginBottom: '0.5rem',
            letterSpacing: '1px',
          }}
        >
          Rescue Drone
        </h1>

        {/* Subtitle */}
        <p style={{ marginBottom: '2rem', color: '#555', maxWidth: '72ch' }}>
          Universal drone module for emergency communication and equipment delivery
        </p>

        {/* Separator */}
        <hr style={{ border: 'none', borderTop: '1px solid #ddd', marginBottom: '3rem' }} />

        {/* Main Hero Image - Drone in landscape */}
        <div style={{ marginBottom: '3rem' }}>
          <Image
            src="/assets/projects/Drone_Hackathon/Drone_Image6.png"
            alt="Rescue Drone in field operation"
            width={1200}
            height={600}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
            }}
          />
        </div>

        {/* Module Components - 2x2 Grid */}
        <div style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              fontFamily: 'BebasNeue, sans-serif',
              fontSize: '1.8rem',
              marginBottom: '1.5rem',
            }}
          >
            Module Components
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem',
            }}
          >
            {/* Component 1: Complete Module */}
            <div
              style={{
                padding: '1.5rem',
                border: '2px solid #ddd',
                borderRadius: '12px',
                background: '#fff',
              }}
            >
              <Image
                src="/assets/projects/Drone_Hackathon/Drone_Image2.png"
                alt="Complete module with straps"
                width={500}
                height={400}
                style={{
                  width: '100%',
                  height: 'auto',
                  marginBottom: '1rem',
                  borderRadius: '8px',
                }}
              />
              <h3
                style={{
                  fontFamily: 'BebasNeue, sans-serif',
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem',
                  color: '#111',
                }}
              >
                Complete Module with Straps
              </h3>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Standalone rescue module with integrated attachment straps for universal drone compatibility
              </p>
            </div>

            {/* Component 2: Module on Drone */}
            <div
              style={{
                padding: '1.5rem',
                border: '2px solid #ddd',
                borderRadius: '12px',
                background: '#fff',
              }}
            >
              <Image
                src="/assets/projects/Drone_Hackathon/Drone_Image3.png"
                alt="Module installed on drone"
                width={500}
                height={400}
                style={{
                  width: '100%',
                  height: 'auto',
                  marginBottom: '1rem',
                  borderRadius: '8px',
                }}
              />
              <h3
                style={{
                  fontFamily: 'BebasNeue, sans-serif',
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem',
                  color: '#111',
                }}
              >
                Module Installed on Drone
              </h3>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6 }}>
                System securely mounted on drone, showing integration with aircraft structure
              </p>
            </div>

            {/* Component 3: Foam Padding */}
            <div
              style={{
                padding: '1.5rem',
                border: '2px solid #ddd',
                borderRadius: '12px',
                background: '#fff',
              }}
            >
              <Image
                src="/assets/projects/Drone_Hackathon/Drone_Image4.png"
                alt="Protective foam padding"
                width={500}
                height={400}
                style={{
                  width: '100%',
                  height: 'auto',
                  marginBottom: '1rem',
                  borderRadius: '8px',
                }}
              />
              <h3
                style={{
                  fontFamily: 'BebasNeue, sans-serif',
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem',
                  color: '#111',
                }}
              >
                Protective Foam Padding
              </h3>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Custom foam inserts designed to protect first aid equipment during flight and landing
              </p>
            </div>

            {/* Component 4: Speakers */}
            <div
              style={{
                padding: '1.5rem',
                border: '2px solid #ddd',
                borderRadius: '12px',
                background: '#fff',
              }}
            >
              <Image
                src="/assets/projects/Drone_Hackathon/Drone_Image5.png"
                alt="Communication speakers"
                width={500}
                height={400}
                style={{
                  width: '100%',
                  height: 'auto',
                  marginBottom: '1rem',
                  borderRadius: '8px',
                }}
              />
              <h3
                style={{
                  fontFamily: 'BebasNeue, sans-serif',
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem',
                  color: '#111',
                }}
              >
                Integrated Communication Speakers
              </h3>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6 }}>
                High-power speakers (in red) enabling long-range voice communication via LoRa technology
              </p>
            </div>
          </div>
        </div>

        {/* 3D Render - Centered without background */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <Image
            src="/assets/projects/Drone_Hackathon/Drone_Image7.png"
            alt="Blender realistic render of module"
            width={800}
            height={600}
            style={{
              maxWidth: '100%',
              height: 'auto',
              margin: '0 auto',
            }}
          />
        </div>

        {/* Key Features */}
        <div style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              fontFamily: 'BebasNeue, sans-serif',
              fontSize: '1.8rem',
              marginBottom: '0.8rem',
            }}
          >
            Key Features
          </h2>
          <ul style={{ color: '#444', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
            <li>
              <strong>Long-range Communication:</strong> Integrated speaker system for direct 
              communication via LoRa technology in remote areas
            </li>
            <li>
              <strong>Emergency Equipment Delivery:</strong> Capable of carrying and deploying 
              first aid kits, medication, or survival gear
            </li>
            <li>
              <strong>Universal Compatibility:</strong> Modular design with adjustable straps 
              fits any drone model
            </li>
            <li>
              <strong>Autonomous Navigation:</strong> GPS-guided flight system for precise 
              delivery to coordinates
            </li>
            <li>
              <strong>Isolated Area Operation:</strong> Designed for mountain, forest, or 
              disaster zones with no cellular infrastructure
            </li>
          </ul>
        </div>

        {/* Separator */}
        <hr style={{ border: 'none', borderTop: '1px solid #ddd', marginBottom: '2rem' }} />

        {/* Technologies */}
        <div style={{ marginBottom: '1rem' }}>
          <h2
            style={{
              fontFamily: 'BebasNeue, sans-serif',
              fontSize: '1.8rem',
              marginBottom: '0.8rem',
            }}
          >
            Technologies
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            {['3D Printing', 'Blender', 'LoRa Communication', 'GPS Navigation', 'Arduino', 'Speaker Integration', 'Modular Design'].map(
              (tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: 'MavenPro, sans-serif',
                    fontSize: '0.95rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#e0e0e0',
                    color: '#000',
                    borderRadius: '20px',
                    fontWeight: '500',
                  }}
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          main {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
          div[style*='gridTemplateColumns: repeat(2, 1fr)'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
