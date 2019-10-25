// 优惠卷数据操作接口
import coupon from './src/coupon.js'
// 商家
import shop from './src/shop'
// 权限
import authority from './src/authority.js'
// 渠道数据接口
import insurer from './src/insurer.js'
// 订单
import order from './src/order.js'
// 车辆
import cars from './src/car'
// 系统接口
import system from './src/system'
export default {
  ...coupon,
  ...authority,
  ...order,
  ...shop,
  ...insurer,
  ...cars,
  ...system
}
