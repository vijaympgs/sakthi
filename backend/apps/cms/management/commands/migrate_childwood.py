from django.core.management.base import BaseCommand
from apps.cms.models import (
    Brand, ProductCategory, ProductGroup, Product, ProductFeature, ProductGallery,
    PlayEquipment, ChildwoodGroup, ChildwoodCategory
)


class Command(BaseCommand):
    help = "Migrate Childwood-specific model data into generic ProductGroup → Product hierarchy"

    def handle(self, *args, **options):
        childwood_brand = Brand.objects.get(slug="childwood")

        # Map old ChildwoodCategory types to new ProductCategory slugs
        cat_map = {
            "outdoor": "outdoor-play",
            "indoor": "indoor-play",
        }

        for old_cat in ChildwoodCategory.objects.all():
            cat_slug = cat_map.get(old_cat.type, old_cat.name.lower().replace(' ', '-'))
            try:
                new_cat = ProductCategory.objects.get(slug=cat_slug, brand=childwood_brand)
            except ProductCategory.DoesNotExist:
                self.stdout.write(self.style.WARNING(f"Category '{cat_slug}' not found, skipping"))
                continue

            for old_group in ChildwoodGroup.objects.filter(category=old_cat):
                new_group, _ = ProductGroup.objects.update_or_create(
                    category=new_cat,
                    name=old_group.name,
                    defaults={"sort_order": old_group.sort_order},
                )

                for old_eq in PlayEquipment.objects.filter(group=old_group):
                    slug = f"{cat_slug}-{old_eq.sku.lower()}"
                    Product.objects.update_or_create(
                        sku=old_eq.sku,
                        defaults={
                            "category": new_cat,
                            "group": new_group,
                            "name": old_eq.name,
                            "slug": slug,
                            "dimensions": old_eq.dimensions,
                            "sort_order": old_eq.sort_order,
                            "is_published": True,
                            "image": old_eq.image,
                        },
                    )

            self.stdout.write(f"  Migrated: {old_cat.name}")

        self.stdout.write(self.style.SUCCESS("Childwood data migration complete"))
