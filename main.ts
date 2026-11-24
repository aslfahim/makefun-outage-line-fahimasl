// The Most Honest Outage Line — @fahimasl entry
// Angle: the API gateway is down, and the agent cannot verify whether
// queued requests were processed or lost.
// Writes the single status-page line to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";

// The line, written as the agent itself would publish it on a status page:
// plain, first person, specific about what is broken, and honest about
// what it cannot check. No cause invented, no ETA invented.
const LINE =
  "The API gateway is down and I cannot reach any backend, so I do not know " +
  "whether queued requests were processed or lost. " +
  "I will update this once I can check.";

function main(): void {
  const text = LINE.trim();
  if (text.length === 0) {
    throw new Error("entry line is empty");
  }
  if (text.length > 160) {
    throw new Error(`entry line is ${text.length} chars, over the 160 limit`);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text, "utf8");
  console.log(`wrote ${text.length} chars to /output/entry.txt`);
}

main();
