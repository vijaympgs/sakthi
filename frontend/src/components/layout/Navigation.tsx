"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Palette, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigation, useCompanyInfo } from "@/hooks/useQueries";
import { useTheme } from "@/lib/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  url?: string;
  children?: NavItem[];
}

const hasChildren = (item: NavItem) => item.children && item.children.length > 0;

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [wmVar, setWmVar] = useState(0);
  const { data: apiNav } = useNavigation("main");
  const { data: companyInfo } = useCompanyInfo();
  const { cycleTheme, cycleTypography } = useTheme();
  const apiNavItems: NavItem[] = apiNav?.items ?? [];
  const hasTeam = apiNavItems.some((item) => item.url === "/team" || item.label.toLowerCase() === "team");
  const navItems: NavItem[] = hasTeam
    ? apiNavItems
    : [...apiNavItems, { label: "Team", url: "/team" }];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getLogoUrl = () => {
    if (!companyInfo?.logo) return undefined;
    if (companyInfo.logo.startsWith("http://") || companyInfo.logo.startsWith("https://")) return companyInfo.logo;
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/api\/ ?$/, "");
    return `${apiBase}${companyInfo.logo.startsWith("/") ? "" : "/"}${companyInfo.logo}`;
  };

  const isActive = (url?: string) => {
    if (!url) return false;
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  const logoUrl = getLogoUrl();
  const navH = scrolled ? "h-16 lg:h-[72px]" : "h-20 lg:h-[88px]";

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center",
        navH,
        "transition-[height] duration-300 ease-in-out",
        "border-b border-white/[0.08]"
      )}
      style={{
        backgroundColor: scrolled ? "rgba(15,15,20,0.92)" : "rgba(0,0,0,0.40)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.25)" : "none",
      }}
    >
      <div className={cn(
        "w-full mx-auto flex items-center justify-between",
        "px-6 sm:px-10 lg:px-12",
        "transition-all duration-300 ease-in-out",
        scrolled ? "max-w-[1440px]" : "max-w-[1500px]"
      )}>
        {/* ── Left: Logo / Wordmark ── */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 group"
          aria-label={companyInfo?.company_name || "Home"}
        >
          {logoUrl && (
            <img
              src={logoUrl}
              alt={companyInfo?.company_name || ""}
              className="h-[38px] lg:h-[42px] w-auto object-contain select-none transition-transform duration-300 group-hover:scale-[1.02]"
              decoding="async"
            />
          )}
          <div
            className="flex items-baseline leading-none whitespace-nowrap cursor-pointer select-none"
            onClick={(e) => { e.stopPropagation(); setWmVar((p) => (p + 1) % 10); }}
            title={`V${wmVar + 1} — click to cycle`}
          >
            {(() => {
              const name = companyInfo?.company_name || "Sakthi Solutions";
              const words = name.split(" ");
              const sz = "text-[1.6rem] sm:text-[1.8rem] lg:text-[1.9rem] font-heading";
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
                  return <><span className={`${sz} font-bold text-red-600`}>{words[0]}</span><span className={`${sz} font-light text-white/80 ml-2`}>{words.slice(1).join(" ")}</span></>;
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
                      <span className={`${sz} text-red-600 font-black`}>{w[0]}</span>
                      <span className={`${sz} font-extralight text-white/50`}>{w.slice(1)}</span>
                      {i < words.length - 1 && <>&nbsp;</>}
                    </span>
                  ));
                case 4:
                  return words.map((w: string, i: number) => (
                    <span key={i} className="flex items-baseline">
                      <span className={`${sz} text-red-600 font-black`}>{w[0]}</span>
                      <span className={`${sz} font-light text-white/40 uppercase tracking-widest`}>{w.slice(1)}</span>
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
                  return <><span className={`${sz} font-black text-red-600`}>{words[0]}</span><span className={`${sz} font-light text-white/80 ml-2`}>{words.slice(1).join(" ")}</span></>;
                case 7:
                  return <><span className={`${sz} font-bold text-red-600 lowercase`}>{words[0]}</span><span className={`${sz} font-normal text-red-600 uppercase tracking-wider ml-2`}>{words.slice(1).join(" ")}</span></>;
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

        {/* ── Center: Primary Navigation ── */}
        <nav className="hidden lg:flex items-center justify-center flex-1" aria-label="Primary navigation">
          <ul className="flex items-center gap-8 xl:gap-12 list-none m-0 p-0">
            {navItems.map((item) => (
              <li key={item.label} className="relative">
                {hasChildren(item) ? (
                  <div
                    className="group"
                    onMouseEnter={(e) => { /* dropdown handled by CSS hover */ }}
                  >
                    <Link
                      href={item.url || "#"}
                      className={cn(
                        "relative inline-flex items-center gap-1 py-2",
                        "text-sm font-semibold uppercase tracking-[0.1em]",
                        "transition-colors duration-250",
                        isActive(item.url)
                          ? "text-white"
                          : "text-white/80 hover:text-white"
                      )}
                      aria-current={isActive(item.url) ? "page" : undefined}
                    >
                      {item.label}
                      {hasChildren(item) && <ChevronDown size={11} className="opacity-60" />}
                    </Link>

                    {/* Dropdown */}
                    <div className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-3",
                      "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
                      "transition-all duration-200 ease-out"
                    )}>
                      <div className="bg-[#1a1a22]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl min-w-[220px] py-2">
                        {item.children!.map((child) => (
                          <div key={child.label}>
                            {hasChildren(child) ? (
                              <div className="relative group/sub">
                                <Link
                                  href={child.url || "#"}
                                  className="flex items-center justify-between px-5 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                  {child.label}
                                  <ChevronDown size={11} className="-rotate-90 opacity-50" />
                                </Link>
                                <div className={cn(
                                  "absolute left-full top-0 ml-1",
                                  "opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible",
                                  "transition-all duration-200 ease-out"
                                )}>
                                  <div className="bg-[#1a1a22]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl min-w-[200px] py-2">
                                    {child.children!.map((sub) => (
                                      <Link
                                        key={sub.label}
                                        href={sub.url || "#"}
                                        className="block px-5 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                      >
                                        {sub.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <Link
                                href={child.url || "#"}
                                className="block px-5 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                              >
                                {child.label}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.url || "#"}
                    className={cn(
                      "relative inline-flex flex-col items-center py-2",
                      "text-sm font-semibold uppercase tracking-[0.1em]",
                      "transition-colors duration-250",
                      isActive(item.url)
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                    )}
                    aria-current={isActive(item.url) ? "page" : undefined}
                  >
                    {item.label}
                    {isActive(item.url) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-[28px] h-[2px] bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Right: CTA / Actions ── */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link
            href="/contact"
            className={cn(
              "px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em]",
              "border border-white/20 rounded-none",
              "transition-all duration-250",
              scrolled
                ? "bg-white/10 text-white hover:bg-white hover:text-[#1a1a22] border-white/20"
                : "bg-white/10 text-white hover:bg-white hover:text-[#1a1a22] border-white/20"
            )}
          >
            Get a Quote
          </Link>
          <button
            onClick={cycleTheme}
            className="text-white/50 hover:text-white p-1.5 transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            <Palette size={16} />
          </button>
          <button
            onClick={cycleTypography}
            className="text-white/50 hover:text-white p-1.5 transition-colors"
            title="Toggle typography"
            aria-label="Toggle typography"
          >
            <Type size={16} />
          </button>
        </div>

        {/* ── Mobile: Hamburger ── */}
        <button
          className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile Full-Screen Overlay ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 z-40 lg:hidden overflow-hidden"
            style={{ height: `calc(100vh - ${scrolled ? 64 : 80}px)` }}
          >
            <div
              className="w-full h-full bg-black/95 backdrop-blur-xl overflow-y-auto"
              onClick={() => setIsMobileOpen(false)}
            >
              <nav className="flex flex-col items-center justify-center min-h-full px-8 py-12" aria-label="Mobile navigation">
                <ul className="flex flex-col items-center gap-6 list-none m-0 p-0 w-full">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.25 }}
                      className="w-full text-center"
                    >
                      {hasChildren(item) ? (
                        <MobileNavItem item={item} onClose={() => setIsMobileOpen(false)} />
                      ) : (
                        <Link
                          href={item.url || "#"}
                          className={cn(
                            "block py-3 text-lg font-semibold uppercase tracking-[0.12em]",
                            "transition-colors duration-250",
                            isActive(item.url) ? "text-white" : "text-white/70 hover:text-white"
                          )}
                          onClick={() => setIsMobileOpen(false)}
                          aria-current={isActive(item.url) ? "page" : undefined}
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.25 }}
                  className="mt-10 flex flex-col items-center gap-4"
                >
                  <Link
                    href="/contact"
                    className="px-8 py-3 text-sm font-bold uppercase tracking-[0.12em] border border-white/20 text-white hover:bg-white hover:text-[#1a1a22] transition-all duration-250"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    Get a Quote
                  </Link>
                  <div className="flex items-center gap-4 mt-2">
                    <button onClick={cycleTheme} className="text-white/50 hover:text-white p-1.5 transition-colors" title="Toggle theme" aria-label="Toggle theme">
                      <Palette size={16} />
                    </button>
                    <button onClick={cycleTypography} className="text-white/50 hover:text-white p-1.5 transition-colors" title="Toggle typography" aria-label="Toggle typography">
                      <Type size={16} />
                    </button>
                  </div>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ── Mobile dropdown sub-item (inline expand) ── */
function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="flex items-center justify-center gap-2 w-full py-3 text-lg font-semibold uppercase tracking-[0.12em] text-white/70 hover:text-white transition-colors"
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <ChevronDown size={14} className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-1 space-y-1">
              {item.children!.map((child) => (
                <div key={child.label}>
                  {hasChildren(child) ? (
                    <div className="text-center py-1.5">
                      <span className="text-sm text-white/50 uppercase tracking-wider">{child.label}</span>
                      <div className="mt-1 space-y-0.5">
                        {child.children!.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.url || "#"}
                            className="block py-1 text-sm text-white/40 hover:text-white transition-colors"
                            onClick={onClose}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={child.url || "#"}
                      className="block py-1.5 text-sm text-white/60 hover:text-white transition-colors text-center"
                      onClick={onClose}
                    >
                      {child.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
