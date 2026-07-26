from django.db import models


class ChildwoodCategory(models.Model):
    CATEGORY_TYPES = [("outdoor", "Outdoor"), ("indoor", "Indoor")]
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=20, choices=CATEGORY_TYPES)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "name"]
        verbose_name_plural = "Childwood categories"

    def __str__(self):
        return self.name


class ChildwoodGroup(models.Model):
    category = models.ForeignKey(
        ChildwoodCategory, on_delete=models.CASCADE, related_name="groups"
    )
    name = models.CharField(max_length=100)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "name"]

    def __str__(self):
        return f"{self.category.name} - {self.name}"


class PlayEquipment(models.Model):
    group = models.ForeignKey(
        ChildwoodGroup, on_delete=models.CASCADE, related_name="items"
    )
    sku = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=200, blank=True, default="")
    image = models.ImageField(upload_to="childwood/", blank=True)
    dimensions = models.CharField(max_length=100, blank=True, default="")
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "sku"]
        verbose_name_plural = "Play equipment"

    def __str__(self):
        return f"{self.sku} - {self.name or self.group.name}"
