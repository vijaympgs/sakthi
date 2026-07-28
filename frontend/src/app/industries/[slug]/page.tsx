import type { Metadata } from "next";
import { getCompanyInfo } from "@/lib/server";
import { IndustryDetailClient } from "./IndustryDetailClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyInfo();
  const name = company?.company_name || "";
  return {
    title: `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} - ${name}`,
    description: company?.seo_description || "",
  };
}

export const dynamic = "force-dynamic";

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <IndustryDetailClient slug={slug} />;
}
