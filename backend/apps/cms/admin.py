from django.contrib import admin
from .models import *


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ["title", "slug", "is_published", "sort_order", "updated_at"]
    list_filter = ["is_published"]
    search_fields = ["title", "slug"]
    prepopulated_fields = {"slug": ("title",)}


@admin.register(PageSection)
class PageSectionAdmin(admin.ModelAdmin):
    list_display = ["page", "section_type", "title", "sort_order", "is_visible"]
    list_filter = ["section_type", "is_visible"]


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "sort_order", "is_published"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "parent", "is_featured", "is_published", "sort_order"]
    list_filter = ["category", "is_featured", "is_published"]
    search_fields = ["name"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(ProductFeature)
class ProductFeatureAdmin(admin.ModelAdmin):
    list_display = ["product", "title", "sort_order"]


@admin.register(ProductGallery)
class ProductGalleryAdmin(admin.ModelAdmin):
    list_display = ["product", "caption", "sort_order"]


@admin.register(Solution)
class SolutionAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "is_published", "sort_order"]
    prepopulated_fields = {"slug": ("name",)}
    filter_horizontal = ["products"]


@admin.register(Industry)
class IndustryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "is_published", "sort_order"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "is_published", "sort_order"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(ServiceItem)
class ServiceItemAdmin(admin.ModelAdmin):
    list_display = ["service", "title", "sort_order"]


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ["name", "industry", "sort_order", "is_published"]
    list_filter = ["is_published", "industry"]


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ["author_name", "author_company", "rating", "is_published", "sort_order"]
    list_filter = ["is_published", "rating"]


@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "is_published", "sort_order"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ["gallery", "caption", "sort_order"]


@admin.register(DownloadCategory)
class DownloadCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "sort_order"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Download)
class DownloadAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "is_published", "download_count", "sort_order"]
    list_filter = ["category", "is_published"]


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "sort_order"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ["title", "author", "category", "is_published", "published_at"]
    list_filter = ["is_published", "category"]
    search_fields = ["title"]
    prepopulated_fields = {"slug": ("title",)}


@admin.register(NavigationMenu)
class NavigationMenuAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "is_active"]


@admin.register(NavigationItem)
class NavigationItemAdmin(admin.ModelAdmin):
    list_display = ["menu", "label", "parent", "url", "sort_order", "is_visible"]
    list_filter = ["menu", "is_visible"]


@admin.register(FooterColumn)
class FooterColumnAdmin(admin.ModelAdmin):
    list_display = ["title", "sort_order", "is_visible"]


@admin.register(FooterLink)
class FooterLinkAdmin(admin.ModelAdmin):
    list_display = ["column", "label", "url", "sort_order"]


@admin.register(SEOSettings)
class SEOSettingsAdmin(admin.ModelAdmin):
    list_display = ["site_name", "default_meta_title"]


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ["site_name", "phone_primary", "email_primary", "city"]


@admin.register(ThemeSettings)
class ThemeSettingsAdmin(admin.ModelAdmin):
    list_display = ["primary_color", "secondary_color", "accent_color"]


@admin.register(EnquiryType)
class EnquiryTypeAdmin(admin.ModelAdmin):
    list_display = ["name", "is_active", "sort_order"]


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "enquiry_type", "is_read", "is_responded", "created_at"]
    list_filter = ["is_read", "is_responded", "enquiry_type"]
    search_fields = ["name", "email"]
    readonly_fields = ["ip_address", "created_at"]


@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ["path", "ip_address", "created_at"]
    list_filter = ["path"]
    readonly_fields = ["path", "referrer", "user_agent", "ip_address", "session_id", "duration_seconds", "created_at"]