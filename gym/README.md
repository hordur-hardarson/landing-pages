# Heimkoma Gym

The complete bilingual (Icelandic/English) workout page, imported from the approved Sites version on 10 October 2026.

- Current live page: https://heimkoma-gym.musterid.chatgpt.site/
- Entry point: `index.html`; English can be selected with `?lang=en`.
- Static HTML, CSS and JavaScript; no build step or backend required.
- `assets/` contains the Heimkoma logo, property gym photo and all ten exercise demonstration images.
- 18-minute session: 5-minute outdoor warm-up, ten 40-second exercise / 20-second rest stations, and 3-minute cool-down.
- Four optional text-only bodyweight exercise ideas are outside the timer.
- Image and script paths are relative, so the page can be hosted in `/gym/`.
- Google Fonts is the only external styling dependency. There are no analytics tags, submissions or saved visitor data.

## Deployment

This folder is committed to GitHub but is **not** currently included in the repository's server deployment workflow. The existing Sites page remains live. To serve it at `https://lp.heimkoma.app/gym/`, provision a separate directory-restricted deployment key and add a dedicated publish step, following the repository's established deployment policy. Do not reuse a handbook or cleaning-page key.
