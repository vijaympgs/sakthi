import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FEATURES, SPECS, renderPage } from "../shared";

export const metadata: Metadata = {
  title: "LG 32SE3KB Digital Signage - 32\" Commercial Display - Sakthi Solutions",
  description: "LG 32SE3KB 32\" commercial display with 400 cd/m\u00b2 brightness, Full HD resolution, IPS panel. Enterprise-grade digital signage for small format signage and info kiosks.",
};

export default function LG32SE3KBPage() {
  return renderPage("32SE3KB", "32\"", "400 cd/m\u00b2", "Small format signage, info kiosks, counters", "9.2kg");
}
