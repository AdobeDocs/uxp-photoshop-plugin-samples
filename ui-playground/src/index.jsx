/*const Reactotron = require("reactotron-react-js").default;
Reactotron
  .configure() // we can use plugins here -- more on this later
  .connect() // let's connect!
*/
import React from "react";
import ReactDOM from "react-dom";
//import DevToolsApp from "remotedev-app";

import { App } from "./App.jsx";
import { Store } from "./stores/store.js";
import { CommandController } from "./controllers/CommandController.jsx";
import { About } from "./components/About.jsx";
import { entrypoints } from "uxp";

const store = new Store();


const rootElement = document.createElement("div");
document.appendChild(rootElement);

ReactDOM.render(<App store={store}/>, rootElement);

const aboutController = new CommandController(({dialog}) => <About dialog={dialog}/>, {id: "showAbout", title: "UXP HTML Playground", size: {width: 480, height: 480} });

entrypoints.setup({
  commands: {
    showAbout: aboutController
  },
});