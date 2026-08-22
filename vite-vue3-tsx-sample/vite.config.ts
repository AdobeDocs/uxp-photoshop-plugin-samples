import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default function (context: {
  mode: 'development' | 'production'
  command: 'serve' | 'build'
  ssrBuild: boolean
}) {
  return defineConfig({
    base: context.command === 'build'
      ? '/dist'
      : '/',

    plugins: [
      vue(),
      vueJsx()
    ],

    build: {
      rollupOptions: {
        external: [
          'fs',
          'photoshop',
          'uxp',
          'os'
        ],
        output: {
          format: 'cjs'
        }
      }
    },

    css: {
      modules: {
        localsConvention: 'camelCaseOnly'
      }
    }
  })
}
