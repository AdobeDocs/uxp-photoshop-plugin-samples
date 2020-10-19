// Photoshop UXP Sample
// Get the layer names from the active document, and write them to a file.
// Shows how to access layers, and how to prompt the user for a filepath.

  const { entrypoints } = require("uxp");
// Set up entry points -- this defines the handler for menu items
// If this plugin had a panel, we would define flyout menu items here
entrypoints.setup({
  commands: {
    writelayers: () => writeLayers()
    // if we had other menu items, they would go here and in the manifest.json file.
  }
});

async function writeLayers() {
  try {
    const app = require("photoshop").app;
    if (app.documents.length == 0) {
      showAlert("Please open at least one document.");
      return;
    }
    const activeDoc = app.activeDocument;

    const layerNames = getLayerNames(activeDoc);
    if (layerNames) {
      await writeLayersToDisk(activeDoc.title, layerNames);
    }
    else {
      showAlert("Could not get any layer names.");
    }
  }
  catch(err) {
    showAlert(`Error occurred getting layer names: ${err.message}`);
  }
}

function getLayerNames(activeDoc) {
  // returns the name of every layer in the active document.
    const allLayers = activeDoc.layers;
    const allLayerNames = allLayers.map(layer => layer.name);
    const sortedNames = allLayerNames.sort((a, b) => a.toUpperCase() < b.toUpperCase() ? -1 : a.toUpperCase() > b.toUpperCase() ? 1 : 0);
    return sortedNames;
}

async function writeLayersToDisk(activeDocName, layerNames) {
  const fs = require("uxp").storage.localFileSystem;
  const file = await fs.getFileForSaving("layer names.txt", { types: [ "txt" ]});
  if (!file) {
    // file picker was cancelled
    return;
  }
  const result = await file.write(`Layers for document ${activeDocName}\n\n${layerNames.join('\n')}`);
}

async function showAlert(message) {
  const app = require('photoshop').app;
  await app.showAlert(message);
}