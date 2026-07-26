from django.db import models


class NavigationMenu(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class NavigationItem(models.Model):
    menu = models.ForeignKey(NavigationMenu, on_delete=models.CASCADE, related_name="items")
    parent = models.ForeignKey("self", on_delete=models.CASCADE, null=True, blank=True, related_name="children")
    label = models.CharField(max_length=100)
    url = models.CharField(max_length=500, blank=True)
    page = models.ForeignKey("Page", on_delete=models.SET_NULL, null=True, blank=True)
    product_category = models.ForeignKey("ProductCategory", on_delete=models.SET_NULL, null=True, blank=True)
    is_external = models.BooleanField(default=False)
    sort_order = models.IntegerField(default=0)
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order"]

    def __str__(self):
        return self.label