/**
 * Margin stylelint config: the kit's visual rules as lint errors.
 *
 * Consuming projects use it as-is:
 *
 *   // stylelint.config.js
 *   export default { extends: ["@rberkkaratas/margin/stylelint"] };
 *
 * Every rule maps to a rule ID in DESIGN.md. An exception needs a
 * `stylelint-disable-next-line <rule> -- <reason>` comment; disables without
 * a reason fail the build.
 */

// One spacing value: 0, auto, a Margin token, or calc() built from a token.
const SPACE_PART =
  String.raw`(?:0|auto|var\(--m-[a-z0-9-]+\)|calc\((?=[^;]*var\(--m-)(?:[^()]|\([^()]*\))*\))`;
const SPACE_VALUE = new RegExp(String.raw`^${SPACE_PART}(?:\s+${SPACE_PART}){0,3}$`);

export default {
  reportDescriptionlessDisables: true,
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  rules: {
    // C1: colors come from tokens only. No hex, named colors or color functions.
    "color-no-hex": true,
    "color-named": "never",
    "function-disallowed-list": [
      "rgb", "rgba", "hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch",
      // F1: no gradients of any kind.
      "linear-gradient", "radial-gradient", "conic-gradient",
      "repeating-linear-gradient", "repeating-radial-gradient", "repeating-conic-gradient",
    ],

    // F6, F7: no glass, glows, blurs or text shadows.
    "property-disallowed-list": [
      "backdrop-filter", "-webkit-backdrop-filter", "filter", "text-shadow",
    ],

    // F11: nothing lifts, grows or spins on hover.
    "rule-selector-property-disallowed-list": {
      "/:hover/": ["transform", "scale", "translate", "rotate", "box-shadow", "filter"],
    },

    // T5: no all-caps text.
    "declaration-property-value-disallowed-list": {
      "text-transform": ["uppercase"],
    },

    "declaration-property-value-allowed-list": {
      // T1, T2: Plex Sans and Plex Serif through tokens; three weights only.
      "font-family": [/^var\(--m-font-(sans|serif)\)$/, "inherit"],
      "font-weight": [/^var\(--m-weight-(regular|medium|semibold)\)$/, "inherit"],
      // T3: sizes, line heights and tracking from the type scale.
      "font-size": [/^var\(--m-(text|display)-[a-z0-9-]+\)$/, "inherit", "100%"],
      "line-height": [/^var\(--m-[a-z0-9-]*leading[a-z0-9-]*\)$/, "1", "normal", "inherit"],
      "letter-spacing": [/^var\(--m-[a-z0-9-]*tracking[a-z0-9-]*\)$/, "0", "normal", "inherit"],
      "font": ["inherit"],
      // L1: spacing on the 4px scale.
      "/^(margin|padding)(-.+)?$/": [SPACE_VALUE],
      "/^(gap|row-gap|column-gap)$/": [SPACE_VALUE],
      // S1: three radii plus round.
      "border-radius": [/^var\(--m-radius-(sm|md|lg|round)\)$/, "0", "inherit"],
      // S2: shadows only on floating layers.
      "box-shadow": ["none", /^var\(--m-shadow-overlay\)$/],
      // M1: motion durations and easings from tokens.
      "transition-duration": [/^var\(--m-duration-[a-z]+\)$/, "0s"],
      "animation-duration": [/^var\(--m-duration-[a-z]+\)$/],
      "transition-timing-function": [/^var\(--m-ease-[a-z]+\)$/],
      "animation-timing-function": [/^var\(--m-ease-[a-z]+\)$/, "linear", "steps(.+)"],
      "transition": ["none", /var\(--m-duration-[a-z]+\)/],
      // Z1: stacking from the layer tokens.
      "z-index": [/^(var\(--m-z-[a-z]+\)|calc\(var\(--m-z-[a-z]+\) [+-] \d\)|-1|0|1|auto)$/],
    },

    "declaration-no-important": true,
    "selector-max-id": 0,
  },
};
