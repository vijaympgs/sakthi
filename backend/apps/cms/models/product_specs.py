from django.db import models


class ProductSpecGroup(models.Model):
    product = models.ForeignKey(
        "Product", on_delete=models.CASCADE, related_name="spec_groups"
    )
    name = models.CharField(max_length=100)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "name"]

    def __str__(self):
        return f"{self.product.name} - {self.name}"


class ProductSpecColumn(models.Model):
    group = models.ForeignKey(
        ProductSpecGroup, on_delete=models.CASCADE, related_name="columns"
    )
    key = models.SlugField(max_length=50)
    label = models.CharField(max_length=100)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort_order"]
        unique_together = [["group", "key"]]

    def __str__(self):
        return f"{self.group.name} / {self.label}"


class ProductSpecRow(models.Model):
    group = models.ForeignKey(
        ProductSpecGroup, on_delete=models.CASCADE, related_name="rows"
    )
    label = models.CharField(max_length=100)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort_order"]

    def __str__(self):
        return f"{self.group.name} / {self.label}"


class ProductSpecValue(models.Model):
    row = models.ForeignKey(
        ProductSpecRow, on_delete=models.CASCADE, related_name="values"
    )
    column = models.ForeignKey(
        ProductSpecColumn, on_delete=models.CASCADE, related_name="values"
    )
    value = models.CharField(max_length=500, blank=True, default="")

    class Meta:
        unique_together = [["row", "column"]]

    def __str__(self):
        return f"{self.row.label} > {self.column.label}: {self.value}"
