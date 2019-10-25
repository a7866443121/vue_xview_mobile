export const getTimeValue = (time, type) => {
  const obj = {
    // 年份
    year: time.getFullYear(),
    // 月份
    month: time.getMonth() + 1,
    // 日期天数
    dateDay: time.getDate(),
    // 星期数
    weekDay: time.getDay() + 1,
    // 小时
    hours: time.getHours(),
    // 分钟
    minutes: time.getMinutes()
  }
  if (type !== undefined) {
    return obj[type]
  }
  
  return obj
}