"use client";

import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ArrowLeft } from "lucide-react";

export function SolutionDetailClient({ slug }: { slug: string }) {
  // Placeholder: solutions can be expanded when backend provides solution detail API
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Breadcrumb items={[{ label: "Solutions", href: "/solutions" }, { label: slug }]} />
        <section className="bg-primary-500 text-white py-20 md:py-28">
          <div className="container-page">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</h1>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
