document.getElementById("btn-layer-from-text").addEventListener("click", createLayerFromText);
document.getElementById("btn-layer-from-file").addEventListener("click", createLayerFromFile);

async function createLayerFromText() {
  const mytext = document.getElementById("mytext").value;
  if (mytext.trim()) {
    const result = await makeTextLayer(mytext.trim());
    if (result[0].message) { // a message in the result means error
      showAlert(result[0].message);
    }
    else {
      const layerID = result[0].layerID;
      console.log(`after maketextLayer, id = ${layerID}`);
    }
  }
  else {
    showAlert("Please enter something in the text field first.");
  }
}

async function createLayerFromFile() {
	const fs = require("uxp").storage.localFileSystem; // always needed to access the filesystem
	const myFile = await fs.getFileForOpening({ types: ["txt"] });
    if (!myFile) {
		showAlert("No file was selected.");
        return;
	}
    const fileContents = await myFile.read();
    const result = await makeTextLayer(fileContents);
    if (result[0].message) { // a message in the result means error
      showAlert(result[0].message);
    }
 }

async function showAlert(message) {
  	const app = require('photoshop').app;
  	await app.showAlert(message);
}

// make a text layer in the active document
// Since there's no built-in API to make a text layer (yet),
// We do it with a batchPlay call.
async function makeTextLayer(theText) {
  	const batchCommands = {
		"_obj": "make",
		"_target": [
			{
				"_ref": "textLayer"
			}
		],
		"using": {
			"_obj": "textLayer",
			"textKey": theText,
			"textShape": [
				{
					"_obj": "textShape",
					"char": {
						"_enum": "char",
						"_value": "box"
					},
					"bounds": {
						"_obj": "rectangle",
						"top": 100,
						"left": 100,
						"bottom": 400,
						"right": 500
					}
				}
			],
			"textStyleRange": [
				{
					"_obj": "textStyleRange",
					"from": 0,
					"to": theText.length,
					"textStyle": {
						"_obj": "textStyle",
						"fontName": "Myriad Pro",
						"fontStyleName": "Bold",
						"size": {
							"_unit": "pointsUnit",
							"_value": 36
						},
						"color": {
							"_obj": "RGBColor",
							"red": 100,
							"green": 0,
							"blue": 240
						},
					}
				}
			],
		"_isCommand": true
		}
 	};

  	return await require("photoshop").core.executeAsModal(async () => {
  		await require('photoshop').action.batchPlay([batchCommands], {});
  	}, { commandName: "Make New Text Layer" });
}
