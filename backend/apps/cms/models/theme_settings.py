from django.db import models


class ThemeSettings(models.Model):
    primary_color = models.CharField(max_length=7, default="#1a1a2e")
    secondary_color = models.CharField(max_length=7, default="#16213e")
    accent_color = models.CharField(max_length=7, default="#e94560")
    background_color = models.CharField(max_length=7, default="#ffffff")
    surface_color = models.CharField(max_length=7, default="#f8f9fa")
    text_primary = models.CharField(max_length=7, default="#1a1a1a")
    text_secondary = models.CharField(max_length=7, default="#6c757d")
    font_heading = models.CharField(max_length=100, default="Inter")
    font_body = models.CharField(max_length=100, default="Inter")
    border_radius = models.CharField(max_length=20, default="0px")
    spacing_unit = models.CharField(max_length=20, default="1rem")

    class Meta:
        verbose_name = "Theme Settings"
        verbose_name_plural = "Theme Settings"

    def __str__(self):
        return "Theme Settings"