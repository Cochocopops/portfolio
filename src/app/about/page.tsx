"use client";
import "./about.css";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

export default function About() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 120; // compense le sticky
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  const [activeSection, setActiveSection] = useState("education");
  const [eduMenuOpen, setEduMenuOpen] = useState(false);
  const [expMenuOpen, setExpMenuOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skills = [
    {
      id: 'design',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
      title: 'Design & Prototyping',
      details: 'SolidWorks, CATIA, 3D printing, CAD modeling, product design'
    },
    {
      id: 'materials',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z" />
        </svg>
      ),
      title: 'Materials & Packaging',
      details: 'Polymers, composites, biomaterials, material selection, packaging design'
    },
    {
      id: 'electronics',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      title: 'Electronics & Digital',
      details: 'KiCad, prototyping sensors/actuators, embedded systems, circuit design'
    },
    {
      id: 'simulation',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
      title: 'Simulation & Tools',
      details: 'ANSYS, MATLAB/Octave, FEMM, finite element analysis, data visualization'
    },
    {
      id: 'programming',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      title: 'Programming',
      details: 'Java, JavaScript, Python, C#, CSS, HTML, React, Next.js'
    },
    {
      id: 'management',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
      title: 'Project Management',
      details: 'Planning, risk analysis, reporting, coordination, budget management'
    }
  ];

  const educationYears: { label: string; id: string }[] = [
    { label: "2025/2026", id: "2025-2026" },
    { label: "2024/2025", id: "2024-2025" },
    { label: "2020/2023", id: "2020-2023" },
    { label: "2013/2020", id: "2013-2020" },
  ];

  const experienceYears: { label: string; id: string }[] = [
    { label: "2025", id: "exp-2025" },
    { label: "2024", id: "exp-2024" },
    { label: "2023", id: "exp-2023" },
    { label: "2022", id: "exp-2022" },
    { label: "2021", id: "exp-2021" },
  ];

  useEffect(() => {
    const onScroll = () => {
      const edu = document.getElementById("education");
      const exp = document.getElementById("experience");
      if (!edu || !exp) return;

      const scrollY = window.scrollY + 200;
      if (scrollY >= exp.offsetTop) setActiveSection("experience");
      else setActiveSection("education");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let isAdjusting = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (isAdjusting) return;

      const currentScrollY = window.scrollY;
      const navbarHeight = 120;
      const viewportHeight = window.innerHeight;
      
      const edu = document.getElementById("education");
      const exp = document.getElementById("experience");
      
      // Check if scrolling down (positive direction)
      const scrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;
      
      if (scrollingDown && edu) {
        const eduRect = edu.getBoundingClientRect();
        // When the education section enters viewport from bottom (between middle and navbar)
        if (eduRect.top < viewportHeight * 0.6 && eduRect.top > navbarHeight) {
          isAdjusting = true;
          window.scrollTo({
            top: window.scrollY + eduRect.top - navbarHeight,
            behavior: 'smooth'
          });
          setTimeout(() => { isAdjusting = false; }, 800);
        }
      }
      
      if (scrollingDown && exp) {
        const expRect = exp.getBoundingClientRect();
        // When the experience section enters viewport from bottom
        if (expRect.top < viewportHeight * 0.6 && expRect.top > navbarHeight) {
          isAdjusting = true;
          window.scrollTo({
            top: window.scrollY + expRect.top - navbarHeight,
            behavior: 'smooth'
          });
          setTimeout(() => { isAdjusting = false; }, 800);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="about-page">
      {/* Section Intro */}
      <section className="about-intro">
        <h1>CORENTIN CHANTEREAU</h1> 

        {/* Separator */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #ddd, transparent)',
          margin: '2rem 0'
        }} />

        <p>
          Currently pursuing an MSc in Creative Technology Engineering at ESILV Paris, I design and develop impact-driven projects
          combining electronics, mechanics, product design, programming, and entrepreneurship. I have a particular interest in hands-on,
          modular projects, where ideas quickly evolve into functional prototypes, especially during hackathons or personal projects
          (detection systems, connected objects, high-voltage devices, etc.).
        </p>
        <p>
         My background has allowed me to explore a variety of domains: embedded systems, biomaterials, artisanal manufacturing,
         low-tech design, lightweight AI, and more. I like to be fully involved in a project, managing all aspects, from conception to
         presentation while continuously learning along the way. 
        </p>

        {/* Skills Section */}
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ 
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            marginBottom: '1.5rem',
            letterSpacing: '0.03em'
          }}>
            SKILLS
          </h2>
          
          {/* Skills Icons Grid */}
          <div 
            className="skills-grid"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}
          >
            {skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '1.5rem 1rem',
                  minWidth: '140px',
                  flex: '0 0 auto',
                  backgroundColor: selectedSkill === skill.id ? '#111' : '#f8f8f8',
                  color: selectedSkill === skill.id ? '#fff' : '#111',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: selectedSkill === skill.id ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: selectedSkill === skill.id ? '0 8px 24px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => {
                  if (selectedSkill !== skill.id) {
                    e.currentTarget.style.backgroundColor = '#e8e8e8';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedSkill !== skill.id) {
                    e.currentTarget.style.backgroundColor = '#f8f8f8';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                <div style={{ 
                  marginBottom: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {skill.icon}
                </div>
                <span style={{
                  fontFamily: 'BebasNeue, sans-serif',
                  fontSize: '1rem',
                  letterSpacing: '0.03em',
                  textAlign: 'center',
                  lineHeight: '1.2'
                }}>
                  {skill.title}
                </span>
              </button>
            ))}
          </div>

          {/* Skill Details */}
          {selectedSkill && (
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f0f0f0',
              borderRadius: '12px',
              marginTop: '1rem',
              animation: 'fadeIn 0.3s ease-in-out'
            }}>
              <h3 style={{
                fontFamily: 'BebasNeue, sans-serif',
                fontSize: '1.4rem',
                marginBottom: '0.8rem',
                letterSpacing: '0.03em'
              }}>
                {skills.find(s => s.id === selectedSkill)?.title}
              </h3>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.6',
                color: '#555'
              }}>
                {skills.find(s => s.id === selectedSkill)?.details}
              </p>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @media (max-width: 768px) {
            .about-intro h2,
            .about-intro h3 {
              text-align: center;
            }
            
            button span {
              text-align: center !important;
              word-break: break-word;
            }
            
            button > div {
              display: flex !important;
              justify-content: center !important;
              align-items: center !important;
            }
            
            button svg {
              margin: 0 auto;
            }
          }
        `}</style>

        {/* Language Certifications */}
        <div style={{ marginTop: '2.5rem' }}>
          <h2 style={{ 
            fontFamily: 'BebasNeue, sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            marginBottom: '1.5rem',
            letterSpacing: '0.03em',
            textAlign: 'center'
          }}>
            Language Certifications
          </h2>
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <a 
              href="/assets/home/certificate_2025081915548.pdf"
              download="TOEIC_Certificate_Corentin_Chantereau.pdf"
              style={{
                padding: '0.8rem 1.5rem',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                fontWeight: '500',
                textDecoration: 'none',
                color: '#111',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e0e0e0';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <strong>TOEIC:</strong> 985/990
            </a>
            <div style={{
              padding: '0.8rem 1.5rem',
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              fontWeight: '500'
            }}>
              <strong>TOEFL ITP:</strong> 617/677
            </div>
          </div>
        </div>
      </section>

      {/* Separator before Education */}
      <div style={{
        width: '100%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, #ddd, transparent)',
        margin: '3rem 0'
      }} />

      {/* Education Section */}
      <section id="education" className="about-section">
        <div className="sidebar">
          <h2 className={activeSection === "education" ? "active" : ""}>EDUCATION</h2>
          <ul>
            {["2025/2026", "2024/2025", "2023/2024", "2022/2023", "2021/2022", "2020/2021"].map(
              (year) => (
                <li key={year} onClick={() => scrollTo(year.replace("/", "-"))}>
                  {year}
                </li>
              )
            )}
          </ul>
          {/* Dropdown mobile/portrait */}
          <div className={`year-dropdown ${eduMenuOpen ? "open" : ""}`}>
            <button
              className="year-button"
              aria-haspopup="listbox"
              aria-expanded={eduMenuOpen}
              onClick={() => setEduMenuOpen((v) => !v)}
              onBlur={() => setEduMenuOpen(false)}
            >
              Years
            </button>
            <ul className="year-menu" role="listbox">
              {educationYears.map((y) => (
                <li key={y.id} role="option">
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setEduMenuOpen(false);
                      scrollTo(y.id);
                    }}
                  >
                    {y.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="content">
          <div id="2025-2026" className="edu-item">
            <h3>2023–2026 — ESILV, MSc Creative Technology Engineering</h3>
            <p>
              Specialization: Resilient Futures, Sustainable Design, Human–Machine Interaction
            </p>
          </div>
          <div id="2024-2025" className="edu-item">
            <h3>2024 — Dorset College, Dublin</h3>
            <p>Courses: Innovation, Product Development, International Business</p>
          </div>
          <div id="2020-2023" className="edu-item">
            <h3>2020–2023 — ECAM La Salle Lyon</h3>
            <p>Focus: Mechanical Design, Materials Science, Industrial Processes</p>
          </div>
          <div id="2013-2020" className="edu-item">
            <h3>2013–2020 — La Salle Passy Buzenval</h3>
            <p>Baccalauréat</p>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div style={{
        width: '100%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, #ddd, transparent)',
        margin: '3rem 0'
      }} />

      {/* Section Experience */}
      <section id="experience" className="about-section">
        <div className="sidebar">
          <h2 className={activeSection === "experience" ? "active" : ""}>EXPERIENCE</h2>
          <ul>
            {["2025", "2024", "2023", "2022", "2021"].map((year) => (
              <li key={year} onClick={() => scrollTo(`exp-${year}`)}>
                {year}
              </li>
            ))}
          </ul>
          {/* Dropdown mobile/portrait */}
          <div className={`year-dropdown ${expMenuOpen ? "open" : ""}`}>
            <button
              className="year-button"
              aria-haspopup="listbox"
              aria-expanded={expMenuOpen}
              onClick={() => setExpMenuOpen((v) => !v)}
              onBlur={() => setExpMenuOpen(false)}
            >
              Years
            </button>
            <ul className="year-menu" role="listbox">
              {experienceYears.map((y) => (
                <li key={y.id} role="option">
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setExpMenuOpen(false);
                      scrollTo(y.id);
                    }}
                  >
                    {y.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="content">
          <div id="exp-2025" className="exp-item">
            <h3>
              2025 — Founder,{" "}
              <Link href="/projects/florya">Florya (Kickstarter Project)</Link>
            </h3>
            <p>
              Created and launched Florya, a vegetable-tanned leather essential oil diffuser,
              through a crowdfunding campaign on Kickstarter.
            </p>
            <ul>
              <li>Product design: crafted an innovative, artisanal leather flower as the centerpiece.</li>
              <li>Project management: planned and managed production, budget, and timeline.</li>
              <li>Crowdfunding success: +30 customers, over €1,000 raised.</li>
              <li>Commercialization: first sales and direct customer engagement.</li>
            </ul>
            <p>
              <strong>Outcome:</strong> Complete hands-on entrepreneurial experience, from ideation to market launch,
              demonstrating the ability to turn an idea into a tangible product.
            </p>
          </div>

          <div id="exp-2025-artist" className="exp-item">
            <h3>
              2025 — Engineer & Artistic Collaborator,{" "}
              <Link href="/projects/atlas-butterflies">Atlas Butterflies Project</Link>
            </h3>
            <p>
              Worked on the Atlas Butterflies project, an upcoming exhibition (2026) combining artistic design and engineering innovation.
            </p>
            <ul>
              <li>Designed and prototyped innovative structures blending mechanical and electronic elements with artistic vision.</li>
              <li>Material selection and rapid iterations to optimize performance and aesthetics.</li>
              <li>Mechanical/electronic integration, testing, and documenting assembly procedures.</li>
              <li>Collaboration with creative and technical stakeholders, coordinating tasks and sharing progress.</li>
              <li>Delivered a final functional prototype, demonstrating a seamless integration of design and engineering.</li>
            </ul>
            <p>
              <strong>Outcome:</strong> Gained hands-on experience across the full development cycle, from concept to working prototype,
              enhancing both technical and creative skills in a collaborative environment.
            </p>
          </div>

          <div id="exp-2023" className="exp-item">
            <h3>2023 — R&D Intern, ADAS Systems</h3>
            <p>Contributed to the development and testing of Advanced Driver Assistance Systems (ADAS):</p>
            <ul>
              <li>Conducted feasibility analyses and developed early-stage prototypes to evaluate system concepts.</li>
              <li>Performed risk assessments and safety evaluations to support vehicle testing processes.</li>
              <li>Collaborated with engineering teams to optimize test procedures and ensure reliable results.</li>
            </ul>
            <p>
              <strong>Outcome:</strong> Gained hands-on experience in ADAS development, from concept validation to practical vehicle testing,
              strengthening technical and analytical skills in automotive engineering.
            </p>
          </div>

          <div id="exp-2022" className="exp-item">
            <h3>2022 — Chef de Rang (Michelin-Starred Restaurant)</h3>
            <p>
              I worked in a Michelin-starred restaurant, where I learned to keep high standards in a fast-paced and demanding environment.
              I managed busy services with up to 40 covers, adapted quickly to unexpected challenges, and coordinated closely with the team,
              kitchen, and sommelier.
            </p>
            <p>
              This experience strengthened my responsibility, teamwork, and leadership skills, while teaching me to stay calm under pressure
              and provide excellent customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Separator at end of page */}
      <div style={{
        width: '100%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, #ddd, transparent)',
        margin: '3rem 0'
      }} />
    </main>
  );
}
