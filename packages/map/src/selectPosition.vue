<template>
  <div class="map-container" :class="allowDrag ? '' : 'allow-drag'">
    <div class="search-box" v-if="hasSearch">
      <div class="search-box_content">
        <span>
          <icon-font name="iconsousuo" size="20"/>
        </span>
        <input v-model="searchStr" class="search-input" type="text" placeholder="搜索地址">
        <span class="search-btn" @click="onReject">取消</span>
      </div>
    </div>
    <div class="map-container">
      <div class="map" ref="map"></div>
      <div class="center-marker" :class="{'center-marker__loading': loading}">
        <img class="center-marker-img" :src="centerMarker" alt="">
        <div v-show="loading" class="loading">
          <img class="loading-icon" :src="loadimg" alt="">
        </div>
        <div class="tip">{{centerTip || centerName}}</div>
      </div>
      <ul class="address-list" v-show="showAddressList">
        <li
          class="address-list-item"
          v-for="(item, index) in searchList"
          :key="index"
          @click="onSearch(item)"
        >
          <p class="address-list-title">{{item.title}}</p>
          <small class="address-list-desc">{{item.address}}</small>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import debounce from '@/utils/debounce';
import getPosition from '@/utils/getPosition'
// 当前位置标记
const ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAtFBMVEUAAAAAc7wAc7wAc7wAc7wAc7wAc7wAc7z5/P0Jd74UfcH8/f4Jd77+/v8Id74Ac7zu9vvc7Pbo8vnJ4fHN5PIHdr5mq9fq8/n1+vzg7vfu9vvT5/PP5fLU5/Tq8/nb6/bk8Pinz+ir0emZx+Sp0Oi62e3O5PI1kMo9lMz7/f4AnP////8cp/+U1v+G0P9Muv8Pov/2/P8srf8Fnv/h9P/u+P/t+P/b8f/3/P81sf8nrP8Mof/EiZLUAAAAKnRSTlMABAwSJwgfFvEjGe03+0Mx06qkpG08KNnOxbm1tLKelY+Gg39zaF5NQ/C2YA+kAAABr0lEQVQ4y82U2XKDMAxFW2wMBhOafd/XErKSpUn+/78qMcEO63Tal943W2euxrKkt/+jd6liStc0EkrTdGDzMWsxaNmOY7cGCysPBawxstdS9qgBaIadRmpPTKI1oklTxVmVdUoVK0kC1wlD583ODx733eYcHjtAxjkj9Pva7r2n9ttD6Gkgqd5Banh7OnovOp7wrkbgRcqwYSPnezH5SNoNsJSGxhDz3ryEbph9aIBlZMjRcOultEVLLi11MoeLyz4N7i8QmBNdlqYM542XoQ0EylCiJ8g+4LzLAncQ+GARSLgJZz8L9CFgchKB1IFzkAUGEHBoHHz8BMTU99zUL2DxYxTIi8vDiSzPrKjgMybraInP/C80hexJndAq3ByOSe6ITVGl+IVR7hW++5pssysariCzajM6WSOZ0bgTim2mLN0+3h5So9B3lSFaEi7aargCPxqutuAwCrHhovXuOqVuncrhUqQYm3HMHAvJSRBI7i6r5gtWXbrcyFoVhFFRmvaapuOYzd60JCgjwGUtKYNRV9RLoLpwKTNgSeWtPWIxTkGcWQTX3l8WaXo1/1Lflg56VRNj6xkAAAAASUVORK5CYII=';
//中心点标记
const centerMarker = "data:image/png;base64,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";
// 中心点 loadimg
const loadimg = 'data:image/png;base64,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';
export default {
  name: 'selectPosition',
  props: {
    params: {
      type: Object,
      default () {
        return {}
      }
    },
    // 有搜索栏
    hasSearch: {
      type: Boolean,
      default: true
    },
    // 允许拖拽换点
    allowDrag: {
      type: Boolean,
      default: true
    },
    // 中心点提示
    centerTip: {
      type: String,
      default: '当前选点'
    },
  },
  data () {
    return {
      searchStr: '',
      searchList: [],
      loading: false,
      map: null,
      // 当前位置
      currentPosition: '',
      currentMarker: null,
      // 中心点
      center: '',
      centerAddress: '',
      centerName: '',
      //中心点图标
      centerMarker: centerMarker,
      loadimg: loadimg,
      showAddressList: false,
    }
  },
  created() {

  },
  mounted() {
    //动画延时加载了dom
    this.$nextTick(() => {
      getPosition().then(position => {
        this.currentPosition = `${position.lat},${position.lng}`;
        this.center = (this.params.lat && this.params.lng) ? `${this.params.lat},${this.params.lng}` : `${position.lat},${position.lng}`;
        this.centerAddress = position.address
        this.centerName = position.name
        this.setMap();
        this.qqGeocoder(this.center)
        let [lat, lng] = this.center.split(',');
        this.map && this.map.setCenter(new qq.maps.LatLng(lat, lng));
        //监听拖拽完成时间
        qq.maps.event.addListener(this.map, 'dragend', () => {
          const center = this.map.getCenter()
          this.center = [center.getLat(), center.getLng()].join(',')
          this.qqGeocoder(this.center)
        });
      }).catch(() => {})
    });
  },
  methods: {
    //搜索
    onSearch(v){
      this.center = `${v.location.lat},${v.location.lng}`
      this.centerName = v.address;
      this.showAddressList = false;
      this.searchStr = v.address;
      this.setMapCenter();
    },
    //设置标记点
    setMyMarker () {
      const myPosition = new qq.maps.LatLng(...this.currentPosition.split(','))
      if (!this.currentMarker) {
        const icon = new qq.maps.MarkerImage(ICON, new qq.maps.Size(24, 24), '', new qq.maps.Point(12, 12), new qq.maps.Size(24, 24))
        this.currentMarker = new qq.maps.Marker({
          position: myPosition,
          map: this.map,
          icon
        })
      } else {
        this.currentMarker.setPosition(myPosition)
      }
    },
    //设置地图
    setMap () {
      const center = new qq.maps.LatLng(...this.center.split(','))
      if (this.map) {
        this.map.setCenter(center)
      } else {
        this.map = new qq.maps.Map(this.$refs.map, {
          zoom: 16,
          center,
          zoomControl: false,
          mapTypeControl: false,
          mapZoomType: qq.maps.MapZoomType.CENTER
        })
      }
    },
    //地址解析
    qqGeocoder: debounce( function(center){
      this.loading = true;
      this.$api.qqGeocoder({
        location: center
      }).then(data => {
        this.loading = false;
        this.centerName = data.result.formatted_addresses.recommend;
        this.centerAddress = data.result.formatted_addresses.rough;
        this.setMyMarker()
      }).catch((e) => {})
    },500),
    //设置地图中心点
    setMapCenter (map) {
      const center = new qq.maps.LatLng(...this.center.split(','))
      this.map.setCenter(center)
    },
    // 取消
    onReject () {
      this.$emit('cancel')
    },
  }, 
  beforeRouteEnter (to, from, next) {
    var u = navigator.userAgent;
    //ios终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
    // XXX: 修复iOS版微信HTML5 History兼容性问题
    if (isiOS && to.path !== location.pathname) {
        // 此处不可使用location.replace
        location.assign(to.fullPath)
    } else {
        // console.log(location.assign(to.fullPath))
        next()
    }
  },
  watch: {
    searchStr: debounce( function(vl){
      if (vl !== '' && vl != this.centerName) {
        this.searchList = []
        this.loading = true
        this.$api.qqLocationIp().then(city => {
          this.$api.qqSuggestion({
            keyword: vl,
            page_index: 1,
            page_size: 20,
            policy: 1,
          }, city.result.ad_info.city, '').then(data => {
            this.showAddressList = true;
            this.loading = false
            this.searchList = data.data;
          }).catch(() => {
            this.loading = false
          })
        }).catch(() => {})
      } else {
        this.searchList = []
        this.showAddressList = false;
      }
    }, 500),
    //中心点盖则把数据回调出去
    centerName(centerName){
      let arr = this.center.split(',')
      let location = {
        lat: arr[0],
        lng: arr[1]
      }
      this.$emit('change',{
        location: location,
        address: centerName,
        street: this.centerAddress,
      });
    }
  }
}
</script>

