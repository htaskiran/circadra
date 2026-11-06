# CIRCADRA website — editable version

Open `index.html` from the repository folder. Keep the folders next to it.


```
index.html        the whole site (single page) (text and sections)
css/styles.css    all styling  — colors, fonts, width in :root at the top
js/layout.js      menu, top bar and footer for BOTH pages (edit once)
js/nav.js         menu behavior and tab highlighting
js/main.js        example chart, diagram panel text (const segs), console
assets/           logo.svg, logo-512.png, photos (replace with the same file name)
```

## Where to change things
| I want to change… | Open |
|---|---|
| Headlines, paragraphs | `index.html` (each section starts with a `SECTION:` comment) |
| Menu items, top bar, footer | `js/layout.js` |
| Colors, fonts, page width | `css/styles.css` → `:root` |
| Diagram panel texts | `js/main.js` → `const segs` |
| Photos, logo | files in `assets/` |

To remove a section: delete from its `SECTION:` comment to its closing `</section>`, then remove its link in the tab bar and in `js/layout.js`.
The chart and console are illustrative, not simulation data.
