window.KbdLayouts = {
  pedantic_Cosmos: {
    name: "Pedantic_Cosmos",
    layers: ["base", "layer1", "layer2"],
    rows: [
      // Row 1: 7 keys per side
      {
        left: [
          { code: "Backquote", width: "oneU", labels: { base: "`", shift: "~", layer1: "F1", layer2: "" } },
          { code: "Digit1", width: "oneU", labels: { base: "1", shift: "!", layer1: "F2", layer2: "" } },
          { code: "Digit2", width: "oneU", labels: { base: "2", shift: "@", layer1: "F3", layer2: "" } },
          { code: "Digit3", width: "oneU", labels: { base: "3", shift: "#", layer1: "F4", layer2: "" } },
          { code: "Digit4", width: "oneU", labels: { base: "4", shift: "$", layer1: "F5", layer2: "" } },
          { code: "Digit5", width: "oneU", labels: { base: "5", shift: "%", layer1: "F6", layer2: "" } },
          { code: "Escape", width: "oneU", labels: { base: "Esc", shift: "Esc", layer1: "", layer2: "" } }
        ],
        right: [
          { code: "Power", width: "oneU", labels: { base: "Power", shift: "Power", layer1: "", layer2: "" } },
          { code: "Digit6", width: "oneU", labels: { base: "6", shift: "^", layer1: "F7", layer2: "" } },
          { code: "Digit7", width: "oneU", labels: { base: "7", shift: "&", layer1: "F8", layer2: "" } },
          { code: "Digit8", width: "oneU", labels: { base: "8", shift: "*", layer1: "F9", layer2: "" } },
          { code: "Digit9", width: "oneU", labels: { base: "9", shift: "(", layer1: "F10", layer2: "" } },
          { code: "Digit0", width: "oneU", labels: { base: "0", shift: ")", layer1: "F11", layer2: "/" } },
          { code: "Minus", width: "oneU", labels: { base: "-", shift: "_", layer1: "F12", layer2: "" } }
        ]
      },
      // Row 2: 7 keys per side
      {
        left: [
          { code: "Tab", width: "oneU", labels: { base: "Tab", shift: "Tab", layer1: "", layer2: "" } },
          { code: "KeyQ", width: "oneU", labels: { base: "q", shift: "Q", layer1: "", layer2: "" } },
          { code: "KeyW", width: "oneU", labels: { base: "w", shift: "W", layer1: "", layer2: "" } },
          { code: "KeyE", width: "oneU", labels: { base: "e", shift: "E", layer1: "Pg_Up", layer2: "" } },
          { code: "KeyR", width: "oneU", labels: { base: "r", shift: "R", layer1: "Home", layer2: "" } },
          { code: "KeyT", width: "oneU", labels: { base: "t", shift: "T", layer1: "", layer2: "" } },
          { code: "M_Left", width: "oneU", labels: { base: "ML", shift: "MR", layer1: "", layer2: "" } }
        ],
        right: [
          { code: "M_Right", width: "oneU", labels: { base: "MR", shift: "MR", layer1: "", layer2: "" } },
          { code: "KeyY", width: "oneU", labels: { base: "y", shift: "Y", layer1: "", layer2: "" } },
          { code: "KeyU", width: "oneU", labels: { base: "u", shift: "U", layer1: "", layer2: "7" } },
          { code: "KeyI", width: "oneU", labels: { base: "i", shift: "I", layer1: "", layer2: "8" } },
          { code: "KeyO", width: "oneU", labels: { base: "o", shift: "O", layer1: "", layer2: "9" } },
          { code: "KeyP", width: "oneU", labels: { base: "p", shift: "P", layer1: "", layer2: "*" } },
          { code: "Backslash", width: "oneU", labels: { base: "\\", shift: "|", layer1: "", layer2: "" } }
        ]
      },
      // Row 3: 7 keys per side
      {
        left: [
          { code: "CapsLock", width: "oneU", labels: { base: "Caps", shift: "Caps", layer1: "", layer2: "" } },
          { code: "KeyA", width: "oneU", labels: { base: "a", shift: "A", layer1: "", layer2: "" } },
          { code: "KeyS", width: "oneU", labels: { base: "s", shift: "S", layer1: "", layer2: "" } },
          { code: "KeyD", width: "oneU", labels: { base: "d", shift: "D", layer1: "Pg_Dn", layer2: "" } },
          { code: "KeyF", width: "oneU", labels: { base: "f", shift: "F", layer1: "End", layer2: "" } },
          { code: "KeyG", width: "oneU", labels: { base: "g", shift: "G", layer1: "", layer2: "" } },
          { code: "L2_Left", width: "oneU", labels: { base: "L2", shift: "L2", layer1: "", layer2: "" } }
        ],
        right: [
          { code: "L2_Right", width: "oneU", labels: { base: "L2", shift: "L2", layer1: "", layer2: "" } },
          { code: "KeyH", width: "oneU", labels: { base: "h", shift: "H", layer1: "", layer2: "" } },
          { code: "KeyJ", width: "oneU", labels: { base: "j", shift: "J", layer1: "", layer2: "4" } },
          { code: "KeyK", width: "oneU", labels: { base: "k", shift: "K", layer1: "", layer2: "5" } },
          { code: "KeyL", width: "oneU", labels: { base: "l", shift: "L", layer1: "", layer2: "6" } },
          { code: "Semicolon", width: "oneU", labels: { base: ";", shift: ":", layer1: "", layer2: "-" } },
          { code: "Quote", width: "oneU", labels: { base: "'", shift: "\"", layer1: "", layer2: "" } }
        ]
      },
      // Row 4: 6 keys per side
      {
        left: [
          { code: "ShiftLeft", width: "oneU", labels: { base: "Shift", shift: "Shift", layer1: "", layer2: "" } },
          { code: "KeyZ", width: "oneU", labels: { base: "z", shift: "Z", layer1: "", layer2: "" } },
          { code: "KeyX", width: "oneU", labels: { base: "x", shift: "X", layer1: "", layer2: "" } },
          { code: "KeyC", width: "oneU", labels: { base: "c", shift: "C", layer1: "", layer2: "" } },
          { code: "KeyV", width: "oneU", labels: { base: "v", shift: "V", layer1: "", layer2: "" } },
          { code: "KeyB", width: "oneU", labels: { base: "b", shift: "B", layer1: "", layer2: "" } }
        ],
        right: [
          { code: "KeyN", width: "oneU", labels: { base: "n", shift: "N", layer1: "", layer2: "" } },
          { code: "KeyM", width: "oneU", labels: { base: "m", shift: "M", layer1: "", layer2: "1" } },
          { code: "Comma", width: "oneU", labels: { base: ",", shift: "<", layer1: "", layer2: "2" } },
          { code: "Period", width: "oneU", labels: { base: ".", shift: ">", layer1: "", layer2: "3" } },
          { code: "Slash", width: "oneU", labels: { base: "/", shift: "?", layer1: "", layer2: "+" } },
          { code: "ShiftRight", width: "oneU", labels: { base: "Shift", shift: "Shift", layer1: "", layer2: "" } }
        ]
      },
      // Row 5: 2 keys per side, offset to align under keys 3-4 of row 4
      {
        left: [
          { classes: ["oneU", "key", "filler"], isFiller: true },
          { classes: ["oneU", "key", "filler"], isFiller: true },
          { code: "Scr_Left", width: "oneU", labels: { base: "", shift: "", layer1: "Scr-L", layer2: "" } },
          { code: "Equal", width: "oneU", labels: { base: "=", shift: "+", layer1: "Scr-R", layer2: "" } }
        ],
        right: [
          { code: "BracketLeft", width: "oneU", labels: { base: "[", shift: "{", layer1: "", layer2: "0" } },
          { code: "BracketRight", width: "oneU", labels: { base: "]", shift: "}", layer1: "", layer2: "" } },
          { classes: ["oneU", "key", "filler"], isFiller: true },
          { classes: ["oneU", "key", "filler"], isFiller: true }
        ]
      },
      // Thumb cluster: Row 1 (3 keys per side)
      {
        left: [
          { classes: ["twoU", "key", "filler"], isFiller: true },
          { classes: ["twoU", "key", "filler"], isFiller: true },
          { code: "Backspace", width: "oneU", height: "onePfiveUH", labels: { base: "BkSpc", shift: "BkSpc", layer1: "", layer2: "" } },
          { code: "Space", width: "oneU", height: "onePfiveUH", labels: { base: "Spc", shift: "Spc", layer1: "", layer2: "" } },
          { code: "L1", width: "oneU", labels: { base: "L1", shift: "L1", layer1: "", layer2: "" } }
        ],
        right: [
          { code: "L1", width: "oneU", labels: { base: "L1", shift: "L1", layer1: "", layer2: "" } },
          { code: "Space", width: "oneU", height: "onePfiveUH", labels: { base: "Spc", shift: "Spc", layer1: "", layer2: "" } },
          { code: "Enter", width: "oneU", height: "onePfiveUH", labels: { base: "Enter", shift: "Enter", layer1: "", layer2: "" } },
          { classes: ["twoU", "key", "filler"], isFiller: true },
          { classes: ["twoU", "key", "filler"], isFiller: true }
        ]
      },
      // Thumb cluster: Row 2 (3 keys per side)
      {
        left: [
          { classes: ["twoU", "key", "filler"], isFiller: true },
          { classes: ["twoU", "key", "filler"], isFiller: true },
          { code: "MetaLeft", width: "oneU", labels: { base: "Win", shift: "Win", layer1: "", layer2: "" } },
          { code: "ControlLeft", width: "oneU", labels: { base: "Ctrl", shift: "Ctrl", layer1: "", layer2: "" } },
          { code: "AltLeft", width: "oneU", labels: { base: "Alt", shift: "Alt", layer1: "", layer2: "" } }
        ],
        right: [
          { code: "AltRight", width: "oneU", labels: { base: "Alt", shift: "Alt", layer1: "", layer2: "" } },
          { code: "ControlRight", width: "oneU", labels: { base: "Ctrl", shift: "Ctrl", layer1: "", layer2: "" } },
          { code: "Delete", width: "oneU", labels: { base: "Del", shift: "Del", layer1: "", layer2: "" } },
          { classes: ["twoU", "key", "filler"], isFiller: true },
          { classes: ["twoU", "key", "filler"], isFiller: true }
        ]
      }
    ]
  },
  qwertyNoFRow: {
    name: "Standard QWERTY (110Key)",
    layers: ["base", "layer1", "layer2"],
    rows: [
      // ... your QWERTY row arrays go here similar to above, etc. ...
    ]
  }
};