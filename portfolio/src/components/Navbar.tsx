"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import "../app/globals.css";
import { User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  // Close dropdowns on scroll
  const closeDropdowns = useCallback(() => {
    setAboutOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", closeDropdowns, { passive: true });
    return () => window.removeEventListener("scroll", closeDropdowns);
  }, [closeDropdowns]);

  // Close mobile menu when changing page
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="navbar">
      {/* === Left block: logo + menu === */}
      <div className="navbar-left">
        {/* Logo */}
        <Link href="/" className="logo-link">
          <h1 className="logo">CORENTIN<br />CHANTEREAU</h1>
        </Link>

        {/* Main menu (attached to name) */}
        <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          {/* About dropdown */}
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

          {/* Projects link */}
          <Link
            href="/projects"
            className={`menu-item ${pathname.startsWith("/projects") ? "active" : ""}`}
          >
            Projects
          </Link>

          {/* Other links */}
          <a
            href="/assets/home/CORENTIN CHANTEREAU.pdf"
            download="CORENTIN_CHANTEREAU_CV.pdf"
            className={`menu-item`}
          >
            Resume
          </a>

          <Link
            href="/contact"
            className={`menu-item ${pathname === "/contact" ? "active" : ""}`}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* === User icon + burger === */}
      <div className="navbar-right">
        <User
          size={24}
          className="user-icon"
          onClick={() => router.push('/utilisateur')}
          role="button"
          aria-label="User space"
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
