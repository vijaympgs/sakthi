import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ProductsPage } from "@/components/sections/ProductsPage";

export const metadata: Metadata = {
  title: "Products - Sakthi Solutions | Digital Signage, Kiosks, Feedback & Play Equipment",
  description: "Explore Godspeed digital signage, Smart Touch Tables, Wayfinding Kiosks, Touch Screen Kiosks, Video Walls, Tellus feedback solutions and Childwood children's play equipment.",
};

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <ProductsPage />
      </main>
      <Footer />
    </>
  );
}