import wxConfig from '@/utils/wxConfig'

const ishttps = 'https:' === document.location.protocol ? true : false

export default function getPosition (info, poi, poiOptions) {
  return new Promise((resolve, reject) => {
    if (!ishttps) {
      // 模拟定位
      resultResolve(28.23141, 112.88239)
    } else {
      wxConfig([]).then(wx => {
        wx.getLocation({
          type: 'gcj02',
          success (res) {
            resultResolve(res.latitude, res.longitude)
          },
          error: reject
        })
      }).catch(error => {
        // 授权失败尝试GPS定位
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            qq.maps.convertor.translate(new qq.maps.LatLng(position.coords.latitude, position.coords.longitude), 1, res => {
              resultResolve(res[0].getLat(), res[0].getLng())
            })
          }, reject)
        } else {
          reject(new Error('定位失败'))
        }
      })
    }
    function resultResolve (lat, lng) {  
      if (!info) {
        resolve({ lat, lng })
      } else {
       $vue.$api.qqGeocoder({location: `${lat},${lng}`}).then(data => {
          resolve(data)
        }).catch(reject)
      }
    }
  })
}