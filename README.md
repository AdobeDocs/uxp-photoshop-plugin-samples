# Plugin Samples

This repository contains a library of sample Photoshop plugins to help you on your journey. You can use these samples to learn more about how to build plugins for Photoshop using UXP.

## Samples list

**If you're adding a sample to the repo, feel free to add it to this list.**

| Extension                   | Main APIs Used                                              | Description                                                                                                                                | Minimum Version                 |
| --------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| cross-compatible-js-sample  | Spectrum UXP, BatchPlay, XD Scenegraph, Cross Compatibility | Demonstrates bundling a plugin that is compatible for both PS and XD development                                                           | UXP 4.1 / PS 22.0.0 / XD 36.0.0 |
| desktop-helper-sample       | Spectrum UXP, React Spectrum, Electron, React, socket.io    | Demonstrates using Electron and socket.io to communicate with a UXP plugin from a helper app                                               | UXP 4.1 / PS 22.0.0             |
| direct-action-js-sample     | Spectrum UXP, File I/O                                      | Shows how to create a file containing the names of all layers in an active Photoshop document                                              | UXP 4.1 / PS 22.0.0             |
| hello-world-js-sample       | Photoshop API                                               | Shows how to create basic UXP entrypoints in Photoshop using vanilla JS                                                                    | UXP 4.1 / PS 22.0.0             |
| hello-world-panel-js-sample | Spectrum UXP                                                | Shows how to create basic UI panels in Photoshop using vanilla JS                                                                          | UXP 4.1 / PS 22.0.0             |
| io-websocket-example        | Spectrum UXP, Websocket                                     | Shows how to use a websocket server & client in Photoshop                                                                                  | UXP 4.1 / PS 22.0.0             |
| jszip-sample                | Spectrum UXP, JSZip                                         | Uses JSZip to manipulate artboards through importing and exporting zip files                                                               | UXP 4.1 / PS 22.0.0             |
| layer-creation-js-sample    | Spectrum UXP, File I/O, BatchPlay                           | Creates a text layer using input from a local file in Photoshop                                                                            | UXP 4.1 / PS 22.0.0             |
| oauth-workflow-sample       | Spectrum UXP, Express                                       | Implements a simple OAuth workflow using a server to interface a web API                                                                   | UXP 4.1 / PS 22.0.0             |
| plugin-info-vue-full-app    | Spectrum UXP, Vue, File I/O, Local Storage                  | Example of a fully developed UXP plugin with multiple entrypoints, application/platform specific UXP features, and File I/O best practices | UXP 4.1 / PS 22.0.0             |
| secure-storage-sample       | Spectrum UXP, UXP Secure Storage                            | Demonstrates using UXP's Secure Storage API to store and retrieve local data                                                               | UXP 4.1 / PS 22.0.0             |
| typescript-webpack-sample   | Spectrum UXP, HTML, TypeScript, Webpack                     | A sample on using the `@types/photoshop` TypeScript definitions with TypeScript and Webpack                                                            | PS 23.0.0              |
| ui-kitchen-sink             | Spectrum UXP, HTML                                          | The kitchen sink example includes all of the available UI components, along with some sample usages                                        | UXP 4.1 / PS 22.0.0             |
| ui-playground               | Spectrum UXP, React                                         | Playground for testing HTML, CSS, and JS snippets in Photoshop                                                                             | UXP 4.1 / PS 22.0.0             |
| ui-react-starter            | Spectrum UXP, React                                         | Shows how to use React in a simple plugin                                                                                                  | UXP 4.1 / PS 22.0.0             |
| ui-svelte-starter           | Spectrum UXP, Svelte                                        | Shows how to use Svelte in a simple plugin                                                                                                 | UXP 4.1 / PS 22.0.0             |
| ui-vue-starter              | Spectrum UXP, Vue                                           | Shows how to use Vue in a simple plugin                                                                                                    | UXP 4.1 / PS 22.0.0             |
| vite-vue3-tsx-sample        | Spectrum UXP, Vue                                           | Creates an UXP project by using Vite, Vue 3, TSX                                                                                           | PS 23.0.0                       |
| wasm-rust-sample            | Spectrum UXP, Rust, WebAssembly                             | Uses wasm-bindgen and Rust to leverage WebAssembly in a UXP plugin                                                                         | UXP 4.1 / PS 22.0.0             |
| web-service-call-js-sample  | Spectrum UXP, Fetch, BatchPlay                              | Creates a text layer in Photoshop containing data fetched from a web API                                                                   | UXP 4.1 / PS 22.0.0             |

## Recommended development setup

1. Clone this repository to a location of your choice:

```
git clone git@github.com:AdobeDocs/uxp-photoshop-plugin-samples.git
```

2. Launch the [UXP Developer Tool](https://www.adobe.io/photoshop/uxp/devtool/) and use the "Add Plugin..." button to add each plugin to your workspace (select the `manifest.json` file indicated by your plugin's README, typically these are in the root, `plugin`, or `dist` folders)

3. Load plugins into Photoshop by using **••• > Load**.
