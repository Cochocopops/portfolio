"use client";
import { useState, useEffect } from "react";

export default function RythmeCarGamePage() {
  const GAME_WEB_URL = '/games/rythme-car-game/index.html';
  const [showGame, setShowGame] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (showGame) {
    // Mode plein écran pour le jeu
    return (
      <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#000',
          zIndex: 9999
        }}>
        {isMobile ? (
          // Mobile: plein écran
          <>
            <button
              onClick={() => setShowGame(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                border: '2px solid white',
                padding: '0.5rem 1rem',
                borderRadius: 999,
                cursor: 'pointer',
                zIndex: 10000,
                fontWeight: 600
              }}
            >
              ✕ Fermer
            </button>
            <iframe
              src={GAME_WEB_URL}
              style={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              title="Rythme Car Game"
            />
          </>
        ) : (
          // Desktop: dans un cadre de téléphone
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          }}>
            <button
              onClick={() => setShowGame(false)}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                padding: '0.75rem 1.5rem',
                borderRadius: 999,
                cursor: 'pointer',
                zIndex: 10000,
                fontWeight: 600,
                fontSize: '1rem',
                backdropFilter: 'blur(10px)'
              }}
            >
              ✕ Fermer le jeu
            </button>
            
            {/* Cadre du téléphone avec masque SVG */}
            <div style={{
              position: 'relative',
              width: '444px',
              height: '790px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))'
            }}>
              {/* L'iframe du jeu */}
              <div style={{
                width: '444px',
                height: '790px',
                overflow: 'hidden',
                borderRadius: '50px',
                background: '#000',
                border: '3px solid #2a2a2a',
                boxShadow: '0 0 0 1px #444, 0 20px 60px rgba(0,0,0,0.8)'
              }}>
                <iframe
                  src={GAME_WEB_URL}
                  style={{
                    width: '444px',
                    height: '790px',
                    border: 'none',
                    display: 'block',
                    margin: 0,
                    padding: 0
                  }}
                  title="Rythme Car Game"
                  scrolling="no"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Page de présentation du projet
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
        <h1 style={{
          fontFamily: 'BebasNeue, sans-serif',
          fontSize: 'clamp(2.4rem, 3.2vw, 3.4rem)',
          marginBottom: '0.5rem',
          letterSpacing: '1px'
        }}>
          Rythme Car Game
        </h1>

        <p style={{ marginBottom: '2rem', color: '#555', maxWidth: '72ch' }}>
          Developed Rythme Car Game, a rhythm-based driving game in Python where
          players navigate a car while avoiding obstacles to achieve high scores.
        </p>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: '1.8rem',
            marginBottom: '0.8rem'
          }}>
            Features
          </h2>
          <ul style={{ color: '#444', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
            <li>Implemented an interactive menu and a score management system.</li>
            <li>Designed immersive gameplay with background music and sound effects.</li>
            <li>Focused on game mechanics, user experience, and real-time interaction.</li>
          </ul>
        </div>

        {/* Options de jeu - Rectangles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
          
          {/* Rectangle Jouer en ligne */}
          <div style={{
            padding: '2rem',
            border: '2px solid #ddd',
            borderRadius: '12px',
            background: '#fff'
          }}>
            <h3 style={{
              fontFamily: 'BebasNeue, sans-serif',
              fontSize: '1.5rem',
              marginBottom: '1rem',
              color: '#111'
            }}>
              Jouer en ligne
            </h3>
            <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Lancez le jeu directement dans votre navigateur sans installation
            </p>
            <button
              onClick={() => setShowGame(true)}
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                background: '#FF9800',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#FFA726'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#FF9800'}
            >
              ▶️ Jouer maintenant
            </button>
          </div>

          {/* Rectangle Télécharger */}
          <div style={{
            padding: '2rem',
            border: '2px solid #ddd',
            borderRadius: '12px',
            background: '#fff'
          }}>
            <h3 style={{
              fontFamily: 'BebasNeue, sans-serif',
              fontSize: '1.5rem',
              marginBottom: '1rem',
              color: '#111'
            }}>
              Télécharger
            </h3>
            <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Code source complet avec toutes les ressources sur GitHub
            </p>
            <a
              href="https://github.com/Cochocopops/Rythme_car_game"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                background: '#111',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'block',
                textAlign: 'center',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#333'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#111'}
            >
              📦 Voir sur GitHub
            </a>
          </div>
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #ddd' }}>
          <h2 style={{
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: '1.8rem',
            marginBottom: '0.8rem'
          }}>
            Technologies
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Python', 'Pygame', 'Pygbag', 'WebAssembly'].map(tech => (
              <span key={tech} style={{
                padding: '0.4rem 0.9rem',
                background: '#eee',
                borderRadius: 999,
                fontSize: '0.9rem',
                border: '1px solid #ddd'
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
