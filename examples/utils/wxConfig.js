import axios from 'axios'

const isAndroid = process.env.NODE_ENV === 'development' ? /(Android)/i.test(navigator.userAgent) : !window.__wxjs_is_wkwebview
const wxConfigOptions = {
  entryUrl: window.location.href.split('#')[0],
  loading: false,
  isConfig: false,
  configPath: undefined,
  callbacks: {
    ios: [],
    android: {}
  },
  setConfigVal: function (val, key, arg) {
    this.isConfig = val;
    (isAndroid ? this.callbacks.android[key] || [] : this.callbacks.ios).forEach(function (cb) {
      if (val) {
        typeof cb.success === 'function' && cb.success(arg)
      } else {
        typeof cb.error === 'function' && cb.error(arg)
      }
      if (isAndroid) {
        delete this.callbacks.android[key]
      } else {
        this.callbacks.ios = []
      }
    }, this)
  }
}
const CancelToken = axios.CancelToken
const cancels = {}

let configIndex = 0
const getSignature = function (index) {
  if (cancels[index - 1]) {
    typeof cancels[index - 1] === 'function' && cancels[index - 1]('aborted')
    delete cancels[index - 1]
  }
  const url = isAndroid ? window.location.href.split('#')[0] : wxConfigOptions.entryUrl
  return new Promise((resolve, reject) => {
    axios.get(window.CHH.WX_AUTH_URL + '/wechat/jsSdk', {
      params: {
        url,
        insurerCode: sessionStorage.getItem('insurerCode')
      },
      cancelToken: new CancelToken(function executor (c) {
        cancels[index] = c
      })
    }).then(({ data }) => {
      delete cancels[index - 1]
      if (data.code === 0) {
        resolve(data.data)
      } else {
        reject(data.message)
      }
    }).catch(err => {
      delete cancels[index - 1]
      reject(err)
    })
  })
}

const wxConfig = function (jsApiList = [], debug) {
  let currentIndex = configIndex

  return new Promise((resolve, reject) => {
    if (isAndroid) {
      const url = window.location.href.split('#')[0]
      if (wxConfigOptions.configPath && url !== wxConfigOptions.configPath) {
        // 切换路由
        currentIndex = ++configIndex
        wxConfigOptions.isConfig = false
        wxConfigOptions.loading = false
      }
      wxConfigOptions.configPath = url
    }

    if (wxConfigOptions.isConfig) {
      return resolve(wx)
    }

    pushCallBack(currentIndex, function (arg) {
      Promise.resolve(arg).then(resolve)
    }, function (arg) {
      Promise.resolve(arg).then(reject)
    })

    if (wxConfigOptions.loading) {
      return
    }

    wxConfigOptions.loading = true
    getSignature(currentIndex).then(data => {
      wx.config({
        debug,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: [...jsApiList.concat(['openLocation', 'getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage'])]
      })
      wx.ready(() => {
        wx.hideAllNonBaseMenuItem()
        wxConfigOptions.setConfigVal(true, currentIndex, wx)
      })
      wx.error(error => {
        wxConfigOptions.setConfigVal(false, currentIndex, error)
      })
    }).catch(error => {
      wxConfigOptions.setConfigVal(false, currentIndex, error)
    })

    function pushCallBack (index, success, error) {
      const callbacks = {
        success,
        error
      }
      if (isAndroid) {
        wxConfigOptions.callbacks.android[index] = wxConfigOptions.callbacks.android[index] || []
        wxConfigOptions.callbacks.android[index].push(callbacks)
      } else {
        wxConfigOptions.callbacks.ios.push(callbacks)
      }
    }
  })
}

export default wxConfig
