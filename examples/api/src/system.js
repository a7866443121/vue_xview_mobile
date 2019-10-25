


import qs from 'qs'
// 腾讯地图key
const QMAP_KEY = 'V43BZ-TYULJ-4PXFM-KPEDR-IBRLZ-4YBMD'
const QMAP_URL = 'https://apis.map.qq.com'
export default{
   //腾讯地图后台转发
   transpondUrl(url, params){
    let o = {
      key: QMAP_KEY
    }
    //开发密钥（Key）
    params = Object.assign({}, o, params);
    //转字符串
    let str = QMAP_URL + url +'?' + qs.stringify(params);
    return $vue.$plugins.axios.post(`/transpond/transpondUrl`, {
      url: decodeURIComponent(str)
    });
  },
  // 腾讯地图获取城市
  qqLocationIp(params){
    return this.transpondUrl('/ws/location/v1/ip', params);
  },
  // 腾讯地图逆地址解析
  qqGeocoder(params, get_poi = 1){
    //是否返回周边POI列表
    params['get_poi'] = get_poi;
    return this.transpondUrl(`/ws/geocoder/v1`, params);
  },
  //路线规划
  qqDrivingDirection(params){
    return this.transpondUrl(`/ws/direction/v1/driving`, params);
  },
  //上传文件
  uploadFile(params){
    const formData = new FormData();
    formData.append('multipartFile', params)
    return $vue.$plugins.axios.post(`/file/uploadFile`, formData);
  },
  //删除文件
  doDeleteFiles(file){
    const formData = new FormData();
    formData.append('multipartFile', file)
    return $vue.$plugins.axios.post(`/file/deleteFiles`, formData);
  },
  // 腾讯地图距离计算
  qqDistance (params, mode = 'driving') {
    params['mode'] = mode
    return this.transpondUrl('/ws/distance/v1/matrix', params)
  },
  // 腾讯地图关键词输入提示
  qqSuggestion (params, region = '长沙市') {
    params['region'] = region
    return this.transpondUrl('/ws/place/v1/suggestion', params)
  }
}


// 图片上传
export function doUploadImageFile (file, bizType) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      const str = Math.random().toString(36).substr(2)
      bcrypt.hash(str, salt, function(err, hash) {
        const formData = new FormData()
        if (typeof file === 'string') {
          formData.append('base64Pic', file)
        } else {
          formData.append('multipartFile', file)
        }
        fetch({
          baseURL: window.CHH.BASE_IMG_URL,
          url: `/uploadFile?fileType=PIC&bizType=${bizType}`,
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
            key: hash,
            salt: str
          },
          data: formData
        }).then(({ data }) => {
          resolve(data)
        }).catch(reject)
      })
    })
  })
}
