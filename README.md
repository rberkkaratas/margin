# Margin

The shared design kit for a family of finance apps: plain CSS, light and dark
themes, IBM Plex type, and strict rules that are enforced in CI.

- **[DESIGN.md](DESIGN.md)** is the rulebook. Read it before building any
  screen.
- **`specimen/index.html`** shows every token and component in both themes,
  next to a sample valuation screen. Open it with `npm run specimen`.

## Install

```bash
npm install @rberkkaratas/margin
```

```css
/* the whole kit: fonts, tokens, base styles, components */
@import "@rberkkaratas/margin";
```

Or import only what you need:

```css
@import "@rberkkaratas/margin/fonts.css";
@import "@rberkkaratas/margin/tokens.css";
@import "@rberkkaratas/margin/base.css";
@import "@rberkkaratas/margin/components/table.css";
```

Everything is in cascade layers (`margin.tokens`, `margin.base`,
`margin.components`), so unlayered styles in your project win without
specificity tricks.

## Themes

The theme follows the operating system. Pin it with an attribute on the root
element:

```html
<html data-theme="dark">
```

Every color token is defined with `light-dark()`, so components never need
theme-specific code.

## Enforcing the rules in your project

Lint your CSS with the kit's rules: token-only colors, spacing, radii and
type; no gradients, glass, glows, hover lifts or all-caps.

```js
// stylelint.config.js
export default { extends: ["@rberkkaratas/margin/stylelint"] };
```

Check interface copy for banned words, em dashes, emoji and exclamation
marks:

```bash
npx margin-check-copy src/**/*.tsx
```

## Components

| Class | Use |
|---|---|
| `.m-button` (`--primary`, `--quiet`, `--danger`, `--sm`, `--lg`) | Actions |
| `.m-field`, `.m-input`, `.m-select` | Labelled form fields with units, hints and errors |
| `.m-table` (`--compact`, `--grid`) | Financial tables: subtotals, totals, sensitivity grids, edit in place |
| `.m-notice` (`--warning`, `--error`) | Inline messages |
| `.m-segmented` | One choice out of two to five |
| `.m-figure` | A headline number with label and note |
| `.m-num`, `.m-code` | Tabular figures, gain and loss colors, editable values, slashed zero |
| `.m-page`, `.m-prose` | Page container and reading width |

## Developing the kit

```bash
npm install
npm run check   # stylelint, contrast check (both themes), copy check
```

## License

Code: MIT. The bundled IBM Plex fonts are under the SIL Open Font License 1.1
(`src/fonts/OFL.txt`).
