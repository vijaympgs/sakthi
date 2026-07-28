# Sakthi Solutions — Task Registry

---

## Phase 0 — Content & Data Remediation (Complete Before Phase 1)

| ID | Task | Effort | Owner | Status |
|----|------|--------|-------|--------|
| C1 | Seed Client records with actual logo images uploaded to media/clients/ (Buhari, Matsya, Doveton, Phoenix, Hotel Savera, Sangeetha, GRT, and any others from prod) | 45 min | Content | ✅ |
| C2 | Seed Testimonials (minimum 5-8 entries with author name, title, company, content, rating) from prod site copy | 20 min | Content | ✅ |
| C3 | Seed Partner/OEM records (Godspeed, LG, Samsung, Epson, Posiflex, Partnertech) with logo images | 30 min | Content | ✅ |
| C4 | Seed Industry records (Restaurant, Hotel, Retail, Healthcare, Corporate, Mall, Airport, Education, Events, Hospitality) | 15 min | Content | ✅ |
| C5 | Upload product images to media/products/ and update Product.image fields for all seeded products | 30 min | Content | ✅ |
| C6 | Populate ProductFeature records for products (40 features across 7 products) | 30 min | Content | ✅ |
| C7 | Populate ProductSpecGroup for Smart Touch Table (GS-TT-32/42/46 + 21.5" variant) | 30 min | Content | ✅ |
| C8 | Populate ProductSpecGroup for Touch Screen Kiosk (GS-TK19/22/32/42/46/55 — LCD, Touch, PC, Power, Environment, Case) | 45 min | Content | ✅ |
| C9 | Populate ProductSpecGroup for Video Wall (6 models, 5 params) | 30 min | Content | ✅ |
| C10 | Populate ProductSpecGroup for Floor Standing Series (4 models, 14 params) | 30 min | Content | ✅ |
| C11 | Populate ProductSpecGroup for Wall Mounting Series (8 models, 7 params) | 30 min | Content | ✅ |
| C12 | Seed CompanyInfo with full hero_bg_image, advantages, trust_chips, and about_content | 15 min | Content | ✅ |
| C13 | Add stats, hero_tagline, about fields, CTA fields to CompanyInfo model + migration | 15 min | Dev | ✅ |
| C14 | Seed CompanyInfo with stats (4), timeline (5), why_items (6), enquiry_types (10), callback_slots (4) | 15 min | Dev | ✅ |
| C15 | Wire HomePage stats strip, pillar cards, about section, CTA from CompanyInfo API | 20 min | Dev | ✅ |
| C16 | Wire AboutPage WHY_ITEMS and TIMELINE from CompanyInfo API | 15 min | Dev | ✅ |
| C17 | Wire ServicesPage hardware items and consulting items from useServices() API | 15 min | Dev | ✅ |
| C18 | Wire ContactPage enquiry_types and callback_slots from CompanyInfo API | 10 min | Dev | ✅ |
| C19 | Wire FloorStandingClient and WallMountingClient features from useProduct API | 10 min | Dev | ✅ |
| C20 | Wire Tellus page features from useProduct API | 10 min | Dev | ✅ |
| C21 | Wire services/hardware and services/it-networking pages from useServices() API | 20 min | Dev | ✅ |
| C22 | Seed ServiceItem records for IT Networking consulting (8 items) | 10 min | Dev | ✅ |
| C23 | Seed full ServiceItem hardware records (9 items) | 5 min | Dev | ✅ |
| C24 | Add Brand model + brand FK to ProductCategory + migration | 15 min | Dev | ✅ |
| C25 | Seed Brands (Godspeed, Tellus, Childwood) + ProductCategories under each brand | 15 min | Dev | ✅ |
| C26 | Add Brand API endpoint + frontend useBrands hook | 10 min | Dev | ✅ |
| C27 | Re-group Django Admin models by NAV items / Page titles | 15 min | Dev | ✅ |

---

## Phase 1 — Pre-Deploy (Complete Before Go-Live)

| ID | Task | Effort | Owner | Status |
|----|------|--------|-------|--------|
| T1 | Set NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SITE_URL in Vercel project env vars | 2 min | Deploy | ⬜ |
| T2 | Set Django backend production env vars (DEBUG=False, USE_SQLITE=False, DATABASE_URL, SECRET_KEY) | 2 min | Deploy | ⬜ |
| T3 | Update canonical base URL, JSON-LD url, sitemap base, and robots.txt to use env var | 2 min | Deploy | ✅ |
| T4 | Add domain to Vercel and configure DNS (CNAME/A records) | 15 min | DevOps | ⬜ |
| T5 | Verify domain resolution (www vs non-www) | 5 min | QA | ⬜ |
| T6 | Deploy Django backend, run migrations, execute seed_sakthi, create superuser, verify admin login | 15 min | DevOps | ⬜ |
| T7 | Verify CORS and CSRF configuration for frontend and backend | 5 min | DevOps | ✅ |
| T8 | Fix sitemap broken URL → correct flat route | 2 min | Dev | ✅ |
| T9 | Remove broken sitemap entries /services/hardware and /services/it-networking | 2 min | Dev | ✅ |
| T10 | Add missing non-iKonnect pages to sitemap (feedback-solution, tell-us-feedback-solution, outdoor-play-equipment, indoor-play-equipments, team) | 5 min | Dev | ✅ |
| T11 | Add /blog and childwood sub-pages to sitemap | 2 min | Dev | ✅ |

---

## Phase 2 — Post-Deploy (Search Engine Setup)

| ID | Task | Effort | Owner | Status |
|----|------|--------|-------|--------|
| S1 | Submit sitemap.xml to Google Search Console and request indexing for key pages | 5 min | SEO | ⬜ |
| S2 | Verify Search Console ownership via DNS TXT record or meta tag | 10 min | SEO | ⬜ |
| S3 | Check Search Console coverage for indexed 404s from the old WordPress site | 10 min | SEO | ⬜ |
| S4 | Verify GA4 data collection using the Realtime report | 5 min | SEO | ⬜ |
| S5 | Set the preferred domain (www vs non-www) in Search Console | 2 min | SEO | ⬜ |
| S6 | Run post-deploy SEO validation (titles, meta descriptions, canonical tags, JSON-LD, Open Graph, Twitter Cards, robots.txt, sitemap, and 301 redirects) | 15 min | QA | ⬜ |

---

## Phase 3 — First Week Monitoring

| ID | Task | Effort | Owner | Status |
|----|------|--------|-------|--------|
| M1 | Monitor GA4 Realtime traffic during the first 24 hours | Ongoing | Marketing | ⬜ |
| M2 | Review Vercel deployment logs for 404 and 500 errors | 10 min | Dev | ⬜ |
| M3 | Verify contact form submissions are stored in Django Admin (ContactSubmission) | 5 min | QA | ⬜ |
| M4 | Run Lighthouse audit (Target: 90+ Performance, 90+ Accessibility, 100 SEO) | 10 min | QA | ⬜ |
| M5 | Perform cross-browser testing (Chrome, Firefox, Safari, Edge, Mobile) | 20 min | QA | ⬜ |
| M6 | Run npm run typecheck to confirm no TypeScript regressions | 2 min | Dev | ⬜ |
| M7 | Functional QA: navigation, dropdowns, mobile menu, breadcrumbs, forms, Google Maps, WhatsApp, footer links | 20 min | QA | ⬜ |
| M8 | Functional QA: redirects, galleries, and browser console errors | 10 min | QA | ⬜ |

---

## Phase 5 — Optional / Future

| ID | Task | Effort | Decision | Status |
|----|------|--------|---------|--------|
| O1 | Integrate Microsoft Clarity (or equivalent heatmap/behavior analytics) | 30 min | Optional | ✅ |
| O2 | Build dynamic /blog and /blog/[slug] pages | Medium | Pending | ✅ |
| O3 | Add Product JSON-LD schema to individual product pages | Medium | Pending | ✅ |
| O4 | Wire AboutPage hero & sections from Page API (usePage hook) | 15 min | Dev | ✅ |
| O5 | Add /blog to navigation seed and sitemap | 5 min | Dev | ✅ |
| O6 | Add Childwood sub-pages to sitemap | 2 min | Dev | ✅ |

---

## Remaining Work Summary

| Phase | Total | Completed | Pending |
|-------|-------|-----------|---------|
| Phase 0 — Content & Data Remediation | 27 | **27 ✅** | 0 |
| Phase 1 — Pre-Deploy | 11 | **6 ✅** | 5 ⬜ |
| Phase 2 — Post-Deploy | 6 | **0** | 6 ⬜ |
| Phase 3 — First Week Monitoring | 8 | **0** | 8 ⬜ |
| Phase 5 — Optional / Future | 6 | **6 ✅** | 0 |
| **Total** | **58** | **39** | **19** |

### Pending (need deployment access)
- **T1, T2, T4, T5, T6** — Vercel env vars, DNS, backend deploy
- **S1-S6** — Search Console & GA verification (requires live URL)
- **M1-M8** — Post-deploy monitoring & QA (requires live URL)
