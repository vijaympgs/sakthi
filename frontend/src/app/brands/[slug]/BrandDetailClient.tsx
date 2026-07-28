"use client";

import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useBrands, useProductCategories } from "@/hooks/useQueries";

export function BrandDetailClient({ slug }: { slug: string }) {
  const { data: apiBrands } = useBrands();
  const { data: apiCategories } = useProductCategories();
  const brands: any[] = apiBrands ?? [];
  const brand = brands.find((b: any) => b.slug === slug);
  const categories: any[] = (apiCategories ?? []).filter((c: any) => c.brand_name?.toLowerCase() === slug);

  if (!brand) {
    return (
      <>
        <Navigation />
        <main id="main-content">
          <div className="container-page py-20 text-center">
            <h1 className="text-2xl font-bold text-primary-500">Brand not found</h1>
            <Link href="/products" className="btn-accent mt-6 inline-flex items-center gap-2">
              <ArrowLeft size={14} /> View Products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main id="main-content">
        <Breadcrumb items={[{ label: "Brands", href: "/brands" }, { label: brand.name }]} />
        <section className="bg-primary-500 text-white py-20 md:py-28">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">{brand.name}</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{brand.tagline || brand.name}</h1>
                {brand.description && (
                  <p className="text-lg text-gray-300 leading-relaxed">{brand.description}</p>
                )}
              </div>
              {brand.logo && (
                <div className="hidden lg:flex justify-center">
                  <img src={brand.logo} alt={brand.name} className="max-h-40 w-auto object-contain brightness-0 invert opacity-80" />
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {categories.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container-page">
              <h2 className="heading-md text-primary-500 mb-8">Product Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat: any) => (
                  <Link key={cat.slug} href={`/products/${cat.slug}`} className="card group border border-gray-200 p-6 hover:-translate-y-1 transition-all duration-200">
                    <h3 className="font-bold text-primary-500 mb-2 group-hover:text-label transition-colors">{cat.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{cat.tagline || cat.description}</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-label">
                      <span>View Products</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
