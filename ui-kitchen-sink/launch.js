const { openExternal, openPath} = require("uxp").shell;

document.querySelector("#btnLaunchInBrowser").onclick = () => {
    openExternal("https://www.adobe.com");
}

document.querySelector("#btnLaunchEmail").onclick = () => {
    openExternal("mailto:support@adobe.com");
}

document.querySelector("#btnOpenIconInEditor").onclick = async () => {
    const fs = require("uxp").storage.localFileSystem;
    const pluginFolder = await fs.getPluginFolder();
    const iconEntry = await pluginFolder.getEntry("icons/dark@2x.png");
    openPath(iconEntry.nativePath);
}

document.querySelector("#btnOpenPluginFolder").onclick = async () => {
    const fs = require("uxp").storage.localFileSystem;
    const pluginFolder = await fs.getPluginFolder();
    openPath(pluginFolder.nativePath);
}