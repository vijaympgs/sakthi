import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { AboutPage } from "@/components/sections/AboutPage";

export const metadata: Metadata = {
  title: "About Us - Sakthi Solutions | Digital Signage & IT Consulting Since 2014",
  description: "Founded in 2014 by Jayakumar and Vidya Rani. Sakthi Solutions provides end-to-end IT consulting, Godspeed digital signage, feedback solutions and play equipment for hospitality, retail and corporate sectors.",
};

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <AboutPage />
      </main>
      <Footer />
    </>
  );
}