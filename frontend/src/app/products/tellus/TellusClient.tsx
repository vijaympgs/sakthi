"use client";

import Link from "next/link";
import { useProduct } from "@/hooks/useQueries";
import { BarChart3, Bell, Building2, TrendingUp, Quote } from "lucide-react";

const FEATURE_GROUPS_TEMPLATE = [
  { title: "Data & Reporting", icon: <BarChart3 size={24} />, indices: [0, 1, 2] },
  { title: "Alerts & Notifications", icon: <Bell size={24} />, indices: [3, 4] },
  { title: "Multi-Outlet Management", icon: <Building2 size={24} />, indices: [5, 6, 7] },
  { title: "ROI & Growth", icon: <TrendingUp size={24} />, indices: [8, 9, 10] },
];

export function TellusClient() {
  const { data: product } = useProduct("tellus");
  const features: { title: string; description: string }[] = product?.features ?? [];
  const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");
  const heroImg = product?.image
    ? (product.image.startsWith("http") ? product.image : `${apiBase}${product.image.startsWith("/") ? "" : "/"}${product.image}`)
    : "/assets/products/X11C1367-200x300.jpg";
  const heroDesc = product?.short_description || product?.description || "Electronic customer feedback kiosks for restaurants and retail. Instant SMS alerts, downloadable reports, and chain outlet portal access.";

  // Use first feature as the "why" quote, or fallback
  const whyQuote = features[0]?.description || "Collect all feedback electronically. Customize your own questions. Download feedback in Excel for analysis.";

  return (
    <>
      <section className="bg-primary-500 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-xs text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li className="text-gray-500">/</li>
              <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-300 font-medium">{product?.name || "Tellus Feedback Solution"}</li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">{product?.tagline || "Tellus"}</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{product?.name || "Customer Feedback Solution"}</h1>
              <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">{heroDesc}</p>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-[4/3] bg-primary-600 border border-gray-700/50 overflow-hidden">
                <img src={heroImg} alt={product?.name || "Tellus Feedback Kiosk"} className="w-full h-full object-cover opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <section className="section-padding bg-white">
        <div className="container-page max-w-4xl">
          <h2 className="heading-md text-primary-500 mb-6">Why Customer Feedback in Restaurant / Retail?</h2>
          <p className="text-gray-600 leading-relaxed mb-8">{product?.description || "The purpose of business can be measured only with the Customer/Guest feedback. Restaurants and retail outlets should meet the purpose of customer walk-in."}</p>
          <div className="border-l-4 border-label bg-surface-muted p-6">
            <div className="flex items-start gap-3">
              <Quote size={20} className="text-label shrink-0 mt-1" />
              <p className="text-gray-700 font-medium">{whyQuote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-8">Features of Tell Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {FEATURE_GROUPS_TEMPLATE.map((group) => {
              const groupFeatures = group.indices
                .map((idx) => features[idx])
                .filter(Boolean)
                .map((f) => f.title);
              return (
                <div key={group.title} className="bg-white border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-label/10 flex items-center justify-center text-label">
                      {group.icon}
                    </div>
                    <h3 className="font-bold text-primary-500">{group.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {groupFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-label shrink-0 mt-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page text-center max-w-2xl">
          <h2 className="heading-sm text-primary-500 mb-4">Ready to Improve Customer Satisfaction?</h2>
          <p className="text-gray-500 mb-6">Contact us for a Tellus feedback solution demonstration.</p>
          <Link href="/contact" className="btn-primary">Request a Demo</Link>
        </div>
      </section>
    </>
  );
}
