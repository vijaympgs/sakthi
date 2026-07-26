import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Indoor Digital Signage - Sakthi Solutions | Floor Standing, Wall Mounting & LG Displays",
  description: "Godspeed indoor digital signage solutions including floor standing series, wall mounting series and LG commercial displays. Heavy-duty body, toughened glass, full HD resolution. For corporate, retail and hospitality.",
};

const SUB_PRODUCTS = [
  {
    title: "Floor Standing Series",
    description: "Round corner design floor standing digital signage. Available in 42\", 46\", 55\" and 65\" sizes with high brightness and full HD resolution.",
    href: "/products/indoor-digital-signage/floor-standing",
    image: "/assets/products/r1.jpg",
  },
  {
    title: "LG Digital Signage",
    description: "LG branded commercial displays with enterprise-grade reliability, slim bezel design and centralized content management.",
    href: "/products/indoor-digital-signage/lg-digital-signage",
    image: "/assets/products/lcd.jpg",
  },
  {
    title: "Wall Mounting Series",
    description: "Slim wall mounted indoor LCD advertising player. Available from 22\" to 70\" with network version for remote content management.",
    href: "/products/indoor-digital-signage/wall-mounting",
    image: "/assets/products/r2.jpg",
  },
];

export default function IndoorDigitalSignagePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          { label: "Godspeed", href: "/products" },
          { label: "Indoor Digital Signage" },
        ]}
      />

      <section className="bg-primary-500 text-white py-20 md:py-28">
        <div className="container-page">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400 mb-4">Godspeed</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Indoor Digital Signage</h1>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            World class digital signage with extraordinary features. Heavy duty body and toughened glass surface
            can withstand impact. User changeable images and videos using exclusive software. Provides floor standing,
            wall mountable and custom display solutions.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUB_PRODUCTS.map((product) => (
              <Link key={product.title} href={product.href} className="card group">
                <div className="aspect-video bg-gray-50 overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-primary-500 mb-2 group-hover:text-accent-500 transition-colors">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500">{product.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page text-center max-w-2xl">
          <h2 className="heading-sm text-primary-500 mb-4">Need Help Choosing the Right Digital Signage?</h2>
          <p className="text-gray-500 mb-6">Our team can help you select the perfect solution for your space and requirements.</p>
          <Link href="/contact" className="btn-primary">Get Consultation</Link>
        </div>
      </section>
    </>
  );
}