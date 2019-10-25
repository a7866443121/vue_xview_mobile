<!--按钮-->
<template>
  <div class="custom-components-btn">
    <van-button class="custom-btn" 
    :round="round"
    @click="$emit('click')" 
    :disabled="disabled" 
    :class="{btnClass: true, 'custom-btn-disabled': disabled || type == 'muted'}"
    :loading="loading"
    :loading-text="loadingText">{{btnContent}}<slot></slot></van-button>
  </div>
</template>

<script>
import { type } from 'os';
export default {
  name: 'customBtn',
  props: {
    // 按钮内容 String
    btnContent: '',
    // 按钮样式 class类名
    btnClass: '',
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 按钮类型
    type: {
      type: String,
      default: ''
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: false
    },
    // 是否显示圆角
    round: {
      type: Boolean,
      default: true
    },
    // 加载文字
    loadingText: {
      type: String,
      default: ''
    },
  }
}
</script>

<style lang="scss">
.custom-components-btn {
  margin-top: 0.6667rem;
  .custom-btn {
    background: linear-gradient(to right, #3574F7 , #7CA6FE);
    color: #fff;
    width: 100%;
    height: 1.5rem;
    border: none;
    font-size: 0.5333rem;
  }
  .custom-btn-disabled {
    background: linear-gradient(to right,#ABABAB, #BEBEBE);
  }
}
</style>