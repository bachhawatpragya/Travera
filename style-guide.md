# Style guide — Travera (minimal)

Imports:
- Google Fonts: Abril Fatface, Comforter Brush, Heebo
- Ionicons

Essential tokens (see `assets/css/style.css` :root):
- `--primary`, `--accent`, `--bg`, `--text`, `--radius-6`, `--section-padding`

Quick patterns:
- Buttons: `.btn`, `.btn-primary`, `.btn-outline`.
- Images: `.card-banner` + `.img-cover` (use for consistent cropping).
- Expandables: parent gets `.expanded`; update `aria-expanded` on trigger and `aria-hidden` on panel (`.hero-extend`, `.blog-more`).
- Modals: `.destination-modal` > `.modal-content`; toggle `.active`, and set `document.body.style.overflow='hidden'` while open.

Notes:
- `:root` in `assets/css/style.css` is the single source of truth for tokens.
- Use `:focus-visible` and ARIA attributes for accessibility.

(end)
