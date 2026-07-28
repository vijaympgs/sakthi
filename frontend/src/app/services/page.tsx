import type { Metadata } from "next";
import { getCompanyInfo } from "@/lib/server";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ServicesPage } from "@/components/sections/ServicesPage";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyInfo();
  const name = company?.company_name || "Sakthi Solutions";
  return {
    title: `Services - ${name} | Hardware Supply & IT Networking Consulting`,
    description: `Hardware supply for restaurants and bars including POS terminals, servers, thermal printers. Free IT networking consulting for new hospitality businesses.`,
  };
}

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <ServicesPage />
      </main>
      <Footer />
    </>
  );
}