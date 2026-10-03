import margin from "./stylelint/index.js";

export default {
  ...margin,
  overrides: [
    {
      // The token file is the one place raw values are defined.
      files: ["src/tokens.css", "src/fonts.css"],
      rules: {
        "color-no-hex": null,
        "function-disallowed-list": null,
        "declaration-property-value-allowed-list": null,
      },
    },
  ],
};
