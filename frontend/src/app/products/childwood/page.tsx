import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ChildwoodClient } from "./ChildwoodClient";

export const metadata: Metadata = {
  title: "Childwood Play Equipment - Sakthi Solutions | Indoor & Outdoor Children's Play Equipment",
  description: "Childwood indoor and outdoor children's play equipment including playstations, spring rockers, swings, slides, rideons, tunnels and EVA mat floorings. 130+ products for restaurants, malls and schools.",
};

export default function ChildwoodPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <ChildwoodClient />
      </main>
      <Footer />
    </>
  );
}
