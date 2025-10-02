"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// src/extension.ts
const vscode = require("vscode");
const dictionary_1 = require("./dictionary");
let enabled = false;
let hoverDisposable;
let statusItem;
/**
 * Build a regex that:
 * - matches a C/C++ keyword from our dictionary
 * - requires a non-identifier on the left (or start of line)
 * - allows no space before `<`, `(`, `::`, whitespace, or end on the right
 *
 * No lookbehind to keep compatibility with older runtimes.
 */
const KEYWORD_REGEX = (() => {
    const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const keys = Object.keys(dictionary_1.CPP_KEYWORDS)
        .map(escape)
        .sort((a, b) => b.length - a.length);
    const pattern = `(?:^|[^A-Za-z0-9_])` + // left boundary
        `(${keys.join("|")})` + // capture the keyword
        `(?=(?:\\s*<|\\s*\\(|\\s*::|\\s+|$))`; // allowed right contexts
    return new RegExp(pattern, "g");
})();
/**
 * Scan a single line to find a keyword hit that covers the character position.
 * Returns the keyword text and its [start,end) column range within the line.
 */
function findKeywordAtPosition(lineText, posCh) {
    KEYWORD_REGEX.lastIndex = 0;
    let m;
    while ((m = KEYWORD_REGEX.exec(lineText))) {
        const kw = m[1];
        // m.index points to the start of the whole match (including the left boundary char)
        // Compute the start of the captured keyword within the line:
        const start = m.index + (m[0].length - kw.length);
        const end = start + kw.length;
        if (posCh >= start && posCh <= end) {
            return { kw, start, end };
        }
        if (KEYWORD_REGEX.lastIndex === m.index)
            KEYWORD_REGEX.lastIndex++; // safety
    }
    return null;
}
function registerHover(context) {
    if (hoverDisposable) {
        hoverDisposable.dispose();
        hoverDisposable = undefined;
    }
    if (!enabled)
        return;
    hoverDisposable = vscode.languages.registerHoverProvider([{ language: "cpp" }, { language: "c" }], {
        provideHover: (document, position, _token) => {
            const line = document.lineAt(position.line).text;
            const hit = findKeywordAtPosition(line, position.character);
            if (!hit)
                return;
            const entry = (0, dictionary_1.lookup)(hit.kw);
            if (!entry)
                return;
            const range = new vscode.Range(position.line, hit.start, position.line, hit.end);
            const md = new vscode.MarkdownString(undefined, true);
            md.isTrusted = false;
            md.appendMarkdown(`**${entry.title}**\n\n`);
            md.appendMarkdown(`${entry.summary}\n\n`);
            if (entry.note)
                md.appendMarkdown(`*Note:* ${entry.note}\n`);
            if (entry.ref)
                md.appendMarkdown(`\nReference: ${entry.ref}`);
            return new vscode.Hover(md, range);
        }
    });
    context.subscriptions.push(hoverDisposable);
}
function updateStatus() {
    statusItem.text = enabled ? "C++ Explain: On" : "C++ Explain: Off";
    statusItem.tooltip = "Toggle C++ Keyword Explainer (Ctrl+Alt+E)";
    statusItem.command = "cppKeywordExplain.toggle";
    statusItem.show();
}
function activate(context) {
    statusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    context.subscriptions.push(statusItem);
    const toggle = vscode.commands.registerCommand("cppKeywordExplain.toggle", () => {
        enabled = !enabled;
        registerHover(context);
        updateStatus();
        vscode.window.setStatusBarMessage(enabled ? "C++ keyword explanations enabled" : "C++ keyword explanations disabled", 1500);
    });
    context.subscriptions.push(toggle);
    // Start disabled; user enables with Ctrl+Alt+E.
    updateStatus();
}
function deactivate() {
    hoverDisposable?.dispose();
    statusItem?.dispose();
}
//# sourceMappingURL=extension.js.map