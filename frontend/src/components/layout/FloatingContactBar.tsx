"use client";

import { Phone, MapPin, Facebook, Youtube } from "lucide-react";
import { useCompanyInfo } from "@/hooks/useQueries";

export function FloatingContactBar() {
  const { data: companyInfo } = useCompanyInfo();

  const phoneNum = companyInfo?.phone_secondary || "+91 9840057127";
  const rawPhone = phoneNum.replace(/[^0-9]/g, "");
  const whatsappUrl = companyInfo?.phone_secondary 
    ? `https://wa.me/${rawPhone}` 
    : "https://wa.me/919840057127";

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col shadow-xl overflow-hidden">
      <a
        href={`tel:${phoneNum}`}
        title={`Call ${phoneNum}`}
        className="w-11 h-11 md:w-12 md:h-12 bg-primary-500 hover:bg-[#b59449] text-white flex items-center justify-center transition-colors duration-200"
        aria-label="Call Us"
      >
        <Phone size={20} />
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        className="w-11 h-11 md:w-12 md:h-12 bg-primary-500 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors duration-200"
        aria-label="WhatsApp Chat"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.146 4.185 4.389-1.148z"/>
        </svg>
      </a>

      <a
        href={companyInfo?.linkedin_url || "https://www.linkedin.com/company/sakthi-solutions/"}
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn Profile"
        className="w-11 h-11 md:w-12 md:h-12 bg-primary-500 hover:bg-[#0A66C2] text-white flex items-center justify-center transition-colors duration-200"
        aria-label="LinkedIn"
      >
        <span className="font-bold text-base font-sans tracking-tight">in</span>
      </a>

      {companyInfo?.facebook_url && (
        <a
          href={companyInfo.facebook_url}
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook Page"
          className="w-11 h-11 md:w-12 md:h-12 bg-primary-500 hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors duration-200"
          aria-label="Facebook"
        >
          <Facebook size={20} />
        </a>
      )}

      {companyInfo?.youtube_url && (
        <a
          href={companyInfo.youtube_url}
          target="_blank"
          rel="noopener noreferrer"
          title="YouTube Channel"
          className="w-11 h-11 md:w-12 md:h-12 bg-primary-500 hover:bg-[#FF0000] text-white flex items-center justify-center transition-colors duration-200"
          aria-label="YouTube"
        >
          <Youtube size={20} />
        </a>
      )}

      <a
        href="/contact"
        title="Sales Office Location"
        className="w-11 h-11 md:w-12 md:h-12 bg-primary-500 hover:bg-[#f54337] text-white flex items-center justify-center transition-colors duration-200"
        aria-label="Location"
      >
        <MapPin size={20} />
      </a>
    </div>
  );
}