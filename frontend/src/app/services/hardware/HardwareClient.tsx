"use client";

import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Monitor, CheckCircle2 } from "lucide-react";
import { useServices } from "@/hooks/useQueries";

const FALLBACK_ITEMS = [
  { title: "Server (HP ML10)", description: "Entry-level tower server for small business. 4-core Xeon, RAID support, 8GB RAM." },
  { title: "PC (DELL)", description: "Business-class desktop PC with Intel Core processor. Reliable for POS and back-office operations." },
  { title: "Posiflex 3316E", description: "All-in-one POS terminal with 15\" touch screen. Fanless design, dual display support." },
  { title: "Partnertech SP850", description: "POS terminal with Intel Atom processor, 15\" touch display, magnetic stripe reader, thermal printer port." },
  { title: "Epson POS / KOT Printers", description: "High-speed thermal receipt printers for POS billing and KOT printing. TM series with USB and Ethernet." },
  { title: "Cash Drawers", description: "Heavy-duty steel cash drawers with 4 bill/5 coin compartments. RJ11/RJ12 interface, 12V solenoid lock." },
  { title: "Thermal Rolls For Billing", description: "High quality thermal paper rolls 79mm width for POS printers. 70mm diameter." },
  { title: "7 inch TAB for KOT", description: "7 inch Android tablet for Kitchen Order Ticket display. Wall-mountable, durable, WiFi connected." },
];

export function HardwareClient() {
  const { data: apiServices } = useServices();
  const hardwareService = apiServices?.find((s: any) => s.slug === "hardware");
  const items: { title: string; description: string }[] = (hardwareService?.items?.length > 0) ? hardwareService.items : FALLBACK_ITEMS;

  return (
    <>
      <Navigation />
      <main id="main-content" className="bg-slate-50 min-h-screen">
        <Breadcrumb items={[{ label: "Services", href: "/services" }, { label: "Hardware Supply" }]} />
        
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
                  <div className="w-full h-full flex items-center justify-center text-6xl font-black text-slate-700/30">
                    HARDWARE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-page">
            <div className="flex items-center gap-4 mb-10 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 bg-slate-100 flex items-center justify-center text-slate-800">
                <Monitor size={24} />
              </div>
              <div>
                <h2 className="font-serif font-bold text-2xl text-slate-900">Hardware Catalog</h2>
                <p className="text-sm text-gray-500">Fully compatible with all standard POS platforms and local server configurations.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item: any) => (
                <div key={item.title} className="border border-gray-100 p-5 flex flex-col bg-white group hover:border-[#B89A4A] transition-all duration-300">
                  <div className="w-16 h-16 bg-slate-100 flex items-center justify-center text-slate-700 text-xl font-bold mb-4 mx-auto">
                    {item.title.charAt(0)}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 text-center">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 text-center">{item.description}</p>
                  <div className="mt-auto flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <CheckCircle2 size={12} className="text-[#B89A4A]" />
                    <span>In Stock &amp; Supported</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
