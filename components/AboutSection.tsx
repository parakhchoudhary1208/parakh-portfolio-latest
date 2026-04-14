"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutSection.module.css";

gsap.registerPlugin(ScrollTrigger);

import { calculateTotalExperience } from "@/lib/data";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const totalExp = calculateTotalExperience();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-label",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-label", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".about-heading",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".about-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".about-text",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".about-text", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".about-stat",
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
          stagger: 0.1,
          scrollTrigger: { trigger: ".about-stat", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.about} id="about">
      <div className={styles.grid}>
        <div className={styles.left}>
          <span className={`about-label ${styles.label}`}>
            <span className={styles.labelLine} />
            About Me
          </span>

          <h2 className={`about-heading ${styles.heading}`}>
            Building the web<br />
            one pixel at<br />
            <em>a time.</em>
          </h2>

          <div className={styles.stats}>
            {[
              { num: totalExp, unit: "Years", desc: "of experience" },
              { num: "15+", unit: "Projects", desc: "delivered live" },
              { num: "1", unit: "Award", desc: "Kyoorius nomination" },
            ].map((s) => (
              <div key={s.num} className={`about-stat ${styles.stat}`}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statUnit}>{s.unit}</span>
                <span className={styles.statDesc}>{s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <p className={`about-text ${styles.body}`}>
            I'm a frontend developer with a passion for crafting immersive,
            performant web experiences. With {totalExp} years of industry experience,
            I've shipped production-grade applications across diverse sectors —
            from defense & drones to fintech & creative agencies.
          </p>

          <p className={`about-text ${styles.body}`}>
            Currently working as a <strong>Junior Frontend Developer</strong> at{" "}
            <a
              href="https://stuvio.digital"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Stuvio Digital Pvt. Ltd.
            </a>
            , Navi Mumbai. Previously at{" "}
            <a
              href="https://pixel6.co"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Pixel6 Web Studio
            </a>
            , Pune, where my work on RRP Drones was submitted for the{" "}
            <strong>Kyoorius Creative Awards</strong>.
          </p>

          <p className={`about-text ${styles.body}`}>
            I hold a B.Tech in Computer Science from IPS Academy, Indore (7.2 CGPA).
            I thrive at the intersection of design and engineering — sweating over
            animations, accessibility, and that last 1% of polish.
          </p>

          <div className={styles.links}>
            <a
              href="https://github.com/parakhchoudhary1208"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/parakh-choudhary-a6ba81175/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              LinkedIn ↗
            </a>
            <a
              href="https://docs.google.com/document/d/1qdMQ_h7lDp47j-9CXdEuPUO5GGVzABDO/edit?usp=sharing&ouid=103542264057806267282&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              Resume ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
