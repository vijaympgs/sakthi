from django.db import models


class Industry(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)
    image = models.ImageField(upload_to="industries/", blank=True)
    is_active = models.BooleanField(default=True, verbose_name="Is Active (Yes/No)")
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "name"]
        verbose_name_plural = "Industries"

    def __str__(self):
        return self.name