<style lang="scss">
.map-container{
  width: 100%;
  height: 100%;
  .search-box{
    display: flex;
    flex-flow: row;
    width: 100%;
    padding: 0.3333rem;
    .search-box_content {
      width: 100%;
      display: flex;
      align-items: center;
      // background: 
      .search-input{
        flex: 1;
        padding: 3.999px 9.999px;
        -webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        border: none;
        box-sizing: border-box;
        color: #606266;
        outline: 0;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      &:focus{
        border-color: #409EFF;
      }
    }
    .search-btn{
        width: 1.6667rem;
        display: inline-block;
        color: #606266;
        
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        border-left: 0;
        
        &:active{
          color: #3a8ee6;
          
        }
      }
    }
  }
  .map-container{
    position: relative;
    height: 13.3333rem;
    .map{
      width: 100%;
      height: 100%;
      .smnoprint{
        display: none;
      }
    }
    .center-marker {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      .center-marker-img{
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 1.3333rem;
        margin-left: -0.6667rem;
      }
      .loading {
        position: absolute;
        top: -1.3333rem;
        left: 0rem;
        transition: transform .6s;
        transform: translate3d(-50%, 0, 0);
        .loading-icon {
          width: 0.6667rem;
          filter: invert(100%);
          animation: 1s loading linear infinite;
        }
      }
      .tip {
        position: absolute;
        top: -2.6667rem;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        height: 1rem;
        padding: 0 0.5rem;
        line-height: 1rem;
        border-radius: 0.5rem;
        font-size: 0.4rem;
        box-shadow: 0 0 0.1rem rgba(0, 0, 0, .1);
        white-space: nowrap;
        background: #fff;
        &:after {
          content: '';
          width: 0;
          height: 0;
          display: block;
          border-left: 0.1667rem solid transparent;
          border-right: 0.1667rem solid transparent;
          border-top: 0.1667rem solid #fff;
          position: absolute;
          top: 1rem;
          left: calc(50% - 0.1667rem);
        }
      }
    }
    .address-list{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      max-height: 80%;
      background-color: #fff;
      box-shadow: 0 0 0.1rem rgba(0, 0, 0, .1);
      overflow-y: scroll;
      .address-list-item{
        padding: 0.3333rem;
        border-bottom: 0.0333rem solid #ebebeb;
        text-align: left;
        &:hover{
          color: #409EFF;
          border-color: #c6e2ff;
          background-color: #ecf5ff;
        }
        &:active{
          color: #3a8ee6;
          background-color: #c6e2ff;
        }
        .address-list-desc{
          color: #999;
        }
      }
    }
  }
  &.allow-drag{
    pointer-events: none;
  }
}
@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
