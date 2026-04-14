"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ExperienceSection.module.css";

gsap.registerPlugin(ScrollTrigger);

import { experiences, education } from "@/lib/data";


export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-card",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: { trigger: ".exp-card", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".edu-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".edu-item", start: "top 85%" },
        }
      );

      // Animate the timeline line
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.out",
          transformOrigin: "top",
          scrollTrigger: { trigger: ".timeline-line", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.experience} id="experience">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>
            <span className={styles.labelLine} />
            Experience
          </span>
          <h2 className={styles.heading}>
            Where I&apos;ve<br />
            <span className={styles.accent}>worked.</span>
          </h2>
        </div>

        <div className={styles.layout}>
          {/* Timeline */}
          <div className={styles.timeline}>
            <div className={`timeline-line ${styles.timelineLine}`} />

            {experiences.map((exp) => (
              <div
                key={exp.company}
                className={`exp-card ${styles.expCard}`}
                style={{ "--exp-color": exp.color } as React.CSSProperties}
              >
                <div className={styles.expDot}>
                  <div className={styles.expDotInner} />
                  {exp.current && <div className={styles.expDotPulse} />}
                </div>

                <div className={styles.expContent}>
                  <div className={styles.expHeader}>
                    <div>
                      <h3 className={styles.expRole}>{exp.role}</h3>
                      <div className={styles.expCompany}>
                        {exp.company}
                        <span className={styles.expLocation}> · {exp.location}</span>
                      </div>
                    </div>
                    <div className={styles.expPeriod}>
                      {exp.current && (
                        <span className={styles.currentBadge}>Current</span>
                      )}
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <ul className={styles.highlights}>
                    {exp.highlights.map((h, i) => (
                      <li key={i} className={styles.highlight}>
                        <span className={styles.highlightArrow}>→</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Education sidebar */}
          <div className={styles.educationPanel}>
            <h3 className={styles.eduHeading}>Education</h3>
            {education.map((edu) => (
              <div key={edu.degree} className={`edu-item ${styles.eduItem}`}>
                <div className={styles.eduDetail}>{edu.detail}</div>
                <div>
                  <div className={styles.eduDegree}>{edu.degree}</div>
                  <div className={styles.eduInstitution}>{edu.institution}</div>
                  <div className={styles.eduPeriod}>{edu.period}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
