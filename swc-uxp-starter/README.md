# **UXP Plugin with Spectrum Web Component**
Since UXP v7.0
# **Objective**
This sample will help you to create a Spectrum Web Component (SWC) based UXP plugin. It includes setting up the project, integrating the SWC components, and mounting it over the host applications - Photoshop and XD.

Start by learning about [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/index.html)


# **Getting started**
1. Start by installing the dependencies `yarn install`
2. Prepare the bundle using Webpack `yarn build`. You will notice a **dist** folder after this step.
3. Load the plugin in Photoshop/XD by launching the app. Add the plugin in the UDT. Click on the plugin action menu in UDT, select More > Advanced and enter the relative location for the plugin builder folder (./dist is this case).

<img width="800" alt="package.json with resolutions block" src="assets/load-plugin-from-developer-tools.png">

<br></br>
You should be able to see a banner and a link in Photoshop plugin.


<img width="350" alt="package.json with resolutions block" src="assets/banner-starter.png">

<br></br>

# **Deep dive**
Now that the plugin is working, we can look into the details.

### **webpack.config.js**

Webpack is used to bundle the dependencies in the project therefore you would see the webpack.config.js file for basic config.

Pro tip: For debugging purposes, add `eval-cheap-source-map` in the webpack.config file to get the source map in UDT debug window.

```javascript
devtool: 'eval-cheap-source-map'
```

### **package.json**

Once you install the component (using `yarn add`) you should see the components added to the 'dependencies'.

It is recommended to use the specified versions of components. There could be inter dependancy of the components and one component could get impacted if the other upgrades. 

Also, in order to resolve transitive dependancies we need to [force resolutions](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/). Thereby to avoid incompatibility issues in sub components, one needs to mention all the dependancies in the `resolutions` block too.

### **manifest.json**

Enable SWC by setting the **enableSWCSupport flag** to true.

```
"featureFlags": {
   "enableSWCSupport": true
}
```

### **debug.json**
Contains additionall (and optional) debug config for UDT. You can specify the port number and set the option to `breakOnStart`.

### **src/index.html**
Includes index.js.

Observe that the SWC components are wrapped with a ```<sp-theme>``` element. This ensures that the Spectrum design tokens are delivered to the scoped HTML context.



### **src/index.js**
Import the components and themes to deliver the right styling to the components.
```javascript
//sp-theme
import '@spectrum-web-components/theme/sp-theme.js';
//themes to use classic and spectrum themes
import '@spectrum-web-components/theme/src/themes.js';
import '@spectrum-web-components/theme/src/express/themes.js';
```





# **Add a new component**
You can use any of the supported components listed below by following these steps:
1. Use yarn add to install the components and its supported version.

```javascript
yarn add @spectrum-web-components/link@0.14.1;
```

**Note:** Make sure to install the recommended version and add the same under the resolutions block in package.json too.

<img width="800" alt="package.json with resolutions block" src="assets/resolutions-block.png">


2. Import the component in *index.js* file.

```javascript
import '@spectrum-web-components/link/sp-link.js';
```

3. Add the component in the html file.

```html
This is an <sp-link href="#">example link</sp-link>.
```

4. Run `yarn build` or `yarn watch` to prepare the dist bundle.

# **Troubleshooting**

 If you see the following error in the console, these are some steps to resolve it.

```
Failed to execute 'define' on 'CustomElementRegistry': the name "sp-icon-alert" has already been used with this registry
```

Such errors occur when the package manager has resolved more than one copy of the component (sp-icon-alert in this case. Some of the ways to troubleshoot are:

* Make sure you dont have multiple calls to bundle.js somehow.
* Check if you have added the component in the resolutions block in package.json.
* Check if you are using correct recommended version of the package without the `^`.





Visit our online docs (https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc) to find the list of supported components







