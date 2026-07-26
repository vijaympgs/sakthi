# OWP - Olivine Website Platform
# Customer001 - Sakthi Solutions

## Setup Instructions

### Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend (Next.js)

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### Docker (Full Stack)

```bash
cd backend
cp .env.example .env
docker compose up -d
```

Backend: http://localhost:8000
Admin: http://localhost:8000/admin/
API Docs: http://localhost:8000/api/docs/
Frontend: http://localhost:3000

## Project Structure

- `backend/` - Django 5.x REST API with CMS & database fixtures
- `frontend/` - Next.js 15 + React 19 + TypeScript + Tailwind CSS (Sakthi Solutions website)
- `frontend/src/config/siteConfig.ts` - Central brand, contact & navigation config
- `documentation/` - Architecture and discovery docs

## Key Commands

```bash
# Backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
python manage.py createsuperuser

# Frontend
npm run dev       # Development
npm run build     # Production build
npm run lint      # ESLint
npm run typecheck # TypeScript check
```