# Session Start

## 1. Restore Context

- Read `.session/session.md` to understand last session state
- Read `documentation/session.md` if detailed task list needed
- Note any blockers, pending items, live URLs

## 2. Check Git State

```bash
git --no-pager status --porcelain
git --no-pager log --oneline -3
```

- Ensure working tree is clean or understand dirty state
- Do not commit unless user explicitly requests

## 3. Verify Running Services

- Backend: `GET http://localhost:8000/api/cms/settings/company/` — expect 200
- Frontend: `GET http://localhost:3000` — expect 200
- 9Router: `GET http://localhost:20128/v1/models` — expect 200
- If any missing, ask user to run `run.bat`

## 4. Read Key Files

- `frontend/src/components/sections/HomePage.tsx` — hero, sections
- `frontend/src/components/layout/Navigation.tsx` — nav state
- `backend/apps/cms/management/commands/seed_sakthi.py` — seed state
- `frontend/src/lib/api.ts` or `useQueries.ts` — API hooks

## 5. Understand Current Focus

- Ask user: what's the target for this session?
- If no clear direction, propose next item from `NEXT SESSION` in session.md
- Cross-check against `SCCB Verification Checklist` if architecture work

## 6. Before Editing

- Read the full target file first
- Run `npm run build` or `npm run typecheck` after non-trivial changes
- Verify locally before deployment

---

## Constraints

- Never hardcode business content (text, images, products)
- Never create product/brand-specific components
- is_active flag controls all CMS visibility
- Company name cycling (V1-V10) in nav is the wordmark standard
- Hero category ribbon: first letter red (text-red-600), rest gold gradient (from-[#D4AF37] to-[#E0B84F])
- Always run `run.bat` after making changes
