import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PlaystationsGalleryClient } from "./PlaystationsGalleryClient";

export const metadata: Metadata = {
  title: "Playstations Gallery - Sakthi Solutions | Childwood Play Equipment",
  description: "Browse our gallery of Childwood children's play equipment. Outdoor playstations, spring rockers, swings, indoor playstations, rideons, tunnels, slides and floorings.",
};

export default function PlaystationsGalleryPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="bg-slate-50 min-h-screen">
        <Breadcrumb items={[{ label: "Playstations Gallery" }]} />

        <section className="bg-slate-900 text-white py-16 md:py-20 border-b border-[#B89A4A]/30">
          <div className="container-page">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E4C36A] mb-4">Visual Gallery</p>
            <h1 className="text-4xl md:text-5xl font-serif font-black mb-6">Playstations Gallery</h1>
            <p className="text-sm md:text-base text-gray-300 max-w-3xl leading-relaxed">
              Product photos and configuration specifications of Childwood children&apos;s play equipment. Explore our range of outdoor and indoor play structures serving schools, parks, residential communities, and commercial zones.
            </p>
          </div>
        </section>

        <PlaystationsGalleryClient />
      </main>
      <Footer />
    </>
  );
}
