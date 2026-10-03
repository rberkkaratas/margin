#!/usr/bin/env node
// Flags interface copy that reads as machine-written (DESIGN.md rules W1-W4).
// Usage: margin-check-copy <file>...   (HTML, Markdown, JSX/TSX or plain text)

import { readFileSync } from "node:fs";

const BANNED = [
  // W1: hype and filler words.
  "elevate", "seamless", "seamlessly", "unlock", "unlocks", "empower", "empowers",
  "revolutionize", "revolutionary", "supercharge", "effortless", "effortlessly",
  "cutting-edge", "game-changer", "game-changing", "next-gen", "next-generation",
  "leverage", "robust", "harness", "unleash", "delve", "world-class", "best-in-class",
  "state-of-the-art", "magical", "ai-powered", "transform your", "in today's",
  "take it to the next level", "all-in-one", "reimagine", "reimagined",
  // W3: generic calls to action.
  "get started", "learn more", "click here",
];

const PATTERNS = [
  { re: /—/g, why: "em dash in interface copy (W2)" },
  { re: /\s–\s/g, why: "spaced en dash used as a dash (W2)" },
  { re: /[✨\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, why: "emoji or dingbat (F9)" },
  { re: /[A-Za-z0-9)]!(\s|$|<)/g, why: "exclamation mark (W4)" },
];

function visibleText(source, file) {
  let text = source;
  if (/\.html?$/i.test(file)) {
    text = text
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, (m) => m.replace(/[^\n]/g, " "))
      .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/<[^>]+>/g, (m) => m.replace(/[^\n]/g, " "));
  }
  if (/\.mdx?$/i.test(file)) {
    text = text.replace(/```[\s\S]*?```/g, (m) => m.replace(/[^\n]/g, " "));
  }
  return text;
}

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("usage: margin-check-copy <file>...");
  process.exit(2);
}

let problems = 0;
for (const file of files) {
  const lines = visibleText(readFileSync(file, "utf8"), file).split("\n");
  lines.forEach((line, i) => {
    const lower = line.toLowerCase();
    for (const word of BANNED) {
      const re = new RegExp(`(^|[^a-z])${word.replace(/[-']/g, "[-' ]?")}([^a-z]|$)`);
      if (re.test(lower)) {
        console.error(`${file}:${i + 1}  banned phrase "${word}" (W1/W3)`);
        problems++;
      }
    }
    for (const { re, why } of PATTERNS) {
      re.lastIndex = 0;
      if (re.test(line)) {
        console.error(`${file}:${i + 1}  ${why}`);
        problems++;
      }
    }
  });
}

if (problems > 0) {
  console.error(`\n${problems} copy problem(s)`);
  process.exit(1);
}
console.log(`copy: ${files.length} file(s) clean`);
