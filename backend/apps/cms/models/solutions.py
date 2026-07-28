from django.db import models


class Solution(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="solutions/", blank=True)
    icon = models.CharField(max_length=50, blank=True)
    products = models.ManyToManyField("Product", blank=True, related_name="solutions")
    is_active = models.BooleanField(default=True, verbose_name="Is Active (Yes/No)")
    sort_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "name"]

    def __str__(self):
        return self.name