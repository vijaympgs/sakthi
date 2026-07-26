import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const FEATURES = [
  "LG webOS Smart Signage platform for content management",
  "Built-in Wi-Fi and Bluetooth for wireless content updates",
  "24/7 operation capability with industrial-grade components",
  "Auto brightness sensor for optimal viewing in any lighting",
  "Tamper-proof design with lockable ports and security slot",
  "HDMI, DP, USB, RS232C and LAN connectivity",
  "Local content playback via USB or internal memory",
];

export const SPECS = [
  { label: "Screen Size" },
  { label: "Resolution" },
  { label: "Brightness" },
  { label: "Panel Type" },
  { label: "Bezel Width" },
  { label: "Depth" },
  { label: "Weight" },
  { label: "Typical Usage" },
];

const specValues = (size: string, brightness: string, weight: string, usage: string): Record<string, string> => ({
  "Screen Size": size,
  Resolution: "1920x1080",
  Brightness: brightness,
  "Panel Type": "IPS",
  "Bezel Width": "11.9mm (T/R/L), 18mm (B)",
  Depth: "38.6mm",
  Weight: weight,
  "Typical Usage": usage,
});

export function renderPage(model: string, size: string, brightness: string, usage: string, weight: string) {
  const vals = specValues(size, brightness, weight, usage);

  return (
    <>
      <section className="bg-primary-500 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Products", href: "/products" }, { label: "LG Digital Signage", href: "/products/indoor-digital-signage/lg-digital-signage" }, { label: `LG ${model}` }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">LG Digital Signage</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{`LG ${model}`}</h1>
              <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">{`${size} LG ${model} commercial display with Full HD resolution, ${brightness} brightness and IPS panel technology. Designed for ${usage}.`}</p>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-[4/3] bg-primary-600 border border-gray-700/50 overflow-hidden">
                <img
                  src="/assets/products/lcd.jpg"
                  alt={`LG ${model}`}
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <section className="section-padding bg-white">
        <div className="container-page"><h2 className="heading-md text-primary-500 mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-4 border border-gray-100 hover:border-label/40 transition-colors">
                <div className="w-6 h-6 bg-label text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                <span className="text-sm text-gray-700">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-surface-muted">
        <div className="container-page max-w-3xl"><h2 className="heading-md text-primary-500 mb-6">{`LG ${model} Specifications`}</h2>
          <div className="border border-gray-200">
            {SPECS.map((spec, i) => (
              <div key={spec.label} className={`flex items-center border-b border-gray-100 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-surface-muted"}`}>
                <div className="w-48 px-4 py-3 font-semibold text-primary-500 text-sm">{spec.label}</div>
                <div className="flex-1 px-4 py-3 text-sm text-gray-600">{vals[spec.label] || "\u2014"}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-white"><div className="container-page text-center max-w-2xl">
        <h2 className="heading-sm text-primary-500 mb-4">{`Interested in LG ${model}?`}</h2>
        <p className="text-gray-500 mb-6">Contact us for pricing, customization and deployment consultation.</p>
        <Link href="/contact" className="btn-primary">Request a Quote</Link>
      </div></section>
    </>
  );
}