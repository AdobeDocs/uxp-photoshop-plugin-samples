const { entrypoints } = require('uxp');

entrypoints.setup({
  plugin: {
    create(plugin) {
      console.log('Plugin created successfully.', plugin);
    },
    panels: {
      plugin: this, 
    },
  }
});