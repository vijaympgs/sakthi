import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://sakthi-solutions.vercel.app"}/sitemap.xml`,
  };
}
// build bust Tue, Jul 28, 2026  9:20:54 PM
// build bust Tue, Jul 28, 2026  9:21:03 PM
