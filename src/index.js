export { default as DominantColor } from './components/DominantColor.vue'

export default {
  install(app) {
    app.component('DominantColor', DominantColor)
  }
}