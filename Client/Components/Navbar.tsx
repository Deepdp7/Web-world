import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoImg from "../logo/image.png";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/employees" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`navbar glass ${isScrolled ? "scrolled" : ""}`}>
      <div className="container nav-content">
        <a href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
          <img src={logoImg} alt="Waveworld Logo" style={{ height: '32px', width: 'auto' }} />
          Wave<span>world</span>
        </a>

        {/* Desktop Menu */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.href.startsWith("/") ? (
                <Link to={link.href}>{link.name}</Link>
              ) : (
                <a href={link.href}>{link.name}</a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <div
          className={`mobile-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu glass ${isMenuOpen ? "active" : ""}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.href.startsWith("/") ? (
                <Link to={link.href} onClick={() => setIsMenuOpen(false)}>
                  {link.name}
                </Link>
              ) : (
                <a href={link.href} onClick={() => setIsMenuOpen(false)}>
                  {link.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
