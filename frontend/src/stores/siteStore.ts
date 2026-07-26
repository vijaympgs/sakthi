import { create } from "zustand";
import type { SiteSettings, ThemeSettings, NavigationMenu, FooterColumn } from "@/types";

interface SiteStore {
  siteSettings: SiteSettings | null;
  themeSettings: ThemeSettings | null;
  navigation: NavigationMenu | null;
  footer: FooterColumn[];
  isMobileMenuOpen: boolean;
  setSiteSettings: (settings: SiteSettings) => void;
  setThemeSettings: (settings: ThemeSettings) => void;
  setNavigation: (nav: NavigationMenu) => void;
  setFooter: (footer: FooterColumn[]) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useSiteStore = create<SiteStore>((set) => ({
  siteSettings: null,
  themeSettings: null,
  navigation: null,
  footer: [],
  isMobileMenuOpen: false,
  setSiteSettings: (settings) => set({ siteSettings: settings }),
  setThemeSettings: (settings) => set({ themeSettings: settings }),
  setNavigation: (nav) => set({ navigation: nav }),
  setFooter: (footer) => set({ footer }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));