const { entrypoints } = require("uxp");
const core = require("photoshop").app;

entrypoints.setup({
  plugin: {
    create() {
      core
        .showAlert("Greetings from UXP invisible plugin.")
        .then(() => {
          console.log(
            "Plugin has been loaded, plugin.create has been triggered."
          );
        })
        .catch(console.log);
    },
  },
});
