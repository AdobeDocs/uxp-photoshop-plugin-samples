const  { entrypoints}= require("uxp");
const core = require('photoshop').app;
entrypoints.setup({
    plugin: {
        create() {
            console.log("Plugin has been loaded, plugin.create has been triggered.");
            core.showAlert("Greetings from UXP invisible plugin.");
        }
    },

    
});

