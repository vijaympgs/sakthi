import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Wifi, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Consulting for IT Networking - Sakthi Solutions",
  description: "Professional IT network architecture, WiFi mapping, and UPS consulting for restaurants, cafes, and hospitality setups.",
};

const IT_CONSULTING_STEPS = [
  { name: "Free Professional Consulting", description: "Offered at zero cost for new restaurants, cafes, and bars to plan their tech infrastructure." },
  { name: "Multi-Floor Network Architecture", description: "Tailored cable laying, network switch racking, and router sizing based on layout and node count." },
  { name: "WiFi Site Survey & AP Selection", description: "Determining precise access point counts for uninterrupted mobile/tablet order taking via KOT." },
  { name: "Online UPS Power Backup", description: "Guaranteed power breakdown-free daily operations, seamlessly bridging generator switchovers." },
  { name: "Server & Node Sizing", description: "Right-sizing local servers, admin workstations, and POS nodes based on transactions volume." },
  { name: "Kitchen & Bar Printers", description: "Selection of water-proof POS billing machines and spill-proof thermal receipt printers." },
  { name: "Digital Signage & Menu Displays", description: "Heavy-duty ad media players and wall-mounted menu displays for signature dishes promotions." },
  { name: "Restaurant Chain Solutions", description: "End-to-end scalable hardware, software and consulting for multi-outlet restaurant chains." },
];

export default function ITNetworkingServicePage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="bg-slate-50 min-h-screen">
        <Breadcrumb items={[{ label: "Services", href: "/services" }, { label: "IT Networking" }]} />
        
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden border-b border-[#B89A4A]/30">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E4C36A] mb-4">Hospitality Networks</p>
                <h1 className="text-4xl md:text-5xl font-serif font-black mb-6">Consulting for IT &amp; Networking</h1>
                <p className="text-sm md:text-base text-gray-300 max-w-xl leading-relaxed">
                  We design custom network layouts, wireless coverage plans, and server systems tailored to high-traffic restaurant operations. Our site consultations are free of charge.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="aspect-[4/3] bg-slate-950/80 border border-gray-800 overflow-hidden">
                  <img
                    src="https://sakthisolutions.in/sakthisolutions/uploads/2018/05/IT-Networking.png"
                    alt="IT Networking consulting illustration"
                    className="w-full h-full object-contain p-4 opacity-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consulting Steps Section */}
        <section className="section-padding bg-white">
          <div className="container-page">
            <div className="flex items-center gap-4 mb-10 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 bg-slate-100 flex items-center justify-center text-slate-800">
                <Wifi size={24} />
              </div>
              <div>
                <h2 className="font-serif font-bold text-2xl text-slate-900">Our Consulting Domain Pillars</h2>
                <p className="text-sm text-gray-500">Proactive design solutions to prevent hardware conflicts and order delays.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {IT_CONSULTING_STEPS.map((item) => (
                <div key={item.name} className="border border-gray-100 p-5 bg-white group hover:border-[#B89A4A] transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3 text-[#B89A4A]">
                    <CheckCircle2 size={16} />
                    <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlight Section */}
        <section className="section-padding bg-slate-50 border-t border-gray-100">
          <div className="container-page">
            <div className="bg-white border border-gray-200 p-6 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 shadow-sm">
              <div className="w-full md:w-1/2 aspect-[16/9] bg-slate-50 border border-gray-100 overflow-hidden shrink-0">
                <img
                  src="https://sakthisolutions.in/sakthisolutions/uploads/2018/05/IT-Networking.png"
                  alt="IT Consulting architecture representation"
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Why Consulting Comes First</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  A weak wireless network causes dropouts during order taking via handheld KOT tablets, which directly leads to slow service. We calculate wireless switch capacities, UPS switch periods, and drop mapping before you buy a single cable.
                </p>
                <Link href="/contact" className="btn-primary text-sm inline-block">
                  Request site consultation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
