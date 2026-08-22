/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.css' {
  const content: any
  export default content
}

declare module '*.styl' {
  const content: any
  export default content
}

declare module '*.json' {
  const content: any
  export default content
}
