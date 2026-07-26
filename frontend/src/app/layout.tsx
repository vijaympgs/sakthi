import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { FloatingContactBar } from "@/components/layout/FloatingContactBar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = "https://sakthi-solutions.vercel.app";

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
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Sakthi Solutions",
    title: "Sakthi Solutions - Digital Signage, Kiosks & IT Solutions",
    description: "Digital signage, interactive kiosks, feedback solutions and IT consulting for hospitality, retail and corporate sectors. Serving Chennai and pan-India since 2014.",
    url: siteUrl,
    images: [{ url: `${siteUrl}/assets/products/ss-logo.png`, width: 200, height: 67, alt: "Sakthi Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakthi Solutions - Digital Signage, Kiosks & IT Solutions",
    description: "Digital signage, interactive kiosks, feedback solutions and IT consulting for hospitality, retail and corporate sectors.",
    images: [`${siteUrl}/assets/products/ss-logo.png`],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Sakthi Solutions",
              url: siteUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${siteUrl}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Sakthi Solutions",
              image: "https://sakthisolutions.in/sakthisolutions/uploads/2018/04/ss-logo.png",
              url: "https://sakthi-solutions.vercel.app",
              telephone: ["+91 9840057127", "+91 9381459199", "044-26420089"],
              email: "info@sakthisolutions.in",
              foundingDate: "2014",
              founder: [
                { "@type": "Person", name: "Jayakumar" },
                { "@type": "Person", name: "Vidya Rani" },
              ],
              address: [
                {
                  "@type": "PostalAddress",
                  name: "Registered Office",
                  streetAddress: "F7, 1st Floor, 40/26 Arani Muthu Street, Choolai",
                  addressLocality: "Chennai",
                  addressRegion: "Tamil Nadu",
                  postalCode: "600112",
                  addressCountry: "IN",
                },
                {
                  "@type": "PostalAddress",
                  name: "Sales Office",
                  streetAddress: "1/1, 1st Floor, General Collins Road, Choolai",
                  addressLocality: "Chennai",
                  addressRegion: "Tamil Nadu",
                  postalCode: "600112",
                  addressCountry: "IN",
                },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Products and Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Signage" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interactive Kiosks" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT Networking Consulting" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Feedback Solutions" } },
                  { "@type": "Offer", itemOffered: { "@type": "Product", name: "Godspeed Digital Signage" } },
                  { "@type": "Offer", itemOffered: { "@type": "Product", name: "Tellus Feedback Solution" } },
                  { "@type": "Offer", itemOffered: { "@type": "Product", name: "Childwood Play Equipment" } },
                ],
              },
              areaServed: { "@type": "Country", name: "IN" },
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "18:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:00", closes: "18:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "18:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "18:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "18:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "18:00" },
              ],
              sameAs: [
                "https://www.facebook.com/Sakthi-Solutions-276890643116200/",
                "https://www.linkedin.com/company/sakthi-solutions/",
                "https://www.youtube.com/channel/UCxRoJTQKDHkLFj6hFCTHW0g",
              ],
            }),
          }}
        />
        <QueryProvider>
          {children}
          <FloatingContactBar />
        </QueryProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}