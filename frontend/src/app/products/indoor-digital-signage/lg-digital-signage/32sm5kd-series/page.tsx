import type { Metadata } from "next";
import { FEATURES, SPECS, renderPage } from "../shared";

export const metadata: Metadata = {
  title: "LG 32SM5KD Digital Signage - 32\" Commercial Display - Sakthi Solutions",
  description: "LG 32SM5KD 32\" commercial display with Full HD resolution, designed for retail signage, corporate lobbies and hospitality. Enterprise-grade digital signage solution.",
};

export default function LG32SM5KDPage() {
  return renderPage("32SM5KD", "32\"", "400 cd/m\u00b2", "Retail signage, corporate lobbies, hospitality", "8.5kg");
}
