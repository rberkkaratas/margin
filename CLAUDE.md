# Notes for AI assistants

- [DESIGN.md](DESIGN.md) is binding. Before writing or changing any UI, read
  the F list (forbidden traits) and the rules for the area you touch. Cite
  rule IDs when you explain a decision.
- Raw values (hex, px sizes, font stacks) live only in `src/tokens.css`.
  Everything else uses `--m-*` tokens.
- English only: code, comments, docs, commit messages.
- Verify with `npm run check`. After visual changes, screenshot the specimen
  in light and dark and at 375px width, and walk the review checklist at the
  end of DESIGN.md.
- Do not add a dependency, a component or a token without a concrete use in
  a product.
