# Live Site Cross-Check Report — sakthisolutions.in vs Build

**Date:** July 27, 2026  
**Scope:** All live site pages (excluding IKonnect/Software Highlights) compared against the OWP build  
**Build route:** 19 static pages, compiled successfully, 0 errors

---

## PAGE-BY-PAGE COMPARISON

### 1. Homepage (/)

| Aspect | Live Site | Build | Status |
|--------|-----------|-------|--------|
| Header logo/brand | Logo image + "Sakthi Solutions" tagline | Monogram "**S**akthi **S**olutions" with red S | Different but intentional |
| Hero | Dark theme, text-heavy | Dark theme, CTA buttons "Explore Products" + "Book Free IT Consultation" | OK |
| Product cards section | 4 cards (iKonnect RMS, Godspeed, Tellus, Childwood) w/ images | 3 cards (Godspeed, Tellus, Childwood) | Expected (iKonnect excluded) |
| Technology Partners | None shown on homepage | Section with 7 partners (Godspeed, Samsung, LG, HP, DELL, Epson, Posiflex) | Build has more content |
| Industries | None shown on homepage | Section with 12 industries | Build has more content |
| Why Sakthi | Not on homepage | Section with 4 trust pillars | Build has more content |
| About section | Not on homepage | Section with company story + stats grid (10+ years, 3 product lines, etc.) | Build has more content |
| CTA | None at bottom | "Ready to Transform Your Business?" CTA section | Build has more content |
| **Top bar (phone+email)** | Present above header with phone icon and email | **MISSING** | **GAP** |
| **Social icons in header** | Facebook, LinkedIn, YouTube icons in top bar | **MISSING** - only in footer | **GAP** |
| **Floating right-edge contact bar** | Present (Phone, WhatsApp, LinkedIn, Location) | Present via FloatingContactBar component | OK |

### 2. About Us (/about)

| Aspect | Live Site | Build | Status |
|--------|-----------|-------|--------|
| Hero | Heading "About Us" + breadcrumb | Heading "Your Technology Partner Since 2014" + subtitle | Different heading |
| Company story | Mentions "young couple", 25+ yrs Jayakumar, financial products Vidya Rani. Mentions "ikonnect" by name. | Mentions "dynamic couple", Jayakumar 25+ yrs, Vidya Rani. No IKonnect mention. | Expected (IKonnect removed), text quality improved |
| Infrastructure section | Mentions network cabling, WiFi, UPS consulting | Same content, expanded | OK |
| Image | about_images.jpg | about_images.jpg (same URL) | OK |
| Why Sakthi section | 8 bullet points | 6 icon-based cards (End-to-End, Prompt Service, Reliable Partner, Customer-First, Quality Hardware, Free IT Consulting) | Build is more visual, fewer points |
| Timeline | Not present | 5-point timeline (2014-Present) | Build has more content |

### 3. Contact Us (/contact)

| Aspect | Live Site | Build | Status |
|--------|-----------|-------|--------|
| Registered Office | F7, 1st floor, 40/26, Arani muthu Street, Choolai | F7, 1st Floor, 40/26 Arani Muthu Street, Choolai | OK |
| Sales Office | 1/1, Ist Floor, General Collins Road, Choolai | 1/1, 1st Floor, General Collins Road, Choolai | OK |
| Phone | 04426420089, +91 9840057127, +91 9381459199 | Same 3 numbers | OK |
| Email | info@sakthisolutions.in, support@sakthisolutions.in | Same 2 emails | OK |
| **Enquiry form** | Simple form with Name, Email, Phone, Products (checkboxes: ikonnect, godspeed, tellus, childwood), Message | Form with validation via react-hook-form + zod, products: godspeed, tellus, childwood, hardware, it-networking | Build has more products, zod validation |
| **Google Map** | Working embed | Fixed with valid Choolai coordinates | OK (was fixed) |
| **Hero section** | Plain breadcrumb + heading | Full dark hero with subtitle "Ready to transform your business..." | Build is better |

### 4. Products Page (/products)

| Aspect | Live Site | Build | Status |
|--------|-----------|-------|--------|
| Structure | WordPress archive page (no content) | Catalog-style page with categories (Godspeed, Tellus, Childwood) | Build is intentional |
| **Breadcrumb route** | `/products/` | `/products/` | OK |
| Godspeed parent link | `/products/godspeed/` (has dedicated page) | Links to `/products` (no dedicated page) | **GAP** — godspeed landing page exists on live |

