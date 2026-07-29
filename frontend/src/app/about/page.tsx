import type { Metadata } from "next";
import { getCompanyInfo } from "@/lib/server";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { AboutPage } from "@/components/sections/AboutPage";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyInfo();
  const name = company?.company_name || "Sakthi Solutions";
  return {
    title: `About Us - ${name} | Digital Signage & IT Consulting`,
    description: `${name} provides end-to-end IT consulting, digital signage solutions for hospitality, retail and corporate sectors.`,
  };
}

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="pt-20 lg:pt-[88px]">
        <AboutPage />
      </main>
      <Footer />
    </>
  );
}