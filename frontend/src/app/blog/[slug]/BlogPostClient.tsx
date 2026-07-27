"use client";

import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useBlogPost } from "@/hooks/useQueries";
import { Calendar, User, ArrowLeft } from "lucide-react";

export function BlogPostClient({ slug }: { slug: string }) {
  const { data: post, isLoading } = useBlogPost(slug);

  if (isLoading) {
    return (
      <>
        <Navigation />
        <main id="main-content" className="section-padding bg-white min-h-[50vh]">
          <div className="container-page text-center"><p className="text-gray-400">Loading post...</p></div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navigation />
        <main id="main-content" className="section-padding bg-white min-h-[50vh]">
          <div className="container-page text-center">
            <h1 className="heading-lg text-primary-500 mb-4">Post Not Found</h1>
            <p className="text-gray-500 mb-8">This blog post does not exist.</p>
            <Link href="/blog" className="btn-primary">View All Posts</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main id="main-content">
        <section className="bg-primary-500 text-white py-16 md:py-20 relative overflow-hidden">
          <div className="container-page">
            <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
            <div className="max-w-4xl">
              {post.category && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-label mb-3 inline-block">{post.category}</span>
              )}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                {post.author && <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>}
                {post.published_at && <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.published_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-page max-w-4xl">
            {post.featured_image && (
              <div className="aspect-video bg-gray-50 overflow-hidden mb-10 rounded-lg">
                <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="prose prose-lg max-w-none prose-headings:text-primary-500 prose-a:text-label">
              {post.content ? (
                post.content.split("\n").map((paragraph: string, i: number) => (
                  paragraph.trim() ? <p key={i} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p> : null
                ))
              ) : (
                <p className="text-gray-400 italic">No content available.</p>
              )}
            </div>
            <div className="mt-12 pt-8 border-t border-gray-100">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-label hover:text-primary-500 transition-colors">
                <ArrowLeft size={16} />
                <span>Back to all posts</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
