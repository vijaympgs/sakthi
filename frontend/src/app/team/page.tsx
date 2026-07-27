import type { Metadata } from "next";
import { TeamSection } from "@/components/sections/TeamSection";

export const metadata: Metadata = {
  title: "Our Team | Sakthi Solutions",
  description:
    "Meet the certified professionals behind Sakthi Solutions — experts in hospitality IT, digital signage, interactive kiosks, and enterprise networking.",
};

export default function TeamPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-slate-950 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="container-page relative z-10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89A4A] mb-3">Who We Are</p>
          <h1 className="font-serif font-extrabold text-4xl md:text-5xl text-white mb-4 leading-tight">
            Meet Our Team
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto font-normal leading-relaxed">
            Dedicated professionals who design, deploy, and support mission-critical technology for hospitality and retail brands across India.
          </p>
        </div>
      </section>

      <TeamSection />
    </>
  );
}
