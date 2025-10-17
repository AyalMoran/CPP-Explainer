"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// src/extension.ts
const vscode = require("vscode");
const dictionary_1 = require("./dictionary");
let enabled = true;
let hoverDisposable;
let statusItem;
let logChannel;
/**
 * Get the identifier under the cursor and its range.
 */
function getWordAtPosition(document, position) {
    const wordRange = document.getWordRangeAtPosition(position, /[A-Za-z_][A-Za-z0-9_]*/);
    if (!wordRange)
        return null;
    const kw = document.getText(wordRange);
    return { kw, start: wordRange.start.character, end: wordRange.end.character };
}
function registerHover(context) {
    if (hoverDisposable)
        return;
    hoverDisposable = vscode.languages.registerHoverProvider([{ language: "cpp" }, { language: "c" }], {
        provideHover: (document, position, _token) => {
            if (!enabled) {
                return;
            }
            const line = document.lineAt(position.line).text;
            const hit = getWordAtPosition(document, position);
            if (!hit) {
                logChannel.appendLine(`[hover] no word at position (lang=${document.languageId})`);
                return;
            }
            const entry = (0, dictionary_1.lookup)(hit.kw);
            logChannel.appendLine(`[hover] word='${hit.kw}' line='${line.trim()}'`);
            if (!entry) {
                logChannel.appendLine(`[hover] no entry for '${hit.kw}' (lang=${document.languageId})`);
                return;
            }
            logChannel.appendLine(`[hover] matched '${hit.kw}' -> ${entry.title}`);
            const range = new vscode.Range(position.line, hit.start, position.line, hit.end);
            const md = new vscode.MarkdownString(undefined, true);
            md.isTrusted = false;
            // extension header
            md.appendMarkdown(`$(book) **C++ Keyword Explainer**\n\n`);
            // title
            md.appendMarkdown(`$(symbol-keyword) **${entry.title}**\n\n`);
            // version with improved styling
            md.appendMarkdown(`$(tag) \`${entry.version}\`\n\n`);
            // summary as a callout-style blockquote
            md.appendMarkdown(`> ${entry.summary}\n\n`);
            // optional note
            if (entry.note) {
                md.appendMarkdown(`$(alert) *Note*: ${entry.note}\n\n`);
            }
            // optional reference link
            if (entry.ref) {
                // Render as a clickable link (still safe with isTrusted=false for http/https)
                md.appendMarkdown(`$(link-external) [Reference](${entry.ref})`);
            }
            // improve readability with an extra newline at end
            md.appendMarkdown(`\n`);
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
    logChannel = vscode.window.createOutputChannel("C++ Explain");
    context.subscriptions.push(logChannel);
    logChannel.appendLine("Extension activated");
    try {
        const keys = Object.keys(dictionary_1.CPP_KEYWORDS);
        logChannel.appendLine(`Dictionary loaded: ${keys.length} entries`);
        if (keys.length > 0) {
            logChannel.appendLine(`Sample keys: ${keys.slice(0, 5).join(", ")}`);
        }
    }
    catch (e) {
        logChannel.appendLine(`Dictionary inspection error: ${String(e)}`);
    }
    statusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    context.subscriptions.push(statusItem);
    const toggle = vscode.commands.registerCommand("cppKeywordExplain.toggle", () => {
        enabled = !enabled;
        updateStatus();
        vscode.window.setStatusBarMessage(enabled ? "C++ keyword explanations enabled" : "C++ keyword explanations disabled", 1500);
        logChannel.appendLine(`Toggled: ${enabled ? "enabled" : "disabled"}`);
    });
    context.subscriptions.push(toggle);
    // Register provider on activation; gate behavior by `enabled`.
    registerHover(context);
    // Start disabled; user enables with Ctrl+Alt+E.
    updateStatus();
}
function deactivate() {
    hoverDisposable?.dispose();
    statusItem?.dispose();
}
//# sourceMappingURL=extension.js.map