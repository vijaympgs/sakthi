from django.db import models


class FooterColumn(models.Model):
    title = models.CharField(max_length=100)
    sort_order = models.IntegerField(default=0)
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order"]

    def __str__(self):
        return self.title


class FooterLink(models.Model):
    column = models.ForeignKey(FooterColumn, on_delete=models.CASCADE, related_name="links")
    label = models.CharField(max_length=100)
    url = models.CharField(max_length=500, blank=True)
    page = models.ForeignKey("Page", on_delete=models.SET_NULL, null=True, blank=True)
    is_external = models.BooleanField(default=False)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort_order"]

    def __str__(self):
        return self.label