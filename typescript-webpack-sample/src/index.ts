import {shell} from 'uxp';
import {getLayerNames} from "./layer-names";

const layersOutput = document.getElementById("layers");

function showLayerNames(): void {
    if (layersOutput) {
        const listItems = getLayerNames().map(name => `<li>${name}</li>`).join("");
        layersOutput.innerHTML = `<ul>${listItems}</ul>`;
    }

    // to demonstrate that the UXP import works as well:
    shell.openExternal('https://github.com/AdobeDocs/uxp-photoshop-plugin-samples/')
}

document.getElementById("btnPopulate")?.addEventListener("click", showLayerNames);
