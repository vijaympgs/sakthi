from django.db import models


class SEOSettings(models.Model):
    site_name = models.CharField(max_length=200, default="OWP")
    default_meta_title = models.CharField(max_length=200, blank=True)
    default_meta_description = models.TextField(blank=True)
    default_og_image = models.ImageField(upload_to="seo/", blank=True)
    og_type = models.CharField(max_length=50, default="website")
    twitter_handle = models.CharField(max_length=100, blank=True)
    google_analytics_id = models.CharField(max_length=50, blank=True)
    google_tag_manager_id = models.CharField(max_length=50, blank=True)
    robots_txt = models.TextField(blank=True)
    sitemap_enabled = models.BooleanField(default=True)
    canonical_base_url = models.URLField(blank=True)

    class Meta:
        verbose_name = "SEO Settings"
        verbose_name_plural = "SEO Settings"

    def __str__(self):
        return f"SEO Settings - {self.site_name}"