### 5. Indoor Digital Signage

| Aspect | Live Site | Build | Status |
|--------|-----------|-------|--------|
| Sub-product cards | Floor Standing Series, **LG Digital Signage**, Wall Mounting Series | Floor Standing, **Wall Mounting** (no LG) | **GAP** — LG Digital Signage page missing |
| **LG Digital Signage** | `/lg-digital-signage/` page exists | Not in build | **GAP** — missing page |

### 6. Floor Standing Series

| Aspect | Live Site | Build | Status |
|--------|-----------|-------|--------|
| Route | `/products/indoor-digital-signage/floor-standing-series/` | `/products/indoor-digital-signage/floor-standing` | Route differs but works |
| Hero image | Banner image (banner1-2.jpg) | No hero image, text-only | **GAP** — missing hero image |
| Features | 8 features with images (Perfect Image, Easy Operation, Smart Schedule, Safe, Fashion Design, Video Encryption, Screen Splitting, Display Mode) | Same 8 features with images | OK |
| **Spec table** | 14 columns: Model, Size, Resolution, Display Scale, Brightness, Contrast Ratio, Viewing Angle, Response Time, Life-time, Operating Temperature, Storage Temperature, Input Power, Consumption, Dimension | **10 columns**: Missing Display Scale, Operating Temperature, Storage Temperature, Input Power | **GAP** — 4 missing spec columns |
| **Lifetime value** | Live: "6000 Hours" (typo?), Build: "60000 hrs" | Different values | **GAP** — verify correct value |

### 7. Wall Mounting Series

| Aspect | Live Site | Build | Status |
|--------|-----------|-------|--------|
| Route | `/wall-mounting-series/` (NOT under /products/) | `/products/indoor-digital-signage/wall-mounting` | Route differs but build is more logical |
| Hero images | 3 images (wall-mount-1.jpg, wall-mount-2.jpg, wall-mount-3.jpg) | No images | **GAP** — missing decorative images |
| Features | 8 features with images (same as floor standing) | Same 8 features with images | OK |
| **Spec table** | Live has "Other Details" column with display scale, response time, viewing angle info merged. Also lists 22"/26"/32"/42"/46"/55"/65"/70" | Build has 22"/32"/42"/46"/55"/65"/70" (missing 26") | **GAP** — missing 26" model row, merged details column |

### 8. Smart Touch Table

| Aspect | Live Site | Build | Status |
|--------|-----------|-------|--------|
| Gallery | `[supsystic-gallery id=1]` (WordPress gallery shortcode) | No gallery | **GAP** — missing product gallery |
| Content | Full intro, how-it-works, why-use, key features, specs table, 21.5" variant | Same content duplicated | OK |
| **Spec table typo** | Live has "Desription" (typo) | Build has "Description" (correct) | OK (build is correct) |
| PC Options in spec | Live: "PC Options : Intel Core i3,i5,i7 /RAM 4GB,8GB,16GB/HDD 160,320,500GB/OS Win 7,Win 10" | Build: "PC: Intel Core i3/i5/i7, RAM 4-16GB, HDD 160-500GB, Win 7/10" | Minor formatting diff, OK |

### 9. Wayfinding Kiosk

| Aspect | Live Site | Build | Status |
|--------|-----------|-------|--------|
| Hero image | Wayfinding solution image shown | No hero image | **GAP** — missing image |
| Features | 4 features with 4 icon images each | 4 features without icons | **GAP** — missing feature icons |
| **Applications** | 4 main apps (Retail, Healthcare, Airport, Corporate) + Events, Museums, Hospitality at bottom with icons | 7 apps (Retail, Healthcare, Airport, Corporate, Events, Museums, Hospitality) | Build has 3 more apps (Events, Museums, Hospitality) |
| Case study | Solution overview text + 4 city deployments | Reusable CaseStudy component with same data | OK |
| **Application icons** | Each app has illustrative icon image | No icons | **GAP** — missing icons |

### 10. Touch Screen Kiosk

