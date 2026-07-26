import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FEATURES, SPECS, renderPage } from "../shared";

export const metadata: Metadata = {
  title: "LG 49SE3KB Digital Signage - 49\" Commercial Display - Sakthi Solutions",
  description: "LG 49SE3KB 49\" commercial display with 500 cd/m\u00b2 brightness, Full HD resolution, IPS panel. Enterprise-grade digital signage for retail, corporate signage and hospitality.",
};

export default function LG49SE3KBPage() {
  return renderPage("49SE3KB", "49\"", "500 cd/m\u00b2", "Retail, corporate signage, hospitality", "16.8kg");
}
