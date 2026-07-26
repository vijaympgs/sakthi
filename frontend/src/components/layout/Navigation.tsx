"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/hooks/useQueries";

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
  const navItems: NavItem[] = apiNav?.items ?? [];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="container-page flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-500 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h7v7H4V4z" fill="#f54337"/>
                <path d="M13 4h7v7h-7V4z" fill="#b59449"/>
                <path d="M4 13h7v7H4v-7z" fill="#b59449"/>
                <path d="M13 13h7v7h-7v-7z" fill="#f54337"/>
              </svg>
            </div>
            <span className="text-xl md:text-2xl font-bold text-primary-500 tracking-tight">
              <span className="text-[#f54337]">S</span>akthi <span className="text-[#f54337]">S</span>olutions
            </span>
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
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors",
                    item.children && "cursor-pointer",
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} />}
                </Link>

                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-white border border-gray-100 shadow-lg min-w-[240px] z-50">
                    {item.children.map((child) => (
                      <div
                        key={child.label}
                        className="relative"
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(item.label)}
                      >
                        <Link
                          href={child.url || "#"}
                          className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-500 transition-colors"
                        >
                          {child.label}
                          {child.children && <ChevronDown size={12} className="-rotate-90" />}
                        </Link>

                        {child.children && (
                          <div className="absolute left-full top-0 bg-white border border-gray-100 shadow-lg min-w-[220px]">
                            {child.children.map((subChild) => (
                              <Link
                                key={subChild.label}
                                href={subChild.url || "#"}
                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-500 transition-colors"
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
            <Link href="/contact" className="btn-primary text-sm">Get a Quote</Link>
          </div>

          <button className="lg:hidden p-2 text-gray-700" onClick={() => setIsMobileOpen(!isMobileOpen)} aria-label="Toggle menu">
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="container-page py-4 space-y-1">
              {navItems.map((item) => (
                <MobileNavItem key={item.label} item={item} onClose={() => setIsMobileOpen(false)} />
              ))}
              <Link href="/contact" className="btn-primary block text-center mt-4" onClick={() => setIsMobileOpen(false)}>
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
      <Link href={item.url || "#"} className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary-500" onClick={onClose}>
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-700" onClick={() => setIsOpen(!isOpen)}>
        {item.label}
        <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="pl-4 space-y-1">
          {item.children.map((child) => (
            <div key={child.label}>
              <Link href={child.url || "#"} className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-500" onClick={onClose}>
                {child.label}
              </Link>
              {child.children && (
                <div className="pl-4">
                  {child.children.map((sub) => (
                    <Link key={sub.label} href={sub.url || "#"} className="block px-4 py-1.5 text-xs text-gray-500 hover:text-primary-500" onClick={onClose}>
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