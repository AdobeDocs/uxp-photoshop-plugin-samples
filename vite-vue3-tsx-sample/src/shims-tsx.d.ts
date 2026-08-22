/* eslint-disable */
import 'vue/jsx'
import { HTMLAttributes } from 'vue'

declare global {
  namespace JSX {
    interface IntrinsicAttributes extends HTMLAttributes {
      type?: string
    }
  }
}
