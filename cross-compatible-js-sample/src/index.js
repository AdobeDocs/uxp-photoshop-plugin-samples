import "./index.css";

import { entrypoints, host, versions } from "uxp";

entrypoints.setup({
  commands: {
    about: {
      run() {
        showAbout();
      }
    }
  },
  panels: {
    plugin: {
      show() {},
      menuItems: [
        {
          id: "about",
          label: "About"
        }
      ],
      invokeMenu(id) {
        if (id === "about") {
          showAbout();
        }
      }
    }
  }
});

window.addEventListener("load", () => {
  document.getElementById("aboutBtn").onclick = showAbout;
  document.getElementById("create").onclick = createLabel;

  document.getElementById("app").innerHTML = APP_TYPE;

  document.getElementById("textarea").addEventListener("input", e => {
    if (e.target.value.length > 0) {
      e.target.invalid = false;
      e.target.valid = true;
    } else {
      e.target.valid = false;
      e.target.invalid = true;
    }
  });
});

function showAbout() {
  const uxpVersion = versions.uxp.split("-")[1];

  if (host.name === "Photoshop") {
    const app = require("photoshop").app;

    app.showAlert(`Cross-Compatible JS Sample\n\nApp: ${host.name}\nVersion: ${host.version}\nUXP: ${uxpVersion}`);
  } else {
    const application = require("application");
    const dialog = require("@adobe/xd-plugin-toolkit/lib/dialogs.js");

    dialog.alert("Cross-Compatible JS Sample", "App: XD", `Version: ${application.version}`, `UXP: ${uxpVersion}`);
  }
}

function createLabel(e) {
  const textArea = document.getElementById("textarea");

  if (textArea.value.length === 0) {
    textArea.invalid = true;
  } else if (host.name === "Photoshop") {
    const { batchPlay } = require("photoshop").action;
    const { executeAsModal } = require("photoshop").core;

    const command = {
      _obj: "make",
      _target: [
        {
          _ref: "textLayer"
        }
      ],
      using: {
        _obj: "textLayer",
        textKey: textArea.value,
        textShape: [
          {
            _obj: "textShape",
            char: {
              _enum: "char",
              _value: "box"
            },
            bounds: {
              _obj: "rectangle",
              top: 100,
              left: 100,
              bottom: 125,
              right: 400
            }
          }
        ],
        textStyleRange: [
          {
            _obj: "textStyleRange",
            from: 0,
            to: textArea.value.length,
            textStyle: {
              _obj: "textStyle",
              fontName: "Arial",
              fontStyleName: "Bold",
              size: {
                _unit: "pointsUnit",
                _value: 16
              }
            }
          }
        ],
        _isCommand: true
      }
    };
    executeAsModal(() => {
      batchPlay([command], {});
    }, { 
      commandName: "Create Label"
    });
    
  } else if (host.name === "XD") {
    const { Text, Color } = require("scenegraph");
    const { editDocument } = require("application");

    editDocument(selection => {
      const label = new Text();

      label.text = textArea.value;

      label.styleRanges = [{
        fontFamily: "Arial",
        fontStyle: "Bold",
        fontSize: 16,
        fill: new Color("#000")
      }];

      selection.insertionParent.addChild(label);

      label.placeInParentCoordinates({ x: label.localBounds.x, y: label.localBounds.y}, { x: 0, y: 0});
    });
  }
}
