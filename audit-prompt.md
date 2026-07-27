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

Apply the specs as per [@design-system.md](file:///D:/viji/viji-olivine/05pipleline/02-SHAKTHI/design-system.md) for the section
Products & Solutions
