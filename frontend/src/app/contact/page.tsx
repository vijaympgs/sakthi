import type { Metadata } from "next";
import { getCompanyInfo } from "@/lib/server";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ContactPage } from "@/components/sections/ContactPage";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyInfo();
  const name = company?.company_name || "Sakthi Solutions";
  return {
    title: `Contact Us - ${name} | Digital Signage, Kiosks & IT Solutions`,
    description: `Contact ${name} for digital signage, interactive kiosks and IT networking consulting.`,
  };
}

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}