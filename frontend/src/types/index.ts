export interface Page {
  id: number;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  content: string;
  is_published: boolean;
  sort_order: number;
  sections: PageSection[];
}

export interface PageSection {
  id: number;
  section_type: string;
  title: string;
  content: string;
  image: string;
  data: Record<string, unknown>;
  sort_order: number;
  is_visible: boolean;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  sort_order: number;
  products: Product[];
}

export interface Product {
  id: number;
  category: number;
  category_name: string;
  parent: number | null;
  name: string;
  slug: string;
  tagline: string;
  short_description: string;
  description: string;
  image: string;
  brochure: string;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  features: ProductFeature[];
  gallery: ProductGalleryItem[];
}

export interface ProductFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
}

export interface ProductGalleryItem {
  id: number;
  image: string;
  caption: string;
  sort_order: number;
}

export interface Solution {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  sort_order: number;
}

export interface Industry {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  sort_order: number;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  items: ServiceItem[];
  sort_order: number;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
  sort_order: number;
}

export interface Client {
  id: number;
  name: string;
  logo: string;
  website: string;
  industry: string;
  sort_order: number;
}

export interface Testimonial {
  id: number;
  author_name: string;
  author_title: string;
  author_company: string;
  author_photo: string;
  content: string;
  rating: number;
  sort_order: number;
}

export interface Gallery {
  id: number;
  name: string;
  slug: string;
  description: string;
  cover_image: string;
  images: GalleryImage[];
  sort_order: number;
}

export interface GalleryImage {
  id: number;
  image: string;
  caption: string;
  sort_order: number;
}

export interface Download {
  id: number;
  title: string;
  description: string;
  file: string;
  file_type: string;
  file_size: number;
  download_count: number;
  sort_order: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: number | null;
  category: number | null;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

export interface NavigationItem {
  id: number;
  label: string;
  url: string;
  is_external: boolean;
  sort_order: number;
  children: NavigationItem[];
}

export interface NavigationMenu {
  id: number;
  name: string;
  slug: string;
  items: NavigationItem[];
}

export interface FooterColumn {
  id: number;
  title: string;
  links: FooterLink[];
  sort_order: number;
}

export interface FooterLink {
  id: number;
  label: string;
  url: string;
  is_external: boolean;
  sort_order: number;
}

export interface SiteSettings {
  id: number;
  site_name: string;
  tagline: string;
  logo: string;
  favicon: string;
  phone_primary: string;
  phone_secondary: string;
  email_primary: string;
  email_support: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  google_maps_embed: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  instagram_url: string;
  youtube_url: string;
  founded_year: number;
  about_content: string;
  mission: string;
  vision: string;
}

export interface ThemeSettings {
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  surface_color: string;
  text_primary: string;
  text_secondary: string;
  font_heading: string;
  font_body: string;
  border_radius: string;
  spacing_unit: string;
}

export interface SEOSettings {
  site_name: string;
  default_meta_title: string;
  default_meta_description: string;
  default_og_image: string;
  og_type: string;
  twitter_handle: string;
  google_analytics_id: string;
  google_tag_manager_id: string;
  canonical_base_url: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  enquiry_type: number | null;
  products: string[];
  message: string;
}

export interface HomePageData {
  site_settings: SiteSettings;
  products: Product[];
  product_categories: ProductCategory[];
  services: Service[];
  testimonials: Testimonial[];
  clients: Client[];
  industries: Industry[];
}