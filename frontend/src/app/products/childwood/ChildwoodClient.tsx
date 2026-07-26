"use client";

import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useChildwood } from "@/hooks/useQueries";
//

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

function CatalogSection({ title, items, materialNote }: { title: string; items: Array<{ sku: string; name?: string; image: string; dimensions?: string }>; materialNote?: string }) {
  return (
    <div className="mb-16">
      <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-gray-200">
        <h3 className="heading-sm text-primary-500">{title}</h3>
        {materialNote && <span className="text-[10px] text-gray-400 uppercase tracking-wider">{materialNote}</span>}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const displayName = item.name || SKU_NAMES[item.sku] || title;
          return (
            <div key={item.sku} className="border border-gray-100 overflow-hidden group hover:-translate-y-1 transition-transform duration-200">
              <div className="aspect-square bg-gray-50 overflow-hidden">
                <img src={item.image} alt={displayName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-primary-500 mb-1">{displayName}</p>
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

export function ChildwoodClient() {
  const { data: apiData } = useChildwood();
  const catalog = apiData ?? [];

  const outdoor = (Array.isArray(catalog) ? catalog.filter((c: { type: string }) => c.type === "outdoor") : []) as Array<{ type: string; groups?: Array<{ name: string; items: Array<{ sku: string; name?: string; image: string; dimensions?: string }> }> }>;
  const indoor = (Array.isArray(catalog) ? catalog.filter((c: { type: string }) => c.type === "indoor") : []) as Array<{ type: string; groups?: Array<{ name: string; items: Array<{ sku: string; name?: string; image: string; dimensions?: string }> }> }>;

  const getSections = (items: Array<{ groups?: Array<{ name: string; items: Array<unknown> }> }>) => {
    if (!Array.isArray(items)) return [];
    return items.flatMap((cat) =>
      (cat.groups ?? []).map((g: { name: string; items: Array<unknown> }) => ({
        title: g.name,
        items: g.items,
      }))
    );
  };

  const outdoorSections = getSections(outdoor);
  const indoorSections = getSections(indoor);

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
                Indoor and outdoor children&apos;s play equipment, gym equipment, spring rockers,
                see-saws, swings, slides, rideons, tunnels and floorings. Customizable solutions
                for restaurants, malls, schools and entertainment centers.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-[4/3] bg-primary-600 border border-gray-700/50 overflow-hidden">
                <img
                  src="/assets/products/about_images.jpg"
                  alt="Childwood Play Equipment"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="border border-gray-100 p-6 hover:border-label/40 transition-colors">
              <h2 className="heading-sm text-primary-500 mb-3">Outdoor Play Equipment</h2>
              <p className="text-sm text-gray-600 mb-4">
                Complete range of outdoor play equipment including playstations, spring rockers,
                see-saws and swings. 62 products available with various sizes and configurations.
              </p>
              <a href="#outdoor" className="text-sm font-medium text-label hover:text-label/80">View Outdoor Products</a>
            </div>
            <div className="border border-gray-100 p-6 hover:border-label/40 transition-colors">
              <h2 className="heading-sm text-primary-500 mb-3">Indoor Play Equipment</h2>
              <p className="text-sm text-gray-600 mb-4">
                Complete range of indoor play equipment including playstations, rideons, tunnels,
                slides, swing combos and floorings. 34 products available.
              </p>
              <a href="#indoor" className="text-sm font-medium text-label hover:text-label/80">View Indoor Products</a>
            </div>
          </div>

          <div id="outdoor">
            <h2 className="heading-lg text-primary-500 mb-12">Outdoor Play Equipment</h2>
            {(outdoorSections as Array<{ title: string; items: Array<{ sku: string; name?: string; image: string; dimensions?: string }> }>).map((section) => (
              <CatalogSection key={section.title} title={section.title} items={section.items} materialNote={MATERIAL_NOTES[section.title]} />
            ))}
          </div>

          <div id="indoor" className="mt-20">
            <h2 className="heading-lg text-primary-500 mb-12">Indoor Play Equipment</h2>
            {(indoorSections as Array<{ title: string; items: Array<{ sku: string; name?: string; image: string; dimensions?: string }> }>).map((section) => (
              <CatalogSection key={section.title} title={section.title} items={section.items} materialNote={MATERIAL_NOTES[section.title]} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page text-center max-w-2xl">
          <h2 className="heading-sm text-primary-500 mb-4">Need Play Equipment for Your Space?</h2>
          <p className="text-gray-500 mb-6">Contact us for custom configurations, site planning and bulk pricing.</p>
          <Link href="/contact" className="btn-primary">Request a Quote</Link>
        </div>
      </section>
    </>
  );
}