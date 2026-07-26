import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Monitor, Table, Map, Smartphone, Layout } from "lucide-react";

export const metadata: Metadata = {
  title: "Godspeed Digital Signage - Sakthi Solutions | Premium Display Solutions",
  description: "Godspeed digital signage products: indoor displays, smart touch tables, wayfinding kiosks, touch screen kiosks and video walls. World-class manufacturing in Hong Kong and China.",
};

const GODSPEED_PRODUCTS = [
  {
    title: "Indoor Digital Signage",
    description: "Floor standing and wall mounting digital signage with high brightness, full HD resolution and heavy-duty toughened glass design.",
    href: "/products/indoor-digital-signage",
    icon: <Monitor size={28} />,
    subProducts: ["Floor Standing Series", "Wall Mounting Series", "LG Digital Signage"],
  },
  {
    title: "Smart Touch Table",
    description: "Multi-touch interactive tables in 32\", 42\" and 46\" with 20-point touch. Also available in 21.5\" Android variant for restaurants and retail.",
    href: "/products/smart-touch-table",
    icon: <Table size={28} />,
    subProducts: ["32\" GS-TT-32", "42\" GS-TT-42", "46\" GS-TT-46", "21.5\" Android"],
  },
  {
    title: "Interactive Wayfinding Kiosk",
    description: "Directory, map and shortest-route guidance for malls, hospitals, airports and corporate campuses. Deployed at Phoenix Marketcity across India.",
    href: "/products/wayfinding-kiosk",
    icon: <Map size={28} />,
    subProducts: ["Retail", "Healthcare", "Airport", "Corporate", "Events"],
  },
  {
    title: "Speed Touch Series Kiosk",
    description: "Touch screen kiosks from 19\" to 55\" with IR and capacitive touch. Floor standing and half standing configurations for education, retail and public spaces.",
    href: "/products/touch-screen-kiosk",
    icon: <Smartphone size={28} />,
    subProducts: ["19\" GS-TK19", "22\" GS-TK22", "32\" GS-TK32", "42\" GS-TK42", "46\" GS-TK46", "55\" GS-TK55"],
  },
  {
    title: "Video Wall",
    description: "Samsung and LG LCD video wall solutions in 42\", 46\" and 55\" with ultra-thin bezel splicing. Ideal for security, retail and events.",
    href: "/products/video-wall",
    icon: <Layout size={28} />,
    subProducts: ["6.7mm Gap", "5.3mm Gap", "3.5mm Gap", "10mm Gap"],
  },
];

export default function GodspeedPage() {
  return (
    <>
      <section className="bg-primary-500 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="container-page">
          <Breadcrumb
            items={[
              { label: "Products", href: "/products" },
              { label: "Godspeed" },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">Products</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Godspeed Digital Signage</h1>
              <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
                World-class digital signage from Hong Kong and China. Heavy-duty displays with toughened glass,
                software-controlled content management, and solutions for hospitality, retail, corporate,
                healthcare, malls and events.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-[4/3] bg-primary-600 border border-gray-700/50 overflow-hidden">
                <img
                  src="/assets/products/r1.jpg"
                  alt="Godspeed Digital Signage"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GODSPEED_PRODUCTS.map((product) => (
              <Link key={product.title} href={product.href} className="card group border border-gray-100 hover:border-label/40 transition-colors hover:-translate-y-1 transition-transform duration-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary-50 flex items-center justify-center text-primary-500 shrink-0 group-hover:bg-label/10 group-hover:text-label transition-colors">
                    {product.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary-500 group-hover:text-label transition-colors">{product.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.subProducts.map((sp) => (
                    <span key={sp} className="text-xs bg-surface-muted text-gray-600 px-2 py-1">{sp}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page text-center max-w-2xl">
          <h2 className="heading-sm text-primary-500 mb-4">Need Help Choosing the Right Digital Signage?</h2>
          <p className="text-gray-500 mb-6">Our team can help you select the perfect Godspeed solution for your space and requirements.</p>
          <Link href="/contact" className="btn-primary">Get Consultation</Link>
        </div>
      </section>
    </>
  );
}