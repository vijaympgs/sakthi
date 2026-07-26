import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTA({ title, subtitle, primaryLabel = "Contact Us", primaryHref = "/contact", secondaryLabel, secondaryHref }: CTAProps) {
  return (
    <section className="bg-primary-500 text-white py-16 md:py-24">
      <div className="container-page text-center max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">Get Started</p>
        <h2 className="heading-lg mb-4">{title}</h2>
        {subtitle && <p className="text-lg text-gray-300 mb-8">{subtitle}</p>}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={primaryHref} className="btn-accent">
            {primaryLabel}
            <ArrowRight size={16} className="ml-2" />
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link href={secondaryHref} className="border-2 border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-primary-500 transition-colors">
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}