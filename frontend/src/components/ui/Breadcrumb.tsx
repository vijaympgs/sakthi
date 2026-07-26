import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: "standalone" | "inline";
}

export function Breadcrumb({ items, variant = "inline" }: BreadcrumbProps) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  const breadcrumbContent = (
    <ol className="flex items-center gap-1.5 text-xs text-gray-400">
      {allItems.map((item, index) => (
        <li key={index} className="flex items-center gap-1.5">
          {index > 0 && <ChevronRight size={12} className="text-gray-500" />}
          {item.href && index < allItems.length - 1 ? (
            <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
          ) : (
            <span className="text-gray-300 font-medium">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  );

  const jsonLd = (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: allItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: item.href ? `https://sakthi-solutions.vercel.app${item.href}` : undefined,
          })),
        }),
      }}
    />
  );

  if (variant === "standalone") {
    return (
      <>
        <nav aria-label="Breadcrumb" className="bg-surface-muted border-b border-gray-100">
          <div className="container-page py-3">
            {breadcrumbContent}
          </div>
        </nav>
        {jsonLd}
      </>
    );
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-4">
        {breadcrumbContent}
      </nav>
      {jsonLd}
    </>
  );
}