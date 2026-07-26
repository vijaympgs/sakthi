# OWP - Olivine Website Platform

## Architecture Overview

The Olivine Website Platform (OWP) is a reusable, customer-agnostic website platform. Customer-specific configuration is separated from application code.

## Directory Structure

```
02-SHAKTHI/
├── backend/                    # Django 5.x REST API
│   ├── config/                 # Django project settings
│   │   ├── settings/
│   │   │   ├── base.py         # Shared settings
│   │   │   ├── development.py  # Dev overrides
│   │   │   └── production.py   # Prod security settings
│   │   ├── urls.py             # Root URL configuration
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── apps/
│   │   ├── users/              # Custom user, JWT auth, roles
│   │   ├── cms/                # Core CMS modules
│   │   │   ├── models/         # 18 model files
│   │   │   ├── serializers.py  # DRF serializers
│   │   │   ├── views.py        # API views
│   │   │   ├── urls.py         # API routes
│   │   │   └── admin.py        # Django admin
│   │   └── audit/              # Audit trail
│   ├── manage.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── frontend/                   # Next.js 15 + React 19
│   ├── src/
│   │   ├── app/                # App router pages
│   │   ├── components/
│   │   │   ├── layout/         # Navigation, Footer
│   │   │   ├── sections/       # Page sections (Home, About, Products, etc.)
│   │   │   ├── ui/             # Reusable UI components
│   │   │   └── providers/      # React Query provider
│   │   ├── lib/                # API client, utilities
│   │   ├── hooks/              # Custom hooks (data fetching)
│   │   ├── stores/             # Zustand state management
│   │   └── types/              # TypeScript interfaces
│   ├── package.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── customers/
│   └── customer001-sakthi/     # Sakthi Solutions config
│       ├── brand.json          # Brand identity
│       ├── theme.json          # Theme configuration
│       ├── navigation.json     # Menu structure
│       ├── seo.json            # SEO configuration
│       ├── deployment.json     # Deployment settings
│       └── content/
│           └── seed-data.json  # CMS seed data
│
├── shared/                     # Shared types, constants
├── themes/                     # Theme engine
├── documentation/              # Project documentation
└── deployment/                 # Deployment configs
```

## CMS Modules

| Module | Model(s) | Purpose |
|--------|----------|---------|
| Pages | Page, PageSection | CMS-managed pages with sections |
| Products | ProductCategory, Product, ProductFeature, ProductGallery | Product catalog |
| Solutions | Solution | Solution bundles |
| Industries | Industry | Industry verticals |
| Services | Service, ServiceItem | Service offerings |
| Clients | Client | Client logos |
| Testimonials | Testimonial | Customer testimonials |
| Gallery | Gallery, GalleryImage | Image galleries |
| Downloads | DownloadCategory, Download | File downloads |
| Blogs | BlogCategory, BlogPost | Blog/News |
| Navigation | NavigationMenu, NavigationItem | Menu management |
| Footer | FooterColumn, FooterLink | Footer management |
| SEO | SEOSettings | Global SEO settings |
| Site Settings | SiteSettings | Company info, contacts |
| Theme | ThemeSettings | Color, font, design tokens |
| Contact | ContactSubmission, EnquiryType | Contact form |
| Analytics | PageView | Page view tracking |
| Audit | AuditLog | Change tracking |

## API Endpoints

```
POST   /api/auth/token/              # JWT login
POST   /api/auth/token/refresh/      # JWT refresh
POST   /api/auth/register/           # Register
GET    /api/auth/me/                 # Current user
POST   /api/auth/change-password/    # Change password

GET    /api/cms/home/                # Homepage data
GET    /api/cms/pages/               # Page list
GET    /api/cms/pages/{slug}/        # Page detail
GET    /api/cms/product-categories/  # Categories
GET    /api/cms/products/            # Products
GET    /api/cms/products/{slug}/     # Product detail
GET    /api/cms/solutions/           # Solutions
GET    /api/cms/industries/          # Industries
GET    /api/cms/services/            # Services
GET    /api/cms/clients/             # Clients
GET    /api/cms/testimonials/        # Testimonials
GET    /api/cms/galleries/           # Galleries
GET    /api/cms/downloads/           # Downloads
GET    /api/cms/blog/                # Blog posts
GET    /api/cms/navigation/{slug}/   # Navigation
GET    /api/cms/footer/              # Footer
GET    /api/cms/settings/site/       # Site settings
GET    /api/cms/settings/seo/        # SEO settings
GET    /api/cms/settings/theme/      # Theme settings
POST   /api/cms/contact/             # Submit contact form
```

## Reusable Components

| Component | File | Purpose |
|-----------|------|---------|
| Navigation | layout/Navigation.tsx | Top navigation with dropdowns |
| Footer | layout/Footer.tsx | Site footer |
| SectionHeader | ui/SectionHeader.tsx | Section title + subtitle |
| Card | ui/Card.tsx | Content card |
| Stats | ui/Stats.tsx | Statistics display |
| CTA | ui/CTA.tsx | Call to action banner |
| TestimonialCard | ui/TestimonialCard.tsx | Testimonial display |
| ClientLogo | ui/ClientLogo.tsx | Client logo display |

## Adding a New Customer

1. Create `customers/customerXXX-name/` directory
2. Add `brand.json` with logo, colors, name
3. Add `theme.json` with design tokens
4. Add `navigation.json` with menu structure
5. Add `seo.json` with meta tags
6. Add `deployment.json` with URLs
7. Add `content/seed-data.json` with CMS content
8. No application code changes needed

## Technology Stack

### Backend
- Python 3.13+
- Django 5.x
- Django REST Framework
- PostgreSQL 16
- JWT Authentication (SimpleJWT)
- Redis (future)
- Docker

### Frontend
- Next.js 15
- React 19
- TypeScript (strict)
- Tailwind CSS
- TanStack Query
- Axios
- React Hook Form + Zod
- Zustand
- Lucide Icons
- Framer Motion (minimal)