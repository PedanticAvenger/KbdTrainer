(function (window, document, _) {
  window.onload = init;
  let activeLayer = "base";
  let shiftActive = false;
  let keyDefinitions = {};

  // ==========================================
  // CONFIGURATION: Set your active layout here
  // Options: window.KbdLayouts.pedanticCosmos, window.KbdLayouts.qwerty, etc.
  // ==========================================
  const keyboardLayout = window.KbdLayouts.pedanticCosmos;

  const VALID_KEY_CODE_PATTERNS = [
    /^Key[A-Z]$/,
    /^Digit[0-9]$/,
    /^Numpad(?:[0-9]|Add|Subtract|Multiply|Divide|Decimal|Enter)$/, 
    /^F(?:[1-9]|1[0-2])$/,
    /^Arrow(?:Up|Down|Left|Right)$/,
    /^(CapsLock|Tab|Enter|Backspace|Space|Escape|ShiftLeft|ShiftRight|ControlLeft|ControlRight|AltLeft|AltRight|MetaLeft|MetaRight|ContextMenu|Insert|Delete|Home|End|PageUp|PageDown|PrintScreen|ScrollLock|NumLock|Power)$/,
    // Added punctuation and symbol keys
    /^(Backquote|Minus|Equal|BracketLeft|BracketRight|Backslash|Semicolon|Quote|Comma|Period|Slash|IntlBackslash)$/
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

let refreshKeyLabels = function () {
    document.querySelectorAll(".key").forEach((keyElement) => {
      if (!keyElement.dataset.keyCode) return;
      let keyDef = getKeyDefinition(keyElement.dataset.keyCode);
      if (!keyDef) return;
      
      keyElement.querySelector(".mainLabel").textContent = getActiveLabel(keyDef);
    });
  };


  let downKeyDo = function (e, pressedKey) {
    let keyElement = document.getElementById(pressedKey);
    if (!keyElement) {
      return;
    }

    if (!keyElement.classList.contains("raise")) {
      keyElement.classList.add("raise");
    }

    if (!keyElement.classList.contains("pressed")) {
      keyElement.classList.add("pressed");
    }

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

    // Create bottom-left label for Layer 1
    const layer1Label = document.createElement("div");
    layer1Label.className = "keyLabel layer1Label";
    layer1Label.textContent = (keyDef.labels && keyDef.labels.layer1) ? keyDef.labels.layer1 : "";

    // Create bottom-right label for Layer 2
    const layer2Label = document.createElement("div");
    layer2Label.className = "keyLabel layer2Label";
    layer2Label.textContent = (keyDef.labels && keyDef.labels.layer2) ? keyDef.labels.layer2 : "";

    key.appendChild(mainLabel);
    key.appendChild(layer1Label);
    key.appendChild(layer2Label);
    appendInvalidKeyCodeWarning(key, keyDef.code);

    keyDefinitions[keyDef.code] = keyDef;
    return key;
  };

  // Added Logic: Render two independent halves using side containers
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
      leftKeys.forEach((keyDef) => {
        leftRowEl.appendChild(renderKey(keyDef));
      });
      leftSide.appendChild(leftRowEl);

      const rightRowEl = document.createElement("div");
      rightRowEl.className = "row";
      rightKeys.forEach((keyDef) => {
        rightRowEl.appendChild(renderKey(keyDef));
      });
      rightSide.appendChild(rightRowEl);
    });

    container.appendChild(leftSide);
    container.appendChild(rightSide);

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
    };
  }
})(window, document, undefined);