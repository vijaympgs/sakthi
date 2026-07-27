import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { IndoorPlayClient } from "./IndoorPlayClient";

export const metadata: Metadata = {
  title: "Indoor Play Equipment - Sakthi Solutions | Childwood play systems",
  description: "Complete range of indoor play systems including soft play units, crawl tunnels, slides, rideons, and EVA safety foam floorings.",
};

export default function IndoorPlayPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <IndoorPlayClient />
      </main>
      <Footer />
    </>
  );
}
