import { create } from "zustand";
import type { CompanyInfo, ThemeSettings, NavigationMenu, FooterColumn } from "@/types";

interface SiteStore {
  companyInfo: CompanyInfo | null;
  themeSettings: ThemeSettings | null;
  navigation: NavigationMenu | null;
  footer: FooterColumn[];
  isMobileMenuOpen: boolean;
  setCompanyInfo: (info: CompanyInfo) => void;
  setThemeSettings: (settings: ThemeSettings) => void;
  setNavigation: (nav: NavigationMenu) => void;
  setFooter: (footer: FooterColumn[]) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useSiteStore = create<SiteStore>((set) => ({
  companyInfo: null,
  themeSettings: null,
  navigation: null,
  footer: [],
  isMobileMenuOpen: false,
  setCompanyInfo: (info) => set({ companyInfo: info }),
  setThemeSettings: (settings) => set({ themeSettings: settings }),
  setNavigation: (nav) => set({ navigation: nav }),
  setFooter: (footer) => set({ footer }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));