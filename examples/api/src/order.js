// 订单数据接口



export default{
	// 新增救援订单 
	addAssistanceOrder(params) {
		return $vue.$plugins.axios.post(`/order/addAssistanceOrder`, params);
	},
	// 新增代驾订单
	addDesignatedDrivingOrder(params) {
		return $vue.$plugins.axios.post(`/order/addDesignatedDrivingOrder`, params);
	},
	// 新增年检订单
	addMotOrder(params) {
		return $vue.$plugins.axios.post(`/order/addMotOrder`, params);
	},
  /** 新增标准到店订单 */
  addOrder(params) {
		return $vue.$plugins.axios.post('/order/addOrder', params);
	},
	//新增代步车订单
	addSpareCar(params){
		return $vue.$plugins.axios.post('/order/addSpareCar', params);
	},
	//用户预约订单
	addAppointmentOrder(params){
		return $vue.$plugins.axios.post('/order/addAppointmentOrder', params);
	},
	// 获取预约历史订单列表 
	getHistoryAppointmentOrders(params){
		return $vue.$plugins.axios.post('/order/getHistoryAppointmentOrders', params);
	},
	// 用户删除预约订单 
	deleteAppointmentOrder(params){
		return $vue.$plugins.axios.post('/order/deleteAppointmentOrder', params);
	},
	// 获取预约订单详情 
	getAppointmentOrderDetails(params){
		return $vue.$plugins.axios.post('/order/getAppointmentOrderDetails', params);
	},
	//用户取消订单
	cancelOrder(params){
		return $vue.$plugins.axios.post('/order/cancelOrder', params);
	},
	//用户评价订单
	evaluateOrder(params){
		return $vue.$plugins.axios.post('/order/evaluateOrder', params);
	},
	//获取全部基础服务
	getAllBaseServices(params){
		return $vue.$plugins.axios.post('/order/getAllBaseServices', params);
	},
	//获取某个类别下的全部基础服务
	getBaseServicesByCategoryCode(params){
		return $vue.$plugins.axios.post('/order/getBaseServicesByCategoryCode', params);
	},
	//获取年检到期时间
	getChooseDates(params){
		return $vue.$plugins.axios.post('/order/getChooseDates', params);
	},
	//获取卷包使用记录列表
	getCouponLogs(params){
		return $vue.$plugins.axios.post('/order/getCouponLogs', params);
	},
	//获取免费的基础服务
	getFreeServices(params){
		return $vue.$plugins.axios.post('/order/getFreeServices', params);
	},
	//获取用户历史订单列表
	getHistoryOrders(params){
		return $vue.$plugins.axios.post('/order/getHistoryOrders', params);
	},
	//获取年检判断结果
	getMotResult(params){
		return $vue.$plugins.axios.post('/order/getMotResult', params);
	},
	//获取订单详情
	getOrderById(params){
		return $vue.$plugins.axios.post('/order/getOrderById', params);
	},
	//根据服务查询已有订单
	getOrderByService(params){
		return $vue.$plugins.axios.post('/order/getOrderByService', params);
	},
	//获取订单详情
	getOrderDetailsByOrderId(params){
		return $vue.$plugins.axios.post('/order/getOrderDetailsByOrderId', params);
	},
	//获取用户当前订单列表
	getUnderwayOrders(params){
		return $vue.$plugins.axios.post('/order/getUnderwayOrders', params);
	},
	//更新车辆年检信息
	updateMotInfo(params){
		return $vue.$plugins.axios.post('/order/updateMotInfo', params);
	},
	//用户删除订单
	userDeleteOrder(params){
		return $vue.$plugins.axios.post('/order/userDeleteOrder', params);
	},
}

