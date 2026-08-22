# Adobe UXP Vite Vue3 TSX Sample

This is an UXP sample that mainly consists of Vite and Vue 3 with TSX.

## Quick start

1. Clone this sample.

2. Make sure to change the `id` and `name` in `manifest.json`.

3. After the building process, open the project in UXP Developer Tools.

## NPM scripts

 - `build`: Build the UXP plugin.
 - `watch`: Just for your development. Invoke `npm run build` after some file was changed.

## Vue single file component

This template has been configured with `@vitejs/plugin-vue` so SFC should work out of box.

## SWC

You can switch to swc by using [unplugin-swc](https://github.com/unplugin/unplugin-swc) to make `emitDecoratorMetadata` work.

### vite.config.ts

```ts
import vue from '@vitejs/plugin-vue'
import swc from 'unplugin-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: false,  // ESBuild must be disabled.

  plugins: [
    swc.vite()  // Add unplugin-swc.
  ],

  build: {
    minify: 'terser',  // You have to add a minifier after disabling ESBuild.
  },
})
```

### .swcrc

```json
{
  "isModule": true,
  "jsc": {
    "target": "es2020",
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": true
    },
    "transform": {
      "legacyDecorator": true,
      "decoratorMetadata": true
    },
    "experimental": {
      "plugins": [
        ["swc-plugin-vue-jsx", {}]  // If you want to use Vue 3 in J/TSX form.
      ]
    }
  }
}
```

## Notice

Some libs like `Vue-i18n`, `Vue-Router` are not working in UXP environment, take care.
