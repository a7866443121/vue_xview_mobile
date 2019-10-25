<template>
  <van-dialog
    v-model="visible"
    :show-confirm-button="showConfirmButton"
    :show-cancel-button="showCancelButton" 
    :confirm-button-text="confirmButtonText"
    :cancel-button-text="cancelButtonText" 
    :title="title"
    :get-container="'body'" 
    :class="{'isPopup': isPopup}"
  >
    <div class="dialog__content">

      <slot >这是一段信息</slot>
    </div>
    <div class="van-hairline--top van-dialog__footer van-dialog__footer--buttons">
      <slot name="footer">
          <van-button class="van-button van-button--default van-button--large van-dialog__cancel" @click="onCancel">取 消</van-button>
          <van-button class="van-button van-button--default van-button--large van-dialog__confirm van-hairline--left" @click="onSubmit">确 定</van-button>
      </slot>
    </div>
  </van-dialog>
</template>
<script>
export default {
  name: "ui-popup",
  props: {
    value: {
      type: null
    },
    title: {
      type: String
    },
    //显示确认按钮
    showConfirmButton: {
      type: Boolean,
      default: false
    },
    //显示取消按钮
    showCancelButton: {
      type: Boolean,
      default: false
    },
    //显示取消按钮
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    //显示取消按钮
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    //是否是popup
    isPopup: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
    }
  },
  computed: {
    visible: {
      get: function() {
        return this.$parent.visible;
      },
      set: function(v) {
        this.$parent.reject(this.value);
      }
    },
  },
  methods: {
    onCancel() {
      history.back();
      this.$emit('onCancel', this.value)
    },
    onSubmit() {
      history.back();
      this.$emit('onSubmit', this.value)
    },
    onback(e){
      document.body.contains(this.$el) &&  this.$parent.closed();
    },
    pushState(){
      let times = new Date().getTime();
      var temp = /\?/ig.test(location.href) ? `&uiPopup=${times}`: `?&uiPopup=${times}`;
      if (this.$router.mode == 'hash') {
        window.history.pushState({status: 0} ,'' , location.href + temp); 
      } else {
        location.hash = temp;
      }
    }
  },
  created() {
    this.pushState();
    if (this.$router.mode == 'hash') {
      window.onpopstate = this.onback;
    } else {
       window.onhashchange = this.onback
    }
  }
};
</script>
<style lang="scss">
.van-dialog{
  max-width: 100%;
  max-height: 100%;
  .dialog__content{
    padding: 0.6667rem;
    max-height: 16.6667rem;
    overflow: scroll;
  }
}
</style>