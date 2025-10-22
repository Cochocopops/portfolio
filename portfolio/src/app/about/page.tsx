"use client";
import "./about.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function About() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 120; // compense le sticky
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const [activeSection, setActiveSection] = useState("education");
  const [eduMenuOpen, setEduMenuOpen] = useState(false);
  const [expMenuOpen, setExpMenuOpen] = useState(false);

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

  return (
    <main className="about-page">
      {/* Section Intro */}
      <section className="about-intro">
        <h1>CORENTIN CHANTEREAU</h1> 

        <div className="separator">//</div>

        <p>
          Currently pursuing an MSc in Creative Technology Engineering at ESILV Paris, I design and develop impact-driven projects
          combining electronics, mechanics, product design, programming, and entrepreneurship. I have a particular interest in hands-on,
          modular projects, where ideas quickly evolve into functional prototypes, especially during hackathons or personal projects
          (detection systems, connected objects, high-voltage devices, etc.).
        </p>
        <p>
          I also enjoy larger-scale projects, particularly in industrial environments such as automotive or aerospace, where teamwork,
          coordination, and rigor are key to success.
        </p>
        <p>
         My background has allowed me to explore a variety of domains: embedded systems, biomaterials, artisanal manufacturing,
         low-tech design, lightweight AI, and more. I like to be fully involved in a project, managing all aspects, from conception to
         presentation while continuously learning along the way. 
        </p>
        <p>
         I am currently seeking a 20-week final-year internship from February 2 to June 19, 2026, and I am also open to short-term
         collaborations or international projects. Feel free to reach out if you have an opportunity or simply want to discuss innovative
         projects!
        </p>
      </section>

      {/* Séparateur avant Education */}
      <div className="separator">//</div>

      {/* Section Education */}
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

      <div className="separator">//</div>

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

      {/* Séparateur fin de page */}
      <div className="separator">//</div>
    </main>
  );
}
