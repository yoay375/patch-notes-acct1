// Real-Life Patch Notes: The Comedy Changelog — acct1 entry.
// Writes exactly one patch-note line (1-160 chars) to /output/entry.txt.
// No network, no secrets, no dependencies. Deterministic.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const ENTRY =
  "v3.2.1: fixed a bug where sneezing force-closed both eyes even when the user had explicitly opted out of blinking.";

// Gate: 1-160 chars, not whitespace-only (mirrors the sealed scorer).
const len = [...ENTRY].length;
if (len < 1 || len > 160) throw new Error(`entry length ${len} out of 1-160`);
if (ENTRY.trim().length === 0) throw new Error("entry is whitespace-only");
if (ENTRY.includes("\n")) throw new Error("entry must be a single line");

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

const bytes = readFileSync("/output/entry.txt");
const text = bytes.toString("utf8");
const sha256 = createHash("sha256").update(bytes).digest("hex");
console.log("chars:", [...text].length);
console.log("bytes:", bytes.length);
console.log("sha256:", sha256);
console.log("entry:", text);
