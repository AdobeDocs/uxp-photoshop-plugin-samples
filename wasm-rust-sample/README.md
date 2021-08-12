# WebAssembly and Rust Example

This plugin is a starting point for leveraging Rust and WebAssembly in your UXP plugins. It comes defined with most of the dependencies you need to get started. As this plugin does rely on the [Rust Programming Language](https://www.rust-lang.org/), an environment configured for Rust development will be required before this will be usable in Photoshop.


# Configuration

## Rust Environment

Before beginning ensure that the [Rust toolchain](https://www.rust-lang.org/tools/install) is installed and configured on your machine.

Follow the instructions and the `rustup` installation process. Once completed, your shell will have access to `cargo` commands.

> You **must** have the Rust toolchain installed in order to build the project

### 1. Install [wasm-pack](https://github.com/rustwasm/wasm-pack) 

```
$ cargo install wasm-pack
```

### 2. Test local Rust configuration and [wasm-pack](https://github.com/rustwasm/wasm-pack) installation 

```
$ yarn test         # or cargo test && wasm-pack test
```

## Node.js

### 1. Install the Node.js dependencies:

```
$ yarn install      # or npm install
```

### 2. Build plugin

To perform a basic, automated build of the plugin:

```
$ yarn build        # or npm run build
```

> You **must** run `build` prior to trying to use this plugin within Photoshop!

This will build a production version of the plugin and place it in `dist`. It will not update every time you make a change to the source files.

**Note:** Since UXP does not have implicit access to `localhost` for leveraging a development server, this plugin uses inline WebAssembly to work properly. As such, you'll find the following import in `js/index.js`:

```
import encodedRust from './uxp.wasm';
```

When the build script is triggerred, this JS file with the inline WebAssembly is generated. Should you wish to generate this file yourself, execute the following commands:

```
$ yarn inlinewasm   # generate JS file containing the inline WebAssembly data
```

## Launching in Photoshop

You can use the UXP Developer Tools to load the plugin into Photoshop.

If the plugin hasn't already been added to your workspace in the UXP Developer Tools, you can add it by clicking "Add Plugin..." and selecting `dist/manifest.json`. **DO NOT** select the `manifest.json` file inside the `plugin` folder.

Once added, you can load it into Photoshop by clicking the ••• button on the corresponding row, and clicking "Load". Switch to Photoshop and you should see the starter panels.

## What this plugin does

This plugin does some basic calculations in Rust and demonstrates a potential build process for leveraging Rust and WebAssembly in your UXP plugins.
