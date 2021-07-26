# Cross-Compatible JS Sample

This plugin is a good place to get started when building a cross-compatible Adobe Photoshop and Adobe XD plugin using vanilla Javascript. To make building for both platforms as simple as possible, this project makes use of Webpack. Because of this, you'll need to do some initial configuration before this will be usable in Adobe Photoshop or Adobe XD.

## Install dependencies

First ensure that your terminal is in the root of this project. Then:

For `yarn` users, install all dependencies using:

```
yarn install
```

For `npm` users, install all dependencies using:

```
npm install
```

## Build Process

### Development

To build the plugin for development, there are two scripts defined in the `package.json` file that can be used. Both scripts make use of the `host` key in the plugin's `manifest.json` file. Here, an array is used to specify the required versions for both Photoshop and XD. This allows the UXP Developer Tool to automatically create a plugin entry for each specified application when the plugin is loaded. Thus allowing you to test in both applications using the same manifest and `dist` folder.

Information on the two scripts can be found below:

- `yarn watch` or `npm run watch` will build a development version of the plugin, and recompile everytime you make a change to the source files. The result is placed in `dist`.
- `yarn build` or `npm run build` will build a development version of the plugin and place it in `dist`. It will not update every time you make a change to the source files.

### Production

To build the plugin for production, another set of scripts are defined in the `package.json` file. In production only one application can be specified in the `manifest.json` file unlike during development. To solve this, each script specifies a target application that will then be used by Webpack during the building process. Before the build is complete, the `host` key in the manifest file in the `dist` directory will be changed to match the desired target application.

 Information on the two scripts can be found below:

- `yarn build-ps` or `npm run build-ps` will build a production version of the plugin for Adobe Photoshop and place it in `dist`.
- `yarn build-xd` or `npm run build-xd` will build a production version of the plugin for Adobe XD and place it in `dist`.

> You **must** run either `watch` or `build` prior to trying to use within Photoshop or XD!

## Launching in Photoshop and XD

You can use the UXP Developer Tools to load the plugin into Photoshop and XD.

If the plugin hasn't already been added to your workspace in the UXP Developer Tools, you can add it by clicking "Add Plugin..." and selecting `dist/manifest.json`. **DO NOT** select the `manifest.json` file inside the `plugin` folder.

Once added, two different entries will be created. One for use with Photoshop, and the other for use with XD. You can load it into Photoshop by clicking the ••• button on the corresponding row, and clicking "Load".

### Photoshop

To load the plugin into Photoshop, click the ••• button on the corresponding row, and click "Load". Switch to Photoshop and you should see the panel for the sample.

### XD

To load the plugin into XD, click the ••• button on the corresponding row, and click "Load". Switch to XD and then go to "Plugins" &rightarrow; Cross Compatible JS Sample &rightarrow; Cross Compatible JS Sample. This will then open the panel for the plugin.

## What this plugin does

This plugin doesn't do much, but does illustrate how to create a panel that interacts with both Photoshop and XD. The plugin primarily allows you to create a simple text label by providing text in the box under "Enter Text" and clicking on "Create Label". In addition, information on the current application can be viewed by clicking on the "?" button in the top right hand corner.
