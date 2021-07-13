const { entrypoints } = require("uxp");

const { selectPage } = require("./sidebar.js");
const { openProgrammaticDialog } = require("./dialogs.js");
require("./eventlog.js");
require("./dragdrop.js");
require("./tabs.js");
//require("./webview.js");

function setSpectrumSize(size) {
  const allSpectrumSelectors = [
    "sp-body",
    "sp-detail",
    "sp-label",
    "sp-heading",
    "sp-button",
    "sp-action-button",
    "sp-checkbox",
    "sp-radio",
    "sp-textfield",
    "sp-textarea",
    "sp-progress",
    "sp-slider",
    "sp-tooltip",
    "sp-icon", 
    "sp-menu",
    "sp-dropdown",
    "sp-link"
  ];
  document.querySelectorAll(allSpectrumSelectors.map(sel => `${sel}:not(.fixedSize)`).join(", ")).forEach(el => el.setAttribute("size", size));

}
document.querySelector("#size").addEventListener("change", evt => {
  const target = evt.target;
  setSpectrumSize(target.value);
})

// reusable function for flyouts and command
const reloadPlugin = () => {
  window.location.reload();
}

// set up entry points -- this defines the Reload Plugin handler
// and the panel (including its associated flyout items)
entrypoints.setup({
  commands: {
    reloadPlugin: () => reloadPlugin()
  },
  panels: {
    kitchenSink: {
      show({node} = {}) {
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
        console.log("show!", args);
        //manifest v4 version passes node in an object. use {node} = {} to destructure.
        const secondPanel = document.querySelector("#secondPanel");
        if (node.node) 
          node.node.appendChild(secondPanel);
        else
          node.appendChild(secondPanel);
        secondPanel.classList.add("visible");
      }
    }
  }
});

