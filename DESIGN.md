# Margin design rules

These rules define how every product built on Margin looks, reads and
behaves. They are strict on purpose: a screen that breaks a rule is not
accepted until it is fixed, or until the rule itself is changed here first.

## How to use this document

- **MUST** and **NEVER** are hard rules. **SHOULD** allows an exception that is
  written down with its reason (in the pull request, and in a
  `stylelint-disable` comment when lint is involved).
- Every rule has an ID (`F3`, `N5`, ...). Reviews cite the ID instead of
  arguing taste: "violates N2".
- Rules marked **[lint]** are enforced by `@rberkkaratas/margin/stylelint`,
  **[contrast]** by `npm run check:contrast`, **[copy]** by
  `margin-check-copy`. The rest are checked in review with the checklist at the
  end.
- Rules change only through a pull request that edits this file and explains
  why. Code never quietly drifts away from the rules.

## Character

**Institutional. Editorial. Quiet.** The numbers are the loudest thing on the
screen.

Margin borrows the craft of three references, not their surface:

- **America.gov / National Design Studio:** near-monochrome pages, navy ink
  instead of black, one blue for action, a serif display face beside a plain
  grotesk, calm plain-spoken copy, visible trust markers.
- **Apple:** restraint. Hierarchy from size, weight and space instead of
  decoration; almost no shadows; hairlines; one accent; tabular figures.
- **Printed financial statements:** right-aligned figures, parentheses for
  negatives, rules above subtotals, a double rule under the total, units
  stated once.

What we deliberately do not take: America.gov's large radii, frosted glass,
blurred entrance motion and political branding; Apple's Liquid Glass.

---

## F. Forbidden: the machine-made look

These are the most recognizable traits of AI-generated and template-built
interfaces, compiled from designer critiques and teardown articles. None of
them appear in a Margin product, in any form, at any size.

| ID | Never | Notes |
|---|---|---|
| F1 | Gradients of any kind: backgrounds, text, borders, buttons, chart fills | [lint] |
| F2 | Purple, violet, indigo, magenta or pink anywhere in the interface | The only action hue is Margin blue |
| F3 | Any typeface other than IBM Plex Sans and IBM Plex Serif. Specifically never Inter, Geist, Space Grotesk, Instrument Serif, Fraunces, Poppins, Manrope, DM Sans, JetBrains Mono | [lint] T1 |
| F4 | A centered hero (headline, subline, two buttons) followed by three or six identical cards with an icon on top | |
| F5 | One large radius on everything; any radius above 10px | [lint] S1 |
| F6 | Glassmorphism: frosted, blurred or translucent panels and nav bars | [lint] |
| F7 | Glows, colored shadows, neon borders, text shadows | [lint] |
| F8 | Decorative shadows on cards; cards inside cards | [lint] S2, L6 |
| F9 | Emoji or dingbats used as icons (including ✨ for "AI"); icons placed in tinted rounded squares | [copy] |
| F10 | A pill badge above the headline ("New", "Beta ✨"); tracked-out all-caps eyebrow labels above headings | [lint] T5 |
| F11 | Hover lift, scale or glow; the same fade-up reveal on every section; count-up numbers; parallax; bounce or elastic easing | [lint] M2 |
| F12 | Blobs, mesh or aurora backgrounds, noise textures, decorative grid-line backgrounds, sparkles, particles | |
| F13 | A colored stripe on one edge of a card, notice or table row | K4 |
| F14 | The default dashboard: a row of four KPI cards with green or red delta pills, one line chart whatever the data, a zebra table | D1 |
| F15 | Gradient-filled area charts, 3D charts, donuts, pies with more than three parts, charts that decorate instead of inform | D1 |
| F16 | Generic 3D illustrations, AI-generated images, stock photos of people at laptops | |
| F17 | The "tasteful AI" palettes: cream with terracotta, beige with serif and mono, near-black with one neon accent | |
| F18 | Monospace as decoration: small mono labels, `//` prefixes, `A · B · C` meta strings | T1 |
| F19 | Fake window controls (three dots), fake browser frames, floating mockup cards | |
| F20 | The stock landing order applied by default: hero, logo strip, features, testimonials, pricing, FAQ, CTA | |
| F21 | Dark-only interfaces; medium-grey low-contrast text | C7, A1 |
| F22 | Fabricated testimonials, logos, user counts or statistics, placeholder avatars | R4 |

