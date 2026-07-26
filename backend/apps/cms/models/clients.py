from django.db import models


class Client(models.Model):
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to="clients/", blank=True)
    website = models.URLField(blank=True)
    industry = models.CharField(max_length=100, blank=True)
    sort_order = models.IntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "name"]

    def __str__(self):
        return self.name