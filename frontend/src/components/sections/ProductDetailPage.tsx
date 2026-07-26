import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PRODUCT_DATA: Record<string, { title: string; category: string; description: string; features: string[]; heroImage?: string }> = {
  "indoor-digital-signage": {
    title: "Indoor Digital Signage",
    category: "Godspeed",
    description: "World class digital signage with extraordinary features. Heavy duty body and toughened glass surface can withstand impact. User changeable images and videos using exclusive software.",
    features: [
      "Floor Standing Series",
      "LG Digital Signage",
      "Wall Mounting Series",
      "Software-controlled content management",
      "Heavy duty construction",
      "Toughened glass surface",
    ],
    heroImage: "/assets/products/r1.jpg",
  },
  "smart-touch-table": {
    title: "Smart Touch Table",
    category: "Godspeed",
    description: "Multi-touch tables enabling advanced interaction between human and machine. Available in 32\", 42\" and 46\" sizes with 20-point foil touch, IR touch and capacitive touch options.",
    features: [
      "Large screens (30 inches) with excellent graphics resolution",
      "Internet connection (Ethernet, WiFi)",
      "Audio outputs",
      "Detection and interaction with objects",
      "2D and 3D design support",
      "Multi user and multi touch applications",
      "Toughened glass, aluminium frame, stainless steel",
      "Water proof IP 43 rating",
      "Android Quad core with 2GB RAM, full HD",
      "2 mobile phone charging ports",
    ],
    heroImage: "/assets/products/about_images.jpg",
  },
  "wayfinding-kiosk": {
    title: "Interactive Wayfinding Kiosk",
    category: "Godspeed",
    description: "Interactive wayfinding with intuitive interface, directory listing, shortest route guidance and attractive branding options. Deployed at Phoenix Marketcity malls across Mumbai, Pune and Bangalore.",
    features: [
      "Interactive map with block-based 2D display",
      "Directory listing with genre categorization",
      "Shortest route calculation",
      "Attractive branding when idle",
      "Applications: Retail, Healthcare, Airport, Corporate, Events, Museums, Hospitality",
    ],
    heroImage: "/assets/products/about_images.jpg",
  },
  "touch-screen-kiosk": {
    title: "Speed Touch Series Touch Screen Kiosk",
    category: "Godspeed",
    description: "Touch screen kiosks available from 19\" to 55\". Floor standing and half standing options with IR, resistance or capacitive touch. Industrial mother board with Windows/Android support.",
    features: [
      "Available sizes: 19\", 22\", 32\", 42\", 46\", 55\"",
      "IR touch / Capacitive touch options",
      "High transparency, scratch-proof, water proof",
      "Industry LED panel with HD image",
      "Ultra-thin enclosure design",
      "Windows and Android support",
      "4-10 dots touch support",
      "Customizable functions",
    ],
    heroImage: "/assets/products/about_images.jpg",
  },
  "video-wall": {
    title: "Video Wall",
    category: "Godspeed",
    description: "Godspeed LCD video wall adopted original A+ LCD Panel from Samsung and LG. Available in 42\", 46\" and 55\" with various brightness options from 450 to 700 nits.",
    features: [
      "Samsung/LG original A+ LCD panels",
      "Available in 42\", 46\", 55\"",
      "Brightness from 450 to 700 nits",
      "1920x1080 resolution",
      "16:9 display ratio",
      "16.7M colors",
      "178 degree viewing angle",
      "Splicing gap from 3.5mm to 10mm",
      "Single screen, full screen and screen switch modes",
    ],
    heroImage: "/assets/products/lcd.jpg",
  },
  tellus: {
    title: "Tellus Feedback Solution",
    category: "Tellus",
    description: "Customer feedback kiosk for restaurants and retail. Collects feedback electronically, sends instant text alerts for poor ratings with customer name and mobile number.",
    features: [
      "All feedback collected electronically",
      "Customize your own questions",
      "Download feedback in Excel for analysis",
      "Less than Rs 20 per day per branch",
      "Instant alert for negative feedback to owners by SMS",
      "Portal access for chain of outlets",
      "Measure staff performance across branches",
      "Product quality and consistency tracking",
      "Potential customer data collection",
      "Gift coupon management for loyal customers",
    ],
    heroImage: "/assets/products/X11C1367-200x300.jpg",
  },
  childwood: {
    title: "Childwood Children's Play Equipment",
    category: "Childwood",
    description: "Children's play equipment for indoor and outdoor spaces including gym equipment.",
    features: [
      "Outdoor play equipment",
      "Indoor play equipment",
      "Gym equipment",
      "Customizable solutions",
    ],
    heroImage: "/assets/products/about_images.jpg",
  },
};

export function ProductDetailPage({ slug }: { slug: string }) {
  const product = PRODUCT_DATA[slug];

  if (!product) {
    return (
      <section className="section-padding bg-white">
        <div className="container-page text-center">
          <h1 className="heading-lg text-primary-500 mb-4">Product Not Found</h1>
          <p className="text-gray-500 mb-8">The product you are looking for does not exist.</p>
          <Link href="/products" className="btn-primary">
            View All Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-primary-500 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{product.title}</h1>
              <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">{product.description}</p>
            </div>
            {product.heroImage && (
              <div className="hidden lg:block">
                <div className="aspect-[4/3] bg-primary-600 border border-gray-700/50 overflow-hidden">
                  <img
                    src={product.heroImage}
                    alt={product.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="max-w-4xl">
            <h2 className="heading-md text-primary-500 mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border border-gray-100 hover:border-label/40 transition-colors">
                  <div className="w-6 h-6 bg-label text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-gray-100">
            <h2 className="heading-sm text-primary-500 mb-6">Interested in {product.title}?</h2>
            <p className="text-gray-500 mb-6">
              Contact us for a free consultation and demonstration.
            </p>
            <Link href="/contact" className="btn-primary">
              Request a Demo
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}