---

## C. Color

- **C1** Colors MUST come from `--m-color-*` tokens. No hex, named colors or
  color functions outside `tokens.css`. **[lint]**
- **C2** Neutrals make up at least 90% of any screen. The accent stays under
  about 5%. Meaning colors appear only where the meaning exists.
- **C3** The single accent (blue) means **"you can act on this"**: links,
  the primary button, focus, and user-editable values. It NEVER decorates and
  NEVER labels a data category (the one exception is D3's single highlight).
- **C4** Green means a gain or positive change. Red means a loss, a negative
  change or a destructive action. Amber means caution. None of them is ever
  used for branding or decoration (no green "Active" dots).
- **C5** Color NEVER carries meaning alone. Pair it with a sign (+ / −),
  a word, an arrow or position.
- **C6** Text is navy ink (`--m-color-text`), never pure black. The dark
  canvas is near-black navy, never pure `#000`.
- **C7** Every product ships both themes. The theme follows the operating
  system, and `<html data-theme="light|dark">` pins it. Every screen is
  reviewed in both.
- **C8** If a market reads red as "up", that is a token swap at the root,
  never a per-component change.

## T. Typography

- **T1** IBM Plex Sans for everything. IBM Plex Serif only for display
  moments (T4). No third family and no monospace: Plex figures are already
  tabular. **[lint]**
- **T2** Weights 400, 500 and 600 only. Serif is 400 only. Italic is for rare
  emphasis or titles of works, never whole paragraphs. **[lint]**
- **T3** Font size, line height and tracking come from the type scale tokens
  and travel together. Nothing is smaller than 12px. **[lint]**

  | Role | Token | Size / line | Tracking |
  |---|---|---|---|
  | Caption, axis label | `--m-text-xs` | 12 / 16 | 0 |
  | Dense table, secondary UI | `--m-text-sm` | 13 / 18 | 0 |
  | App UI, controls, tables | `--m-text-md` | 14 / 20 | 0 |
  | Reading text | `--m-text-base` | 16 / 24 | 0 |
  | Lead paragraph | `--m-text-lg` | 18 / 26 | 0 |
  | Section title (h2) | `--m-text-xl` | 22 / 28 | −0.005em |
  | Page title (h1) | `--m-text-2xl` | 28 / 34 | −0.01em |
  | Display, serif | `--m-display-sm` | 32 / 1.125 | −0.01em |
  | Display, serif | `--m-display-md` | 36→44 / 1.08 | −0.015em |
  | Display, serif | `--m-display-lg` | 40→64 / 1.04 | −0.02em |

- **T4** At most **one** serif display element per screen: the page headline
  or a headline figure. Never in tables, controls, navigation or body text.
- **T5** No all-caps text; `text-transform: uppercase` is banned. Codes such
  as USD or AAPL are content and stay as typed. Sentence case everywhere:
  headings, buttons, column headers, menu items. **[lint]**
- **T6** Reading text stays within 66 characters per line (`.m-prose`). Body
  text is 16/24, app UI 14/20, dense tables 13/18.
- **T7** Hierarchy comes from size, weight and space, not from color. A
  single component uses at most three text sizes.
- **T8** Only links are underlined, and links in running text are always
  underlined. Navigation and buttons are not.

## N. Numbers and financial data

- **N1** Figures are tabular and lining everywhere (the base styles set it).
- **N2** Numbers are right-aligned, and so are the headers of numeric
  columns. Numbers are never centered.
- **N3** A column uses one number of decimals. Percentages default to one
  decimal; money to the precision of its unit.
- **N4** Units are stated once, in the caption or header ("USD millions"),
  never repeated in every cell. Per-share values name their currency.
- **N5** Negative amounts in statements use parentheses: `(1,234.5)`. Changes
  and deltas use a sign and a true minus (U+2212): `+4.2%`, `−1.3%`. The
  hyphen-minus is never used as a minus. Format with `Intl.NumberFormat`
  (`currencySign: "accounting"`, `signDisplay: "exceptZero"`), never by hand.
- **N6** Gain and loss colors apply to **changes and returns**, not to levels.
  A negative free cash flow in a statement is ink in parentheses, not red.
- **N7** User-entered assumptions are shown in the accent blue; computed values
  in ink (the financial-model convention, and consistent with C3).
- **N8** A subtotal has a rule above it and is semibold. A grand total also
  has a double rule below it.
- **N9** Historical and projected periods are labelled with A and E
  (`2025A`, `2026E`) and separated by a vertical rule.
- **N10** Compact notation (`1.2B`) is for display only, and the full value is
  always one interaction away (tooltip, table, export).
- **N11** Missing data is shown as `n/a`, never as `0`. Cells that do not
  apply (a discount factor for a historical year) stay empty.
- **N12** Numbers never animate (no count-ups, no rolling digits).
- **N13** Separators follow the reader's locale through `Intl`. Never
  hand-format a number.

## L. Layout and spacing

- **L1** Spacing uses the 4px scale tokens only: 2 (optical nudges), 4, 8,
  12, 16, 20, 24, 32, 40, 48, 64, 96. **[lint]**
- **L2** Layouts are left-aligned. Centering is for single-element empty
  states only. There are no centered heroes.
- **L3** The page container is 1280px with a fluid 16 to 40px gutter.
- **L4** Rhythm: 4 to 8 between related items, 12 to 16 inside a group,
  24 to 32 between groups, 48 to 64 between sections. 96 only on marketing
  pages.
- **L5** Tools are dense: 14px UI, 8px cell padding. Landing-page spacing
  never goes inside a working surface.
- **L6** Separate with space first, a hairline second, a tinted surface third.
  A card is never the default container, and surfaces never nest.
- **L7** One primary action per view, placed where the task ends (end of the
  form, end of the toolbar).
- **L8** Components adapt with container queries. Page layouts use the
  breakpoints 640, 1024 and 1440px.

## S. Surfaces, borders, elevation

- **S1** Radii: 4px (small parts), 6px (controls), 10px (panels, dialogs).
  `--m-radius-round` only for circular elements. No pill buttons. **[lint]**
- **S2** Shadows only on layers that float over content: menus, popovers,
  dialogs, toasts. Panels and cards get a hairline or nothing. **[lint]**
- **S3** Borders are 1px hairlines. The double rule is reserved for grand
  totals.
- **S4** Nothing is translucent except the scrim behind a dialog, which is a
  solid tint without blur.

## K. Components

- **K1** Button labels are a verb and an object in sentence case: "Run
  valuation", "Save model". At most one primary (blue) button per view.
  Destructive buttons are red outlines and always ask for confirmation.
- **K2** Every field has a visible label. Placeholders never replace labels.
  Units sit inside the field as a suffix. Hints go below; errors go below and
  say how to fix the problem.
- **K3** Tables follow N1 to N11: no zebra striping, a hover highlight, a
  sticky header, a sticky first column when wide, and no card around them.
- **K4** Notices are a bordered or tinted block. The title states the
  problem, the body states the fix. No edge stripes.
- **K5** Icons only where they speed recognition, always next to a text label
  except for universal ones (close, search, menu). One icon set across all
  products; until it is chosen, use text.
- **K6** Every data view designs its empty, loading and error states. Loading
  keeps the layout stable; skeletons appear only after 300ms and never
  shimmer.
- **K7** Dialogs are for destructive confirmations and focused tasks only.
  Everything else happens inline.

## D. Charts

- **D1** The chart type follows the data: lines for time series, bars for
  comparing amounts (bars start at zero), waterfalls for bridges such as
  enterprise value to equity value, a table when exact values matter.
- **D2** Data is the most prominent ink. Grid lines are faint, ticks are few
  and round, axis labels are 12px tertiary. Charts have no border, card or
  background.
- **D3** One highlight color (the accent) marks the thing the text is about.
  Everything else is ink and grey.
- **D4** Every chart has a headline that states the takeaway, and a source
  line.
- **D5** Projected values are visually distinct from historical ones (lighter
  or hatched) and labelled.
- **D6** Interaction adds detail; nothing critical hides behind hover.
- **D7** Related charts share scales, colors and order.

## M. Motion

- **M1** Durations and easings come from tokens: 120ms (hover, press),
  200ms (open, close), 320ms (page-level). **[lint]**
- **M2** Motion only communicates a change of state. No entrance animations,
  no scroll reveals, no idle animation.
- **M3** With `prefers-reduced-motion`, durations drop to zero
  automatically. Motion never carries information by itself.
- **M4** On hover only color and border change. **[lint]**

## W. Writing

- **W1** Never use hype or filler words: elevate, seamless, unlock, empower,
  revolutionize, supercharge, effortless, cutting-edge, game-changer,
  next-gen, leverage, robust, harness, unleash, delve, world-class,
  best-in-class, state-of-the-art, magical, AI-powered, all-in-one,
  reimagine. **[copy]**
- **W2** No em dashes in interface copy. Use a period, comma, colon or
  parentheses. **[copy]**
- **W3** Calls to action name the outcome: "Run valuation", "Export to Excel".
  Never "Get started", "Learn more", "Submit" or "Click here". **[copy]**
- **W4** No exclamation marks. Calm, plain, second person. **[copy]**
- **W5** Sentence case everywhere. Numbers as numerals.
- **W6** Say exactly what will happen: "Delete the model 'Base case'? This
  can't be undone."
- **W7** No reflexive triads ("Fast. Simple. Secure.") and no "It's not X,
  it's Y."
- **W8** Errors say what happened and how to fix it. Never blame the reader,
  never "Oops", never jokes where money is involved.

## R. Trust

- **R1** Near sensitive actions, say who operates the product and how the
  data is used.
- **R2** Every number is traceable: its source, as-of date and the
  assumptions behind it are visible beside it or one interaction away.
- **R3** No dark patterns: no pre-checked consent, no confirm-shaming, no
  fake urgency or scarcity.
- **R4** No fabricated content of any kind (F22).
- **R5** Valuation outputs are labelled as estimates and shown with their key
  assumptions. Never "guaranteed", never investment-advice language.

## A. Accessibility

- **A1** Contrast: primary and secondary text at least 7:1, all other text at
  least 4.5:1, controls, focus rings and chart marks at least 3:1, in both
  themes. **[contrast]**
- **A2** Focus is always visible: a 2px accent outline with a 2px offset.
  Outlines are never removed.
- **A3** Targets are at least 28px on desktop and 44px on touch; the control
  tokens switch automatically on coarse pointers.
- **A4** Everything works at 200% zoom and at 320px width with no horizontal
  page scroll; wide tables scroll inside `.m-table-scroll`.
- **A5** Native elements first (`button`, `a`, `input`, `select`,
  `fieldset`); ARIA only fills gaps.
- **A6** `prefers-reduced-motion` and `forced-colors` are respected.

## Z. Stacking

- **Z1** `z-index` values come from the layer tokens. **[lint]**

---

## Review checklist

Run before any screen is shown or merged:

- [ ] `npm run lint`, contrast and copy checks pass
- [ ] Screenshots in light **and** dark
- [ ] Screenshot at 375px width; no horizontal page scroll
- [ ] Walk the F list (F1 to F22) against the screen, one by one
- [ ] One primary action; at most one serif display element
- [ ] Numbers: aligned, consistent decimals, units once, signs and negatives
      per N5, sources and dates per R2
- [ ] Keyboard-only pass: every action reachable, focus always visible
- [ ] Empty, loading and error states exist
