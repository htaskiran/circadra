# CIRCADRA

Website of **CIRCADRA**, an independent analog and RF design automation project: simulation, optimization and result analysis in one workflow.

Plain HTML, CSS and JavaScript. No build step, no framework, no tracking.

## Run locally
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Project structure
```
index.html        the whole site (single page)
css/styles.css    all styling (colors and fonts in :root)
js/layout.js      menu, top bar and footer for both pages
js/nav.js         menu behavior, section tab highlighting
js/main.js        diagram panel text (const segs), example console
assets/           logo, photos, prototype screenshot
docs/EDITING.md   what to change where
.nojekyll         tells GitHub Pages to serve the files as they are
```

## Publish with GitHub Pages
1. Create a repository on GitHub and push these files to the `main` branch.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. After a minute the site is live at `https://<your-user>.github.io/<repository-name>/`.

All links are relative, so the site works at that address without changes.

## Notes
- The workflow console in the "Workflow" section is an illustrative example, not simulation output.
- The screenshot in the hero is from the CIRCADRA prototype.

## Credits
Developed by Hakan Taşkıran. Academic advisor: Prof. Engin Afacan.

## License
No license has been chosen yet. Add a `LICENSE` file before accepting outside contributions or allowing reuse.
