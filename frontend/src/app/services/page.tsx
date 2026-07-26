import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ServicesPage } from "@/components/sections/ServicesPage";

export const metadata: Metadata = {
  title: "Services - Sakthi Solutions | Hardware Supply & IT Networking Consulting",
  description: "Hardware supply for restaurants and bars including POS terminals, servers, thermal printers. Free IT networking consulting for new hospitality businesses. End-to-end technology solutions.",
};

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