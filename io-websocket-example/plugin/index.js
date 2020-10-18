const { entrypoints } = require("uxp");

let initialized = false;
entrypoints.setup({
  panels: {
    websocket: {
      show() {
        // panel is already populated from the HTML; do nothing
      },
      menuItems: [
        {id: "connect", label: "Connect"}
      ],
      invokeMenu(id) {
        handleFlyout(id);
      }
    }
  }
});

const [ output, connectButton, disconnectButton, validateButton, state,
        randCheckbox, fastCheckbox, messageText, url ] = 
      ["output", "connect", "disconnect", "validate", "state",
       "rand", "fast", "text", "url"].map(el => document.querySelector(`#${el}`));

let websocket = null;
let receivedMessages = [];

log = msg => {
  output.textContent = msg;
}

connectButton.onclick = () => {
  if (websocket) {
    log("Already connected; disconnect first.");
    return;
  }
  receivedMessages = [];
  websocket = new WebSocket(url.value, "test-protocol");
  websocket.onopen = evt => {
    state.className="positive";
    state.textContent = "Connected";
    const menuItem = entrypoints.getPanel("websocket").menuItems.getItemAt(0);
    menuItem.label = "Disconnect";
    log("Connected");
  }
  websocket.onclose = evt => {
    state.className="negative";
    state.textContent = "Disconnected";
    const menuItem = entrypoints.getPanel("websocket").menuItems.getItemAt(0);
    menuItem.label = "Connect";
    log("Disconnected");
    websocket = null;
  }
  websocket.onmessage = evt => {
    const [cmd, ...args] = evt.data.split("=");
    receivedMessages.push(evt.data);
    switch (cmd) {
      case "text":
        log(args.join("="));
        break;
      case "err":
        log(`Error from server: ${args.join("=")}`)
        break;
      default:
        log(`Don't know how to ${cmd}`);
    }
  }
  websocket.onerror = evt => {
    log(`Error: ${evt.data}`);
  }

}

disconnectButton.onclick = () => {
  if (websocket) {
    websocket.close();
  } else {
    log("Already disconnected.");
  }
  websocket = null;
}

validateButton.onclick = () => {
  if (!websocket) {
    log("Connect first!");
    return;
  }
  websocket.send(`validate=${receivedMessages.join("\n")}`)
}

messageText.addEventListener("keydown", evt => {
  if (evt.key === "Enter") {
    if (!websocket) {
      log("Connect first!");
      return;
    }
    websocket.send(messageText.value);
    messageText.value = "";
  }
});

randCheckbox.onclick = evt => {
  if (!websocket) {
    log("Connect first!");
    return;
  }
  const value = evt.target.checked ? "on" : "off";
  websocket.send(`rand=${value}`);
}

fastCheckbox.onclick = evt => {
  if (!websocket) {
    log("Connect first!");
    return;
  }
  const value = evt.target.checked ? "on" : "off";
  websocket.send(`fast=${value}`);
}

function handleFlyout(id) {
  switch (id) {
    case "connect": {
      if (websocket) {
        websocket.close();
      } else {
        connectButton.onclick();
      }
    }
  }
}
