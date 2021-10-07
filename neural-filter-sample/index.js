// function showLayerNames() {
//     const app = window.require("photoshop").app;
//     const allLayers = app.activeDocument.layers;
//     const allLayerNames = allLayers.map(layer => layer.name);
//     const sortedNames = allLayerNames.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
//     document.getElementById("layers").innerHTML = `
//       <ul>${
//         sortedNames.map(name => `<li>${name}</li>`).join("")
//       }</ul>`;
// }

const batchPlay = require("photoshop").action.batchPlay;

const triggerNeural = async () => {
  const result = await batchPlay(
    [
      {
        _obj: "invokeCommand",
        commandID: 8820,
        kcanDispatchWhileModal: true,
        _options: {
          dialogOptions: "dontDisplay"
        }
      },
      {
        _obj: "enterModalWorkspace",
        name: "Neural Filters",
        ID: 8821,
        kcanDispatchWhileModal: true,
        _isCommand: false,
        _options: {
          dialogOptions: "dontDisplay"
        }
      }
    ],{
      "synchronousExecution": false,
      "modalBehavior": "fail"
    });

  console.log(result);
}

document.getElementById("btnPopulate").addEventListener("click", triggerNeural);
