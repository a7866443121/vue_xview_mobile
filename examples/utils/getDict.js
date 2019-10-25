import { ArrayToSet } from "@/utils/";
export const getDict = () => {
  // 获取所有数据字典
  $vue.$api.getDataDictionary().then(res => {
    let formatBaseService = formatServiceList(res.BASE_SERVICE);
    res['formatBaseService'] = formatBaseService;
    //把权限列表
    store.commit('setdataDictionary', res);
    //把字典存入set
    let set = {};
    //服务大类
    set['categoryCodeSet'] = ArrayToSet(formatBaseService, 'code');
    //服务小类
    set['BASE_SERVICE'] = ArrayToSet(res.BASE_SERVICE,'code');
    store.commit('setDictSet', set);
    sessionStorage.setItem("store",JSON.stringify(store.state))
  });


  const formatServiceList = (baseServiceList)  => {
    //新建一个对象
    const addeds = {}
    return (baseServiceList.length > 0 && baseServiceList.reduce((result, service) => {
      const categoryCode = service.categoryCode
      if (!addeds[categoryCode]) {
        addeds[categoryCode] = true
        result.push({
          code: categoryCode,
          name: service.categoryName,
          userChoosable: service.userChoosable,
          children: baseServiceList.filter(v => v.categoryCode === categoryCode)
        })
      }
      return result
    }, [])) || []
  }
}