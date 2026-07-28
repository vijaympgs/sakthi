"use client";

import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SectionRenderer } from "@/components/ui/SectionRenderer";
import { usePage } from "@/hooks/useQueries";

export function DynamicPageClient({ slug }: { slug: string }) {
  const { data: pageData } = usePage(slug);
  const sections = pageData?.sections ?? [];

  return (
    <>
      <Navigation />
      <main id="main-content">
        <SectionRenderer sections={sections} />
      </main>
      <Footer />
    </>
  );
}
