import React from "react";

import "./styles.css";
import { PanelController } from "./controllers/PanelController.jsx";
import FirebaseDemo from "./panels/FirebaseDemo";

import { entrypoints } from "uxp";

// PanelController for Firebase demo
const FirebaseDemoController = new PanelController(() => <FirebaseDemo />, {
  id: "firebaseDemo",
  menuItems: [
    {
      id: "reload1",
      label: "Reload Plugin",
      enabled: true,
      checked: false,
      oninvoke: () => location.reload(),
    },
  ],
});

// Setting up entrypoints for the plugin
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
    firebaseDemo: FirebaseDemoController,
  },
});
