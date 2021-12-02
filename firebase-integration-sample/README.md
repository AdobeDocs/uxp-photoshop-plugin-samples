# Firebase Integration Plugin

This plugin is an example to integrate the `Firebase` library. This plugin just retrieves the data from the database specified and displays it in the plugin window. 

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

## Firestore Setup

Next, you need to create a `.env` file containing all the variables. Enter all variables from your Firebase project:

```sh
{
        echo 'API_KEY='
        echo 'AUTH_DOMAIN='
        echo 'PROJECT_ID='
        echo 'STORAGE_BUCKET='
        echo 'MESSAGING_SENDER_ID='
        echo 'APP_ID='
        echo 'COLLECTION_NAME='

} >> .env
```

## Build Process

There are two ways to build the plugin for use in Photoshop:

* `yarn watch` or `npm run watch` will build a development version of the plugin, and recompile everytime you make a change to the source files. The result is placed in `dist`. 
* `yarn build` or `npm run build` will build a production version of the plugin and place it in `dist`. It will not update every time you make a change to the source files.

> You **must** run either `watch` or `build` prior to trying to use within Photoshop!

## Launching in Photoshop

You can use the UXP Developer Tools to load the plugin into Photoshop.

If the plugin hasn't already been added to your workspace in the UXP Developer Tools, you can add it by clicking "Add Plugin..." and selecting `dist/manifest.json`. **DO NOT** select the `manifest.json` file inside the `plugin` folder.

Once added, you can load it into Photoshop by clicking the ••• button on the corresponding row, and clicking "Load". Switch to Photoshop and you should see the starter panels.



