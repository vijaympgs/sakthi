"use client";

import Link from "next/link";
import { useChildwood } from "@/hooks/useQueries";

const CATEGORY_META: Record<string, { subtitle: string }> = {
  "Playstations": { subtitle: "Multi-activity outdoor playstations with slides, climbing walls and interactive elements" },
  "Spring Rockers": { subtitle: "Spring-mounted rockers in animal and vehicle designs for toddlers" },
  "See Saw": { subtitle: "Balance see-saw equipment for outdoor playgrounds" },
  "Swings": { subtitle: "Swing sets with toddler seats, flat seats and belt swings" },
  "Indoor Playstations": { subtitle: "Compact playstations designed for indoor play areas in restaurants and malls" },
  "Rockons & Rideons": { subtitle: "Rocking and riding toys for indoor play areas" },
  "Tunnels": { subtitle: "Crawl tunnels for indoor play and sensory development" },
  "Slides & Combos": { subtitle: "Indoor slides and combination play structures" },
  "Floorings": { subtitle: "EVA mat floorings for safe indoor play surfaces" },
};

export function PlaystationsGalleryClient() {
  const { data: categories, isLoading } = useChildwood();

  const getPlayEquipmentImage = (item: any) => {
    if (!item.image) {
      return "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80";
    }
    if (item.image.startsWith("http://") || item.image.startsWith("https://")) {
      return item.image;
    }
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");
    return `${apiBase}${item.image.startsWith("/") ? "" : "/"}${item.image}`;
  };

  if (isLoading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-page text-center">
          <p className="text-gray-500">Loading gallery photos...</p>
        </div>
      </section>
    );
  }

  const validCategories = Array.isArray(categories) ? categories : [];

  return (
    <>
      {validCategories.map((category: any) => (
        <section key={category.id} className={`section-padding ${category.type === "outdoor" ? "bg-white" : "bg-surface-muted"}`}>
          <div className="container-page">
            <h2 className="heading-md text-primary-500 mb-2 capitalize">{category.name} Equipment</h2>
            {category.groups?.map((group: any) => {
              const meta = CATEGORY_META[group.name];
              const items = group.items || [];
              if (items.length === 0) return null;
              return (
                <div key={group.id} className="mt-8">
                  <h3 className="heading-sm text-primary-500 mb-2">{group.name}</h3>
                  {meta && <p className="text-sm text-gray-500 mb-6">{meta.subtitle}</p>}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {items.map((item: any) => {
                      const imageSrc = getPlayEquipmentImage(item);
                      return (
                        <div key={item.sku} className="border border-gray-100 bg-white overflow-hidden group hover:border-[#B89A4A] transition-all duration-300">
                          <div className="aspect-square bg-gray-50 overflow-hidden">
                            <img
                              src={imageSrc}
                              alt={`${group.name} - ${item.sku}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-3">
                            <p className="text-xs font-semibold text-primary-500">{item.sku}</p>
                            {item.name && <p className="text-xs text-gray-500 mt-0.5">{item.name}</p>}
                            {item.dimensions && <p className="text-[10px] text-gray-400 font-mono mt-0.5">{item.dimensions}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <section className="section-padding bg-white">
        <div className="container-page text-center max-w-2xl">
          <h2 className="heading-sm text-primary-500 mb-4">Interested in Childwood Play Equipment?</h2>
          <p className="text-gray-500 mb-6">Contact us for product details, pricing and installation.</p>
          <Link href="/contact" className="btn-primary">Get a Quote</Link>
        </div>
      </section>
    </>
  );
}
