import type { Metadata } from "next";
import { getCompanyInfo } from "@/lib/server";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ProductsPage } from "@/components/sections/ProductsPage";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyInfo();
  const name = company?.company_name || "Sakthi Solutions";
  return {
    title: `Products - ${name} | Digital Signage, Kiosks & Solutions`,
    description: `Explore our range of digital signage, smart touch tables, wayfinding kiosks, touch screen kiosks and video walls.`,
  };
}

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="pt-20 lg:pt-[88px]">
        <ProductsPage />
      </main>
      <Footer />
    </>
  );
}