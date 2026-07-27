"use client";
import { ShieldCheck, Clock, Users, Wifi, Award, HeartHandshake, Target, Eye } from "lucide-react";
import { useCompanyInfo, usePage } from "@/hooks/useQueries";
import { SectionHeader } from "@/components/ui/SectionHeader";

const FALLBACK_WHY = [
  { icon: <Award size={24} />, title: "End-to-End Provider", description: "Hardware, installation, digital signage and IT consulting end-to-end solution for hospitality, retail and corporate sectors." },
  { icon: <Clock size={24} />, title: "Prompt Service", description: "Prompt service on all days, even after office hours. We understand that business never stops." },
  { icon: <HeartHandshake size={24} />, title: "Reliable Partner", description: "Reliable partner for regular updates, maintenance and consumables for day-to-day operations." },
  { icon: <Users size={24} />, title: "Customer-First Approach", description: "We put ourselves in your shoes so that the client gets the best solution for their business." },
  { icon: <ShieldCheck size={24} />, title: "Quality Hardware", description: "World-class products from Samsung, LG, Godspeed and other reputed global brands." },
  { icon: <Wifi size={24} />, title: "Free IT Consulting", description: "Professional IT networking consulting at no cost for new businesses. Complete guidance from planning to execution." },
];

const FALLBACK_TIMELINE = [
  { year: "2014", title: "Founded", description: "Sakthi Solutions was established by Jayakumar (25+ years in sales, retail, automation & hospitality) and Vidya Rani (sales & financial products)." },
  { year: "2015", title: "Godspeed Partnership", description: "Partnered with Godspeed for world-class digital signage products manufactured in Hong Kong and China." },
  { year: "2016", title: "Full-Stack IT Consulting", description: "Expanded to provide complete IT infrastructure consulting for the hospitality industry including networking, WiFi, and hardware." },
  { year: "2018", title: "Tellus & Childwood", description: "Added Tellus feedback solutions and Childwood children's play equipment to the product portfolio." },
  { year: "Present", title: "Growing Strong", description: "Continuing to serve corporates, hospitals, hotels, restaurants, malls and more across the region." },
];

const ABOUT_STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Clients Served" },
  { value: "1,000+", label: "Projects Delivered" },
  { value: "50+", label: "Product Partners" },
];

const FALLBACK_MISSION = {
  title: "Our Mission",
  description: "To deliver world-class digital signage and IT infrastructure solutions that empower businesses to operate efficiently and grow confidently.",
};

const FALLBACK_VISION = {
  title: "Our Vision",
  description: "To be the most trusted technology partner for hospitality, retail and corporate sectors across the region, known for quality, reliability, and innovation.",
};

