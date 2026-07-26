export interface Testimonial {
  id?: number;
  author_name: string;
  author_title: string;
  author_company?: string;
  author_photo?: string;
  content: string;
  rating: number;
  sort_order?: number;
  is_active?: boolean;
}

export interface HomePageData {
  id?: number;
  hero_title?: string;
  hero_subtitle?: string;
  cta_text?: string;
  cta_link?: string;
  sections?: unknown[];
}

export interface SiteSettings {
  id?: number;
  site_name: string;
  tagline?: string;
  phone_primary?: string;
  phone_secondary?: string;
  email_primary?: string;
  email_support?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  facebook_url?: string;
  linkedin_url?: string;
  youtube_url?: string;
  founded_year?: number;
  about_content?: string;
  mission?: string;
  vision?: string;
}

export interface ThemeSettings {
  id?: number;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  font_family?: string;
  logo?: string;
  favicon?: string;
}

export interface NavigationItem {
  id?: number;
  label: string;
  url?: string;
  page?: number;
  product_category?: number;
  order: number;
  parent?: number | null;
  children?: NavigationItem[];
  menu?: number;
}

export interface NavigationMenu {
  id?: number;
  slug: string;
  items: NavigationItem[];
}

export interface FooterLink {
  id?: number;
  label: string;
  url?: string;
  page?: number;
  order: number;
}

export interface FooterColumn {
  id?: number;
  title: string;
  order: number;
  links: FooterLink[];
}
