from django.db import models


class PageView(models.Model):
    path = models.CharField(max_length=500)
    referrer = models.CharField(max_length=500, blank=True)
    user_agent = models.TextField(blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    session_id = models.CharField(max_length=100, blank=True)
    duration_seconds = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.path} - {self.created_at}"