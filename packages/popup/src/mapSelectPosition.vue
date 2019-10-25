<template>
  <ui-popup class="custom-map_ui_popup" @onCancel="onCancel">
    <div class="custom-map_ui_popup-box">
      <selectPosition @change="change" 
      :hasSearch="params.hasSearch" 
      :allowDrag="params.allowDrag" 
      :centerTip="params.centerTip" 
      :params="params.params"
      @cancel="onCancel"></selectPosition>
      <div slot="footer" class="selectposition-footter">
        <div class="center-content">
          <span class="icon">
            <icon-font name="iconweizhi" color="#3574F7"/>
          </span>
          <span class="title">{{addressInfo.address}}</span>
        </div>
        <customBtn @click="confirm" :round="false" class="selectposition-btn">确定</customBtn>
      </div>
    </div>
  </ui-popup>
</template>
<script>
import selectPosition from '../../map/src/selectPosition'
export default {
  name: 'mapSelectPosition',
  components: {
    selectPosition
  },
  props: {
    params: {
      type: Object,
      default() {
        return {
          hasSearch: true,
          allowDrag: true,
          centerTip: '当前选点',
          params: {}
        };
      }
    },
  },
  data () {
    return {
      addressInfo: {}
    }
  },
  methods: {
    change (val) {
      this.addressInfo = val
    },
    // 确认
    confirm () {
      history.back();
      this.resolve(this.addressInfo)
    },
    // 取消
    onCancel () {
      history.back();
      this.reject()
    }
  },
}
</script>

<style lang="scss">
.custom-map_ui_popup {
  width: 100%;
  border-radius: 0;
  height: 100%;
  .van-dialog__content {
    height: 100%;
  }
  .custom-map_ui_popup-box {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .dialog__content {
    padding: 0;
    height: 100%;
    max-height: 100%;
  }
  .map-container{
    position: relative;
    width: 100%;
    height: 100%;
      .search-box_content {
        width: 100%;
        display: flex;
        align-items: center;
        // background: 
        .search-input{
          flex: 1;
          padding: 0.1333rem 0.3333rem;
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
          width: 50px;
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
      .address-list{
        background-color: #fff;
        z-index: 1002;
        max-height: 90%;
        .address-list-item{
          padding: 10px;
          border-bottom: 1px solid #ebebeb;
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
          .address-list-title {
            font-size: 14px;
            margin-bottom: 4px;
          }
          .address-list-desc{
            color: #999;
          }
        }
      }
      // }
    // }
    
  }  
  .selectposition-footter {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    z-index: 1001;
    // padding: 0 10px;
    width: 100%;
    padding: 0 10px;
    .center-content {
      display: flex;
      align-items: center;
      background: #fff;
      padding: 15px;
      overflow-y: auto;
      .icon {
        flex: 0 0 0.8333rem;
      }
      .title {
        line-height: 0.6667rem;
        font-size: 0.5rem;
      }
    }
    .selectposition-btn {
      margin-top: 0;
    }
  }
}
</style>