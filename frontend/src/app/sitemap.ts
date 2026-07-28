import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://sakthisolutions.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    const baseUrl = apiUrl.replace(/\/api\/?$/, "");

    // Fetch dynamic product pages
    const productsRes = await fetch(`${baseUrl}/cms/products/`, { next: { revalidate: 3600 } });
    if (productsRes.ok) {
      const products = await productsRes.json();
      const productList = Array.isArray(products) ? products : products.results ?? [];
      for (const p of productList) {
        entries.push({
          url: `${base}/products/${p.slug}`,
          lastModified: new Date(p.updated_at || p.created_at || Date.now()),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  } catch {
    // API unavailable — serve static entries only
  }

  return entries;
}
