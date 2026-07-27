"use client";

import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductSpecsSection } from "@/components/ui/ProductSpecsSection";
import { useProduct } from "@/hooks/useQueries";
import { Monitor, Usb, Clock, Lock, Palette, Shield, Columns3, LayoutGrid } from "lucide-react";

const FEATURE_ICONS = [
  <Monitor size={24} />,
  <Usb size={24} />,
  <Clock size={24} />,
  <Lock size={24} />,
  <Palette size={24} />,
  <Shield size={24} />,
  <Columns3 size={24} />,
  <LayoutGrid size={24} />,
];

export function WallMountingClient() {
  const { data: product } = useProduct("indoor-digital-signage");
  const features = product?.features ?? [];
  return (
    <>
      <section className="bg-primary-500 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Products", href: "/products" }, { label: "Indoor Digital Signage", href: "/products/indoor-digital-signage" }, { label: "Wall Mounting Series" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">Godspeed</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Wall Mounting Series</h1>
              <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
                Wall mounted indoor LCD advertising player. Available in 22&quot;, 32&quot;, 42&quot;, 46&quot;, 55&quot;, 65&quot; and 70&quot; sizes.
                Network version with remote content management.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-[4/3] bg-primary-600 border border-gray-700/50 overflow-hidden">
                <img
                  src="/assets/products/r2.jpg"
                  alt="Wall Mounting Digital Signage"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <section className="section-padding bg-white">
        <div className="container-page">
          <h2 className="heading-md text-primary-500 mb-8">Main Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature: any, idx: number) => (
              <div key={feature.title} className="border border-gray-100 p-6 group hover:-translate-y-1 hover:border-label/40 transition-all duration-200">
                <div className="mb-4 text-label">
                  {FEATURE_ICONS[idx] || <Monitor size={24} />}
                </div>
                <h3 className="font-semibold text-primary-500 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductSpecsSection slug="wall-mounting" />

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <div className="p-4 bg-white border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold text-primary-500 mb-2">Common Specifications</p>
            <p>Display Scale: 16:9 | Response Time: 6ms | Viewing Angle: (H)175&deg; / (V)175&deg; | Input Power: AC 100~240V 50/60HZ</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page text-center max-w-2xl">
          <h2 className="heading-sm text-primary-500 mb-4">Interested in Wall Mounting Digital Signage?</h2>
          <p className="text-gray-500 mb-6">Contact us for pricing, customization options and deployment consultation.</p>
          <Link href="/contact" className="btn-primary">Request a Quote</Link>
        </div>
      </section>
    </>
  );
}