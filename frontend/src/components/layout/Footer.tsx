"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Building2, Facebook, Linkedin, Youtube } from "lucide-react";
import { useFooter, useCompanyInfo } from "@/hooks/useQueries";

//

function FooterColumn({ title, links }: { title: string; links: { label: string; url: string }[] }) {
  const highlightChar = title.charAt(0);
  const rest = title.slice(1);
  return (
    <div>
      <h3 className="text-lg font-bold mb-6 flex items-center">
        <span className="w-1 h-5 bg-[#f54337] inline-block mr-3"></span>
        <span className="text-[#f54337]">{highlightChar}</span>{rest}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.url} className="text-sm text-gray-200 hover:text-[#f54337] transition-colors flex items-center gap-2">
              <span className="text-[#f54337] text-xs font-bold">&gt;</span>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { data: apiData } = useFooter();
  const { data: companyInfo } = useCompanyInfo();
  const footerColumns = Array.isArray(apiData) ? apiData : [];

  const getLogoUrl = () => {
    if (!companyInfo?.logo) {
      return "";
    }
    if (companyInfo.logo.startsWith("http://") || companyInfo.logo.startsWith("https://")) {
      return companyInfo.logo;
    }
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");
    return `${apiBase}${companyInfo.logo.startsWith("/") ? "" : "/"}${companyInfo.logo}`;
  };

  const logoUrl = getLogoUrl();
  const addressLine1 = companyInfo?.address_line1 || "";
  const addressLine2 = companyInfo?.address_line2 || "";
  const city = companyInfo?.city || "";
  const postalCode = companyInfo?.postal_code || "";

  const phonePrimary = companyInfo?.phone_primary || "";
  const phoneSecondary = companyInfo?.phone_secondary || "";
  
  const emailPrimary = companyInfo?.email_primary || "";
  const emailSupport = companyInfo?.email_support || "";

  return (
    <footer className="bg-[#2b323e] text-white border-t border-gray-800">
      <div className="container-page py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group transition-opacity hover:opacity-90">
            {logoUrl && (
              <img 
                src={logoUrl} 
                alt={companyInfo?.company_name || ""}
                className="h-8 w-auto object-contain brightness-0 invert select-none transition-transform duration-300 group-hover:scale-[1.02]" 
                decoding="async"
                style={{ imageRendering: "auto" }}
              />
            )}
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {companyInfo?.about_content || ""}
            </p>
            <div className="flex items-center gap-3">
              {companyInfo?.facebook_url && (
                <a
                  href={companyInfo.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-gray-600 flex items-center justify-center hover:bg-[#f54337] hover:border-[#f54337] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={15} />
                </a>
              )}
              {companyInfo?.linkedin_url && (
                <a
                  href={companyInfo.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-gray-600 flex items-center justify-center hover:bg-[#f54337] hover:border-[#f54337] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={15} />
                </a>
              )}
              {companyInfo?.youtube_url && (
                <a
                  href={companyInfo.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-gray-600 flex items-center justify-center hover:bg-[#f54337] hover:border-[#f54337] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={15} />
                </a>
              )}
            </div>
          </div>

          <FooterColumn
            title={footerColumns[0]?.title || ""}
            links={footerColumns[0]?.links ?? []}
          />

          <FooterColumn
            title="More Products"
            links={footerColumns[1]?.links ?? []}
          />

          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <span className="w-1 h-5 bg-[#f54337] inline-block mr-3"></span>
              <span className="text-[#f54337]">A</span>ddress
            </h3>
            <div className="space-y-4 text-sm text-gray-200">
              
              <div className="flex items-center gap-2.5 font-bold text-white">
                <Building2 size={16} className="text-[#f54337] shrink-0" />
                <span>Sales Office</span>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#f54337] shrink-0 mt-1" />
                <div className="leading-relaxed">
                  <p>{addressLine1},</p>
                  {addressLine2 && <p>{addressLine2},</p>}
                  <p>{city} - {postalCode}.</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#f54337] shrink-0" />
                <div>
                  <a href={`tel:${phonePrimary}`} className="hover:text-[#f54337] transition-colors">{phonePrimary}</a>
                  {phoneSecondary && (
                    <>
                      {", "}
                      <a href={`tel:${phoneSecondary}`} className="hover:text-[#f54337] transition-colors">{phoneSecondary}</a>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#f54337] shrink-0" />
                <div>
                  <a href={`mailto:${emailPrimary}`} className="hover:text-[#f54337] transition-colors block">{emailPrimary}</a>
                  {emailSupport && (
                    <a href={`mailto:${emailSupport}`} className="hover:text-[#f54337] transition-colors text-xs text-gray-400">{emailSupport}</a>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-gray-700/60 bg-[#212630]">
        <div className="container-page py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} {companyInfo?.company_name || ""}. All rights reserved.</p>
          <p>
            Powered by <span className="text-white font-medium">Olivine AI Technologies</span>
          </p>
        </div>
      </div>
    </footer>
  );
}