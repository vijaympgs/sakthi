import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sakthi-solutions.vercel.app";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/products/godspeed`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/products/indoor-digital-signage`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/products/indoor-digital-signage/floor-standing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/products/indoor-digital-signage/wall-mounting`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/products/indoor-digital-signage/lg-digital-signage`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/products/indoor-digital-signage/lg-digital-signage/32se3kb-series`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/products/indoor-digital-signage/lg-digital-signage/43se3kb-series`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/products/indoor-digital-signage/lg-digital-signage/49se3kb-series`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/products/indoor-digital-signage/lg-digital-signage/55se3kb-series`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/products/indoor-digital-signage/lg-digital-signage/65se3kb-series`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/products/indoor-digital-signage/lg-digital-signage/32sm5kd-series`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/products/smart-touch-table`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/products/wayfinding-kiosk`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/products/touch-screen-kiosk`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/products/video-wall`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/products/tellus`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/products/childwood`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
