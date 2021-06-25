import React from "react";

import "./styles.css";
import { PanelController } from "./controllers/PanelController.jsx";
import { CommandController } from "./controllers/CommandController.jsx";
import { About } from "./components/About.jsx";
import { Demos } from "./panels/Demos.jsx";
import { MoreDemos } from "./panels/MoreDemos.jsx";

import { entrypoints } from "uxp";

const aboutController = new CommandController(({dialog}) => <About dialog={dialog}/>, {id: "showAbout", title: "React Starter Plugin Demo", size: {width: 480, height: 480} });
const demosController =  new PanelController(() => <Demos/>, {id: "demos", menuItems: [
  { id: "reload1", label: "Reload Plugin", enabled: true, checked: false, oninvoke: () => location.reload() },
  { id: "dialog1", label: "About this Plugin", enabled: true, checked: false, oninvoke: () => aboutController.run() },
]});

/*
const moreDemosController =  new PanelController(() => <MoreDemos/>, {id: "moreDemos", menuItems: [
  { id: "reload2", label: "Reload Plugin", enabled: true, checked: false, oninvoke: () => location.reload() }
]});
*/

entrypoints.setup({
  plugin: {
    create(plugin) { /*optional */ console.log("created", plugin); },
    destroy() { /*optional */ console.log("destroyed"); }
  },
  commands: {
    showAbout: aboutController
  },
  panels: {
    demos: demosController,
 //   moreDemos: moreDemosController
  }
});

/* NFs

const da = {
 "_obj": "neuralGalleryFilters",
 
 "NF_UI_DATA": {
  "spl::filterStack": [
   {
    "spl::cropStates": [
     {
      "spl::cropId": "layer1",
      "spl::values": {
       "spl::sliderBrightness": 23,
       "spl::sliderHaze": 59,
       "spl::sliderWarmness": 35
      }
     }
    ],
    "spl::enabled": true,
    "spl::id": "internal.Hazy",
    "spl::version": "1.0"
   }
  ],
  "spl::version": "1.0.6"
 },
 "NF_OUTPUT_TYPE": 4,
 "_isCommand": true
}

const sm = {
 "_obj": "neuralGalleryFilters",
 
 "NF_UI_DATA": {
  "spl::filterStack": [
   {
    "spl::cropStates": [
     {
      "spl::cropId": "layer1",
      "spl::values": {
       "spl::adaptiveTransfer": true,
       "spl::brushSize": 50,
       "spl::preserveColor": false,
       "spl::preserveWeight": 90,
       "spl::sliderBlur": 27,
       "spl::sliderBrightness": null,
       "spl::style": "vg_starry_night"
      }
     }
    ],
    "spl::enabled": true,
    "spl::id": "internal.StyleTransfer",
    "spl::version": "1.0"
   }
  ],
  "spl::version": "1.0.6"
 },
 "NF_OUTPUT_TYPE": 4,
 "_isCommand": true
}


const bp = {
 "_obj": "neuralGalleryFilters",
 "NF_UI_DATA": {
  "spl::filterStack": [
   {
    "spl::cropStates": [
     {
      "spl::cropId": "face1",
      "spl::values": {
       "spl::skinDetailsSlider": 10,
       "spl::skinStengthSlider": 27
      }
     }
    ],
    "spl::enabled": true,
    "spl::id": "internal.SkinSmoothing",
    "spl::version": "1.0"
   }
  ],
  "spl::version": "1.0.6"
 },
 "NF_OUTPUT_TYPE": 4,
 "_isCommand": true
}


const bp = {
 "_obj": "neuralGalleryFilters",
 "NF_UI_DATA": {
  "spl::filterStack": [
   {
    "spl::cropStates": [
     {
      "spl::cropId": "face1",
      "spl::values": {
       "spl::skinDetailsSlider": 10,
       "spl::skinStengthSlider": 27
      }
     }
    ],
    "spl::enabled": true,
    "spl::id": "internal.SkinSmoothing",
    "spl::version": "1.0"
   }
  ],
  "spl::version": "1.0.6"
 },
 "NF_OUTPUT_TYPE": 4,
 "_isCommand": true
}

app.batchPlay([bp], {})
*/