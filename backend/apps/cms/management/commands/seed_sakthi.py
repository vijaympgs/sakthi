from django.core.management.base import BaseCommand
from apps.cms.models import *


class Command(BaseCommand):
    help = "Seed database with complete Sakthi Solutions content"

    def handle(self, *args, **options):
        self._seed_company_info()
        self._seed_product_categories()
        self._seed_products()
        self._seed_product_features()
        self._seed_specs()
        self._seed_services()
        self._seed_service_items()
        self._seed_industries()
        self._seed_enquiry_types()
        self._seed_testimonials()
        self._seed_partners()
        self._seed_navigation()
        self._seed_footer()
        self._seed_case_study()
        self._seed_childwood()
        self._seed_clients()
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

    # ─── company info ───────────────────────────────────────────

    def _seed_company_info(self):
        CompanyInfo.objects.update_or_create(pk=1, defaults={
            "company_name": "Sakthi Solutions",
            "tagline": "Digital Signage, Kiosks & IT Solutions",
            "logo": "settings/ss-logo.svg",
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
            "about_content": "Sakthi Solutions provides digital signage, interactive kiosks, feedback solutions and IT consulting for hospitality, retail and corporate sectors. The company was formed in the year 2014 by a dynamic couple — Jayakumar with 25+ years of experience in sales, hospitality, automation and Vidya Rani with expertise in financial products and customer relations.",
            "mission": "To provide complete hardware, digital signage and IT consulting end-to-end solutions for hospitality, retail and corporate sectors, enabling businesses to operate efficiently with the right technology.",
            "vision": "To be the most trusted technology partner for digital signage and IT solutions, known for prompt service, reliable partnerships and innovative solutions.",
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
        })

    # ─── product categories ─────────────────────────────────────

    def _seed_product_categories(self):
        categories_data = [
            {
                "name": "Digital Signages and Video Wall",
                "slug": "godspeed",
                "tagline": "World Class Digital Displays",
                "description": "World class digital signage with extra ordinary features heavy duty body and toughened glass surface can withstand impact, User changeable images.",
                "image_url": "https://www.sakthisolutions.in/sakthisolutions/uploads/2018/05/pro3.png",
                "filename": "godspeed_category.png",
                "sort_order": 1
            },
            {
                "name": "Customer feedback kiosk",
                "slug": "tellus",
                "tagline": "Guest Feedback Solutions",
                "description": "The purpose of business can be measured only with the Guest feedback i.e Restaurant should meet the purpose of customer walk in.",
                "image_url": "https://www.sakthisolutions.in/sakthisolutions/uploads/2018/11/pro-1-1.png",
                "filename": "tellus_category.png",
                "sort_order": 2
            },
            {
                "name": "Childwood children play equipment",
                "slug": "childwood",
                "tagline": "Indoor & Outdoor Play Solutions",
                "description": "Childwood children play equipment indoor / outdoor and gym equipments.",
                "image_url": "https://www.sakthisolutions.in/sakthisolutions/uploads/2018/11/03-300x2931.jpg",
                "filename": "childwood_category.jpg",
                "sort_order": 3
            },
        ]
        
        for data in categories_data:
            image_url = data.pop("image_url", None)
            filename = data.pop("filename", None)
            cat, created = ProductCategory.objects.update_or_create(
                slug=data["slug"],
                defaults={**data, "is_published": True}
            )
            # Fetch from live server if not set
            if not cat.image or str(cat.image) == "" or "tellus" in cat.slug:
                if image_url and filename:
                    self._download_and_save_category_image(cat, image_url, filename)

    # ─── products ───────────────────────────────────────────────

    def _seed_products(self):
        for data in [
            {"category": "godspeed", "name": "Indoor Digital Signage", "slug": "indoor-digital-signage", "tagline": "Revolutionary Digital Communication", "short_description": "Digital signage with floor standing, wall mountable and LG options.", "description": "World class digital signage with extraordinary features. Heavy duty body and toughened glass surface.", "is_featured": True, "sort_order": 1},
            {"category": "godspeed", "name": "Smart Touch Table", "slug": "smart-touch-table", "tagline": "Next Generation Human-Machine Interaction", "short_description": "Multi-touch interactive tables in 32\", 42\" and 46\" sizes.", "description": "Multi-touch tables enabling advanced interaction between human and machine.", "is_featured": False, "sort_order": 2},
            {"category": "godspeed", "name": "Interactive Wayfinding Kiosk", "slug": "wayfinding-kiosk", "tagline": "Navigate with Ease", "short_description": "Interactive wayfinding with directory, map and route guidance.", "description": "Interactive wayfinding with directory listing, shortest route guidance. Deployed at Phoenix Marketcity.", "is_featured": False, "sort_order": 3},
            {"category": "godspeed", "name": "Speed Touch Series Touch Screen Kiosk", "slug": "touch-screen-kiosk", "tagline": "Versatile Touch Solutions", "short_description": "Touch screen kiosks from 19\" to 55\" for various applications.", "description": "High quality IR, resistance and capacitive touch kiosk. Floor standing and half standing configurations.", "is_featured": False, "sort_order": 4},
            {"category": "godspeed", "name": "Video Wall", "slug": "video-wall", "tagline": "Perfect Visual Experience", "short_description": "Samsung/LG LCD video walls in 42\", 46\" and 55\" sizes.", "description": "Godspeed LCD video wall with original A+ LCD Panel from Samsung and LG.", "is_featured": False, "sort_order": 5},
            {"category": "tellus", "name": "Tellus Feedback Solution", "slug": "tellus", "tagline": "Measure Your Business by Guest Feedback", "short_description": "Customer feedback kiosks with instant alerts and reporting.", "description": "Electronic feedback collection with instant SMS alerts for poor ratings. Less than Rs 20 per day per branch.", "is_featured": True, "sort_order": 6},
            {"category": "childwood", "name": "Childwood Children's Play Equipment", "slug": "childwood", "tagline": "Indoor & Outdoor Play Solutions", "short_description": "Children's play equipment for indoor and outdoor spaces.", "description": "Childwood children play equipment indoor / outdoor and gym equipments.", "is_featured": False, "sort_order": 7},
        ]:
            d = {**data, "category": self._cat(data["category"]), "is_published": True}
            Product.objects.update_or_create(slug=d["slug"], defaults=d)

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
            "tellus": [
                ("Digital Collection", "All feedback collected electronically — no paper forms."),
                ("Custom Questions", "Customize your own questions for different outlets."),
                ("Excel Reports", "Download feedback in Excel and perform detailed analyses."),
                ("Affordable", "Less than Rs 20 per day per branch — cost of one water bottle."),
                ("Instant Alerts", "Instant SMS alert for negative feedback to owners."),
                ("Chain Management", "Portal access option for chain of outlets."),
                ("Service Improvement", "Improve customer service approach with data-driven insights."),
                ("Staff Performance", "Measure which staff performs better in which branch."),
                ("Quality Control", "Product quality and consistency can be maintained across outlets."),
                ("Repeat Customers", "Increase repeat customers and increase profit."),
                ("Customer Data", "Capture customer data for personalised marketing and loyalty programs."),
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
            Service.objects.update_or_create(slug=data["slug"], defaults={**data, "is_published": True})

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
            Industry.objects.update_or_create(slug=data["slug"], defaults={**data, "is_published": True})

    # ─── enquiry types ──────────────────────────────────────────

    def _seed_enquiry_types(self):
        for data in [
            {"name": "Godspeed Digital Signage", "sort_order": 1},
            {"name": "Smart Touch Table", "sort_order": 2},
            {"name": "Wayfinding Kiosk", "sort_order": 3},
            {"name": "Touch Screen Kiosk", "sort_order": 4},
            {"name": "Video Wall", "sort_order": 5},
            {"name": "Tellus Feedback", "sort_order": 6},
            {"name": "Childwood", "sort_order": 7},
            {"name": "Hardware Supply", "sort_order": 8},
            {"name": "IT Networking Consulting", "sort_order": 9},
            {"name": "General Enquiry", "sort_order": 10},
        ]:
            EnquiryType.objects.update_or_create(name=data["name"], defaults={**data, "is_active": True})

    # ─── testimonials ───────────────────────────────────────────

    def _seed_testimonials(self):
        for data in [
            {"author_name": "Mr. Navaz Buhari", "author_title": "Proprietor", "author_company": "Buhari", "content": "Sakthi Solutions helped us automate KOT with 16 Tablets across our outlets. Home Delivery, Takeaway and Phone orders with Customer tracking and SMS triggering helped us increase customer satisfaction significantly.", "rating": 5, "sort_order": 1},
            {"author_name": "Mr. Prasana Butt", "author_title": "Owner", "author_company": "Matsya, Egmore", "content": "Sakthi Solutions guided us through a complete technology upgrade from legacy PC-based systems to modern tablet-based KOT and touch POS machines at both our restaurants. The transition was smooth.", "rating": 5, "sort_order": 2},
            {"author_name": "Mr. Ramesh", "author_title": "Manager", "author_company": "Doveton Cafe, Purasaiwakkam", "content": "We moved from a 10-year-old ECR system to modern technology. The tablet-based KOT, automatic email reporting and user-friendly interface made a real difference to our daily operations.", "rating": 5, "sort_order": 3},
        ]:
            Testimonial.objects.update_or_create(author_name=data["author_name"], defaults={**data, "is_published": True})

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
            Partner.objects.update_or_create(name=data["name"], defaults={**data, "is_published": True})

    # ─── navigation ─────────────────────────────────────────────

    def _seed_navigation(self):
        menu, _ = NavigationMenu.objects.update_or_create(slug="main", defaults={"name": "Main Navigation", "is_active": True})
        # Top level items
        home = NavigationItem.objects.update_or_create(menu=menu, label="Home", defaults={"url": "/", "sort_order": 1, "is_visible": True})[0]
        about = NavigationItem.objects.update_or_create(menu=menu, label="About Us", defaults={"url": "/about", "sort_order": 2, "is_visible": True})[0]
        products_parent = NavigationItem.objects.update_or_create(menu=menu, label="Products", defaults={"url": "/products", "sort_order": 3, "is_visible": True})[0]
        services_parent = NavigationItem.objects.update_or_create(menu=menu, label="Services", defaults={"url": "/services", "sort_order": 4, "is_visible": True})[0]
        contact = NavigationItem.objects.update_or_create(menu=menu, label="Contact Us", defaults={"url": "/contact", "sort_order": 5, "is_visible": True})[0]

        # Products → Godspeed → sub-products
        godspeed = NavigationItem.objects.update_or_create(menu=menu, label="Godspeed", parent=products_parent, defaults={"url": "/products/godspeed", "sort_order": 1, "is_visible": True})[0]
        for i, (label, url) in enumerate([
            ("Indoor Digital Signage", "/products/indoor-digital-signage"),
            ("Smart Touch Table", "/products/smart-touch-table"),
            ("Wayfinding Kiosk", "/products/wayfinding-kiosk"),
            ("Touch Screen Kiosk", "/products/touch-screen-kiosk"),
            ("Video Wall", "/products/video-wall"),
        ]):
            NavigationItem.objects.update_or_create(menu=menu, label=label, parent=godspeed, defaults={"url": url, "sort_order": i, "is_visible": True})

        NavigationItem.objects.update_or_create(menu=menu, label="Tellus Feedback", parent=products_parent, defaults={"url": "/products/tellus", "sort_order": 2, "is_visible": True})
        NavigationItem.objects.update_or_create(menu=menu, label="Childwood", parent=products_parent, defaults={"url": "/products/childwood", "sort_order": 3, "is_visible": True})

        # Services → sub-items
        for i, (label, url) in enumerate([
            ("Hardware for Restaurant & Bar", "/services/hardware"),
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
                ("/products/indoor-digital-signage/floor-standing", "Floor Standing Series"),
                ("/products/indoor-digital-signage/wall-mounting", "Wall Mounting Series"),
                ("/products/smart-touch-table", "Smart Touch Table"),
                ("/products/wayfinding-kiosk", "Wayfinding Kiosk"),
                ("/products/touch-screen-kiosk", "Touch Screen Kiosk"),
                ("/products/video-wall", "Video Wall"),
            ]),
            (col2, [
                ("/products/tellus", "Tellus Feedback Solution"),
                ("/products/childwood", "Childwood Play Equipment"),
                ("/services", "Hardware Supply for Restaurant & Bar"),
                ("/services", "IT Networking Consulting"),
                ("/about", "About Sakthi Solutions"),
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
                "is_published": True,
            },
        )

    # ─── childwood catalog ──────────────────────────────────────

    def _seed_childwood(self):
        OUTDOOR = {
            "Playstations": [
                ("CWP001", "Multi-Level Playstation"), ("CWP002", "Kids Playstation"), ("CWP003", "Triple Playstation"),
                ("CWP004", "Playstation with Roof"), ("CWP005", "Playstation with 2 Slides"), ("CWP006", "Kiddies Playstation"),
                ("CWP007", "Playstation with Roof & Bridge"), ("CWP008", "Playstation Set"), ("CWP009", "Junior Playstation"),
                ("CWP010", "Triple Playstation Set"), ("CWP011", "Double Playstation"), ("CWP012", "Combo Playstation"),
                ("CWP013", "Playstation XL"), ("CWP014", "Premium Playstation"), ("CWP015", "Multi-Activity Playstation"),
                ("CWP016", "Playstation with Tunnel"), ("CWP017", "Large Playstation"), ("CWP018", "Playstation Tower"),
                ("CWP019", "Playstation Deluxe"), ("CWP020", "Adventure Playstation"), ("CWP021", "Playstation with Swings"),
                ("CWP022", "Fun Castle"), ("CWP023", "Playstation Fort"), ("CWP024", "Playstation Kingdom"),
                ("CWP025", "Playstation Paradise"), ("CWP026", "Playstation Wonder"), ("CWP027", "Playstation Magic"),
                ("CWP028", "Jungle Playstation"), ("CWP029", "Playstation Express"), ("CWP030", "Playstation Explorer"),
                ("CWP031", "Playstation Voyager"), ("CWP032", "Playstation Champion"), ("CWP033", "Playstation Hero"),
                ("CWP034", "Playstation Star"), ("CWP035", "Playstation Combo"), ("CWP036", "Playstation Supreme"),
                ("CWP037", "Toddler Playstation"), ("CWP038", "Mini Playstation"), ("CWP039", "Playstation with Bridge"),
                ("CWP040", "Playstation Double Slide"), ("CWP041", "Playstation Triple Slide"),
            ],
            "Spring Rockers": [
                ("CW0018", "Single Spring Rocker - Horse"), ("CW0019", "Single Spring Rocker - Car"),
                ("CW0020", "Single Spring Rocker - Bike"), ("CW0021", "Single Spring Rocker - Train"),
                ("CW0022", "Single Spring Rocker - Plane"), ("CW0023", "Single Spring Rocker - Elephant"),
                ("CW0024", "Single Spring Rocker - Duck"), ("CW0025", "Single Spring Rocker - Giraffe"),
                ("CW0026", "Single Spring Rocker - Lion"), ("CW0027", "Single Spring Rocker - Tiger"),
                ("CW0028", "Double Spring Rocker"), ("CW0029", "Spring Rocker - Helicopter"),
                ("CW0030", "Spring Rocker - Motorcycle"), ("CW0031", "Spring Rocker - Unicorn"),
                ("CW0032", "Spring Rocker - Dinosaur"), ("CW0033", "Spring Rocker - Boat"),
                ("CW0034", "Spring Rocker - Butterfly"), ("CW0035", "Spring Rocker - Frog"),
                ("CW0036", "Spring Rocker - Panda"), ("CW0037", "Spring Rocker - Rabbit"),
                ("CW0038", "Spring Rocker - Penguin"),
            ],
            "See Saw": [("CW0040", "See Saw - 2 Seater"), ("CW0041", "See Saw - 4 Seater")],
            "Swings": [
                ("CW0042", "Swing Set - 2 Seat"), ("CW0043", "Swing Set - 4 Seat"),
                ("CW0043B", "Swing Set with Belt Seats"), ("CW0043C", "Swing Set with Toddler Seats"),
            ],
        }
        INDOOR = {
            "Indoor Playstations": [
                ("CWI001", "Indoor Playstation - Small"), ("CWI002", "Indoor Playstation - Medium"),
                ("CWI003", "Indoor Playstation - Large"), ("CWI004", "Indoor Playstation - Deluxe"),
            ],
            "Rockons & Rideons": [
                ("CW2001", "Rockon - Horse"), ("CW2002", "Rockon - Car"), ("CW2003", "Rockon - Bike"),
                ("CW2004", "Rockon - Train"), ("CW2005", "Rockon - Elephant"), ("CW2006", "Rockon - Duck"),
                ("CW2007", "Rideon - Car"), ("CW2008", "Rideon - Bike"), ("CW2009", "Rideon - Train"),
                ("CW2010", "Rideon - Animal"), ("CW2011", "Rideon - Vehicle"),
            ],
            "Tunnels": [("CW2012", "Crawl Tunnel - Straight"), ("CW2013", "Crawl Tunnel - Curved")],
            "Slides & Combos": [
                ("CW2017", "Indoor Slide - Small"), ("CW2018", "Indoor Slide - Medium"),
                ("CW2019", "Indoor Slide - Large"), ("CW2020", "Indoor Slide - Wave"),
                ("CW2021", "Slide Combo - Single"), ("CW2022", "Slide Combo - Double"),
                ("CW2023", "Slide Combo - Triple"), ("CW2024", "Slide with Ball Pool"),
                ("CW2025", "Play Structure with Slide"), ("CW2026", "Play Structure Combo"),
                ("CW2027", "Indoor Play Structure"), ("CW2028", "Soft Play Structure"),
            ],
            "Floorings": [
                ("CW2042", "EVA Mat - 30x30cm"), ("CW2043", "EVA Mat - 60x60cm"),
                ("CW2044", "EVA Mat - Alphabet"), ("CW2045", "EVA Mat - Number"),
                ("CW2067", "EVA Mat - Puzzle"),
            ],
        }

        import urllib.request
        import ssl
        from django.core.files.base import ContentFile
        
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        upload_base = "https://sakthisolutions.in/sakthisolutions/uploads/2018/11/"

        SKU_NAMES = {
            "CWP001": "Multi-Level Playstation",
            "CWP002": "Compact Play Structure",
            "CWP003": "Adventure Tower",
            "CWP004": "Slide Combo Unit",
            "CWP005": "Junior Play Zone",
            "CWP006": "Narrow Corridor Play",
            "CWP007": "Extended Play Arena",
            "CWP008": "Deluxe Playstation",
            "CWP009": "Family Fun Center",
            "CWP010": "Grand Play Structure",
            "CWP011": "Mega Play Tunnel",
            "CWP012": "Triple Deck Play",
            "CWP013": "Multi-Level Playstation",
            "CWP014": "Custom Play Setup",
            "CWP015": "Premium Play Fortress",
            "CWP016": "Dual Zone Play",
            "CWP017": "Jumbo Adventure Park",
            "CWP018": "Triple Slide Tower",
            "CWP019": "Climbing Frame Combo",
            "CWP020": "Multi-Activity Station",
            "CWP021": "Double Deck Play Zone",
            "CWP022": "Compact Adventure Frame",
            "CWP023": "Wide Play Arena",
            "CWP024": "Low Profile Play Unit",
            "CWP025": "Extended Slide Complex",
            "CWP026": "Dual Level Play Structure",
            "CWP027": "Triple Level Play Frame",
            "CWP028": "Climbing Adventure Combo",
            "CWP029": "Large Multi-Play Unit",
            "CWP030": "Junior Adventure Tower",
            "CWP031": "Deluxe Play Fortress",
            "CWP032": "Compact Slide Tower",
            "CWP033": "Family Play Center",
            "CWP034": "Square Play Station",
            "CWP035": "Tall Multi-Deck Play",
            "CWP036": "Standard Play Structure",
            "CWP037": "Mega Adventure Complex",
            "CWP038": "Premium Multi-Level Play",
            "CWP039": "Grand Slide Fortress",
            "CWP040": "Wide Play Arena",
            "CWP041": "Jumbo Play Castle",
            "CW0027": "Large Indoor Playstation",
            "CW0028": "Extended Indoor Play Frame",
            "CW0029": "Compact Indoor Play Unit",
            "CW0030": "Multi-Activity Indoor Play",
        }

        DIMENSIONS = {
            "CW0040": "80x2x32\"",
            "CW0041": "136x20x32\"",
            "CW0042": "260x120x88\"",
        }

        for cat_type, cat_name in [("outdoor", "Outdoor"), ("indoor", "Indoor")]:
            cat, _ = ChildwoodCategory.objects.update_or_create(name=cat_name, defaults={"type": cat_type, "sort_order": 1 if cat_type == "outdoor" else 2})
            groups = OUTDOOR if cat_type == "outdoor" else INDOOR
            for gorder, (group_name, items) in enumerate(groups.items()):
                group, _ = ChildwoodGroup.objects.update_or_create(category=cat, name=group_name, defaults={"sort_order": gorder})
                for iorder, (sku, name) in enumerate(items):
                    resolved_name = SKU_NAMES.get(sku, name)
                    dims = DIMENSIONS.get(sku, "")
                    eq, created = PlayEquipment.objects.update_or_create(
                        group=group, sku=sku,
                        defaults={"name": resolved_name, "dimensions": dims, "sort_order": iorder}
                    )
                    
                    # Download image if not yet populated in the model
                    if not eq.image or str(eq.image) == "":
                        image_url = None
                        filename = f"{sku}.jpg"
                        
                        if sku.startswith("CWP"):
                            try:
                                num = int(sku.replace("CWP", ""))
                                image_url = f"{upload_base}{num}.jpg"
                            except: pass
                        elif sku.startswith("CW"):
                            try:
                                num = int(sku.replace("CW", ""))
                                if num >= 18 and num <= 38:
                                    image_url = f"{upload_base}{num - 17}-1.jpg"
                                elif num == 40:
                                    image_url = f"{upload_base}02-1.jpg"
                                elif num == 41:
                                    image_url = f"{upload_base}03-1.jpg"
                                elif num == 42:
                                    image_url = f"{upload_base}01-3.jpg"
                                elif num == 43:
                                    image_url = f"{upload_base}02-3.jpg"
                                elif num >= 2001 and num <= 2011:
                                    image_url = f"{upload_base}{num - 2000}-2.jpg"
                                elif num >= 2012 and num <= 2016:
                                    image_url = f"{upload_base}{num - 2000}-2.jpg"
                                elif num >= 2017 and num <= 2041:
                                    image_url = f"{upload_base}{num - 2000}-2.jpg"
                                elif num >= 2042:
                                    image_url = f"{upload_base}{num - 2000}-2.jpg"
                            except: pass
                        elif sku.startswith("CWI"):
                            try:
                                num = int(sku.replace("CWI", ""))
                                image_url = f"{upload_base}i{num}.jpg"
                            except: pass
                            
                        if image_url:
                            try:
                                req = urllib.request.Request(
                                    image_url,
                                    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
                                )
                                with urllib.request.urlopen(req, context=ctx, timeout=6) as response:
                                    content = response.read()
                                    eq.image.save(filename, ContentFile(content), save=True)
                            except Exception as e:
                                pass

    def _seed_clients(self):
        clients_data = [
            {"name": "Buhari Restaurant", "website": "", "industry": "Hospitality", "brand_color": "#C8922A", "sort_order": 1},
            {"name": "Matsya Egmore", "website": "", "industry": "Hospitality", "brand_color": "#1A5276", "sort_order": 2},
            {"name": "Doveton Cafe", "website": "", "industry": "Hospitality", "brand_color": "#6E2F1A", "sort_order": 3},
            {"name": "Phoenix Marketcity Chennai", "website": "https://www.phoenixmarketcity.com/chennai", "industry": "Retail & Mall", "brand_color": "#8B0000", "sort_order": 4},
            {"name": "Phoenix Marketcity Bangalore", "website": "https://www.phoenixmarketcity.com/bangalore", "industry": "Retail & Mall", "brand_color": "#8B0000", "sort_order": 5},
            {"name": "Phoenix Marketcity Pune", "website": "https://www.phoenixmarketcity.com/pune", "industry": "Retail & Mall", "brand_color": "#8B0000", "sort_order": 6},
            {"name": "High Street Phoenix Mumbai", "website": "https://www.highstreetphoenix.com", "industry": "Retail & Mall", "brand_color": "#8B0000", "sort_order": 7},
            {"name": "Hotel Savera", "website": "", "industry": "Hospitality", "brand_color": "#1B4F72", "sort_order": 8},
            {"name": "Sangeetha Mobiles", "website": "", "industry": "Retail", "brand_color": "#E74C3C", "sort_order": 9},
            {"name": "GRT Jewellers", "website": "", "industry": "Retail", "brand_color": "#B8860B", "sort_order": 10},
        ]
        for data in clients_data:
            Client.objects.update_or_create(name=data["name"], defaults={**data, "is_published": True})

