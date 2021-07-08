# Plugin Info (Vue) - Full Application

This plugin is a good place to see a fully developed Adobe Photoshop plugin in practice. This example uses Vue JS and demonstrates working with the following:

- Multiple entry points (`command` and `panel`)
- Filesystems (using persistent tokens and reading files)
- Persistent data (through localStorage)
- Platform specific features (using UXP `os` module)
- Application specific features (using `uxp.host`)
- Theme Awareness (UXP CSS variables)

As this is a Vue project, you'll need to do some initial configuration before this will be usable in Adobe Photoshop.

(For more info on what this plugin does, how it's used, and an in-depth explanation of how it works, refer to the end of this README)

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

There are two ways to build the plugin for use in Adobe Photoshop:

- `yarn watch` or `npm run watch` will build a development version of the plugin, and recompile everytime you make a change to the source files. The result is placed in `dist`.
- `yarn build` or `npm run build` will build a production version of the plugin and place it in `dist`. It will not update every time you make a change to the source files.

> You **must** run either `watch` or `build` prior to trying to use within Photoshop!

## Launching in Photoshop

You can use the UXP Developer Tools to load the plugin into Photoshop.

If the plugin hasn't already been added to your workspace in the UXP Developer Tools, you can add it by clicking "Add Plugin..." and selecting `dist/manifest.json`. **DO NOT** select the `manifest.json` file inside the `plugin` folder.

Once added, you can load it into Photoshop by clicking the ••• button on the corresponding row, and clicking "Load". Switch to Photoshop and you should see the starter panel.

## What this plugin does

This plugin mainly provides information on any installed UXP or CEP plugins. For UXP plugins, all relevant store information is gathered and displayed. For CEP plugins, only the installed version and plugin type are shown (this is due to the limited information given in the plugin manifest).

## How to use this plugin

The usage of this plugin is fairly straightforward after the initial install. Once loaded through the UXP Developer Tool, click on `Load Plugins` to go through the first time configuration process. The setup will guide you through adding both your UXP and CEP plugin paths. For reference, they can usually be found in the following directories:

#### Windows:

| Type  | Plugin Path                                                 |
| ----- | ----------------------------------------------------------- |
| `UXP` | `%appdata%\Adobe\UXP\Plugins\External`                      |
| `CEP` | `C:\\Program Files (x86)\Common Files\Adobe\CEP\extensions` |

#### macOS:

| Type  | Plugin Path                                         |
| ----- | --------------------------------------------------- |
| `UXP` | `~/Library/Application Support/Adobe/UXP/Plugins`   |
| `CEP` | `/Library/Application Support/Adobe/CEP/extensions` |

Once both directories have been selected, click `Finish Setup` to complete the setup process. Afterwards, both your UXP and CEP plugins will be automatically loaded. Simply click on the plugin name in the list to view more information about the plugin.

At any point in time you can redo the setup process by either clicking on `Reload Plugins` in the home menu or using the plugin command called `Show Setup`. Any stored data can also be deleted by using the `Clear Data` plugin command.

## The code explained

This plugin may seem simple on the surface, however, under the hood it uses many built-in UXP provided features. In order to understand what's happening, we'll be taking a closer look at the code by going through a round trip of the user experience.

#### Home menu

The home menu serves as the navigational hub of the plugin.

On initial load, we make use of the built-in UXP [localStorage](https://www.adobe.io/photoshop/uxp/uxp/reference-js/Global%20Members/Data%20Storage/LocalStorage/). This works very similarly to `window.localStorage` on browsers and allows our plugin to store non-sensitive information that can persist across multiple sessions.

Using this, we can see whether or not our user has completed the initial setup and adjust the UI accordingly.

#### Selecting plugin directories

If a user has not completed the initial setup, or wishes to complete it again, they will be brought to the plugin selection screen. This process is vital to the functionality of the plugin because we need to gain read permissions from the user in order to interact with the plugin directories.

Using the built-in UXP [os](https://www.adobe.io/photoshop/uxp/uxp/reference-js/Modules/os/OS/) module, we can determine the operating system of the current user and adjust the suggested plugin paths.

From there, we can use `uxp.storage` to prompt the user to select each directory. This returns an [Entry](https://www.adobe.io/photoshop/uxp/uxp/reference-js/Modules/uxp/Persistent%20File%20Storage/Entry/) object which is then used to generate and save a persistent token. This token allows the plugin to read the corresponding directory across different sessions without needing to prompt the user for permission each time.

_Note: This token can expire. Therefore it's a good idea to check it at the start of each session_

#### Loading plugins

Once permission is granted to each plugin directory, an object is created from the `manifest.json` file for UXP plugins and `manifest.xml` file for CEP plugins.

JSON files can be easily be read by using [File.read()](https://www.adobe.io/photoshop/uxp/uxp/reference-js/Modules/uxp/Persistent%20File%20Storage/File/#readoptions) and then parsing the returning string into JSON using `JSON.parse(string)`

For reading XML files it becomes a bit more tricky. Unfortunately, UXP does not currently support [DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser) However, we can use an external NPM package, [xmldom](https://www.npmjs.com/package/xmldom), to act as a polyfill for `DOMParser`.

After all plugins are loaded, the final array is sorted based on the current running application (Photoshop or XD). This can be determined by using [uxp.host](https://www.adobe.io/photoshop/uxp/uxp/reference-js/Modules/uxp/Host%20Information/Host/).

#### Using plugin commands

Plugin commands provide an easy way to complete certain applications in a plugin. These are defined in two places. The `manifest.json` file and your main javascript file.

First, the `manifest.json` file in the `entrypoints` section. Commands are denoted using the `command` type along with a `label` and an `id`. The `label` is shown in the UI of the application and the `id` is referred to in your [entry points setup object](https://www.adobe.io/photoshop/uxp/uxp/reference-js/Modules/uxp/Entry%20Points/EntryPoints/#setupentrypoints). More information can be found in the manifest documentation [here](https://www.adobe.io/photoshop/uxp/guides/uxp_guide/uxp-misc/manifest-v4/).

The second place is your main javascript file. When calling `uxp.entrypoints.setup()`, an object is passed containing a list of panels and commands. Here, the `id` used in your `manifest.json` file is matched up with the key of each function.

In the case of this plugin, `clearData` will clear localStorage and reload the page while `showSetup` interfaces with the Vue app to show the setup process.
