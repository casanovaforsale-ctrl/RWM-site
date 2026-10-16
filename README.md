# rwm.casanovanjpa.com

Rodriguez Wealth Management: the hub for Nick Rodriguez's businesses (the Open House app, custom agent dashboards, website building, Casanova Group real estate and The Zephyr Zoomie Zone).

- `src/` holds the page bodies and `_layout.html` (header, footer, SEO tags and structured data).
- `static/` holds CSS, JavaScript, images, self-hosted fonts, `CNAME` and `robots.txt`.
- Run `python3 tools/build.py`. It writes `docs/`, which GitHub Pages serves (Settings → Pages → Deploy from a branch → `main` / `/docs`), and `preview/` (git-ignored) for opening from disk.
- No page loads anything from a third party (fonts included) before a visitor clicks something.
- DNS: CNAME `rwm` → `casanovaforsale-ctrl.github.io`.
