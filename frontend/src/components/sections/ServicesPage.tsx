import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTA } from "@/components/ui/CTA";
import { PRODUCT_CATALOG } from "@/lib/productData";
import { Monitor, Wifi, ShieldCheck, CheckCircle2 } from "lucide-react";

const HARDWARE_ITEMS = PRODUCT_CATALOG.hardware.items;

const IT_CONSULTING = [
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
  return (
    <>
      <section className="bg-primary-500 text-white py-20 md:py-28">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400 mb-4">Our Services</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hardware Supply & IT<br />Networking Consulting</h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Complete hardware supply and professional IT networking consulting for the
            hospitality industry. Free consulting for new restaurants and bars.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-accent-50 flex items-center justify-center text-accent-500">
              <Monitor size={28} />
            </div>
            <div>
              <h2 className="heading-md text-primary-500">Hardware for Restaurant & Bar</h2>
              <p className="text-gray-500">Industry-standard POS terminals, servers, thermal printers, and accessories.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HARDWARE_ITEMS.map((item) => (
              <div key={item.name} className="border border-gray-200 hover:border-accent-300 transition-colors p-4 flex flex-col items-center text-center bg-white">
                <div className="w-full aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden mb-4 border border-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" loading="lazy" />
                </div>
                <h3 className="text-base font-bold text-primary-500">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted border-t border-gray-100">
        <div className="container-page">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-accent-50 flex items-center justify-center text-accent-500">
              <Wifi size={28} />
            </div>
            <div>
              <h2 className="heading-md text-primary-500">Consulting for IT Networking</h2>
              <p className="text-gray-500">Free, end-to-end IT infrastructure consulting for new & existing hospitality sites.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {IT_CONSULTING.map((item) => (
              <div key={item.name} className="card bg-white p-5 border border-gray-200">
                <div className="flex items-center gap-2 mb-2 text-accent-500">
                  <CheckCircle2 size={18} />
                  <h3 className="font-bold text-primary-500 text-sm">{item.name}</h3>
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