"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import dynamic from "next/dynamic";
import styles from "./HeroSection.module.css";
import { experiences, calculateTotalExperience } from "@/lib/data";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), { ssr: false });

gsap.registerPlugin(SplitText);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Heading split text animation
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, { type: "chars,words" });
        tl.fromTo(
          split.chars,
          { opacity: 0, y: 80, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.025,
          },
          "-=0.4"
        );
      }

      // Subtext
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.4"
      );

      // Line
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power4.inOut", transformOrigin: "left" },
        "-=0.6"
      );

      // CTAs
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );

      // Scroll float indicator
      gsap.to(".scroll-indicator", {
        y: 12,
        duration: 1.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      <ThreeBackground />

      {/* Gradient radials */}
      <div className={styles.radial1} />
      <div className={styles.radial2} />

      <div className={styles.content}>
        <div ref={badgeRef} className={styles.badge}>
          <span className={styles.dot} />
          <span>Available for freelance & full-time</span>
        </div>

        <h1 ref={headingRef} className={styles.heading}>
          Parakh<br />
          <span className={styles.accent}>Choudhary</span>
        </h1>

        <div ref={lineRef} className={styles.line} />

        <p ref={subRef} className={styles.sub}>
          Frontend Engineer crafting immersive digital experiences
          <br />
          <span className={styles.highlight}>Next.js</span>,{" "}
          with <span className={styles.highlight}>Tailwind</span>,{" "}
          <span className={styles.highlight}>GSAP</span> &amp;{" "}
          <span className={styles.highlight}>Framer Motion</span>
        </p>

        <div ref={ctaRef} className={styles.ctas}>
          <a href="#work" className={styles.btnPrimary}>
            View My Work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="mailto:parakhchoudhary1999@gmail.com"
            className={styles.btnSecondary}
          >
            Let's Talk
          </a>
        </div>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <span className={styles.metaNum}>{calculateTotalExperience()}</span> Yrs Exp
          </span>
          <span className={styles.metaDivider} />
          <span className={styles.metaItem}>
            <span className={styles.metaNum}>15+</span> Projects
          </span>
          <span className={styles.metaDivider} />
          <span className={styles.metaItem}>
            <span className={styles.metaNum}>{experiences.length}</span> Companies
          </span>
        </div>
      </div>

      <div className="scroll-indicator" style={{
        position: "absolute",
        bottom: "2.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        color: "var(--text-muted)",
        fontSize: "0.7rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        fontFamily: "var(--font-mono)",
        zIndex: 5,
      }}>
        <span>Scroll</span>
        <svg width="1" height="40" viewBox="0 0 1 40">
          <line x1="0.5" y1="0" x2="0.5" y2="40" stroke="var(--accent)" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
}
