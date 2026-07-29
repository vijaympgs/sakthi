Hello,

 I am recreating/developing a website for a client called Sakthi Solutions.

 1. I am done with a basic build with Django as CMS admin.
 2. Migrated from the existing website (Prod), sakthisolutions.in
 3. When i run the build and verifying, there is quite an amount of
    - Broken links
    - Content Parity
    - Product images not available
    - Clientele scroller - not showing the client logos
    - Actual rich content of the current prod website are not properly extracted/seeded into the current 02-SHAKTHI project
    - Note : All the widgets/pages/blogs/assets/company/about etc.. all driven from the Django models, due to the missing of the required models or the missing of the seed data in the derived models are resulting in poor rendering of the pages/sections
 4. There few businesses dropped by Sakthi Solutions, which we excluded during migration
    -iKonnect - related pages and the deeplinks,nav item associated with that, this is only dropped item.

 5. The look and feel of the prod cannot be referred, instead the contents of each line of site to be migrated, excluding the iKonnect only.

 6. I need your help to compare our current build vs sakthisolutions.in and give a completed live-site-gaps.md to fix in our build.
    - End to End Trace
    - All routes in the Sitemap
    - Broken links
    - Client Testimonials, Client logo scroll like that, the important pieces
    - SEO Tags, sitemap, robots
 Cuurent build : here the code base or  http://localhost:3000/


 

This new phase sits **before Phase 1** because without it, the site has blank sections and missing content. It covers:

| ID | Task | Why Critical |
|----|------|-------------|
| **C1-C4** | Seed Clients, Testimonials, Partners/OEMs, Industries | Fixes the **blank testimonial carousel** and **empty client/partner/industry sections** |
| **C5** | Upload product images | Fixes product pages with **no hero images** |
| **C6-C11** | Populate ProductFeatures + ProductSpecs for 6 product lines | Fixes **empty feature lists** and **missing spec tables** (Smart Touch Table, Touch Screen Kiosk, etc.) |
| **C12** | Complete CompanyInfo seed | Ensures hero bg, advantages, trust chips are editable via admin |
| **C13-C14** | About page content + footer credit | Content parity with prod |
| **C15** | Verify redirects | QA gate |

**Phase 1 also grew** from 7→10 tasks with T8-T10 fixing the sitemap broken links and adding missing page entries.

**Total tasks in registry:** 15 (Phase 0) + 10 (Phase 1) + 6 (Phase 2) + 8 (Phase 3) + 3 (Phase 5) = **42 total**


Verify the build and check the seeded data are rendered in the respective pages/sections properly.

Ensure there are no hardcoded assets, as each and every text,images , logos are in the Django models, if not seed and wire.

 Do a systematic audit of all hardcoded content vs CMS-driven content.

Group the display of Django models by their respective templates and views, or by their respective NAV items or Page titles.

I want the **Django Admin** organized — models grouped logically by page/section rather than a flat list. 

Milestone 2 — Search Engine Readiness



Execute immediately after production deployment.



Submit sitemap

Verify Search Console

Verify GA4

Check indexing

Preferred domain

SEO audit

