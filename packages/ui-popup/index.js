import uiPopup from './src/uiPopup.vue'

uiPopup.install = Vue => {
  Vue.component(uiPopup.name, uiPopup)
}

export default uiPopup
