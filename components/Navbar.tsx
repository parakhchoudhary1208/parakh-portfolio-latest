"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme, BackgroundTheme } from "@/context/ThemeContext";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 2.5 }
    );

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menuOverlayRef.current, {
        clipPath: "circle(150% at calc(100% - 50px) 50px)",
        duration: 1.2,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        `.${styles.mobileLink}`,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.4 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menuOverlayRef.current, {
        clipPath: "circle(0% at calc(100% - 50px) 50px)",
        duration: 1,
        ease: "power4.inOut",
      });
    }
  }, [isMenuOpen]);

  const themes: BackgroundTheme[] = ["default", "fluid", "flux"];

  return (
    <>
      <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <a href="#" className={styles.logo}>
          <span className={styles.logoText}>PC</span>
          <span className={styles.logoDot} />
        </a>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={styles.link}>
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.navRight}>
          {/* Desktop Theme Switcher */}
          <div className={styles.desktopTheme}>
            <div className={styles.themeSwitcher}>
              {themes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`${styles.themeBtn} ${theme === t ? styles.active : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button 
            className={`${styles.menuToggle} ${isMenuOpen ? styles.isOpen : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div ref={menuOverlayRef} className={styles.menuOverlay}>
        <div className={styles.menuContent}>
          <ul className={styles.mobileLinks}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a 
                  href={link.href} 
                  className={styles.mobileLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.mobileThemeWrapper}>
            <span className={styles.menuLabel}>Switch Theme</span>
            <div className={styles.themeSwitcher}>
              {themes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`${styles.themeBtn} ${theme === t ? styles.active : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
