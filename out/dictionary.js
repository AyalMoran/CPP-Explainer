"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CPP_KEYWORDS = void 0;
exports.lookup = lookup;
// Use CommonJS require for JSON to avoid default-interop issues at runtime
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cppKeywords = require("./cpp_keywords.json");
// Normalize a token for robust lookup regardless of punctuation/underscores/case
const normalize = (s) => s.replace(/[^A-Za-z_]/g, "").replace(/_/g, "").toLowerCase();
/**
 * Minimal dictionary loaded from JSON. Add as needed.
 * Explanations are concise and implementation-oriented.
 */
exports.CPP_KEYWORDS = cppKeywords;
// Build a normalized index so we can resolve tokens seen with punctuation/angles/etc.
const NORMALIZED_INDEX = Object.keys(exports.CPP_KEYWORDS).reduce((acc, key) => {
    // canonical without underscores/punctuation
    acc[normalize(key)] = exports.CPP_KEYWORDS[key];
    // also index the raw key (exact form) for fast path
    acc[key.toLowerCase()] = exports.CPP_KEYWORDS[key];
    return acc;
}, {});
// quick lookup supports punctuation variants user might hover over
function lookup(word) {
    const norm = normalize(word);
    return NORMALIZED_INDEX[norm];
}
//# sourceMappingURL=dictionary.js.map