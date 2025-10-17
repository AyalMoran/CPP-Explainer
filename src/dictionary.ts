export type Entry = {
  title: string;
  version: string;
  summary: string;
  note?: string;
  ref?: string;
};

// Use CommonJS require for JSON to avoid default-interop issues at runtime
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cppKeywords = require("./cpp_keywords.json") as Record<string, Entry>;

// Normalize a token for robust lookup regardless of punctuation/underscores/case
const normalize = (s: string): string => s.replace(/[^A-Za-z_]/g, "").replace(/_/g, "").toLowerCase();

/**
 * Minimal dictionary loaded from JSON. Add as needed.
 * Explanations are concise and implementation-oriented.
 */
export const CPP_KEYWORDS: Record<string, Entry> = cppKeywords;

// Build a normalized index so we can resolve tokens seen with punctuation/angles/etc.
const NORMALIZED_INDEX: Record<string, Entry> = Object.keys(CPP_KEYWORDS).reduce((acc, key) => {
  // canonical without underscores/punctuation
  acc[normalize(key)] = CPP_KEYWORDS[key];
  // also index the raw key (exact form) for fast path
  acc[key.toLowerCase()] = CPP_KEYWORDS[key];
  return acc;
}, {} as Record<string, Entry>);

// quick lookup supports punctuation variants user might hover over
export function lookup(word: string): Entry | undefined {
  const norm = normalize(word);
  return NORMALIZED_INDEX[norm];
}
