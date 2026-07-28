from django.db import models


class Testimonial(models.Model):
    author_name = models.CharField(max_length=200)
    author_title = models.CharField(max_length=200, blank=True)
    author_company = models.CharField(max_length=200, blank=True)
    author_photo = models.ImageField(upload_to="testimonials/", blank=True)
    content = models.TextField()
    rating = models.IntegerField(default=5)
    is_active = models.BooleanField(default=True, verbose_name="Is Active (Yes/No)")
    sort_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "-created_at"]

    def __str__(self):
        return f"{self.author_name} - {self.author_company}"