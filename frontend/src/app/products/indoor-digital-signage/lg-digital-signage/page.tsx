import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Monitor, Layout, Settings, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "LG Digital Signage - Sakthi Solutions | Commercial Displays for Enterprise",
  description: "LG commercial digital signage displays paired with Godspeed mounting solutions. Available from 32\" to 98\". Slim bezel, SuperSign CMS, 24/7 operation. For corporate, retail and hospitality environments.",
};

const FEATURES = [
  { icon: <Monitor size={24} />, title: "Premium LG Panels", description: "Enterprise-grade LG commercial displays with superior color accuracy, high brightness and 24/7 operation capability." },
  { icon: <Layout size={24} />, title: "Slim Bezel Design", description: "Ultra-slim bezel profile for seamless video wall integration. Minimalist design suitable for corporate environments." },
  { icon: <Settings size={24} />, title: "Centralized Management", description: "LG SuperSign CMS for remote content scheduling, push updates and multi-device management from a single dashboard." },
  { icon: <Cpu size={24} />, title: "Enterprise Reliability", description: "Commercial-grade components rated for extended operation hours, with built-in temperature sensors and fail-safe mechanisms." },
];

export default function LGDigitalSignagePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          { label: "Godspeed", href: "/products" },
          { label: "Indoor Digital Signage", href: "/products/indoor-digital-signage" },
          { label: "LG Digital Signage" },
        ]}
      />

      <section className="bg-primary-500 text-white py-20 md:py-28">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400 mb-4">Godspeed</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">LG Digital Signage</h1>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            LG commercial displays paired with Godspeed mounting and control solutions. Enterprise-grade reliability,
            slim bezel designs, and centralized content management for corporate, retail and hospitality environments.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="w-14 h-14 bg-accent-50 flex items-center justify-center text-accent-500 shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-primary-500 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-8">Available Sizes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {["32\"", "43\"", "49\"", "55\"", "65\"", "75\"", "86\"", "98\""].map((size) => (
              <div key={size} className="border border-gray-200 bg-white p-6 text-center">
                <p className="text-2xl font-bold text-primary-500">{size}</p>
                <p className="text-xs text-gray-500 mt-1">LG Commercial Display</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page text-center max-w-2xl">
          <h2 className="heading-sm text-primary-500 mb-4">Need LG Digital Signage?</h2>
          <p className="text-gray-500 mb-6">Contact us for pricing, configuration and installation services.</p>
          <Link href="/contact" className="btn-primary">Get a Quote</Link>
        </div>
      </section>
    </>
  );
}
