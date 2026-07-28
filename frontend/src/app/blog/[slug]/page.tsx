export const dynamic = "force-dynamic";

import { BlogPostClient } from "./BlogPostClient";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
