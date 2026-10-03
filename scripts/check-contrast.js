#!/usr/bin/env node
// Checks WCAG 2.2 contrast for every token pair that must stay readable, in
// both themes. Reads the light-dark() values straight from src/tokens.css so
// a palette change cannot ship without passing (DESIGN.md rule A1).

import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/tokens.css", import.meta.url), "utf8");

const tokens = {};
for (const [, name, light, dark] of css.matchAll(
  /--m-color-([a-z0-9-]+):\s*light-dark\((#[0-9a-f]{6}),\s*(#[0-9a-f]{6})\)/gi,
)) {
  tokens[name] = { light, dark };
}

const surfaces = ["canvas", "surface", "surface-sunken", "surface-raised"];
const checks = [
  // [foreground, backgrounds, minimum ratio, why]
  ["text", surfaces, 7, "primary text (AAA)"],
  ["text-secondary", surfaces, 7, "secondary text (AAA)"],
  ["text-tertiary", surfaces, 4.5, "tertiary text (AA)"],
  ["accent", surfaces, 4.5, "links and editable values"],
  ["positive", surfaces, 4.5, "gain figures"],
  ["negative", surfaces, 4.5, "loss figures"],
  ["warning", surfaces, 4.5, "warning text"],
  ["text-on-accent", ["accent-fill", "accent-fill-hover"], 4.5, "primary button label"],
  ["border-control", ["canvas", "surface", "surface-sunken"], 3, "input outlines (non-text)"],
  ["focus", surfaces, 3, "focus ring (non-text)"],
  ["chart-primary", ["canvas", "surface"], 3, "main chart series (non-text)"],
  ["chart-secondary", ["canvas", "surface"], 3, "comparison chart series (non-text)"],
];

function luminance(hex) {
  const channel = (i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

let failures = 0;
for (const theme of ["light", "dark"]) {
  for (const [fg, backgrounds, min, why] of checks) {
    for (const bg of backgrounds) {
      if (!tokens[fg] || !tokens[bg]) {
        console.error(`missing token: --m-color-${tokens[fg] ? bg : fg}`);
        failures++;
        continue;
      }
      const r = ratio(tokens[fg][theme], tokens[bg][theme]);
      if (r < min) {
        console.error(
          `FAIL ${theme}: ${fg} on ${bg} is ${r.toFixed(2)}:1, needs ${min}:1 (${why})`,
        );
        failures++;
      }
    }
  }
}

if (failures > 0) {
  process.exit(1);
}
console.log(`contrast: all ${checks.length} token pairs pass in both themes`);
