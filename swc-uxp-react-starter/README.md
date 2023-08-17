# **Developing UXP - SWC Plugin**
Since UXP v7.2
# **Objective**
This sample will help you to create a Spectrum Web Component (SWC) React based UXP plugin. It includes setting up the project, integrating the SWC components, and mounting it over the host applications - Photoshop and XD.

Check out the [UXP docs](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc) and read more about Adobe [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/index.html).

# **Requirements** 
   1. NodeJS >= 16.0.0
   2. UXP >= 7.2
# **Getting started**
1. Start by installing the dependencies `yarn install`
2. Prepare the bundle using Webpack `yarn build`. You will notice a **dist** folder after this step.
3. Load the plugin in Photoshop (minimum Version v24.4) or XD (version TBD) by launching the app. Add the plugin in the UDT by selecting `manifest.json`. Click on the plugin action menu in UDT, select More > Advanced and enter the relative location for the plugin builder folder (`./dist` is this case).

<img width="800" alt="package.json with resolutions block" src="assets/load-plugin-from-developer-tools.png">

<br></br>

You should be able to see a banner in Photoshop plugin.
<img width="350" alt="package.json with resolutions block" src="assets/menu-starter.png">



# **Add a new component**
You can use any of the supported components listed in [our docs](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc) by following these steps:

1. Use `yarn add` to install the components and its supported version.

```javascript
yarn add @swc-uxp-wrappers/link;
yarn add @swc-react/link@0.14.1-react.3029;
```

**Note:** The UXP-SWC components are delivered via wrappers over specific SWC versions. For example, `@swc-uxp-wrappers/menu` is locked and wrapped on  **0.16.9** version of ```@spectrum-web-components/menu```. Thereby for react framework we will need to use ```@swc-react/menu:0.16.9-react.3029``` which is the react-wrapper closest to the SWC component version (0.16.9) in dependency block too. Also, please note that components like `icons`,`icons-workflow`, `icons-ui`, `theme`, `shared` , `base`,`styles` do not use wrappers and therefore must be directly consumed from npm.

<img width="1125" alt="image2023-1-20_18-45-41" src="assets/package.png">


2. Register the component in `App.js` file.

```javascript
import { Link } from "@swc-react/link";
```

3. Add the component in the html file.

```html
   This is a <Link href="#">example link</Link>.
```

4. We need to put alias configuration in the webpack config file. This project contains the configuration already. Notice the `@swc-uxp-wrappers/utils` entry in the package.json. This package delivers the *alias.js* file for all the supported components which is then imported in the `webpack.config.js` file as this.
```
import { aliases } from '@swc-uxp-wrappers/utils';

```

5. Run `yarn build` to prepare the distribution bundle.
You can also use `yarn watch` to create the bundle as soon as you save your changes to any source files. Use this along with Plugin -> Watch option in UDT to sync with latest changes automatically.

# **Deep dive**
Now that the plugin is working, we can look into the details.
### **webpack.config.js**

Webpack is used to bundle the dependencies in the project therefore you would see the webpack.config.js file for basic config.

Note that we have installed the `@swc-uxp-wrappers/utils` package in the package.json file and are using it to provide [aliasing](https://webpack.js.org/configuration/resolve/#resolvealias) via mapping. We can remove this aliasing and use the same plugin on web too.

```
       resolve: {
            extensions: ['.js', '.json'],
            alias: aliases,

        }
```

Pro tip: For debugging purposes, add `eval-cheap-source-map` in the webpack.config file to get the source map in UDT debug window.

```javascript
devtool: 'eval-cheap-source-map'
```


### **.babelrc**
This is config file for `babel` library which is being used to  transpile the code to match the environment's capabilities and to transpile the JSX syntax




### **package.json**

Once you install the component (using `yarn add`) you should see the components added to the 'dependencies'.


### **manifest.json**
Enable SWC by setting the **enableSWCSupport flag** to true.

```
"featureFlags": {
   "enableSWCSupport": true
}
```

### **src/index.js**

This is typically the entry point of our React application. We need to wrap our components in `Theme` component here. Note that the `Theme` element ensures that the Spectrum design tokens are delivered to the scoped HTML context.
```
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Theme theme="spectrum" scale="medium" color="light">
      <App />
    </Theme>
  </React.StrictMode>
);

```

### **src/index.html**

Entry point of the HTML structure of React app index.js.

### **src/App.js**
This is where we define our main React component. This component serves as the root of your component tree. We can also wrap our swc components in `Theme` here.
```
function App() {
  return (
    <div>
      <h1>Welcome</h1>
    <Theme theme="spectrum" scale="medium" color="light">
        <Menu selects="single">
          <MenuItem selected>Sample Menu</MenuItem>
          <MenuDivider></MenuDivider>
          <MenuItem>Select Option 1</MenuItem>
          <MenuItem>Select Option 2</MenuItem>
          <MenuItem>Select Option 3</MenuItem>
          <MenuItem>Select Option 4</MenuItem>
          <MenuItem disabled>Disabled Option</MenuItem>
        </Menu>
        </Theme>
        <br />
        This is an <Link href="#">example link</Link>.
    </div>
  );
}

```


# **Recommended `@swc-react` versions**

Following are the react wrapper components along with the versions supported.</br>

| Components      |  Version |
| --------------- |  ------- |
| Action-Bar      |  0.5.9-react.2993 |
| Action-Button     |  0.10.8-react.2993	 |
| Action-Group      |  0.12.4-react.2993	 |
| Avatar      |  0.31.0	 |
| Banner      |  0.9.5-react.3120 |
| Button      |  0.19.8-react.3029+c59ca07be	 |
| button-group      |  0.10.6-react.3163	 |
| Card     |  0.13.4-react.2993 |
| Checkbox      |  0.14.6-react.2993 |
| Dialog      |  0.11.12|
| Divider     |  0.6.6-react.3163 |
| field-group      |  0.8.3-react.3120 |
| Field-Label      |  0.10.3-react.3029 |
| help-text      |  0.2.7-react.2993 |
| icons-workflow      |  0.9.5-react.2993 |
| Icons-ui      |  0.9.5-react.2993 |
| Illustrated-Message     |  0.9.8-react.2993 |
| Link     |  0.14.1-react.3029 |
| Menu     |  0.16.9-react.3029 |
| Menu-Group     |  0.16.9-react.3029 |
| Menu-Item     |  0.16.9-react.3029 |
| picker-button     |  0.1.4-react.2993 |
| Popover     |  0.12.13 |
| radio     |  0.11.7-react.2993 |
| radio-group     |  0.11.7-react.2993 |
| sidenav     |  0.13.6-react.3029 |
| switch     |  0.11.5-react.2993 |
| Table     |  0.1.10 |
| tags     |  0.10.3-react.3120 |
| Textfield     |  0.13.11-react.3163 |
| toast     |  0.11.11-react.3163 |
| Tooltip     |  0.11.13 |












