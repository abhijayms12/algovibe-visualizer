#!/usr/bin/env node
// Fullmetal Alchemist: Equivalent Exchange Formula Builder
// Single-file solution. Reads N formulas in the form "INPUT -> OUTPUT" and
// prints EQUIVALENT or NOT_EQUIVALENT with Missing/Extra element lists.
// Uses recursion + stack-like parsing to handle nested parentheses and multipliers.
// Sample I/O (for quick manual test):
// INPUT
// 3
// H2,O -> H2O
// Fe,O3 -> Fe2O3
// C,O2 -> CO2
// OUTPUT
// EQUIVALENT
// NOT_EQUIVALENT: Missing Fe
// EQUIVALENT

// parseFormula: recursively parse formula string s starting at index i.
// Returns an object { counts: Map, pos: nextIndex }
export function parseFormula(s, i = 0) {
  const n = s.length;
  const counts = new Map();

  while (i < n) {
    const ch = s[i];

    if (ch === '(') {
      // parse inner group
      const res = parseFormula(s, i + 1);
      const sub = res.counts;
      i = res.pos;
      // read multiplier (if any)
      let num = '';
      while (i < n && /\d/.test(s[i])) { num += s[i++]; }
      const mult = num ? parseInt(num, 10) : 1;
      for (const [k, v] of sub) {
        counts.set(k, (counts.get(k) || 0) + v * mult);
      }

    } else if (ch === ')') {
      // end of this group
      return { counts, pos: i + 1 };

    } else if (/[A-Z]/.test(ch)) {
      // element symbol: uppercase then optional lowercase letters
      let elem = ch;
      i++;
      while (i < n && /[a-z]/.test(s[i])) { elem += s[i++]; }
      // count (digits) if any
      let num = '';
      while (i < n && /\d/.test(s[i])) { num += s[i++]; }
      const cnt = num ? parseInt(num, 10) : 1;
      counts.set(elem, (counts.get(elem) || 0) + cnt);

    } else if (ch === ',' || ch === ' ' ) {
      // skip separators
      i++;
    } else {
      // unexpected characters: skip (keeps parser robust)
      i++;
    }
  }

  return { counts, pos: i };
}

// compareMaps: compare left -> right element counts
// returns the required output string per problem statement
export function compareMaps(leftMap, rightMap) {
  const missing = [];
  const extra = [];

  const all = new Set([...leftMap.keys(), ...rightMap.keys()]);
  for (const k of all) {
    const l = leftMap.get(k) || 0;
    const r = rightMap.get(k) || 0;
    if (l < r) missing.push(k);
    else if (l > r) extra.push(k);
  }

  if (missing.length === 0 && extra.length === 0) return 'EQUIVALENT';

  // Sort for deterministic output
  missing.sort();
  extra.sort();

  let msg = 'NOT_EQUIVALENT: ';
  if (missing.length) msg += 'Missing ' + missing.join(',');
  if (extra.length) {
    if (missing.length) msg += ' and ';
    msg += 'Extra ' + extra.join(',');
  }
  return msg;
}

// Helper: process a single line "LEFT -> RIGHT" and return result string
export function evaluateLine(inputLine) {
  const line = String(inputLine || '').replace(/\s+/g, '');
  const parts = line.split('->');
  if (parts.length !== 2) return 'NOT_EQUIVALENT: Malformed';
  const leftRes = parseFormula(parts[0]);
  const rightRes = parseFormula(parts[1]);
  return compareMaps(leftRes.counts, rightRes.counts);
}

// Node CLI entry: read stdin and print results. Only runs in Node environments.
async function runCliIfNode() {
  const isNode = typeof process !== 'undefined' && typeof window === 'undefined';
  if (!isNode) return;
  try {
    const { readFileSync } = await import('node:fs');
    const raw = readFileSync(0, 'utf8');
    if (!raw) return;
    const lines = raw
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length && l !== 'INPUT' && l !== 'OUTPUT');
    if (lines.length === 0) return;

    const N = parseInt(lines[0], 10);
    if (isNaN(N)) return;

    const outputs = [];
    for (let idx = 1; idx <= N && idx < lines.length; idx++) {
      outputs.push(evaluateLine(lines[idx]));
    }
    // eslint-disable-next-line no-console
    console.log(outputs.join('\n'));
  } catch (_) {
    // ignore in browser/build
  }
}

runCliIfNode();

// Default export: a visualization-friendly algorithm object so App.jsx can consume it.
// This does NOT modify or replace the DSA above; it's an additive wrapper for the UI.
const visualAlgo = {
  id: 'equivalent-exchange-demo',
  name: 'Equivalent Exchange (Demo)',
  /**
   * Produce harmless visualization steps over the numeric array.
   * We only emit 'compare' highlights to demonstrate the UI without changing data.
   */
  getSteps(arr) {
    const n = Array.isArray(arr) ? arr.length : 0;
    const steps = [];
    if (n <= 1) return steps;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        steps.push({ type: 'compare', i: j, j: j + 1 });
      }
    }
    return steps;
  },
};

export default visualAlgo;
