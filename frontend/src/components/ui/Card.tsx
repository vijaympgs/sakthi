import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CardProps {
  title: string;
  description: string;
  image?: string;
  href?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function Card({ title, description, image, href, icon, className }: CardProps) {
  const content = (
    <div className={cn("card group", className)}>
      {image && (
        <div className="aspect-video bg-gray-100 mb-4 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      {icon && <div className="mb-4 text-label">{icon}</div>}
      <h3 className="heading-sm text-primary-500 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      {href && (
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-label group-hover:text-label/80">
          <span>Explore</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}