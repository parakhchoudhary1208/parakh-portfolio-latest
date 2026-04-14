import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Parakh Choudhary — Frontend Developer",
  description:
    "Frontend web developer with 2.5 years experience in React, Next.js, GSAP, Three.js and more. Creative, adaptable, and improvement-focused.",
  openGraph: {
    title: "Parakh Choudhary — Frontend Developer",
    description: "Creative frontend developer building immersive web experiences.",
    url: "https://parakh-portfolio.vercel.app",
  },
};

import { ThemeProvider } from "@/context/ThemeContext";
import Preloader from "@/components/Preloader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Preloader />
          <CustomCursor />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
