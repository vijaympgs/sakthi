"use client";

import { Phone, MapPin } from "lucide-react";

export function FloatingContactBar() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col shadow-xl rounded-l-md overflow-hidden">
      
      {/* 1. Phone Call */}
      <a
        href="tel:+919840057127"
        title="Call +91 9840057127"
        className="w-11 h-11 md:w-12 md:h-12 bg-[#b59449] hover:bg-[#a1813b] text-white flex items-center justify-center transition-transform hover:scale-105"
        aria-label="Call Us"
      >
        <Phone size={20} />
      </a>

      {/* 2. WhatsApp */}
      <a
        href="https://wa.me/919840057127"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        className="w-11 h-11 md:w-12 md:h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center transition-transform hover:scale-105"
        aria-label="WhatsApp Chat"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.146 4.185 4.389-1.148z"/>
        </svg>
      </a>

      {/* 3. LinkedIn */}
      <a
        href="https://www.linkedin.com/company/sakthi-solutions/"
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn Profile"
        className="w-11 h-11 md:w-12 md:h-12 bg-[#0A66C2] hover:bg-[#08529c] text-white flex items-center justify-center transition-transform hover:scale-105"
        aria-label="LinkedIn"
      >
        <span className="font-bold text-base font-sans tracking-tight">in</span>
      </a>

      {/* 4. Sales Office Location */}
      <a
        href="/contact"
        title="Sales Office Location"
        className="w-11 h-11 md:w-12 md:h-12 bg-[#f54337] hover:bg-[#e12f23] text-white flex items-center justify-center transition-transform hover:scale-105"
        aria-label="Location"
      >
        <MapPin size={20} />
      </a>

    </div>
  );
}
