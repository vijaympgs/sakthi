import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { FloatingContactBar } from "@/components/layout/FloatingContactBar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sakthi Solutions - Digital Signage, Kiosks & IT Solutions",
  description:
    "Sakthi Solutions provides digital signage, interactive kiosks, feedback solutions and IT consulting for hospitality, retail and corporate sectors. Godspeed Digital Signage, Tellus Feedback, Childwood and more.",
  keywords: [
    "digital signage Chennai",
    "video wall India",
    "interactive kiosk",
    "touch screen kiosk",
    "Godspeed digital signage",
    "wayfinding kiosk",
    "smart touch table",
    "feedback kiosk",
    "Tellus feedback solution",
    "IT consulting Chennai",
    "hospitality technology",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary-500 focus:text-white focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to main content
        </a>
        <QueryProvider>
          {children}
          <FloatingContactBar />
        </QueryProvider>
      </body>
    </html>
  );
}