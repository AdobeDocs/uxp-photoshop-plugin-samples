let depthblur_FocalDist = 50;
let depthblur_Aperture = 50;

// --------------------------
// Sample Plugin Logic

document.getElementById("depthblur-slideFocalDist").addEventListener("change", ({ target }) => {
  depthblur_FocalDist =  Math.round(target.value);
});

document.getElementById("depthblur-slideAperture").addEventListener("change", ({ target }) => {
  depthblur_Aperture =  Math.round(target.value);
});

const toggleEnableExec = (id, enable) => {
  document.getElementById(id).disabled = !enable;
  document.getElementById(id).innerText = !enable ? "Working" : "Apply";
}

// --------------------------
// Neural Filter Trigger Logic

const { core, app } = require("photoshop");

// Register listeners for Neural Gallery Filter events just for dev
require("photoshop").action.addNotificationListener(
  ["neuralGalleryFilters"], 
  ({ NF_UI_DATA }) => {
    console.log(NF_UI_DATA["spl::filterStack"]);
  }
);

/**
 * Execute a neural filter
 * @param {object} filters Neural Filter Settings
 * @returns BatchPlay response
 */
function executeNeualFilter(filters, then) {
  core.executeAsModal(() => {
    app.batchPlay(
      [{
        "_obj": "neuralGalleryFilters",
        "NF_OUTPUT_TYPE": 2,
        "_isCommand": true,
        "NF_UI_DATA": {
          "_obj": "NF_UI_DATA",
          "spl::version": "1.0.6",
          "spl::filterStack": filters
        }
      }], 
      {}
    ).then(then);
  });
}


function applyHazeFilter() {
  toggleEnableExec("exec-depthblur", false);
  executeNeualFilter(
    // Obtain this object's structure from the 
    // notification listener logs
    [{
      "_obj": "spl::filterStack",
      "spl::enabled": true,
      "spl::id": "internal.Hazy",
      "spl::version": "1.0",
      "spl::cropStates": [{
        "_obj": "spl::cropStates",
        "spl::cropId": "layer1",
        
        // Values in the filter's UI
        "spl::values": {             
          "_obj": "spl::values",
          "spl::slideFocalRange": 50,
          "spl::slideAperture": depthblur_Aperture,
          "spl::slideFocalDist": depthblur_FocalDist,
          "spl::sliderSelectResolutionLevel": 2,
          "spl::generateDepthMap": false,
          "spl::focalSelector": null,
          "spl::sliderBrightness": null,
          "spl::sliderHaze": null,
          "spl::sliderSaturation": null,
          "spl::sliderWarmness": null
        }
      }]
    }],
    () => toggleEnableExec("exec-depthblur", true)
  );
}


function applyStyleTransfer() {
  toggleEnableExec("exec-styletx", false);
  executeNeualFilter(
    // Obtain this object's structure from the 
    // notification listener logs
    [{
      "_obj": "spl::filterStack",
      "spl::enabled": true,
      "spl::id": "internal.StyleTransfer",
      "spl::version": "1.0",
      "spl::cropStates": [{
        "_obj": "spl::cropStates",
        "spl::cropId": "layer1",
        
        // Values in the filter's UI
        "spl::values": {
          "_obj": "spl::values",
          "spl::brushSize": 100,
          "spl::preserveColor": false,
          "spl::preserveWeight": 100,
          "spl::refImageAndCrop": null,
          "spl::sliderBlur": 0,
          "spl::sliderBrightness": null,
          "spl::sliderMultipleIterations": 0,
          "spl::sliderSaturation": null,
          "spl::style": "style28_crop",
          "spl::style_transfer_option": "style_transfer"
        }
      }]
    }],
    () => toggleEnableExec("exec-styletx", true)
  );
}

// On button click, try to run BatchPlay
document.getElementById("exec-depthblur").addEventListener("click", applyHazeFilter);

// On button click, try to run BatchPlay
document.getElementById("exec-styletx").addEventListener("click", applyStyleTransfer);
