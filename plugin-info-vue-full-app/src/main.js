import Vue from "vue";
import App from "./App.vue";

const { entrypoints } = require("uxp");

Vue.config.productionTip = false;
Vue.config.ignoredElements = ["sp-icon"];

const VueApp = new Vue({
  render: h => h(App)
});

entrypoints.setup({
  panels: {
    pluginInfo: {
      show() {
        VueApp.$mount("#app");
      }
    }
  },
  commands: {
    clearData() {
      localStorage.clear();

      window.location.reload();
    },
    showSetup() {
      VueApp.$children[0].setup = true;
    }
  }
});
