# Changelog

All notable changes to the **GTK CSS** extension will be documented in this file.

## [0.3.0] - 2026-03-14

### Added
- `@define-color` completion provider: typing `@` inside a GTK CSS file now shows all color variables defined in the document, with their values as detail and documentation.
- `extension.js` activation entry point for the completion provider.

### Fixed
- `@import url('...')` with single-quoted strings was being incorrectly tokenized due to `gtk-color-reference` pattern matching `@import`. Added negative lookahead to exclude all standard CSS at-rule keywords.

## [0.2.0] - 2026-03-14

### Changed
- **Architecture change**: switched from TextMate injection grammar to a **dedicated language** (`gtk-css`). This eliminates all CSS Language Server parse errors (`Unknown at rule`, `} expected`, etc.) caused by GTK-specific syntax like `alpha(@color, 0.9)`.
- Added `language-configuration.json` with bracket matching, auto-closing pairs and comment tokens.

## [0.1.0] - 2026-03-14

### Added
- Initial release.
- TextMate injection grammar for `source.css` with support for:
  - `@define-color` at-rule highlighting
  - GTK color variable references (`@color_name`)
  - GTK color functions: `alpha()`, `shade()`, `mix()`, `lighter()`, `darker()`
  - `-gtk-` prefixed properties (e.g. `-gtk-icon-effect`)
  - GTK widget element selectors (`window`, `button`, `menuitem`, `tooltip`, `headerbar`, etc.)
- CSS Language Server custom data (`css.customData`) for hover documentation on GTK at-rules and properties.
