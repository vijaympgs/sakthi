from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *


class PublicMixin:
    permission_classes = [permissions.AllowAny]


class PageListView(PublicMixin, generics.ListAPIView):
    serializer_class = PageSerializer
    queryset = Page.objects.filter(is_published=True)


class PageDetailView(PublicMixin, generics.RetrieveAPIView):
    serializer_class = PageSerializer
    lookup_field = "slug"
    queryset = Page.objects.filter(is_published=True)


class BrandListView(PublicMixin, generics.ListAPIView):
    serializer_class = BrandSerializer
    queryset = Brand.objects.filter(is_published=True)


class ProductCategoryListView(PublicMixin, generics.ListAPIView):
    serializer_class = ProductCategorySerializer
    queryset = ProductCategory.objects.filter(is_published=True)


class ProductCategoryDetailView(PublicMixin, generics.RetrieveAPIView):
    serializer_class = ProductCategorySerializer
    lookup_field = "slug"
    queryset = ProductCategory.objects.filter(is_published=True)


class ProductListView(PublicMixin, generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(is_published=True)


class ProductDetailView(PublicMixin, generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    lookup_field = "slug"
    queryset = Product.objects.filter(is_published=True)


class SolutionListView(PublicMixin, generics.ListAPIView):
    serializer_class = SolutionSerializer
    queryset = Solution.objects.filter(is_published=True)


class IndustryListView(PublicMixin, generics.ListAPIView):
    serializer_class = IndustrySerializer
    queryset = Industry.objects.filter(is_published=True)


class ServiceListView(PublicMixin, generics.ListAPIView):
    serializer_class = ServiceSerializer
    queryset = Service.objects.filter(is_published=True)


class ServiceDetailView(PublicMixin, generics.RetrieveAPIView):
    serializer_class = ServiceSerializer
    lookup_field = "slug"
    queryset = Service.objects.filter(is_published=True)


class ClientListView(PublicMixin, generics.ListAPIView):
    serializer_class = ClientSerializer
    queryset = Client.objects.filter(is_published=True)


class TestimonialListView(PublicMixin, generics.ListAPIView):
    serializer_class = TestimonialSerializer
    queryset = Testimonial.objects.filter(is_published=True)


class GalleryListView(PublicMixin, generics.ListAPIView):
    serializer_class = GallerySerializer
    queryset = Gallery.objects.filter(is_published=True)


class GalleryDetailView(PublicMixin, generics.RetrieveAPIView):
    serializer_class = GallerySerializer
    lookup_field = "slug"
    queryset = Gallery.objects.filter(is_published=True)


class DownloadListView(PublicMixin, generics.ListAPIView):
    serializer_class = DownloadSerializer
    queryset = Download.objects.filter(is_published=True)


class BlogPostListView(PublicMixin, generics.ListAPIView):
    serializer_class = BlogPostSerializer
    queryset = BlogPost.objects.filter(is_published=True)


class BlogPostDetailView(PublicMixin, generics.RetrieveAPIView):
    serializer_class = BlogPostSerializer
    lookup_field = "slug"
    queryset = BlogPost.objects.filter(is_published=True)


class NavigationMenuDetailView(PublicMixin, generics.RetrieveAPIView):
    serializer_class = NavigationMenuSerializer
    lookup_field = "slug"
    queryset = NavigationMenu.objects.filter(is_active=True)


class FooterView(PublicMixin, APIView):
    def get(self, request):
        columns = FooterColumn.objects.filter(is_visible=True).prefetch_related("links")
        serializer = FooterColumnSerializer(columns, many=True)
        return Response(serializer.data)


class CompanyInfoView(PublicMixin, APIView):
    def get(self, request):
        company_obj = CompanyInfo.objects.first()
        if not company_obj:
            return Response({})
        return Response(CompanyInfoSerializer(company_obj).data)


class SEOSettingsView(PublicMixin, APIView):
    def get(self, request):
        settings_obj = SEOSettings.objects.first()
        if not settings_obj:
            return Response({})
        return Response(SEOSettingsSerializer(settings_obj).data)


class ThemeSettingsView(PublicMixin, APIView):
    def get(self, request):
        settings_obj = ThemeSettings.objects.first()
        if not settings_obj:
            return Response({})
        return Response(ThemeSettingsSerializer(settings_obj).data)


class ContactSubmissionCreateView(PublicMixin, generics.CreateAPIView):
    serializer_class = ContactSubmissionCreateSerializer

    def perform_create(self, serializer):
        ip = self.request.META.get("REMOTE_ADDR")
        serializer.save(ip_address=ip)


class HomePageView(PublicMixin, APIView):
    def get(self, request):
        data = {
            "site_settings": CompanyInfoSerializer(CompanyInfo.objects.first()).data if CompanyInfo.objects.exists() else {},
            "brands": BrandSerializer(Brand.objects.filter(is_published=True), many=True).data,
            "products": ProductSerializer(Product.objects.filter(is_published=True, is_featured=True)[:6], many=True).data,
            "product_categories": ProductCategorySerializer(ProductCategory.objects.filter(is_published=True), many=True).data,
            "services": ServiceSerializer(Service.objects.filter(is_published=True), many=True).data,
            "testimonials": TestimonialSerializer(Testimonial.objects.filter(is_published=True)[:6], many=True).data,
            "clients": ClientSerializer(Client.objects.filter(is_published=True), many=True).data,
            "industries": IndustrySerializer(Industry.objects.filter(is_published=True), many=True).data,
        }
        return Response(data)


class ProductSpecGroupListView(PublicMixin, generics.ListAPIView):
    serializer_class = ProductSpecGroupSerializer

    def get_queryset(self):
        product_slug = self.request.query_params.get("product")
        qs = ProductSpecGroup.objects.all()
        if product_slug:
            qs = qs.filter(product__slug=product_slug)
        return qs


class CaseStudyDetailView(PublicMixin, generics.RetrieveAPIView):
    serializer_class = CaseStudySerializer
    lookup_field = "id"

    def get_queryset(self):
        qs = CaseStudy.objects.filter(is_published=True)
        product_slug = self.request.query_params.get("product")
        if product_slug:
            qs = qs.filter(product__slug=product_slug)
        return qs


class CaseStudyListView(PublicMixin, generics.ListAPIView):
    serializer_class = CaseStudySerializer

    def get_queryset(self):
        qs = CaseStudy.objects.filter(is_published=True)
        product_slug = self.request.query_params.get("product")
        if product_slug:
            qs = qs.filter(product__slug=product_slug)
        return qs


class PartnerListView(PublicMixin, generics.ListAPIView):
    serializer_class = PartnerSerializer
    queryset = Partner.objects.filter(is_published=True)


class ProductGroupListView(PublicMixin, generics.ListAPIView):
    serializer_class = ProductGroupSerializer
    queryset = ProductGroup.objects.all()

    def get_queryset(self):
        qs = ProductGroup.objects.prefetch_related("products")
        category_slug = self.request.query_params.get("category")
        if category_slug:
            qs = qs.filter(category__slug=category_slug)
        return qs


class TeamMemberListView(PublicMixin, generics.ListAPIView):
    serializer_class = TeamMemberSerializer
    queryset = TeamMember.objects.filter(is_published=True)