from django.db import models


class DownloadCategory(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "name"]
        verbose_name_plural = "Download categories"

    def __str__(self):
        return self.name


class Download(models.Model):
    category = models.ForeignKey(
        DownloadCategory, on_delete=models.CASCADE, related_name="downloads", null=True, blank=True
    )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to="downloads/")
    file_type = models.CharField(max_length=20, blank=True)
    file_size = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True, verbose_name="Is Active (Yes/No)")
    download_count = models.PositiveIntegerField(default=0)
    sort_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "title"]

    def __str__(self):
        return self.title