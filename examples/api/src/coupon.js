// 优惠券相关接口



export default{
  /* 获取所有优惠券定义列表 */
  getAllCouponDefinitions(params) {
		return $vue.$plugins.axios.post(`/coupon/getAllCouponDefinitions`, params);
  },
  /*获取优惠卷服务列表 */
  getCouponServiceListByDefinitionCode(params) {
		return $vue.$plugins.axios.post('/coupon/getCouponServiceListByDefinitionCode', params);
  },
  /*获取用户所有失效的优惠卷 */
  getUnuseableCoupons(params) {
		return $vue.$plugins.axios.post('/coupon/getUnuseableCoupons', params);
  },
  // 获取用户所有未失效的优惠卷  
  getUseableCoupons(params){
    return $vue.$plugins.axios.post(`/coupon/getUseableCoupons`,params);
  },
  // 获取用户卷包中对应当前基础服务的卷
  getUserCouponByService(params){    
    return $vue.$plugins.axios.post(`/coupon/getUserCouponByService`,params);
  },
  // 用户领卷
  userGetCoupons(params){
    return $vue.$plugins.axios.post('/coupon/userGetCoupons',params);
  },
  // 用户领卷(所有)
  userGetCouponsAll(params){
    return $vue.$plugins.axios.post('/coupon/userGetCouponsAll',params);
  },
  // 用户兑换码领券
  userGetCouponsByRedeemCode(params){
    return $vue.$plugins.axios.post('/coupon/userGetCouponsByRedeemCode',params);
  },
}