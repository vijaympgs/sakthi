"use client";

import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductSpecsSection } from "@/components/ui/ProductSpecsSection";
import { useProduct } from "@/hooks/useQueries";

export function ProductDetailClient({ slug }: { slug: string }) {
  const { data: product, isLoading } = useProduct(slug);

  if (isLoading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-page text-center"><p className="text-gray-500">Loading product details...</p></div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="section-padding bg-white">
        <div className="container-page text-center">
          <h1 className="heading-lg text-primary-500">Product Not Found</h1>
          <p className="text-gray-500 mt-4">This product could not be loaded.</p>
          <Link href="/products" className="btn-primary mt-6 inline-block">View All Products</Link>
        </div>
      </section>
    );
  }

  const features = product.features ?? [];
  const heroTitle = product.hero_title || product.name;
  const heroDesc = product.short_description || product.description || "";
  const heroImage = product.image || product.hero_image || null;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sakthi-solutions.vercel.app";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: heroDesc,
    ...(heroImage ? { image: heroImage.startsWith("http") ? heroImage : `${siteUrl}${heroImage}` } : {}),
    brand: {
      "@type": "Brand",
      name: product.category_name || "",
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${slug}`,
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "Contact for pricing",
        priceCurrency: "INR",
      },
    },
  };

  // Helper: determine image URL for JSON-LD
  const getJsonLdImage = () => {
    if (!heroImage) return undefined;
    return heroImage.startsWith("http") ? heroImage : `${siteUrl}${heroImage}`;
  };
  const jsonLdImage = getJsonLdImage();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: heroDesc,
            ...(jsonLdImage ? { image: jsonLdImage } : {}),
            brand: { "@type": "Brand", name: product.category_name || "" },
            offers: {
              "@type": "Offer",
              url: `${siteUrl}/products/${slug}`,
              availability: "https://schema.org/InStock",
              price: "Contact for pricing",
              priceCurrency: "INR",
            },
          }),
        }}
      />
      <section className="bg-primary-500 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Products", href: "/products" }, { label: product.name }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">{product.category_name || "Product"}</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{heroTitle}</h1>
              {heroDesc && <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">{heroDesc}</p>}
            </div>
            {heroImage && (
              <div className="hidden lg:block">
                <div className="aspect-[4/3] bg-primary-600 border border-gray-700/50 overflow-hidden">
                  <img src={heroImage} alt={heroTitle} className="w-full h-full object-cover opacity-80" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {features.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-page">
            <h2 className="heading-md text-primary-500 mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
              {features.map((f: { title: string; description: string }, i: number) => (
                <div key={i} className="flex items-start gap-3 p-4 border border-gray-100 hover:border-label/40 transition-colors">
                  <div className="w-6 h-6 bg-label text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                  <div>
                    <h3 className="font-semibold text-primary-500 text-sm">{f.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ProductSpecsSection slug={slug} />

      <section className="section-padding bg-surface-muted">
        <div className="container-page text-center max-w-2xl">
          <h2 className="heading-sm text-primary-500 mb-4">{`Interested in ${product.name}?`}</h2>
          <p className="text-gray-500 mb-6">Contact us for pricing, customization and deployment details.</p>
          <Link href="/contact" className="btn-primary">Request a Quote</Link>
        </div>
      </section>
    </>
  );
}