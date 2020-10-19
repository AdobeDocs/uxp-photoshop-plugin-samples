function showLayerNames() {
    const app = require("photoshop").app;
    if (app.documents.length == 0) {
      showAlert("Please open at least one document.");
      return;
    }
    const activeDocTitle = app.activeDocument.title;
    document.getElementById("layer-title").innerHTML = `Layers for document ${activeDocTitle}`;
    const allLayers = app.activeDocument.layers;
    const allLayerNames = allLayers.map(layer => layer.name);
    const sortedNames = allLayerNames.sort((a, b) => a.toUpperCase() < b.toUpperCase() ? -1 : a.toUpperCase() > b.toUpperCase() ? 1 : 0);
    document.getElementById("layers").innerHTML = `
      <ul>${
        sortedNames.map(name => `<li>${name}</li>`).join("")
      }</ul>`;
}

async function showAlert(message) {
  // the "async" is required here because we're doing an "await" for the showAlert function
  const app = require('photoshop').app;
  await app.showAlert(message);
}

function clearList() {
  document.getElementById("layers").innerHTML = "";
}

document.getElementById("btnPopulate").addEventListener("click", showLayerNames);
document.getElementById("btnAlert").addEventListener("click", function () {showAlert("hello world")});
document.getElementById("btnCLear").addEventListener("click", clearList);
