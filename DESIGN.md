---
name: Heimkoma
description: Shared-ownership brand system for Icelandic holiday homes — navy and coastal accent colors, DM Sans/DM Serif Display typography, sharp-cornered restraint.
colors:
  navy: "#1F3D59"
  navy-action: "#113968"
  sky: "#8AB9ED"
  sand: "#D4CEBE"
  charcoal: "#36393E"
  offwhite: "#F7FBFE"
  gold: "#FDB400"
typography:
  heading:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontWeight: 700
  heading-secondary:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontWeight: 400
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontWeight: 300
    fontSize: "16px"
    lineHeight: 1.5
  mono:
    fontFamily: "DM Sans Mono, ui-monospace, monospace"
rounded:
  button: "8px"
spacing:
  sm: "20px"
  lg: "40px"
components:
  button-primary:
    backgroundColor: "{colors.navy-action}"
    textColor: "{colors.offwhite}"
    rounded: "{rounded.button}"
    height: "48px"
    typography:
      fontFamily: "DM Sans, system-ui, sans-serif"
      fontSize: "18pt"
  icon-circle:
    backgroundColor: "{colors.navy-action}"
    textColor: "{colors.offwhite}"
---

# Design System: Heimkoma

## Overview

**Creative North Star: "The Coastal Ledger"**

Heimkoma sells something precise and something scenic at once: a registered, countable ownership share (weeks, percentages, property counts) in a place defined by Iceland's coastline and light. The system should read like a well-kept ledger for a beautiful asset — exact where it counts (numerals, shares, dates set in mono type; sharp 8px corners; a thin, deliberate 1pt inset border on primary actions) and quietly scenic where it doesn't (navy grounding every surface like dusk water, sky-blue and sand as the only warmth, gold used as sparingly as a wax seal). Nothing about it should feel like a rental listing or a travel brochure — it should feel like the paperwork for owning something real, designed by people who also care about how the light hits a fjord.

The primary heading voice is sans, not serif — DM Sans Bold carries the hierarchy. DM Serif Display exists only as a secondary, occasional accent, never as the system's main voice. This is a deliberate inversion of typical "luxury property" design habits (serif-led hero type) and should be protected, not softened back toward convention.

Depth is not yet specified by the brand guide; until confirmed, treat the system as flat and bordered rather than shadow-driven — the sharp corners and inset-border button language both point away from soft elevation.

