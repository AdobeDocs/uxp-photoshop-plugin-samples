import hello from "./hello.vue";
import {
  createApp
} from 'vue'
const {
  entrypoints
} = require("uxp");

// ugly fix for ReferenceError: SVGElement is not defined
global.SVGElement = global.Element;

entrypoints.setup({
  panels: {
    helloworld: {
      create() {
        createApp(hello).mount('#container')
      },
    },
  },
});