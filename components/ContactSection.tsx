"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ContactSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".contact-link",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".contact-link", start: "top 85%" },
        }
      );

      // Magnetic effect on the big email
      const email = document.querySelector(`.${styles.bigEmail}`) as HTMLElement;
      if (email) {
        email.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = email.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(email, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.4,
            ease: "power2.out",
          });
        });
        email.addEventListener("mouseleave", () => {
          gsap.to(email, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.contact} id="contact">
      <div className={styles.container}>
        <span className={styles.label}>
          <span className={styles.labelLine} />
          Contact
        </span>

        <h2 ref={headingRef} className={styles.heading}>
          Let's build<br />
          something<br />
          <span className={styles.accent}>extraordinary.</span>
        </h2>

        <p className={styles.sub}>
          Open to freelance projects, full-time roles, and interesting collaborations.
          <br />
          Don't be a stranger — reach out.
        </p>

        <a
          href="mailto:parakhchoudhary1999@gmail.com"
          className={styles.bigEmail}
        >
          parakhchoudhary1999@gmail.com
        </a>

        <div className={styles.socialRow}>
          {[
            { label: "GitHub", url: "https://github.com/parakhchoudhary1208" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/parakh-choudhary-a6ba81175/" },
            { label: "Resume", url: "https://docs.google.com/document/d/1qdMQ_h7lDp47j-9CXdEuPUO5GGVzABDO/edit?usp=sharing&ouid=103542264057806267282&rtpof=true&sd=true" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`contact-link ${styles.socialLink}`}
            >
              {s.label}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H5M9.5 2.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </div>

        <div className={styles.phone}>
          <span className={styles.phoneLabel}>Also reachable at</span>
          <a href="tel:+917389546668" className={styles.phoneNum}>+91 7389546668</a>
        </div>
      </div>

      {/* Large decorative text */}
      <div className={styles.decorText} aria-hidden="true">
        HELLO
      </div>
    </section>
  );
}
