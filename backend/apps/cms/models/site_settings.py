from django.db import models


class SiteSettings(models.Model):
    site_name = models.CharField(max_length=200)
    tagline = models.CharField(max_length=300, blank=True)
    logo = models.ImageField(upload_to="settings/", blank=True)
    favicon = models.ImageField(upload_to="settings/", blank=True)
    phone_primary = models.CharField(max_length=20, blank=True)
    phone_secondary = models.CharField(max_length=20, blank=True)
    email_primary = models.EmailField(blank=True)
    email_support = models.EmailField(blank=True)
    address_line1 = models.CharField(max_length=300, blank=True)
    address_line2 = models.CharField(max_length=300, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=100, blank=True)
    google_maps_embed = models.TextField(blank=True)
    facebook_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    founded_year = models.IntegerField(null=True, blank=True)
    about_content = models.TextField(blank=True)
    mission = models.TextField(blank=True)
    vision = models.TextField(blank=True)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return self.site_name