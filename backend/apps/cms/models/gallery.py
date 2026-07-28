from django.db import models


class Gallery(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to="gallery/covers/", blank=True)
    is_active = models.BooleanField(default=True, verbose_name="Is Active (Yes/No)")
    sort_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "name"]
        verbose_name_plural = "Galleries"

    def __str__(self):
        return self.name


class GalleryImage(models.Model):
    gallery = models.ForeignKey(Gallery, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="gallery/images/")
    caption = models.CharField(max_length=200, blank=True)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort_order"]

    def __str__(self):
        return self.caption or f"Image {self.pk}"