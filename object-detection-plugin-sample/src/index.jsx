import React from "react";

import "./styles.css";
import { PanelController } from "./controllers/PanelController.jsx";

import { entrypoints } from "uxp";
import { ObjectDetectionDemo } from "./panels/ObjectDetectionDemo";

const objectDetectionController = new PanelController(
  () => <ObjectDetectionDemo />,
  {
    id: "objectDetectionDemo",
    menuItems: [
      {
        id: "reload2",
        label: "Reload Plugin",
        enabled: true,
        checked: false,
        oninvoke: () => location.reload(),
      },
    ],
  }
);

entrypoints.setup({
  plugin: {
    create(plugin) {
      /*optional */ console.log("created", plugin);
    },
    destroy() {
      /*optional */ console.log("destroyed");
    },
  },
  panels: {
    objectDetectionDemo: objectDetectionController,
  },
});
