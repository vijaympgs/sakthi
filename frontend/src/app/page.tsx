import type { Metadata } from "next";
import { getCompanyInfo } from "@/lib/server";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/components/sections/HomePage";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyInfo();
  const name = company?.company_name || "Sakthi Solutions";
  return {
    title: `${name} - Digital Signage, Kiosks & IT Solutions`,
    description: `${name} provides digital signage, interactive kiosks and IT solutions for hospitality, retail and corporate sectors.`,
  };
}

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HomePage />
      </main>
      <Footer />
    </>
  );
}