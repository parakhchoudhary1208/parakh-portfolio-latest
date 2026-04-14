import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.logo}>PC<span className={styles.logoDot} /></span>
          <span className={styles.copy}>
            © {year} Parakh Choudhary. Crafted with Next.js, Tailwind, GSAP & Framer Motion.
          </span>
        </div>

        <div className={styles.right}>
          <span className={styles.status}>
            <span className={styles.statusDot} />
            Available for work
          </span>
        </div>
      </div>
    </footer>
  );
}
