import './global.css';
import App from './App.svelte';
import { entrypoints } from 'uxp';

const app = new App({
  target: document.body,
  props: {
    src: 'svelte.png'
  },
});

entrypoints.setup({
  plugin: { 
    create(plugin) {
      console.log('Plugin created successfully.', plugin)
    },
    panels: {
      svelte: app,
    },
  },
});