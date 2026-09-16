# Achyuth Unni — Portfolio

Personal portfolio of a graphic designer and full stack developer based in Kochi.

**Live:** https://achyuth-u.github.io/Personal-Portfolio/

![Portfolio hero](images/readme/hero.jpg)

## What's inside

- "ACHYUTH" wordmark that writes itself on load, then morphs into the navigation bar
- A scroll-driven ribbon that grows out of the wordmark, unrolls the featured piece, threads through the works and pauses as a dot at each section
- 12 selected works with a lightbox, a filterable skills grid, experience / builds / credentials rows and a contact footer
- Dark and light themes, custom cursor, responsive down to phones (hamburger menu on small screens)

## Built with

- Plain HTML, CSS and JavaScript — no framework, no build step
- Fonts: [Sora](https://fonts.google.com/specimen/Sora) and [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- Icons: a few [Lucide](https://lucide.dev/) shapes, inlined as SVG
- Images: WebP, with 800px variants served to small screens
- The wordmark outlines and writing strokes in `logo.js` are generated from the Sora font with Python (`fontTools`, `uharfbuzz`) — see `tools/`

## Run locally

```bash
python -m http.server 5173
```

Then open http://localhost:5173 — or just open `index.html` in a browser.

## Structure

```text
index.html      page
styles.css      styles
interactive.js  data, animations, ribbon, lightbox, menu
logo.js         generated wordmark data (don't edit by hand)
images/         works (full size + sm/ variants), README screenshot
files/          CV
tools/          Python helpers: wordmark generation, screenshot/probe scripts
```

## License

[MIT](LICENSE) © 2026 Achyuth Unni
