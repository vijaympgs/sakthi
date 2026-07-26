import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ContactPage } from "@/components/sections/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us - Sakthi Solutions | Digital Signage, Kiosks & IT Solutions",
  description: "Contact Sakthi Solutions for digital signage, interactive kiosks, Tellus feedback solutions, Childwood play equipment and IT networking consulting. Chennai-based with pan-India service.",
};

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}