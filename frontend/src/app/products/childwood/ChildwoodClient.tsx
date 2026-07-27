"use client";

import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useProductGroups } from "@/hooks/useQueries";
import { Ruler } from "lucide-react";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");

export function ChildwoodClient() {
  const { data: groups, isLoading } = useProductGroups();

  if (isLoading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-page text-center"><p className="text-gray-400">Loading catalog...</p></div>
      </section>
    );
  }

  const productGroups = Array.isArray(groups) ? groups : [];

  return (
    <>
      <section className="bg-primary-500 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Products", href: "/products" }, { label: "Childwood Play Equipment" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">Childwood</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Children&apos;s Play Equipment</h1>
              <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
                Complete range of indoor and outdoor children&apos;s play equipment including playstations, spring rockers, swings, slides, tunnels and floorings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {productGroups.map((group: any) => {
        const products = group.products ?? [];
        if (products.length === 0) return null;
        return (
          <section key={group.id || group.name} className="section-padding bg-white border-b border-gray-100">
            <div className="container-page">
              <h2 className="heading-md text-primary-500 mb-2">{group.name}</h2>
              <p className="text-gray-500 text-sm mb-8">{group.category_name || ""}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.map((product: any) => {
                  const imgUrl = product.image
                    ? (product.image.startsWith("http") ? product.image : `${API_BASE}${product.image.startsWith("/") ? "" : "/"}${product.image}`)
                    : null;
                  return (
                    <div key={product.id || product.sku} className="border border-gray-100 overflow-hidden group hover:border-[#B89A4A] transition-all duration-200 bg-white">
                      <div className="aspect-square bg-gray-50 overflow-hidden flex items-center justify-center">
                        {imgUrl ? (
                          <img src={imgUrl} alt={product.name} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                        ) : (
                          <div className="text-2xl font-black text-gray-200">{product.sku || "IMG"}</div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-semibold text-primary-500 leading-tight line-clamp-2">{product.name}</p>
                        {product.sku && (
                          <p className="text-[10px] text-gray-400 mt-1 font-mono">{product.sku}</p>
                        )}
                        {product.dimensions && (
                          <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                            <Ruler size={10} /> {product.dimensions}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {productGroups.length === 0 && (
        <section className="section-padding bg-white">
          <div className="container-page text-center">
            <p className="text-gray-400">No play equipment catalog items found.</p>
          </div>
        </section>
      )}
    </>
  );
}
