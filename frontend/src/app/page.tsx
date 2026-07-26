import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/components/sections/HomePage";

export const metadata: Metadata = {
  title: "Sakthi Solutions - Digital Signage, Kiosks & IT Solutions",
  description: "Sakthi Solutions provides digital signage, interactive kiosks, feedback solutions and IT consulting for hospitality, retail and corporate sectors. Godspeed Digital Signage, Tellus Feedback, Childwood and more.",
};

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HomePage />
      </main>
      <Footer />
    </>
  );
}