import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - Sakthi Solutions",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-100">
        <div className="container-page flex items-center h-16">
          <Link href="/" className="text-xl font-bold text-primary-500 tracking-tight">
            <span className="text-[#f54337]">S</span>akthi <span className="text-[#f54337]">S</span>olutions
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center bg-surface-muted">
        <div className="text-center px-4">
          <h1 className="text-7xl md:text-8xl font-extrabold text-primary-500 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link href="/" className="btn-primary">Go Home</Link>
            <Link href="/products" className="btn-secondary">View Products</Link>
            <Link href="/contact" className="btn-secondary">Contact Us</Link>
          </div>
          <div className="text-sm text-gray-400">
            <p className="mb-2">Popular pages:</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
              <Link href="/products/godspeed" className="text-gray-500 hover:text-primary-500 underline">Godspeed</Link>
              <Link href="/products/tellus" className="text-gray-500 hover:text-primary-500 underline">Tellus Feedback</Link>
              <Link href="/products/childwood" className="text-gray-500 hover:text-primary-500 underline">Childwood</Link>
              <Link href="/services" className="text-gray-500 hover:text-primary-500 underline">Services</Link>
              <Link href="/about" className="text-gray-500 hover:text-primary-500 underline">About Us</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
