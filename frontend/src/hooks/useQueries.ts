"use client";

import { useQuery } from "@tanstack/react-query";
import { cmsApi } from "@/lib/api";
import type { HomePageData } from "@/types";

export function useHomePage() {
  return useQuery<HomePageData>({
    queryKey: ["home"],
    queryFn: () => cmsApi.getHome().then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => cmsApi.getProducts().then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => cmsApi.getProduct(slug).then((res) => res.data),
    enabled: !!slug,
  });
}

export function useProductCategories() {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: () => cmsApi.getProductCategories().then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => cmsApi.getServices().then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: () => cmsApi.getTestimonials().then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => cmsApi.getClients().then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useIndustries() {
  return useQuery({
    queryKey: ["industries"],
    queryFn: () => cmsApi.getIndustries().then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useNavigation(slug: string) {
  return useQuery({
    queryKey: ["navigation", slug],
    queryFn: () => cmsApi.getNavigation(slug).then((res) => res.data),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCompanyInfo() {
  return useQuery({
    queryKey: ["company-info"],
    queryFn: () => cmsApi.getCompanyInfo().then((res) => res.data),
    staleTime: 10 * 60 * 1000,
  });
}

export function usePage(slug: string) {
  return useQuery({
    queryKey: ["page", slug],
    queryFn: () => cmsApi.getPage(slug).then((res) => res.data),
    enabled: !!slug,
  });
}

export function usePartners() {
  return useQuery({
    queryKey: ["partners"],
    queryFn: () => cmsApi.getPartners().then((res) => res.data),
    staleTime: 10 * 60 * 1000,
  });
}

export function useChildwood(type?: string) {
  return useQuery({
    queryKey: ["childwood", type],
    queryFn: () => cmsApi.getChildwood(type).then((res) => res.data),
    staleTime: 10 * 60 * 1000,
  });
}

export function useProductSpecs(slug: string) {
  return useQuery({
    queryKey: ["product-specs", slug],
    queryFn: () => cmsApi.getProductSpecs(slug).then((res) => res.data),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}

export function useCaseStudies(productSlug?: string) {
  return useQuery({
    queryKey: ["case-studies", productSlug],
    queryFn: () => cmsApi.getCaseStudies(productSlug).then((res) => res.data),
    staleTime: 10 * 60 * 1000,
  });
}

export function useFooter() {
  return useQuery({
    queryKey: ["footer"],
    queryFn: () => cmsApi.getFooter().then((res) => res.data),
    staleTime: 10 * 60 * 1000,
  });
}

export function useTeam() {
  return useQuery({
    queryKey: ["team"],
    queryFn: () => cmsApi.getTeam().then((res) => res.data),
    staleTime: 10 * 60 * 1000,
  });
}