# landing-pages

Static pages hosted at <https://lp.heimkoma.app>.

| Folder | Page | Live |
|---|---|---|
| `s1h1gb/` | Húsafell guest handbook | <https://lp.heimkoma.app/s1h1gb/> |
| `s1h2gb/` | Akureyri guest handbook | <https://lp.heimkoma.app/s1h2gb/> |
| `thrif/` | Cleaning checklist and inspection | <https://lp.heimkoma.app/thrif/> |
| `passport/` | — | not currently deployed from this repository |
| `luxury-villa/` | — | not currently deployed from this repository |

## Publishing

Commit to `main` and push. That is all — the three pages above publish automatically and are
live in about a minute. Follow a run under the repository's **Actions** tab.

To undo a change, revert the commit on `main`; the revert republishes the previous version.

Only `s1h1gb/`, `s1h2gb/` and `thrif/` are published. The other folders are untouched by the
deployment, and so are the unrelated pages that share the server directory.

## The guest handbooks

**These are offline-capable apps.** Each has a `sw.js` service worker that caches the page so
guests can read it without signal. That cache is served in preference to the network, which
means a guest who has already opened the handbook would otherwise keep seeing the old version
forever. The deployment stamps the current commit into the cache name on every publish, so
updates reach returning guests while offline use keeps working.

Nothing to do by hand — but **if you add an image you want available offline, add it to the
`ASSETS` list in that page's `sw.js` as well**. Images not listed still display normally when
there is signal.

`DEPLOY.txt` in each handbook describes the old manual upload process and no longer applies.
It is kept in the repository for reference but excluded from publishing, and removed from the
server, because it was publicly readable.

## The cleaning checklist page

`thrif/` is a form the cleaning team fills in on a phone. Unlike the handbooks it has **no
service worker** — it should always be the current version, never a cached one, so the
deployment does not stamp a cache name into it.

The form posts to WordPress on heimkoma.app. No third-party form service is involved.

- **Submitting requires an access code.** The page is public; posting to it is not. Ask Rubel
  for the current code, and give it to the cleaning team directly rather than putting it on
  the page.
- Each submission is emailed to `thrif@heimkoma.app` **and** stored in WordPress, under
  **Þrifskýrslur** in wp-admin, so nothing depends on an inbox.
- Photos are re-encoded on the server and given generated filenames. Accepted formats are
  JPEG, PNG and WebP; a phone producing something else will have its photo rejected while the
  rest of the report still saves.

If you change the form, keep every field's `name` attribute as it is — those names are what
the server reads. Adding a field is fine; renaming one silently drops its value.

The endpoint is shared rather than specific to this page, so a future internal page needs only
a layout and a `<form>` pointing at the same place — no new backend work.

## GitHub Pages

**This repository also has GitHub Pages enabled, and it does nothing useful.** Pages builds on
every push and believes it serves `lp.heimkoma.app`, but that hostname resolves to the
Heimkoma server, not to GitHub — so nobody ever sees what Pages publishes.

This has caused real confusion: a change pushed to the repository showed as deployed in
GitHub while visitors kept seeing the older copy from the server. If you see a green
`pages-build-deployment` run, it is not the one that publishes this site — the run named
**Deploy internal pages** is.

Turning Pages off for this repository would remove the ambiguity. The `CNAME` file exists only
for Pages and can go at the same time.

## Credentials

Do not commit FTP details, passwords or private keys.

Each published page has its own deployment key, stored as an encrypted repository secret:

| Page | Secret |
|---|---|
| `s1h1gb/` | `LP_S1H1GB_DEPLOY_KEY` |
| `s1h2gb/` | `LP_S1H2GB_DEPLOY_KEY` |
| `thrif/` | `LP_THRIF_DEPLOY_KEY` |

Each key is restricted on the server so it can only write into that one page's directory — it
cannot open a shell, cannot read any other file, and cannot reach the other pages. A new page
gets its own key rather than reusing an existing one.

If a deploy step fails with `error in libcrypto` and `Permission denied (publickey)`, the
secret is missing or was pasted with a line broken. Re-add it whole, including the
`-----BEGIN` and `-----END` lines.
