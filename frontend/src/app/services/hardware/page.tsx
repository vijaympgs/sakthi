import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Monitor, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hardware for Restaurant & Bar - Sakthi Solutions",
  description: "Industry-standard POS terminals, servers, thermal printers, and accessories custom-supplied for restaurants, bars, and retail outlets.",
};

const HARDWARE_ITEMS = [
  { name: "Server (HP ML10)", image: "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/H1-300x206.jpg", spec: "Tower server, 4-core, enterprise RAID support for secure database storage" },
  { name: "PC (DELL)", image: "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/d1.jpg", spec: "High-reliability business desktop workstation, i5/i7 options" },
  { name: "Posiflex: 3316E", image: "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/d3.jpg", spec: "Heavy-duty fanless touch-screen POS terminal with water-resistant bezel" },
  { name: "Partnertech - SP850", image: "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/d4.jpg", spec: "Premium all-in-one POS billing terminal with robust dual-hinge stand" },
  { name: "Epson POS & KOT Printers", image: "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/d5.jpg", spec: "Industry standard LAN/USB thermal receipt printers with auto-cutter" },
  { name: "Citizen Billing Printers", image: "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/d7.jpg", spec: "Spill-proof front-exit billing printers for kitchen and bar counters" },
];

export default function HardwareServicePage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="bg-slate-50 min-h-screen">
        <Breadcrumb items={[{ label: "Services", href: "/services" }, { label: "Hardware Supply" }]} />
        
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden border-b border-[#B89A4A]/30">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E4C36A] mb-4">Enterprise Hardware</p>
                <h1 className="text-4xl md:text-5xl font-serif font-black mb-6">Hardware Supply for Restaurant &amp; Bar</h1>
                <p className="text-sm md:text-base text-gray-300 max-w-xl leading-relaxed">
                  We supply and install hospitality-grade hardware, including POS terminals, industrial servers, thermal printers, and electronic cash registers built for intense daily hospitality operations.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="aspect-[4/3] bg-slate-950/80 border border-gray-800 overflow-hidden">
                  <img
                    src="https://sakthisolutions.in/sakthisolutions/uploads/2018/05/H1.jpg"
                    alt="POS Hardware supply"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section className="section-padding bg-white">
          <div className="container-page">
            <div className="flex items-center gap-4 mb-10 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 bg-slate-100 flex items-center justify-center text-slate-800">
                <Monitor size={24} />
              </div>
              <div>
                <h2 className="font-serif font-bold text-2xl text-slate-900">Hardware Catalog Showcase</h2>
                <p className="text-sm text-gray-500">Fully compatible with all standard POS platforms and local server configurations.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {HARDWARE_ITEMS.map((item) => (
                <div key={item.name} className="border border-gray-100 p-5 flex flex-col bg-white group hover:border-[#B89A4A] transition-all duration-300">
                  <div className="w-full aspect-[4/3] bg-slate-50 flex items-center justify-center overflow-hidden mb-5 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{item.spec}</p>
                  <div className="mt-auto flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <CheckCircle2 size={12} className="text-[#B89A4A]" />
                    <span>In Stock &amp; Supported</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-slate-50 border-t border-gray-100">
          <div className="container-page text-center max-w-2xl">
            <h2 className="font-serif font-bold text-2xl text-slate-900 mb-4">Request Hardware Pricing</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Are you planning a new outlet setup or a POS hardware upgrade? Contact our product specialists for bulk pricing and deployment assistance.
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Get pricing quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
