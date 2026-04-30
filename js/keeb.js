(function (window, document, _) {
  window.onload = init;
  let frequencyMap = new Map();
  let activeLayer = "base";
  let shiftActive = false;
  let keyDefinitions = {};

  const keyboardLayout = {
    name: "PedanticCosmos",
    layers: ["base", "layer1", "layer2"],
    // 5 main rows per side (7-7-7-6-2 key distribution) plus 2 thumb cluster rows
    rows: [
      // Row 1: 7 keys per side
      [
        { code: "`", width: "oneU", labels: { base: "`", layer1: "L01", layer2: "L01" } },
        { code: "Digit1", width: "oneU", labels: { base: "1", layer1: "L02", layer2: "L02" } },
        { code: "Digit2", width: "oneU", labels: { base: "2", layer1: "L03", layer2: "L03" } },
        { code: "Digit3", width: "oneU", labels: { base: "3", layer1: "L04", layer2: "L04" } },
        { code: "Digit4", width: "oneU", labels: { base: "4", layer1: "L05", layer2: "L05" } },
        { code: "Digit5", width: "oneU", labels: { base: "5", layer1: "L06", layer2: "L06" } },
        { code: "Escape", width: "oneU", labels: { base: "Escape", layer1: "L07", layer2: "L07" } },

        { code: "Power", width: "oneU", labels: { base: "Power", layer1: "R01", layer2: "R01" } },
        { code: "Digit6", width: "oneU", labels: { base: "6", layer1: "R02", layer2: "R02" } },
        { code: "Digit7", width: "oneU", labels: { base: "7", layer1: "R03", layer2: "R03" } },
        { code: "Digit8", width: "oneU", labels: { base: "8", layer1: "R04", layer2: "R04" } },
        { code: "Digit9", width: "oneU", labels: { base: "9", layer1: "R05", layer2: "R05" } },
        { code: "Digit0", width: "oneU", labels: { base: "0", layer1: "R06", layer2: "R06" } },
        { code: "R07", width: "oneU", labels: { base: "-", layer1: "R07", layer2: "R07" } }
      ],
      // Row 2: 7 keys per side
      [
        { code: "L08", width: "oneU", labels: { base: "Tab", layer1: "L08", layer2: "L08" } },
        { code: "L09", width: "oneU", labels: { base: "Q", layer1: "L09", layer2: "L09" } },
        { code: "L10", width: "oneU", labels: { base: "W", layer1: "L10", layer2: "L10" } },
        { code: "L11", width: "oneU", labels: { base: "E", layer1: "L11", layer2: "L11" } },
        { code: "L12", width: "oneU", labels: { base: "R", layer1: "L12", layer2: "L12" } },
        { code: "L13", width: "oneU", labels: { base: "T", layer1: "L13", layer2: "L13" } },
        { code: "L14", width: "oneU", labels: { base: "MetaLeft", layer1: "L14", layer2: "L14" } },

        { code: "R08", width: "oneU", labels: { base: "MetaRight", layer1: "R08", layer2: "R08" } },
        { code: "R09", width: "oneU", labels: { base: "Y", layer1: "R09", layer2: "R09" } },
        { code: "R10", width: "oneU", labels: { base: "U", layer1: "R10", layer2: "R10" } },
        { code: "R11", width: "oneU", labels: { base: "I", layer1: "R11", layer2: "R11" } },
        { code: "R12", width: "oneU", labels: { base: "O", layer1: "R12", layer2: "R12" } },
        { code: "R13", width: "oneU", labels: { base: "P", layer1: "R13", layer2: "R13" } },
        { code: "R14", width: "oneU", labels: { base: "\\", layer1: "R14", layer2: "R14" } }
      ],
      // Row 3: 7 keys per side
      [
        { code: "L15", width: "oneU", labels: { base: "L15", layer1: "L15", layer2: "L15" } },
        { code: "L16", width: "oneU", labels: { base: "L16", layer1: "L16", layer2: "L16" } },
        { code: "L17", width: "oneU", labels: { base: "L17", layer1: "L17", layer2: "L17" } },
        { code: "L18", width: "oneU", labels: { base: "L18", layer1: "L18", layer2: "L18" } },
        { code: "L19", width: "oneU", labels: { base: "L19", layer1: "L19", layer2: "L19" } },
        { code: "L20", width: "oneU", labels: { base: "L20", layer1: "L20", layer2: "L20" } },
        { code: "L21", width: "oneU", labels: { base: "L21", layer1: "L21", layer2: "L21" } },

        { code: "R15", width: "oneU", labels: { base: "R16", layer1: "R16", layer2: "R15" } },
        { code: "R16", width: "oneU", labels: { base: "R17", layer1: "R17", layer2: "R16" } },
        { code: "R17", width: "oneU", labels: { base: "R17", layer1: "R17", layer2: "R17" } },
        { code: "R18", width: "oneU", labels: { base: "R18", layer1: "R18", layer2: "R18" } },
        { code: "R19", width: "oneU", labels: { base: "R19", layer1: "R19", layer2: "R19" } },
        { code: "R20", width: "oneU", labels: { base: "R20", layer1: "R20", layer2: "R20" } },
        { code: "R21", width: "oneU", labels: { base: "R21", layer1: "R21", layer2: "R21" } }
      ],
      // Row 4: 6 keys per side
      [
        { code: "L22", width: "oneU", labels: { base: "L22", layer1: "L22", layer2: "L22" } },
        { code: "L23", width: "oneU", labels: { base: "L23", layer1: "L23", layer2: "L23" } },
        { code: "L24", width: "oneU", labels: { base: "L24", layer1: "L24", layer2: "L24" } },
        { code: "L25", width: "oneU", labels: { base: "L25", layer1: "L25", layer2: "L25" } },
        { code: "L26", width: "oneU", labels: { base: "L26", layer1: "L26", layer2: "L26" } },
        { code: "L27", width: "oneU", labels: { base: "L27", layer1: "L27", layer2: "L27" } },

        { code: "R22", width: "oneU", labels: { base: "R22", layer1: "R23", layer2: "R22" } },
        { code: "R23", width: "oneU", labels: { base: "R24", layer1: "R24", layer2: "R23" } },
        { code: "R24", width: "oneU", labels: { base: "R24", layer1: "R24", layer2: "R24" } },
        { code: "R25", width: "oneU", labels: { base: "R25", layer1: "R25", layer2: "R25" } },
        { code: "R26", width: "oneU", labels: { base: "R26", layer1: "R26", layer2: "R26" } },
        { code: "R27", width: "oneU", labels: { base: "R27", layer1: "R27", layer2: "R27" } }
      ],
      // Row 5: 2 keys per side, offset to align under keys 3-4 of row 4
      [
        { classes: ["threeU", "key", "filler"], isFiller: true },
        { code: "L28", width: "oneU", labels: { base: "L28", layer1: "L28", layer2: "L28" } },
        { code: "L29", width: "oneU", labels: { base: "L29", layer1: "L29", layer2: "L29" } },

        { code: "R28", width: "oneU", labels: { base: "R28", layer1: "R28", layer2: "R28" } },
        { code: "R29", width: "oneU", labels: { base: "R29", layer1: "R29", layer2: "R29" } }
      ],
      // Thumb cluster: Row 1 (3 keys per side)
      [
        { code: "L30", width: "oneU", labels: { base: "L30", layer1: "L30", layer2: "L30" } },
        { code: "L31", width: "oneU", labels: { base: "L31", layer1: "L31", layer2: "L31" } },
        { code: "L32", width: "oneU", labels: { base: "L32", layer1: "L32", layer2: "L32" } },

        { code: "R30", width: "oneU", labels: { base: "R30", layer1: "R30", layer2: "R30" } },
        { code: "R31", width: "oneU", labels: { base: "R31", layer1: "R31", layer2: "R31" } },
        { code: "R32", width: "oneU", labels: { base: "R32", layer1: "R32", layer2: "R32" } }
      ],
      // Thumb cluster: Row 2 (3 keys per side)
      [
        { code: "L33", width: "oneU", labels: { base: "L33", layer1: "L33", layer2: "L33" } },
        { code: "L34", width: "oneU", labels: { base: "L34", layer1: "L34", layer2: "L34" } },
        { code: "L35", width: "oneU", labels: { base: "L35", layer1: "L35", layer2: "L35" } },


        { code: "R33", width: "oneU", labels: { base: "R33", layer1: "R33", layer2: "R33" } },
        { code: "R34", width: "oneU", labels: { base: "R34", layer1: "R34", layer2: "R34" } },
        { code: "R35", width: "oneU", labels: { base: "R35", layer1: "R35", layer2: "R35" } }
      ]
    ]
  };

  const VALID_KEY_CODE_PATTERNS = [
    /^Key[A-Z]$/,
    /^Digit[0-9]$/,
    /^Numpad(?:[0-9]|Add|Subtract|Multiply|Divide|Decimal|Enter)$/, 
    /^F(?:[1-9]|1[0-2])$/,
    /^Arrow(?:Up|Down|Left|Right)$/,
    /^(CapsLock|Tab|Enter|Backspace|Space|Escape|ShiftLeft|ShiftRight|ControlLeft|ControlRight|AltLeft|AltRight|MetaLeft|MetaRight|ContextMenu|Insert|Delete|Home|End|PageUp|PageDown|PrintScreen|ScrollLock|NumLock|Power)$/
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
      const existingBadge = keyElement.querySelector(".invalidCodeBadge");
      if (!existingBadge) {
        const badge = document.createElement("div");
        badge.className = "invalidCodeBadge";
        badge.textContent = "PLACEHOLDER";
        keyElement.appendChild(badge);
      }
      console.warn(`Flagged placeholder or unknown key code: ${code}`);
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

    if (label === " ") {
      label = "Space";
    }

    let tempListItem = document.createElement("li");
    tempListItem.className = "logBox";
    tempListItem.textContent = label;
    const logger = document.getElementById("logHolder");
    logger.appendChild(tempListItem);
    logger.scrollLeft = logger.scrollWidth;
    setTimeout(function () {
      tempListItem.className = tempListItem.className + " show";
    }, 6);
  };

  let getKeyDefinition = function (code) {
    return keyDefinitions[code] || null;
  };

  let getKeyOutputs = function (keyDef) {
    if (!keyDef) return [];
    if (Array.isArray(keyDef.outputs) && keyDef.outputs.length > 0) {
      return keyDef.outputs;
    }

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
    if (outputs.length === 0) {
      return null;
    }

    const layerOutputs = outputs.filter((output) => output.layer === activeLayer || !output.layer);
    if (shiftActive) {
      const shifted = layerOutputs.find((output) => output.modifier === "shift");
      if (shifted) {
        return shifted;
      }
    }

    const defaultOutput = layerOutputs.find((output) => !output.modifier || output.modifier === "none");
    return defaultOutput || layerOutputs[0] || outputs[0];
  };

  let getActiveLabel = function (keyDef) {
    const output = getOutputForKey(keyDef);
    if (output) {
      return output.label || "";
    }

    if (!keyDef || !keyDef.labels) return "";
    if (shiftActive && keyDef.labels.shift) return keyDef.labels.shift;

    return keyDef.labels[activeLayer] || keyDef.labels.base || "";
  };

  let getPassiveLabel = function (keyDef) {
    const output = getOutputForKey(keyDef);
    if (output && Array.isArray(keyDef.outputs) && keyDef.outputs.length) {
      const remaining = keyDef.outputs.filter((item) => item !== output);
      if (remaining.length) return remaining[0].label || "";
    }

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
      keyElement.querySelector(".mainLabel").textContent = getActiveLabel(keyDef);
      keyElement.querySelector(".subLabel").textContent = getPassiveLabel(keyDef);
    });
  };

  let updateFrequency = function (pressedKey) {
    frequencyMap.set(pressedKey, (frequencyMap.get(pressedKey) || 0) + 1);
    let currentFrequency = frequencyMap.get(pressedKey);
    console.log(currentFrequency);

    let cornerKeyId = `${pressedKey}_corner`;
    let cornerText = document.getElementById(cornerKeyId);
    let keyElement = document.getElementById(pressedKey);
    if (!keyElement) {
      return;
    }

    if (!cornerText) {
      cornerText = document.createElement("div");
      cornerText.id = cornerKeyId;
      cornerText.className = "cornerText";
      keyElement.prepend(cornerText);
    }

    cornerText.textContent = currentFrequency;
  };

  let downKeyDo = function (e, pressedKey) {
    let keyElement = document.getElementById(pressedKey);
    if (!keyElement) {
      appendToLog(e.key, pressedKey);
      return;
    }

    if (!keyElement.classList.contains("raise")) {
      keyElement.classList.add("raise");
    }

    if (!keyElement.classList.contains("pressed")) {
      keyElement.classList.add("pressed");
    }

    updateFrequency(pressedKey);
    appendToLog(e.key, pressedKey);
  };

  let upKeyDo = function (pressedKey) {
    let keyElement = document.getElementById(pressedKey);
    if (!keyElement) return;
    keyElement.classList.remove("raise");
    keyElement.classList.remove("pressed");
  };

  let getAlternateKeyRepresentation = function (key) {
    switch (key) {
      case "MetaLeft":
        return "OSLeft";
      case "MetaRight":
        return "OSRight";
      case "Help":
        return "Insert";
    }

    return key;
  };

  let renderKey = function (keyDef) {
    const key = document.createElement("div");
    let classes = ["key"];
    if (keyDef.isFiller) {
      classes = classes.concat(keyDef.classes || ["oneU", "filler"]);
      key.className = classes.join(" ");
      return key;
    }

    classes = classes.concat(keyDef.classes || [keyDef.width || "oneU"]);
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

    const outputs = getKeyOutputs(keyDef);
    if (outputs.length > 1) {
      const actionsWrapper = document.createElement("div");
      actionsWrapper.className = "keyActions";
      outputs.slice(0, 6).forEach((output) => {
        const actionLine = document.createElement("div");
        actionLine.className = "keyAction";
        actionLine.innerHTML = `
          <span class="outputLabel">${output.label}</span>
          <span class="outputMeta">${output.layer ? output.layer.toUpperCase() : output.type}</span>
        `;
        actionsWrapper.appendChild(actionLine);
      });
      key.appendChild(actionsWrapper);
    }

    keyDefinitions[keyDef.code] = keyDef;
    return key;
  };

  let renderKeyboard = function () {
    const container = document.getElementById("keyboardContainer");
    container.innerHTML = "";

    keyboardLayout.rows.forEach((row) => {
      const rowEl = document.createElement("div");
      rowEl.className = "row";
      row.forEach((keyDef) => {
        rowEl.appendChild(renderKey(keyDef));
      });
      container.appendChild(rowEl);
    });

    switchLayer(activeLayer);
  };

  let renderLayerControls = function () {
    const container = document.getElementById("layerControls");
    container.innerHTML = "";
    keyboardLayout.layers.forEach((layer) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = layer.toUpperCase();
      button.dataset.layer = layer;
      button.className = "layerButton";
      if (layer === activeLayer) button.classList.add("active");
      button.addEventListener("click", () => {
        switchLayer(layer);
      });
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
    if (layoutNameElement) {
      layoutNameElement.textContent = keyboardLayout.name;
    }

    document.body.addEventListener("keydown", (e) => {
      let pressedKey = e.code;
      console.log(pressedKey);

      e.preventDefault();
      shiftActive = e.getModifierState("Shift");
      pressedKey = getAlternateKeyRepresentation(pressedKey);
      refreshKeyLabels();

      if (pressedKey === "CapsLock") {
        let capsLockOn = e.getModifierState("CapsLock");
        if (capsLockOn !== true) {
          upKeyDo(pressedKey);
          updateFrequency(pressedKey);
          appendToLog(e.key, pressedKey);
          return;
        }
      }

      downKeyDo(e, pressedKey);
    });

    document.body.addEventListener("keyup", (e) => {
      let pressedKey = e.code;
      console.log(pressedKey);

      shiftActive = e.getModifierState("Shift");
      refreshKeyLabels();

      if (pressedKey === "PrintScreen") {
        let printElement = document.getElementById(pressedKey);
        if (printElement && !printElement.classList.contains("pressed")) {
          printElement.classList.add("pressed");
        }
        appendToLog(e.key, pressedKey);
      }

      if (pressedKey === "CapsLock") {
        return;
      }

      pressedKey = getAlternateKeyRepresentation(pressedKey);
      upKeyDo(pressedKey);
    });

    document.getElementById("resetButton").onclick = function () {
      console.log("Resetting...");
      let temp = document.querySelectorAll(".key");
      for (let i = 0; i < temp.length; ++i) {
        temp[i].classList.remove("raise");
        temp[i].classList.remove("raiseBlue");
        temp[i].classList.remove("pressed");
      }
      frequencyMap.clear();
      let temp_2 = document.querySelectorAll(".cornerText");
      for (let i = 0; i < temp_2.length; ++i) {
        temp_2[i].textContent = "";
      }
    };
  }
})(window, document, undefined);
