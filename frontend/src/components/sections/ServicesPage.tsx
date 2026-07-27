"use client";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTA } from "@/components/ui/CTA";
import { Monitor, Wifi, CheckCircle2 } from "lucide-react";
import { useServices, usePage } from "@/hooks/useQueries";

const FALLBACK_CONSULTING = [
  { name: "Free Professional Consulting", description: "Offered at zero cost for new restaurants, cafes, and bars to plan their tech infrastructure." },
  { name: "Multi-Floor Network Architecture", description: "Tailored cable laying, network switch racking, and router sizing based on layout and node count." },
  { name: "WiFi Site Survey & AP Selection", description: "Determining precise access point counts for uninterrupted mobile/tablet order taking via KOT." },
  { name: "Online UPS Power Backup", description: "Guaranteed power breakdown-free daily operations, seamlessly bridging generator switchovers." },
  { name: "Server & Node Sizing", description: "Right-sizing HP ML10 servers, DELL workstations, and POS nodes based on transaction volume." },
  { name: "Kitchen & Bar Printers", description: "Selection of water-proof POS machines and spill-proof thermal printers (Epson TM-T82 II, M30)." },
  { name: "Digital Signage & Menu Displays", description: "Heavy-duty ad players and wall-mounted menu displays for in-house dish and offer promotions." },
  { name: "Restaurant Chain Solutions", description: "End-to-end scalable hardware, software and consulting for multi-outlet restaurant chains." },
];

export function ServicesPage() {
  const { data: apiServices } = useServices();
  const { data: servicesPage } = usePage("services");
  const hardwareService = apiServices?.find((s: any) => s.slug === "hardware");
  const consultingService = apiServices?.find((s: any) => s.slug === "it-networking");
  const hardwareItems: any[] = hardwareService?.items ?? [];
  const consultingItems: any[] = consultingService?.items ?? FALLBACK_CONSULTING;
  const heroSection = servicesPage?.sections?.find((s: any) => s.section_type === "hero");
  return (
    <>
      <section className="bg-primary-500 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">{servicesPage?.hero_title || "Our Services"}</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{servicesPage?.title || "Hardware Supply & IT Networking Consulting"}</h1>
              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                {heroSection?.content || servicesPage?.meta_description || "Complete hardware supply and professional IT networking consulting for the hospitality industry. Free consulting for new restaurants and bars."}
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-[4/3] bg-primary-600 border border-gray-700/50 overflow-hidden">
                <img
                  src={servicesPage?.hero_image || "/assets/products/IT-Networking.png"}
                  alt="IT Networking Consulting"
                  className="w-full h-full object-contain p-6 opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-primary-50 flex items-center justify-center text-primary-500">
              <Monitor size={28} />
            </div>
            <div>
              <h2 className="heading-md text-primary-500">Hardware for Restaurant & Bar</h2>
              <p className="text-gray-500">Industry-standard POS terminals, servers, thermal printers, and accessories.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hardwareItems.map((item: any) => (
              <div key={item.title} className="border border-gray-200 hover:border-label/40 transition-colors p-4 flex flex-col items-center text-center bg-white group hover:-translate-y-1 transition-transform duration-200">
                <div className="w-full aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden mb-4 border border-gray-100">
                  <div className="w-14 h-14 bg-primary-50 flex items-center justify-center text-primary-500 text-lg font-bold">
                    {item.title.charAt(0)}
                  </div>
                </div>
                <h3 className="text-base font-bold text-primary-500">{item.title}</h3>
                {item.description && (
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted border-t border-gray-100">
        <div className="container-page">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-primary-50 flex items-center justify-center text-primary-500">
              <Wifi size={28} />
            </div>
            <div>
              <h2 className="heading-md text-primary-500">Consulting for IT Networking</h2>
              <p className="text-gray-500">Free, end-to-end IT infrastructure consulting for new & existing hospitality sites.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {consultingItems.map((item: any) => (
              <div key={item.name || item.title} className="card bg-white p-5 border border-gray-200 group hover:-translate-y-1 transition-transform duration-200">
                <div className="flex items-center gap-2 mb-2 text-label">
                  <CheckCircle2 size={18} />
                  <h3 className="font-bold text-primary-500 text-sm">{item.name || item.title}</h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 p-6 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 aspect-[16/9] bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
              <img
                src="/assets/products/IT-Networking.png"
                alt="IT Networking Consulting"
                className="w-full h-full object-contain p-2"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary-500 mb-3">Why Get IT Consulting from Sakthi?</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                We eliminate costly trial-and-error by designing your network layout, WiFi access points, online UPS power protection, and hardware sizing before installation begins.
              </p>
              <Link href="/contact" className="btn-accent text-sm inline-flex items-center gap-2">
                Request Free Site Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Need Hardware or IT Consulting?"
        subtitle="We provide professional consulting at no cost for new restaurants and bars. Contact us to discuss your requirements."
        primaryLabel="Get Free Consulting"
        primaryHref="/contact"
      />
    </>
  );
}