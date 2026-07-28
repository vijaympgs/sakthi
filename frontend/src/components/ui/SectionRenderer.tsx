"use client";

import { HeroSection, type HeroData } from "@/components/ui/HeroSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTA } from "@/components/ui/CTA";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface SectionData {
  id: number;
  section_type: string;
  title: string;
  content: string;
  image: string;
  data: Record<string, unknown>;
  sort_order: number;
  is_visible: boolean;
}

function buildHeroData(section: SectionData): HeroData {
  const d = section.data || {};
  return {
    title: section.title || (d.title as string) || "",
    subtitle: d.subtitle as string || "",
    description: section.content || (d.description as string) || "",
    image: section.image || (d.image as string) || "",
    primaryCta: d.primaryCta ? d.primaryCta as { label: string; url: string } : null,
    secondaryCta: d.secondaryCta ? d.secondaryCta as { label: string; url: string } : null,
    alignment: (d.alignment as "left" | "center") || "left",
  };
}

function ContentSection({ section }: { section: SectionData }) {
  const paragraphs = (section.content || "").split("\n").filter((p: string) => p.trim());
  if (!paragraphs.length) return null;
  return (
    <section className="section-padding bg-white">
      <div className="container-page max-w-4xl">
        {section.title && <h2 className="heading-md text-primary-500 mb-6">{section.title}</h2>}
        {paragraphs.map((p: string, i: number) => (
          <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
        ))}
        {section.image && (
          <img src={section.image} alt={section.title || ""} className="mt-6 w-full max-w-2xl rounded" />
        )}
      </div>
    </section>
  );
}

function FeaturesSection({ section }: { section: SectionData }) {
  const items = section.data?.items as Array<{ title: string; description: string; icon?: string }> | undefined;
  if (!items || !items.length) return null;
  return (
    <section className="section-padding bg-surface-muted">
      <div className="container-page">
        {section.title && (
          <SectionHeader
            label={section.data?.label as string || ""}
            title={section.title}
            subtitle={section.data?.subtitle as string || ""}
            align={section.data?.align as "left" | "center" | undefined}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="card bg-white p-5 border border-gray-200 group hover:-translate-y-1 transition-transform duration-200">
              {item.icon && <div className="w-12 h-12 bg-primary-50 flex items-center justify-center text-label mb-4 text-2xl">{item.icon}</div>}
              <h3 className="font-bold text-primary-500 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChecklistSection({ section }: { section: SectionData }) {
  const items = section.data?.items as Array<{ title: string; description: string }> | undefined;
  if (!items || !items.length) return null;
  return (
    <section className="section-padding bg-surface-muted">
      <div className="container-page">
        {section.title && (
          <SectionHeader
            label={section.data?.label as string || ""}
            title={section.title}
            subtitle={section.data?.subtitle as string || ""}
            align={section.data?.align as "left" | "center" | undefined}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <div key={i} className="card bg-white p-5 border border-gray-200 group hover:-translate-y-1 transition-transform duration-200">
              <div className="flex items-center gap-2 mb-2 text-label">
                <CheckCircle2 size={18} />
                <h3 className="font-bold text-primary-500 text-sm">{item.title}</h3>
              </div>
              {item.description && <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ section }: { section: SectionData }) {
  const d = section.data || {};
  return (
    <CTA
      title={section.title || (d.title as string) || ""}
      subtitle={section.content || (d.description as string) || ""}
      primaryHref={d.ctaUrl as string || "/contact"}
    />
  );
}

function ImageSection({ section }: { section: SectionData }) {
  if (!section.image) return null;
  return (
    <section className="section-padding bg-white">
      <div className="container-page max-w-5xl">
        <img
          src={section.image}
          alt={section.title || ""}
          className="w-full h-auto rounded shadow-lg"
        />
        {section.title && <p className="text-sm text-gray-500 mt-3 text-center">{section.title}</p>}
      </div>
    </section>
  );
}

function TwoColumnSection({ section }: { section: SectionData }) {
  const d = section.data || {};
  const rightContent = d.rightContent as string || "";
  const paragraphs = (section.content || "").split("\n").filter((p: string) => p.trim());
  if (!paragraphs.length && !rightContent) return null;
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            {section.title && <h2 className="heading-md text-primary-500 mb-6">{section.title}</h2>}
            {paragraphs.map((p: string, i: number) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
            ))}
          </div>
          <div>
            {section.image && (
              <img src={section.image} alt={section.title || ""} className="w-full rounded shadow-lg mb-4" />
            )}
            {rightContent && (
              <div className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: rightContent }} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionRenderer({ sections }: { sections: SectionData[] }) {
  const visible = sections.filter((s) => s.is_visible !== false).sort((a, b) => a.sort_order - b.sort_order);

  return (
    <>
      {visible.map((section) => {
        switch (section.section_type) {
          case "hero":
            return <HeroSection key={section.id} data={buildHeroData(section)} />;
          case "content":
          case "story":
            return <ContentSection key={section.id} section={section} />;
          case "features":
            return <FeaturesSection key={section.id} section={section} />;
          case "checklist":
            return <ChecklistSection key={section.id} section={section} />;
          case "cta":
            return <CTASection key={section.id} section={section} />;
          case "image":
            return <ImageSection key={section.id} section={section} />;
          case "two-column":
          case "services":
          case "about":
            return <TwoColumnSection key={section.id} section={section} />;
          default:
            return <ContentSection key={section.id} section={section} />;
        }
      })}
    </>
  );
}
