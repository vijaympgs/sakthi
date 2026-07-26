import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CHILDWOOD_CATALOG } from "@/lib/childwoodData";

export const metadata: Metadata = {
  title: "Playstations Gallery - Sakthi Solutions | Childwood Play Equipment",
  description: "Browse our gallery of Childwood children's play equipment. Outdoor playstations, spring rockers, swings, indoor playstations, rideons, tunnels, slides and floorings.",
};

const CATEGORY_META: Record<string, { subtitle: string }> = {
  Playstations: { subtitle: "Multi-activity outdoor playstations with slides, climbing walls and interactive elements" },
  "Spring Rockers": { subtitle: "Spring-mounted rockers in animal and vehicle designs for toddlers" },
  "See Saw": { subtitle: "Balance see-saw equipment for outdoor playgrounds" },
  Swings: { subtitle: "Swing sets with toddler seats, flat seats and belt swings" },
  "Indoor Playstations": { subtitle: "Compact playstations designed for indoor play areas in restaurants and malls" },
  "Rockons & Rideons": { subtitle: "Rocking and riding toys for indoor play areas" },
  Tunnels: { subtitle: "Crawl tunnels for indoor play and sensory development" },
  "Slides & Combos": { subtitle: "Indoor slides and combination play structures" },
  Floorings: { subtitle: "EVA mat floorings for safe indoor play surfaces" },
};

export default function PlaystationsGalleryPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Playstations Gallery" }]} />

      <section className="bg-primary-500 text-white py-16 md:py-20">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400 mb-4">Gallery</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Playstations Gallery</h1>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            Product images of Childwood children&apos;s play equipment. Browse our range of outdoor and indoor play solutions
            for restaurants, malls, schools and entertainment centers.
          </p>
        </div>
      </section>

      {Object.entries(CHILDWOOD_CATALOG).map(([category, groups]) => (
        <section key={category} className={`section-padding ${category === "outdoor" ? "bg-white" : "bg-surface-muted"}`}>
          <div className="container-page">
            <h2 className="heading-md text-primary-500 mb-2 capitalize">{category} Equipment</h2>
            {groups.map((group) => {
              const meta = CATEGORY_META[group.title];
              return (
                <div key={group.title} className="mt-8">
                  <h3 className="heading-sm text-primary-500 mb-2">{group.title}</h3>
                  {meta && <p className="text-sm text-gray-500 mb-6">{meta.subtitle}</p>}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {group.items.map((item) => (
                      <div key={item.sku} className="border border-gray-100 bg-white overflow-hidden">
                        <div className="aspect-square bg-gray-50 overflow-hidden">
                          <img
                            src={item.image}
                            alt={`${group.title} - ${item.sku}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-3">
                          <p className="text-xs font-semibold text-primary-500">{item.sku}</p>
                          {"name" in item && item.name && <p className="text-xs text-gray-500 mt-0.5">{item.name}</p>}
                          {"dimensions" in item && item.dimensions && <p className="text-xs text-gray-400 mt-0.5">{item.dimensions}</p>}
                        </div>
                      </div>
                    ))}
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
