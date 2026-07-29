"use client";



import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { api } from "@/lib/api";

import Link from "next/link";

import {

  ArrowRight,

  Users,

  Star,

  Quote,

  ArrowUpRight,

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

  Building,

  Phone,

  Mail,

  MapPin,

  ChevronDown,

  Navigation,

  MessageCircle,

  Send

} from "lucide-react";



const contactSchema = z.object({

  name: z.string().min(2, "Name is required"),

  business_name: z.string().min(2, "Business / Organization name is required"),

  email: z.string().email("Valid email is required"),

  phone: z.string().min(10, "Valid phone number is required"),

  enquiry_type: z.string().min(1, "Please select an enquiry type"),

  callback_time: z.string().optional(),

  message: z.string().min(10, "Message must be at least 10 characters"),

});



type ContactFormData = z.infer<typeof contactSchema>;

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

  useClients,

  useTeam

} from "@/hooks/useQueries";



function ScrollReveal({ children, className = "", stagger = false }: { children: React.ReactNode; className?: string; stagger?: boolean }) {

  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);

  return (

    <div ref={ref} className={`${stagger ? "scroll-reveal-stagger" : "scroll-reveal"} ${isVisible ? "visible" : ""} ${className}`}>

      {children}

    </div>

  );

}



const getCategoryFallbackImage = (slug?: string) => {

  return undefined;

};



