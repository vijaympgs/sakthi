import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CHILDWOOD_CATALOG } from "@/lib/childwoodData";

function CatalogSection({ title, items }: { title: string; items: Array<{ sku: string; name?: string; image: string; dimensions?: string }> }) {
  return (
    <div className="mb-16">
      <h3 className="heading-sm text-primary-500 mb-6 pb-3 border-b border-gray-200">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.sku} className="border border-gray-100 overflow-hidden">
            <div className="aspect-square bg-gray-50 overflow-hidden">
              <img src={item.image} alt={item.name || item.sku} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-3">
              <p className="text-xs text-accent-500 font-mono mb-1">{item.sku}</p>
              {item.name && <p className="text-sm font-medium text-primary-500">{item.name}</p>}
              {item.dimensions && <p className="text-xs text-gray-500 mt-1">{item.dimensions}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChildwoodPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          { label: "Childwood Play Equipment" },
        ]}
      />

      <section className="bg-primary-500 text-white py-20 md:py-28">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400 mb-4">Childwood</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Children&apos;s Play Equipment</h1>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            Indoor and outdoor children&apos;s play equipment, gym equipment, spring rockers,
            see-saws, swings, slides, rideons, tunnels and floorings. Customizable solutions
            for restaurants, malls, schools and entertainment centers.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="border border-gray-100 p-6">
              <h2 className="heading-sm text-primary-500 mb-3">Outdoor Play Equipment</h2>
              <p className="text-sm text-gray-600 mb-4">
                Complete range of outdoor play equipment including playstations, spring rockers,
                see-saws and swings. 62 products available with various sizes and configurations.
              </p>
              <a href="#outdoor" className="text-sm font-medium text-accent-500 hover:text-accent-600">
                View Outdoor Products
              </a>
            </div>
            <div className="border border-gray-100 p-6">
              <h2 className="heading-sm text-primary-500 mb-3">Indoor Play Equipment</h2>
              <p className="text-sm text-gray-600 mb-4">
                Complete range of indoor play equipment including playstations, rideons, tunnels,
                slides, swing combos and floorings. 34 products available.
              </p>
              <a href="#indoor" className="text-sm font-medium text-accent-500 hover:text-accent-600">
                View Indoor Products
              </a>
            </div>
          </div>

          <div id="outdoor">
            <h2 className="heading-lg text-primary-500 mb-12">Outdoor Play Equipment</h2>
            {CHILDWOOD_CATALOG.outdoor.map((category) => (
              <CatalogSection key={category.title} title={category.title} items={category.items} />
            ))}
          </div>

          <div id="indoor" className="mt-20">
            <h2 className="heading-lg text-primary-500 mb-12">Indoor Play Equipment</h2>
            {CHILDWOOD_CATALOG.indoor.map((category) => (
              <CatalogSection key={category.title} title={category.title} items={category.items} />
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