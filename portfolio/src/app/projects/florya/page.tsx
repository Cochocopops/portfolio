"use client";

export default function FloryaPage() {
  return (
    <main style={{
      minHeight: '100vh',
      paddingTop: 'calc(var(--nav-h) + var(--gap))',
      paddingLeft: '3.5rem',
      paddingRight: '3.5rem',
      paddingBottom: '4rem',
      background: 'white',
      color: '#111'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Hero Section */}
        <section style={{
          marginBottom: '4rem'
        }}>
          <h1 style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: 'clamp(2.4rem, 3.2vw, 3.4rem)',
            marginBottom: '1rem',
            letterSpacing: '1px'
          }}>
            Florya - Kickstarter Project
          </h1>
          
          <p style={{
            color: '#555',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            maxWidth: '72ch',
            marginBottom: '0'
          }}>
            Celebrate the fusion of eco-friendly innovation and timeless style with Florya.
            Each handcrafted leather flower is a testament to sustainable luxury, made from vegetable-tanned
            leather, and designed to enrich your space with the subtle scent of essential oils.
          </p>
        </section>

        {/* Product Images Grid */}
        <section style={{
          marginBottom: '4rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0'
          }}>
          <img 
            src="/assets/projects/Project_2/commode.png" 
            alt="Florya leather diffuser on dresser"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              aspectRatio: '4 / 3',
              display: 'block'
            }}
          />
          <img 
            src="/assets/projects/Project_2/Pull.png" 
            alt="Florya leather diffuser on sweater"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              aspectRatio: '4 / 3',
              display: 'block'
            }}
          />
          <img 
            src="/assets/projects/Project_2/Project2.png" 
            alt="Florya leather diffuser close-up"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              aspectRatio: '4 / 3',
              display: 'block'
            }}
          />
          </div>
        </section>

        {/* Video Section */}
        <section style={{
          marginBottom: '5rem'
        }}>
          <h2 style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: '1.8rem',
            marginBottom: '1.5rem',
            letterSpacing: '0.5px'
          }}>
            Campaign Video
          </h2>
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%', // 16:9 aspect ratio
            height: 0,
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <iframe
              src="https://www.youtube.com/embed/Sqi1YSX6ruc"
              title="Florya Kickstarter Campaign"
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

        {/* Kickstarter Call to Action */}
        <section style={{
          marginBottom: '5rem',
          textAlign: 'center'
        }}>
          <a
            href="https://www.kickstarter.com/projects/florya/quickstarter-florya"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginBottom: '2rem'
            }}
          >
            <img 
              src="/assets/projects/Project_2/Kickstarter-Logo.avif" 
              alt="Kickstarter"
              style={{
                height: '50px',
                width: 'auto',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </a>

          <div>
            <a
              href="https://www.kickstarter.com/projects/florya/quickstarter-florya"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '1rem 3rem',
                background: '#05CE78',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(5, 206, 120, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#04B469';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(5, 206, 120, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#05CE78';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 206, 120, 0.3)';
              }}
            >
              Voir la campagne
            </a>
          </div>
        </section>

        {/* Workshop Images */}
        <section style={{
          marginBottom: '5rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem'
          }}>
          <img 
            src="/assets/projects/Project_2/atelier.png" 
            alt="Florya Workshop"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              aspectRatio: '16 / 9',
              display: 'block',
              borderRadius: '8px'
            }}
          />
          <img 
            src="/assets/projects/Project_2/press_atelier.png" 
            alt="Florya Press Workshop"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              aspectRatio: '16 / 9',
              display: 'block',
              borderRadius: '8px'
            }}
          />
          </div>
        </section>

        {/* Separator */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #ddd, transparent)',
          margin: '3rem 0'
        }} />

        {/* Technologies */}
        <section style={{
          marginBottom: '3rem'
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
            {['Vegetable-tanned Leather', 'Artisanal Craftsmanship', 'Essential Oil Diffusion', 'Sustainable Design', 'Laser Cutting', 'Natural Materials'].map(tech => (
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

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
          
          h1 {
            font-size: 2rem !important;
          }
          
          h2 {
            font-size: 1.6rem !important;
          }
          
          div[style*="gridTemplateColumns: repeat(2, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          
          /* Kickstarter section - reduce logo and button size */
          img[alt="Kickstarter"] {
            height: 35px !important;
          }
          
          a[href*="kickstarter.com"] {
            padding: 0.75rem 2rem !important;
            font-size: 1rem !important;
          }
        }
        
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

