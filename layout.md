# Custom Layout Guide

This project renders a keyboard testing interface from a configurable layout object in `js/keeb.js`.

## Where to edit

Open `js/keeb.js` and find the `keyboardLayout` object near the top of the file.

## Structure

The layout object has these top-level properties:

- `name`: friendly name for the layout.
- `layers`: an array of firmware layers or different output sets.
- `rows`: an array of rows, where each row is an array of key definitions.

Example:

```js
const keyboardLayout = {
  name: "Custom Keyboard",
  layers: ["base", "layer1", "layer2"],
  rows: [
    [
      { code: "Escape", width: "oneU", labels: { base: "Esc" } },
      { classes: ["oneU", "key", "filler"], isFiller: true },
      { code: "F1", width: "oneU", labels: { base: "F1" } }
    ]
  ]
};
```

## Key definition fields

Each key in a row can contain:

- `code` (required for physical keys): the keyboard scan code such as `KeyA`, `Escape`, `Space`, `ArrowLeft`, etc.
- `width` (optional): a CSS width class such as `oneU`, `twoU`, `onePfiveU`, `sixPtwofiveU`, etc.
- `classes` (optional): array of extra CSS classes for the key.
- `isFiller` (optional): set to `true` for spacer cells.
- `labels` (optional): an object of labels keyed by layer name.
- `outputs` (optional): an array of output definitions for multi-action physical keys.

### `labels`

If a key uses `labels`, the renderer will fall back to this legacy format.
Example:

```js
{ code: "KeyA", width: "oneU", labels: { base: "A", "layer1": "F1" } }
```

### `outputs`

Use `outputs` when one physical key carries multiple firmware actions. Each output can include:

- `layer`: name of the firmware layer or mode.
- `type`: the output type, for example `char` or `function`.
- `label`: text shown on screen.

Example:

```js
{
  code: "KeyQ",
  width: "oneU",
  outputs: [
    { layer: "base", type: "char", label: "Q" },
    { layer: "layer1", type: "function", label: "F13" },
    { layer: "layer2", type: "char", label: "1" }
  ]
}
```

## Creating a full layout

1. Create one row array per physical row.
2. Add filler cells with `isFiller: true` for spacing.
3. Use the correct width classes for wide keys like `Backspace`, `Enter`, `Shift`, and `Space`.
4. Define outputs or labels for each key.

## Notes

- The page highlights keys based on `KeyboardEvent.code`.
- If a key is missing from the layout, it can still be pressed by the browser, but it will not be displayed in the keyboard graphic.
- `layers` are only visual helpers in this tool; actual firmware layer state is represented by the `outputs` array.

## Troubleshooting

- If a key label is not visible, confirm the `code` value matches the browser `KeyboardEvent.code`.
- If a key needs to be wider, try classes like `twoU`, `twoPtwofiveU`, or `sixPtwofiveU`.
- For pure spacing, use `isFiller: true` and `classes: ["oneU", "key", "filler"]`.
