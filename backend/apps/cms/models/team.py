from django.db import models


class TeamMember(models.Model):
    name = models.CharField(max_length=200)
    designation = models.CharField(max_length=200)
    brief = models.TextField(blank=True)
    photo = models.ImageField(upload_to="team/", blank=True)
    sort_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True, verbose_name="Is Active (Yes/No)")

    class Meta:
        ordering = ["sort_order", "name"]
        verbose_name = "Team Member"
        verbose_name_plural = "Team Members"

    def __str__(self):
        return f"{self.name} — {self.designation}"
