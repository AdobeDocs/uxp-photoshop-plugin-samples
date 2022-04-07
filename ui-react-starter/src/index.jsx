import "./styles.css";
import { setup } from "./uxp/setup";

import { About } from "./dialogs/About/About";
import { Demos } from "./panels/Demos/Demos";
import { MoreDemos } from "./panels/MoreDemos/MoreDemos";

setup({
  plugin: {
    create(plugin) {
      /*optional */ console.log("created", plugin);
    },
    destroy() {
      /*optional */ console.log("destroyed");
    },
  },
  commands: {
    showAbout: About,
  },
  panels: {
    demos: Demos,
    moreDemos: MoreDemos,
  },
});