**Key Characteristics:**
- Navy-grounded, coastal-accented — sky blue and sand are the only permitted warmth beyond gold
- Two distinct navies: `navy` (#1F3D59, the palette's surface/brand color) and `navy-action` (#113968, reserved for buttons and icon-circle fills) — related, never collapsed into one token
- Sans-led hierarchy: DM Sans Bold headings, DM Serif Display strictly secondary
- Numerals and tabular data (ownership %, week counts, prices) set in DM Sans Mono — the ledger detail
- Gold is an accent color, never a primary button fill
- Sharp, bordered, restrained — 8px button radius, 1pt inset borders, no confirmed shadow system

## Colors

A navy-grounded palette with two cool accent tints (sky, sand) standing in for Iceland's coastal light, plus a single warm accent (gold) held in reserve.

### Primary
- **Navy** (`#1F3D59`): the brand's surface and grounding color — navigation, dark sections, primary text-on-light anchor. This is the palette navy, distinct from the button-only navy below.

### Secondary
- **Navy Action** (`#113968`): reserved specifically for button fills and icon-circle fills. Deliberately distinct from palette Navy (`#1F3D59`) — do not substitute one for the other; they read as siblings, not duplicates.
- **Gold** (`#FDB400`): accent only — icons, dividers, small highlights, secondary CTAs. Never a primary button fill.

### Tertiary
- **Sky** (`#8AB9ED`): coastal accent, used for lighter accent moments and imagery-adjacent color washes.
- **Sand** (`#D4CEBE`): warm-neutral accent, paired with Sky as the system's only non-navy warmth.

### Neutral
- **Off-white** (`#F7FBFE`): base background and button/icon-circle text color.
- **Charcoal** (`#36393E`): body text and dark neutral detail, distinct from Navy — use for text, not surfaces.

### Tints
Each palette color (Navy, Navy Action, Sky, Sand, Charcoal, Gold) has confirmed 75% / 50% / 25% white tints for tonal variation — see the sidecar `colorMeta` for computed values. Off-white has no meaningful tint ladder; it is already near-white.

### Named Rules
**The Two-Navy Rule.** Navy (`#1F3D59`) is the palette's surface color; Navy Action (`#113968`) exists only for buttons and icon-circle fills. Never use Navy Action for backgrounds or large surfaces, and never fill a button with plain palette Navy.

**The Gold Reserve Rule.** Gold (`#FDB400`) appears on accents, never as a primary button or CTA fill. Its rarity is what makes it read as premium rather than promotional.

## Typography

**Heading Font:** DM Sans, Bold (with system-ui, sans-serif fallback)
**Secondary Heading Font:** DM Serif Display (with Georgia, serif fallback)
**Body Font:** DM Sans, Light (with system-ui, sans-serif fallback)
**Mono/Label Font:** DM Sans Mono (with ui-monospace, monospace fallback) — confirm the exact Google Fonts family name before wiring up a `<link>` tag; "DM Mono" is the name Google Fonts lists, and may be what's meant here.

**Character:** Confident and administrative up front (bold sans headings), with a single restrained serif flourish held in reserve — the pairing should feel like a well-run office for a beautiful property, not a travel brochure.

### Hierarchy
- **Headline** (DM Sans Bold): the system's primary heading driver — page titles, section headings, nav. Exact size scale is not specified by the brand guide; follow the 40px/20px spacing rhythm and confirm against the Figma file before implementing a fixed type scale.
- **Secondary Heading** (DM Serif Display, weight 400): an occasional accent voice — pull quotes, editorial flourishes, a single elevated moment per section. Never the top-level heading driver.
- **Body** (DM Sans Light, 16px, 150% line-height / 24px): paragraph text.
- **Mono/Label** (DM Sans Mono): numerals and tabular data specifically — ownership percentages, week counts, prices, dates. This is a functional choice for a product whose core facts are countable (8%/12% ownership, 6/12 weeks, 8/12 owners).

### Named Rules
**The Sans-Led Hierarchy Rule.** Primary headings are always DM Sans Bold. DM Serif Display is a secondary, occasional voice — it never carries the top-level heading role, even at hero scale.

## Layout

Spacing runs on two confirmed units: **20px** (tight rhythm — internal component spacing, small gaps) and **40px** (loose rhythm — section spacing, major gaps). No grid, container width, or breakpoint values were part of the brand guide; confirm those against the Figma file before establishing a fixed layout grid.

## Elevation & Depth

Not specified by the brand guide. Inferred (pending confirmation) as **flat and bordered** rather than shadow-driven: the 8px corner radius and 1pt inset border on primary buttons both point toward a bordered, non-shadow system. Do not add drop shadows to cards or surfaces without confirming this against the Figma file first.

## Shapes

Sharp, restrained geometry: **8px corner radius** on buttons (the only confirmed radius value), a **1pt inset border** on primary buttons (drawn inside the edge, not outside), and circular icon containers (icon-circle) filled with Navy Action. No card/container radius is confirmed — do not assume it matches the button radius without checking the Figma file.

## Components

### Buttons
- **Shape:** 8px corner radius, 1pt inset border
- **Primary:** Navy Action (`#113968`) fill, Off-white (`#F7FBFE`) text, DM Sans 18pt label, ~48–50px tall
- **Icon Circles:** same Navy Action fill / Off-white icon color as primary buttons — treat as a sibling of the button, not a separate palette choice
- **Secondary / Ghost:** not specified by the brand guide — confirm before implementing a non-primary button variant; do not invent a gold-filled or outline variant without checking the Figma file

## Do's and Don'ts

### Do:
- **Do** use Navy (`#1F3D59`) for surfaces and grounding, and keep Navy Action (`#113968`) exclusive to buttons and icon-circle fills — two related but distinct tokens.
- **Do** set primary headings in DM Sans Bold; use DM Serif Display only as a secondary, occasional accent voice.
- **Do** set body copy in DM Sans Light, 16px, 150% line-height.
- **Do** set numerals and tabular data (ownership shares, week counts, prices, dates) in DM Sans Mono.
- **Do** reserve Gold (`#FDB400`) for accents — icons, dividers, highlights — never a primary button fill.
- **Do** hold to the 20px / 40px spacing rhythm.
- **Do** use the Heimkoma logo only at 128px / 64px / 32px, at its native proportions, unmodified.

### Don't:
- **Don't** use `#1C3A5C` navy or `#C49A3A` gold anywhere — this pairing (currently live in `s1h1gb/`, `s1h2gb/`, and `thrif/`) is drift from the authoritative `#1F3D59` / `#FDB400` / `#113968` palette, not an alternate expression of it.
- **Don't** use Cormorant Garamond, Playfair Display, or Inter — none are part of the brand system. DM Sans, DM Serif Display, and DM Sans Mono are the only approved families. (Cormorant Garamond is currently live in `luxury-villa/` and `passport/`; Playfair Display + Inter in `s1h1gb/` and `s1h2gb/`.)
- **Don't** set DM Serif Display as a page's primary/top-level heading font, as `thrif/` currently does — it is a secondary accent voice only, never the main driver.
- **Don't** fill a primary button with Gold — Gold is accent-only; primary buttons are Navy Action with Off-white text.
- **Don't** rotate, recolor, outline, distort, or redraw the Heimkoma logotype.
