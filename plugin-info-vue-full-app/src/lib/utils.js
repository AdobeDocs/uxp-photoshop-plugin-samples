import { host } from "uxp";
import { DOMParser } from "xmldom";

const utils = {
  async loadPlugins(pluginDir, type) {
    const plugins = (await pluginDir.getEntries()).map(async plugin => {
      if (!plugin.isFolder) return false;

      const manifest = await utils.getManifest(plugin, type);

      if (!manifest) return false;

      return {
        id: manifest.id,
        name: manifest.name,
        version: manifest.version,
        app: manifest.app,
        manifest: manifest,
        folder: plugin,
        type
      };
    });

    const app = host?.name === "Photoshop" ? "PS" : "XD";

    return (await Promise.all(plugins)).filter(plugin => plugin?.app === app && !plugin.id.includes("adobe"));
  },
  async getManifest(plugin, type) {
    try {
      const manifest = await utils.findManifest(plugin);

      if (!manifest) return null;

      if (type === "uxp") {
        const json = JSON.parse(await manifest.read());

        json.app = json.host.app;

        return json;
      } else if (type === "cep") {
        const dom = new DOMParser().parseFromString(await manifest.read());

        const attributes = dom.documentElement.attributes;
        const hostTags = dom.documentElement.getElementsByTagName("Host");

        const hosts = [];

        for (let i = 0; i < hostTags.length; i++) {
          hosts.push(hostTags.item(i).attributes.getNamedItem("Name").value);
        }

        const id = attributes.getNamedItem("ExtensionBundleId").value;

        return {
          id,
          name: attributes.getNamedItem("ExtensionBundleName")?.value || id,
          version: attributes.getNamedItem("ExtensionBundleVersion").value,
          app: hosts.includes("PHSP") || hosts.includes("PHXS") ? "PS" : undefined,
          dom
        };
      }
    } catch (err) {
      console.error(err);

      return null;
    }
  },
  async findManifest(entry) {
    const entries = await entry.getEntries();

    const csxsFolder = entries.find(entry => entry.name.toLowerCase() === "csxs");

    if (csxsFolder) {
      return csxsFolder.getEntry("manifest.xml");
    } else {
      return entry.getEntry("manifest.json");
    }
  }
};

export default utils;
