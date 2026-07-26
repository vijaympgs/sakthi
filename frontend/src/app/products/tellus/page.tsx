import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PRODUCT_CATALOG } from "@/lib/productData";

export const metadata: Metadata = {
  title: "Tellus Feedback Solution - Sakthi Solutions | Customer Feedback Kiosk for Restaurants",
  description: "Tellus electronic customer feedback solution for restaurants and retail. Instant SMS alerts for negative feedback, downloadable reports, chain outlet management. Stainless steel kiosk, 10\" and 7\" tablet options.",
};

const data = PRODUCT_CATALOG.tellus;

export default function TellusPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          { label: "Tellus Feedback Solution" },
        ]}
      />

      <section className="bg-primary-500 text-white py-20 md:py-28">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400 mb-4">Tellus</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Customer Feedback Solution</h1>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            Electronic customer feedback kiosks for restaurants and retail. Instant SMS alerts for negative feedback,
            downloadable reports, and chain outlet portal access. Less than Rs 20 per day per branch.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page max-w-4xl">
          <h2 className="heading-md text-primary-500 mb-6">Why Customer Feedback in Restaurant / Retail?</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{data.whyFeedback}</p>
          <div className="border-l-4 border-accent-500 bg-surface-muted p-6">
            <p className="text-gray-700 font-medium">{data.whyTellUs}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-8">Features of Tell Us</h2>
          <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 border border-gray-100">
                <div className="w-6 h-6 bg-accent-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-8">Hardware Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            {data.hardware.map((hw) => (
              <div key={hw.name} className="border border-gray-100 overflow-hidden">
                <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
                  <img src={hw.image} alt={hw.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-primary-500">{hw.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page text-center max-w-2xl">
          <h2 className="heading-sm text-primary-500 mb-4">Ready to Improve Customer Satisfaction?</h2>
          <p className="text-gray-500 mb-6">Contact us for a Tell Us feedback solution demonstration.</p>
          <Link href="/contact" className="btn-primary">Request a Demo</Link>
        </div>
      </section>
    </>
  );
}