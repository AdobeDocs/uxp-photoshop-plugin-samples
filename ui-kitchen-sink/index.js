const { entrypoints } = require("uxp");

// attach event listeners for tabs
Array.from(document.querySelectorAll(".sp-tab")).forEach(theTab => {
  theTab.onclick = () => {
    localStorage.setItem("currentTab", theTab.getAttribute("id"));
    Array.from(document.querySelectorAll(".sp-tab")).forEach(aTab => {
      if (aTab.getAttribute("id") === theTab.getAttribute("id")) {
        aTab.classList.add("selected");
      } else {
        aTab.classList.remove("selected");
      }
    });
    Array.from(document.querySelectorAll(".sp-tab-page")).forEach(tabPage => {
      if (tabPage.getAttribute("id").startsWith(theTab.getAttribute("id"))) {
        tabPage.classList.add("visible");
      } else {
        tabPage.classList.remove("visible");
      }
    });
  }
});

// dialog handling
document.querySelector("#btnOpenDialog").onclick = () => {
  document.querySelector("#dlgExample").uxpShowModal({
    title: "Dialog Example",
    resize: "none", // "both", "horizontal", "vertical",
    size: {
      width: 480,
      height: 240
    }
  });
};

// enable dialog buttons to close
Array.from(document.querySelectorAll("#dlgExample sp-button")).forEach(button => {
  button.onclick = () => document.querySelector("#dlgExample").close();
});


// programmatic dialog
const openProgrammaticDialog = async () => {
  const theDialog = document.createElement("dialog");
  const theForm = document.createElement("form");
  const theHeading = document.createElement("sp-heading");
  const theDivider = document.createElement("sp-divider");
  const theBody = document.createElement("sp-body");
  const theFooter = document.createElement("footer");
  const theActionButton = document.createElement("sp-button");
  const theCancelButton = document.createElement("sp-button");

  theHeading.textContent = "Vectorize Images?";
  theDivider.setAttribute("size", "large");
  theBody.textContent = "Are you sure you want to vectorize the images? This might take some time.";
  theActionButton.textContent = "Vectorize";
  theActionButton.setAttribute("variant", "cta");
  theCancelButton.textContent = "Don't Vectorize";
  theCancelButton.setAttribute("quiet", "true");
  theCancelButton.setAttribute("variant", "secondary");

  theActionButton.onclick = () => { 
    theDialog.close("ok");
  }
  theCancelButton.onclick = () => {
    theDialog.close("reasonCanceled");
  }

  theFooter.appendChild(theCancelButton);
  theFooter.appendChild(theActionButton);

  theForm.appendChild(theHeading);
  theForm.appendChild(theDivider);
  theForm.appendChild(theBody);
  theForm.appendChild(theFooter);
  theDialog.appendChild(theForm);
  document.body.appendChild(theDialog);

  const r = await theDialog.uxpShowModal({
    title: "Programmatic Dialog",
    resize: "none", // "both", "horizontal", "vertical",
    size: {
      width: 480,
      height: 240
    }
  });
  console.log(r);
  theDialog.remove();
}
document.querySelector("#btnOpenPDialog").onclick = openProgrammaticDialog;

// logging events
function logEvent(evt) {
  const eventType = evt.type;
  const filterElement = document.querySelector(`#chk${eventType}`);
  if (!filterElement.checked) return;

  const logs = document.querySelector("#logs");
  const evtText = `` +
                  `${evt.type} ${evt.target.tagName} ${evt.target.textContent.substr(0,10).replace(/\n/g,"")} ` +
                  `${evt.target.value !== undefined ? `Value: ${evt.target.value}` : ""} ` +
                  `${evt.target.checked !== undefined ? `Checked: ${evt.target.checked}` : ""} ` +
                  `${evt.target.selectedIndex !== undefined ? `Selected: ${evt.target.selectedIndex}` : ""} ` +
                  `${evt.which !== undefined ? `Which: ${evt.which}` : ""} ` +
                  `${evt.button !== undefined ? `Button: ${evt.button}` : ""} ` +
                  `${evt.altKey !== undefined ? `alt: ${evt.altKey}` : ""} ` +
                  `${evt.shiftKey !== undefined ? `shift: ${evt.shiftKey}` : ""} ` +
                  `${evt.ctrlKey !== undefined ? `ctrl: ${evt.ctrlKey}` : ""} ` +
                  `${evt.metaKey !== undefined ? `meta: ${evt.metaKey}` : ""} ` +
                  `${evt.key !== undefined ? `Key: ${evt.key}` : ""} ` +
                  `${evt.charCode !== undefined ? `char: ${evt.charCode}` : ""} ` +
                  `${evt.offsetX !== undefined ? `OffsetX: ${Math.floor(evt.offsetX)},` : ""} ` +
                  `${evt.offsetY !== undefined ? `${Math.floor(evt.offsetY)}` : ""} ` +
                  `${evt.clientX !== undefined ? `ClientX: ${Math.floor(evt.clientX)},` : ""} ` +
                  `${evt.clientY !== undefined ? `${Math.floor(evt.clientY)}` : ""} ` +
                  `${evt.screenX !== undefined ? `ScreenX: ${Math.floor(evt.screenX)},` : ""} ` +
                  `${evt.screenY !== undefined ? `${Math.floor(evt.screenY)}` : ""} ` +
                  `\n`;
  logs.innerText = (evtText + logs.innerText).split("\n").slice(0, 200).join("\n");
}


["click", "dblclick", "auxclick", "contextmenu",
 "mousedown", "mouseup", "mouseover", "mouseleave", "mouseenter", "mousemove", "mouseout", "mousewheel", "wheel",
 "input", "change", "keydown", "keyup", "keypress"
].forEach(evtName => {
  document.querySelector(".wrapper").addEventListener(evtName, logEvent);
});

document.querySelector("#toggleConsole").addEventListener("change", evt => {
  const checked = evt.target.checked;
  const theConsole = document.querySelector("#console");
  if (checked) {
    theConsole.classList.add("visible");
  } else {
    theConsole.classList.remove("visible");
  }
});

// reusable function for flyouts and command
reloadPlugin = () => {
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
        const currentTab = localStorage.getItem("currentTab") || "sp-spectrum-typography-tab";
        const tabEl = document.querySelector(`.sp-tab#${currentTab}`);
        if (tabEl) {
          tabEl.onclick();  // select the last tab so the user doesn't lose their place
        }
        // you'd normally attach your UI to a panel or create some dynamic elements here.
        // but for a single panel with an index.html file, that's not required.
        // If you had multiple panels, though, you'd have to at least find the HTML node
        // and attach it to the incoming node, otherwise the panels (other than the first)
        // would show blank (and the first panel would likely include all your UI).
      },
      menuItems: [
        {id: "buggy", label: "This one is buggy...", checked: false, enabled: true},
        {id: "reloadPanelFlyout", label: "Reload Panel", checked: false, enabled: true},
        {id: "showDialog", label: "Show Dialog", checked: false, enabled: true}
      ],
      invokeMenu(id) {
        switch (id) {
          case "reloadPanelFlyout": reloadPlugin(); break;
          case "showDialog": openProgrammaticDialog(); break;
        }
      }
    }
  }
});

