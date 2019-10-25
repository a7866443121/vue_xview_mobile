import wxConfig from '@/utils/wxConfig'

function check(reg) {
  return function (text) {
    return reg.test(text)
  }
}

// 联系方式正则
const telReg = /^1[0-9]{10}$/

// 车牌正则
const plateNumberReg =  /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/;

// 车架号正则
const vinNoReg = /^[A-Z0-9]{6,20}$/

// 身份证号正则
const cardReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/

// 发动机号正则
const engineNumberReg = /^[A-Z0-9]{6,20}$/


// 校验电话
export const checkTel = check(telReg)

// 校验车牌 
export const checkPlate = check(plateNumberReg)

// 车架号校验
export const checkVinNo = check(vinNoReg)

// 身份号校验
export const checkCard = check(cardReg)

// 发动机号校验
export const checkengineNumber = check(engineNumberReg)

// 打开微信内置地图
export const openWxMap = (config) => {
  wxConfig([]).then(wx => {
    wx.ready(() => {
      wx.openLocation(config)
    })
  })
}

// 校验默认车辆
export const checkDefaultCar = (successFn, cancelFn) => {
  const vm = new Vue()
  vm.$api.getUserCars().then(res => {
    store.commit('setUserCars', res || [])
    
    if (!res.length) {
      store.commit('setDefaultCar', {})
    }
    else {
      const defaultCarInfo =  res.find(v => v.defaultCar)
      store.commit('setDefaultCar', defaultCarInfo)
    }
    
    successFn && successFn(res || [])
  }).catch(() => {
    cancelFn && cancelFn()
  })
}
