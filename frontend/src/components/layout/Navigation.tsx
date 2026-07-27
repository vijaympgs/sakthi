"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigation, useCompanyInfo } from "@/hooks/useQueries";

interface NavItem {
  label: string;
  url?: string;
  children?: NavItem[];
}

//

export function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { data: apiNav } = useNavigation("main");
  const { data: companyInfo } = useCompanyInfo();
  const apiNavItems: NavItem[] = apiNav?.items ?? [];
  // Inject "Team" if not already in the nav from DB
  const hasTeam = apiNavItems.some((item) => item.url === "/team" || item.label.toLowerCase() === "team");
  const navItems: NavItem[] = hasTeam
    ? apiNavItems
    : [...apiNavItems, { label: "Team", url: "/team" }];

  const getLogoUrl = () => {
    if (!companyInfo?.logo) {
      return "/assets/products/ss-logo.png";
    }
    if (companyInfo.logo.startsWith("http://") || companyInfo.logo.startsWith("https://")) {
      return companyInfo.logo;
    }
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");
    return `${apiBase}${companyInfo.logo.startsWith("/") ? "" : "/"}${companyInfo.logo}`;
  };

  const logoUrl = getLogoUrl();

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 border-b border-gray-100 shadow-sm h-[11vh] flex items-center backdrop-blur-md">
        <div className="container-page flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-3 group transition-opacity hover:opacity-90">
            <img 
              src={logoUrl} 
              alt={companyInfo?.company_name || "Sakthi Solutions"} 
              className="h-10 md:h-12 w-auto object-contain select-none transition-transform duration-300 group-hover:scale-[1.02]"
              decoding="async"
              style={{ imageRendering: "auto" }}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.url || "#"}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-700 hover:text-[#B89A4A] transition-colors",
                    item.children && "cursor-pointer",
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown size={12} />}
                </Link>

                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-white border border-gray-100 shadow-xl min-w-[240px] z-50">
                    {item.children.map((child) => (
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
                          {child.children && <ChevronDown size={12} className="-rotate-90" />}
                        </Link>

                        {child.children && (
                          <div className="absolute left-full top-0 bg-white border border-gray-100 shadow-xl min-w-[220px]">
                            {child.children.map((subChild) => (
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

          <div className="hidden lg:block">
            <Link 
              href="/contact" 
              className="bg-[#B89A4A] hover:bg-transparent text-white hover:text-[#B89A4A] border border-[#B89A4A] font-bold px-5 py-2.5 text-xs transition-colors uppercase tracking-wider inline-flex items-center justify-center font-sans shadow-md"
            >
              Get a Quote
            </Link>
          </div>

          <button className="lg:hidden p-2 text-gray-700" onClick={() => setIsMobileOpen(!isMobileOpen)} aria-label="Toggle menu">
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-[#FFFFFF] absolute top-full left-0 w-full shadow-lg z-50">
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
      <Link href={item.url || "#"} className="block px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-gray-700 hover:text-[#B89A4A]" onClick={onClose}>
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-gray-700" onClick={() => setIsOpen(!isOpen)}>
        {item.label}
        <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="pl-4 space-y-1">
          {item.children.map((child) => (
            <div key={child.label}>
              <Link href={child.url || "#"} className="block px-4 py-2 text-sm text-gray-600 hover:text-[#B89A4A]" onClick={onClose}>
                {child.label}
              </Link>
              {child.children && (
                <div className="pl-4">
                  {child.children.map((sub) => (
                    <Link key={sub.label} href={sub.url || "#"} className="block px-4 py-1.5 text-xs text-gray-500 hover:text-[#B89A4A]" onClick={onClose}>
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