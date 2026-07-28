"use client";

import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Building, ArrowLeft } from "lucide-react";
import { useIndustries } from "@/hooks/useQueries";

export function IndustryDetailClient({ slug }: { slug: string }) {
  const { data: apiIndustries } = useIndustries();
  const industries: any[] = apiIndustries ?? [];
  const industry = industries.find((i: any) => i.slug === slug);

  if (!industry) {
    return (
      <>
        <Navigation />
        <main id="main-content">
          <div className="container-page py-20 text-center">
            <h1 className="text-2xl font-bold text-primary-500">Industry not found</h1>
            <Link href="/" className="btn-accent mt-6 inline-flex items-center gap-2">
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main id="main-content">
        <Breadcrumb items={[{ label: "Industries", href: "/industries" }, { label: industry.name }]} />
        <section className="bg-primary-500 text-white py-20 md:py-28">
          <div className="container-page">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">Industry</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{industry.name}</h1>
              {industry.description && (
                <p className="text-lg text-gray-300 leading-relaxed">{industry.description}</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
