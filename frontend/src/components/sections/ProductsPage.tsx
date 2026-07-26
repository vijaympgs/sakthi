import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Monitor, Users, Baby, ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    name: "Godspeed",
    slug: "godspeed",
    description: "World-class digital signage from Hong Kong & China. Heavy-duty displays with software control.",
    icon: <Monitor size={32} />,
    products: [
      { name: "Indoor Digital Signage", slug: "indoor-digital-signage", description: "Floor standing, wall mountable and LG digital signage for corporate and retail." },
      { name: "Smart Touch Table", slug: "smart-touch-table", description: "Multi-touch interactive tables for restaurants, retail and customer interaction." },
      { name: "Wayfinding Kiosk", slug: "wayfinding-kiosk", description: "Interactive wayfinding with directory, map and route guidance for malls and hospitals." },
      { name: "Touch Screen Kiosk", slug: "touch-screen-kiosk", description: "Speed Touch series kiosks from 19\" to 55\" for education, retail and public spaces." },
      { name: "Video Wall", slug: "video-wall", description: "Samsung/LG LCD video walls in 42\", 46\" and 55\" for security, retail and events." },
    ],
  },
  {
    name: "Tellus",
    slug: "tellus",
    description: "Customer feedback kiosk solution for restaurants and retail outlets.",
    icon: <Users size={32} />,
    products: [
      { name: "Tellus Feedback Solution", slug: "tellus", description: "Electronic feedback collection with instant alerts, downloadable reports and chain outlet support." },
    ],
  },
  {
    name: "Childwood",
    slug: "childwood",
    description: "Children's play equipment for indoor and outdoor spaces.",
    icon: <Baby size={32} />,
    products: [
      { name: "Outdoor Play Equipment", slug: "childwood", description: "Outdoor children's play equipment and gym equipment." },
      { name: "Indoor Play Equipment", slug: "childwood", description: "Indoor children's play equipment for restaurants, malls and entertainment centers." },
    ],
  },
];

export function ProductsPage() {
  return (
    <>
      <section className="bg-primary-500 text-white py-20 md:py-28">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400 mb-4">Our Products</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Digital Signage &<br />Hardware Solutions</h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            International-grade products for digital signage, interactive kiosks,
            feedback solutions, play equipment and more.
          </p>
        </div>
      </section>

      {CATEGORIES.map((category, catIdx) => (
        <section key={category.slug} className={`section-padding ${catIdx % 2 === 0 ? "bg-white" : "bg-surface-muted"}`}>
          <div className="container-page">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-accent-50 flex items-center justify-center text-accent-500">
                {category.icon}
              </div>
              <div>
                <h2 className="heading-md text-primary-500">{category.name}</h2>
                <p className="text-gray-500">{category.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`} className="card group">
                  <h3 className="font-semibold text-primary-500 mb-2 group-hover:text-accent-500 transition-colors">
                    {product.name}
                  </h3>
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
      ))}
    </>
  );
}