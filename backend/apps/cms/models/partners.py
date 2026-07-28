from django.db import models


class Partner(models.Model):
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=100, blank=True, help_text="e.g. Digital Signage, LCD Panels")
    logo = models.ImageField(upload_to="partners/", blank=True)
    website = models.URLField(blank=True)
    sort_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True, verbose_name="Is Active (Yes/No)")

    class Meta:
        ordering = ["sort_order", "name"]

    def __str__(self):
        return self.name
