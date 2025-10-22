"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "../app/globals.css";
import { User } from "lucide-react"; // ✅ icône utilisateur

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  // Fermer les dropdowns au scroll
  useEffect(() => {
    const closeDropdowns = () => {
      setAboutOpen(false);
      setProjectsOpen(false);
    };
    window.addEventListener("scroll", closeDropdowns);
    return () => window.removeEventListener("scroll", closeDropdowns);
  }, []);

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="navbar">
      {/* === Bloc gauche : logo + menu === */}
      <div className="navbar-left">
        {/* Logo */}
        <Link href="/" className="logo-link">
          <h1 className="logo">CORENTIN<br />CHANTEREAU</h1>
        </Link>

        {/* Menu principal (collé au nom) */}
        <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          {/* ABOUT */}
          <div
            className="about-dropdown"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <Link
              href="/about"
              className={`menu-link ${pathname.startsWith("/about") ? "active" : ""}`}
            >
              About
            </Link>

            <div className={`dropdown-menu ${aboutOpen ? "show" : ""}`}>
              <Link href="/about#education">Education</Link>
              <Link href="/about#experience">Experience</Link>
            </div>
          </div>

          {/* PROJECTS */}
          <div
            className="projects-dropdown"
            onMouseEnter={() => setProjectsOpen(true)}
            onMouseLeave={() => setProjectsOpen(false)}
          >
            <Link
              href="/projects"
              className={`menu-link ${pathname.startsWith("/projects") ? "active" : ""}`}
            >
              Projects
            </Link>

            <div className={`dropdown-menu ${projectsOpen ? "show" : ""}`}>
              <Link href="/projects">All</Link>
              <Link href="/projects/latest">Latest Project</Link>
              <Link href="/projects/academic">Academic / Research</Link>
              <Link href="/projects/startup">Startup / Entrepreneurship</Link>
            </div>
          </div>

          {/* AUTRES LIENS */}
          <Link
            href="/resume"
            className={`menu-item ${pathname === "/resume" ? "active" : ""}`}
          >
            Resume
          </Link>

          <Link
            href="/contact"
            className={`menu-item ${pathname === "/contact" ? "active" : ""}`}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* === Icône utilisateur + burger === */}
      <div className="navbar-right">
        <User
          size={24}
          className="user-icon"
          onClick={() => router.push('/utilisateur')}
          role="button"
          aria-label="Espace utilisateur"
        />

        <div
          className={`burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
