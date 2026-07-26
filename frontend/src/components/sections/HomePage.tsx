"use client";

import Link from "next/link";
import { ArrowRight, Monitor, Wifi, ShieldCheck, Clock, Users, Baby, Star, Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/ui/CTA";
import { CountUp } from "@/components/ui/CountUp";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTestimonials, usePartners, useProductCategories, useIndustries } from "@/hooks/useQueries";
//

function ScrollReveal({ children, className = "", stagger = false }: { children: React.ReactNode; className?: string; stagger?: boolean }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);
  return (
    <div ref={ref} className={`${stagger ? "scroll-reveal-stagger" : "scroll-reveal"} ${isVisible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function HomePage() {
  const { data: apiTestimonials } = useTestimonials();
  const { data: apiPartners } = usePartners();
  const { data: apiCategories } = useProductCategories();
  const { data: apiIndustries } = useIndustries();

  const testimonials = apiTestimonials ?? [];
  const partners = apiPartners ?? [];
  const categories = apiCategories ?? [];
  const industries: string[] = apiIndustries ? apiIndustries.map((i: { name: string }) => i.name) : [];

  return (
    <>
      <section className="bg-primary-500 text-white relative overflow-hidden">
        <div className="container-page py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-up">
              <p className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-label bg-label/10 px-3 py-1.5 border border-label/30 mb-4">
                Since 2014 &mdash; Chennai &bull; Hospitality &amp; Retail IT Partner
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                Digital Signage, Kiosks<br />
                &amp; <span className="text-[#f54337]">IT Solutions</span>
              </h1>
              <p className="text-base md:text-lg text-gray-300 max-w-2xl mb-6 leading-relaxed">
                Complete end-to-end technology partner for restaurants, hotels, retail outlets, and corporate spaces. High-performance hardware, customized digital displays, and 24/7 on-ground support.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/products" className="bg-[#f54337] hover:bg-[#e12f23] text-white px-6 py-3 font-bold transition-all shadow-lg hover:shadow-red-500/20 text-sm inline-flex items-center justify-center">
                  Explore Products
                  <ArrowRight size={16} className="ml-2" />
                </Link>
                <Link href="/contact" className="border-2 border-white/80 text-white px-6 py-3 font-semibold hover:bg-white hover:text-[#1a1a2e] transition-all text-sm inline-flex items-center justify-center">
                  Book Free IT Consultation
                </Link>
              </div>
            </div>
            <div className="hidden lg:block animate-fade-up-delay-2">
              <div className="relative">
                <div className="aspect-[4/3] bg-primary-600 border border-gray-700/50 overflow-hidden">
                  <img
                    src="https://sakthisolutions.in/sakthisolutions/uploads/2018/04/ss-logo.png"
                    alt="Godspeed Digital Signage"
                    className="w-full h-full object-contain p-8 opacity-90"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[#f54337] px-4 py-2">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Godspeed Partner</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-gray-800 bg-[#121224]/80 backdrop-blur-sm">
          <div className="container-page py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "→", text: "Digital Signage & Video Walls" },
                { icon: "→", text: "Interactive Kiosks" },
                { icon: "→", text: "IT Networking Consulting" },
                { icon: "→", text: "Feedback Solutions" },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-2 text-xs text-gray-200">
                  <span className="p-1.5 bg-label/10 border border-label/30 text-label shrink-0">{f.icon}</span>
                  <span className="font-medium leading-tight">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <ScrollReveal>
        <section className="section-padding bg-white">
          <div className="container-page">
            <SectionHeader
              title="Products & Solutions"
              subtitle="International-grade hardware and signage solutions for hospitality, retail and corporate sectors"
              showLabel={false}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(categories as Array<{ name: string; description?: string; slug?: string; image?: string }>).map((cat, i) => (
                <Card key={cat.slug ?? i} title={cat.name} description={cat.description ?? ""} href={cat.slug ? `/products/${cat.slug}` : undefined} />
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal stagger>
        <section className="section-padding bg-surface-muted">
          <div className="container-page">
            <SectionHeader
              title="The Sakthi Advantage"
              subtitle="We put ourselves in your shoes so that you get the best technology solution"
              showLabel={false}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {([] as Array<{ icon: React.ReactNode; title: string; description: string }>).map((item) => (
                <div key={item.title} className="card text-center group hover:-translate-y-1 transition-transform duration-200">
                  <div className="w-14 h-14 bg-primary-50 flex items-center justify-center mx-auto mb-4 text-primary-500 group-hover:bg-label/10 group-hover:text-label transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-primary-500 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal stagger>
        <section className="section-padding bg-white">
          <div className="container-page">
            <SectionHeader
              title="Trusted Across Sectors"
              showLabel={false}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center gap-3 p-4 border border-gray-100 hover:border-label/40 transition-colors">
                  <div className="w-2 h-2 bg-label shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-12 bg-surface-muted border-y border-gray-100">
          <div className="container-page">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">Technology Partners</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {partners.map((partner: { name: string; type: string }) => (
                <div key={partner.name} className="text-center group flex flex-col items-center gap-1">
                  <PartnerLogo name={partner.name} />
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">{partner.type}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
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
                {[
                  { value: 10, suffix: "+", label: "Years of Experience" },
                  { value: 3, suffix: "", label: "Product Lines" },
                  { value: 12, suffix: "+", label: "Industries Served" },
                  { value: 7, suffix: "+", label: "Technology Partners" },
                ].map((stat) => (
                  <div key={stat.label} className="card text-center group hover:-translate-y-1 transition-transform duration-200">
                    <div className="text-3xl font-bold text-primary-500 mb-1 group-hover:text-label transition-colors">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal stagger>
        <section className="section-padding bg-surface-muted">
          <div className="container-page">
            <SectionHeader
              title="What Our Clients Say"
              showLabel={false}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t: { author: string; rating: number; quote: string; title: string; company: string }) => (
                <div key={t.author} className="card bg-white border border-gray-100 group hover:-translate-y-1 transition-transform duration-200">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-label text-label" />
                    ))}
                  </div>
                  <div className="mb-4">
                    <Quote size={24} className="text-label/30" />
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
      </ScrollReveal>

      <ScrollReveal stagger>
        <section className="section-padding bg-white border-t border-gray-100">
          <div className="container-page">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">Trusted By</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {([] as string[]).map((name) => (
                <div key={name} className="flex items-center justify-center h-16 px-4 border border-gray-100 bg-surface-muted hover:border-label/40 transition-colors">
                  <span className="text-sm font-semibold text-gray-500 text-center leading-tight">{name}</span>
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