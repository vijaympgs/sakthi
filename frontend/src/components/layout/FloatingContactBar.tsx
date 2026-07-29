"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, X } from "lucide-react";
import { useCompanyInfo } from "@/hooks/useQueries";

// ── LinkedIn SVG (Lucide doesn't include it) ──
function LinkedinSvg({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ── Action definitions ──
interface Action {
  key: "call" | "whatsapp" | "email" | "location" | "linkedin";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  href: (info: Record<string, unknown> | undefined) => string | null;
  show: (info: Record<string, unknown> | undefined) => boolean;
  kind: "external" | "protocol" | "internal";
}

const ACTIONS: Action[] = [
  {
    key: "call",
    icon: Phone,
    label: "Call",
    href: (i) => {
      const raw = i?.phone_secondary as string;
      if (!raw) return null;
      return `tel:${raw.replace(/[^0-9+]/g, "")}`;
    },
    show: (i) => !!(i?.phone_secondary as string),
    kind: "protocol",
  },
  {
    key: "whatsapp",
    icon: MessageCircle,
    label: "WhatsApp",
    href: (i) => {
      const raw = i?.phone_secondary as string;
      if (!raw) return null;
      const num = raw.replace(/[^0-9]/g, "");
      return num ? `https://wa.me/${num}` : null;
    },
    show: (i) => !!(i?.phone_secondary as string),
    kind: "external",
  },
  {
    key: "email",
    icon: Mail,
    label: "Email",
    href: (i) => {
      const email = i?.email_primary as string;
      return email ? `mailto:${email}` : null;
    },
    show: (i) => !!(i?.email_primary as string),
    kind: "protocol",
  },
  {
    key: "location",
    icon: MapPin,
    label: "Location",
    href: () => "/contact",
    show: () => true,
    kind: "internal",
  },
  {
    key: "linkedin",
    icon: LinkedinSvg,
    label: "LinkedIn",
    href: (i) => (i?.linkedin_url as string) || null,
    show: (i) => !!(i?.linkedin_url as string),
    kind: "external",
  },
];

// ── Shared button classes ──
const BTN_CLASS =
  "flex items-center justify-center rounded-full bg-primary-500 text-white " +
  "shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.18)] " +
  "transition-all duration-[225ms] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/60";

// ── Inline keyframes (self-contained, no globals needed) ──
const STYLES = `
@keyframes fcb-enter {
  from { opacity: 0; transform: translateX(16px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes fcb-scale-in {
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
}
` as const;

export function FloatingContactBar() {
  const { data: companyInfo } = useCompanyInfo();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  const items = ACTIONS.filter((a) => a.show(companyInfo));
  if (items.length === 0) return null;

  // ── Render action link/button ──
  const renderAction = (action: Action, i: number, variant: "desktop" | "mobile") => {
    const href = action.href(companyInfo);
    if (!href) return null;

    const Icon = action.icon;
    const delay = i * 60;
    const isDesktop = variant === "desktop";
    const size = isDesktop ? 54 : 52;
    const iconSize = 20;

    // Desktop: right-side bar, staggered animation, hover tooltip
    // Mobile: stacked above FAB

    const shared = `${BTN_CLASS} ${isDesktop ? "hover:-translate-x-0.5" : ""}`;
    const style = {
      width: size,
      height: size,
      animation: mounted ? `fcb-enter 0.35s ease-out ${delay}ms both` : undefined,
    };

    const iconEl = <Icon size={iconSize} className="transition-colors duration-200 group-hover:text-accent-500" />;

    // Tooltip label (desktop only)
    const tooltip = isDesktop ? (
      <span className="absolute right-full mr-3 whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider bg-primary-500 text-white px-3 py-1.5 rounded-sm opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
        {action.label}
      </span>
    ) : null;

    if (action.kind === "internal") {
      return (
        <Link
          key={action.key}
          href={href}
          className={`group relative ${shared}`}
          style={style}
          aria-label={action.label}
          onClick={() => setMobileOpen(false)}
        >
          {iconEl}
          {tooltip}
        </Link>
      );
    }

    return (
      <a
        key={action.key}
        href={href}
        target={action.kind === "external" ? "_blank" : undefined}
        rel={action.kind === "external" ? "noopener noreferrer" : undefined}
        className={`group relative ${shared}`}
        style={style}
        aria-label={action.label}
        onClick={() => setMobileOpen(false)}
      >
        {iconEl}
        {tooltip}
      </a>
    );
  };

  // ── Render ──
  return (
    <>
      <style>{STYLES}</style>

      {/* ── Desktop: right-side vertical bar ── */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {items.map((action, i) => renderAction(action, i, "desktop"))}
      </div>

      {/* ── Mobile: FAB speed-dial ── */}
      <div className="fixed right-5 bottom-5 z-40 lg:hidden flex flex-col items-end gap-3">
        {/* Expanded actions (stack upward) */}
        {mobileOpen &&
          items
            .map((action, i) => {
              const href = action.href(companyInfo);
              if (!href) return null;
              const Icon = action.icon;
              const delay = (items.length - 1 - i) * 50;
              const style = {
                width: 52,
                height: 52,
                animation: mobileOpen
                  ? `fcb-enter 0.3s ease-out ${delay}ms both`
                  : undefined,
              };

              if (action.kind === "internal") {
                return (
                  <Link
                    key={action.key}
                    href={href}
                    className={BTN_CLASS}
                    style={style}
                    aria-label={action.label}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon size={20} className="transition-colors duration-200 group-hover:text-accent-500" />
                  </Link>
                );
              }

              return (
                <a
                  key={action.key}
                  href={href}
                  target={action.kind === "external" ? "_blank" : undefined}
                  rel={action.kind === "external" ? "noopener noreferrer" : undefined}
                  className={BTN_CLASS}
                  style={style}
                  aria-label={action.label}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon size={20} className="transition-colors duration-200 group-hover:text-accent-500" />
                </a>
              );
            })
            .reverse()}

        {/* FAB toggle */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className={`${BTN_CLASS} w-[56px] h-[56px] shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] active:scale-95`}
          style={{ animation: mounted ? "fcb-scale-in 0.4s ease-out both" : undefined }}
          aria-label={mobileOpen ? "Close contact options" : "Open contact options"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Phone size={22} />}
        </button>
      </div>
    </>
  );
}
