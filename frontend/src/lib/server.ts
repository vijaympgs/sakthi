const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface CompanyInfoData {
  company_name?: string;
  site_tagline?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  logo?: string;
  phone_primary?: string;
  phone_secondary?: string;
  email_primary?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  facebook_url?: string;
  linkedin_url?: string;
  youtube_url?: string;
}

export async function getCompanyInfo(): Promise<CompanyInfoData | null> {
  try {
    const baseUrl = API_URL.replace(/\/api\/?$/, "");
    const res = await fetch(`${API_URL.replace(/\/api\/?$/, "")}/cms/settings/company/`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://sakthisolutions.in";
}
