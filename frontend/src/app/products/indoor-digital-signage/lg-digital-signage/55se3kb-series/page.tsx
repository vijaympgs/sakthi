import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FEATURES, SPECS, renderPage } from "../shared";

export const metadata: Metadata = {
  title: "LG 55SE3KB Digital Signage - 55\" Commercial Display - Sakthi Solutions",
  description: "LG 55SE3KB 55\" commercial display with 500 cd/m\u00b2 brightness, Full HD resolution, IPS panel. Enterprise-grade digital signage for retail displays, menu boards and meeting rooms.",
};

export default function LG55SE3KBPage() {
  return renderPage("55SE3KB", "55\"", "500 cd/m\u00b2", "Retail displays, menu boards, meeting rooms", "20.5kg");
}
