# ML Paper Reading Group Website

Static website for the **ML Paper Reading Group** (Augusta University), built with **Svelte 5 + SvelteKit** and deployed to **GitHub Pages** via **GitHub Actions**.

URL: https://sethbarrett50.github.io/ml-paper-reading-group-website/

The site is intentionally “data-driven”: most updates (papers, schedule, leadership) are made by editing files under `src/lib/data/` — no page/UI work required for routine content changes.

---

## What’s in this repo

- **SvelteKit app** (static site / prerendered)
- **Dark modern UI** with a shared nav + routes:
  - `/` (home)
  - `/papers` (papers list; includes “reviewed” marker + review date)
  - `/schedule` (meeting schedule)
  - `/leadership` (leadership team)
- **GitHub Actions**
  - `ci.yml` runs checks on PRs and pushes
  - `deploy.yml` publishes to GitHub Pages after CI passes on `main`

---

## Where to edit content

### Papers
**File:** `src/lib/data/papers.ts`

Add/edit entries in `PAPERS`. This is the master list of all papers the group tracks.

Each paper includes fields like:
- `title`
- `link` (optional)
- `authors`
- `citation`
- `contribution`
- `proposer`

### Schedule
**File:** `src/lib/data/schedule.ts`

Edit `SCHEDULE` to add new meetings, update dates, fill in leaders, or set paper titles.

**Important:** The “reviewed” marker for papers is computed by matching meeting `paperTitle` values to `papers.ts` titles (with normalization). If you rename a paper title in either place, keep them roughly consistent.

### Reviewed marker + ordering logic
**File:** `src/lib/data/review.ts`

This file:
- matches schedule entries to papers
- sets `reviewed: true/false`
- attaches `reviewDate`, `term`, `meetingLabel`, `discussionLeaders`
- sorts papers by review date (reviewed first)

If the matching ever fails because a schedule title differs too much from the paper title, adjust the normalization in `review.ts`.

### Leadership
**File:** `src/lib/data/leadership.json`

Update names/roles/links here. This drives `/leadership`.

---

## Where to edit the UI

### Routes (pages)
**Directory:** `src/routes/`

- `src/routes/+page.svelte` → Home
- `src/routes/papers/+page.svelte` → Papers page
- `src/routes/schedule/+page.svelte` → Schedule page
- `src/routes/leadership/+page.svelte` → Leadership page
- `src/routes/+layout.svelte` → shared layout (nav/footer)
- `src/routes/+layout.ts` → prerender/trailingSlash settings

### Shared components
**Directory:** `src/lib/components/`

- `Nav.svelte` → site navigation header

### Styling
- `src/app.css` → global theme (dark styling, layout utility classes)

---

## Static assets (logo, favicon, robots)
**Directory:** `static/`

- `static/logo.png` → group logo (referenced by nav/home)
- `static/favicon.ico`, `static/robots.txt`

Anything in `static/` is copied directly into the built site root.

---

## Local development

### Install
```bash
make install
```

### Run dev server

```bash
make dev
```

### Build the site locally

```bash
make build
```

### Preview the production build

```bash
make preview
```

---

## Quality checks (same ones CI runs)

### Lint

```bash
make lint
```

### Type-check

```bash
make check
```

### Format

```bash
make format
```

In CI, formatting should be enforced with `prettier --check` (not `--write`) so the workflow fails if someone forgets to format.

---

## Makefile targets

Run `make` or `make help` to see all targets.

Common ones:

* `make install` – install dependencies (`npm ci`)
* `make dev` – run dev server
* `make build` – build static site
* `make check` – svelte-check/typecheck
* `make lint` – eslint + prettier check
* `make format` – prettier write
* `make overview` – prints tree + routes + config snapshots
* `make search PATTERN="..."` – grep through `src/`

---

## Deploy (GitHub Pages)

Deployment happens via GitHub Actions workflows in `.github/workflows/`:

* `ci.yml` runs `format/check/lint/build` for PRs and pushes.
* `deploy.yml` deploys to GitHub Pages **only after CI succeeds on `main`**.

### GitHub repo configuration

In the GitHub repo:

1. Go to **Settings → Pages**
2. Under **Build and deployment**, select **GitHub Actions**

After merging to `main`, the site will be available at:
`https://<user>.github.io/<repo>/`

---

## Repo layout (quick map)

* `.github/workflows/` – CI + Pages deploy
* `src/lib/data/` – content source of truth (papers, schedule, leadership)
* `src/routes/` – pages
* `src/app.css` – global styling/theme
* `static/` – logo/favicon/robots and other static files
* `Makefile` – common commands

---

## Adding a new paper (quick recipe)

1. Add it to `src/lib/data/papers.ts`
2. If it’s already scheduled/reviewed, add/update the meeting in `src/lib/data/schedule.ts`
3. Run:

   ```bash
   make lint && make check && make build
   ```
