# Photoshop TypeScript / Webpack Sample

Based on the "Starter Photoshop Plugin (Vanilla)" from the UXP Developer Tool, this sample shows how to use TypeScript and webpack in combination with the `@types/photoshop` TypeScript definitions for Photoshop plugin development.

## Building the plugin

In the plugin folder (that contains the `package.json` file), install the dependencies by running:

```shell
npm install
```

or

```shell
yarn install
```

After that, you need to build the plugin's `dist/index.js` file (that the `index.html` loads) by running:

```shell
npm run build
```

or

```shell
yarn build
```

This, internally, runs `webpack` and builds the `dist/index.js` from the `src/index.ts` file.

After that, you can load the plugin into Photoshop using the UXP Developer Tool:

## Loading in Photoshop

You can load this plugin directly in Photoshop by using the UXP Developer Tools application. Once started, click "Add Plugin...", and navigate to the "manifest.json" file in this folder. Then click the ••• button next to the corresponding entry in the developer tools and click "Load". Switch over to Photoshop, and the plugin's panel will be running.
