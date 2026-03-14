# GTK CSS

Syntax highlighting and IntelliSense for GTK-specific CSS, seamlessly supporting Waybar, GNOME Shell themes, and any GTK application stylesheet.

## Features

### `@define-color` support
Define named color variables and reference them anywhere in the file:
```css
@define-color base #24273a;
@define-color overlay alpha(@base, 0.9);
```

### Color variable IntelliSense
Type `@` anywhere in a value and get instant completions for all colors defined with `@define-color` in the current file — with the resolved value shown as detail.

### GTK color functions
Full highlighting for GTK built-in color functions:
- `alpha(color, factor)` — sets opacity
- `shade(color, factor)` — darkens or lightens
- `mix(color1, color2, factor)` — blends two colors
- `lighter(color)` / `darker(color)` — convenience shorthands

### `-gtk-` prefixed properties
Highlights GTK-specific CSS properties such as `-gtk-icon-effect`, `-gtk-icon-size`, `-gtk-icon-style`, `-gtk-dpi`, and more.

### GTK widget element selectors
Recognizes GTK widget names used as element selectors: `window`, `button`, `headerbar`, `menuitem`, `tooltip`, `popover`, `listbox`, `scrollbar`, and many more.

## Usage

### New files
Create files with the `.gtk.css` extension — the GTK CSS language mode will activate automatically.

### Existing `.css` files
Open the Command Palette (`Ctrl+Shift+P`) and run **Change Language Mode → GTK CSS**.

To apply this automatically for an entire project, add to `.vscode/settings.json`:
```json
{
  "files.associations": {
    "*.css": "gtk-css"
  }
}
```

## Why a dedicated language mode?

GTK CSS uses syntax that is not valid standard CSS — for example `@define-color` and `@color-name` references inside function arguments like `alpha(@base, 0.9)`. Using a dedicated language mode instead of injecting into CSS prevents the built-in CSS Language Server from raising false parse errors and validation warnings on perfectly valid GTK stylesheets.

## License

[MIT](LICENSE)
