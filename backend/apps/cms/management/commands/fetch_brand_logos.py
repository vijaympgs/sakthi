"""
Fetch brand logos from the production WordPress site and update
the Brand model's logo field for each brand.
"""
import os
import urllib.request

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand

from apps.cms.models import Brand

# Brand slug → Production WordPress logo URL
BRAND_LOGO_URLS = {
    "godspeed": "https://sakthisolutions.in/sakthisolutions/uploads/2018/04/logo.png",
    "tellus": "https://sakthisolutions.in/sakthisolutions/uploads/2018/12/tell-us-logo.png",
    "childwood": "https://sakthisolutions.in/sakthisolutions/uploads/2018/11/logo.png",
}


class Command(BaseCommand):
    help = "Fetch brand logos from the production site and update Brand records"

    def handle(self, *args, **options):
        for slug, url in BRAND_LOGO_URLS.items():
            try:
                brand = Brand.objects.get(slug=slug)
            except Brand.DoesNotExist:
                self.stdout.write(
                    self.style.WARNING(f"Brand '{slug}' not found — skipping")
                )
                continue

            ext = os.path.splitext(url.split("?")[0])[1] or ".png"
            filename = f"{slug}_logo{ext}"

            try:
                with urllib.request.urlopen(url, timeout=30) as response:
                    content = response.read()
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f"Failed to download logo for '{slug}': {e}")
                )
                continue

            brand.logo.save(filename, ContentFile(content), save=True)
            self.stdout.write(
                self.style.SUCCESS(
                    f"Updated logo for '{brand.name}' ({slug}) from {url}"
                )
            )
