# Desktop Helper Example
This sample has two components, a Ps plugin and an Electron application built in React. 
For developers who have used `create-react-app` before, the folder structure and tools used in the Electron application will be familiar.

Both components must be running for the example to work correctly.

# Configuration
The following steps will help you load the plugin into Photoshop and get the Electron app up and running.

### 1. Install Node.js dependencies 
```
$ cd helper 
$ yarn install   # or npm install
```

### 2. Run Helper App
```
$ cd helper
$ yarn start
```

# Load the Plugin
The plugin requires no dependencies and can be run by using the UXP Developer Tools. Click "Add Plugin..." in the UXP Developer Tools and select `plugin/manifest.json`, then click the ••• button and select "Load...". 