const getCategoryImage = (cat: any) => {

  if (!cat || !cat.image) {

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





/** Analyze image brightness via canvas (0=dark, 1=bright) */

function detectImageBrightness(url: string): Promise<number> {

  return new Promise((resolve) => {

    const img = new Image();

    img.crossOrigin = "anonymous";

    img.onload = () => {

      try {

        const c = document.createElement("canvas");

        c.width = 40; c.height = 40;

        const ctx = c.getContext("2d");

        if (!ctx) { resolve(0.5); return; }

        ctx.drawImage(img, 0, 0, 40, 40);

        const d = ctx.getImageData(0, 0, 40, 40).data;

        let s = 0;

        for (let i = 0; i < d.length; i += 4) s += (d[i] + d[i+1] + d[i+2]) / 3;

        resolve(s / (d.length / 4) / 255);

      } catch { resolve(0.5); }

    };

    img.onerror = () => resolve(0.5);

    img.src = url;

  });

}



export function HomePage() {

  const { data: apiTestimonials } = useTestimonials();

  const { data: apiPartners } = usePartners();

  const { data: apiCategories } = useProductCategories();

  const { data: apiIndustries } = useIndustries();

  const { data: companyInfo } = useCompanyInfo();

  const { data: apiClients } = useClients();

  const { data: apiTeam } = useTeam();



  const testimonials = apiTestimonials ?? [];

  const partners = apiPartners ?? [];

  const categories = apiCategories ?? [];

  const industries: string[] = apiIndustries ? apiIndustries.map((i: { name: string }) => i.name) : [];

  const clients = apiClients ?? [];

  const team = apiTeam && apiTeam.length > 0 ? apiTeam : [];



  const [isSubmitted, setIsSubmitted] = useState(false);

  const [heroIdx, setHeroIdx] = useState(0);



  const heroImages: { image: string; alt_text: string }[] = (companyInfo as any)?.hero_images || [];

  const hasCarousel = heroImages.length > 0;



  useEffect(() => {

    if (heroImages.length < 2) return;

    const t = setInterval(() => setHeroIdx((p) => (p + 1) % heroImages.length), 5000);

    return () => clearInterval(t);

  }, [heroImages.length]);

  const enquiryTypes: string[] = (companyInfo?.enquiry_types && companyInfo.enquiry_types.length > 0)

    ? companyInfo.enquiry_types.map((e: any) => typeof e === "string" ? e : e.name)

    : [

      "Digital Signage & Video Wall",

      "Interactive Kiosk / Wayfinding",

      "IT Networking Consulting",

      "Hardware Supply (POS / KOT)",

      "Customer Feedback Solution",

      "Smart Touch Table",

      "General Inquiry",

    ];

  const callbackSlots: string[] = (companyInfo?.callback_slots && companyInfo.callback_slots.length > 0)

    ? companyInfo.callback_slots.map((s: any) => typeof s === "string" ? s : s.label)

    : [

      "Morning (9 AM – 12 PM)",

      "Afternoon (12 PM – 3 PM)",

      "Evening (3 PM – 6 PM)",

      "Anytime",

    ];



  const {

    register,

    handleSubmit,

    formState: { errors, isSubmitting },

  } = useForm<ContactFormData>({

    resolver: zodResolver(contactSchema),

  });



  const onSubmit = async (data: ContactFormData) => {

    try {

      await api.post("/cms/contact/", {

        name: data.name,

        business_name: data.business_name,

        email: data.email,

        phone: data.phone,

        enquiry_type: null,

        products: [data.enquiry_type],

        callback_time: data.callback_time || "",

        message: data.message,

      });

      setIsSubmitted(true);

    } catch {

      alert("Something went wrong. Please try again.");

    }

  };



  const phonePrimary = companyInfo?.phone_primary || "";

  const phoneSecondary = companyInfo?.phone_secondary || "";

  const emailPrimary = companyInfo?.email_primary || "";

  const phoneJayakumar = (companyInfo as any)?.phone_jayakumar || phonePrimary;

  const phoneVidya = (companyInfo as any)?.phone_vidya || phoneSecondary;

  const salesAddress = companyInfo?.address_line1

    ? `${companyInfo.address_line1}, ${companyInfo.address_line2 || ""}, ${companyInfo.city || ""} – ${companyInfo.postal_code || ""}`

    : "";

  const registeredAddress = companyInfo?.address_line1 ? salesAddress : "";

  const mapUrl = (companyInfo as any)?.google_maps_embed || "";

  const googleMapsDirectionsUrl = companyInfo?.company_name

    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(companyInfo.company_name)}`

    : "";

  const whatsappUrl = `https://wa.me/${phonePrimary.replace(/[\s+\-]/g, "")}`;



  const heroTitle = companyInfo?.hero_title || "";

  const heroDescription = companyInfo?.hero_description || "";

  const heroParsed = heroTitle.includes(" & ") ? { left: heroTitle.split(" & ")[0].split(", "), right: heroTitle.split(" & ")[1] } : null;

  const [overlayOpacity, setOverlayOpacity] = useState(0.55);

  const [textVisible, setTextVisible] = useState(true);



  useEffect(() => {

    const url = heroImages[heroIdx]?.image || companyInfo?.hero_bg_image;

    if (url) {

      detectImageBrightness(url).then((b) => {

        setOverlayOpacity(b > 0.6 ? 0.75 : b > 0.4 ? 0.55 : 0.35);

      });

    }

    setTextVisible(false);

    const t = setTimeout(() => setTextVisible(true), 250);

    return () => clearTimeout(t);

  }, [heroIdx]);



  const heroHeadingParts = heroTitle?.includes(" & ")

    ? (() => {

        const i = heroTitle.lastIndexOf(" & ");

        if (i === -1) return null;

        return { before: heroTitle.slice(0, i + 3), last: heroTitle.slice(i + 3) };

      })()

    : null;



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

        className="relative h-[72vh] min-h-[72vh] flex flex-col overflow-hidden text-white"

      >

        {/* Hero background images (carousel if multiple) */}

        {hasCarousel ? (

          heroImages.map((img, i) => (

            <div

              key={i}

              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"

              style={{

                backgroundImage: `url(${img.image})`,

                opacity: i === heroIdx ? 1 : 0,

                zIndex: i === heroIdx ? 1 : 0,

              }}

              role="img"

              aria-label={img.alt_text || `Hero background ${i + 1}`}

            />

          ))

        ) : (

          <div

            className="absolute inset-0 bg-cover bg-center"

            style={{ backgroundImage: `url(${companyInfo?.hero_bg_image || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"})` }}

          />

        )}



        {/* Dynamic left-to-right gradient overlay - opacity adapts to image brightness */}

        <div

          className="absolute inset-0 z-10 transition-opacity duration-700"

          style={{

            background: `linear-gradient(to right, rgba(0,0,0,${overlayOpacity}) 0%, rgba(0,0,0,${overlayOpacity * 0.55}) 40%, transparent 100%)`,

          }}

        />



        {/* Content - positioned in left 35-40% */}

                <div className="absolute inset-0 z-20 flex flex-col">
          <div className="flex-1" />
          <div
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 250ms ease-out, transform 250ms ease-out",
            }}
            className="ml-[4vw] lg:ml-[6vw] max-w-[560px]"
          >
            {/* Eyebrow — Red */}
            {companyInfo?.hero_eyebrow && (
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#D63B3B] mb-3">
                {companyInfo.hero_eyebrow}
              </p>
            )}
            {/* Tagline — Gold */}
            {companyInfo?.hero_tagline_subtitle && (
              <p className="text-[14px] font-medium text-[#C7A64A] mb-4">
                {companyInfo.hero_tagline_subtitle}
              </p>
            )}
            {/* Heading */}
            {heroTitle && (
              <h1 className="text-4xl md:text-[2.875rem] lg:text-[3.625rem] font-bold leading-[1.08] mb-5">
                {heroHeadingParts ? (
                  <>
                    {heroHeadingParts.before}<br />
                    <span className="text-[#C7A64A] italic" style={{ fontFamily: "var(--font-playfair)", fontSize: "0.93em" }}>
                      {heroHeadingParts.last}
                    </span>
                  </>
                ) : (
                  <span className="text-white">{heroTitle}</span>
                )}
              </h1>
            )}
            {/* Description */}
            {heroDescription && (
              <p className="text-lg leading-[1.7] text-white/90 max-w-[520px] mb-0">
                {heroDescription}
              </p>
            )}
          </div>
          {/* CTA Buttons — bottom-aligned with nav dots */}
          <div
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 250ms ease-out, transform 250ms ease-out",
              transitionDelay: "50ms",
            }}
            className="ml-[4vw] lg:ml-[6vw] pb-12"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="btn-accent shadow-lg"
              >
                Explore Products
                <ArrowRight size={14} className="ml-2" />
              </Link>
              <Link
                href="#contact-section"
                className="btn-outline-white"
              >
                Book Free IT Consultation
              </Link>
            </div>
          </div>
                </div>

        {/* Carousel Pagination — centered, bottom-aligned with HCB */}
        {hasCarousel && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-30 flex gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIdx(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === heroIdx ? "bg-[#C7A64A] w-6" : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>



      {/* Premium Propertism-style Trust Strip */}

      <section className="border-y border-[#B89A4A] grid grid-cols-1 lg:grid-cols-2 text-slate-900 bg-white h-auto lg:h-[18vh] min-h-[18vh] overflow-hidden">

        {/* Left side: Performance Metrics (4 columns) */}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:border-r lg:border-[#B89A4A] h-full">

          {(companyInfo?.stats && companyInfo.stats.length > 0 ? companyInfo.stats : [

            { value: "12+", label: "Years Experience" },

            { value: "500+", label: "Projects Completed" },

            { value: "150+", label: "Happy Clients" },

            { value: "24/7", label: "On-Ground Support" }

          ]).map((stat: any, i: number) => (

            <div

              key={stat.label}

              className={`p-3 flex flex-col justify-center text-center md:text-left relative min-h-[9vh] lg:min-h-0 h-full transition-all duration-300 hover:bg-slate-50/85 hover:-translate-y-0.5 hover:shadow-inner cursor-default ${i % 2 === 0 ? "bg-white" : "bg-slate-50"

                } ${i < 3 ? "border-r border-[#B89A4A]/25" : ""}`}

            >

              <span className="stat-value text-slate-900 mb-1">

                {renderStatValue(stat.value)}

              </span>

              <span className="stat-label">

                {stat.label}

              </span>

            </div>

          ))}

        </div>



        {/* Right side: Brand Pillars (2 columns) — from companyInfo.advantages first 2 */}

        <div className="grid grid-cols-1 md:grid-cols-2 h-full">

          {(() => {

            const adv = companyInfo?.advantages || [];

            const pillars = adv.length >= 2 ? adv.slice(0, 2).map((a: any) => ({ title: a.title, desc: a.description })) : [

              { title: "Why Clients Partner With Us", desc: "High-performance hardware, customized digital signage, and prompt local support." },

              { title: "Trust & Transparency", desc: "Direct OEM collaborations and certified engineering professionals." }

            ];

            return pillars;

          })().map((pillar: any, i: number) => (

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



      {/* Products & Solutions Section — design-system compliant */}

      <ScrollReveal>

        <section className="section-padding bg-white">

          <div className="container-page">



            {/* Section Kicker */}

            <div className="flex items-center gap-2 mb-3">

              <svg className="w-4 h-4 text-[#B89A4A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                <path d="m7.5 4.27 9 5.15" />

                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />

                <path d="m3.3 7 8.7 5 8.7-5" />

                <path d="M12 22V12" />

              </svg>

              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B89A4A] font-ui">{companyInfo?.hero_tagline?.split("—")[0]?.trim() || ""}</span>

            </div>



            {/* Primary Heading */}

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-500 leading-tight">

              Products &amp; Solutions

            </h2>



            {/* Sub-headline + Description — gold left bar */}

            <div className="border-l-2 border-[#B89A4A] pl-4 mt-2">

              <h4 className="font-heading text-lg md:text-xl font-normal italic text-gray-600">

                {companyInfo?.products_section_heading || ""}

              </h4>

              <p className="font-body text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis mt-1">

                {companyInfo?.products_section_title || ""}

              </p>

            </div>



            {/* Card Grid — ordered by Brand */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

              {[...categories]

                .sort((a: any, b: any) => (a.brand_name || "").localeCompare(b.brand_name || ""))

                .map((cat: any, i: number) => {

                  const image = getCategoryImage(cat);

                  const brandLogoUrl = cat.brand_logo;

                  return (

                    <div

                      key={cat.slug ?? i}

                      className="card p-0 flex flex-col group relative overflow-hidden"

                    >

                      {/* Image area */}

                      <div className="h-48 w-full overflow-hidden relative bg-slate-100 shrink-0">

                        <img

                          src={image}

                          alt={cat.name}

                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"

                        />

                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors duration-300" />

                        {brandLogoUrl && cat.show_brand_logo !== false && (

                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm p-1.5 shadow-md z-20">

                            <img src={brandLogoUrl} alt={cat.brand_name || cat.name} className="h-5 w-auto object-contain" />

                          </div>

                        )}

                      </div>



                      {/* Content — all left-aligned */}

                      <div className="p-5 flex flex-col flex-grow justify-between">

                        <div>

                          {cat.tagline && (

                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#B89A4A] mb-1.5 font-ui">{cat.tagline}</p>

                          )}

                          <h3 className="font-heading font-bold text-lg text-primary-500 mb-2 group-hover:text-[#B89A4A] transition-colors">

                            {cat.name}

                          </h3>

                          <p className="font-body text-xs text-gray-500 leading-relaxed mb-4">

                            {cat.description}

                          </p>

                          {cat.products && cat.products.length > 0 && (

                            <ul className="space-y-1 mb-4">

                              {cat.products.slice(0, 4).map((prod: any) => (

                                <li key={prod.slug} className="flex items-center text-xs font-medium text-gray-600 hover:text-[#B89A4A] transition-colors font-ui">

                                  <span className="w-1 h-1 bg-[#B89A4A] mr-2 shrink-0 rounded-full" />

                                  <Link href={`/products/${prod.slug}`}>{prod.name}</Link>

                                </li>

                              ))}

                            </ul>

                          )}

                        </div>

                        <Link

                          href={`/products/${cat.slug}`}

                          className="text-xs font-bold uppercase tracking-wider text-[#B89A4A] hover:text-primary-500 transition-colors font-ui inline-flex items-center gap-1.5"

                        >

                          Explore <ArrowUpRight size={12} />

                        </Link>

                      </div>

                    </div>

                  );

                })}

            </div>



            {/* CTA Button Row */}

            <div className="flex flex-wrap gap-3 mt-8">

              <Link href="/products" className="btn-accent">

                View All Products

              </Link>

              <Link href="/contact" className="btn-outline-gold">

                Request a Quote

              </Link>

            </div>



          </div>

        </section>

      </ScrollReveal>



      {/* ── Compact About & Team Section ── */}

      <ScrollReveal>

        <section className="section-padding bg-surface-muted">

          <div className="container-page">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">



              {/* Left Column: About Us */}

              <div className="space-y-6">

                <div>

                  <div className="flex items-center gap-2 mb-3">

                    <svg className="w-4 h-4 text-[#B89A4A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />

                    </svg>

                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B89A4A] font-ui">About Us</span>

                  </div>

                  <h2 className="font-heading text-3xl font-bold text-primary-500 leading-tight">

                    Your Technology Partner Since 2014

                  </h2>

                </div>



                {/* Story */}

                <div className="border-l-2 border-[#B89A4A] pl-4 space-y-3">

                  <p className="font-body text-sm text-gray-600 leading-relaxed">

                    {companyInfo?.about_content || ""}

                  </p>

                  <p className="font-body text-sm text-gray-600 leading-relaxed">

                    {companyInfo?.about_body || ""}

                  </p>

                </div>



                {/* Mission + Stats (Merged from the Right) */}

                <div className="space-y-4 pt-2">

                  <div className="highlight-block">

                    <p className="text-accent-italic text-gray-700 font-medium">

                      To deliver world-class digital signage and IT infrastructure solutions that empower businesses to operate efficiently and grow confidently.

                    </p>

                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    {(companyInfo?.stats && companyInfo.stats.length > 0 ? companyInfo.stats : [

                      { value: "10+", label: "Years Experience" },

                      { value: "500+", label: "Clients Served" },

                      { value: "1,000+", label: "Projects Delivered" },

                      { value: "50+", label: "Product Partners" },

                    ]).map((s: any) => (

                      <div key={s.label} className="bg-white border border-gray-100 p-3 text-center rounded-sm">

                        <span className="stat-value text-[#B89A4A] font-bold text-xl md:text-2xl">{s.value}</span>

                        <span className="stat-label block mt-1 text-[10px] text-gray-500 font-medium font-ui uppercase tracking-wider">{s.label}</span>

                      </div>

                    ))}

                  </div>

                </div>

              </div>



              {/* Right Column: Our Team (Moved from below) */}

              <div className="space-y-6 lg:space-y-0 lg:flex lg:flex-col lg:h-full">

                <div className="lg:mb-6">

                  <div className="flex items-center gap-2 mb-3">

                    <svg className="w-4 h-4 text-[#B89A4A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />

                    </svg>

                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B89A4A] font-ui">Our Team</span>

                  </div>

                  <h2 className="font-heading text-3xl font-bold text-primary-500 leading-tight">

                    The People Behind the Tech

                  </h2>

                </div>



                <div className="flex-1 flex flex-col justify-between gap-6">

                  {team.slice(0, 4).map((member: any, i: number) => {

                    const initials = (member.name || "")

                      .split(" ")

                      .slice(0, 2)

                      .map((w: string) => w[0])

                      .join("")

                      .toUpperCase();



                    const getMemberPhotoUrl = (photo: string | null) => {

                      if (!photo) return null;

                      if (photo.startsWith("http://") || photo.startsWith("https://")) return photo;

                      const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");

                      return `${apiBaseUrl}${photo.startsWith("/") ? "" : "/"}${photo}`;

                    };



                    const photoUrl = getMemberPhotoUrl(member.photo);



                    return (

                      <div key={i} className="card p-6 sm:p-8 group hover:-translate-y-1 relative flex flex-col sm:flex-row gap-6 items-stretch bg-white border border-gray-100 rounded-sm">

                        {/* Photo Container */}

                        <div className="w-32 h-40 bg-slate-50 flex items-center justify-center shrink-0 border border-gray-100 rounded-sm overflow-hidden shadow-sm">

                          {photoUrl ? (

                            <img src={photoUrl} alt={member.name} className="w-full h-full object-cover select-none" />

                          ) : (

                            <div className="w-full h-full bg-[#B89A4A]/5 border border-[#B89A4A]/20 flex items-center justify-center rounded-sm">

                              <span className="text-3xl font-bold text-[#B89A4A] tracking-wider font-ui">{initials}</span>

                            </div>

                          )}

                        </div>

                        {/* Text Details Column */}

                        <div className="space-y-3.5 flex-1">

                          {/* Pill Tags (Formatted to match user request style) */}

                          <div className="flex flex-wrap gap-2">

                            {(member.name === "Jayakumar"

                              ? ["Co-Founder & Director", "Sales & Operations"]

                              : member.name === "Vidya Rani"

                                ? ["Co-Founder & Director", "Customer Relations & Finance"]

                                : [member.designation]

                            ).map((role: string, idx: number) => (

                              <span

                                key={idx}

                                className="inline-block px-3 py-1 bg-[#B89A4A]/5 border border-[#B89A4A]/20 text-[#B89A4A] text-[9px] font-bold uppercase tracking-wider rounded-full font-ui"

                              >

                                {role}

                              </span>

                            ))}

                          </div>



                          {/* Name and Qualifications (Proper Case / Serif Font) */}

                          <div>

                            <h4 className="font-serif font-bold text-lg text-slate-800 transition-colors inline-flex flex-wrap items-baseline gap-2">

                              {member.name === "Jayakumar" ? "Mr. Jayakumar" : (member.name === "Vidya Rani" ? "Mrs. Vidya Rani" : member.name)}

                              {member.name === "Jayakumar" && (

                                <span className="text-[10px] font-bold text-[#B89A4A] tracking-wider uppercase font-ui">

                                  B.B.A., M.B.A.

                                </span>

                              )}

                            </h4>

                          </div>



                          {/* Brief Bio */}

                          {member.brief && (

                            <p className="font-body text-xs text-gray-500 leading-relaxed font-normal">

                              {member.brief}

                            </p>

                          )}

                        </div>

                      </div>

                    );

                  })}

                </div>

              </div>



            </div>

          </div>

        </section>

      </ScrollReveal>



      {/* The Sakthi Advantage Section — design-system left-aligned */}

      <ScrollReveal stagger>

        <section className="section-padding bg-white border-y border-gray-100">

          <div className="container-page">

            <div className="flex items-center gap-2 mb-3">

              <svg className="w-4 h-4 text-[#B89A4A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />

              </svg>

              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B89A4A] font-ui">{(companyInfo?.why_items?.[0]?.title) || ""}</span>

            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-500 leading-tight mb-2">

              {companyInfo?.advantages_section_title || ""}

            </h2>

            <p className="font-body text-sm text-gray-500 max-w-2xl mb-8">

              Why hospitality, retail, and corporate leaders partner with us for their mission-critical technology setups.

            </p>



            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

              {(companyInfo?.advantages && companyInfo.advantages.length > 0

                ? companyInfo.advantages

                : []

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

                    className="card group hover:-translate-y-1 relative"

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



      {/* Trusted Across Sectors — design-system left-aligned */}

      <ScrollReveal stagger>

        <section className="section-padding bg-slate-50">

          <div className="container-page">

            <div className="flex items-center gap-2 mb-3">

              <svg className="w-4 h-4 text-[#B89A4A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />

              </svg>

              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B89A4A] font-ui">Industries We Serve</span>

            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-500 leading-tight mb-2">

              Trusted Across Sectors

            </h2>

            <p className="font-body text-sm text-gray-500 max-w-2xl mb-8">

              Tailored hardware integrations and digital signage platforms operating across diverse high-traffic environments.

            </p>



            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">

              {industries.map((industry) => {

                const icon = getIndustryIcon(industry);

                return (

                  <div

                    key={industry}

                    className="card flex flex-col items-center justify-center cursor-default text-center p-6"

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



      {/* Technology Partners — design-system left-aligned */}

      <ScrollReveal>

        <section className="section-padding bg-white border-y border-gray-100">

          <div className="container-page">

            <div className="flex items-center gap-2 mb-3">

              <svg className="w-4 h-4 text-[#B89A4A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />

              </svg>

              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B89A4A] font-ui">Technology Partners</span>

            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">

              {partners.map((partner: { name: string; type: string }) => (

                <div

                  key={partner.name}

                  className="flex flex-col items-center gap-2 group transition-all duration-300"

                >

                  <div className="h-12 flex items-center justify-center transition-all duration-300">

                    <PartnerLogo name={partner.name} />

                  </div>

                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-none mt-1 transition-opacity">

                    {partner.type}

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>

      </ScrollReveal>



      {/* About Company Section — design-system compliant */}

      <ScrollReveal>

        <section className="section-padding bg-white">

          <div className="container-page">

            <div className="flex items-center gap-2 mb-3">

              <svg className="w-4 h-4 text-[#B89A4A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />

              </svg>

              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B89A4A] font-ui">About the Company</span>

            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-500 leading-tight mb-6">

              {companyInfo?.about_heading || ""}

            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">

              <div className="lg:col-span-5 relative">

                <div className="border-4 border-[#B89A4A]/20 p-2 aspect-[4/3] overflow-hidden">

                  <img

                    src={companyInfo?.about_image || undefined}

                    alt={companyInfo?.company_name || ""}

                    className="w-full h-full object-cover select-none"

                  />

                </div>

                <div className="absolute -bottom-6 -right-6 hidden sm:block bg-slate-950 text-white p-6 max-w-xs border-l-4 border-[#B89A4A]">

                  <p className="text-xs font-bold uppercase tracking-wider text-[#B89A4A] mb-1">Our Core Focus</p>

                  <p className="font-serif text-sm italic font-normal text-gray-200">

                    {companyInfo?.tagline || ""}

                  </p>

                </div>

              </div>



              {/* Text & Stats Column */}

              <div className="lg:col-span-7">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B89A4A] mb-3">About the Company</p>

                <h2 className="font-serif font-extrabold text-3xl md:text-4xl text-slate-950 mb-6 leading-tight">

                  {companyInfo?.about_heading || ""}

                </h2>

                <p className="text-slate-600 text-sm leading-relaxed mb-4 font-normal">

                  {companyInfo?.about_body || ""}

                </p>



                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                  {(companyInfo?.stats && companyInfo.stats.length > 0 ? companyInfo.stats : []

                  ).map((stat: any) => (

                    <div

                      key={stat.label}

                      className="bg-slate-50 border border-gray-200/80 p-4 transition-all duration-300 hover:bg-white hover:border-[#B89A4A] group"

                    >

                      <div className="text-2xl font-serif font-black text-[#B89A4A] mb-1">

                        {renderStatValue(stat.value)}

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



      {/* Testimonials — design-system left-aligned */}

      <ScrollReveal stagger>

        <section className="section-padding bg-slate-50">

          <div className="container-page">

            <div className="flex items-center gap-2 mb-3">

              <svg className="w-4 h-4 text-[#B89A4A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />

              </svg>

              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B89A4A] font-ui">Testimonials</span>

            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-500 leading-tight mb-2">

              What Our Clients Say

            </h2>

            <p className="font-body text-sm text-gray-500 max-w-2xl mb-8">

              Real experiences from restaurant owners, hotel managers, and retail operators running our hardware systems.

            </p>



            {testimonials.length > 0 ? (

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {testimonials.map((t: any, i: number) => (

                  <div

                    key={i}

                    className="bg-white border border-gray-200/80 p-6 relative flex flex-col hover:border-[#B89A4A] transition-all duration-300 group"

                  >

                    {/* Quote decoration */}

                    <div className="text-gray-100 select-none pointer-events-none mb-2">

                      <Quote size={32} className="opacity-30" />

                    </div>



                    <div className="flex items-center gap-1 mb-3">

                      {Array.from({ length: t.rating || 5 }).map((_, ri) => (

                        <Star key={ri} size={14} className="fill-[#B89A4A] text-[#B89A4A]" />

                      ))}

                    </div>



                    <blockquote className="text-sm text-slate-700 leading-relaxed italic mb-4 flex-grow font-normal">

                      &ldquo;{t.content}&rdquo;

                    </blockquote>



                    <div className="h-px w-10 bg-[#B89A4A]/40 mb-3" />



                    <div>

                      <div className="font-bold text-slate-900 text-sm">

                        {t.author_name}

                      </div>

                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-0.5">

                        {t.author_title}

                        {t.author_company ? ` — ${t.author_company}` : ""}

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <p className="text-center text-gray-400 text-xs">No client testimonials registered.</p>

            )}

          </div>

        </section>

      </ScrollReveal>



      {/* Clients — Production-style logo scroller */}

      <ScrollReveal>

        <section className="section-padding bg-white border-y border-gray-100 overflow-hidden">

          <div className="container-page">

            <div className="flex items-center gap-2 mb-3">

              <svg className="w-4 h-4 text-[#B89A4A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />

              </svg>

              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B89A4A] font-ui">Our Esteemed Clients</span>

            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-500 leading-tight mb-8">

              Trusted by Industry Leaders

            </h2>

            {(() => {

              const fallbackClients = [

                { name: "Cibo", logo: "" },

                { name: "Buhari Restaurant", logo: "" },

                { name: "Matsya Egmore", logo: "" },

                { name: "Doveton Cafe", logo: "" },

                { name: "Phoenix Marketcity", logo: "" },

                { name: "Hotel Savera", logo: "" },

              ];

              const displayClients: any[] = clients.length > 0 ? clients : fallbackClients;

              const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");

              const resolveUrl = (path: string) => path.startsWith("http") ? path : `${apiBase}${path.startsWith("/") ? "" : "/"}${path}`;

              // Filter to only clients with logos for the carousel

              const logoClients = displayClients.filter((c: any) => c.logo);

              if (logoClients.length === 0) return <p className="text-gray-400 text-xs">No client logos available.</p>;

              // Duplicate for seamless infinite scroll

              const doubled = [...logoClients, ...logoClients];

              return (

                <div className="relative overflow-hidden py-4">

                  {/* Fade edges */}

                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />

                  <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent to-white z-10" />

                  <div className="animate-marquee">

                    {doubled.map((client: any, i: number) => {

                      const logoUrl = resolveUrl(client.logo);

                      return (

                        <div

                          key={`${client.name}-${i}`}

                          className="flex items-center justify-center shrink-0 px-6"

                          style={{ height: "48px", minWidth: "140px" }}

                        >

                          <img

                            src={logoUrl}

                            alt={client.name}

                            className="max-h-full max-w-[120px] object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"

                            loading="lazy"

                            onError={(e) => {

                              (e.target as HTMLImageElement).style.display = "none";

                            }}

                          />

                        </div>

                      );

                    })}

                  </div>

                </div>

              );

            })()}

          </div>

        </section>

      </ScrollReveal>



      {/* ── Reusable Contact Us Section on Homepage (Matches ContactPage.tsx exactly) ── */}

      <ScrollReveal>

        <section className="section-padding bg-white" id="contact-section">

          <div className="container-page">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">



              {/* ── LEFT: Office Contact Info ── */}

              <div className="space-y-8">

                <div>

                  <p className="section-label">{companyInfo?.contact_section_title}</p>

                  <h2 className="heading-md text-primary-500 mb-1">{companyInfo?.contact_section_heading}</h2>

                  <div className="gold-divider" />

                </div>



                {/* Office Cards */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Registered Office */}

                  <div className="card p-5 space-y-3 h-full flex flex-col justify-between">

                    <h3 className="font-heading text-lg font-bold text-primary-500">

                      Registered Office

                    </h3>

                    <div className="flex items-start gap-2.5">

                      <MapPin size={15} className="text-accent-500 mt-0.5 shrink-0" />

                      <p className="font-body text-xs text-gray-600 leading-relaxed">

                        {registeredAddress}

                      </p>

                    </div>

                    <div className="space-y-1.5 pt-1">

                      <div className="flex items-center gap-2">

                        <Phone size={13} className="text-accent-500 shrink-0" />

                        <a

                          href={`tel:${phonePrimary.replace(/[\s-]/g, "")}`}

                          className="font-body text-xs text-accent-500 hover:underline"

                        >

                          {phonePrimary}

                        </a>

                      </div>

                      <div className="flex items-center gap-2">

                        <Mail size={13} className="text-accent-500 shrink-0" />

                        <a

                          href={`mailto:${emailPrimary}`}

                          className="font-body text-xs text-accent-500 hover:underline"

                        >

                          {emailPrimary}

                        </a>

                      </div>

                    </div>

                  </div>



                  {/* Sales Office */}

                  <div className="card p-5 space-y-3 h-full flex flex-col justify-between">

                    <h3 className="font-heading text-lg font-bold text-primary-500">

                      Sales Office

                    </h3>

                    <div className="flex items-start gap-2.5">

                      <MapPin size={15} className="text-accent-500 mt-0.5 shrink-0" />

                      <p className="font-body text-xs text-gray-600 leading-relaxed">

                        {salesAddress}

                      </p>

                    </div>

                    <div className="space-y-1.5 pt-1">

                      <div className="flex items-center gap-2">

                        <Phone size={13} className="text-accent-500 shrink-0" />

                        <a

                          href={`tel:${phoneSecondary.replace(/[\s-]/g, "")}`}

                          className="font-body text-xs text-accent-500 hover:underline"

                        >

                          {phoneSecondary}

                        </a>

                      </div>

                      <div className="flex items-center gap-2">

                        <Mail size={13} className="text-accent-500 shrink-0" />

                        <a

                          href={`mailto:${emailPrimary}`}

                          className="font-body text-xs text-accent-500 hover:underline"

                        >

                          {emailPrimary}

                        </a>

                      </div>

                    </div>

                  </div>

                </div>



                {/* Action Button Row */}

                <div className="flex flex-wrap gap-3">

                  <a

                    href={googleMapsDirectionsUrl}

                    target="_blank"

                    rel="noopener noreferrer"

                    className="flex items-center gap-2 border border-accent-500/30 p-3 text-accent-500 hover:bg-accent-500/10 transition-colors duration-200"

                    title="Get Directions"

                  >

                    <Navigation size={16} />

                    <span className="font-body text-xs font-medium">Get Directions</span>

                  </a>

                  <a

                    href={`tel:${phonePrimary.replace(/[\s-]/g, "")}`}

                    className="flex items-center gap-2 border border-accent-500/30 p-3 text-accent-500 hover:bg-accent-500/10 transition-colors duration-200"

                    title="Call"

                  >

                    <Phone size={16} />

                    <span className="font-body text-xs font-medium">Call</span>

                  </a>

                  <a

                    href={whatsappUrl}

                    target="_blank"

                    rel="noopener noreferrer"

                    className="flex items-center gap-2 border border-accent-500/30 p-3 text-accent-500 hover:bg-accent-500/10 transition-colors duration-200"

                    title="WhatsApp"

                  >

                    <MessageCircle size={16} />

                    <span className="font-body text-xs font-medium">WhatsApp</span>

                  </a>

                </div>



                {/* Individual Contacts */}

                <div className="bg-cream p-5 space-y-3">

                  <p className="font-heading text-sm font-bold text-primary-500">

                    Direct Lines

                  </p>

                  {(phoneJayakumar || phoneVidya) && (

                    <div className="space-y-2">

                      {phoneJayakumar && (

                        <div className="flex items-center gap-2.5">

                          <Phone size={13} className="text-accent-500 shrink-0" />

                          <a

                            href={`tel:${phoneJayakumar.replace(/[\s-]/g, "")}`}

                            className="font-body text-xs text-accent-500 hover:underline"

                          >

                            Jayakumar: {phoneJayakumar}

                          </a>

                        </div>

                      )}

                      {phoneVidya && (

                        <div className="flex items-center gap-2.5">

                          <Phone size={13} className="text-accent-500 shrink-0" />

                          <a

                            href={`tel:${phoneVidya.replace(/[\s-]/g, "")}`}

                            className="font-body text-xs text-accent-500 hover:underline"

                          >

                            Vidya Rani: {phoneVidya}

                          </a>

                        </div>

                      )}

                    </div>

                  )}

                  {(companyInfo as any)?.business_hours && (

                    <p className="font-body text-xs text-gray-500">

                      {(companyInfo as any).business_hours}

                    </p>

                  )}

                </div>

              </div>



              {/* ── RIGHT: Inquiry Form Card with subtle backdrop ── */}

              <div className="bg-gradient-to-br from-slate-50 to-[#B89A4A]/[0.03] border border-[#B89A4A]/15 p-6 sm:p-8 lg:p-10 rounded-sm shadow-sm hover:shadow-md hover:border-[#B89A4A]/30 transition-all duration-300 relative overflow-hidden group/form">

                {/* Subtle gold decorative gradient blob in background */}

                <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#B89A4A]/5 rounded-full blur-xl pointer-events-none" />



                <div className="mb-6 relative z-10">

                  <p className="section-label text-[#B89A4A]/90">{companyInfo?.cta_subtitle_title}</p>

                  <p className="font-accent italic text-xl md:text-2xl text-primary-500/85">

                    {companyInfo?.cta_subtitle}

                  </p>

                </div>



                {isSubmitted ? (

                  <div className="flex flex-col items-center justify-center text-center py-12 h-full relative z-10">

                    <div className="w-16 h-16 bg-green-50 border border-green-200 flex items-center justify-center mb-6 rounded-sm">

                      <CheckCircle2 size={32} className="text-green-500" />

                    </div>

                    <h3 className="font-heading font-extrabold text-2xl text-primary-500 mb-2">Enquiry Received!</h3>

                    <p className="font-body text-gray-500 text-xs leading-relaxed max-w-sm">

                      Thank you for reaching out. Our team will review your enquiry and get back to you within one business day.

                    </p>

                  </div>

                ) : (

                  <form onSubmit={handleSubmit(onSubmit)} id="contact-enquiry-form" className="space-y-5 relative z-10">

                    {/* Row: Name + Email */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      <div>

                        <label className="form-label">Your Name *</label>

                        <input

                          {...register("name")}

                          className="form-input"

                          placeholder="Full name"

                        />

                        {errors.name && (

                          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>

                        )}

                      </div>

                      <div>

                        <label className="form-label">Email *</label>

                        <input

                          {...register("email")}

                          type="email"

                          className="form-input"

                          placeholder="your@email.com"

                        />

                        {errors.email && (

                          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>

                        )}

                      </div>

                    </div>



                    {/* Row: Phone + Company */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      <div>

                        <label className="form-label">Phone *</label>

                        <input

                          {...register("phone")}

                          className="form-input"

                          placeholder="+91 XXXXX XXXXX"

                        />

                        {errors.phone && (

                          <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>

                        )}

                      </div>

                      <div>

                        <label className="form-label">Business / Organization *</label>

                        <input

                          {...register("business_name")}

                          className="form-input"

                          placeholder="Hotel / Restaurant / Retail brand"

                        />

                        {errors.business_name && (

                          <p className="text-xs text-red-500 mt-1">{errors.business_name.message}</p>

                        )}

                      </div>

                    </div>



                    {/* Row: Enquiry Type + Preferred Callback Time */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      <div>

                        <label className="form-label">Enquiry Type *</label>

                        <div className="relative">

                          <select

                            {...register("enquiry_type")}

                            className="form-select pr-10 cursor-pointer"

                          >

                            <option value="">— Select what you need —</option>

                            {enquiryTypes.map((t) => (

                              <option key={t} value={t}>

                                {t}

                              </option>

                            ))}

                          </select>

                          <ChevronDown

                            size={14}

                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"

                          />

                        </div>

                        {errors.enquiry_type && (

                          <p className="text-xs text-red-500 mt-1">{errors.enquiry_type.message}</p>

                        )}

                      </div>

                      <div>

                        <label className="form-label">Preferred Callback Time</label>

                        <div className="relative">

                          <select

                            {...register("callback_time")}

                            className="form-select pr-10 cursor-pointer"

                          >

                            <option value="">— Any time is fine —</option>

                            {callbackSlots.map((s) => (

                              <option key={s} value={s}>

                                {s}

                              </option>

                            ))}

                          </select>

                          <ChevronDown

                            size={14}

                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"

                          />

                        </div>

                      </div>

                    </div>



                    {/* Message + Submit CTA Side-by-Side */}

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">

                      <div className="sm:col-span-8 md:col-span-9">

                        <label className="form-label">Message / Requirements *</label>

                        <textarea

                          {...register("message")}

                          rows={8}

                          className="form-input resize-none w-full"

                          placeholder="Tell us about your project scope, location, timeline, or any specific requirements..."

                        />

                        {errors.message && (

                          <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>

                        )}

                      </div>

                      <div className="sm:col-span-4 md:col-span-3 sm:mt-[26px] w-full">

                        <button

                          type="submit"

                          disabled={isSubmitting}

                          id="submit-enquiry-btn"

                          className="btn-accent w-full sm:h-[184px] h-14 flex flex-row sm:flex-col items-center justify-center gap-2 leading-tight uppercase font-bold text-xs tracking-wider group hover:scale-[1.03] hover:shadow-xl hover:shadow-[#B89A4A]/25 transition-all duration-300"

                        >

                          {isSubmitting ? (

                            "Sending..."

                          ) : (

                            <>

                              <Send size={22} className="sm:mb-1.5 transform group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-300" />

                              <span className="text-sm tracking-widest">Send Enquiry</span>

                            </>

                          )}

                        </button>

                      </div>

                    </div>

                  </form>

                )}

              </div>



            </div>

          </div>

        </section>

      </ScrollReveal>

    </>

  );

}