import type { Metadata } from "next";
export const dynamic = "force-dynamic";

import { ProductDetailClient } from "./ProductDetailClient";

export const dynamicParams = true;

export function generateStaticParams() {
  return []; // dynamic products render on request
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}` };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
