"use client";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTA } from "@/components/ui/CTA";
import { ArrowRight } from "lucide-react";
import { useServices, usePage } from "@/hooks/useQueries";

export function ServicesPage() {
  const { data: apiServices } = useServices();
  const { data: servicesPage } = usePage("services");
  const services: any[] = apiServices ?? [];
  const heroSection = servicesPage?.sections?.find((s: any) => s.section_type === "hero");

  if (!services.length) {
    return (
      <>
        <section className="bg-primary-500 text-white py-20 md:py-28">
          <div className="container-page text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{servicesPage?.title || "Services"}</h1>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-primary-500 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">{servicesPage?.hero_title || ""}</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{servicesPage?.title || ""}</h1>
              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                {heroSection?.content || servicesPage?.meta_description || ""}
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-[4/3] bg-primary-600 border border-gray-700/50 overflow-hidden">
                <img
                  src={servicesPage?.hero_image || ""}
                  alt=""
                  className="w-full h-full object-contain p-6 opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {services.map((service: any, idx: number) => {
        const items: any[] = service?.items ?? [];
        return (
          <section key={service.slug} className={`section-padding ${idx % 2 === 0 ? "bg-white" : "bg-surface-muted border-t border-gray-100"}`}>
            <div className="container-page">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-primary-50 flex items-center justify-center text-primary-500">
                  <span className="text-xl font-bold">{service.name?.charAt(0) || "S"}</span>
                </div>
                <div>
                  <h2 className="heading-md text-primary-500">{service.name}</h2>
                  {service.description && (
                    <p className="text-gray-500 text-sm">{service.description}</p>
                  )}
                </div>
              </div>

              {items.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item: any) => (
                    <div key={item.title || item.name} className="border border-gray-200 hover:border-label/40 transition-colors p-4 flex flex-col items-center text-center bg-white group hover:-translate-y-1 transition-transform duration-200">
                      <div className="w-full aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden mb-4 border border-gray-100">
                        <div className="w-14 h-14 bg-primary-50 flex items-center justify-center text-primary-500 text-lg font-bold">
                          {(item.title || item.name || "").charAt(0)}
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-primary-500">{item.title || item.name}</h3>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 text-center">
                <Link
                  href={`/services/${service.slug}`}
                  className="btn-accent text-sm inline-flex items-center gap-2"
                >
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <CTA
        title="Need Custom Solutions?"
        subtitle="Contact us to discuss your requirements and get a tailored solution."
        primaryHref="/contact"
      />
    </>
  );
}