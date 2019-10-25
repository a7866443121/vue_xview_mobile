export default function (el, params) {
  let store = window.store
  // 初始化一个Promise
  var resolve
  var reject
  var promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  // 初始化弹窗
  var popups = Vue.extend(el)
  var vEl = new popups({
    store,
    router: window.$router,
    propsData: {
      params: Object.assign({}, params)
    },
    data: {
      visible: true

    },
    methods: {
      resolve (arg) {
          resolve(arg)
          this.visible = false
        },
      reject (arg) {
          reject(arg)
          this.visible = false
        },
      closed () {
          this.visible = false
          removePopup()
        }
    }
  })
  // 把弹窗挂载到body
  var shadeEl = vEl.$mount().$el
  document.body.appendChild(shadeEl)


  // 从body中移除弹窗体
  function removePopup () {
    document.body.removeChild(shadeEl)
  }

  return promise
}
