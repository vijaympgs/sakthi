"use client";

import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Monitor, CheckCircle2, ArrowLeft } from "lucide-react";
import { useServices, usePage } from "@/hooks/useQueries";

export function ServiceDetailClient({ slug }: { slug: string }) {
  const { data: apiServices } = useServices();
  const service = apiServices?.find((s: any) => s.slug === slug);
  const items: { title: string; description: string }[] = service?.items ?? [];

  if (!service) {
    return (
      <>
        <Navigation />
        <main id="main-content" className="bg-slate-50 min-h-screen">
          <div className="container-page py-20 text-center">
            <h1 className="text-2xl font-bold text-primary-500">Service not found</h1>
            <Link href="/services" className="btn-accent mt-6 inline-flex items-center gap-2">
              <ArrowLeft size={14} /> Back to Services
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
      <main id="main-content" className="bg-slate-50 min-h-screen">
        <Breadcrumb items={[{ label: "Services", href: "/services" }, { label: service.name }]} />

        <section className="bg-primary-500 text-white py-16 md:py-20">
          <div className="container-page">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">{service.name}</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.name}</h1>
              {service.description && (
                <p className="text-lg text-gray-300 leading-relaxed">{service.description}</p>
              )}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {items.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container-page">
              <SectionHeader
                label="What We Offer"
                title={`${service.name} Services`}
                subtitle="Comprehensive solutions tailored to your business needs."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {items.map((item: any) => (
                  <div key={item.title || item.name} className="border border-gray-200 hover:border-label/40 transition-colors p-4 flex flex-col items-center text-center bg-white group hover:-translate-y-1 transition-transform duration-200">
                    <div className="w-full aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden mb-4 border border-gray-100">
                      <div className="w-14 h-14 bg-primary-50 flex items-center justify-center text-primary-500 text-lg font-bold">
                        {(item.title || item.name).charAt(0)}
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-primary-500">{item.title || item.name}</h3>
                    {(item.description) && (
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-padding bg-surface-muted text-center">
          <div className="container-page max-w-2xl">
            <h2 className="heading-sm text-primary-500 mb-4">Need Custom Requirements?</h2>
            <p className="text-gray-500 mb-6">Contact us to discuss your specific needs and get a tailored solution.</p>
            <Link href="/contact" className="btn-primary">Contact Us</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
