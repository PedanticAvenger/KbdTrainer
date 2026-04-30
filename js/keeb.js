(function (window, document, _) {
  window.onload = init;
  let frequencyMap = new Map();
  let activeLayer = "base";
  let shiftActive = false;
  let keyDefinitions = {};

  const keyboardLayout = {
    name: "Split QWERTY (No F-Row)",
    layers: ["base", "layer1", "layer2"],
    rows: [
      // Row 1: Numbers (Outermost -> Innermost)
      [
        { code: "Digit1", width: "oneU", labels: { base: "1", layer1: "F1" } },
        { code: "Digit2", width: "oneU", labels: { base: "2", layer1: "F2" } },
        { code: "Digit3", width: "oneU", labels: { base: "3", layer1: "F3" } },
        { code: "Digit4", width: "oneU", labels: { base: "4", layer1: "F4" } },
        { code: "Digit5", width: "oneU", labels: { base: "5", layer1: "F5" } },
        { code: "Digit6", width: "oneU", labels: { base: "6", layer1: "F6" } },
        { code: "Digit7", width: "oneU", labels: { base: "7", layer1: "F7" } },

        { code: "Equal", width: "oneU", labels: { base: "=", layer1: "F12" } },
        { code: "Digit0", width: "oneU", labels: { base: "0", layer1: "F11" } },
        { code: "Digit9", width: "oneU", labels: { base: "9", layer1: "F10" } },
        { code: "Digit8", width: "oneU", labels: { base: "8", layer1: "F9" } },
        { code: "Digit7", width: "oneU", labels: { base: "7", layer1: "F8" } },
        { code: "Digit6", width: "oneU", labels: { base: "6", layer1: "F7" } },
        { code: "Minus", width: "oneU", labels: { base: "-", layer1: "_" } }
      ],
      // Row 2: QWERTY Top
      [
        { code: "KeyQ", width: "oneU", labels: { base: "Q" } },
        { code: "KeyW", width: "oneU", labels: { base: "W" } },
        { code: "KeyE", width: "oneU", labels: { base: "E" } },
        { code: "KeyR", width: "oneU", labels: { base: "R" } },
        { code: "KeyT", width: "oneU", labels: { base: "T" } },
        { code: "Tab", width: "oneU", labels: { base: "Tab" } },
        { code: "Escape", width: "oneU", labels: { base: "Esc" } },

        { code: "KeyP", width: "oneU", labels: { base: "P" } },
        { code: "KeyO", width: "oneU", labels: { base: "O" } },
        { code: "KeyI", width: "oneU", labels: { base: "I" } },
        { code: "KeyU", width: "oneU", labels: { base: "U" } },
        { code: "KeyY", width: "oneU", labels: { base: "Y" } },
        { code: "Backspace", width: "oneU", labels: { base: "Bksp" } },
        { code: "Backslash", width: "oneU", labels: { base: "\\" } }
      ],
      // Row 3: QWERTY Home
      [
        { code: "KeyA", width: "oneU", labels: { base: "A" } },
        { code: "KeyS", width: "oneU", labels: { base: "S" } },
        { code: "KeyD", width: "oneU", labels: { base: "D" } },
        { code: "KeyF", width: "oneU", labels: { base: "F" } },
        { code: "KeyG", width: "oneU", labels: { base: "G" } },
        { code: "ShiftLeft", width: "oneU", labels: { base: "Shift" } },
        { code: "ControlLeft", width: "oneU", labels: { base: "Ctrl" } },

        { code: "Semicolon", width: "oneU", labels: { base: ";" } },
        { code: "KeyL", width: "oneU", labels: { base: "L" } },
        { code: "KeyK", width: "oneU", labels: { base: "K" } },
        { code: "KeyJ", width: "oneU", labels: { base: "J" } },
        { code: "KeyH", width: "oneU", labels: { base: "H" } },
        { code: "Enter", width: "oneU", labels: { base: "Enter" } },
        { code: "Quote", width: "oneU", labels: { base: "'" } }
      ],
      // Row 4: QWERTY Bottom
      [
        { code: "KeyZ", width: "oneU", labels: { base: "Z" } },
        { code: "KeyX", width: "oneU", labels: { base: "X" } },
        { code: "KeyC", width: "oneU", labels: { base: "C" } },
        { code: "KeyV", width: "oneU", labels: { base: "V" } },
        { code: "KeyB", width: "oneU", labels: { base: "B" } },
        { code: "AltLeft", width: "oneU", labels: { base: "Alt" } },
        { code: "MetaLeft", width: "oneU", labels: { base: "Win" } },

        { code: "Slash", width: "oneU", labels: { base: "/" } },
        { code: "Period", width: "oneU", labels: { base: "." } },
        { code: "Comma", width: "oneU", labels: { base: "," } },
        { code: "KeyM", width: "oneU", labels: { base: "M" } },
        { code: "KeyN", width: "oneU", labels: { base: "N" } },
        { code: "ShiftRight", width: "oneU", labels: { base: "Shift" } },
        { code: "AltRight", width: "oneU", labels: { base: "AltGr" } }
      ],
      // Row 5: Body Bottom
      [
        { code: "Space", width: "oneU", labels: { base: "ScrL" } },
        { code: "KeyL1", width: "oneU", labels: { base: "ScrR" } },

        { code: "Space", width: "oneU", labels: { base: "[" } },
        { code: "KeyL2", width: "oneU", labels: { base: "]" } }
      ],
      // Row 6: Thumb Cluster
      [
        { isFiller: true, width: "oneU" },
        { isFiller: true, width: "oneU" },
        { isFiller: true, width: "oneU" },
        { code: "Space", width: "oneU", height: "twoU", labels: { base: "Space" } },
        { code: "KeyL1", width: "oneU", labels: { base: "L1" } },

        { isFiller: true, width: "oneU" },
        { isFiller: true, width: "oneU" },
        { isFiller: true, width: "oneU" },
        { code: "Space", width: "twoU", labels: { base: "Space" } },
        { code: "KeyL2", width: "oneU", labels: { base: "L2" } }
      ]
    ]
  };

  const VALID_KEY_CODE_PATTERNS = [
    /^Key[A-Z]$/,
    /^Digit[0-9]$/,
    /^Numpad(?:[0-9]|Add|Subtract|Multiply|Divide|Decimal|Enter)$/, 
    /^F(?:[1-9]|1[0-2])$/,
    /^Arrow(?:Up|Down|Left|Right)$/,
    /^(CapsLock|Tab|Enter|Backspace|Space|Escape|ShiftLeft|ShiftRight|ControlLeft|ControlRight|AltLeft|AltRight|MetaLeft|MetaRight|ContextMenu|Insert|Delete|Home|End|PageUp|PageDown|PrintScreen|ScrollLock|NumLock|Power|Equal|Minus|Backslash|Semicolon|Quote|Comma|Period|Slash)$/
  ];

  let isValidKeyCode = function (code) {
    if (!code || typeof code !== "string") return false;
    return VALID_KEY_CODE_PATTERNS.some((pattern) => pattern.test(code));
  };

  let appendInvalidKeyCodeWarning = function (keyElement, code) {
    if (!isValidKeyCode(code)) {
      keyElement.classList.add("invalidKeyCode");
      keyElement.title = `Placeholder/unknown key code: ${code}`;
      keyElement.dataset.placeholderCode = code;
    }
  };

  let appendToLog = function (key, pressedKey) {
    let label = key;
    let keyDef = getKeyDefinition(pressedKey);
    if (keyDef) {
      let output = getOutputForKey(keyDef);
      if (output && output.label) {
        label = output.label;
      }
    }
    if (label === " ") label = "Space";

    let tempListItem = document.createElement("li");
    tempListItem.className = "logBox";
    tempListItem.textContent = label;
    const logger = document.getElementById("logHolder");
    if (logger) {
        logger.appendChild(tempListItem);
        logger.scrollLeft = logger.scrollWidth;
        setTimeout(function () {
            tempListItem.className = tempListItem.className + " show";
        }, 6);
    }
  };

  let getKeyDefinition = function (code) {
    return keyDefinitions[code] || null;
  };

  let getKeyOutputs = function (keyDef) {
    if (!keyDef) return [];
    if (Array.isArray(keyDef.outputs) && keyDef.outputs.length > 0) return keyDef.outputs;
    if (keyDef.labels) {
      return Object.keys(keyDef.labels).map((layer) => ({
        layer: layer === "shift" ? "base" : layer,
        modifier: layer === "shift" ? "shift" : "none",
        type: "label",
        label: keyDef.labels[layer]
      }));
    }
    return [];
  };

  let getOutputForKey = function (keyDef) {
    const outputs = getKeyOutputs(keyDef);
    if (outputs.length === 0) return null;
    const layerOutputs = outputs.filter((output) => output.layer === activeLayer || !output.layer);
    if (shiftActive) {
      const shifted = layerOutputs.find((output) => output.modifier === "shift");
      if (shifted) return shifted;
    }
    const defaultOutput = layerOutputs.find((output) => !output.modifier || output.modifier === "none");
    return defaultOutput || layerOutputs[0] || outputs[0];
  };

  let getActiveLabel = function (keyDef) {
    const output = getOutputForKey(keyDef);
    if (output) return output.label || "";
    if (!keyDef || !keyDef.labels) return "";
    return keyDef.labels[activeLayer] || keyDef.labels.base || "";
  };

  let getPassiveLabel = function (keyDef) {
    const output = getOutputForKey(keyDef);
    if (!keyDef || !keyDef.labels) return "";
    if (shiftActive && keyDef.labels.base) return keyDef.labels.base;
    if (!shiftActive && keyDef.labels.shift) return keyDef.labels.shift;
    return "";
  };

  let refreshKeyLabels = function () {
    document.querySelectorAll(".key").forEach((keyElement) => {
      if (!keyElement.dataset.keyCode) return;
      let keyDef = getKeyDefinition(keyElement.dataset.keyCode);
      if (!keyDef) return;
      const main = keyElement.querySelector(".mainLabel");
      const sub = keyElement.querySelector(".subLabel");
      if (main) main.textContent = getActiveLabel(keyDef);
      if (sub) sub.textContent = getPassiveLabel(keyDef);
    });
  };

  let updateFrequency = function (pressedKey) {
    frequencyMap.set(pressedKey, (frequencyMap.get(pressedKey) || 0) + 1);
    let cornerKeyId = `${pressedKey}_corner`;
    let keyElement = document.getElementById(pressedKey);
    if (!keyElement) return;
    let cornerText = document.getElementById(cornerKeyId);
    if (!cornerText) {
      cornerText = document.createElement("div");
      cornerText.id = cornerKeyId;
      cornerText.className = "cornerText";
      keyElement.prepend(cornerText);
    }
    cornerText.textContent = frequencyMap.get(pressedKey);
  };

  let downKeyDo = function (e, pressedKey) {
    let keyElement = document.getElementById(pressedKey);
    if (!keyElement) {
      appendToLog(e.key, pressedKey);
      return;
    }
    keyElement.classList.add("raise", "pressed");
    updateFrequency(pressedKey);
    appendToLog(e.key, pressedKey);
  };

  let upKeyDo = function (pressedKey) {
    let keyElement = document.getElementById(pressedKey);
    if (!keyElement) return;
    keyElement.classList.remove("raise", "pressed");
  };

  let getAlternateKeyRepresentation = function (key) {
    switch (key) {
      case "MetaLeft": return "OSLeft";
      case "MetaRight": return "OSRight";
      default: return key;
    }
  };

  let renderKey = function (keyDef) {
    const key = document.createElement("div");
    let classes = ["key"];
    
    let dims = [];
    if (keyDef.width) dims.push(keyDef.width);
    if (keyDef.height) dims.push(keyDef.height);
    if (dims.length === 0 && !keyDef.classes) dims.push("oneU");

    if (keyDef.isFiller) {
      classes = classes.concat(keyDef.classes || [...dims, "filler"]);
      key.className = classes.join(" ");
      return key;
    }

    classes = classes.concat(keyDef.classes || dims);
    key.className = classes.join(" ");
    key.id = keyDef.code;
    key.dataset.keyCode = keyDef.code;

    const mainLabel = document.createElement("div");
    mainLabel.className = "keyLabel mainLabel";
    mainLabel.textContent = getActiveLabel(keyDef);

    const subLabel = document.createElement("div");
    subLabel.className = "keyLabel subLabel";
    subLabel.textContent = getPassiveLabel(keyDef);

    key.appendChild(mainLabel);
    key.appendChild(subLabel);
    appendInvalidKeyCodeWarning(key, keyDef.code);

    keyDefinitions[keyDef.code] = keyDef;
    return key;
  };

  let renderKeyboard = function () {
    const container = document.getElementById("keyboardContainer");
    container.innerHTML = "";

    const leftSide = document.createElement("div");
    leftSide.className = "side-container side-left";
    const rightSide = document.createElement("div");
    rightSide.className = "side-container side-right";

    keyboardLayout.rows.forEach((row) => {
      const mid = Math.ceil(row.length / 2);
      const leftKeys = row.slice(0, mid);
      const rightKeys = row.slice(mid);

      const leftRowEl = document.createElement("div");
      leftRowEl.className = "row";
      leftKeys.forEach((keyDef) => leftRowEl.appendChild(renderKey(keyDef)));
      leftSide.appendChild(leftRowEl);

      const rightRowEl = document.createElement("div");
      rightRowEl.className = "row";
      rightKeys.forEach((keyDef) => rightRowEl.appendChild(renderKey(keyDef)));
      rightSide.appendChild(rightRowEl);
    });

    container.appendChild(leftSide);
    container.appendChild(rightSide);
    switchLayer(activeLayer);
  };

  let renderLayerControls = function () {
    const container = document.getElementById("layerControls");
    if (!container) return;
    container.innerHTML = "";
    keyboardLayout.layers.forEach((layer) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = layer.toUpperCase();
      button.dataset.layer = layer;
      button.className = "layerButton";
      if (layer === activeLayer) button.classList.add("active");
      button.addEventListener("click", () => switchLayer(layer));
      container.appendChild(button);
    });
  };

  let switchLayer = function (layer) {
    activeLayer = layer;
    document.querySelectorAll(".layerButton").forEach((button) => {
      button.classList.toggle("active", button.dataset.layer === layer);
    });
    refreshKeyLabels();
  };

  function init() {
    renderLayerControls();
    renderKeyboard();
    const layoutNameElement = document.getElementById("layoutName");
    if (layoutNameElement) layoutNameElement.textContent = keyboardLayout.name;

    document.body.addEventListener("keydown", (e) => {
      e.preventDefault();
      shiftActive = e.getModifierState("Shift");
      let pressedKey = getAlternateKeyRepresentation(e.code);
      refreshKeyLabels();
      downKeyDo(e, pressedKey);
    });

    document.body.addEventListener("keyup", (e) => {
      shiftActive = e.getModifierState("Shift");
      refreshKeyLabels();
      let pressedKey = getAlternateKeyRepresentation(e.code);
      upKeyDo(pressedKey);
    });

    document.getElementById("resetButton").onclick = function () {
      document.querySelectorAll(".key").forEach(k => k.classList.remove("raise", "pressed"));
      frequencyMap.clear();
      document.querySelectorAll(".cornerText").forEach(c => c.textContent = "");
    };
  }
})(window, document, undefined);