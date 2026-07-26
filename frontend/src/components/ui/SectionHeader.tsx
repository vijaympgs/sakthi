import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  showLabel?: boolean;
}

export function SectionHeader({ label, title, subtitle, align = "center", className, showLabel = true }: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", "mb-12 md:mb-16", className)}>
      {label && showLabel && <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-3">{label}</p>}
      <h2 className="heading-lg text-primary-500">{title}</h2>
      {subtitle && <p className="text-body-lg text-gray-500 mt-4 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
}