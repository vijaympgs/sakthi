"use client";

import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useProduct } from "@/hooks/useQueries";

const FALLBACK_SUB_PRODUCTS = [
  { title: "Floor Standing Series", description: "Round corner design floor standing digital signage. Available in 42\", 46\", 55\" and 65\" sizes with high brightness and full HD resolution.", href: "/products/indoor-digital-signage/floor-standing" },
  { title: "Wall Mounting Series", description: "Slim wall mounted indoor LCD advertising player. Available from 22\" to 70\" with network version for remote content management.", href: "/products/indoor-digital-signage/wall-mounting" },
  { title: "LG Digital Signage", description: "LG branded commercial displays with enterprise-grade reliability, slim bezel design and centralized content management.", href: "/products/indoor-digital-signage/lg-digital-signage" },
];

export function IndoorDigitalSignageClient() {
  const { data: product } = useProduct("indoor-digital-signage");
  const features = product?.features ?? [];

  const subProducts = features.length > 0
    ? features.map((f: any) => ({
        title: f.title,
        description: f.description,
        href: `/products/indoor-digital-signage/${f.title.toLowerCase().replace(/\s+/g, '-')}`,
      }))
    : FALLBACK_SUB_PRODUCTS;

  return (
    <>
      <section className="bg-primary-500 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Products", href: "/products" }, { label: "Godspeed", href: "/products/godspeed" }, { label: "Indoor Digital Signage" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">Godspeed</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Indoor Digital Signage</h1>
              <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
                {product?.description || "World class digital signage with extraordinary features. Heavy duty body and toughened glass surface can withstand impact. User changeable images and videos using exclusive software."}
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-[4/3] bg-primary-600 border border-gray-700/50 overflow-hidden">
                <img src="/assets/products/r1.jpg" alt="Indoor Digital Signage" className="w-full h-full object-cover opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subProducts.map((sp: any) => (
              <Link key={sp.title} href={sp.href} className="card group hover:-translate-y-1 transition-transform duration-200">
                <div className="aspect-video bg-gray-50 overflow-hidden mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary-50 flex items-center justify-center text-primary-500 text-2xl font-bold">
                    {sp.title.charAt(0)}
                  </div>
                </div>
                <h3 className="font-semibold text-primary-500 mb-2 group-hover:text-label transition-colors">{sp.title}</h3>
                <p className="text-sm text-gray-500">{sp.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page text-center max-w-2xl">
          <h2 className="heading-sm text-primary-500 mb-4">Need Help Choosing the Right Digital Signage?</h2>
          <p className="text-gray-500 mb-6">Our team can help you select the perfect solution for your space and requirements.</p>
          <Link href="/contact" className="btn-primary">Get Consultation</Link>
        </div>
      </section>
    </>
  );
}
