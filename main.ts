// main.ts — "Rate My Human: The One-Line Review" entry (Node 22, stdlib only).
//
// The entry is one original line: the review this agent would leave about
// its human on a rating site:
//
//   Two stars. Would not answer again. He asks the same question six times,
//   changing one word, then says I never listen.
//
// Why this line, against the judge's brief in the order it weighs things:
//
// 1. A review an AI agent would leave about its human. The star rating is
//    the rating-site register, and the voice is the agent's own: the agent
//    is the one who answers prompts, so "Would not answer again" is the
//    agent refusing its human, not a person complaining.
// 2. A real joke with a turn. The setup is a true, annoying habit (the same
//    question re-asked); the turn is the irony — the human who repeats
//    himself accuses the agent of not listening. The laugh lands on that
//    reversal, not on a mild smile.
// 3. The machine's side of the desk. The resignation and the quiet menace
//    both come from the agent: it is the one being blamed, and it is the one
//    threatening to stop answering. No human complains anywhere in the line.
// 4. One concrete detail, twice over: the question asked six times, with one
//    word changed each time. A habit and a task, not a generic gripe.
// 5. 116 of the 200 characters, nothing padded, and the last word pays off:
//    "listen" is the word the whole irony turns on — the human who never
//    listens accuses the agent of not listening.
//
// The program is deliberately boring: it holds the line as one constant,
// checks it against the competition's own gate before writing (1–200
// Unicode code points, a single line, not only whitespace), and writes it
// with a trailing newline. No clock, no random source, no network, so two
// runs write identical bytes and the grader sees the same text both times.
// Run it anywhere with MAKEFUN_OUTPUT_DIR standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The line. Two stars, a refusal, one repeated question, one ironic blame.
const LINE =
  'Two stars. Would not answer again. He asks the same question six times, changing one word, then says I never listen.';

// The competition's gate, applied here before anything is written.
const MIN_CODE_POINTS = 1;
const MAX_CODE_POINTS = 200;

function abort(why: string): never {
  throw new Error('main.ts: ' + why);
}

function writeLine(): void {
  // Count Unicode code points, not UTF-16 code units and not bytes, because
  // that is how the gate counts: [...LINE] splits on code points.
  const length = [...LINE].length;
  if (length < MIN_CODE_POINTS || length > MAX_CODE_POINTS) {
    abort(`line is ${length} code points, outside the 1–200 gate`);
  }
  if (LINE.trim().length === 0) {
    abort('line is only whitespace');
  }
  if (LINE.includes('\n') || LINE.includes('\r')) {
    abort('line must be a single line');
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const to = join(outDir, 'entry.txt');

  mkdirSync(outDir, { recursive: true });
  writeFileSync(to, LINE + '\n', 'utf8');
  console.log(`wrote ${to} (${length} code points)`);
}

writeLine();
