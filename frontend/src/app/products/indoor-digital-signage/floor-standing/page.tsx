import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FeatureBlock } from "@/components/ui/FeatureBlock";
import { PRODUCT_CATALOG } from "@/lib/productData";

export const metadata: Metadata = {
  title: "Floor Standing Digital Signage - Sakthi Solutions | Round Corner Series 42\" to 65\"",
  description: "Godspeed floor standing digital signage with round corner design. Available in 42\", 46\", 55\" and 65\". High brightness, full HD 1920x1080, 60000 hrs lifetime. Ideal for retail, corporate and hospitality.",
};

const FEATURES = PRODUCT_CATALOG.indoorDigitalSignage.floorStanding.features;
const SPECS = PRODUCT_CATALOG.indoorDigitalSignage.floorStanding.specs;

export default function FloorStandingPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          { label: "Indoor Digital Signage", href: "/products/indoor-digital-signage" },
          { label: "Floor Standing Series" },
        ]}
      />

      <section className="bg-primary-500 text-white py-20 md:py-28">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400 mb-4">Godspeed</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Floor Standing Series</h1>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            Indoor LCD advertising player with round corner design. Available in 42&quot;, 46&quot;, 55&quot; and 65&quot; sizes.
            High brightness, high contrast ratio, full HD 1920x1080 resolution.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-8">Main Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <FeatureBlock
                key={feature.title}
                title={feature.title}
                description={feature.description}
                image={feature.image}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-2">{SPECS.title}</h2>
          <p className="text-gray-500 mb-8">{SPECS.subtitle}</p>
          <div className="overflow-x-auto border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-500 text-white">
                  {SPECS.columns.map((col) => (
                    <th key={col.key} className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SPECS.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-surface-muted"}>
                    {SPECS.columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 whitespace-nowrap text-gray-600 border-b border-gray-100">
                        {String((row as Record<string, string>)[col.key] ?? "\u2014")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page text-center max-w-2xl">
          <h2 className="heading-sm text-primary-500 mb-4">Interested in Floor Standing Digital Signage?</h2>
          <p className="text-gray-500 mb-6">Contact us for pricing, customization options and deployment consultation.</p>
          <Link href="/contact" className="btn-primary">Request a Quote</Link>
        </div>
      </section>
    </>
  );
}