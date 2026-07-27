import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { OutdoorPlayClient } from "./OutdoorPlayClient";

export const metadata: Metadata = {
  title: "Outdoor Play Equipment - Sakthi Solutions | Childwood play systems",
  description: "Complete range of outdoor play systems including multi-level playstations, spring rockers, see-saws, and swings.",
};

export default function OutdoorPlayPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <OutdoorPlayClient />
      </main>
      <Footer />
    </>
  );
}
