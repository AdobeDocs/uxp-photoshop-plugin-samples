# Plugin Samples

This repository contains a library of sample Photoshop plugins to help you on your journey. You can use these samples to learn more about how to build plugins for Photoshop using UXP.

## Samples list

| Extension                           | Main APIs Used                                  | Description                                                                                                            | Minimum Version |
| ----------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------- |
io-websocket-example | Spectrum UXP, Websocket | Shows how to use a websocket server & client in Photoshop | UXP 4.1 / PS 22.0.0
ui-kitchen-sink | Spectrum UXP, HTML | The kitchen sink example includes all of the available UI components, along with some sample usages. | UXP 4.1 / PS 22.0.0
ui-playground | Spectrum UXP, React | Playground for testing HTML, CSS, and JS snippets in Photoshop. | UXP 4.1 / PS 22.0.0
ui-react-starter | Spectrum UXP, React | Shows how to use React in a simple plugin | UXP 4.1 / PS 22.0.0

## Recommended development setup

1. Clone this repository to a location of your choice:

```
git clone git@github.com:AdobeDocs/uxp-photoshop-plugin-samples.git
```

2. Launch the [UXP Developer Tool](https://www.adobe.io/photoshop/uxp/devtool/), and use the "Add Plugin..." button to add each plugin to your workspace. (Select the `manifest.json` file inside each plugin's folder.)

3. Load plugins into Photoshop by using **••• > Load**.
