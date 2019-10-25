import dateTimePicker from './src/date-time-picker.vue'

dateTimePicker.install = Vue => {
  Vue.component(dateTimePicker.name, dateTimePicker)
}

export default dateTimePicker
