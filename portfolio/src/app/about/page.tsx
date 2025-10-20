"use client";
import "./about.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function About() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const [activeSection, setActiveSection] = useState("education");

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

        <div className="separator">//</div>

      </section>

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
              <li>Product design and artisanal manufacturing</li>
              <li>Project management, budgeting, and production</li>
              <li>+30 customers, €1,000 raised</li>
            </ul>
          </div>

          <div id="exp-2025-artist" className="exp-item">
            <h3>
              2025 — Engineer & Artistic Collaborator,{" "}
              <Link href="/projects/atlas-butterflies">Atlas Butterflies Project</Link>
            </h3>
            <p>
              Designed and prototyped mechanical–electronic structures for an art installation (2026).
            </p>
            <ul>
              <li>Integrated electronics, structure design, testing, and documentation</li>
              <li>Delivered a functional prototype for the exhibition</li>
            </ul>
          </div>

          <div id="exp-2023" className="exp-item">
            <h3>2023 — R&D Intern, ADAS Systems</h3>
            <p>
              Worked on feasibility and testing for driver assistance systems in automotive development.
            </p>
          </div>

          <div id="exp-2022" className="exp-item">
            <h3>2022 — Chef de Rang (Michelin-Starred Restaurant)</h3>
            <p>
              Managed up to 40 covers, ensuring coordination, quality, and stress management.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
