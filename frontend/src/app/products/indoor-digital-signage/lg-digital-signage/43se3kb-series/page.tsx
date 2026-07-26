import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FEATURES, SPECS, renderPage } from "../shared";

export const metadata: Metadata = {
  title: "LG 43SE3KB Digital Signage - 43\" Commercial Display - Sakthi Solutions",
  description: "LG 43SE3KB 43\" commercial display with 500 cd/m\u00b2 brightness, Full HD resolution, IPS panel. Enterprise-grade digital signage for menu boards, retail and information displays.",
};

export default function LG43SE3KBPage() {
  return renderPage("43SE3KB", "43\"", "500 cd/m\u00b2", "Menu boards, retail, information displays", "13.8kg");
}
