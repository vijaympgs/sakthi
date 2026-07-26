import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sakthisolutions.in";

interface GenerateMetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function generateMetadata({ title, description, path, image }: GenerateMetadataProps): Metadata {
  return {
    title: `${title} | Sakthi Solutions`,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${path}`,
      siteName: "Sakthi Solutions",
      type: "website",
      ...(image && { images: [{ url: image }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}