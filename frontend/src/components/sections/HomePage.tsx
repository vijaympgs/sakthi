"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Monitor,
  Users,
  Baby,
  Star,
  Quote,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Award,
  Shield,
  Clock,
  CheckCircle2,
  Briefcase,
  Activity,
  ShoppingBag,
  Hotel,
  Utensils,
  Calendar,
  Plane,
  Coffee,
  GlassWater,
  Pizza,
  Gamepad2,
  Building
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTA } from "@/components/ui/CTA";
import { CountUp } from "@/components/ui/CountUp";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  useTestimonials,
  usePartners,
  useProductCategories,
  useIndustries,
  useCompanyInfo,
  useClients
} from "@/hooks/useQueries";

function ScrollReveal({ children, className = "", stagger = false }: { children: React.ReactNode; className?: string; stagger?: boolean }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);
  return (
    <div ref={ref} className={`${stagger ? "scroll-reveal-stagger" : "scroll-reveal"} ${isVisible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

const getCategoryIcon = (slug?: string) => {
  switch (slug) {
    case "godspeed":
      return <Monitor className="w-6 h-6 text-[#B89A4A]" />;
    case "tellus":
      return <Users className="w-6 h-6 text-[#B89A4A]" />;
    case "childwood":
      return <Baby className="w-6 h-6 text-[#B89A4A]" />;
    default:
      return <Monitor className="w-6 h-6 text-[#B89A4A]" />;
  }
};

const getCategoryFallbackImage = (slug?: string) => {
  switch (slug) {
    case "godspeed":
      return "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80";
    case "tellus":
      return "https://images.unsplash.com/photo-1552581230-c01bc0d48453?auto=format&fit=crop&w=800&q=80";
    case "childwood":
      return "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80";
    default:
      return "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80";
  }
};

const getCategoryImage = (cat: any) => {
  if (!cat.image) {
    return getCategoryFallbackImage(cat.slug);
  }
  if (cat.image.startsWith("http://") || cat.image.startsWith("https://")) {
    return cat.image;
  }
  const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");
  return `${apiBase}${cat.image.startsWith("/") ? "" : "/"}${cat.image}`;
};


const getIndustryIcon = (name: string) => {
  const cleanName = name.toLowerCase();
  if (cleanName.includes("office") || cleanName.includes("corporate")) {
    return <Briefcase className="w-8 h-8" />;
  }
  if (cleanName.includes("hospital") || cleanName.includes("health")) {
    return <Activity className="w-8 h-8" />;
  }
  if (cleanName.includes("mall") || cleanName.includes("retail")) {
    return <ShoppingBag className="w-8 h-8" />;
  }
  if (cleanName.includes("hotel") || cleanName.includes("resort")) {
    return <Hotel className="w-8 h-8" />;
  }
  if (cleanName.includes("restaurant") || cleanName.includes("dining")) {
    return <Utensils className="w-8 h-8" />;
  }
  if (cleanName.includes("event") || cleanName.includes("museum")) {
    return <Calendar className="w-8 h-8" />;
  }
  if (cleanName.includes("airport")) {
    return <Plane className="w-8 h-8" />;
  }
  if (cleanName.includes("cafe") || cleanName.includes("coffee")) {
    return <Coffee className="w-8 h-8" />;
  }
  if (cleanName.includes("bar") || cleanName.includes("club")) {
    return <GlassWater className="w-8 h-8" />;
  }
  if (cleanName.includes("food") || cleanName.includes("qsr")) {
    return <Pizza className="w-8 h-8" />;
  }
  if (cleanName.includes("entertainment")) {
    return <Gamepad2 className="w-8 h-8" />;
  }
  return <Building className="w-8 h-8" />;
};

export function HomePage() {
  const { data: apiTestimonials } = useTestimonials();
  const { data: apiPartners } = usePartners();
  const { data: apiCategories } = useProductCategories();
  const { data: apiIndustries } = useIndustries();
  const { data: companyInfo } = useCompanyInfo();
  const { data: apiClients } = useClients();

  const [testiIndex, setTestiIndex] = useState(0);

  const testimonials = apiTestimonials ?? [];
  const partners = apiPartners ?? [];
  const categories = apiCategories ?? [];
  const industries: string[] = apiIndustries ? apiIndustries.map((i: { name: string }) => i.name) : [];
  const clients = apiClients ?? [];

  const nextTesti = () => {
    if (testimonials.length === 0) return;
    setTestiIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTesti = () => {
    if (testimonials.length === 0) return;
    setTestiIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const yearsOfExperience = companyInfo?.founded_year
    ? new Date().getFullYear() - companyInfo.founded_year
    : 12;
  const productLines = categories.length || 3;
  const industriesServed = industries.length || 12;
  const technologyPartners = partners.length || 7;

  const heroTitle = companyInfo?.hero_title || "Digital Signage, Kiosks\n& IT Solutions";
  const heroDescription = companyInfo?.hero_description || "Complete end-to-end technology partner for restaurants, hotels, retail outlets, and corporate spaces. High-performance hardware, customized digital displays, and 24/7 on-ground support.";

  const trustChips = companyInfo?.trust_chips && companyInfo.trust_chips.length > 0
    ? companyInfo.trust_chips
    : [
      { icon: "→", text: "Digital Signage & Video Walls" },
      { icon: "→", text: "Interactive Kiosks" },
      { icon: "→", text: "IT Networking Consulting" },
      { icon: "→", text: "Feedback Solutions" },
    ];

  const renderStatValue = (val: string) => {
    // If the value contains "/" (e.g. "24/7"), render as plain text to avoid mangling
    if (val.includes("/")) {
      return val;
    }
    const num = parseInt(val.replace(/[^0-9]/g, ""), 10);
    const suffix = val.replace(/[0-9]/g, "");
    if (isNaN(num)) {
      return val;
    }
    return <CountUp end={num} suffix={suffix} />;
  };

  return (
    <>
      <section
        className="relative h-[72vh] min-h-[72vh] flex flex-col justify-end items-center overflow-hidden bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${companyInfo?.hero_bg_image || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"})` }}
      >
        {/* Dark overlay to ensure readability */}
        <div className="absolute inset-0 bg-slate-950/85 z-0" />

        <div className="container-page flex flex-col items-center justify-center text-center z-10 w-full mx-auto pb-10">
          <div className="max-w-4xl mx-auto animate-fade-up flex flex-col items-center">
            <p className="text-xs font-bold italic uppercase tracking-[0.22em] text-[#E4C36A] mb-4">
              Since 2014 &mdash; Chennai &bull; Hospitality &amp; Retail IT Partner
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.65rem] font-extrabold leading-[1.1] tracking-tight mb-4 whitespace-pre-line text-white">
              {heroTitle.includes("&") ? (
                <>
                  <span className="block">
                    {heroTitle.split("&")[0].includes("Digital Signage") ? (
                      <>
                        <span className="text-5xl md:text-6xl lg:text-[4.4rem] font-black tracking-tight text-white block md:inline mb-2 md:mb-0">
                          Digital Signage
                        </span>
                        <span className="text-4xl md:text-5xl lg:text-[3.65rem] font-extrabold tracking-tight text-white">
                          {heroTitle.split("&")[0].replace("Digital Signage", "")}
                        </span>
                      </>
                    ) : (
                      <span className="text-white">{heroTitle.split("&")[0]}</span>
                    )}
                  </span>
                  <span className="block mt-[0.5em]">
                    &amp; <span className="text-[#E4C36A] font-serif italic font-normal">{heroTitle.split("&")[1]}</span>
                  </span>
                </>
              ) : (
                <span className="text-white">{heroTitle}</span>
              )}
            </h1>


            {/* Premium Gold Divider with Diamond */}
            <div className="flex items-center justify-center my-6 w-full">
              <div className="w-24 h-px bg-[#E4C36A]/50" />
              <div className="w-2.5 h-2.5 mx-3 bg-[#E4C36A] rotate-45 border border-white shrink-0" />
              <div className="w-24 h-px bg-[#E4C36A]/50" />
            </div>

            <p className="text-base md:text-lg text-gray-200 max-w-3xl mb-8 leading-relaxed whitespace-pre-line font-light">
              {heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <Link
                href="/products"
                className="bg-[#E4C36A] hover:bg-transparent text-[#0B0F1A] hover:text-[#E4C36A] border border-[#E4C36A] font-bold px-8 py-3.5 transition-colors text-xs uppercase tracking-widest inline-flex items-center justify-center shadow-lg"
              >
                Explore Products
                <ArrowRight size={14} className="ml-2" />
              </Link>
              <Link
                href="/contact"
                className="border border-white/60 text-white hover:bg-white hover:text-[#0B0F1A] hover:border-white transition-all text-xs font-semibold uppercase tracking-wide px-5 py-3.5 inline-flex items-center justify-center"
              >
                Book Free IT Consultation
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Premium Propertism-style Trust Strip */}
      <section className="border-y border-[#B89A4A] grid grid-cols-1 lg:grid-cols-2 text-slate-900 bg-white h-auto lg:h-[18vh] min-h-[18vh] overflow-hidden">
        {/* Left side: Performance Metrics (4 columns) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:border-r lg:border-[#B89A4A] h-full">
          {[
            { value: "12+", label: "Years Experience" },
            { value: "500+", label: "Projects Completed" },
            { value: "150+", label: "Happy Clients" },
            { value: "24/7", label: "On-Ground Support" }
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`p-3 flex flex-col justify-center text-center md:text-left relative min-h-[9vh] lg:min-h-0 h-full transition-all duration-300 hover:bg-slate-50/85 hover:-translate-y-0.5 hover:shadow-inner cursor-default ${i % 2 === 0 ? "bg-white" : "bg-slate-50"
                } ${i < 3 ? "border-r border-[#B89A4A]/25" : ""}`}
            >
              <span className="block font-serif font-extrabold text-xl md:text-2xl text-slate-900 leading-none mb-1">
                {renderStatValue(stat.value)}
              </span>
              <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-500 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Right side: Brand Pillars (2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {[
            { title: "Why Clients Partner With Us", desc: "High-performance hardware, customized digital signage, and prompt local support." },
            { title: "Trust & Transparency", desc: "Direct OEM collaborations and certified engineering professionals." }
          ].map((pillar, i) => (
            <div
              key={pillar.title}
              className={`p-3 flex flex-col justify-center text-center md:text-left relative min-h-[9vh] lg:min-h-0 h-full transition-all duration-300 hover:bg-slate-50/85 hover:-translate-y-0.5 hover:shadow-inner cursor-default ${i % 2 === 0 ? "bg-white" : "bg-slate-50"
                } ${i === 0 ? "border-r border-[#B89A4A]/25" : ""}`}
            >
              <span className="block font-serif font-bold text-sm text-slate-900 leading-tight mb-1">
                {pillar.title}
              </span>
              <span className="block text-[11px] text-gray-500 leading-normal font-normal">
                {pillar.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Redesigned Products & Solutions Section */}
      <ScrollReveal>
        <section className="section-padding bg-slate-50">
          <div className="container-page">
            <SectionHeader
              title="Products &amp; Solutions"
              subtitle="International-grade hardware and digital signage solutions custom-engineered for modern hospitality, retail, and corporate sectors."
              showLabel={false}
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {categories.map((cat: any, i: number) => {
                const icon = getCategoryIcon(cat.slug);
                const image = getCategoryImage(cat);
                return (
                  <div
                    key={cat.slug ?? i}
                    className="flex flex-col bg-white border border-gray-200/80 hover:border-[#B89A4A] transition-all duration-300 group hover:shadow-lg relative overflow-hidden"
                  >
                    {/* Visual aspect header — double gold border frame */}
                    <div className="h-56 w-full overflow-hidden relative bg-slate-100 shrink-0 border border-[#B89A4A]/35">
                      <div className="absolute inset-[5px] border border-[#B89A4A]/20 z-10 pointer-events-none" />
                      <img
                        src={image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                      />
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors duration-300" />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-3 shadow-md z-20">
                        {icon}
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        {cat.tagline && (
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#B89A4A] mb-1.5">{cat.tagline}</p>
                        )}
                        <h3 className="font-serif font-bold text-xl text-slate-950 mb-2 group-hover:text-[#B89A4A] transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-gray-500 text-xs leading-relaxed mb-6 font-normal">
                          {cat.description}
                        </p>

                        {/* Sub-products grid listing for rich visual hierarchy */}
                        {cat.products && cat.products.length > 0 && (
                          <div className="mb-6">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">Key Product Lines</p>
                            <ul className="space-y-1.5">
                              {cat.products.slice(0, 4).map((prod: any) => (
                                <li key={prod.slug} className="flex items-center text-xs font-semibold text-slate-700 hover:text-[#B89A4A] transition-colors">
                                  <span className="w-1.5 h-1.5 bg-[#B89A4A] mr-2 shrink-0" />
                                  <Link href={`/products/${prod.slug}`}>
                                    {prod.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Explore CTA */}
                      <Link
                        href={`/products/${cat.slug}`}
                        className="w-full text-center border-t border-gray-100 pt-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B89A4A] group-hover:text-slate-950 transition-colors"
                      >
                        <span>Explore Collection</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Redesigned The Sakthi Advantage Section */}
      <ScrollReveal stagger>
        <section className="section-padding bg-white border-y border-gray-100">
          <div className="container-page">
            <SectionHeader
              title="The Sakthi Advantage"
              subtitle="Why hospitality, retail, and corporate leaders partner with us for their mission-critical technology setups."
              showLabel={false}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(companyInfo?.advantages && companyInfo.advantages.length > 0
                ? companyInfo.advantages
                : [
                  { title: "Direct OEM Collaborations", description: "We partner directly with leading international manufacturers to deliver authentic, world-class digital displays and custom interactive hardware solutions." },
                  { title: "24/7 On-Ground Support", description: "Our team of certified, locally stationed technicians provides round-the-clock proactive monitoring and prompt maintenance support." },
                  { title: "End-to-End IT Consulting", description: "From setting up hospitality POS & KOT environments to designing high-speed network infrastructures, we offer expert consulting and clear roadmaps." },
                  { title: "Vandal-Proof Engineering", description: "All our public-facing signage devices feature heavy-duty commercial bodies and tempered protective glass surfaces built for high-traffic operations." }
                ]
              ).map((item: any, i: number) => {
                const icons = [
                  <Award key={1} className="w-6 h-6 text-[#B89A4A]" />,
                  <Clock key={2} className="w-6 h-6 text-[#B89A4A]" />,
                  <Users key={3} className="w-6 h-6 text-[#B89A4A]" />,
                  <Shield key={4} className="w-6 h-6 text-[#B89A4A]" />
                ];
                return (
                  <div
                    key={item.title}
                    className="border border-gray-200/80 bg-slate-50 p-6 transition-all duration-300 hover:bg-white hover:border-[#B89A4A] group hover:-translate-y-1 relative"
                  >
                    <div className="absolute top-0 right-0 p-4 font-serif font-bold text-gray-200/80 text-xl group-hover:text-[#B89A4A]/20 transition-colors">
                      {`0${i + 1}`}
                    </div>
                    <div className="w-12 h-12 bg-white flex items-center justify-center mb-6 shadow-sm border border-gray-100 group-hover:bg-[#B89A4A]/10 group-hover:border-[#B89A4A]/30 transition-all duration-300">
                      {icons[i] || <CheckCircle2 className="w-6 h-6 text-[#B89A4A]" />}
                    </div>
                    <h3 className="font-serif font-bold text-lg text-slate-900 mb-2.5">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-normal">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Redesigned Trusted Across Sectors (Industries) Section */}
      <ScrollReveal stagger>
        <section className="section-padding bg-slate-50">
          <div className="container-page">
            <SectionHeader
              title="Trusted Across Sectors"
              subtitle="Tailored hardware integrations and digital signage platforms operating across diverse high-traffic environments."
              showLabel={false}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {industries.map((industry) => {
                const icon = getIndustryIcon(industry);
                return (
                  <div
                    key={industry}
                    className="flex flex-col items-center justify-center p-6 border border-gray-200 bg-white hover:border-[#B89A4A] hover:bg-slate-50/50 transition-all duration-300 group cursor-default text-center"
                  >
                    <div className="mb-4 text-slate-400 group-hover:text-[#B89A4A] transition-colors duration-300">
                      {icon}
                    </div>
                    <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">{industry}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Redesigned Technology Partners Section */}
      <ScrollReveal>
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="container-page">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-10">OEM &amp; Technology Partners</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {partners.map((partner: { name: string; type: string }) => (
                <div
                  key={partner.name}
                  className="flex flex-col items-center gap-2 group transition-all duration-300"
                >
                  <div className="h-12 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <PartnerLogo name={partner.name} />
                  </div>
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    {partner.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Redesigned About Company Section */}
      <ScrollReveal>
        <section className="section-padding bg-white">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
              {/* Image Column */}
              <div className="lg:col-span-5 relative">
                <div className="border-4 border-[#B89A4A]/20 p-2">
                  <img
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80"
                    alt="Sakthi Solutions Corporate Setup"
                    className="w-full h-auto object-cover select-none"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 hidden sm:block bg-slate-950 text-white p-6 max-w-xs border-l-4 border-[#B89A4A]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#B89A4A] mb-1">Our Core Focus</p>
                  <p className="font-serif text-sm italic font-normal text-gray-200">
                    Chennai's trusted enterprise hospitality and retail system integrator since 2014.
                  </p>
                </div>
              </div>

              {/* Text & Stats Column */}
              <div className="lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B89A4A] mb-3">About the Company</p>
                <h2 className="font-serif font-extrabold text-3xl md:text-4xl text-slate-950 mb-6 leading-tight">
                  Your Reliable Technology Partner Since 2014
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 font-normal">
                  Sakthi Solutions delivers commercial hardware integrations, interactive touch interfaces, customer feedback consoles, and structured network engineering across India. Founded by a dynamic leadership team combining sales, automation, and customer relationship expertise.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 font-normal">
                  As the primary representative of Godspeed displays, we customize, deploy, and service heavy-duty, outdoor, and indoor digital signage solutions designed to operate continuously under rigorous environmental conditions.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { value: yearsOfExperience, suffix: "+", label: "Years Experience" },
                    { value: productLines, suffix: "", label: "Product Lines" },
                    { value: industriesServed, suffix: "+", label: "Sectors Served" },
                    { value: technologyPartners, suffix: "+", label: "OEM Partners" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-slate-50 border border-gray-200/80 p-4 transition-all duration-300 hover:bg-white hover:border-[#B89A4A] group"
                    >
                      <div className="text-2xl font-serif font-black text-[#B89A4A] mb-1">
                        <CountUp end={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link href="/about" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B89A4A] hover:text-slate-950 transition-colors border-b border-[#B89A4A] pb-1">
                    <span>Learn More About Us</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Redesigned Testimonials Section with Carousel Controls */}
      <ScrollReveal stagger>
        <section className="section-padding bg-slate-50">
          <div className="container-page">
            <SectionHeader
              title="What Our Clients Say"
              subtitle="Real experiences from restaurant owners, hotel managers, and retail operators running our hardware systems."
              showLabel={false}
            />

            {testimonials.length > 0 ? (
              <div className="max-w-4xl mx-auto bg-white border border-gray-200/80 p-8 md:p-12 relative">
                {/* Large Quote decoration */}
                <div className="absolute top-6 left-6 text-gray-100 select-none pointer-events-none">
                  <Quote size={80} className="opacity-40" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: testimonials[testiIndex]?.rating || 5 }).map((_, i) => (
                      <Star key={i} size={18} className="fill-[#B89A4A] text-[#B89A4A]" />
                    ))}
                  </div>

                  <blockquote className="font-serif text-lg md:text-xl text-slate-800 leading-relaxed italic mb-8 max-w-2xl font-normal">
                    &ldquo;{testimonials[testiIndex]?.content}&rdquo;
                  </blockquote>

                  <div className="h-px w-16 bg-[#B89A4A]/50 mb-6" />

                  <div>
                    <div className="font-bold text-slate-900 text-base">
                      {testimonials[testiIndex]?.author_name}
                    </div>
                    <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mt-1">
                      {testimonials[testiIndex]?.author_title}
                      {testimonials[testiIndex]?.author_company ? ` — ${testimonials[testiIndex]?.author_company}` : ""}
                    </div>
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex justify-center gap-4 mt-8 relative z-20">
                  <button
                    onClick={prevTesti}
                    aria-label="Previous testimonial"
                    className="p-2 border border-gray-200 hover:border-[#B89A4A] bg-white text-slate-700 hover:text-[#B89A4A] transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className="flex items-center gap-1.5">
                    {testimonials.map((_: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setTestiIndex(idx)}
                        aria-label={`Go to testimonial ${idx + 1}`}
                        className={`w-2 h-2 transition-all ${idx === testiIndex ? "bg-[#B89A4A] w-5" : "bg-gray-200"}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextTesti}
                    aria-label="Next testimonial"
                    className="p-2 border border-gray-200 hover:border-[#B89A4A] bg-white text-slate-700 hover:text-[#B89A4A] transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-400 text-xs">No client testimonials registered.</p>
            )}
          </div>
        </section>
      </ScrollReveal>

      {/* Trusted By Brands — rich client cards with brand color initials / logos */}
      <ScrollReveal>
        <section className="py-12 bg-white border-t border-gray-100 overflow-hidden">
          <div className="container-page">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-8">Trusted By Leading Brands</p>
            {(() => {
              const fallbackClients = [
                { name: "Buhari Restaurant", industry: "Restaurant", brand_color: "#C8922A", logo: "" },
                { name: "Matsya Egmore", industry: "Restaurant", brand_color: "#1A5276", logo: "" },
                { name: "Doveton Cafe", industry: "Cafe", brand_color: "#6E2F1A", logo: "" },
                { name: "Phoenix Marketcity", industry: "Retail Mall", brand_color: "#8B0000", logo: "" },
                { name: "Phoenix Mills", industry: "Retail Mall", brand_color: "#8B0000", logo: "" },
                { name: "Hotel Savera", industry: "Hotel", brand_color: "#1B4F72", logo: "" },
                { name: "Sangeetha Mobiles", industry: "Retail", brand_color: "#E74C3C", logo: "" },
                { name: "GRT Jewellers", industry: "Jewellery", brand_color: "#B8860B", logo: "" },
              ];
              const displayClients: any[] = clients.length > 0 ? clients : fallbackClients;
              return (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
                  {displayClients.map((client: any, i: number) => {
                    const initials = client.name.split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase();
                    const color = client.brand_color || "#B89A4A";
                    const logoUrl = client.logo
                      ? (client.logo.startsWith("http") ? client.logo : `${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "")}${client.logo.startsWith("/") ? "" : "/"}${client.logo}`)
                      : null;
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-2 p-3 border border-gray-100 hover:border-[#B89A4A]/50 transition-all duration-300 group cursor-default bg-white hover:bg-slate-50/50"
                      >
                        <div
                          className="w-12 h-12 flex items-center justify-center rounded-none shrink-0 overflow-hidden"
                          style={{ background: `${color}18`, border: `1.5px solid ${color}55` }}
                        >
                          {logoUrl ? (
                            <img src={logoUrl} alt={client.name} className="w-10 h-10 object-contain" />
                          ) : (
                            <span className="font-black text-sm" style={{ color }}>{initials}</span>
                          )}
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wide text-slate-500 text-center leading-tight group-hover:text-slate-800 transition-colors">{client.name}</span>
                        {client.industry && (
                          <span className="text-[8px] text-slate-300 uppercase tracking-widest">{client.industry}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
          {/* Subtle marquee strip below */}
          <div className="relative w-full overflow-hidden border-t border-gray-100/75 py-3 bg-slate-50/50 mt-8">
            <div className="animate-marquee flex gap-12">
              {Array(4).fill(clients.length > 0 ? clients.map((c: any) => c.name) : [
                "Buhari Restaurant", "Matsya Egmore", "Doveton Cafe",
                "Phoenix Marketcity", "Phoenix Mills", "Hotel Savera", "Sangeetha Mobiles", "GRT Jewellers"
              ]).flat().map((name: string, i: number) => (
                <div key={i} className="flex items-center justify-center h-8 px-6 shrink-0 cursor-default">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-300 select-none">{name}</span>
                  <span className="mx-4 text-[#B89A4A]/40 text-xs">✦</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

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