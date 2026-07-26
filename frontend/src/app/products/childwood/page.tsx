import type { Metadata } from "next";
import { ChildwoodClient } from "./ChildwoodClient";

export const metadata: Metadata = {
  title: "Childwood Play Equipment - Sakthi Solutions | Indoor & Outdoor Children's Play Equipment",
  description: "Childwood indoor and outdoor children's play equipment including playstations, spring rockers, swings, slides, rideons, tunnels and EVA mat floorings. 130+ products for restaurants, malls and schools.",
};

export default function ChildwoodPage() {
  return <ChildwoodClient />;
}
