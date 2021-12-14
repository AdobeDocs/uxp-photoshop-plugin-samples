import "./index.css";

import { entrypoints, storage } from "uxp";
import { app, action, core } from "photoshop";
import JSZip from "jszip";

const fs = storage.localFileSystem;

let tempZip;

entrypoints.setup({
  panels: {
    plugin: {
      show() {}
    }
  }
});

async function importZip() {
  try {
    const file = await fs.getFileForOpening({ types: ["zip"] });

    if (!file) return;

    const zip = await JSZip.loadAsync(await file.read({ format: storage.formats.binary }));
    const temp = await fs.getTemporaryFolder();

    const activeDoc = app.activeDocument;

    zip.forEach(async (path, file) => {
      const paths = path.split("/");
      const fileName = paths[paths.length - 1];

      if (!["png", "jpeg", "jpg"].includes(fileName.split(".")[1])) return;

      const image = await temp.createFile(fileName);

      try {
        await image.write(await file.async("arrayBuffer"), { format: storage.formats.binary });
        await app.open(image);
      } catch (err) {
        logError(err);
      } finally {
        image.delete();

        app.activeDocument = activeDoc;
      }
    });
  } catch (err) {
    logError(err);
  }
}

async function exportArtboards() {
  try {
    const file = await fs.getFileForSaving("Artboards.zip", { types: ["zip"] });

    if (!file) return;

    const temp = await fs.getTemporaryFolder();
    
    // With 23.0, all state changing calls have to be made inside a modal execution state.
    await require("photoshop").core.executeAsModal(async () => {
      const artboards = app.activeDocument.artboards;

      for (let artboard of artboards) {
        const command = {
          _obj: "exportSelectionAsFileTypePressed",
          _target: {
            _ref: "layer",
            _id: artboard.id
          },
          fileType: "png",
          quality: 32,
          metadata: 0,
          destFolder: temp.nativePath,
          sRGB: true,
          openWindow: false,
          _options: { dialogOptions: "dontDisplay" }
        };
  
        await action.batchPlay([command], {});
      }
    }, { commandName: "Export Artboards"});

    const zip = new JSZip();

    for (let entry of await temp.getEntries()) {
      const data = await entry.read({ format: storage.formats.binary });

      zip.file(entry.name, data);
    }

    file.write(await zip.generateAsync({ type: "arraybuffer" }));

    app.showAlert(`Export complete!`);
  } catch (err) {
    logError(err);
  }
}

async function importFiles() {
  try {
    const files = await fs.getFileForOpening({ types: ["*"], allowMultiple: true });

    if (!files) return;

    tempZip = new JSZip();

    for (let entry of files) {
      const data = await entry.read({ format: storage.formats.binary });
      const path = entry.name.split("\\");

      tempZip.file(path[path.length - 1], data);
    }

    document.getElementById("saveZip").disabled = false;
  } catch (err) {
    logError(err);
  }
}

async function saveZip() {
  if (!tempZip) return logError("No files to zip...");

  try {
    const file = await fs.getFileForSaving("files.zip", { types: ["zip"] });

    if (!file) return;

    file.write(await tempZip.generateAsync({ type: "arraybuffer" }));

    document.getElementById("saveZip").disabled = false;

    app.showAlert(`ZIP complete!`);
  } catch (err) {
    logError(err);
  }
}

function logError(err) {
  const label = document.getElementById("error");

  console.error(err);

  label.innerHTML = "<b>Error: </b>" + (err?.message || err);
  label.style.display = "block";

  setTimeout(() => {
    label.style.display = "none";
  }, 5000);
}

window.addEventListener("load", () => {
  document.getElementById("importZip").onclick = importZip;
  document.getElementById("exportArtboards").onclick = exportArtboards;

  document.getElementById("importFiles").onclick = importFiles;
  document.getElementById("saveZip").onclick = saveZip;
});
