from django.db import models


class CaseStudy(models.Model):
    product = models.ForeignKey(
        "Product", on_delete=models.CASCADE, related_name="case_studies", null=True, blank=True
    )
    client_name = models.CharField(max_length=200)
    title = models.CharField(max_length=300)
    description = models.TextField()
    stats = models.JSONField(default=dict, blank=True)
    image = models.ImageField(upload_to="case-studies/", blank=True)
    is_published = models.BooleanField(default=True)
    sort_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "-created_at"]
        verbose_name_plural = "Case studies"

    def __str__(self):
        return self.title