Apply the specs as per [@design-system.md](file:///D:/viji/viji-olivine/05pipleline/02-SHAKTHI/design-system.md) for all the remaining sections other than the Products & Solutions sections.

Top problem areas

1. **`layout.tsx`** (26 items) — Entire JSON-LD schema is hardcoded: business address, phones, emails, founder names, opening hours, product catalog. All should come from `CompanyInfo`/`ProductCategory`.

2. **`ContactPage.tsx`** (42 items) — Every form label, placeholder, button text, section heading, office label is hardcoded string.

3. **`HomePage.tsx`** (59 items) — All section kickers ("Product Range", "Why Choose Us", etc.) and CTA button texts are hardcoded. Stats duplicated in 3 places with different values.

4. **`siteConfig.ts`** (11 items) — Entire file is a static JS object duplicating `CompanyInfo` data. Used as secondary fallback only.

5. **`AboutPage.tsx`** (31 items) — Stats strip (`ABOUT_STATS`), section labels, CTA texts all hardcoded.


# SCCB Verification Checklist

Before marking this SCCB as complete, verify every item below.

## Backend Driven Architecture

- [ ] No business content is hardcoded in the frontend.
- [ ] Navigation is rendered entirely from Django.
- [ ] Hero content is rendered entirely from Django.
- [ ] Footer content is rendered entirely from Django.
- [ ] CTA content is rendered entirely from Django.
- [ ] SEO metadata is rendered entirely from Django.
- [ ] Breadcrumbs are generated from backend data.
- [ ] Products are rendered from backend models.
- [ ] Services are rendered from backend models.
- [ ] Industries are rendered from backend models.
- [ ] Brands are rendered from backend models.
- [ ] Partners are rendered from backend models.
- [ ] Testimonials are rendered from backend models.
- [ ] Statistics are rendered from backend models.

---

## Generic Frontend

- [ ] No product-specific React components exist.
- [ ] No brand-specific React components exist.
- [ ] No service-specific React components exist.
- [ ] No person-specific React components exist.
- [ ] No page-specific React components exist.

---

## Naming

Verify only generic component names are used.

Examples

- [ ] ProductPage
- [ ] ServicePage
- [ ] BrandPage
- [ ] IndustryPage
- [ ] DynamicPage
- [ ] ContentPage
- [ ] ProductCard
- [ ] ServiceCard
- [ ] HeroSection
- [ ] SectionRenderer
- [ ] ContentRenderer

Verify none of the following exist.

- [ ] GodspeedPage
- [ ] TellusPage
- [ ] ChildwoodPage
- [ ] JayakumarPage
- [ ] DigitalSignagePage
- [ ] HotelSolutionsPage

---

## Routing

- [ ] Pages use slug-based routing.
- [ ] Products use slug-based routing.
- [ ] Services use slug-based routing.
- [ ] Industries use slug-based routing.
- [ ] Brands use slug-based routing.
- [ ] Solutions use slug-based routing.

---

## Rendering

- [ ] Pages render dynamically from backend configuration.
- [ ] Sections render dynamically.
- [ ] Cards render dynamically.
- [ ] Images render dynamically.
- [ ] CTA buttons render dynamically.
- [ ] Navigation hierarchy renders dynamically.

---

## Deployment Validation

Simulate a fresh deployment.

- [ ] Run migrations.
- [ ] Execute seed/import scripts.
- [ ] Launch application.
- [ ] Verify navigation is populated automatically.
- [ ] Verify all pages are available.
- [ ] Verify products render correctly.
- [ ] Verify services render correctly.
- [ ] Verify industries render correctly.
- [ ] Verify brands render correctly.
- [ ] Verify SEO metadata is present.
- [ ] Verify media assets resolve correctly.
- [ ] Verify no frontend code changes were required.

---

## Architecture Validation

Answer YES to every question.

- [ ] Can a new Product be added without frontend changes?
- [ ] Can a new Service be added without frontend changes?
- [ ] Can a new Brand be added without frontend changes?
- [ ] Can a new Industry be added without frontend changes?
- [ ] Can a new Page be added without frontend changes?
- [ ] Can the navigation change without frontend changes?
- [ ] Can Hero content change without frontend changes?
- [ ] Can SEO change without frontend changes?
- [ ] Can the entire website be recreated by seeding only the database?

---

## Final Acceptance Criteria

The implementation is considered complete only if the following statement is TRUE:

"The frontend is a generic rendering engine. All business content, navigation, pages, sections, SEO, and media are owned by Django. A fresh deployment followed by database seeding recreates the website without any frontend code modifications."


The user wants a translucent navigation bar background - light black (dark) transparent that shows the hero background through it. Standard premium website pattern.


Refine the product category line into a premium micro-interaction. Increase the font size to 22–26px, use a refined semi-bold serif (Playfair Display/Cormorant) or elegant sans (Manrope), and apply the brand gold color with slightly increased letter spacing. Animate the text using a smooth left-to-right character reveal on page load (not a typing cursor), followed by a subtle shimmer/light sweep every 8–10 seconds. Use elegant gold dot separators that softly pulse, and add a gentle fade/translate-up animation while keeping the text perfectly centered with generous whitespace. The effect should feel luxurious, understated, and enterprise-grade—avoid flashy marquee, continuous scrolling, blinking, or typewriter effects.


Yes, correct. `/end` is now a registered slash command in Agent chat.

The pattern:
- `~/.agents/skills/end/SKILL.md` → `/end` command
- `~/.agents/skills/start/SKILL.md` → `/start` command

When you type `/end` in Agent chat, it loads the `end` skill instructions and I follow them. Same for `/start`.

So you can now use `/start` at session beginning and `/end` at session end, and I'll run the respective workflows.
