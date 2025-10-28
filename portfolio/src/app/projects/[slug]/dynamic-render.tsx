'use client';

import { useState, useEffect } from 'react';

type ContentSection = {
  type: 'text' | 'youtube' | 'pdf';
  title?: string;
  content?: string;
  url?: string;
};

type DynamicProject = {
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
  image: string;
  date: string;
  sections?: ContentSection[];
  technologies?: string[];
};

function extractYouTubeId(url: string): string {
  if (!url) return '';
  
  // If it's just an ID
  if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
    return url;
  }
  
  // Extract from various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return url;
}

export default function DynamicProjectRender({ project }: { project: DynamicProject }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!project.sections || project.sections.length === 0) {
    return null;
  }

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
            {project.title}
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#555',
            maxWidth: '800px',
            lineHeight: '1.8',
            marginBottom: '0'
          }}>
            {project.excerpt}
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

        {/* Content Sections */}
        {project.sections.map((section, index) => (
          <div key={index}>
            <section style={{
              marginBottom: '3rem',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.8s ease-out ${0.3 + index * 0.2}s`
            }}>
              {section.title && (
                <h2 style={{
                  fontFamily: 'BebasNeue, sans-serif',
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  marginBottom: '1rem',
                  color: '#111',
                  letterSpacing: '0.03em'
                }}>
                  {section.title}
                </h2>
              )}

              {section.type === 'text' && section.content && (
                <p style={{
                  fontSize: '1.05rem',
                  color: '#555',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  maxWidth: '800px',
                  whiteSpace: 'pre-wrap'
                }}>
                  {section.content}
                </p>
              )}

              {section.type === 'youtube' && section.url && (
                <div style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  marginTop: '1rem'
                }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYouTubeId(section.url)}`}
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
              )}

              {section.type === 'pdf' && section.url && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1.5rem',
                  background: '#f5f5f5',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}>
                  <a 
                    href={section.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '12px 20px',
                      background: '#111',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontWeight: '500',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#333'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#111'}
                  >
                    📄 View PDF Document
                  </a>
                </div>
              )}
            </section>

            {/* Separator between sections (except after last one) */}
            {index < project.sections.length - 1 && (
              <div style={{
                width: '100%',
                height: '1px',
                background: 'linear-gradient(to right, transparent, #ddd, transparent)',
                margin: '3rem 0',
                opacity: isVisible ? 1 : 0,
                transition: `opacity 0.8s ease-out ${0.5 + index * 0.2}s`
              }} />
            )}
          </div>
        ))}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <>
            <div style={{
              width: '100%',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #ddd, transparent)',
              margin: '3rem 0',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.8s ease-out 0.8s'
            }} />
            
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
                {project.technologies.map((tech) => (
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
          </>
        )}
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

