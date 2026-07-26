import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCT_CATALOG } from "@/lib/productData";
import { BarChart3, Bell, Building2, TrendingUp, Quote, MessageSquare, Download, Wifi, Shield, Users, Star, Gift } from "lucide-react";

export const metadata: Metadata = {
  title: "Tellus Feedback Solution - Sakthi Solutions | Customer Feedback Kiosk for Restaurants",
  description: "Tellus electronic customer feedback solution for restaurants and retail. Instant SMS alerts for negative feedback, downloadable reports, chain outlet management. Stainless steel kiosk, 10\" and 7\" tablet options.",
};

const data = PRODUCT_CATALOG.tellus;

const FEATURE_GROUPS = [
  {
    title: "Data & Reporting",
    icon: <BarChart3 size={24} />,
    features: [
      "All feedback collected electronically",
      "Customize your own questions",
      "Download Feedback in excel and can do analyses",
    ],
  },
  {
    title: "Alerts & Notifications",
    icon: <Bell size={24} />,
    features: [
      "Instant Alert for negative feedbacks to owners by SMS",
      "Tell Us will improve your customer service approach",
    ],
  },
  {
    title: "Multi-Outlet Management",
    icon: <Building2 size={24} />,
    features: [
      "Portal access option for Chain of outlets",
      "Easy to measure Which staff is better in which branch",
      "Product quality and consistency can be maintained",
    ],
  },
  {
    title: "ROI & Growth",
    icon: <TrendingUp size={24} />,
    features: [
      "No Big investment - Each branch feedback collect @ less than Rs 20 per day (Cost of one Water bottle)",
      "Increase repeat customers and increase PROFIT",
      "Help you to get all potential customer data, you can send personalised messages to dis-satisfied customer and offer Gift coupons to loyal customers",
    ],
  },
];

const HARDWARE = data.hardware;

export default function TellusPage() {
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
              <li className="text-gray-300 font-medium">Tellus Feedback Solution</li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">Tellus</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Customer Feedback Solution</h1>
              <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
                Electronic customer feedback kiosks for restaurants and retail. Instant SMS alerts for negative feedback,
                downloadable reports, and chain outlet portal access. Less than Rs 20 per day per branch.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-[4/3] bg-primary-600 border border-gray-700/50 overflow-hidden">
                <img
                  src="/assets/products/X11C1367-200x300.jpg"
                  alt="Tellus Feedback Kiosk"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <section className="section-padding bg-white">
        <div className="container-page max-w-4xl">
          <h2 className="heading-md text-primary-500 mb-6">Why Customer Feedback in Restaurant / Retail?</h2>
          <p className="text-gray-600 leading-relaxed mb-8">{data.whyFeedback}</p>
          <div className="border-l-4 border-label bg-surface-muted p-6">
            <div className="flex items-start gap-3">
              <Quote size={20} className="text-label shrink-0 mt-1" />
              <p className="text-gray-700 font-medium">{data.whyTellUs}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-8">Features of Tell Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {FEATURE_GROUPS.map((group) => (
              <div key={group.title} className="bg-white border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-label/10 flex items-center justify-center text-label">
                    {group.icon}
                  </div>
                  <h3 className="font-bold text-primary-500">{group.title}</h3>
                </div>
                <ul className="space-y-3">
                  {group.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-label shrink-0 mt-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-8">Hardware Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            {HARDWARE.map((hw) => (
              <div key={hw.name} className="border border-gray-100 overflow-hidden group hover:-translate-y-1 transition-transform duration-200">
                <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
                  <img src={hw.image} alt={hw.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
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