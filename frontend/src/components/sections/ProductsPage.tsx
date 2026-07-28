"use client";

import Link from "next/link";
import { Monitor, Users, Baby, MessageSquare, ArrowRight } from "lucide-react";
import { useProductCategories, useCompanyInfo } from "@/hooks/useQueries";

const ICON_REGISTRY: Record<string, React.ComponentType<{ size?: number }>> = {
  Monitor, Users, Baby, MessageSquare,
};

const getBrandIcon = (iconName?: string | null, size = 32) => {
  const Icon = iconName && ICON_REGISTRY[iconName] ? ICON_REGISTRY[iconName] : Monitor;
  return <Icon size={size} />;
};

export function ProductsPage() {
  const { data: apiCategories } = useProductCategories();
  const { data: companyInfo } = useCompanyInfo();
  const categories = apiCategories ?? [];

  return (
    <>
      <section className="bg-primary-500 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">{companyInfo?.products_section_title}</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{companyInfo?.products_heading || companyInfo?.site_tagline || "Products & Solutions"}</h1>
              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                {companyInfo?.products_description || ""}
              </p>
            </div>
            <div className="hidden lg:block">
              {companyInfo?.products_image && (
                <div className="aspect-[4/3] bg-primary-600 border border-gray-700/50 overflow-hidden">
                  <img src={companyInfo.products_image} alt="Products" className="w-full h-full object-cover opacity-80" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {(categories as Array<{ name: string; slug: string; description?: string; brand_logo?: string; brand_name?: string; show_brand_logo?: boolean; products?: Array<{ name: string; slug: string; short_description?: string; description?: string; has_specs?: boolean }> }>).map((category, catIdx) => {
        const products = (category.products ?? []).map((p) => ({
          name: p.name,
          slug: p.slug,
          description: p.short_description || p.description || "",
          has_specs: p.has_specs ?? false,
        }));
        return (
          <section key={category.slug} className={`section-padding ${catIdx % 2 === 0 ? "bg-white" : "bg-surface-muted"}`}>
            <div className="container-page">
              <div className="flex items-center gap-4 mb-8">
                {category.show_brand_logo !== false && (
                  <div className="w-14 h-14 bg-accent-50 flex items-center justify-center">
                    {category.brand_logo ? (
                      <img src={category.brand_logo} alt={category.brand_name || category.name} className="h-8 w-auto object-contain" />
                    ) : (
                      getBrandIcon((category as any).brand_icon)
                    )}
                  </div>
                )}
                <div>
                  <h2 className="heading-md text-primary-500">{category.name}</h2>
                  <p className="text-gray-500">{category.description ?? ""}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link key={product.slug} href={`/products/${product.slug}`} className={`card group ${!product.has_specs ? "opacity-60 pointer-events-none" : ""}`}>
                    <h3 className="font-semibold text-primary-500 mb-2 group-hover:text-accent-500 transition-colors">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                    <div className={`flex items-center gap-2 text-sm font-medium ${product.has_specs ? "text-accent-500" : "text-gray-400"}`}>
                      <span>{product.has_specs ? "Learn More" : "No Specs Available"}</span>
                      {product.has_specs && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
