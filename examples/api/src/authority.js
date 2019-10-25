
export default{
  /** 用户登录 */
  customerLogin(params) {   
		return $vue.$plugins.axios.post('/authority/customerLogin', params);
  },
  /** 获取手机短信验证码 */
  getSmsVerificationCode(params) {
		return $vue.$plugins.axios.post('/authority/getSmsVerificationCode', params);
  },
  //完成注册
  registerPhone(params) {
		return $vue.$plugins.axios.post('/authority/registerPhone', params);
  },
  //解除微信绑定
  removeBinding(params) {
		return $vue.$plugins.axios.post('/authority/removeBinding', params);
  },
  //更新用户信息
  updateUser(params) {
		return $vue.$plugins.axios.post('/authority/updateUser', params);
  },
  //获取首页信息
  getHomeData(params) {
		return $vue.$plugins.axios.post('/home/getHomeData', params);
  },
  //获取所有数据字典
  getDataDictionary(params) {
		return $vue.$plugins.axios.post('/data/getDataDictionary', params);
  },
}