| Aspect | Live Site | Build | Status |
|--------|-----------|-------|--------|
| **Gallery section** | Floor Standing/Kiosk gallery `[supsystic-gallery id=2]` + Half Standing/Kiosk gallery `[supsystic-gallery id=3]` | No gallery images | **GAP** — missing both galleries |
| **Usability image** | Shows "intra-kisosk-usibility.png" diagram | Not present | **GAP** — missing usability diagram |
| Spec tables (LCD Panel) | 6 models (19", 22", 32", 42", 46", 55") with Resolution, Brightness, Color, Viewing angle, Contrast, Response, Lifetime | Same, but missing "Display Scale" row (16:9 for all) | **GAP** — missing Display Scale row |
| Touch Panel | Same specs | Same specs | OK |
| PC Config | Standard/Medium/High | Standard/Medium/High (i3/i5/i7 typo in live: "13"/"15"/"17") | Build has correct "i3"/"i5"/"i7" |
| Power consumption | Live: GS-TK32=180W, GS-TK42=260W, GS-TK55=300W, GS-TK55=650W | Same data | OK |
| Environment/Case | Same | Same | OK |
| **Notes section** | Live has: "Multi touch functions, Support magnify or minimum or rotate..." | **MISSING** | **GAP** — missing additional notes |

### 11. Video Wall

| Aspect | Live Site | Build | Status |
|--------|-----------|-------|--------|
| Hero image | None (text only) | Text only | OK |
| **Product images** | 3 images: Single Screen Display, Full Screen, Screen Switches | No images | **GAP** — missing 3 display-mode images |
| Spec table | Same 6 models | Same 6 models | OK |
| Common specs | Same | Same | OK |
| **Contrast/Gap typo** | Build has merged column in row data | Check: row 4 has "5000:1" for GS-VW4653H contrast but no gap value | **GAP** — verify spec data alignment |

### 12. Tellus

| Aspect | Live Site | Build | Status |
|--------|-----------|-------|--------|
| Route | `/tell-us-feedback-solution/` | `/products/tellus` | Route differs |
| Hero | Simple breadcrumb + heading | Dark hero with subtitle | Build is better |
| Why Feedback text | Same | Same | OK |
| Features | 11 features listed | Same 11 features | OK |
| Hardware options | 3 options with images | Same 3 options | OK |
| **10 Inch / 7 Inch labels** | "10 Inch Tablet" / "7 Inch Tablet" | "10\" Tablet" / "7\" Tablet" | Fixed (was gap, now resolved) |
| CTA | None | "Request a Demo" button | Build has more |

### 13. Childwood

| Aspect | Live Site | Build | Status |
|--------|-----------|-------|--------|
| Route | `/products/childwood-children-play-equipment/` | `/products/childwood` | Route differs |
| Structure | Index page with 2 cards → sub-pages | Single page with all 130 items inline | Different approach |
| **Missing sub-pages** | `/outdoor-play-equipment/` — separate full catalog page | Not in build (content merged into single page) | **GAP** — missing separate outdoor/indoor pages |
| **Missing sub-pages** | `/indoor-play-equipments/` — separate full catalog page | Not in build (content merged into single page) | **GAP** — missing separate indoor page |
| Playstations (outdoor) | 41 items (CWP001-CWP041) with images | 41 items in CHILDWOOD_CATALOG | OK |
| Spring Rockers (outdoor) | 15 items (CW0018-CW0038) | 15 items | OK |
| See Saw (outdoor) | 2 items (CW0040-CW0041) | 2 items | OK |
| Swings (outdoor) | 4 items (CW0042-CW0043C) | 4 items | OK |
| Playstations (indoor) | 4 items (CW0027-CW0030) | 4 items | OK |
| Rockons & Rideons (indoor) | 11 items (CW2001-CW2011) | 11 items | OK |
| Tunnels (indoor) | 2 items (CW2012-CW2013) | 2 items | OK |
| Slides & Combos (indoor) | 11 items (CW2017-CW2028) | 11 items | OK |
| Floorings (indoor) | 5 items (CW2042-CW2067) | 5 items | OK |

### 14. Services (/services)

| Aspect | Live Site | Build | Status |
|--------|-----------|-------|--------|
| Content | "Page Will Be Updated Soon" placeholder | Full content: Hardware section (9 items with images) + IT Consulting section (8 blocks + image + CTA) | Build is massively better |

### 15. Hardware for Restaurant and Bar

| Aspect | Live Site | Build | Status |
|--------|-----------|-------|--------|
| Route | `/services/hardware-for-restaurant-and-bar/` | `/services/hardware` (redirects to /services) | OK (redirect) |
| Content | 9 hardware items with images | Same 9 items, displayed on /services page | OK |
| **Thermal Rolls label** | "Thermal Rolls For Billing" (no 79mm) | "Thermal Rolls For Billing (79mm)" | Fixed (was gap) |

