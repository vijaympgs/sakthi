"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface HeroData {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  primaryCta?: { label: string; url: string } | null;
  secondaryCta?: { label: string; url: string } | null;
  overlay?: string;
  alignment?: "left" | "center";
}

export function HeroSection({ data }: { data: HeroData }) {
  const {
    title,
    subtitle,
    description,
    image,
    primaryCta,
    secondaryCta,
    alignment = "left",
  } = data;

  if (!title && !subtitle && !description) return null;

  return (
    <section
      className="bg-primary-500 text-white py-20 md:py-28 relative overflow-hidden"
      style={image ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      {image && <div className="absolute inset-0 bg-black/50" />}
      <div className={`container-page relative z-10 ${alignment === "center" ? "text-center" : ""}`}>
        <div className={`grid grid-cols-1 ${image ? "lg:grid-cols-2" : ""} gap-8 items-center`}>
          <div className={alignment === "center" ? "mx-auto max-w-3xl" : ""}>
            {subtitle && (
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">{subtitle}</p>
            )}
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
            )}
            {description && (
              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">{description}</p>
            )}
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-wrap gap-4 mt-8">
                {primaryCta && (
                  <Link href={primaryCta.url} className="btn-accent shadow-lg">
                    {primaryCta.label}
                    <ArrowRight size={14} className="ml-2" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link href={secondaryCta.url} className="btn-outline-gold">
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>
          {image && (
            <div className="hidden lg:block">
              <div className="aspect-[4/3] bg-primary-600 border border-gray-700/50 overflow-hidden">
                <img src={image} alt={title || ""} className="w-full h-full object-cover opacity-80" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
