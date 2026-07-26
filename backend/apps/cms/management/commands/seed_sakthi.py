import json
from pathlib import Path
from django.core.management.base import BaseCommand
from apps.cms.models import *


class Command(BaseCommand):
    help = "Seed database with Sakthi Solutions content"

    def handle(self, *args, **options):
        seed_file = Path(__file__).resolve().parent.parent.parent / "fixtures" / "seed-data.json"

        if not seed_file.exists():
            self.stderr.write(f"Seed file not found: {seed_file}")
            return

        with open(seed_file) as f:
            data = json.load(f)

        self._seed_site_settings(data.get("siteSettings", {}))
        self._seed_product_categories(data.get("productCategories", []))
        self._seed_products(data.get("products", []))
        self._seed_services(data.get("services", []))
        self._seed_industries(data.get("industries", []))
        self._seed_enquiry_types(data.get("enquiryTypes", []))

        self.stdout.write(self.style.SUCCESS("Database seeded successfully"))

    def _seed_site_settings(self, data):
        obj, created = SiteSettings.objects.update_or_create(
            pk=1,
            defaults={
                "site_name": data.get("site_name", "Sakthi Solutions"),
                "tagline": data.get("tagline", ""),
                "phone_primary": data.get("phone_primary", ""),
                "phone_secondary": data.get("phone_secondary", ""),
                "email_primary": data.get("email_primary", ""),
                "email_support": data.get("email_support", ""),
                "address_line1": data.get("address_line1", ""),
                "address_line2": data.get("address_line2", ""),
                "city": data.get("city", ""),
                "state": data.get("state", ""),
                "postal_code": data.get("postal_code", ""),
                "country": data.get("country", ""),
                "facebook_url": data.get("facebook_url", ""),
                "linkedin_url": data.get("linkedin_url", ""),
                "youtube_url": data.get("youtube_url", ""),
                "founded_year": data.get("founded_year"),
                "about_content": data.get("about_content", ""),
                "mission": data.get("mission", ""),
                "vision": data.get("vision", ""),
            },
        )
        self.stdout.write(f"  SiteSettings: {'created' if created else 'updated'}")

    def _seed_product_categories(self, categories):
        for cat_data in categories:
            obj, created = ProductCategory.objects.update_or_create(
                slug=cat_data["slug"],
                defaults={
                    "name": cat_data["name"],
                    "description": cat_data.get("description", ""),
                    "sort_order": cat_data.get("sort_order", 0),
                    "is_published": True,
                },
            )
            self.stdout.write(f"  ProductCategory '{cat_data['name']}': {'created' if created else 'updated'}")

    def _seed_products(self, products):
        for prod_data in products:
            category = ProductCategory.objects.get(slug=prod_data["category"])
            obj, created = Product.objects.update_or_create(
                slug=prod_data["slug"],
                defaults={
                    "category": category,
                    "name": prod_data["name"],
                    "tagline": prod_data.get("tagline", ""),
                    "short_description": prod_data.get("short_description", ""),
                    "description": prod_data.get("description", ""),
                    "is_featured": prod_data.get("is_featured", False),
                    "is_published": True,
                    "sort_order": prod_data.get("sort_order", 0),
                },
            )
            self.stdout.write(f"  Product '{prod_data['name']}': {'created' if created else 'updated'}")

    def _seed_services(self, services):
        for svc_data in services:
            obj, created = Service.objects.update_or_create(
                slug=svc_data["slug"],
                defaults={
                    "name": svc_data["name"],
                    "description": svc_data.get("description", ""),
                    "is_published": True,
                    "sort_order": svc_data.get("sort_order", 0),
                },
            )
            self.stdout.write(f"  Service '{svc_data['name']}': {'created' if created else 'updated'}")

    def _seed_industries(self, industries):
        for ind_data in industries:
            obj, created = Industry.objects.update_or_create(
                slug=ind_data["slug"],
                defaults={
                    "name": ind_data["name"],
                    "is_published": True,
                },
            )
            self.stdout.write(f"  Industry '{ind_data['name']}': {'created' if created else 'updated'}")

    def _seed_enquiry_types(self, types):
        for et_data in types:
            obj, created = EnquiryType.objects.update_or_create(
                name=et_data["name"],
                defaults={
                    "is_active": True,
                    "sort_order": et_data.get("sort_order", 0),
                },
            )
            self.stdout.write(f"  EnquiryType '{et_data['name']}': {'created' if created else 'updated'}")