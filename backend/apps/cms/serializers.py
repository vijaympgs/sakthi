from rest_framework import serializers
from .models import *


class PageSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageSection
        fields = ["id", "section_type", "title", "content", "image", "data", "sort_order", "is_visible"]


class PageSerializer(serializers.ModelSerializer):
    sections = PageSectionSerializer(many=True, read_only=True)

    class Meta:
        model = Page
        fields = [
            "id", "title", "slug", "meta_title", "meta_description",
            "hero_title", "hero_subtitle", "hero_image", "content",
            "is_active", "sort_order", "sections",
        ]


class ProductFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductFeature
        fields = ["id", "title", "description", "icon", "sort_order"]


class ProductGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductGallery
        fields = ["id", "image", "caption", "sort_order"]


class ProductSerializer(serializers.ModelSerializer):
    features = ProductFeatureSerializer(many=True, read_only=True)
    gallery = ProductGallerySerializer(many=True, read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)
    group_name = serializers.CharField(source="group.name", read_only=True, allow_null=True)
    has_specs = serializers.SerializerMethodField()

    def get_has_specs(self, obj):
        return obj.spec_groups.exists()

    class Meta:
        model = Product
        fields = [
            "id", "category", "category_name", "group", "group_name", "parent", "name", "slug",
            "sku", "dimensions",
            "tagline", "short_description", "description", "image", "brochure",
            "is_featured", "is_active", "sort_order", "features", "gallery", "has_specs",
        ]


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ["id", "name", "slug", "description", "tagline", "logo", "icon", "website", "sort_order", "is_active"]


class SolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solution
        fields = ["id", "name", "slug", "description", "image", "icon", "sort_order", "is_active"]


class IndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = ["id", "name", "slug", "description", "icon", "image", "sort_order"]


class ServiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceItem
        fields = ["id", "title", "description", "image", "sort_order"]


class ServiceSerializer(serializers.ModelSerializer):
    items = ServiceItemSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = ["id", "name", "slug", "description", "image", "icon", "items", "sort_order"]


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["id", "name", "logo", "website", "industry", "brand_color", "sort_order"]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            "id", "author_name", "author_title", "author_company",
            "author_photo", "content", "rating", "sort_order",
        ]


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ["id", "image", "caption", "sort_order"]


class GallerySerializer(serializers.ModelSerializer):
    images = GalleryImageSerializer(many=True, read_only=True)

    class Meta:
        model = Gallery
        fields = ["id", "name", "slug", "description", "cover_image", "images", "sort_order"]


class DownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Download
        fields = [
            "id", "title", "description", "file", "file_type",
            "file_size", "download_count", "sort_order",
        ]


class DownloadCategorySerializer(serializers.ModelSerializer):
    downloads = DownloadSerializer(many=True, read_only=True)

    class Meta:
        model = DownloadCategory
        fields = ["id", "name", "slug", "downloads", "sort_order"]


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = [
            "id", "title", "slug", "excerpt", "content", "featured_image",
            "author", "category", "meta_title", "meta_description",
            "is_active", "published_at", "created_at",
        ]


class NavigationItemSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = NavigationItem
        fields = ["id", "label", "url", "is_external", "sort_order", "children"]

    def get_children(self, obj):
        children = obj.children.filter(is_visible=True).order_by("sort_order")
        return NavigationItemSerializer(children, many=True).data


class NavigationMenuSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    class Meta:
        model = NavigationMenu
        fields = ["id", "name", "slug", "items"]

    def get_items(self, obj):
        top_items = obj.items.filter(parent__isnull=True, is_visible=True).order_by("sort_order")
        return NavigationItemSerializer(top_items, many=True).data


class FooterLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterLink
        fields = ["id", "label", "url", "is_external", "sort_order"]


class FooterColumnSerializer(serializers.ModelSerializer):
    links = FooterLinkSerializer(many=True, read_only=True)

    class Meta:
        model = FooterColumn
        fields = ["id", "title", "links", "sort_order"]


class SEOSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SEOSettings
        fields = "__all__"


class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = "__all__"


class ThemeSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThemeSettings
        fields = "__all__"


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ["id", "name", "business_name", "email", "phone", "enquiry_type", "products", "callback_time", "message", "created_at"]
        read_only_fields = ["id", "created_at"]


class ContactSubmissionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission


class ProductSpecValueSerializer(serializers.ModelSerializer):
    column_key = serializers.CharField(source="column.key", read_only=True)

    class Meta:
        model = ProductSpecValue
        fields = ["column_key", "value"]


class ProductSpecRowSerializer(serializers.ModelSerializer):
    values = ProductSpecValueSerializer(many=True, read_only=True)

    class Meta:
        model = ProductSpecRow
        fields = ["id", "label", "sort_order", "values"]


class ProductSpecColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSpecColumn
        fields = ["id", "key", "label", "sort_order"]


class ProductGroupSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = ProductGroup
        fields = ["id", "name", "sort_order", "products"]


class ProductCategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    groups = ProductGroupSerializer(many=True, read_only=True)
    brand_name = serializers.CharField(source="brand.name", read_only=True, allow_null=True)
    brand_icon = serializers.CharField(source="brand.icon", read_only=True, allow_null=True)
    brand_logo = serializers.SerializerMethodField()

    def get_brand_logo(self, obj):
        if obj.brand and obj.brand.logo:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.brand.logo.url)
            return obj.brand.logo.url
        return None

    class Meta:
        model = ProductCategory
        fields = ["id", "name", "slug", "brand", "brand_name", "brand_icon", "brand_logo", "description", "tagline", "icon", "image", "sort_order", "is_active", "show_brand_logo", "products", "groups"]


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = ["id", "name", "type", "logo", "website", "sort_order"]


class CaseStudySerializer(serializers.ModelSerializer):
    product_slug = serializers.CharField(source="product.slug", read_only=True, allow_null=True)

    class Meta:
        model = CaseStudy
        fields = "__all__"


class ProductSpecGroupSerializer(serializers.ModelSerializer):
    columns = ProductSpecColumnSerializer(many=True, read_only=True)
    rows = ProductSpecRowSerializer(many=True, read_only=True)

    class Meta:
        model = ProductSpecGroup
        fields = ["id", "name", "sort_order", "columns", "rows"]


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ["id", "name", "designation", "brief", "photo", "sort_order"]