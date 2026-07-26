import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ label, title, subtitle, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", "mb-12 md:mb-16", className)}>
      {label && <p className="text-sm font-semibold uppercase tracking-widest text-accent-500 mb-3">{label}</p>}
      <h2 className="heading-lg text-primary-500">{title}</h2>
      {subtitle && <p className="text-body-lg text-gray-500 mt-4 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
}