"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WorkSection.module.css";

gsap.registerPlugin(ScrollTrigger);

import { projects } from "@/lib/data";

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-row",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".project-row", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.work} id="work">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>
            <span className={styles.labelLine} />
            Selected Work
          </span>
          <h2 className={styles.heading}>
            Projects that<br />
            <span className={styles.accent}>ship.</span>
          </h2>
        </div>

        <div className={styles.projectList}>
          {projects.map((project, i) => (
            <div
              key={project.num}
              className={`project-row ${styles.projectRow} ${
                activeProject === i ? styles.active : ""
              }`}
              onMouseEnter={() => setActiveProject(i)}
              onMouseLeave={() => setActiveProject(null)}
              style={{ "--proj-color": project.color } as React.CSSProperties}
            >
              <div className={styles.projectNum}>{project.num}</div>

              <div className={styles.projectInfo}>
                <div className={styles.projectMeta}>
                  <div className={styles.projectTitleRow}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <span className={styles.projectCompany}>@ {project.company}</span>
                  </div>
                  <span className={styles.projectCategory}>{project.category}</span>
                </div>

                <div className={styles.projectDesc}>
                  <p>{project.desc}</p>
                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
                aria-label={`View ${project.title}`}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 16L16 4M16 4H8M16 4V12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
