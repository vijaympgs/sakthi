from django.contrib import admin
from .models import *

# Group models by Navbar main menu items
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

    groups = {
        'About Us Menu': [
            'CompanyInfo', 'TeamMember', 'Testimonial'
        ],
        'Products & Solutions Menu': [
            'ProductCategory', 'Product', 'ProductFeature', 'ProductGallery',
            'ProductSpecGroup', 'CaseStudy', 'ChildwoodCategory', 'ChildwoodGroup',
            'PlayEquipment', 'Partner', 'Solution', 'Industry', 'Client'
        ],
        'Services Menu': [
            'Service', 'ServiceItem'
        ],
        'Site Structure & Nav': [
            'NavigationMenu', 'NavigationItem', 'FooterColumn', 'FooterLink'
        ],
        'Inquiries & Forms': [
            'ContactSubmission', 'EnquiryType'
        ],
        'Content & Downloads': [
            'BlogPost', 'BlogCategory', 'Gallery', 'GalleryImage', 'Download', 'DownloadCategory'
        ],
        'Pages & System Settings': [
            'Page', 'PageSection', 'SEOSettings', 'ThemeSettings', 'PageView'
        ]
    }
    
    virtual_apps = []
    models_by_name = {m['object_name']: m for m in cms_app['models']}
    
    for group_name, model_names in groups.items():
        group_models = []
        for name in model_names:
            if name in models_by_name:
                group_models.append(models_by_name[name])
                
        if group_models:
            virtual_apps.append({
                'name': group_name,
                'app_label': f"cms_{group_name.lower().replace(' ', '_').replace('&', 'and')}",
                'app_url': cms_app['app_url'],
                'has_module_perms': cms_app['has_module_perms'],
                'models': group_models,
            })
            
    grouped_model_names = set(name for model_names in groups.values() for name in model_names)
    other_models = [m for m in cms_app['models'] if m['object_name'] not in grouped_model_names]
    if other_models:
        virtual_apps.append({
            'name': 'CMS Miscellaneous',
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
    list_display = ["name", "industry", "brand_color", "sort_order", "is_published"]
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


class PlayEquipmentInline(admin.TabularInline):
    model = PlayEquipment
    extra = 0


class ChildwoodGroupInline(admin.TabularInline):
    model = ChildwoodGroup
    extra = 0


@admin.register(ChildwoodCategory)
class ChildwoodCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "type", "sort_order"]
    list_filter = ["type"]
    inlines = [ChildwoodGroupInline]


@admin.register(ChildwoodGroup)
class ChildwoodGroupAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "sort_order"]
    list_filter = ["category"]
    inlines = [PlayEquipmentInline]


@admin.register(PlayEquipment)
class PlayEquipmentAdmin(admin.ModelAdmin):
    list_display = ["sku", "name", "group", "dimensions"]
    list_filter = ["group__category"]
    search_fields = ["sku", "name"]
