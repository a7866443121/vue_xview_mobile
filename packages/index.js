import xButton from './button/index.js'
import xRow from './row/index'
import xTag from './tag/index'
import xShowMore from './show-more/index'
import xLimitTextArea from './limit-textarea/index'
import xAlert from './alert/index'
import xLoadingBar from './loading-bar/index'
import xShade from './shade/index'
import MetaInfo from './meta-info/index'
import {xFiexdColumnTable, xResizeTable} from './table/index'
import uiPopup from './ui-popup/index'
import dateTimePicker from './date-time-picker/index'
import basis from './basis/index'
// js组件
import jsComp from './js'

const components = [
  xButton,
  xRow,
  xTag,
  xShowMore,
  xLimitTextArea,
  xAlert,
  xResizeTable,
  xFiexdColumnTable,
  uiPopup, ...basis,
  dateTimePicker
]
const install = Vue => {
  // 注册el组件
  components.map(component => Vue.component(component.name, component))
  // 注册loading
  Vue.prototype.$loading = xLoadingBar
  // 注册蒙版
  Vue.prototype.$shade = xShade
  // 注册js组件
  for (const key in jsComp) {
    Vue.prototype[key] = jsComp[key]
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  xButton,
  xRow,
  xTag,
  xShowMore,
  xLimitTextArea,
  xAlert,
  xLoadingBar,
  xShade,
  xResizeTable,
  xFiexdColumnTable,
  MetaInfo,
  uiPopup
}
