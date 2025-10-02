# C++ Keyword Explainer

Toggle with **Ctrl+Alt+E**. When enabled, hover C/C++ keywords like `static_cast`, `constexpr`, `noexcept`, etc., to see concise explanations.

## Features
- Works in `cpp` and `c` files.
- Status bar shows On/Off.
- Lightweight: dictionary-based, offline.

## Usage
1. Press **Ctrl+Alt+E** to enable.
2. Hover a keyword to view the tooltip.
3. Press **Ctrl+Alt+E** again to disable.

## Extend
Edit `src/dictionary.ts` and add entries to `CPP_KEYWORDS`. Rebuild.

## Build and Run
```bash
npm install
npm run watch
# Press F5 in VS Code to launch the Extension Development Host
