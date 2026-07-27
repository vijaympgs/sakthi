"use client";

import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useBlogPosts } from "@/hooks/useQueries";
import { Calendar, User, ArrowRight } from "lucide-react";

export function BlogListClient() {
  const { data: posts, isLoading } = useBlogPosts();

  return (
    <>
      <Navigation />
      <main id="main-content">
        <section className="bg-primary-500 text-white py-16 md:py-20 relative overflow-hidden">
          <div className="container-page">
            <Breadcrumb items={[{ label: "Blog" }]} />
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-label mb-4">Insights & Updates</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                Latest news, technology insights, and updates from Sakthi Solutions.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-page">
            {isLoading ? (
              <p className="text-center text-gray-400">Loading posts...</p>
            ) : !posts || posts.length === 0 ? (
              <p className="text-center text-gray-400">No blog posts published yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(Array.isArray(posts) ? posts : []).map((post: any) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group border border-gray-100 hover:border-label/40 transition-all duration-200 flex flex-col bg-white hover:-translate-y-1"
                  >
                    <div className="aspect-video bg-gray-50 flex items-center justify-center overflow-hidden">
                      {post.featured_image ? (
                        <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="text-4xl font-black text-gray-200">BLOG</div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      {post.category && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-label mb-2">{post.category}</span>
                      )}
                      <h2 className="font-bold text-primary-500 mb-2 group-hover:text-label transition-colors line-clamp-2">{post.title}</h2>
                      {post.excerpt && (
                        <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          {post.author && (
                            <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                          )}
                          {post.published_at && (
                            <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.published_at).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</span>
                          )}
                        </div>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-label" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
