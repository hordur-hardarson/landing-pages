# landing-pages

Static pages hosted at <https://lp.heimkoma.app>.

| Folder | Page | Live |
|---|---|---|
| `s1h1gb/` | Húsafell guest handbook | <https://lp.heimkoma.app/s1h1gb/> |
| `s1h2gb/` | Akureyri guest handbook | <https://lp.heimkoma.app/s1h2gb/> |
| `passport/` | — | not currently deployed from this repository |
| `luxury-villa/` | — | not currently deployed from this repository |

## Publishing

Commit to `main` and push. That is all — the two handbooks publish automatically and are
live in about a minute. Follow a run under the repository's **Actions** tab.

To undo a change, revert the commit on `main`; the revert republishes the previous version.

Only `s1h1gb/` and `s1h2gb/` are published. The other folders are untouched by the
deployment, and so are the unrelated pages that share the server directory.

## Things worth knowing

**The handbooks are offline-capable apps.** Each has a `sw.js` service worker that caches
itself so guests can read it without signal. That cache is served in preference to the
network, which means a guest who has already opened the handbook would otherwise keep
seeing the old version forever. The deployment stamps the current commit into the cache
name on every publish, so updates reach returning guests while offline use keeps working.
Nothing to do by hand — but if you add an image you want available offline, add it to the
`ASSETS` list in that page's `sw.js` as well.

**`DEPLOY.txt` is no longer published.** It described the old manual upload and was publicly
readable. The deployment excludes it and removes it from the server.

**`CNAME` is left over from GitHub Pages** and has no effect: `lp.heimkoma.app` resolves to
the Heimkoma server, not to GitHub.

## Credentials

Do not commit FTP details, passwords or private keys. Each handbook has its own deployment
key, stored as an encrypted repository secret (`LP_S1H1GB_DEPLOY_KEY`,
`LP_S1H2GB_DEPLOY_KEY`). Each is restricted on the server so it can only write into that one
page's directory — it cannot open a shell, cannot read any other file, and cannot reach the
other handbook.
