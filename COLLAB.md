# How we work together

Two-person workflow: **Manolis** + **Roussos** (uncle, ITSolution).

---

## The repo is the source of truth

- GitHub: https://github.com/Ahright11/nvshipping
- Branch: `main` is what's deployed.
- **Always `git pull origin main` before starting work. Always `git push` before deploying.**
- If you skip pulling, you'll overwrite the other person's work on FTP and the git history won't reflect what's actually live.

---

## Workflow for a change

```bash
git pull origin main                  # always start here
git checkout -b fix/<short-name>      # branch per task
# edit, test, commit
git push -u origin fix/<short-name>   # push the branch
# open Pull Request on GitHub → other person reviews → merge to main
git checkout main && git pull         # come back to main
# deploy from main (see DEPLOY.md)
```

For tiny changes (typo, image swap), pushing directly to `main` is fine — but tell the other person first.

---

## Two rules that prevent disasters

1. **One person deploys at a time.** Send a quick message before running the lftp command. FTP isn't atomic — parallel uploads corrupt the build.
2. **Never edit files directly on the FTP server.** That bypasses git. The next deploy will overwrite your changes and you'll have no history of what happened.

---

## Credentials

**None of this lives in the repo.** Use a shared password manager (1Password / Bitwarden):
- cPanel login (nvshipping.com:2083)
- FTP credentials (host: nvshipping.com, port 21)
- GitHub access (each person uses their own account)
- Any client-supplied accounts

### Setting up FTP for `lftp` (one-time per machine)

**macOS / Linux** — create `~/.netrc`:
```
machine nvshipping.com
  login <ftp-user>
  password <ftp-password>
```
Then `chmod 600 ~/.netrc`.

**Windows** — create `C:\Users\<you>\_netrc` with the same content (note: underscore, not dot).

After this, `lftp nvshipping.com` will authenticate automatically.

---

## Tasks

We use **GitHub Issues** in the repo. One issue per task. Close on merge. Don't pay for Linear/Jira/Trello — Issues is fine for two people.

---

## Quick reference

| Need to... | Where |
|---|---|
| Edit code | local clone of the repo |
| Track tasks | GitHub Issues |
| Find deploy commands | `DEPLOY.md` |
| Find project context | `CLAUDE.md` |
| See deploy history | `CHANGELOG.md` |
| Find passwords | shared password manager (NOT the repo) |
