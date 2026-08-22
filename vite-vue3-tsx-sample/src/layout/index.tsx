import { app } from 'photoshop'
import { defineComponent, ref } from 'vue'

import style from './index.module.styl'

const AppLayout = defineComponent({
  name: 'AppLayout',

  setup () {
    const layerListRef = ref<string[]>([])

    const onLayerBtnClick = () => {
      const allLayers = app.activeDocument.layers
      const allLayerNames = allLayers.map(layer => layer.name)
      const sortedNames = allLayerNames.sort((a: string, b: string) => a < b ? -1 : a > b ? 1 : 0)
      layerListRef.value = sortedNames
    }

    return () => (
      <div class={style.appLayout}>
        <sp-heading>Layers</sp-heading>

        <sp-body id="layers">
          <ul>{
            layerListRef.value.map(layerName => (
              <sp-body>{layerName}</sp-body>
            ))
          }</ul>
        </sp-body>

        <footer>
          <sp-button onClick={onLayerBtnClick}>Populate Layers</sp-button>
        </footer>
      </div>
    )
  }
})

export {
  AppLayout
}
