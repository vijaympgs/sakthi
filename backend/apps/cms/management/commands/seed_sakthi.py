from django.core.management.base import BaseCommand
from apps.cms.models import *
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Seed database with complete Sakthi Solutions content"

    def handle(self, *args, **options):
        self._ensure_superuser()
        self._seed_company_info()
        self._seed_brands_and_categories()
        self._seed_products()
        self._seed_product_images()
        self._seed_product_features()
        self._seed_specs()
        self._seed_services()
        self._seed_service_items()
        self._seed_industries()
        self._seed_services_page()
        self._seed_enquiry_types()
        self._seed_testimonials()
        self._seed_partners()
        self._seed_navigation()
        self._seed_footer()
        self._seed_case_study()
        self._seed_clients()
        self._seed_team()
        self._seed_hero_images()
        self.stdout.write(self.style.SUCCESS("Database seeded completely"))

    # ─── helpers ────────────────────────────────────────────────

    def _cat(self, slug):
        return ProductCategory.objects.get(slug=slug)

    def _prod(self, slug):
        return Product.objects.get(slug=slug)

    def _download_and_save_category_image(self, category_instance, url, filename):
        import urllib.request
        import ssl
        from django.core.files.base import ContentFile
        try:
            ctx = ssl.create_default_context()
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE

            req = urllib.request.Request(
                url,
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
            )
            with urllib.request.urlopen(req, context=ctx, timeout=15) as response:
                content = response.read()
                category_instance.image.save(filename, ContentFile(content), save=True)
                self.stdout.write(f"Successfully downloaded and saved category image for {category_instance.slug}")
                return True
        except Exception as e:
            self.stdout.write(self.style.WARNING(f"Could not download {url}: {e}"))
            return False

    # ─── superuser ──────────────────────────────────────────────

    def _ensure_superuser(self):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        if not User.objects.filter(is_superuser=True).exists():
            User.objects.create_superuser(
                email="admin@sakthisolutions.in",
                password="admin123",
            )
            self.stdout.write(self.style.SUCCESS("Superuser created (admin@sakthisolutions.in / admin123)"))
        else:
            self.stdout.write("Superuser already exists, skipping")

    # ─── company info ───────────────────────────────────────────

    def _seed_company_info(self):
        CompanyInfo.objects.update_or_create(pk=1, defaults={
            "company_name": "Sakthi Solutions",
            "tagline": "Digital Signage, Kiosks & IT Solutions",
            "logo": "",
            "phone_primary": "04426420089",
            "phone_secondary": "+91 9840057127",
            "email_primary": "info@sakthisolutions.in",
            "email_support": "support@sakthisolutions.in",
            "address_line1": "1/1, 1st Floor, General Collins Road",
            "address_line2": "Choolai",
            "city": "Chennai", "state": "Tamil Nadu", "postal_code": "600112", "country": "India",
            "facebook_url": "https://www.facebook.com/Sakthi-Solutions-276890643116200/?modal=admin_todo_tour",
            "linkedin_url": "https://www.linkedin.com/company/sakthi-solutions/?lipi=urn%3Ali%3Apage%3Ad_flagship3_company_admin%3BLNHvzou%2FRO6VF1l8%2FVJD7A%3D%3D",
            "youtube_url": "https://www.youtube.com/channel/UCxRoJTQKDHkLFj6hFCTHW0g",
            "founded_year": 2014,
            "about_content": "Sakthi Solutions provides digital signage, interactive kiosks, and IT consulting for hospitality, retail and corporate sectors. The company was formed in the year 2014 by a dynamic couple — Jayakumar with 25+ years of experience in sales, hospitality, automation and Vidya Rani with expertise in financial products and customer relations.",
            "mission": "To provide complete hardware, digital signage and IT consulting end-to-end solutions for hospitality, retail and corporate sectors, enabling businesses to operate efficiently with the right technology.",
            "vision": "To be the most trusted technology partner for digital signage and IT solutions, known for prompt service, reliable partnerships and innovative solutions.",
            "contact_section_title": "Contact Us",
            "contact_section_heading": "Visit or Call Us",
            "cta_subtitle_title": "Request a Consultation",
            "testimonials_section_title": "Testimonials",
            "clients_section_title": "Our Clients",
            "products_section_title": "Our Products",
            "hero_title": "Digital Signage, Kiosks & IT Solutions",
            "hero_description": "We help retail & hospitality brands boost customer engagement and streamline operations with premium digital signage, interactive kiosks, and 24/7 on-ground IT support.",
            "hero_bg_image": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
            "trust_chips": [
                {"icon": "→", "text": "Digital Signage & Video Walls"},
                {"icon": "→", "text": "Interactive Kiosks"},
                {"icon": "→", "text": "IT Networking Consulting"},
                {"icon": "→", "text": "Feedback Solutions"}
            ],
            "advantages": [
                {"title": "Direct OEM Collaborations", "description": "We partner directly with leading international manufacturers to deliver authentic, world-class digital displays and custom interactive hardware solutions."},
                {"title": "24/7 On-Ground Support", "description": "Our team of certified, locally stationed technicians provides round-the-clock proactive monitoring and prompt maintenance support."},
                {"title": "End-to-End IT Consulting", "description": "From setting up hospitality POS & KOT environments to designing high-speed network infrastructures, we offer expert consulting and clear roadmaps."},
                {"title": "Vandal-Proof Engineering", "description": "All our public-facing signage devices feature heavy-duty commercial bodies and tempered protective glass surfaces built for high-traffic operations."}
            ],
            "hero_tagline": "Since 2014 — Chennai • Hospitality & Retail IT Partner",
            "stats": [
                {"value": "12+", "label": "Years Experience"},
                {"value": "500+", "label": "Projects Completed"},
                {"value": "150+", "label": "Happy Clients"},
                {"value": "24/7", "label": "On-Ground Support"}
            ],
            "about_image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
            "about_heading": "Your Reliable Technology Partner Since 2014",
            "about_body": "Sakthi Solutions delivers commercial hardware integrations, interactive touch interfaces, and structured network engineering across India. Founded by a dynamic leadership team combining sales, automation, and customer relationship expertise. As the primary representative of Godspeed displays, we customize, deploy, and service heavy-duty, outdoor, and indoor digital signage solutions designed to operate continuously under rigorous environmental conditions.",
            "cta_title": "Ready to Transform Your Business?",
            "cta_subtitle": "Get a free consultation and discover how Sakthi Solutions can streamline your operations with the right technology.",
            "timeline": [
                {"year": "2014", "title": "Founded", "description": "Sakthi Solutions was established by Jayakumar (25+ years in sales, retail, automation & hospitality) and Vidya Rani (sales & financial products)."},
                {"year": "2015", "title": "Godspeed Partnership", "description": "Partnered with Godspeed for world-class digital signage products manufactured in Hong Kong and China."},
                {"year": "2016", "title": "Full-Stack IT Consulting", "description": "Expanded to provide complete IT infrastructure consulting for the hospitality industry including networking, WiFi, and hardware."},
                {"year": "Present", "title": "Growing Strong", "description": "Continuing to serve corporates, hospitals, hotels, restaurants, malls and more across the region."}
            ],
            "why_items": [
                {"icon": "Award", "title": "End-to-End Provider", "description": "Hardware, installation, digital signage and IT consulting end-to-end solution for hospitality, retail and corporate sectors."},
                {"icon": "Clock", "title": "Prompt Service", "description": "Prompt service on all days, even after office hours. We understand that business never stops."},
                {"icon": "HeartHandshake", "title": "Reliable Partner", "description": "Reliable partner for regular updates, maintenance and consumables for day-to-day operations."},
                {"icon": "Users", "title": "Customer-First Approach", "description": "We put ourselves in your shoes so that the client gets the best solution for their business."},
                {"icon": "ShieldCheck", "title": "Quality Hardware", "description": "World-class products from Samsung, LG, Godspeed and other reputed global brands."},
                {"icon": "Wifi", "title": "Free IT Consulting", "description": "Professional IT networking consulting at no cost for new businesses. Complete guidance from planning to execution."}
            ],
            "enquiry_types": [
                {"name": "Godspeed Digital Signage", "sort_order": 1},
                {"name": "Smart Touch Table", "sort_order": 2},
                {"name": "Wayfinding Kiosk", "sort_order": 3},
                {"name": "Touch Screen Kiosk", "sort_order": 4},
                {"name": "Video Wall", "sort_order": 5},
                {"name": "Hardware Supply", "sort_order": 6},
                {"name": "IT Networking Consulting", "sort_order": 7},
                {"name": "General Enquiry", "sort_order": 8}
            ],
            "callback_slots": [
                {"label": "Morning (9 AM – 12 PM)", "value": "morning"},
                {"label": "Afternoon (12 PM – 3 PM)", "value": "afternoon"},
                {"label": "Evening (3 PM – 6 PM)", "value": "evening"},
                {"label": "Anytime", "value": "anytime"}
            ],
            "business_hours": "Mon – Sat: 9:00 AM – 6:30 PM",
            "phone_jayakumar": "+91 98400 57127",
            "phone_vidya": "+91 93814 59199",
            "why_us_bullets": [
                "Direct Godspeed OEM partner — authentic products with warranty",
                "On-site installation & support across Chennai and Tamil Nadu",
                "24/7 maintenance SLA for all deployed hardware",
                "Hospitality-grade hardware designed for 24x7 operations"
            ],
        })

    # ─── brands & product categories ────────────────────────────
    #
    # Architecture: Brand → ProductCategory → Product
    #   Godspeed    → Digital Signage, Video Wall,     → Indoor Signage, Touch Table, etc.
    #                 Interactive Displays
    #

    def _seed_brands_and_categories(self):
        # Don't delete — use get_or_create to preserve logo files
        ProductCategory.objects.all().delete()
        Product.objects.all().delete()

        godspeed, _ = Brand.objects.get_or_create(slug="godspeed", defaults={
            "name": "Godspeed",
            "tagline": "World Class Digital Displays",
            "description": "World class digital signage with extraordinary features. Heavy duty body and toughened glass surface.",
            "icon": "Monitor", "sort_order": 1, "is_active": True,
        })

        # ── Godspeed Categories ──
        cat_digital_signage = ProductCategory.objects.create(
            brand=godspeed, name="Digital Signage", slug="digital-signage",
            tagline="Premium Digital Displays",
            description="Indoor and outdoor digital signage solutions including floor standing, wall mounting and LG commercial displays.",
            sort_order=1, is_active=True)
        cat_video_wall = ProductCategory.objects.create(
            brand=godspeed, name="Video Wall", slug="video-wall-cat",
            tagline="Ultra-Thin Bezel Displays",
            description="Samsung and LG LCD video wall solutions in 42\", 46\" and 55\" with ultra-thin bezel splicing.",
            sort_order=2, is_active=True)
        cat_interactive = ProductCategory.objects.create(
            brand=godspeed, name="Interactive Displays", slug="interactive-displays",
            tagline="Touch & Interactive Solutions",
            description="Interactive touch kiosks, smart tables and wayfinding solutions with IR, resistive and capacitive touch options.",
            sort_order=3, is_active=True)

        self._cat_map = {
            "godspeed": cat_digital_signage,
            "digital-signage": cat_digital_signage,
            "video-wall": cat_video_wall,
            "interactive": cat_interactive,
        }

    def _cat(self, key):
        return self._cat_map.get(key)

    def _seed_products(self):
        products_data = [
            {"cat": "digital-signage", "name": "Indoor Digital Signage", "slug": "indoor-digital-signage", "tagline": "Revolutionary Digital Communication", "short_description": "Digital signage with floor standing, wall mountable and LG options.", "description": "World class digital signage with extraordinary features. Heavy duty body and toughened glass surface. User changeable images and videos using exclusive software.", "is_featured": True, "sort_order": 1},
            {"cat": "digital-signage", "name": "Smart Touch Table", "slug": "smart-touch-table", "tagline": "Next Generation Human-Machine Interaction", "short_description": "Multi-touch interactive tables in 32\", 42\" and 46\" sizes.", "description": "Multi-touch tables enabling advanced and intelligent interaction between human and machine. Available with foil touch, IR touch and capacitive touch options.", "is_featured": False, "sort_order": 2},
            {"cat": "interactive", "name": "Interactive Wayfinding Kiosk", "slug": "wayfinding-kiosk", "tagline": "Navigate with Ease", "short_description": "Interactive wayfinding with directory, map and route guidance.", "description": "Interactive wayfinding with intuitive interface, directory listing, shortest route guidance and attractive branding. Deployed at Phoenix Marketcity malls in Mumbai, Pune and Bangalore.", "is_featured": False, "sort_order": 3},
            {"cat": "interactive", "name": "Speed Touch Series Touch Screen Kiosk", "slug": "touch-screen-kiosk", "tagline": "Versatile Touch Solutions", "short_description": "Touch screen kiosks from 19\" to 55\" for various applications.", "description": "Touch screen kiosk with high quality IR, resistance and capacitive touch options. Floor standing and half standing configurations. Industrial mother board with Windows/Android support.", "is_featured": False, "sort_order": 4},
            {"cat": "video-wall", "name": "Video Wall", "slug": "video-wall", "tagline": "Perfect Visual Experience", "short_description": "Samsung/LG LCD video walls in 42\", 46\" and 55\" sizes.", "description": "Godspeed LCD video wall with original A+ LCD Panel from Samsung and LG. Perfect visual experience with ultra thin splicing technology and intelligent controlling system.", "is_featured": False, "sort_order": 5},
        ]
        for data in products_data:
            category_key = data.pop("cat")
            cat = self._cat(category_key)
            if cat:
                Product.objects.update_or_create(slug=data["slug"], defaults={**data, "category": cat, "is_active": True})

    # ─── product images (download from prod server) ────────────

    def _download_and_save_product_image(self, product_instance, url, filename):
        import urllib.request
        import ssl
        from django.core.files.base import ContentFile
        try:
            ctx = ssl.create_default_context()
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE

            req = urllib.request.Request(
                url,
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
            )
            with urllib.request.urlopen(req, context=ctx, timeout=15) as response:
                content = response.read()
                product_instance.image.save(filename, ContentFile(content), save=True)
                self.stdout.write(f"Successfully downloaded and saved product image for {product_instance.slug}")
                return True
        except Exception as e:
            self.stdout.write(self.style.WARNING(f"Could not download {url}: {e}"))
            return False

    def _seed_product_images(self):
        for data in [
            {"slug": "indoor-digital-signage", "url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/lcd.jpg", "filename": "indoor_digital_signage.jpg"},
            {"slug": "smart-touch-table", "url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/pro3.png", "filename": "smart_touch_table.png"},
            {"slug": "wayfinding-kiosk", "url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/image1.jpg", "filename": "wayfinding_kiosk.jpg"},
            {"slug": "touch-screen-kiosk", "url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/intra-kisosk-usibility.png", "filename": "touch_screen_kiosk.png"},
            {"slug": "video-wall", "url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/video-wall3.jpg", "filename": "video_wall.jpg"},
        ]:
            try:
                prod = Product.objects.get(slug=data["slug"])
                if not prod.image or str(prod.image) == "":
                    self._download_and_save_product_image(prod, data["url"], data["filename"])
            except Product.DoesNotExist:
                pass

    # ─── product features ───────────────────────────────────────

    def _seed_product_features(self):
        FEATURES = {
            "indoor-digital-signage": [
                ("Perfect Image", "High brightness, High contrast ratio, full HD 1920*1080"),
                ("Easy Operation", "USB or SD drive standalone. Network version: one control terminal for multiple players."),
                ("Smart Schedule", "Default video play setting date, time, expiry, auto delete, cut-in video."),
                ("Safe", "Protection lock to avoid strangers changing storage media."),
                ("Fashion Design", "Modern and sleek design. Vandal proof, antiglare functions customizable."),
                ("Video Encryption", "Video list videos set verification. Only upload verified videos."),
                ("Screen Splitting", "Horizontal, vertical, full screen and splitting mode with rolling subtitle."),
                ("Display Mode", "Video, flash, picture, word mixed play. 20 kinds of PPT switch modes."),
            ],
            "smart-touch-table": [
                ("Large Screens", "30 inch screens with very good graphics resolutions."),
                ("Connectivity", "Internet connection (Ethernet, WiFi) and audio outputs."),
                ("Object Detection", "Detection and interaction with objects on the table surface."),
                ("2D & 3D Design", "Full 2D and 3D design capabilities for interactive applications."),
                ("Multi User", "Multi user and multi touch applications with 20-point touch."),
                ("Tailored Software", "Software tailored to the professional activities and use cases."),
                ("21.5\" Variant", "Android-powered 21.5 inch variant with capacitive 10-point touch, water proof IP43."),
            ],
            "wayfinding-kiosk": [
                ("Interactive Map", "Block based 2D map with multiple colours for colour coding. Easy for visitors to read and understand."),
                ("Directory Listing", "Categorised directory view of all elements. Shops grouped by genre like fashion, electronics etc."),
                ("Time Savings", "Find any destination with shortest possible route. Saves significant time for visitors."),
                ("Branding Option", "When idle, displays logo animations, videos or images for effective branding."),
            ],
            "touch-screen-kiosk": [
                ("High Quality Touch", "IR touch, Resistance touch, Capacitive touch with high transparency and water proof."),
                ("Fast Response", "High sensitivity touch function with fast response and no image drifting."),
                ("Industrial Panel", "Industry LED panel with HD image, high brightness and stable operation."),
                ("Sleek Design", "Outstanding enclosure design, ultra-thin outlook with excellent protection grade."),
                ("Industrial Motherboard", "Adopt industrial mother board with Windows/Android, support 4-10 dots touch."),
                ("Versatile Applications", "Education, training, exhibition, public media, video meeting, transportation."),
            ],
            "video-wall": [
                ("A+ LCD Panels", "Original A+ LCD Panel from SAMSUNG and LG for perfect visual experience."),
                ("Ultra Thin Splicing", "Latest ultra thin splicing technology with intelligent control system."),
                ("Wide Application", "Security systems, shopping malls, hotels, exhibition centers, banks worldwide."),
                ("Custom Solutions", "The most suitable video wall solution given for your specific requirements."),
            ],
        }
        for slug, features in FEATURES.items():
            product = self._prod(slug)
            for i, (title, desc) in enumerate(features):
                ProductFeature.objects.update_or_create(
                    product=product, title=title,
                    defaults={"description": desc, "sort_order": i},
                )

    # ─── spec tables ────────────────────────────────────────────

    def _seed_specs(self):
        SPECS = {
            "indoor-digital-signage": {
                "Floor Standing Series - Round Corner (R)": {
                    "columns": [
                        ("model", "Model"), ("size", "Size"), ("resolution", "Resolution"),
                        ("displayScale", "Display Scale"), ("brightness", "Brightness (nits)"),
                        ("contrast", "Contrast Ratio"), ("viewing", "Viewing Angle"),
                        ("response", "Response Time"), ("lifetime", "Lifetime"),
                        ("operatingTemp", "Operating Temp"), ("storageTemp", "Storage Temp"),
                        ("inputPower", "Input Power"), ("consumption", "Consumption"),
                        ("dimension", "Dimension (mm)"),
                    ],
                    "rows": [
                        {"model": "GS-AD42FS-R", "size": "42\"", "resolution": "1080x1920", "displayScale": "9:16", "brightness": "400", "contrast": "4000:1", "viewing": "175\u00b0", "response": "6ms", "lifetime": "60000 hrs", "operatingTemp": "0\u00b0C~40\u00b0C", "storageTemp": "-20\u00b0C~60\u00b0C", "inputPower": "AC 110V~240V", "consumption": "80W", "dimension": "1789x635x453"},
                        {"model": "GS-AD46FS-R", "size": "46\"", "resolution": "1080x1920", "displayScale": "9:16", "brightness": "450", "contrast": "4000:1", "viewing": "175\u00b0", "response": "6ms", "lifetime": "60000 hrs", "operatingTemp": "0\u00b0C~40\u00b0C", "storageTemp": "-20\u00b0C~60\u00b0C", "inputPower": "AC 110V~240V", "consumption": "120W", "dimension": "1850x690x423"},
                        {"model": "GS-AD55FS-R", "size": "55\"", "resolution": "1080x1920", "displayScale": "9:16", "brightness": "450", "contrast": "3000:1", "viewing": "175\u00b0", "response": "6ms", "lifetime": "60000 hrs", "operatingTemp": "0\u00b0C~40\u00b0C", "storageTemp": "-20\u00b0C~60\u00b0C", "inputPower": "AC 110V~240V", "consumption": "160W", "dimension": "1925x796x492"},
                        {"model": "GS-AD65FS-R", "size": "65\"", "resolution": "1080x1920", "displayScale": "9:16", "brightness": "500", "contrast": "3000:1", "viewing": "175\u00b0", "response": "6ms", "lifetime": "60000 hrs", "operatingTemp": "0\u00b0C~40\u00b0C", "storageTemp": "-20\u00b0C~60\u00b0C", "inputPower": "AC 110V~240V", "consumption": "350W", "dimension": "2123x937x620"},
                    ],
                },
                "Wall Mounted Indoor LCD AD Player": {
                    "columns": [
                        ("model", "Model"), ("size", "Size"), ("resolution", "Resolution"),
                        ("brightness", "Brightness (nits)"), ("contrast", "Contrast Ratio"),
                        ("consumption", "Consumption"), ("dimension", "Dimension (mm)"), ("version", "Version"),
                    ],
                    "rows": [
                        {"model": "GS-AD22WM", "size": "22\"", "resolution": "1920x1080", "brightness": "250", "contrast": "3000:1", "consumption": "32W", "dimension": "558x280x37", "version": "Network"},
                        {"model": "GS-AD26WM", "size": "26\"", "resolution": "1920x1080", "brightness": "300", "contrast": "3000:1", "consumption": "45W", "dimension": "650x380x45", "version": "Network"},
                        {"model": "GS-AD32WM", "size": "32\"", "resolution": "1366x768", "brightness": "400", "contrast": "4000:1", "consumption": "65W", "dimension": "791x489x54", "version": "Network"},
                        {"model": "GS-AD42WM", "size": "42\"", "resolution": "1920x1080", "brightness": "400", "contrast": "4000:1", "consumption": "80W", "dimension": "1030x623x51", "version": "Network"},
                        {"model": "GS-AD46WM", "size": "46\"", "resolution": "1920x1080", "brightness": "400", "contrast": "4000:1", "consumption": "120W", "dimension": "1158x722x74", "version": "Network"},
                        {"model": "GS-AD55WM", "size": "55\"", "resolution": "1920x1080", "brightness": "500", "contrast": "5000:1", "consumption": "160W", "dimension": "1378x838x69", "version": "Network"},
                        {"model": "GS-AD65WM", "size": "65\"", "resolution": "1920x1080", "brightness": "500", "contrast": "5000:1", "consumption": "200W", "dimension": "1601x972x79", "version": "Network"},
                        {"model": "GS-AD70WM", "size": "70\"", "resolution": "1920x1080", "brightness": "400", "contrast": "4000:1", "consumption": "240W", "dimension": "1673x996x103", "version": "Network"},
                    ],
                },
            },
            "smart-touch-table": {
                "Smart Touch Table Specifications": {
                    "columns": [("model", "Model"), ("size", "Size"), ("description", "Description")],
                    "rows": [
                        {"model": "GS-TT-32", "size": "32\"", "description": "20 Points Foil Touch Table 32\" IR Touch / 400cd brightness. PC: Intel Core i3/i5/i7, RAM 4-16GB, HDD 160-500GB, Win 7/10"},
                        {"model": "GS-TT-42", "size": "42\"", "description": "20 Points Foil Touch Table 42\" IR Touch / 400cd brightness. PC: Intel Core i3/i5/i7, RAM 4-16GB, HDD 160-500GB, Win 7/10"},
                        {"model": "GS-TT-46", "size": "46\"", "description": "20 Points Foil Touch Table 46\" IR Touch / 400cd brightness. PC: Intel Core i3/i5/i7, RAM 4-16GB, HDD 160-500GB, Win 7/10"},
                    ],
                },
            },
            "touch-screen-kiosk": {
                "LCD Panel Specification": {
                    "columns": [("param", "Parameter"), ("gs-tk19", "GS-TK19 (19\")"), ("gs-tk22", "GS-TK22 (22\")"), ("gs-tk32", "GS-TK32 (32\")"), ("gs-tk42", "GS-TK42 (42\")"), ("gs-tk46", "GS-TK46 (46\")"), ("gs-tk55", "GS-TK55 (55\")")],
                    "rows": [
                        {"param": "Size", "gs-tk19": "19\"", "gs-tk22": "22\"", "gs-tk32": "32\"", "gs-tk42": "42\"", "gs-tk46": "46\"", "gs-tk55": "55\""},
                        {"param": "Display Scale", "gs-tk19": "16:9", "gs-tk22": "16:9", "gs-tk32": "16:9", "gs-tk42": "16:9", "gs-tk46": "16:9", "gs-tk55": "16:9"},
                        {"param": "Resolution", "gs-tk19": "1280x1024", "gs-tk22": "1680x1050", "gs-tk32": "1366x768", "gs-tk42": "1920x1080", "gs-tk46": "1920x1080", "gs-tk55": "1920x1080"},
                        {"param": "Brightness (nits)", "gs-tk19": "350", "gs-tk22": "250", "gs-tk32": "450", "gs-tk42": "450", "gs-tk46": "400", "gs-tk55": "450"},
                        {"param": "Color", "gs-tk19": "16.7M", "gs-tk22": "16.7M", "gs-tk32": "16.7M", "gs-tk42": "16.7M", "gs-tk46": "16.7M", "gs-tk55": "16.7M"},
                        {"param": "Viewing Angle", "gs-tk19": "170\u00b0/170\u00b0", "gs-tk22": "170\u00b0/170\u00b0", "gs-tk32": "170\u00b0/170\u00b0", "gs-tk42": "170\u00b0/170\u00b0", "gs-tk46": "170\u00b0/170\u00b0", "gs-tk55": "170\u00b0/170\u00b0"},
                        {"param": "Contrast Ratio", "gs-tk19": "1000:1", "gs-tk22": "1000:1", "gs-tk32": "1000:1", "gs-tk42": "1000:1", "gs-tk46": "1000:1", "gs-tk55": "1000:1"},
                        {"param": "Response Time", "gs-tk19": "4ms", "gs-tk22": "4ms", "gs-tk32": "4ms", "gs-tk42": "4ms", "gs-tk46": "4ms", "gs-tk55": "4ms"},
                        {"param": "Lifetime", "gs-tk19": "\u226560000 hrs", "gs-tk22": "\u226560000 hrs", "gs-tk32": "\u226560000 hrs", "gs-tk42": "\u226560000 hrs", "gs-tk46": "\u226560000 hrs", "gs-tk55": "\u226560000 hrs"},
                    ],
                },
            },
            "video-wall": {
                "Video Wall Models": {
                    "columns": [("model", "Model"), ("brightness", "Brightness (nits)"), ("consumption", "Consumption"), ("contrast", "Contrast Ratio"), ("gap", "Gap (mm)")],
                    "rows": [
                        {"model": "GS-VW4667L", "brightness": "450", "consumption": "200W", "contrast": "3500:1", "gap": "6.7mm"},
                        {"model": "GS-VW4667H", "brightness": "700", "consumption": "280W", "contrast": "3000:1", "gap": "6.7mm"},
                        {"model": "GS-VW4653L", "brightness": "450", "consumption": "150W", "contrast": "3500:1", "gap": "5.3mm"},
                        {"model": "GS-VW4653H", "brightness": "700", "consumption": "170W", "contrast": "5000:1", "gap": "5.3mm"},
                        {"model": "GS-VW4610L", "brightness": "500", "consumption": "130W", "contrast": "3000:1", "gap": "10mm"},
                        {"model": "GS-VW4635H", "brightness": "700", "consumption": "200W", "contrast": "3000:1", "gap": "3.5mm"},
                    ],
                },
            },
        }
        for prod_slug, groups in SPECS.items():
            product = self._prod(prod_slug)
            for sorder, (group_name, spec_data) in enumerate(groups.items()):
                group = ProductSpecGroup.objects.create(product=product, name=group_name, sort_order=sorder)
                col_objs = []
                for corder, (key, label) in enumerate(spec_data["columns"]):
                    col = ProductSpecColumn.objects.create(group=group, key=key, label=label, sort_order=corder)
                    col_objs.append(col)
                for rorder, row_data in enumerate(spec_data["rows"]):
                    row = ProductSpecRow.objects.create(group=group, label=row_data.get("model") or row_data.get("param") or f"Row {rorder}", sort_order=rorder)
                    for col in col_objs:
                        ProductSpecValue.objects.create(row=row, column=col, value=row_data.get(col.key, ""))

    # ─── services ───────────────────────────────────────────────

    def _seed_services(self):
        for data in [
            {"name": "Hardware for Restaurant and Bar", "slug": "hardware", "description": "Complete hardware solutions for the hospitality industry including POS terminals, servers, printers, and peripherals.", "sort_order": 1},
            {"name": "Consulting for IT Networking", "slug": "it-networking", "description": "Professional free consulting for new restaurants and bars. Network setup, infrastructure planning and technology roadmap.", "sort_order": 2},
        ]:
            Service.objects.update_or_create(slug=data["slug"], defaults={**data, "is_active": True})

    def _seed_service_items(self):
        hardware = Service.objects.get(slug="hardware")
        items = [
            ("Server (HP ML10)", "Entry-level tower server for small business. 4-core Xeon, RAID support, 8GB RAM."),
            ("PC (DELL)", "Business-class desktop PC with Intel Core processor. Reliable for POS and back-office operations."),
            ("Posiflex 3316E", "All-in-one POS terminal with 15\" touch screen. Fanless design, VIA C7 processor, dual display support."),
            ("Partnertech SP850", "POS terminal with Intel Atom processor, 15\" touch display, magnetic stripe reader, thermal printer port."),
            ("Epson POS / KOT Printers", "High-speed thermal receipt printers for POS billing and KOT printing. TM series with USB and Ethernet."),
            ("Model TM-T82 II, M30", "Epson TM-T82II thermal printer with Auto Cutter. 250mm/sec print speed, USB+Serial+Ethernet."),
            ("Cash Drawers", "Heavy-duty steel cash drawers with 4 bill/5 coin compartments. RJ11/RJ12 interface, 12V solenoid lock."),
            ("Thermal Rolls For Billing (79mm)", "High quality thermal paper rolls 79mm width for POS printers. 70mm diameter, 50 rolls per carton."),
            ("7 inch TAB for KOT", "7 inch Android tablet for Kitchen Order Ticket display. Wall-mountable, durable, WiFi connected."),
        ]
        for i, (name, desc) in enumerate(items):
            ServiceItem.objects.update_or_create(service=hardware, title=name, defaults={"description": desc, "image": "", "sort_order": i})

        it_consulting = Service.objects.get(slug="it-networking")
        consulting_items = [
            ("Free Professional Consulting", "Offered at zero cost for new restaurants, cafes, and bars to plan their tech infrastructure."),
            ("Multi-Floor Network Architecture", "Tailored cable laying, network switch racking, and router sizing based on layout and node count."),
            ("WiFi Site Survey & AP Selection", "Determining precise access point counts for uninterrupted mobile/tablet order taking via KOT."),
            ("Online UPS Power Backup", "Guaranteed power breakdown-free daily operations, seamlessly bridging generator switchovers."),
            ("Server & Node Sizing", "Right-sizing HP ML10 servers, DELL workstations, and POS nodes based on transaction volume."),
            ("Kitchen & Bar Printers", "Selection of water-proof POS machines and spill-proof thermal printers (Epson TM-T82 II, M30)."),
            ("Digital Signage & Menu Displays", "Heavy-duty ad players and wall-mounted menu displays for in-house dish and offer promotions."),
            ("Restaurant Chain Solutions", "End-to-end scalable hardware, software and consulting for multi-outlet restaurant chains."),
        ]
        for i, (name, desc) in enumerate(consulting_items):
            ServiceItem.objects.update_or_create(service=it_consulting, title=name, defaults={"description": desc, "image": "", "sort_order": i})

    # ─── industries ─────────────────────────────────────────────

    def _seed_industries(self):
        for data in [
            {"name": "Corporate Offices", "slug": "corporate"},
            {"name": "Hospitals & Healthcare", "slug": "healthcare"},
            {"name": "Shopping Malls & Retail", "slug": "retail"},
            {"name": "Hotels & Resorts", "slug": "hotels"},
            {"name": "Restaurants & Fine Dining", "slug": "restaurants"},
            {"name": "Event Management", "slug": "events"},
            {"name": "Airports", "slug": "airports"},
            {"name": "Museums", "slug": "museums"},
            {"name": "Cafes & Coffee Shops", "slug": "cafes"},
            {"name": "Bars & Nightclubs", "slug": "bars"},
            {"name": "Food Courts & QSR", "slug": "food-courts"},
            {"name": "Entertainment Centers", "slug": "entertainment"},
        ]:
            Industry.objects.update_or_create(slug=data["slug"], defaults={**data, "is_active": True})

    # ─── services page (for usePage hook) ─────────────────────

    def _seed_services_page(self):
        page, _ = Page.objects.update_or_create(slug="services", defaults={
            "title": "Hardware Supply & IT Networking Consulting",
            "hero_title": "Our Services",
            "hero_subtitle": "Hardware supply and professional IT consulting for the hospitality industry",
            "meta_description": "Complete hardware supply and professional IT networking consulting for the hospitality industry. Free consulting for new restaurants and bars.",
            "content": "We provide end-to-end hardware and IT consulting for restaurants, bars, cafes, and hotels across India.",
            "is_active": True,
        })
        # Hero section
        PageSection.objects.update_or_create(
            page=page, section_type="hero",
            defaults={
                "title": "Hardware Supply & IT Networking",
                "content": "Complete hardware supply and professional IT networking consulting for the hospitality industry. Free consulting for new restaurants and bars.",
                "sort_order": 0, "is_visible": True,
            }
        )

    # ─── enquiry types ──────────────────────────────────────────

    def _seed_enquiry_types(self):
        for data in [
            {"name": "Godspeed Digital Signage", "sort_order": 1},
            {"name": "Smart Touch Table", "sort_order": 2},
            {"name": "Wayfinding Kiosk", "sort_order": 3},
            {"name": "Touch Screen Kiosk", "sort_order": 4},
            {"name": "Video Wall", "sort_order": 5},
            {"name": "Hardware Supply", "sort_order": 6},
            {"name": "IT Networking Consulting", "sort_order": 7},
            {"name": "General Enquiry", "sort_order": 8},
        ]:
            EnquiryType.objects.update_or_create(name=data["name"], defaults={**data, "is_active": True})

    # ─── testimonials ───────────────────────────────────────────

    def _seed_testimonials(self):
        for data in [
            {"author_name": "Mr. Navaz Buhari", "author_title": "Proprietor", "author_company": "Buhari", "content": "Sakthi Solutions helped us automate KOT with 16 Tablets across our outlets. Home Delivery, Takeaway and Phone orders with Customer tracking and SMS triggering helped us increase customer satisfaction significantly.", "rating": 5, "sort_order": 1},
            {"author_name": "Mr. Prasana Butt", "author_title": "Owner", "author_company": "Matsya, Egmore", "content": "Sakthi Solutions guided us through a complete technology upgrade from legacy PC-based systems to modern tablet-based KOT and touch POS machines at both our restaurants. The transition was smooth.", "rating": 5, "sort_order": 2},
            {"author_name": "Mr. Ramesh", "author_title": "Manager", "author_company": "Doveton Cafe, Purasaiwakkam", "content": "We moved from a 10-year-old ECR system to modern technology. The tablet-based KOT, automatic email reporting and user-friendly interface made a real difference to our daily operations.", "rating": 5, "sort_order": 3},
        ]:
            Testimonial.objects.update_or_create(author_name=data["author_name"], defaults={**data, "is_active": True})

    # ─── partners ───────────────────────────────────────────────

    def _seed_partners(self):
        for data in [
            {"name": "Godspeed", "type": "Digital Signage", "website": "", "sort_order": 1},
            {"name": "Samsung", "type": "LCD Panels", "website": "https://www.samsung.com", "sort_order": 2},
            {"name": "LG", "type": "Digital Displays", "website": "https://www.lg.com", "sort_order": 3},
            {"name": "HP", "type": "Servers", "website": "https://www.hp.com", "sort_order": 4},
            {"name": "DELL", "type": "PCs", "website": "https://www.dell.com", "sort_order": 5},
            {"name": "Epson", "type": "Printers", "website": "https://www.epson.com", "sort_order": 6},
            {"name": "Posiflex", "type": "POS Hardware", "website": "https://www.posiflex.com", "sort_order": 7},
        ]:
            Partner.objects.update_or_create(name=data["name"], defaults={**data, "is_active": True})

    # ─── navigation ─────────────────────────────────────────────

    def _seed_navigation(self):
        menu, _ = NavigationMenu.objects.update_or_create(slug="main", defaults={"name": "Main Navigation", "is_active": True})
        # Top level items
        home = NavigationItem.objects.update_or_create(menu=menu, label="Home", defaults={"url": "/", "sort_order": 1, "is_visible": True})[0]
        about = NavigationItem.objects.update_or_create(menu=menu, label="About Us", defaults={"url": "/about", "sort_order": 2, "is_visible": True})[0]
        products_parent = NavigationItem.objects.update_or_create(menu=menu, label="Products", defaults={"url": "/products", "sort_order": 3, "is_visible": True})[0]
        services_parent = NavigationItem.objects.update_or_create(menu=menu, label="Services", defaults={"url": "/services", "sort_order": 4, "is_visible": True})[0]
        contact = NavigationItem.objects.update_or_create(menu=menu, label="Contact Us", defaults={"url": "/contact", "sort_order": 5, "is_visible": True})[0]
        blog = NavigationItem.objects.update_or_create(menu=menu, label="Blog", defaults={"url": "/blog", "sort_order": 6, "is_visible": True})[0]

        # Products → Godspeed (Brand) → sub-products
        godspeed = NavigationItem.objects.update_or_create(menu=menu, label="Godspeed", parent=products_parent, defaults={"url": "/products/godspeed", "sort_order": 1, "is_visible": True})[0]
        for i, (label, url) in enumerate([
            ("Digital Signage", "/products/indoor-digital-signage"),
            ("Smart Touch Table", "/products/smart-touch-table"),
            ("Wayfinding Kiosk", "/products/wayfinding-kiosk"),
            ("Touch Screen Kiosk", "/products/touch-screen-kiosk"),
            ("Video Wall", "/products/video-wall"),
        ]):
            NavigationItem.objects.update_or_create(menu=menu, label=label, parent=godspeed, defaults={"url": url, "sort_order": i, "is_visible": True})

        # Services → sub-items
        for i, (label, url) in enumerate([
            ("Hardware Supply", "/services/hardware"),
            ("IT Networking Consulting", "/services/it-networking"),
        ]):
            NavigationItem.objects.update_or_create(menu=menu, label=label, parent=services_parent, defaults={"url": url, "sort_order": i, "is_visible": True})

    # ─── footer ─────────────────────────────────────────────────

    def _seed_footer(self):
        col1, _ = FooterColumn.objects.update_or_create(pk=1, defaults={"title": "Godspeed", "sort_order": 1})
        col2, _ = FooterColumn.objects.update_or_create(pk=2, defaults={"title": "More Products", "sort_order": 2})
        for col, links in [
            (col1, [
                ("/products/indoor-digital-signage", "Indoor Digital Signage"),
                ("/products/smart-touch-table", "Smart Touch Table"),
                ("/products/wayfinding-kiosk", "Wayfinding Kiosk"),
                ("/products/touch-screen-kiosk", "Touch Screen Kiosk"),
                ("/products/video-wall", "Video Wall"),
            ]),
            (col2, [
                ("/services", "Hardware Supply"),
                ("/services", "IT Networking Consulting"),
                ("/about", "About Us"),
                ("/contact", "Contact Us"),
            ]),
        ]:
            for i, (url, label) in enumerate(links):
                FooterLink.objects.update_or_create(column=col, label=label, defaults={"url": url, "sort_order": i})

    # ─── case study ─────────────────────────────────────────────

    def _seed_case_study(self):
        product = Product.objects.get(slug="wayfinding-kiosk")
        CaseStudy.objects.update_or_create(
            product=product, title="Interactive Wayfinding Solution",
            defaults={
                "client_name": "Phoenix Mills - Phoenix Marketcity",
                "description": "Phoenix Mills run chain of malls in major cities of India. To set up a better guidance system, interactive wayfinding solution was provided with directory of all shops and amenities. This solution offers search option along with shortest route available.",
                "stats": {
                    "deployments": [
                        {"location": "Mumbai - Phoenix Marketcity Kurla", "details": "9 Kiosks deployed"},
                        {"location": "Mumbai - High Street Phoenix Lower Parel", "details": "4 Kiosks deployed"},
                        {"location": "Pune - Phoenix Marketcity Vimannagar", "details": "6 Kiosks deployed"},
                        {"location": "Bangalore - Phoenix Marketcity", "details": "8 Kiosks deployed"},
                    ]
                },
                "is_active": True,
            },
        )

    def _download_and_save_client_logo(self, client_instance, url, filename):
        if not url:
            return False
        import urllib.request
        import ssl
        from django.core.files.base import ContentFile
        try:
            ctx = ssl.create_default_context()
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE

            req = urllib.request.Request(
                url,
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
            )
            with urllib.request.urlopen(req, context=ctx, timeout=15) as response:
                content = response.read()
                client_instance.logo.save(filename, ContentFile(content), save=True)
                self.stdout.write(f"Successfully downloaded and saved client logo for {client_instance.name}")
                return True
        except Exception as e:
            self.stdout.write(self.style.WARNING(f"Could not download {url}: {e}"))
            return False

    def _seed_clients(self):
        Client.objects.all().delete()
        clients_data = [
            {"name": "Cibo", "website": "", "industry": "Hospitality", "brand_color": "#2C5E3B", "sort_order": 1, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/04/logo0.jpg", "filename": "cibo_logo.jpg"},
            {"name": "Ajnabi", "website": "", "industry": "Hospitality", "brand_color": "#D35400", "sort_order": 2, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/04/logo1.jpg", "filename": "ajnabi_logo.jpg"},
            {"name": "Box Out", "website": "", "industry": "Cafe", "brand_color": "#D35400", "sort_order": 3, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/04/logo2.jpg", "filename": "boxout_logo.jpg"},
            {"name": "Zamrud", "website": "", "industry": "Hospitality", "brand_color": "#27AE60", "sort_order": 4, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/04/logo3.jpg", "filename": "zamrud_logo.jpg"},
            {"name": "Buhari Restaurant", "website": "", "industry": "Hospitality", "brand_color": "#C8922A", "sort_order": 5, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/04/logo5.jpg", "filename": "buhari_logo.jpg"},
            {"name": "Matsya Egmore", "website": "", "industry": "Hospitality", "brand_color": "#1A5276", "sort_order": 6, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/4.jpg", "filename": "matsya_logo.jpg"},
            {"name": "Doveton Cafe", "website": "", "industry": "Hospitality", "brand_color": "#6E2F1A", "sort_order": 7, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/1.jpg", "filename": "doveton_logo.jpg"},
            {"name": "Phoenix Marketcity Chennai", "website": "https://www.phoenixmarketcity.com/chennai", "industry": "Retail & Mall", "brand_color": "#8B0000", "sort_order": 8, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/2.jpg", "filename": "phoenix_chennai_logo.jpg"},
            {"name": "Phoenix Marketcity Bangalore", "website": "https://www.phoenixmarketcity.com/bangalore", "industry": "Retail & Mall", "brand_color": "#8B0000", "sort_order": 9, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/3.jpg", "filename": "phoenix_blr_logo.jpg"},
            {"name": "Phoenix Marketcity Pune", "website": "https://www.phoenixmarketcity.com/pune", "industry": "Retail & Mall", "brand_color": "#8B0000", "sort_order": 10, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/5.jpg", "filename": "phoenix_pune_logo.jpg"},
            {"name": "High Street Phoenix Mumbai", "website": "https://www.highstreetphoenix.com", "industry": "Retail & Mall", "brand_color": "#8B0000", "sort_order": 11, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/6.jpg", "filename": "phoenix_mumbai_logo.jpg"},
            {"name": "Hotel Savera", "website": "", "industry": "Hospitality", "brand_color": "#1B4F72", "sort_order": 12, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/7.jpg", "filename": "savera_logo.jpg"},
            {"name": "Sangeetha Mobiles", "website": "", "industry": "Retail", "brand_color": "#E74C3C", "sort_order": 13, "logo_url": "", "filename": ""},
            {"name": "GRT Jewellers", "website": "", "industry": "Retail", "brand_color": "#B8860B", "sort_order": 14, "logo_url": "", "filename": ""},
            {"name": "Suprabaa", "website": "", "industry": "Restaurant", "brand_color": "#2C5E3B", "sort_order": 15, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/8.jpg", "filename": "suprabaa_logo.jpg"},
            {"name": "Superstar Pizza", "website": "", "industry": "Restaurant", "brand_color": "#D35400", "sort_order": 16, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/9.jpg", "filename": "superstar_pizza_logo.jpg"},
            {"name": "Stuffles", "website": "", "industry": "Cafe", "brand_color": "#1A5276", "sort_order": 17, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/10.jpg", "filename": "stuffles_logo.jpg"},
            {"name": "South Kitchen by Annalaya", "website": "", "industry": "Restaurant", "brand_color": "#6E2F1A", "sort_order": 18, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/11.jpg", "filename": "south_kitchen_by_annalaya_logo.jpg"},
            {"name": "Soul Garden Bistro", "website": "", "industry": "Restaurant", "brand_color": "#8B0000", "sort_order": 19, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/12.jpg", "filename": "soul_garden_bistro_logo.jpg"},
            {"name": "Something Different", "website": "", "industry": "Restaurant", "brand_color": "#C8922A", "sort_order": 20, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/13.jpg", "filename": "something_different_logo.jpg"},
            {"name": "Smoke Factory", "website": "", "industry": "Restaurant", "brand_color": "#1B4F72", "sort_order": 21, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/14.jpg", "filename": "smoke_factory_logo.jpg"},
            {"name": "Thambi Vilas", "website": "", "industry": "Restaurant", "brand_color": "#E74C3C", "sort_order": 22, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/15.jpg", "filename": "thambi_vilas_logo.jpg"},
            {"name": "Something Different (Branch)", "website": "", "industry": "Restaurant", "brand_color": "#B8860B", "sort_order": 23, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/16.jpg", "filename": "something_different_branch_logo.jpg"},
            {"name": "SVP Sangeetha", "website": "", "industry": "Restaurant", "brand_color": "#333333", "sort_order": 24, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/17.jpg", "filename": "svp_sangeetha_logo.jpg"},
            {"name": "Hotel Rayyan", "website": "", "industry": "Restaurant", "brand_color": "#2C5E3B", "sort_order": 25, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/18.jpg", "filename": "hotel_rayyan_logo.jpg"},
            {"name": "Pongal Unavagam", "website": "", "industry": "Restaurant", "brand_color": "#D35400", "sort_order": 26, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/19.jpg", "filename": "pongal_unavagam_logo.jpg"},
            {"name": "Pollastro Pasta Grill", "website": "", "industry": "Restaurant", "brand_color": "#1A5276", "sort_order": 27, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/20.jpg", "filename": "pollastro_pasta_grill_logo.jpg"},
            {"name": "The Padrino", "website": "", "industry": "Restaurant", "brand_color": "#6E2F1A", "sort_order": 28, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/21.jpg", "filename": "the_padrino_logo.jpg"},
            {"name": "Spice Trail", "website": "", "industry": "Restaurant", "brand_color": "#8B0000", "sort_order": 29, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/22.jpg", "filename": "spice_trail_logo.jpg"},
            {"name": "NSA No Strings Attached", "website": "", "industry": "Cafe", "brand_color": "#C8922A", "sort_order": 30, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/23.jpg", "filename": "nsa_no_strings_attached_logo.jpg"},
            {"name": "Nickys Cafe and Fine Pastries", "website": "", "industry": "Cafe", "brand_color": "#1B4F72", "sort_order": 31, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/24.jpg", "filename": "nickys_cafe_and_fine_pastries_logo.jpg"},
            {"name": "Nava Ruchi", "website": "", "industry": "Restaurant", "brand_color": "#E74C3C", "sort_order": 32, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/25.jpg", "filename": "nava_ruchi_logo.jpg"},
            {"name": "The Miner Diner", "website": "", "industry": "Restaurant", "brand_color": "#B8860B", "sort_order": 33, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/26.jpg", "filename": "the_miner_diner_logo.jpg"},
            {"name": "Mathsya", "website": "", "industry": "Restaurant", "brand_color": "#333333", "sort_order": 34, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/27.jpg", "filename": "mathsya_logo.jpg"},
            {"name": "Hotel Sri Mahalakshmi", "website": "", "industry": "Restaurant", "brand_color": "#2C5E3B", "sort_order": 35, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/28.jpg", "filename": "hotel_sri_mahalakshmi_logo.jpg"},
            {"name": "The Madras Diner", "website": "", "industry": "Restaurant", "brand_color": "#D35400", "sort_order": 36, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/29.jpg", "filename": "the_madras_diner_logo.jpg"},
            {"name": "Burgerman", "website": "", "industry": "Restaurant", "brand_color": "#1A5276", "sort_order": 37, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/30.jpg", "filename": "burgerman_logo.jpg"},
            {"name": "Krishnavillasam", "website": "", "industry": "Restaurant", "brand_color": "#6E2F1A", "sort_order": 38, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/31.jpg", "filename": "krishnavillasam_logo.jpg"},
            {"name": "Hotel Sri Shanthi Bhavan", "website": "", "industry": "Restaurant", "brand_color": "#8B0000", "sort_order": 39, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/32.jpg", "filename": "hotel_sri_shanthi_bhavan_logo.jpg"},
            {"name": "Star Cafe", "website": "", "industry": "Cafe", "brand_color": "#C8922A", "sort_order": 40, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/33.jpg", "filename": "star_cafe_logo.jpg"},
            {"name": "Hotel Shrii Balaji Bhavan", "website": "", "industry": "Restaurant", "brand_color": "#1B4F72", "sort_order": 41, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/34.jpg", "filename": "hotel_shrii_balaji_bhavan_logo.jpg"},
            {"name": "Hamsa", "website": "", "industry": "Restaurant", "brand_color": "#E74C3C", "sort_order": 42, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/35.jpg", "filename": "hamsa_logo.jpg"},
            {"name": "Hajiali Juice Centre", "website": "", "industry": "Cafe", "brand_color": "#B8860B", "sort_order": 43, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/36.jpg", "filename": "hajiali_juice_centre_logo.jpg"},
            {"name": "Grace Residency", "website": "", "industry": "Hotel", "brand_color": "#333333", "sort_order": 44, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/37.jpg", "filename": "grace_residency_logo.jpg"},
            {"name": "Fu Silli Reasons", "website": "", "industry": "Restaurant", "brand_color": "#2C5E3B", "sort_order": 45, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/38.jpg", "filename": "fu_silli_reasons_logo.jpg"},
            {"name": "Firdouse", "website": "", "industry": "Restaurant", "brand_color": "#D35400", "sort_order": 46, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/39.jpg", "filename": "firdouse_logo.jpg"},
            {"name": "The Madras Diner (Branch)", "website": "", "industry": "Restaurant", "brand_color": "#1A5276", "sort_order": 47, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/40.jpg", "filename": "the_madras_diner_branch_logo.jpg"},
            {"name": "The Fat Boy", "website": "", "industry": "Restaurant", "brand_color": "#6E2F1A", "sort_order": 48, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/41.jpg", "filename": "the_fat_boy_logo.jpg"},
            {"name": "Evoke", "website": "", "industry": "Restaurant", "brand_color": "#8B0000", "sort_order": 49, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/42.jpg", "filename": "evoke_logo.jpg"},
            {"name": "Entremets", "website": "", "industry": "Cafe", "brand_color": "#C8922A", "sort_order": 50, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/43.jpg", "filename": "entremets_logo.jpg"},
            {"name": "Elate Palace", "website": "", "industry": "Hotel", "brand_color": "#1B4F72", "sort_order": 51, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/44.jpg", "filename": "elate_palace_logo.jpg"},
            {"name": "Doveton Cafe", "website": "", "industry": "Cafe", "brand_color": "#E74C3C", "sort_order": 52, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/45.jpg", "filename": "doveton_cafe_logo.jpg"},
            {"name": "Dot Berrys", "website": "", "industry": "Cafe", "brand_color": "#B8860B", "sort_order": 53, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/46.jpg", "filename": "dot_berrys_logo.jpg"},
            {"name": "Krishnas Dosa Kadai", "website": "", "industry": "Restaurant", "brand_color": "#333333", "sort_order": 54, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/47.jpg", "filename": "krishnas_dosa_kadai_logo.jpg"},
            {"name": "Dine Square", "website": "", "industry": "Restaurant", "brand_color": "#2C5E3B", "sort_order": 55, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/48.jpg", "filename": "dine_square_logo.jpg"},
            {"name": "Pollastro", "website": "", "industry": "Restaurant", "brand_color": "#D35400", "sort_order": 56, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/49.jpg", "filename": "pollastro_logo.jpg"},
            {"name": "Besant Cozee", "website": "", "industry": "Restaurant", "brand_color": "#1A5276", "sort_order": 57, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/50.jpg", "filename": "besant_cozee_logo.jpg"},
            {"name": "Chai Gup Shup", "website": "", "industry": "Cafe", "brand_color": "#6E2F1A", "sort_order": 58, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/51.jpg", "filename": "chai_gup_shup_logo.jpg"},
            {"name": "Chinese Story", "website": "", "industry": "Restaurant", "brand_color": "#8B0000", "sort_order": 59, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/52.jpg", "filename": "chinese_story_logo.jpg"},
            {"name": "CG", "website": "", "industry": "Restaurant", "brand_color": "#C8922A", "sort_order": 60, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/53.jpg", "filename": "cg_logo.jpg"},
            {"name": "Chai Gup Shup (Branch)", "website": "", "industry": "Cafe", "brand_color": "#1B4F72", "sort_order": 61, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/54.jpg", "filename": "chai_gup_shup_branch_logo.jpg"},
            {"name": "Ceyone", "website": "", "industry": "Restaurant", "brand_color": "#E74C3C", "sort_order": 62, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/55.jpg", "filename": "ceyone_logo.jpg"},
            {"name": "Capsi", "website": "", "industry": "Restaurant", "brand_color": "#B8860B", "sort_order": 63, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/56.jpg", "filename": "capsi_logo.jpg"},
            {"name": "Buhari 1951", "website": "", "industry": "Restaurant", "brand_color": "#333333", "sort_order": 64, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/57.jpg", "filename": "buhari_1951_logo.jpg"},
            {"name": "Nava Ruchi (Branch)", "website": "", "industry": "Restaurant", "brand_color": "#2C5E3B", "sort_order": 65, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/58.jpg", "filename": "nava_ruchi_branch_logo.jpg"},
            {"name": "Bistro", "website": "", "industry": "Restaurant", "brand_color": "#D35400", "sort_order": 66, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/59.jpg", "filename": "bistro_logo.jpg"},
            {"name": "Beans & Leaves", "website": "", "industry": "Cafe", "brand_color": "#1A5276", "sort_order": 67, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/60.jpg", "filename": "beans_and_leaves_logo.jpg"},
            {"name": "Boats", "website": "", "industry": "Restaurant", "brand_color": "#6E2F1A", "sort_order": 68, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/61.jpg", "filename": "boats_logo.jpg"},
            {"name": "Balaji Bhavan", "website": "", "industry": "Restaurant", "brand_color": "#8B0000", "sort_order": 69, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/62.jpg", "filename": "balaji_bhavan_logo.jpg"},
            {"name": "Arusuvai Amirtham", "website": "", "industry": "Restaurant", "brand_color": "#C8922A", "sort_order": 70, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/63.jpg", "filename": "arusuvai_amirtham_logo.jpg"},
            {"name": "Apollo Sindoori", "website": "", "industry": "Restaurant", "brand_color": "#1B4F72", "sort_order": 71, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/64.jpg", "filename": "apollo_sindoori_logo.jpg"},
            {"name": "Abids", "website": "", "industry": "Restaurant", "brand_color": "#E74C3C", "sort_order": 72, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/65.jpg", "filename": "abids_logo.jpg"},
            {"name": "Assife", "website": "", "industry": "Restaurant", "brand_color": "#B8860B", "sort_order": 73, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/66.jpg", "filename": "assife_logo.jpg"},
            {"name": "196 Below", "website": "", "industry": "Cafe", "brand_color": "#333333", "sort_order": 74, "logo_url": "https://sakthisolutions.in/sakthisolutions/uploads/2018/05/67.jpg", "filename": "196_below_logo.jpg"},
        ]
        for data in clients_data:
            logo_url = data.pop("logo_url", None)
            filename = data.pop("filename", None)
            client, created = Client.objects.update_or_create(name=data["name"], defaults={**data, "is_active": True})
            if filename:
                import os
                from django.conf import settings
                local_path = os.path.join(settings.MEDIA_ROOT, "clients", filename)
                if os.path.exists(local_path):
                    client.logo = f"clients/{filename}"
                    client.save()
                elif logo_url and (not client.logo or str(client.logo) == ""):
                    self._download_and_save_client_logo(client, logo_url, filename)

    def _seed_team(self):
        TeamMember.objects.all().delete()
        team_data = [
            {
                "name": "Jayakumar",
                "designation": "Director – Sales & Operations",
                "brief": "With over 25 years of experience spanning retail, packaging, industrial automation, and hospitality, Jayakumar co-founded Sakthi Solutions in 2014. He leads sales strategy, OEM partnerships, and on-ground operations across South India.",
                "photo_filename": "jayakumar.jpg",
                "sort_order": 1
            },
            {
                "name": "Vidya Rani",
                "designation": "Director – Customer Relations & Finance",
                "brief": "Vidya Rani brings deep expertise in sales and financial products. She oversees client onboarding, customer relationships, and financial operations at Sakthi Solutions, ensuring every client receives personalised, end-to-end support.",
                "photo_filename": "",
                "sort_order": 2
            }
        ]
        
        import os
        from django.conf import settings
        team_media_dir = os.path.join(settings.MEDIA_ROOT, "team")
        os.makedirs(team_media_dir, exist_ok=True)
        
        for data in team_data:
            filename = data.pop("photo_filename", None)
            member, created = TeamMember.objects.update_or_create(
                name=data["name"],
                defaults={**data, "is_active": True}
            )
            if filename:
                local_path = os.path.join(team_media_dir, filename)
                if os.path.exists(local_path):
                    member.photo = f"team/{filename}"
                    member.save()

    # ─── hero images ────────────────────────────────────────────

    def _seed_hero_images(self):
        import os
        import shutil
        from django.conf import settings

        company = CompanyInfo.objects.filter(pk=1).first()
        if not company:
            self.stdout.write(self.style.WARNING("No company found, skipping hero images"))
            return

        # Path to hero-bgs folder (now inside backend/ for Render build context)
        # __file__ = backend/apps/cms/management/commands/seed_sakthi.py
        cmd_dir = os.path.dirname(os.path.abspath(__file__))       # commands/
        mgmt_dir = os.path.dirname(cmd_dir)                        # management/
        app_dir = os.path.dirname(mgmt_dir)                        # cms/
        apps_parent = os.path.dirname(app_dir)                     # apps/
        backend_dir = os.path.dirname(apps_parent)                 # backend/
        hero_bgs_dir = os.path.join(backend_dir, "hero-bgs")
        hero_bgs_dir = os.path.normpath(hero_bgs_dir)

        hero_media_dir = os.path.join(settings.MEDIA_ROOT, "hero")
        os.makedirs(hero_media_dir, exist_ok=True)

        if not os.path.isdir(hero_bgs_dir):
            self.stdout.write(self.style.WARNING(f"hero-bgs directory not found at {hero_bgs_dir}"))
            return

        # Remove existing hero images to reseed cleanly
        HeroImage.objects.filter(company=company).delete()

        # Clear existing hero media files
        for f in os.listdir(hero_media_dir):
            fp = os.path.join(hero_media_dir, f)
            if os.path.isfile(fp):
                os.remove(fp)

        valid_exts = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}
        files = sorted([f for f in os.listdir(hero_bgs_dir) if os.path.splitext(f)[1].lower() in valid_exts])

        if not files:
            self.stdout.write(self.style.WARNING("No image files found in hero-bgs"))
            return

        for idx, filename in enumerate(files):
            src = os.path.join(hero_bgs_dir, filename)
            dst = os.path.join(hero_media_dir, filename)
            shutil.copy2(src, dst)

            HeroImage.objects.create(
                company=company,
                image=f"hero/{filename}",
                alt_text=f"Hero background {idx + 1}",
                sort_order=idx,
            )

        self.stdout.write(self.style.SUCCESS(f"Seeded {len(files)} hero images"))


