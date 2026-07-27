import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ThemeProvider } from "@/lib/ThemeContext";
import { FloatingContactBar } from "@/components/layout/FloatingContactBar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sakthisolutions.in";

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
    images: [{ url: `${siteUrl}/assets/logo/ss-logo.png`, width: 200, height: 67, alt: "Sakthi Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakthi Solutions - Digital Signage, Kiosks & IT Solutions",
    description: "Digital signage, interactive kiosks, feedback solutions and IT consulting for hospitality, retail and corporate sectors.",
    images: [`${siteUrl}/assets/logo/ss-logo.png`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`} data-theme="sakthi" data-typography="editorial">
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
              image: `${siteUrl}/assets/logo/ss-logo.png`,
              url: siteUrl,
            }),
          }}
        />
        <QueryProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
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
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`}
          </Script>
        )}
      </body>
    </html>
  );
}