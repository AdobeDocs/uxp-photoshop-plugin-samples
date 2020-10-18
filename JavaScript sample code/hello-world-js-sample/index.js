const { entrypoints } = require("uxp");

// Set up entry points -- this defines the handler for menu items
// If this plugin had a panel, we would define flyout menu items here
entrypoints.setup({
  commands: {
    showalert: () => showAlert()
  }
});

async function showAlert() {
  // the "async" is required here because we're doing an "await" for the showAlert function
  const app = require('photoshop').app;
  console.log("About to show alert...");
  await app.showAlert("Hello world!");
  console.log("Alert dismissed.");
}