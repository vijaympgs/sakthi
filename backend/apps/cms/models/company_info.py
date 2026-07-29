from django.db import models


class CompanyInfo(models.Model):
    company_name = models.CharField(max_length=200)
    tagline = models.CharField(max_length=300, blank=True)
    logo = models.ImageField(upload_to="settings/", blank=True)
    favicon = models.ImageField(upload_to="settings/", blank=True)
    phone_primary = models.CharField(max_length=20, blank=True)
    phone_secondary = models.CharField(max_length=20, blank=True)
    email_primary = models.EmailField(blank=True)
    email_support = models.EmailField(blank=True)
    address_line1 = models.CharField(max_length=300, blank=True)
    address_line2 = models.CharField(max_length=300, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=100, blank=True)
    google_maps_embed = models.TextField(blank=True)
    facebook_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    founded_year = models.IntegerField(null=True, blank=True)
    about_content = models.TextField(blank=True)
    mission = models.TextField(blank=True)
    vision = models.TextField(blank=True)
    hero_title = models.CharField(max_length=300, default="Digital Signage, Kiosks & IT Solutions", blank=True)
    hero_description = models.TextField(default="We help retail & hospitality brands boost customer engagement and streamline operations with premium digital signage, interactive kiosks, and 24/7 on-ground IT support.", blank=True)
    trust_chips = models.JSONField(default=list, blank=True)
    advantages = models.JSONField(default=list, blank=True)
    hero_bg_image = models.URLField(max_length=500, default="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80", blank=True)
    hero_tagline = models.CharField(max_length=300, default="Since 2014 — Chennai • Hospitality & Retail IT Partner", blank=True)
    hero_eyebrow = models.CharField(max_length=200, default="Since 2014", blank=True)
    hero_tagline_subtitle = models.CharField(max_length=300, default="Chennai • Hospitality & Retail IT Partner", blank=True)
    stats = models.JSONField(default=list, blank=True, help_text="Trust strip stats: [{value, label}]")
    about_image = models.URLField(max_length=500, default="", blank=True)
    about_heading = models.CharField(max_length=300, default="Your Reliable Technology Partner Since 2014", blank=True)
    about_body = models.TextField(blank=True)
    cta_title = models.CharField(max_length=300, default="Ready to Transform Your Business?", blank=True)
    cta_subtitle = models.TextField(blank=True)
    timeline = models.JSONField(default=list, blank=True, help_text="About page timeline: [{year, title, description}]")
    why_items = models.JSONField(default=list, blank=True, help_text="About page Why Us items: [{icon, title, description}]")
    enquiry_types = models.JSONField(default=list, blank=True, help_text="Contact form enquiry types: [{name, sort_order}]")
    callback_slots = models.JSONField(default=list, blank=True, help_text="Contact form callback slots: [{label, value}]")
    business_hours = models.CharField(max_length=200, default="Mon – Sat: 9:00 AM – 6:30 PM", blank=True)
    why_us_bullets = models.JSONField(default=list, blank=True, help_text="Contact page 'Why Us' bullet points")
    phone_jayakumar = models.CharField(max_length=20, blank=True, help_text="Jayakumar's direct line")
    phone_vidya = models.CharField(max_length=20, blank=True, help_text="Vidya Rani's direct line")
    contact_section_title = models.CharField(max_length=300, blank=True, default="Contact Us")
    contact_section_heading = models.CharField(max_length=300, blank=True, default="Visit or Call Us")
    cta_subtitle_title = models.CharField(max_length=300, blank=True, default="Request a Consultation")
    testimonials_section_title = models.CharField(max_length=300, blank=True, default="Testimonials")
    clients_section_title = models.CharField(max_length=300, blank=True, default="Our Clients")
    products_section_title = models.CharField(max_length=300, blank=True, default="Our Products")

    class Meta:
        verbose_name = "Company Information"
        verbose_name_plural = "Company Information"

    def __str__(self):
        return self.company_name


class HeroImage(models.Model):
    company = models.ForeignKey(CompanyInfo, on_delete=models.CASCADE, related_name="hero_images")
    image = models.ImageField(upload_to="hero/")
    alt_text = models.CharField(max_length=300, blank=True)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort_order"]
        verbose_name = "Hero Image"
        verbose_name_plural = "Hero Images"

    def __str__(self):
        return f"Hero {self.sort_order}: {self.alt_text or self.image.name}"