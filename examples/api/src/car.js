// 优惠券相关接口



export default{
  /* 新增用户车辆 */
  addUserCar(params) {
		return $vue.$plugins.axios.post(`/car/addUserCar`, params);
  },
  /*删除用户车辆 */
  deleteUserCar(params) {
		return $vue.$plugins.axios.post('/car/deleteUserCar', params);
  },
  /*查询所有车辆品牌 */
  getAllBrands(params) {
		return $vue.$plugins.axios.post('/car/getAllBrands', params);
  },
  // 查询某品牌下所有车系  
  getSeriesByBrandId(params){
    console.log(params,'parsmd')
    return $vue.$plugins.axios.post(`/car/getSeriesByBrandId`,params);
  },
  // 查询当前用户所有车辆
  getUserCars(params){    
    return $vue.$plugins.axios.post(`/car/getUserCars`,params);
  },
  // 更新用户默认车辆
  updateDefaultCar(params){
    return $vue.$plugins.axios.post('/car/updateDefaultCar',params);
  },
  // 更新用户车辆信息
  updateUserCar(params){
    return $vue.$plugins.axios.post('/car/updateUserCar',params);
  },
  // 热门品牌
  getHotBrands (params) {
    return $vue.$plugins.axios.post('/car/getHotBrands',params);
  },
  // 违章查询
  inquireTrafficViolation (params) {
    return $vue.$plugins.axios.post('/trafficViolation/inquireTrafficViolation',params);
  },
}

