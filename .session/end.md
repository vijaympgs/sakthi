# Session End

Run these steps in order before signing off.

## 1. Verify Local State

- Backend (8000) responds 200
- Frontend (3000) responds 200
- No console errors in running app (check browser if possible)

## 2. Git Status

```bash
git --no-pager status --porcelain
```

- If dirty, ask user if they want to commit
- If yes: `git add -A && git commit -m "..." && git push`

## 3. Update Session Files

### `.session/session.md`

Append to bottom:

```markdown
## COMPLETED (Session N — Title)

- Bullet list of what was done
- Key decisions made
- Files changed

## NEXT SESSION

- What remains to do
- Known issues / blockers
```

### `documentation/session.md`

Append concise entry with date, session number, and completed tasks.

## 4. Push to Git (if user approved)

```bash
git --no-pager add -A
git --no-pager commit -m "Brief description"
git --no-pager push
```

## 5. Final Message

Summarize:

- What was accomplished
- What's pending / next session focus
- Any deployment notes (env vars, migrations, etc.)

---

## Quick Checklist

- [ ] BE + FE running locally
- [ ] Changes verified in browser
- [ ] session.md updated (both files)
- [ ] Git committed and pushed (if user approved)
- [ ] Sign-off message sent
