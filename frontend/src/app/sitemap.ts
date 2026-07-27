import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://sakthi-solutions.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── NAV: Home ──
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },

    // ── NAV: About Us ──
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },

    // ── NAV: Products → Godspeed ──
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
    { url: `${base}/32sm5kd-series`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },          // T8: fixed path
    { url: `${base}/products/smart-touch-table`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/products/wayfinding-kiosk`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/products/touch-screen-kiosk`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/products/video-wall`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },

    // ── NAV: Products → Tellus ──
    { url: `${base}/products/tellus`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tell-us-feedback-solution`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 }, // T10: added
    { url: `${base}/feedback-solution`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },          // T10: added

    // ── NAV: Products → Childwood ──
    { url: `${base}/products/childwood`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/outdoor-play-equipment`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },    // T10: added
    { url: `${base}/indoor-play-equipments`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },    // T10: added

    // ── NAV: Services ──
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // T9: removed broken /services/hardware and /services/it-networking

    // ── Image Galleries ──
    { url: `${base}/image-gallery/playstations`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },

    // ── NAV: Blog ──
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },

    // ── Childwood sub-pages ──
    { url: `${base}/products/childwood/outdoor-play-equipment`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/products/childwood/indoor-play-equipment`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },

    // ── NAV: Contact Us ──
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
