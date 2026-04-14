"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const [percent, setPercent] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Percentage counter logic
    const duration = 2.5; // seconds
    const interval = 20; // ms
    const steps = (duration * 1000) / interval;
    const increment = 100 / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        setPercent(100);
        clearInterval(timer);
        exitAnimation();
      } else {
        setPercent(Math.floor(current));
      }
    }, interval);

    const exitAnimation = () => {
      const tl = gsap.timeline();
      tl.to(counterRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.2
      })
      .to(preloaderRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.2,
        ease: "power4.inOut",
      }, "-=0.4")
      .set(preloaderRef.current, { display: "none" });
    };

    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={preloaderRef} className={styles.preloader}>
      <div className={styles.container}>
        <div ref={counterRef} className={styles.counter}>
          <span className={styles.number}>{percent}%</span>
          <div className={styles.bar}>
            <div className={styles.progress} style={{ width: `${percent}%` }} />
          </div>
          <p className={styles.text}>Innovating Digital Experiences</p>
        </div>
      </div>
    </div>
  );
}
