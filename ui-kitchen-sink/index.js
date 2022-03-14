const { entrypoints } = require("uxp");

require("./setSpectrumSize.js");
const { selectPage } = require("./sidebar.js");
const { openProgrammaticDialog } = require("./dialogs.js");
require("./eventlog.js");
require("./dragdrop.js");
require("./tabs.js");
require("./webview.js");
require("./video.js");
require("./bezier.js");
require("./launch.js");

// reusable function for flyouts and command
const reloadPlugin = () => {
  window.location.reload();
}

// set up entry points -- this defines the Reload Plugin handler
// and the panel (including its associated flyout items)
entrypoints.setup({
  plugin: {
    create: () => console.log("Created"),
    destroy: () => console.log("Destroyed")
  },
  commands: {
    reloadPlugin: () => reloadPlugin()
  },
  panels: {
    kitchenSink: {
      show() {
        const currentPage = localStorage.getItem("currentPage") || "sp-heading";
        selectPage(currentPage) ;

        // you'd normally attach your UI to a panel or create some dynamic elements here.
        // but for a single panel with an index.html file, that's not required.
        // If you had multiple panels, though, you'd have to at least find the HTML node
        // and attach it to the incoming node, otherwise the panels (other than the first)
        // would show blank (and the first panel would likely include all your UI).
        //
        // if you had a div, for example, you can use 
        //     node.appendChild(document.querySelector("selector for your div"));
      },
      menuItems: [
        {id: "reloadPanelFlyout", label: "Reload Panel", checked: false, enabled: true},
        {id: "showDialog", label: "Show Dialog", checked: false, enabled: true}
      ],
      invokeMenu(id) {
        switch (id) {
          case "reloadPanelFlyout": reloadPlugin(); break;
          case "showDialog": openProgrammaticDialog(); break;
        }
      }
    },
    secondPanel: {
      show(node, ...args) {
        console.log("showing second panel", args);
        const secondPanel = document.querySelector("#secondPanel");
        if (node.node) /* this works for manifest v4 */
          node.node.appendChild(secondPanel);
        else /* this works for manifest v5 */
          node.appendChild(secondPanel);
        secondPanel.classList.add("visible");
      }
    }
  }
});
