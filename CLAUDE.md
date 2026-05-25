# scribbletune.com

Jekyll documentation and showcase site for the Scribbletune ecosystem.
Hosted on GitHub Pages at scribbletune.com.

## Install & run

```bash
gem install jekyll bundler
bundle install
bundle exec jekyll serve
```

Visit http://localhost:4000. Jekyll watches for changes and rebuilds automatically.

## Build (static output)

```bash
bundle exec jekyll build
```

Output goes to `_site/`.

## Tests

No test suite. This is a static documentation site.

## Stack

- **Jekyll 3.9** (see Gemfile) — do not upgrade to 4.x without testing
- **Minima 2.x** theme with heavy customization in `_layouts/`, `_includes/`, and `_sass/`
- **kramdown + GFM** for Markdown parsing
- **No Node/npm pipeline** — CSS compiled by Jekyll's built-in Sass, no webpack/bundler

## Directory conventions

| Path | Purpose |
|------|---------|
| `_pages/` | All site pages (documentation, examples, about, etc.) |
| `_layouts/` | Base layouts: `default`, `documentation`, `examples`, `page`, `post` |
| `_includes/` | Partials: `head`, `top-nav`, `aside`, `footer`, etc. |
| `_sass/` | SCSS source (`_base.scss`, `_home.scss`) |
| `css/main.scss` | Entrypoint — Jekyll compiles this using `_sass/` |
| `css/` | Also contains vendored CSS: `bootstrap.min.css`, `pretty.css`, `icons.css` |
| `js/` | Custom scripts for interactive demos (`beat.js`, `random-chords.js`, `prettify.js`) |
| `_data/latest.yml` | Latest Scribbletune npm version — update when a new library release ships |
| `sounds/piano/` | WAV piano samples for browser playback demos |
| `fonts/` | Custom icon font "fico" (do not regenerate unless icon set changes) |

## Adding or editing pages

- Create/edit Markdown files in `_pages/`.
- Every page needs YAML front matter with at minimum `layout`, `title`, and `permalink`:
  ```yaml
  ---
  layout: page
  title: My Page
  permalink: /my-page/
  ---
  ```
- Use `layout: documentation` for API/library docs pages (adds sidebar nav).
- Use `layout: examples` for interactive demo pages.
- `_pages/documentation.md` is the docs landing page; update it when adding new doc pages.

## Key constraints

- Jekyll 3 uses Sass 3.x internally — avoid CSS features that require Sass 4/Dart Sass.
- No server-side code; everything must work as static files.
- Audio demos depend on `sounds/piano/` WAV files being served correctly — do not move them.
- GitHub Pages serves from the `master` branch root; `_site/` is not committed.
- `CNAME` must stay as-is (`scribbletune.com`) — deleting it breaks the custom domain.
