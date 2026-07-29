"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, ChevronDown, Palette, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigation, useCompanyInfo } from "@/hooks/useQueries";
import { useTheme } from "@/lib/ThemeContext";

interface NavItem {
  label: string;
  url?: string;
  children?: NavItem[];
}

const hasChildren = (item: NavItem) => item.children && item.children.length > 0;

export function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [wmVar, setWmVar] = useState(0);
  const { data: apiNav } = useNavigation("main");
  const { data: companyInfo } = useCompanyInfo();
  const { theme, typography, cycleTheme, cycleTypography } = useTheme();
  const apiNavItems: NavItem[] = apiNav?.items ?? [];
  // Inject "Team" if not already in the nav from DB
  const hasTeam = apiNavItems.some((item) => item.url === "/team" || item.label.toLowerCase() === "team");
  const navItems: NavItem[] = hasTeam
    ? apiNavItems
    : [...apiNavItems, { label: "Team", url: "/team" }];

  const getLogoUrl = () => {
    if (!companyInfo?.logo) {
      return undefined;
    }
    if (companyInfo.logo.startsWith("http://") || companyInfo.logo.startsWith("https://")) {
      return companyInfo.logo;
    }
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/api\/ ?$/, "");
    return `${apiBase}${companyInfo.logo.startsWith("/") ? "" : "/"}${companyInfo.logo}`;
  };

  const logoUrl = getLogoUrl();

  return (
    <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-lg h-16 lg:h-20 flex items-center">
        <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center justify-center gap-1 lg:justify-start lg:gap-1.5 group transition-opacity hover:opacity-90">
            {logoUrl && (
              <img 
                src={logoUrl} 
                alt={companyInfo?.company_name || ""}
                className="h-12 lg:h-16 w-auto object-contain select-none transition-transform duration-300 group-hover:scale-[1.02]"
                decoding="async"
                style={{ imageRendering: "auto" }}
              />
            )}
                                        <div className="flex flex-row items-baseline leading-none whitespace-nowrap cursor-pointer select-none" onClick={() => setWmVar((p) => (p + 1) % 10)} title={`V${wmVar + 1} - click to cycle`}>
              {(() => {
                const name = companyInfo?.company_name || 'Sakthi Solutions';
                const words = name.split(' ');
                const sz = 'text-[3rem] sm:text-[3rem] lg:text-[46px] font-heading';
                switch (wmVar) {
                  case 0:
                    return words.map((w: string, i: number) => (
                      <span key={i} className="flex items-baseline">
                        <span className={`${sz} text-red-600 font-black`}>{w[0]}</span>
                        <span className={`${sz} font-medium text-white`}>{w.slice(1)}</span>
                        {i < words.length - 1 && <>&nbsp;</>}
                      </span>
                    ));
                  case 1:
                    return <><span className={`${sz} font-bold text-red-600`}>{words[0]}</span><span className={`${sz} font-light text-white/80 ml-3`}>{words.slice(1).join(' ')}</span></>;
                  case 2:
                    return words.map((w: string, i: number) => (
                      <span key={i} className="flex items-baseline">
                        <span className={`${sz} text-red-600 font-semibold`}>{w[0]}</span>
                        <span className={`${sz} font-light tracking-widest text-white/70`}>{w.slice(1).toUpperCase()}</span>
                        {i < words.length - 1 && <>&nbsp;</>}
                      </span>
                    ));
                  case 3:
                    return words.map((w: string, i: number) => (
                      <span key={i} className="flex items-baseline">
                        <span className={`${sz} text-red-600 font-black text-[3.6rem] sm:text-[3.6rem] lg:text-[54px]`}>{w[0]}</span>
                        <span className={`${sz} font-extralight text-white/50`}>{w.slice(1)}</span>
                        {i < words.length - 1 && <>&nbsp;</>}
                      </span>
                    ));
                  case 4:
                    return words.map((w: string, i: number) => (
                      <span key={i} className="flex items-baseline">
                        <span className={`${sz} text-red-600 font-black text-[4rem] sm:text-[4rem] lg:text-[60px]`}>{w[0]}</span>
                        <span className={`${sz} font-light text-white/40 uppercase tracking-widest text-[1.8rem] sm:text-[1.8rem] lg:text-[28px]`}>{w.slice(1)}</span>
                        {i < words.length - 1 && <>&nbsp;</>}
                      </span>
                    ));
                  case 5:
                    return words.map((w: string, i: number) => (
                      <span key={i} className="flex items-baseline">
                        <span className={`${sz} font-semibold tracking-[0.15em] text-red-600`}>{w[0].toUpperCase()}</span>
                        <span className={`${sz} font-light tracking-[0.25em] text-white/70`}>{w.slice(1).toUpperCase()}</span>
                        {i < words.length - 1 && <>&nbsp;</>}
                      </span>
                    ));
                  case 6:
                    return <><span className={`${sz} font-black text-red-600`}>{words[0]}</span><span className={`${sz} font-light text-white/80 ml-3`}>{words.slice(1).join(' ')}</span></>;
                  case 7:
                    return <><span className={`${sz} font-bold text-red-600 lowercase`}>{words[0]}</span><span className={`${sz} font-normal text-red-600 uppercase tracking-wider ml-3`}>{words.slice(1).join(' ')}</span></>;
                  case 8:
                    return words.map((w: string, i: number) => (
                      <span key={i} className="flex items-baseline">
                        <span className={`${sz} text-red-600 font-bold italic font-serif`}>{w[0]}</span>
                        <span className={`${sz} font-light text-white/70 font-serif`}>{w.slice(1)}</span>
                        {i < words.length - 1 && <>&nbsp;</>}
                      </span>
                    ));
                  case 9:
                    return words.map((w: string, i: number) => (
                      <span key={i} className="flex items-baseline">
                        <span className={`${sz} text-red-600 font-bold`}>{w[0]}</span>
                        <span className={`${sz} font-extralight text-white/50`} style={{ fontWeight: 200 }}>{w.slice(1)}</span>
                        {i < words.length - 1 && <>&nbsp;</>}
                      </span>
                    ));
                }
              })()}
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasChildren(item) && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.url || "#"}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-[#B89A4A] transition-colors",
                    hasChildren(item) && "cursor-pointer",
                  )}
                >
                  {item.label}
                  {hasChildren(item) && <ChevronDown size={12} />}
                </Link>

                {hasChildren(item) && openDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-white border border-gray-100 shadow-xl min-w-[240px] z-50">
                    {item.children!.map((child) => (
                      <div
                        key={child.label}
                        className="relative"
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(item.label)}
                      >
                        <Link
                          href={child.url || "#"}
                          className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#B89A4A] transition-colors"
                        >
                          {child.label}
                          {hasChildren(child) && <ChevronDown size={12} className="-rotate-90" />}
                        </Link>

                        {hasChildren(child) && (
                          <div className="absolute left-full top-0 bg-white border border-gray-100 shadow-xl min-w-[220px]">
                            {child.children!.map((subChild) => (
                              <Link
                                key={subChild.label}
                                href={subChild.url || "#"}
                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#B89A4A] transition-colors"
                              >
                                {subChild.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-1">
            <Link 
              href="/contact" 
              className="bg-[#B89A4A] hover:bg-transparent text-white hover:text-[#B89A4A] border border-[#B89A4A] font-bold px-5 py-2.5 text-xs transition-colors uppercase tracking-wider inline-flex items-center justify-center font-sans shadow-md"
            >
              Get a Quote
            </Link>

            <button
              onClick={cycleTheme}
              className="text-white/50 hover:text-[#B89A4A] p-2 transition-colors"
              title={`Theme: ${theme}`}
              aria-label={`Current theme: ${theme}. Click to cycle.`}
            >
              <Palette size={18} />
            </button>
            <button
              onClick={cycleTypography}
              className="text-white/50 hover:text-[#B89A4A] p-2 transition-colors"
              title={`Typography: ${typography}`}
              aria-label={`Current typography: ${typography}. Click to cycle.`}
            >
              <Type size={18} />
            </button>
          </div>

          <button className="lg:hidden p-2 text-white/80" onClick={() => setIsMobileOpen(!isMobileOpen)} aria-label="Toggle menu">
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-black/60 backdrop-blur-lg absolute top-full left-0 w-full shadow-lg z-50">
            <div className="container-page py-4 space-y-1">
              {navItems.map((item) => (
                <MobileNavItem key={item.label} item={item} onClose={() => setIsMobileOpen(false)} />
              ))}
              <Link 
                href="/contact" 
                className="bg-[#B89A4A] hover:bg-transparent text-white hover:text-[#B89A4A] border border-[#B89A4A] font-bold block text-center py-2.5 mt-4 text-xs transition-colors uppercase tracking-wider" 
                onClick={() => setIsMobileOpen(false)}
              >
                Get a Quote
              </Link>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={cycleTheme}
                  className="text-white/50 hover:text-[#B89A4A] p-2 transition-colors"
                  title={`Theme: ${theme}`}
                  aria-label={`Current theme: ${theme}. Click to cycle.`}
                >
                  <Palette size={18} />
                </button>
                <button
                  onClick={cycleTypography}
                  className="text-white/50 hover:text-[#B89A4A] p-2 transition-colors"
                  title={`Typography: ${typography}`}
                  aria-label={`Current typography: ${typography}. Click to cycle.`}
                >
                  <Type size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
  );
}

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.children) {
    return (
      <Link href={item.url || "#"} className="block px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-[#B89A4A]" onClick={onClose}>
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-white/80" onClick={() => setIsOpen(!isOpen)}>
        {item.label}
        <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="pl-4 space-y-1">
          {item.children!.map((child) => (
            <div key={child.label}>
              <Link href={child.url || "#"} className="block px-4 py-2 text-sm text-white/60 hover:text-[#B89A4A]" onClick={onClose}>
                {child.label}
              </Link>
              {child.children && child.children.length > 0 && (
                <div className="pl-4">
                  {child.children!.map((sub) => (
                    <Link key={sub.label} href={sub.url || "#"} className="block px-4 py-1.5 text-xs text-white/40 hover:text-[#B89A4A]" onClick={onClose}>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}