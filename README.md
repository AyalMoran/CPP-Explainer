# C++ Keyword Explainer

![chrome_wCbLhEp59f](/logo.png)


Quit alt-tabbing to docs. Hover the scary words. Get the gist fast.

Hover C/C++ keywords like `constexpr`, `static_cast`, `noexcept`, and more to see concise, implementation-oriented explanations — right in the editor.

Status bar shows the current state. Toggle anytime with **Ctrl+Alt+E**.

## Features
- Works in `cpp` and `c` files
- Fast, offline, dictionary-based lookups
- Clean tooltips: title, standard version, summary, optional note + reference link
- Status bar indicator: "C++ Explain: On/Off"

## Usage
1. Open a C or C++ file.
2. Ensure the status bar reads "C++ Explain: On".
3. Hover a keyword/token to view the tooltip.
4. Press **Ctrl+Alt+E** to toggle On/Off at any time.

Default keybinding: `Ctrl+Alt+E` (command: `cppKeywordExplain.toggle`).
Engine compatibility: requires VS Code `^1.90.0`.

## How it works
- A small dictionary powers lookups on hover. Tokens are normalized (punctuation/underscores/case) so things like `std::move`, `move`, and `std :: move` resolve consistently.
- The hover provider only shows tooltips when the extension is enabled.
- The output channel "C++ Explain" logs lookups and diagnostics.

## Extending the dictionary
Add or edit entries in the JSON file, then rebuild.

1) Edit:
```
src/cpp_keywords.json
```

Each entry looks like:
```json
"constexpr": {
  "title": "constexpr",
  "version": "since C++11",
  "summary": "Indicates evaluation at compile time when possible.",
  "note": "Rules evolved in C++14/17/20.",
  "ref": "https://en.cppreference.com/w/cpp/language/constexpr"
}
```

2) Build:
```bash
npm run compile
```

The build copies `src/cpp_keywords.json` to `out/cpp_keywords.json` for runtime.

## Commands and keybindings
- Command: `cppKeywordExplain.toggle` — toggles On/Off
- Default keybinding: `Ctrl+Alt+E` (when editor has focus)

## Troubleshooting
- No tooltip appears:
  - Check the status bar reads "C++ Explain: On"; if not, press `Ctrl+Alt+E`.
  - Ensure the file language is detected as `C` or `C++`.
  - Open the output channel: View → Output → "C++ Explain" to see logs.
- After editing `src/cpp_keywords.json`, rebuild with `npm run compile` (or run `npm run watch`).

## Contributing
PRs to improve explanations, expand coverage, or enhance UX are welcome. Keep entries concise and implementation-focused, and prefer reputable references (e.g., cppreference).

## License
MIT
