from django.contrib import admin
from django.utils.html import format_html
from .models import *

# ─── Group Django Admin models by NAV items / Page titles ───
#
# Groups mirror the frontend navigation structure so content editors
# can find models by the page/section they manage.
#
original_get_app_list = admin.AdminSite.get_app_list

def custom_get_app_list(self, request, app_label=None):
    app_list = original_get_app_list(self, request, app_label)
    if app_label:
        return app_list
        
    cms_app = None
    other_apps = []
    for app in app_list:
        if app['app_label'] == 'cms':
            cms_app = app
        else:
            other_apps.append(app)
    if not cms_app:
        return app_list

    groups = [
        # ── NAV: Home ( / ) ─────────────────────────────────     
        # Models that power the Home page sections
        ('[Home Page] Hero, Stats & Site Content', [       
            'CompanyInfo',       # Hero title/desc, stats strip, advantages, about section, CTA, trust chips, timeline, enquiry_types
        ]),
        ('[Home Page] Clients, Testimonials & Partners', [
            'Testimonial',       # Client testimonials carousel
            'Client',            # Client logo scroller
            'Partner',           # OEM/technology partners section
            'Industry',          # Trusted Across Sectors grid
        ]),

        # ── NAV: About Us ( /about ) ────────────────────────
        ('[About Us] Team Members', [
            'TeamMember',        # Team cards on About page & /team
        ]),

        # ── NAV: Products ( /products ) ──────────────────────
        # Three sub-groups matching the Products nav hierarchy:
        #   Products > Godspeed, Tellus, Childwood
        ('[Products] Brands', [
            'Brand',             # Godspeed, Tellus, Childwood — top-level brand entities
        ]),
        ('[Products] Product Catalog', [
            'ProductCategory',   # Digital Signage, Video Wall, Feedback Kiosk, Indoor Play, etc.
            'Product',           # Individual products under each category
            'ProductFeature',    # Feature bullets per product
            'ProductGallery',    # Gallery images per product
            'ProductSpecGroup',  # Spec tables (LCD panel, Touch, Power, Environment specs)
            'CaseStudy',         # Case studies (e.g. Phoenix Marketcity wayfinding deployment)
        ]),
        ('[Products] Product Groups (Collections)', [
            'ProductGroup',      # Collections like Playstations, Spring Rockers, Swings under a category
        ]),

        # ── NAV: Services ( /services ) ──────────────────────
        ('[Services] Service Offerings', [
            'Service',           # Hardware for Restaurant & Bar, IT Networking Consulting
            'ServiceItem',       # Individual line items (HP ML10, WiFi Survey, UPS, etc.)
        ]),

        # ── NAV: Contact Us ( /contact ) ─────────────────────
        ('[Contact Us] Inquiries & Forms', [
            'ContactSubmission', # Visitor form submissions with enquiry type tracking
            'EnquiryType',       # Dropdown options: Godspeed, Tellus, Hardware Supply, etc.
        ]),

        # ── Site Structure (appears on all pages) ────────────
        ('[Site] Navigation & Footer', [
            'NavigationMenu',    # Main nav bar menus (supports multiple menus)
            'NavigationItem',    # Individual links with parent/child hierarchy
            'FooterColumn',      # Footer link groups
            'FooterLink',        # Individual footer links
        ]),

        # ── Content & Media ──────────────────────────────────
        ('[Content] Pages, Galleries & Blog', [
            'Page',              # Static page builder with sections
            'PageSection',       # Content sections within pages
            'Gallery',           # Photo galleries
            'GalleryImage',      # Gallery images
            'BlogPost',          # Blog/articles
            'BlogCategory',      # Blog categories
        ]),
        ('[Content] Downloads & Assets', [
            'Download',          # Downloadable files (brochures, spec sheets)
            'DownloadCategory',  # Download groupings
        ]),

        # ── Not in NAV but available for future use ──────────
        ('[Other] Solutions', [
            'Solution',          # Solution categories (reserved for future use)
        ]),

        # ── System Settings ──────────────────────────────────
        ('[Settings] SEO, Theme & Analytics', [
            'SEOSettings',       # Global meta defaults, OG settings
            'ThemeSettings',     # Site color scheme, typography
            'PageView',          # Analytics: page view tracking
        ]),
    ]

    virtual_apps = []
    models_by_name = {m['object_name']: m for m in cms_app['models']}

    for group_name, model_names in groups:
        group_models = []
        for name in model_names:
            if name in models_by_name:
                group_models.append(models_by_name[name])
        if group_models:
            virtual_apps.append({
                'name': group_name,
                'app_label': f"cms_{group_name.lower().replace(' ', '_').replace('&', 'and').replace('—', '_').replace('(', '').replace(')', '').replace('/', '_')}",
                'app_url': cms_app['app_url'],
                'has_module_perms': cms_app['has_module_perms'],
                'models': group_models,
            })

    grouped_model_names = set(name for names in [m for _, m in groups] for name in names)
    other_models = [m for m in cms_app['models'] if m['object_name'] not in grouped_model_names]
    if other_models:
        virtual_apps.append({
            'name': '📁 Other CMS Models',
            'app_label': 'cms_misc',
            'app_url': cms_app['app_url'],
            'has_module_perms': cms_app['has_module_perms'],
            'models': other_models,
        })

    return virtual_apps + other_apps