### 16. Consulting for IT Networking

| Aspect | Live Site | Build | Status |
|--------|-----------|-------|--------|
| Route | `/services/consulting-for-it-networking/` | `/services/it-networking` (redirects to /services) | OK (redirect) |
| Content | 8 bullet points + 1 image | Same 8 blocks + same image + "Why Get IT Consulting" section + CTA | Build has more content |
| Bullet format | Plain list | Card-based grid with icons | More visual |

---

## CROSS-CUTTING GAPS

### Navigation / Header

| # | Gap | Severity | Details |
|---|-----|----------|---------|
| 1 | Missing top bar (phone + email) | Medium | Live site has [📞 +91 9840057127] and [✉ info@sakthisolutions.in] above header |
| 2 | Missing social icons in header | Low | Facebook, LinkedIn, YouTube icons in live site top bar |
| 3 | **Godspeed parent link broken** | High | Live: `/products/godspeed/` has a dedicated page. Build: links to `/products`. We don't have a Godspeed category landing page. |

### Missing Pages

| # | Missing Route | Severity | Notes |
|---|--------------|----------|-------|
| 1 | `/lg-digital-signage/` | Medium | Referenced from Indoor Digital Signage page, has its own page on live |
| 2 | `/outdoor-play-equipment/` | Medium | Separate catalog page on live, merged into Childwood page in build |
| 3 | `/indoor-play-equipments/` | Medium | Separate catalog page on live, merged into Childwood page in build |

### Spec Data Discrepancies

| # | Page | Issue | Severity |
|---|------|-------|----------|
| 1 | Floor Standing | Missing 4 spec columns: Display Scale, Operating Temperature, Storage Temperature, Input Power | Medium |
| 2 | Floor Standing | Lifetime: live says "6000 Hours", build says "60000 hrs" | High — verify correct value |
| 3 | Wall Mounting | Missing 26" model (GS-AD26WM) | Low |
| 4 | Wall Mounting | Live has merged "Other Details" column with display scale, response time, viewing angle, input power — build shows these as separate columns | Low |
| 5 | Touch Screen Kiosk | Missing Display Scale row in LCD Panel spec table | Low |
| 6 | Touch Screen Kiosk | PC Config: build has "i3/i5/i7" (correct), live has "13/15/17" (typo) | Build is correct |

### Content Enhancements (Build has MORE than live)

| # | Area | What build has extra |
|---|------|---------------------|
| 1 | Homepage | Technology Partners section, Industries section, Why Sakthi section, About preview, CTA |
| 2 | About | Timeline (5 milestones), icon-based Why Sakthi cards |
| 3 | Contact | Zod-validated form, dark hero section |
| 4 | Services | Full content instead of placeholder, consulting cards with descriptions, image + CTA |
| 5 | Wayfinding | 3 additional application categories (Events, Museums, Hospitality) |
| 6 | Tellus | "Request a Demo" CTA button |
| 7 | All product pages | Consistent dark hero sections, breadcrumbs, CTA sections |
| 8 | SEO | Comprehensive meta keywords and descriptions |

### Visual / UX Gaps

| # | Gap | Severity |
|---|-----|----------|
| 1 | Missing product images on several pages | Medium |
| 2 | Missing decorative UI images (hero banners, feature icons) | Low |
| 3 | Spec columns not fully matching live site | Medium |
| 4 | Missing gallery images on Touch Screen Kiosk | Low |

---

## SUMMARY

| Category | Count | Details |
|----------|-------|---------|
| Missing pages | 3 | LG Digital Signage, Outdoor Play Equipment sub-page, Indoor Play Equipment sub-page |
| Missing spec columns | 7 | Floor Standing (4), Wall Mounting (1 merged), Touch Screen (1), Lifetime value (1) |
| Missing images | 6+ | Wayfinding hero, Wayfinding icons, Video Wall display modes, Touch Screen galleries, Wall Mounting decoratives, Floor Standing banner |
| Navigation gaps | 3 | Top bar (phone/email), header social icons, Godspeed landing page |
| Content where build is BETTER | 8 | Homepage, About, Contact form, Services, Wayfinding apps, Tellus CTA, SEO, Product dark heroes |
| Spec values that may be WRONG | 1 | Floor Standing lifetime: "6000 hours" vs "60000 hrs" — needs verification from product documentation |
