from django.db import models


class Brand(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    tagline = models.CharField(max_length=300, blank=True)
    logo = models.ImageField(upload_to="brands/", blank=True)
    icon = models.CharField(max_length=50, blank=True, help_text="Lucide icon name e.g. Monitor, Baby, Users")
    website = models.URLField(blank=True)
    sort_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True, verbose_name="Is Active (Yes/No)")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "name"]

    def __str__(self):
        return self.name
