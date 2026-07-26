import type { Metadata } from "next";
import { ProductDetailClient } from "./ProductDetailClient";

const HARDCODED_SLUGS = new Set([
  "tellus", "childwood", "indoor-digital-signage", "godspeed",
]);

export const dynamicParams = true;

export function generateStaticParams() {
  return []; // dynamic products render on request
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (HARDCODED_SLUGS.has(slug)) return {};
  return { title: `${slug.replace(/-/g, " ")} - Sakthi Solutions` };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (HARDCODED_SLUGS.has(slug)) return null; // handled by static page
  return <ProductDetailClient slug={slug} />;
}
