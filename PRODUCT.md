# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Guest handbooks (`s1h1gb/`, `s1h2gb/`):** co-owner families staying during their allotted weeks, and paying renters staying during weeks a co-owner has not used. Both read the same handbook for a given property.
- **Cleaning checklist (`thrif/`):** Heimkoma's cleaning/inspection staff, filling in a turnover report on a phone between stays. Icelandic-speaking, access-code gated.
- **Villa marketing (`luxury-villa/`, active draft):** prospective buyers evaluating entry into shared ownership of product A (Þriggja eigna samfélag) or product B (Samfélag um eina eign).
- **Passport (`passport/`, active draft):** travelers to Iceland — both prior guests and new prospects — joining a free email list for travel inspiration and early access to new Heimkoma homes.

## Product Purpose

Heimkoma is an Icelandic shared-ownership company: several families jointly own high-quality properties while Heimkoma manages administration, operations, and the practical aspects of ownership (legal/compliance, concierge, scheduling, maintenance, and rental of unused weeks). This repository hosts the static, non-framework pages that support that operation — guest-facing handbooks, a staff-facing cleaning/inspection tool, and prospect-facing marketing/signup pages — publishing to `lp.heimkoma.app`.

## Positioning

Customers acquire genuine, registered-title ownership interests in real property — Heimkoma is explicitly **not** a timeshare, holiday club, subscription, or rental membership. Present it as a professional, modern, credible alternative to owning an entire property that would only be used part of the year. Ownership, use, and convenience are the primary proposition; financial investment is not the framing.

## Operating Context

- **Three core products**, always equally important beneath the Heimkoma master brand — identify which one a task concerns rather than assuming the original three-property model:
  - **A. Þriggja eigna samfélag** ("Three-property community"): 12 owner families; ownership spread across three properties; ~12 weeks (84 days)/year per owner in total, ~4 weeks per property; ~8% ownership interest. Current contracts/rules primarily govern this model.
  - **B. Samfélag um eina eign** ("Single-property community"): 8 owner families; one property; 6 weeks (42 days)/year; exactly 12% ownership interest. General Heimkoma model/principles carry over from A, but dedicated contracts are being prepared and are **not** legally finalized yet.
  - **C. Heimkoma Reykjavík**: shared ownership of one Reykjavík apartment; 8 families; 6 weeks (42 days)/year; exactly 12% ownership interest. Use "Heimkoma Reykjavík" or "íbúð"; avoid "borgaríbúð" unless specifically requested. Dedicated contracts in preparation, not finalized. Product C's own site lives in the sibling `heimkoma-reykjavik` repository, out of this repo's scope.
- Repo publishes three live pages to `lp.heimkoma.app` via GitHub Actions on push to `main` (see README): the two guest handbooks and the cleaning checklist. `luxury-villa/` and `passport/` are built but not wired into deployment yet — they are active work, not abandoned drafts.
- GitHub Pages is enabled on this repo but is inert (wrong DNS target) — disregard it as a deployment signal.
- Guest handbooks are offline-capable PWAs (service worker caches content, stamped with the current commit on publish). The cleaning form deliberately has **no** service worker and must always serve the current version.
- The cleaning-checklist form posts to a shared WordPress endpoint on `heimkoma.app`, gated by an access code distributed out of band (not on the page). Submissions are emailed to `thrif@heimkoma.app` and stored in WordPress. Photos are re-encoded server-side (JPEG/PNG/WebP only). Existing form field `name` attributes are a wire contract with the server — do not rename them.
- No repo-wide language rule: language is decided per page (guest handbooks in English; `thrif/` in Icelandic with an EN/IS toggle).

## Capabilities and Constraints

- Do not carry contract/rule specifics from product A over to B or C unless a current approved document confirms them.
- In any product copy, distinguish confirmed commercial/product structure, working operating principles, and legally finalized contractual terms — never state a draft or working assumption as a finalized legal right or obligation, especially for products B and C.
- For legal/contractual facts (ownership rights, booking, use, rental, payments, fees, sale, transfer, inheritance, exit, obligations, restrictions): defer to the newest applicable document in the master legal folder, not memory.
- Source priority for current commercial facts: (1) latest explicit instruction from Hörður, (2) latest approved landing page/website material, (3) latest approved product material, (4) latest approved brand material, (5) older material as historical context only. A newer approved landing page can supersede older material on changing facts (features, availability, property details, CTAs, commercial propositions).
- Static per-page HTML/CSS/JS, no build tooling or framework in this repo.

## Brand Commitments

- Company/brand name: **Heimkoma**.
- Authoritative source for brand positioning, tone of voice, messaging hierarchy, vocabulary, personality (H-Klassi), and visual identity is the live master brand folder in Google Drive (currently anchored by an August 2026 Heimkoma Vörumerkjahandbók) — consult it live for anything beyond what's recorded here rather than relying on memory, since Heimkoma iterates quickly.

## Evidence on Hand

- Húsafell property (guest handbook `s1h1gb/`, photographed as "Hraunbrekkur") and an Akureyri property (`s1h2gb/`) are real, currently operating.
- `luxury-villa/` already markets products A and B using real Húsafell/Hraunbrekkur photography, but its stated pricing (€120K single-property entry / €250K three-property entry) and rental-income framing ("up to 100% of days") are unverified draft copy — check the live landing-page index / product material before treating as current fact.
- `passport/` is a free, no-fee email list (travel inspiration + early access to new homes), not a points or loyalty program.
- Live master sources exist in Google Drive and supersede any static copy in this repo or in older uploaded documents:
  - Master legal folder — `https://drive.google.com/drive/folders/1cIE0KsdehQi1ewtsUazdCy5TPaZIeTeB`
  - Master brand instruction folder — `https://drive.google.com/open?id=1HmfqTA63Glx4rzW2QMHDXZwoygZdxHNA`
  - Current web/landing-page index doc — `https://docs.google.com/document/d/1d5SYn63R2uD8Vu2e1YmRQ4ibp6gMxEs3WRRe0jCjGNM/edit` (not accessible with the connected Drive account as of this writing — confirm access or ask Hörður for the current version before relying on it)

## Product Principles

1. Always identify which of the three core products (A/B/C) a task concerns; never assume "Heimkoma" defaults to the original three-property model.
2. Treat live Drive sources (legal folder, brand folder, landing-page index) as authoritative over this repo's existing pages, older uploaded documents, or memory — Heimkoma changes quickly.
3. Ownership, use, and convenience are the primary proposition; keep messaging out of an investment-return register.
4. Never present a draft or working assumption as a finalized legal right or obligation, especially for products B and C, whose contracts are still in preparation.
