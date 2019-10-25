// 渠道信息



export default{
  /* 查询渠道信息 */
  getInsurerByCode(params) {
		return $vue.$plugins.axios.post(`/insurer/getInsurerByCode`, params);
  },
}
