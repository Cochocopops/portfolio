'use client';

import dynamic from 'next/dynamic';

const RadarScene = dynamic(() => import('@/components/RadarScene'), {
  ssr: false,
  loading: () => <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
      Loading 3D Scene...
    </div>
  </div>
});

const technologies = [
  'Arduino',
  'RF Detection',
  'Signal Processing',
  'Three.js',
  'SolidWorks',
  'Circuit Design'
];

export default function DroneDetectionPage() {
  return (
    <main style={{ 
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: 'white',
      paddingTop: '120px',
      paddingBottom: '4rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        {/* Title & Description */}
        <section style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontFamily: 'BebasNeue, sans-serif',
            marginBottom: '1.5rem',
            letterSpacing: '0.05em'
          }}>
            DRONE DETECTION SYSTEM
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#ccc',
            maxWidth: '800px',
            lineHeight: '1.8',
            marginBottom: '0'
          }}>
            Advanced drone detection and tracking system using RF technology and acoustic sensors. 
            The radar dish rotates to scan for drones, with real-time LED indicators showing detection status.
          </p>
        </section>

        {/* Interactive 3D Scene */}
        <section style={{ marginBottom: '0' }}>
          <RadarScene />
        </section>

        {/* Separator */}
        <div style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#333',
          margin: '4rem 0'
        }} />

        {/* Technologies */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontFamily: 'BebasNeue, sans-serif',
            marginBottom: '2rem',
            letterSpacing: '0.05em'
          }}>
            TECHNOLOGIES
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.8rem',
            alignItems: 'flex-start'
          }}>
            {technologies.map((tech) => (
              <div key={tech} style={{
                padding: '0.6rem 1.5rem',
                backgroundColor: '#e5e5e5',
                borderRadius: '25px',
                fontSize: '1rem',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: '500',
                color: '#000',
                whiteSpace: 'nowrap'
              }}>
                {tech}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Global and Responsive styles */}
      <style jsx global>{`
        body {
          background-color: #0a0a0a !important;
        }
        
        @media (max-width: 768px) {
          section {
            margin-bottom: 2rem !important;
          }
          
          h1 {
            font-size: 2rem !important;
            margin-bottom: 1rem !important;
          }
          
          h2 {
            font-size: 1.6rem !important;
            margin-bottom: 1.5rem !important;
          }

          p {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </main>
  );
}

