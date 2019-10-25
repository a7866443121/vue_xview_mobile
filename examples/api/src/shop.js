
// 商家相关接口


export default{
  // 根据位置获取检测站列表
  getMotStationsByPosition(params){
    return $vue.$plugins.axios.post(`/shop/getMotStationsByPosition`, params);
  },
  // 获取商家信息
  getShopById(params){
    return $vue.$plugins.axios.post(`/shop/getShopById`, params);
  },
  // 获取商家列表
  getShopsByPositionAndCondition(params){
    return $vue.$plugins.axios.post(`/shop/getShopsByPositionAndCondition`, params);
  },
  // 获取商家服务
  getShopServicesByShopId(params){
    return $vue.$plugins.axios.post(`/shop/getShopServicesByShopId`, params);
  },
}

