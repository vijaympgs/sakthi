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

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: () => cmsApi.getSiteSettings().then((res) => res.data),
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