export function AboutPage() {
  const { data: companyInfo } = useCompanyInfo();
  const { data: aboutPage } = usePage("about");
  const whyItems: any[] = (companyInfo?.why_items && companyInfo.why_items.length > 0) ? companyInfo.why_items : FALLBACK_WHY;
  const timeline: any[] = (companyInfo?.timeline && companyInfo.timeline.length > 0) ? companyInfo.timeline : FALLBACK_TIMELINE;
  const sections = aboutPage?.sections ?? [];
  const storySection = sections.find((s: any) => s.section_type === "story" || s.section_type === "content");
  const whatWeDoSection = sections.find((s: any) => s.section_type === "services" || s.section_type === "features");
  const storyContent = storySection?.content || null;
  const whatWeDoContent = whatWeDoSection?.content || null;

  const storyExcerpt =
    storyContent
      ?.split("\n")
      .filter((p: string) => p.trim())[0]
      ?.slice(0, 280) ?? null;

  const heroTitle = aboutPage?.hero_title || "About Us";
  const pageTitle = aboutPage?.title || "Your Technology Partner Since 2014";
  const pageDescription =
    aboutPage?.meta_description ||
    "Digital signage, interactive kiosks, feedback solutions and IT consulting for hospitality, retail and corporate sectors.";
  const heroImage = aboutPage?.hero_image || "/assets/products/r1.jpg";

  const mission = companyInfo?.mission ?? FALLBACK_MISSION;
  const vision = companyInfo?.vision ?? FALLBACK_VISION;

  return (
    <>
      {/* ── 1. Clean Section Header (replaces dark hero banner) ── */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <p className="section-label">{heroTitle}</p>
          <h1 className="heading-xl text-primary-500 mb-4">{pageTitle}</h1>
          <p className="text-body-lg text-gray-600 max-w-3xl">{pageDescription}</p>
          <div className="gold-divider" />

          {/* Highlight Block */}
          <div className="highlight-block max-w-4xl mt-8">
            <p className="text-accent-italic text-gray-700 mb-6">
              {storyExcerpt
                ? `${storyExcerpt}${storyExcerpt.length >= 280 ? "…" : ""}`
                : "We represent Godspeed, a world-class digital signage brand, and provide complete IT infrastructure solutions — from hardware selection and installation to ongoing maintenance and support."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="btn-accent">Get In Touch</a>
              <a href="/services" className="btn-outline-gold">Our Services</a>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── 2. Our Story & What We Do (two-column) ── */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Story Column */}
            <div>
              <p className="section-label">{storySection?.title || "Our Story"}</p>
              <h2 className="heading-md text-primary-500 mb-6">
                {storySection?.data?.heading || "Built on Experience, Driven by Service"}
              </h2>
              {storyContent ? (
                storyContent.split("\n").filter((p: string) => p.trim()).map((p: string, i: number) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
                ))
              ) : (
                <>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Sakthi Solutions was founded in 2014 by a dynamic couple bringing together decades of combined expertise.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The company provides end-to-end IT consulting and digital signage solutions for hospitality, retail and corporate sectors.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    We represent Godspeed, a world-class digital signage brand with manufacturing units in Hong Kong and China.
                  </p>
                </>
              )}
            </div>

            {/* What We Do Column */}
            <div>
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden mb-8 border border-gray-200">
                <img
                  src={storySection?.image || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"}
                  alt="Digital signage installation"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="section-label">{whatWeDoSection?.title || "What We Do"}</p>
              <h2 className="heading-md text-primary-500 mb-6">
                {whatWeDoSection?.data?.heading || "Complete IT Infrastructure Solutions"}
              </h2>
              {whatWeDoContent ? (
                whatWeDoContent.split("\n").filter((p: string) => p.trim()).map((p: string, i: number) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
                ))
              ) : (
                <>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We provide IT infrastructure consulting including networking, network cable laying, WiFi site surveys, and enterprise-standard hardware.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    From digital signage and interactive kiosks to feedback solutions and IT networking, we cover the complete technology needs of your business under one roof.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Hero image (from old hero banner) shown below the two-column layout */}
          <div className="mt-16 aspect-[21/9] bg-gray-100 overflow-hidden border border-gray-200">
            <img
              src={heroImage}
              alt={heroTitle}
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      </section>

      {/* ── 3. Our Mission & Vision (two-column feature cards) ── */}
      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <SectionHeader
            label="Our Purpose"
            title="Mission & Vision"
            subtitle="Guided by clear principles, driven by purpose."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="card group">
              <div className="w-14 h-14 bg-primary-50 flex items-center justify-center mb-5 text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                <Target size={28} />
              </div>
              <h3 className="heading-sm text-primary-500 mb-3">{mission.title}</h3>
              <p className="text-gray-600 leading-relaxed">{mission.description}</p>
            </div>

            {/* Vision Card */}
            <div className="card group">
              <div className="w-14 h-14 bg-primary-50 flex items-center justify-center mb-5 text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                <Eye size={28} />
              </div>
              <h3 className="heading-sm text-primary-500 mb-3">{vision.title}</h3>
              <p className="text-gray-600 leading-relaxed">{vision.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Why Sakthi Solutions (cards grid) ── */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeader
            label="Our Strengths"
            title="Why Sakthi Solutions"
            subtitle="Here's why businesses trust us as their technology partner."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyItems.map((item: any, i: number) => (
              <div key={item.title || i} className="card group hover:-translate-y-1 transition-transform duration-200">
                <div className="w-12 h-12 bg-primary-50 flex items-center justify-center mb-4 text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                  {FALLBACK_WHY[i]?.icon || <ShieldCheck size={24} />}
                </div>
                <h3 className="font-semibold text-primary-500 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Timeline ── */}
      <section className="section-padding bg-surface-muted">
        <div className="container-page">
          <SectionHeader
            label="Our Journey"
            title="Timeline"
            subtitle="From a vision to a trusted technology partner."
            align="center"
          />
          <div className="max-w-3xl mx-auto">
            {timeline.map((item: any, index: number) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-accent-500 text-white flex items-center justify-center text-xs font-bold shrink-0 font-heading">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && <div className="w-px bg-gray-200 flex-1 mt-2" />}
                </div>
                <div className="pb-8">
                  <h3 className="font-semibold text-primary-500 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="section-padding bg-primary-500 text-white">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {(companyInfo?.stats && companyInfo.stats.length > 0 ? companyInfo.stats : ABOUT_STATS).map((stat: any) => (
              <div key={stat.label} className="animate-fade-up">
                <div className="stat-value text-accent-500 mb-1">{stat.value}</div>
                <div className="stat-label text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
