"use client";

import Link from "next/link";
import { Monitor, Users, Baby, ArrowRight } from "lucide-react";
import { useProductCategories } from "@/hooks/useQueries";

const ICON_MAP: Record<string, React.ReactNode> = {
  godspeed: <Monitor size={32} />,
  tellus: <Users size={32} />,
  childwood: <Baby size={32} />,
};

export function ProductsPage() {
  const { data: apiCategories } = useProductCategories();
  const categories = apiCategories ?? [];

  return (
    <>
      <section className="bg-primary-500 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">Our Products</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Digital Signage &<br />Hardware Solutions</h1>
              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                International-grade products for digital signage, interactive kiosks,
                feedback solutions, play equipment and more.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-[4/3] bg-primary-600 border border-gray-700/50 overflow-hidden">
                <img src="/assets/products/r1.jpg" alt="Digital Signage Solutions" className="w-full h-full object-cover opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {(categories as Array<{ name: string; slug: string; description?: string; products?: Array<{ name: string; slug: string; short_description?: string; description?: string }> }>).map((category, catIdx) => {
        const icon = ICON_MAP[category.slug] ?? <Monitor size={32} />;
        const products = (category.products ?? []).map((p) => ({
          name: p.name,
          slug: p.slug,
          description: p.short_description || p.description || "",
        }));
        return (
          <section key={category.slug} className={`section-padding ${catIdx % 2 === 0 ? "bg-white" : "bg-surface-muted"}`}>
            <div className="container-page">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-accent-50 flex items-center justify-center text-accent-500">{icon}</div>
                <div>
                  <h2 className="heading-md text-primary-500">{category.name}</h2>
                  <p className="text-gray-500">{category.description ?? ""}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link key={product.slug} href={`/products/${product.slug}`} className="card group">
                    <h3 className="font-semibold text-primary-500 mb-2 group-hover:text-accent-500 transition-colors">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-accent-500">
                      <span>Learn More</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
