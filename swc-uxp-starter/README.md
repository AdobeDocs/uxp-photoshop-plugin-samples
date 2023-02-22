# **Developing UXP - SWC Plugin**
# **1. Objective**
This repo helps to create a UXP - SWC based plugin which includes setting up the project , integrating the SWC components and mounting it over the host app (PS/XD).
## **1.1. Quick links** 
[Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/index.html)


# **2. Getting started**
1. For a quick start , you can clone this project [**starter project**](https://git.corp.adobe.com/panbhati/swc-uxp-starter-plugin.git) .
   1. This shall have a basic component (eg Banner) already integrated.
   1. You can add the required components as follows.
2. Look for any component you want to integrate from the Supported Components section down and do a yarn install with the recommended version.

```javascript
yarn add @spectrum-web-components/link@0.14.1;
```

**Note** 👉🏼  Make sure to install the recommended version and to add the same in resolutions block too. 

<img width="1125" alt="image2023-1-20_18-45-41" src="https://git.corp.adobe.com/storage/user/38751/files/bb793842-8709-41a1-b100-9905d753897b">


3. Register the component in *index.js* file.

```javascript
import '@spectrum-web-components/link/sp-link.js';
```

4. Add the component in the html file.

<img width="1538" alt="image2023-1-23_0-34-37 (1)" src="https://git.corp.adobe.com/storage/user/38751/files/aa599b1e-2961-41a9-b2ff-0083c6b59637">

5.Run *yarn build or yarn watch.*

The webpack bundles the libraries in the ***dist*** folder and from here on , you can load the plugin on host (PS/XD).
### **2.1. Loading the plugin over PS**
1. Copy the path of the *manifest.json* file in the **dist** folder
2. In the UDT application , click on Add Plugin and paste the path copied.
3. Click on the menu next to the loaded Plugin and click Load.
   <img width="1209" alt="image2023-1-20_18-59-31" src="https://git.corp.adobe.com/storage/user/38751/files/a6c8196e-b9b3-4915-b342-e2c3f0c835df">
   <img width="938" alt="image2023-1-20_19-0-8" src="https://git.corp.adobe.com/storage/user/38751/files/b2a88354-0ea7-4816-a4f0-949abba69f25">

# **3. Inside the basic setup configuration**
Now that we have a basic plugin working , we can look into the configurations of our project.

1. **webpack.config.js** 
   Webpack is used to bundle the dependancies in the project therefore you would see the webpack.config.js file for basic config.

Note: Fore debugging purposes , add eval-cheap-source-map in the webpack.config file in order to get source map in UDT debug window.

```
devtool: 'eval-cheap-source-map'
```

2. **package.json**

All the components would get mentioned in the *dependancies* as well as *resolutions* block here.

3. **manifest.json**

The main entry point for loading on host app.
  **👉🏼   Note:** The SWC features would need the flag **enableSWCSupport** to be set to true here.

 <img width="1274" alt="image2023-1-20_19-15-37" src="https://git.corp.adobe.com/storage/user/38751/files/9aefa686-4a52-48c5-8746-e815c1e18cc5">

4. **debug.json**

This is the basic setup file in order to debug the plugin over Developer tools and mentions the port over which it must be done.

5. **src/index.html**

This is where the source markup goes in along with linking of the *main.bundle.js* file.

**👉🏼   Note:** Make sure to wrap the SWC components in <**sp-theme>**  element which delivers the Spectrum design tokens to scoped HTML context.

<img width="1417" alt="image2023-1-20_19-22-31" src="https://git.corp.adobe.com/storage/user/38751/files/1aaead3e-d4b3-453c-9f55-8d1668024711">

6. **src/index.js**

Registration of the components takes place here. Before the component registration , make sure to to register/import the *sp-theme* and *src/themes* to deliver the styling to the components.

**Requisite imports**

```javascript
//sp-theme

import '@spectrum-web-components/theme/sp-theme.js';


//themes to use classic and spectrum themes

import '@spectrum-web-components/theme/src/themes.js';

import '@spectrum-web-components/theme/src/express/themes.js';
```

<img width="1239" alt="image2023-1-20_19-29-43" src="https://git.corp.adobe.com/storage/user/38751/files/6f7b68ec-8eeb-4776-85c9-bcc9bc43002d">



# **4. Frequently Asked Questions**
1. Do I need to install specified versions of the components? 
   👉🏼 Yes. It is recommended to use the specified versions. There could be inter dependancy of the components and one component could get impacted if the other upgrades.  The [**wiki**](https://wiki.corp.adobe.com/display/UXP/Support+for+Spectrum+Web+Components+in+UXP) would keep getting updated for the supported versions of the components.
2. Do I need to wrap all the components in <sp-theme> ?
   👉🏼 Yes. <sp-theme> is the one which delivers the spectrum style tokens to the wrapped html.
   💡 Also make sure to import the theme data parts as mentioned in point 6.
3. Why do I need the resolution block in the package.json?
   👉🏼 In order to resolve transitive dependancies we need to [force resolutions](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/). Thereby to avoid incompatibility issues in sub components, one needs to mention all the dependancies in the resolution block too.
4. I am facing error like the following in the console. How do I resolve this ?

```
Failed to execute 'define' on 'CustomElementRegistry': the name "sp-icon-alert" has already been used with this registry
```

* 👉🏼 Errors like this occur when the package manager has resolved more than one copy of component (sp-icon-alert in this case) package. You can check on the following when face this issue.
     * a. Make sure you dont have multiple calls to bundle.js somehow.
     * b. Check if you have added the component in the resolutions block in package.json.
     * c. Check if you are using correct recommended version of the package without the ^.
5. Where do I find sample plugins for the reference?
   👉🏼 You can refer to different branches of this [repo](https://git.corp.adobe.com/panbhati/swc-uxp-starter-plugin).


# **5. Supported Components**
Following are the components with their variants supported along with the versions. Text color of the variants represent the state as in : </br>
🟢 👉🏼 Variant is working as per the specs of latest  SWC(web) version. </br>
🟠 👉🏼 Variant is working as per latest specs however minor styling issues present with a workaround that can be applied in UXP plugin.</br>
🔴 👉🏼 Variant has issues due to missing UXP core platform features. Will be addressed only in later releases.</br>

| Components      | Variants with status | Version |
| --------------- | -------------------- | ------- |
| Action-Bar      |   Fixed 🟢    </br>   Sticky 🔴      |      0.5.9 |
| Action-Button   |  Standard 🟢   </br>  Selected 🟢  </br>   Disabled	 🟢 </br>  Quiet 🟢  </br>   Emphasized 🟢  </br>  Toggles 🔴  </br>   hold-affordance 🟢  | 0.8.7 |
| Action-group |   Standard 🟢  </br>  selects (single/multiple) 🔴  </br>  Selected  🟢 </br>  Vertical 🟢   | 0.12.4 |
| Avatar |   Standard 🟢   | 0.10.3 |
| Banner |   Info 🟢  </br>  Error 🟢  </br>   Corner placement 🟢   | 0.9.2 |
| Button |   Accent 🟠  </br>   Primary 🟠  </br>  Secondary 🟠  </br>  Negative 🟠  </br>  Black 🟠  </br>  White 🟠  </br>  Content with label 🟢  </br>  Content with icon 🟢  </br>  Content with svg 🟠 </br> | 0.19.8 |
| Card |   Normal 🟢  </br>   Action 🔴  </br>  No preview Image 🟢  </br>  Quiet 🟢  </br>  Gallery 🟢  </br>  Horizontal 🟢  </br>  Linking 🟢  | 0.13.4 |
| Divider |   Horizontal 🟢  </br>   Vertical 🟢  </br> | 0.5.0 |
| Field-Label |   Standard 🟢  </br>  Start 🟢  </br>  End 🔴  </br> | 0.10.3 |
| icons-workflow |   Standard 🟢  </br> | 0.9.5 |
| Icons-ui |   Standard 🟢  </br> | 0.9.5 |
| Illustrated-message |    Standard 🟢  | 0.9.8 |
| Link |    Standard 🟢  </br>   Secondary 🟢  </br>  Static colored 🟢  </br>  Quiet 🟢  </br>| 0.14.1 |
| Menu |   Standard 🟢  </br>  With pop-over 🟢  </br>  Selects (Single/Multiple) 🔴  </br> | 0.16.9 |
| Menu-group |   Standard 🟢  </br> | 0.16.9 |
| Menu-item |   Standard 🟢  </br>  Icon-slot 🟢  </br>  Value-slot 🟢  </br>  Sub menu 🔴  </br> | 0.16.9 |
| Popover |   No Tip 🟢  </br>  With Tip 🔴  </br>  Dialog Popover  🟢 </br> | 0.12.4 |














