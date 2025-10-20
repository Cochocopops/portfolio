"use client";

export default function ClientMenu() {
  const toggleMenu = () => {
    const navLinks = document.querySelector(".nav-links");
    const hamburger = document.querySelector(".hamburger");
    navLinks?.classList.toggle("active");
    hamburger?.classList.toggle("open");
  };
  return (
    <div className="hamburger" onClick={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
