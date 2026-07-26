import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CaseStudy } from "@/components/ui/CaseStudy";
import { PRODUCT_CATALOG } from "@/lib/productData";

export const metadata: Metadata = {
  title: "Interactive Wayfinding Kiosk - Sakthi Solutions | Mall & Hospital Directory Solution",
  description: "Godspeed interactive wayfinding kiosk with directory listing, interactive map and shortest route guidance. Deployed at Phoenix Marketcity malls across Mumbai, Pune and Bangalore (27 kiosks).",
};

const data = PRODUCT_CATALOG.wayfindingKiosk;

export default function WayfindingKioskPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          { label: "Godspeed", href: "/products" },
          { label: "Interactive Wayfinding Kiosk" },
        ]}
      />

      <section className="bg-primary-500 text-white py-20 md:py-28">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400 mb-4">Godspeed</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Interactive Wayfinding Kiosk</h1>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            Interactive wayfinding with intuitive interface, directory listing, shortest route guidance
            and attractive branding options. Deployed at Phoenix Marketcity malls across Mumbai, Pune and Bangalore.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {data.features.map((feature) => (
              <div key={feature.title} className="border border-gray-100 p-6">
                <h3 className="font-semibold text-primary-500 mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-8">Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.applications.map((app) => (
              <div key={app.title} className="bg-white border border-gray-100 p-6">
                <h3 className="font-semibold text-primary-500 mb-2">{app.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page max-w-4xl">
          <CaseStudy {...data.caseStudy} />
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page text-center max-w-2xl">
          <h2 className="heading-sm text-primary-500 mb-4">Need Wayfinding for Your Premises?</h2>
          <p className="text-gray-500 mb-6">Contact us for site assessment, kiosk placement planning and deployment.</p>
          <Link href="/contact" className="btn-primary">Request a Quote</Link>
        </div>
      </section>
    </>
  );
}