"use client";

import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useChildwood } from "@/hooks/useQueries";
import { ArrowLeft } from "lucide-react";

const SKU_NAMES: Record<string, string> = {
  "CWP001": "Multi-Level Playstation",
  "CWP002": "Compact Play Structure",
  "CWP003": "Adventure Tower",
  "CWP004": "Slide Combo Unit",
  "CWP005": "Junior Play Zone",
  "CWP006": "Narrow Corridor Play",
  "CWP007": "Extended Play Arena",
  "CWP008": "Deluxe Playstation",
  "CWP009": "Family Fun Center",
  "CWP010": "Grand Play Structure",
  "CWP011": "Mega Play Tunnel",
  "CWP012": "Triple Deck Play",
  "CWP013": "Multi-Level Playstation",
  "CWP014": "Custom Play Setup",
  "CWP015": "Premium Play Fortress",
  "CWP016": "Dual Zone Play",
  "CWP017": "Jumbo Adventure Park",
  "CWP018": "Triple Slide Tower",
  "CWP019": "Climbing Frame Combo",
  "CWP020": "Multi-Activity Station",
  "CWP021": "Double Deck Play Zone",
  "CWP022": "Compact Adventure Frame",
  "CWP023": "Wide Play Arena",
  "CWP024": "Low Profile Play Unit",
  "CWP025": "Extended Slide Complex",
  "CWP026": "Dual Level Play Structure",
  "CWP027": "Triple Level Play Frame",
  "CWP028": "Climbing Adventure Combo",
  "CWP029": "Large Multi-Play Unit",
  "CWP030": "Junior Adventure Tower",
  "CWP031": "Deluxe Play Fortress",
  "CWP032": "Compact Slide Tower",
  "CWP033": "Family Play Center",
  "CWP034": "Square Play Station",
  "CWP035": "Tall Multi-Deck Play",
  "CWP036": "Standard Play Structure",
  "CWP037": "Mega Adventure Complex",
  "CWP038": "Premium Multi-Level Play",
  "CWP039": "Grand Slide Fortress",
  "CWP040": "Wide Play Arena",
  "CWP041": "Jumbo Play Castle",
  "CW0027": "Large Indoor Playstation",
  "CW0028": "Extended Indoor Play Frame",
  "CW0029": "Compact Indoor Play Unit",
  "CW0030": "Multi-Activity Indoor Play",
};

const MATERIAL_NOTES: Record<string, string> = {
  "Playstations": "MS structure, PVC coating, SS bolts",
  "Spring Rockers": "MS spring, HDPE seat, powder coated",
  "See Saw": "MS pipe structure, powder coated",
  "Swings": "MS chain, HDPE/MS seat, powder coated",
  "Rideons": "HDPE body, MS base, powder coated",
  "Tunnels": "PVC coated MS frame, net tunnel",
  "Slides, Slides & Swing Combo": "MS slide, HDPE platform, powder coated",
  "Floorings": "EVA foam / artificial grass",
};

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

function CatalogSection({ title, items, materialNote }: { title: string; items: Array<{ sku: string; name?: string; image: string; dimensions?: string }>; materialNote?: string }) {
  return (
    <div className="mb-16">
      <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-gray-200">
        <h3 className="font-serif font-bold text-xl text-slate-900">{title}</h3>
        {materialNote && <span className="text-[10px] text-gray-400 uppercase tracking-wider">{materialNote}</span>}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const displayName = item.name || item.sku;
          const imageSrc = getPlayEquipmentImage(item);
          return (
            <div key={item.sku} className="border border-gray-100 overflow-hidden group hover:border-[#B89A4A] transition-all duration-300">
              <div className="aspect-square bg-gray-50 overflow-hidden">
                <img src={imageSrc} alt={displayName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-slate-900 mb-1">{displayName}</p>
                {item.dimensions && <p className="text-xs text-gray-500">{item.dimensions}</p>}
                <p className="text-[10px] text-gray-400 font-mono mt-1">{item.sku}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function OutdoorPlayClient() {
  const { data: apiData } = useChildwood();
  const catalog = apiData ?? [];

  const outdoor = (Array.isArray(catalog) ? catalog.filter((c: { type: string }) => c.type === "outdoor") : []) as Array<{ type: string; groups?: Array<{ name: string; items: Array<{ sku: string; name?: string; image: string; dimensions?: string }> }> }>;

  const getSections = (items: Array<{ groups?: Array<{ name: string; items: Array<any> }> }>) => {
    if (!Array.isArray(items)) return [];
    return items.flatMap((cat) =>
      (cat.groups ?? []).map((g: { name: string; items: Array<any> }) => ({
        title: g.name,
        items: g.items,
      }))
    );
  };

  const outdoorSections = getSections(outdoor);

  return (
    <>
      <section className="bg-primary-500 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="container-page">
          <Breadcrumb 
            items={[
              { label: "Products", href: "/products" }, 
              { label: "Childwood", href: "/products/childwood-children-play-equipment" }, 
              { label: "Outdoor Play Equipment" }
            ]} 
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B89A4A] mb-4">Childwood</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Outdoor Play Equipment</h1>
              <p className="text-lg text-gray-300 max-w-3xl leading-relaxed font-light">
                Complete range of outdoor play systems including multi-level playstations, spring rockers, see-saws, and swings. Built to withstand environmental conditions and heavy public usage.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-[4/3] bg-primary-600 border border-gray-700/50 overflow-hidden">
                <img
                  src="/assets/products/about_images.jpg"
                  alt="Outdoor Play Equipment"
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
          <div className="mb-8">
            <Link 
              href="/products/childwood-children-play-equipment" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B89A4A] hover:text-slate-950 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Childwood Categories</span>
            </Link>
          </div>

          <div id="outdoor">
            {outdoorSections.map((section) => (
              <CatalogSection key={section.title} title={section.title} items={section.items} materialNote={MATERIAL_NOTES[section.title]} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
