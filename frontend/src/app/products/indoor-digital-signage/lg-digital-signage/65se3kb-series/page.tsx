import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const LG = { size: "65\"", resolution: "1920x1080", brightness: "500 cd/m\u00b2", panel: "IPS", bezel: "11.9mm (T/R/L), 18mm (B)", depth: "38.6mm", weight: "26.5kg", usage: "Retail signage, corporate lobbies, hospitality" };

export const metadata: Metadata = {
  title: "LG 65SE3KB Digital Signage - 65\" Commercial Display - Sakthi Solutions",
  description: "LG 65SE3KB 65\" commercial display with 500 cd/m\u00b2 brightness, Full HD resolution, IPS panel. Enterprise-grade digital signage for retail and corporate environments.",
};

const FEATURES = [
  "LG webOS Smart Signage platform for content management",
  "Built-in Wi-Fi and Bluetooth for wireless content updates",
  "24/7 operation capability with industrial-grade components",
  "Auto brightness sensor for optimal viewing in any lighting",
  "Tamper-proof design with lockable ports and security slot",
  "HDMI, DP, USB, RS232C and LAN connectivity",
  "Local content playback via USB or internal memory",
];

const SPECS = [
  { label: "Screen Size", value: LG.size },
  { label: "Resolution", value: LG.resolution },
  { label: "Brightness", value: LG.brightness },
  { label: "Panel Type", value: LG.panel },
  { label: "Bezel Width", value: LG.bezel },
  { label: "Depth", value: LG.depth },
  { label: "Weight", value: LG.weight },
  { label: "Typical Usage", value: LG.usage },
];

export default function LG65SE3KBPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Products", href: "/products" }, { label: "LG Digital Signage", href: "/products/indoor-digital-signage/lg-digital-signage" }, { label: "LG 65SE3KB" }]} />
      <section className="bg-primary-500 text-white py-20 md:py-28">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400 mb-4">LG Digital Signage</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">LG 65SE3KB</h1>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">65&quot; LG commercial display with Full HD resolution, 500 cd/m&sup2; brightness and IPS panel technology. Designed for retail signage, corporate lobbies and hospitality.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-page"><h2 className="heading-md text-primary-500 mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-4 border border-gray-100">
                <div className="w-6 h-6 bg-accent-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                <span className="text-sm text-gray-700">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-surface-muted">
        <div className="container-page max-w-3xl"><h2 className="heading-md text-primary-500 mb-6">LG 65SE3KB Specifications</h2>
          <div className="border border-gray-200">
            {SPECS.map((spec, i) => (
              <div key={spec.label} className={`flex items-center border-b border-gray-100 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-surface-muted"}`}>
                <div className="w-48 px-4 py-3 font-semibold text-primary-500 text-sm">{spec.label}</div>
                <div className="flex-1 px-4 py-3 text-sm text-gray-600">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-white"><div className="container-page text-center max-w-2xl">
        <h2 className="heading-sm text-primary-500 mb-4">Interested in LG 65SE3KB?</h2>
        <p className="text-gray-500 mb-6">Contact us for pricing, customization and deployment consultation.</p>
        <Link href="/contact" className="btn-primary">Request a Quote</Link>
      </div></section>
    </>
  );
}
