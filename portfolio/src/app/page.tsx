"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "./globals.css";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // === SCROLL FLUIDE ENTRE PARTIE GRISE ET LATEST PROJECT ===
  useEffect(() => {
    const NAV_H = 100; // hauteur de la navbar
    const SNAP_TOLERANCE = 60; // pour éviter les petits sauts
    let isSnapping = false;

    const onWheel = (e: WheelEvent) => {
      if (isSnapping) return;

      const latest = document.querySelector(".latest-project-section") as HTMLElement;
      if (!latest) return;

      const latestTop = latest.offsetTop;
      const target = latestTop - NAV_H; // pour que le titre soit juste sous la navbar
      const y = window.scrollY;

      // Descente
      if (e.deltaY > 0 && y < target - SNAP_TOLERANCE) {
        isSnapping = true;
        window.scrollTo({ top: target, behavior: "smooth" });
        setTimeout(() => (isSnapping = false), 600);
      }

      // Remontée
      if (e.deltaY < 0 && y > 0 && y <= target + 200) {
        isSnapping = true;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => (isSnapping = false), 600);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // === PAGE ===
  return (
    <main className="home">

      {/* === SECTION GRISE (future zone 3D) === */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="home-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              Lien LinkedIn
            </a>
            <a href="/assets/home/CORENTIN CHANTEREAU.pdf" download>
              Téléchargement CV
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              Lien GitHub
            </a>
          </div>
        </div>
      </section>

      {/* === SECTION LATEST PROJECT === */}
      <section className="latest-project-section">
        <h2 className="latest-title">LATEST PROJECT</h2>

        <div className="project-gallery">
          {/* Projet 1 */}
          <div className="project-card">
            <a href="/projects/atlas">
              <Image
                src="/assets/projects/Project_1/Project1.png"
                alt="Atlas Butterflies Project"
                width={500}
                height={350}
                className="project-img"
              />
              <h3>ATLAS BUTTERFLIES PROJECT</h3>
            </a>
          </div>

          {/* Projet 2 */}
          <div className="project-card">
            <a href="/projects/kickstarter">
              <Image
                src="/assets/projects/Project_2/Project2.png"
                alt="Kickstarter Project"
                width={500}
                height={350}
                className="project-img"
              />
              <h3>KICKSTARTER PROJECT</h3>
            </a>
          </div>
        </div>
      </section>

      {/* === BANDEAU NOIR === */}
      <section className="black-band"></section>

      {/* === BANDEAU BLANC COPYRIGHT === */}
      <footer className="footer">
        <p>© Copyright Corentin Chantereau</p>
      </footer>
    </main>
  );
}
