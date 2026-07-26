import Link from "next/link";
import { ArrowRight, Monitor, Wifi, ShieldCheck, Clock, Users, Baby, Star, Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/ui/CTA";

const TESTIMONIALS = [
  {
    quote: "Sakthi Solutions helped us automate KOT with 16 Tablets across our outlets. Home Delivery, Takeaway and Phone orders with Customer tracking and SMS triggering helped us increase customer satisfaction significantly.",
    author: "Mr. Navaz Buhari",
    title: "Proprietor",
    company: "Buhari",
    rating: 5,
  },
  {
    quote: "Sakthi Solutions guided us through a complete technology upgrade from legacy PC-based systems to modern tablet-based KOT and touch POS machines at both our restaurants. The transition was smooth and the training took minimal time.",
    author: "Mr. Prasana Butt",
    title: "Owner",
    company: "Matsya, Egmore",
    rating: 5,
  },
  {
    quote: "We moved from a 10-year-old ECR system to modern technology. The tablet-based KOT, automatic email reporting and user-friendly interface made a real difference to our daily operations. Simple and effective.",
    author: "Mr. Ramesh",
    title: "Manager",
    company: "Doveton Cafe, Purasaiwakkam",
    rating: 5,
  },
];

const CLIENT_LOGOS = [
  "Buhari", "Matsya", "Doveton Cafe", "Phoenix Marketcity",
  "High Street Phoenix", "Samsung", "LG", "Epson",
];

const HERO_FEATURES = [
  { icon: <Monitor size={20} />, text: "Digital Signage & Video Walls" },
  { icon: <ShieldCheck size={20} />, text: "Interactive Kiosks" },
  { icon: <Wifi size={20} />, text: "IT Networking Consulting" },
  { icon: <Users size={20} />, text: "Feedback Solutions" },
];

const PRODUCT_CATEGORIES = [
  {
    title: "Godspeed Digital Signage",
    description: "World-class digital signage with heavy-duty body, toughened glass, software-controlled displays. Floor standing, wall mountable, touch screen and video walls.",
    href: "/products",
    icon: <Monitor size={28} />,
  },
  {
    title: "Tellus Feedback Solution",
    description: "Electronic customer feedback kiosks for restaurants and retail. Instant alerts for negative feedback, downloadable reports, and chain outlet management.",
    href: "/products/tellus",
    icon: <Users size={28} />,
  },
  {
    title: "Childwood Play Equipment",
    description: "Children's play equipment for indoor and outdoor spaces. Customizable solutions for restaurants, malls and entertainment centers.",
    href: "/products/childwood",
    icon: <Baby size={28} />,
  },
];

const WHY_SAKTHI = [
  { icon: <ShieldCheck size={24} />, title: "End-to-End Solutions", description: "Hardware, installation and IT consulting under one roof for hospitality, retail and corporate sectors." },
  { icon: <Clock size={24} />, title: "Prompt Service", description: "Service on all days, even after office hours. We understand that business never stops." },
  { icon: <Users size={24} />, title: "Partner, Not Vendor", description: "We put ourselves in your shoes so that you get the best technology solution for your business." },
  { icon: <Wifi size={24} />, title: "Free Consulting", description: "Professional IT networking consulting at no cost for new businesses. End-to-end guidance." },
];

const INDUSTRIES = [
  "Corporate Offices",
  "Hospitals & Healthcare",
  "Shopping Malls & Retail",
  "Hotels & Resorts",
  "Restaurants & Fine Dining",
  "Event Management",
  "Airports",
  "Museums",
  "Cafes & Coffee Shops",
  "Bars & Nightclubs",
  "Food Courts & QSR",
  "Entertainment Centers",
];

const TECHNOLOGY_PARTNERS = [
  { name: "Godspeed", type: "Digital Signage" },
  { name: "Samsung", type: "LCD Panels" },
  { name: "LG", type: "Digital Displays" },
  { name: "HP", type: "Servers" },
  { name: "DELL", type: "PCs" },
  { name: "Epson", type: "Printers" },
  { name: "Posiflex", type: "POS Hardware" },
];

export function HomePage() {
  return (
    <>
      <section className="bg-primary-500 text-white">
        <div className="container-page py-24 md:py-32 lg:py-36">
          <div className="max-w-3xl">
            <p className="inline-block text-xs font-bold uppercase tracking-widest text-[#f54337] bg-[#f54337]/10 px-3 py-1.5 border border-[#f54337]/30 mb-6">
              Since 2014 &mdash; Chennai &bull; Hospitality &amp; Retail IT Partner
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              Digital Signage, Kiosks<br />
              &amp; <span className="text-[#f54337]">IT Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
              Complete end-to-end technology partner for restaurants, hotels, retail outlets, and corporate spaces. High-performance hardware, customized digital displays, and 24/7 on-ground support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="bg-[#f54337] hover:bg-[#e12f23] text-white px-8 py-3.5 font-bold transition-all shadow-lg hover:shadow-red-500/20 text-base inline-flex items-center justify-center">
                Explore Products
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link href="/contact" className="border-2 border-white/80 text-white px-8 py-3.5 font-semibold hover:bg-white hover:text-[#1a1a2e] transition-all text-base inline-flex items-center justify-center">
                Book Free IT Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Propertism-style Trust Strip */}
        <div className="relative z-10 border-t border-gray-800 bg-[#121224]/80 backdrop-blur-sm">
          <div className="container-page py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {HERO_FEATURES.map((f) => (
                <div key={f.text} className="flex items-center gap-3 text-sm text-gray-200">
                  <span className="p-2 bg-[#f54337]/10 border border-[#f54337]/30 text-[#f54337] shrink-0">{f.icon}</span>
                  <span className="font-medium leading-snug">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeader
            label="What We Offer"
            title="Products & Solutions"
            subtitle="International-grade hardware and signage solutions for hospitality, retail and corporate sectors"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Card key={cat.title} {...cat} icon={cat.icon} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <SectionHeader
            label="Why Choose Us"
            title="The Sakthi Advantage"
            subtitle="We put ourselves in your shoes so that you get the best technology solution"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_SAKTHI.map((item) => (
              <div key={item.title} className="card text-center">
                <div className="w-14 h-14 bg-accent-50 flex items-center justify-center mx-auto mb-4 text-accent-500">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-primary-500 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeader
            label="Industries We Serve"
            title="Trusted Across Sectors"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {INDUSTRIES.map((industry) => (
              <div key={industry} className="flex items-center gap-3 p-4 border border-gray-100 hover:border-accent-200 transition-colors">
                <div className="w-2 h-2 bg-accent-500 shrink-0" />
                <span className="text-sm font-medium text-gray-700">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <SectionHeader
            label="Technology Partners"
            title="Backed by Global Brands"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TECHNOLOGY_PARTNERS.map((partner) => (
              <div key={partner.name} className="card text-center">
                <div className="text-2xl font-bold text-primary-500 mb-1">{partner.name}</div>
                <div className="text-sm text-gray-500">{partner.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">About Sakthi Solutions</p>
              <h2 className="heading-lg text-primary-500 mb-6">
                Your Technology Partner Since 2014
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Sakthi Solutions provides end-to-end IT consulting and digital signage solutions
                for hospitality, retail and corporate sectors. The company was formed in 2014 by a
                team with 25+ years of experience in sales, retail, packaging, industrial automation
                and hospitality.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We represent Godspeed, a world-class digital signage manufacturer with
                units in Hong Kong and China, providing solutions for corporates, hospitals,
                hotels, restaurants, malls and event management companies.
              </p>
              <Link href="/about" className="btn-secondary">
                Learn More About Us
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="card text-center">
                <div className="text-3xl font-bold text-primary-500 mb-1">10+</div>
                <div className="text-sm text-gray-500">Years of Experience</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-primary-500 mb-1">3</div>
                <div className="text-sm text-gray-500">Product Lines</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-primary-500 mb-1">12+</div>
                <div className="text-sm text-gray-500">Industries Served</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-primary-500 mb-1">7+</div>
                <div className="text-sm text-gray-500">Technology Partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <SectionHeader
            label="Testimonials"
            title="What Our Clients Say"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="card bg-white border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-accent-500 text-accent-500" />
                  ))}
                </div>
                <div className="mb-4">
                  <Quote size={24} className="text-accent-200" />
                </div>
                <blockquote className="text-sm text-gray-600 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <div className="font-semibold text-primary-500">{t.author}</div>
                  <div className="text-xs text-gray-500">{t.title}, {t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white border-t border-gray-100">
        <div className="container-page">
          <SectionHeader
            label="Trusted By"
            title="Our Clients"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {CLIENT_LOGOS.map((name) => (
              <div key={name} className="flex items-center justify-center h-16 px-4 border border-gray-100 bg-surface-muted">
                <span className="text-sm font-semibold text-gray-500 text-center leading-tight">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Ready to Transform Your Business?"
        subtitle="Get a free consultation and discover how Sakthi Solutions can streamline your operations with the right technology."
        primaryLabel="Contact Us Today"
        primaryHref="/contact"
        secondaryLabel="View Products"
        secondaryHref="/products"
      />
    </>
  );
}