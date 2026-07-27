"use client";

import Link from "next/link";
import { useProductGroups, useCompanyInfo } from "@/hooks/useQueries";

const CATEGORY_META: Record<string, { subtitle: string }> = {
  "Playstations": { subtitle: "Multi-activity outdoor playstations with slides, climbing walls and interactive elements" },
  "Spring Rockers": { subtitle: "Spring-mounted rockers in animal and vehicle designs for toddlers" },
  "See Saw": { subtitle: "Balance see-saw equipment for outdoor playgrounds" },
  "Swings": { subtitle: "Swing sets with toddler seats, flat seats and belt swings" },
  "Indoor Playstations": { subtitle: "Compact playstations designed for indoor play areas" },
  "Rockons & Rideons": { subtitle: "Indoor ride-on toys and rocking animals for young children" },
  "Tunnels": { subtitle: "Crawl tunnels for sensory play and physical development" },
  "Slides & Combos": { subtitle: "Indoor slides, ball pools and combined play structures" },
  "Floorings": { subtitle: "EVA foam mats for safe indoor play flooring" },
};

export function PlaystationsGalleryClient() {
  const { data: groupsData, isLoading } = useProductGroups();
  const { data: companyInfo } = useCompanyInfo();
  const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");

  const getPlayEquipmentImage = (item: any) => {
    if (!item.image) return "/assets/childwood/01-3.jpg";
    if (item.image.startsWith("http://") || item.image.startsWith("https://")) return item.image;
    return `${apiBase}${item.image.startsWith("/") ? "" : "/"}${item.image}`;
  };

  const groups = Array.isArray(groupsData)
    ? groupsData.map((g: any) => ({
        name: g.name,
        items: (g.products ?? []).map((p: any) => ({
          sku: p.sku,
          name: p.name,
          image: p.image,
          dimensions: p.dimensions,
        })),
      }))
    : [];

  if (isLoading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-page text-center"><p className="text-gray-400">Loading gallery...</p></div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-slate-950 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-15" />
        <div className="container-page relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B89A4A] mb-3">Childwood Play Equipment</p>
          <h1 className="font-serif font-extrabold text-4xl md:text-5xl text-white mb-4 leading-tight">Playstations Gallery</h1>
          <p className="text-gray-400 text-sm max-w-2xl font-normal leading-relaxed">
            Browse our complete range of Childwood children's play equipment. Outdoor playstations, spring rockers, swings, indoor playstations, rideons, tunnels, slides and floorings.
          </p>
        </div>
      </section>

      {groups.map((group) => {
        const meta = CATEGORY_META[group.name];
        return (
          <section key={group.name} className="section-padding bg-white border-b border-gray-100">
            <div className="container-page">
              <div className="mb-6">
                <h2 className="font-serif font-bold text-2xl text-slate-900">{group.name}</h2>
                {meta && <p className="text-sm text-gray-500 mt-1">{meta.subtitle}</p>}
                <div className="w-12 h-0.5 bg-[#B89A4A] mt-3" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {group.items.map((item: any) => (
                  <div key={item.sku} className="border border-gray-100 overflow-hidden group hover:border-[#B89A4A] transition-all duration-300 bg-white">
                    <div className="aspect-square bg-gray-50 overflow-hidden">
                      <img src={getPlayEquipmentImage(item)} alt={item.name || item.sku} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-semibold text-slate-900 leading-tight">{item.name || item.sku}</p>
                      {item.sku && <p className="text-[10px] text-gray-400 mt-0.5 font-mono">{item.sku}</p>}
                      {item.dimensions && <p className="text-[10px] text-gray-400 mt-0.5">{item.dimensions}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {groups.length === 0 && (
        <section className="section-padding bg-white">
          <div className="container-page text-center"><p className="text-gray-400">No play equipment found.</p></div>
        </section>
      )}

      <section className="border-t border-gray-100 bg-white">
        <div className="container-page py-10 text-center">
          <Link href="/contact" className="btn-primary">
            Enquire About Play Equipment
          </Link>
        </div>
      </section>
    </>
  );
}
