from django.db import models


class EnquiryType(models.Model):
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "name"]

    def __str__(self):
        return self.name


class ContactSubmission(models.Model):
    name = models.CharField(max_length=200)
    business_name = models.CharField(max_length=200, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    enquiry_type = models.ForeignKey(
        EnquiryType, on_delete=models.SET_NULL, null=True, blank=True
    )
    products = models.JSONField(default=list, blank=True)
    callback_time = models.CharField(max_length=100, blank=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    is_responded = models.BooleanField(default=False)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Contact submissions"

    def __str__(self):
        return f"{self.name} - {self.email}"