admin.AdminSite.get_app_list = custom_get_app_list



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


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "sort_order", "is_published"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(ProductGroup)
class ProductGroupAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "sort_order"]
    list_filter = ["category"]


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "brand", "slug", "sort_order", "is_published"]
    list_filter = ["brand"]
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
    list_display = ["name", "industry", "brand_color", "logo_preview", "sort_order", "is_published"]
    list_filter = ["is_published", "industry"]

    @admin.display(description="Logo")
    def logo_preview(self, obj):
        if obj.logo:
            return format_html(
                '<a href="{0}" target="_blank" title="{1}">'
                '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B89A4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
                '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>'
                '<circle cx="12" cy="12" r="3"/>'
                '</svg></a>',
                obj.logo.url, obj.logo.name
            )
        return "-"


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


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = ["company_name", "phone_primary", "email_primary", "city"]


@admin.register(ThemeSettings)
class ThemeSettingsAdmin(admin.ModelAdmin):
    list_display = ["primary_color", "secondary_color", "accent_color"]


@admin.register(EnquiryType)
class EnquiryTypeAdmin(admin.ModelAdmin):
    list_display = ["name", "is_active", "sort_order"]


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ["name", "business_name", "email", "enquiry_type", "is_read", "is_responded", "created_at"]
    list_filter = ["is_read", "is_responded", "enquiry_type"]
    search_fields = ["name", "email", "business_name"]
    readonly_fields = ["ip_address", "created_at"]


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ["name", "designation", "sort_order", "is_published"]
    list_filter = ["is_published"]
    search_fields = ["name", "designation"]


@admin.register(CaseStudy)
class CaseStudyAdmin(admin.ModelAdmin):
    list_display = ["title", "client_name", "product", "is_published"]
    list_filter = ["is_published", "product"]
    search_fields = ["title", "client_name"]


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ["name", "type", "sort_order", "is_published"]
    list_filter = ["is_published"]
    search_fields = ["name"]


@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ["path", "ip_address", "created_at"]
    list_filter = ["path"]
    readonly_fields = ["path", "referrer", "user_agent", "ip_address", "session_id", "duration_seconds", "created_at"]


class ProductSpecValueInline(admin.TabularInline):
    model = ProductSpecValue
    extra = 0


class ProductSpecColumnInline(admin.TabularInline):
    model = ProductSpecColumn
    extra = 0


class ProductSpecRowInline(admin.TabularInline):
    model = ProductSpecRow
    extra = 0


@admin.register(ProductSpecGroup)
class ProductSpecGroupAdmin(admin.ModelAdmin):
    list_display = ["name", "product", "sort_order"]
    list_filter = ["product"]
    search_fields = ["name", "product__name"]
    inlines = [ProductSpecColumnInline, ProductSpecRowInline]



