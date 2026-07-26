import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api.interceptors.response.use((response) => {
  if (response.data && typeof response.data === "object" && "results" in response.data) {
    return { ...response, data: response.data.results };
  }
  return response;
});

export const cmsApi = {
  getHome: () => api.get("/cms/home/"),
  getPages: () => api.get("/cms/pages/"),
  getPage: (slug: string) => api.get(`/cms/pages/${slug}/`),
  getProductCategories: () => api.get("/cms/product-categories/"),
  getProductCategory: (slug: string) => api.get(`/cms/product-categories/${slug}/`),
  getProducts: () => api.get("/cms/products/"),
  getProduct: (slug: string) => api.get(`/cms/products/${slug}/`),
  getSolutions: () => api.get("/cms/solutions/"),
  getIndustries: () => api.get("/cms/industries/"),
  getServices: () => api.get("/cms/services/"),
  getService: (slug: string) => api.get(`/cms/services/${slug}/`),
  getClients: () => api.get("/cms/clients/"),
  getTestimonials: () => api.get("/cms/testimonials/"),
  getGalleries: () => api.get("/cms/galleries/"),
  getGallery: (slug: string) => api.get(`/cms/galleries/${slug}/`),
  getDownloads: () => api.get("/cms/downloads/"),
  getBlogPosts: () => api.get("/cms/blog/"),
  getBlogPost: (slug: string) => api.get(`/cms/blog/${slug}/`),
  getNavigation: (slug: string) => api.get(`/cms/navigation/${slug}/`),
  getFooter: () => api.get("/cms/footer/"),
  getSiteSettings: () => api.get("/cms/settings/site/"),
  getSEOSettings: () => api.get("/cms/settings/seo/"),
  getThemeSettings: () => api.get("/cms/settings/theme/"),
  submitContact: (data: Record<string, unknown>) => api.post("/cms/contact/", data),
  getPartners: () => api.get("/cms/partners/"),
  getChildwood: (type?: string) => api.get("/cms/childwood/", { params: type ? { type } : {} }),
  getProductSpecs: (productSlug: string) => api.get("/cms/product-specs/", { params: { product: productSlug } }),
  getCaseStudies: (productSlug?: string) => api.get("/cms/case-studies/", { params: productSlug ? { product: productSlug } : {} }),
};