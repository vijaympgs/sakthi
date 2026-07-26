"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Building2, Facebook, Linkedin, Youtube } from "lucide-react";
import { useFooter } from "@/hooks/useQueries";

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
  const footerColumns = Array.isArray(apiData) ? apiData : [];

  return (
    <footer className="bg-[#2b323e] text-white border-t border-gray-800">
      <div className="container-page py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-white/10 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h7v7H4V4z" fill="#f54337"/>
                  <path d="M13 4h7v7h-7V4z" fill="#b59449"/>
                  <path d="M4 13h7v7H4v-7z" fill="#b59449"/>
                  <path d="M13 13h7v7h-7v-7z" fill="#f54337"/>
                </svg>
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
                <span className="text-[#f54337]">S</span>akthi <span className="text-[#f54337]">S</span>olutions
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Digital signage, interactive kiosks, feedback solutions, and IT consulting
              for hospitality, retail, and corporate sectors since 2014.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/Sakthi-Solutions-276890643116200/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-gray-600 flex items-center justify-center hover:bg-[#f54337] hover:border-[#f54337] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
              <a
                href="https://www.linkedin.com/company/sakthi-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-gray-600 flex items-center justify-center hover:bg-[#f54337] hover:border-[#f54337] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCxRoJTQKDHkLFj6hFCTHW0g"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-gray-600 flex items-center justify-center hover:bg-[#f54337] hover:border-[#f54337] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={15} />
              </a>
            </div>
          </div>

          <FooterColumn
            title="Godspeed"
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
                  <p>1/1, 1st Floor,</p>
                  <p>General Collins Road,</p>
                  <p>Choolai Chennai - 600112.</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#f54337] shrink-0" />
                <div>
                  <a href="tel:+919840057127" className="hover:text-[#f54337] transition-colors">+91 9840057127</a>,{" "}
                  <a href="tel:+919381459199" className="hover:text-[#f54337] transition-colors">+91 9381459199</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#f54337] shrink-0" />
                <div>
                  <a href="mailto:info@sakthisolutions.in" className="hover:text-[#f54337] transition-colors block">info@sakthisolutions.in</a>
                  <a href="mailto:support@sakthisolutions.in" className="hover:text-[#f54337] transition-colors text-xs text-gray-400">support@sakthisolutions.in</a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-gray-700/60 bg-[#212630]">
        <div className="container-page py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sakthi Solutions. All rights reserved.</p>
          <p>
            Powered by <span className="text-white font-medium">Olivine AI Technologies</span>
          </p>
        </div>
      </div>
    </footer>
  );
}