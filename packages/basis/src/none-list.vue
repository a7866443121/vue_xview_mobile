<!--没有列表的时候-->
<template>
  <div class="custom-none-list_status">
    <img :src="require('@/assets/img' + imgUrl)" :style="{width: imgWidth}">
    <div class="custom-none-list_status-content">
      <p class="title">{{title}}</p>
      <p v-for="(item, index) in desc" :key="index">{{item}}</p>
    </div>
    <customBtn v-if="isBtn" class="none-custom_btn" @click="$router.push({path: link})">{{btnContent}}</customBtn>
  </div>
</template>

<script>
export default {
  props: {
    isBtn: {
      type: Boolean,
      default: true
    },
    btnContent: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: String,
      default: '/annual/have-car.png'
    },
    link: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: Array,
      default: () => []
    },
    imgWidth: {
      type: String,
      default: ''
    }
  },
}
</script>

<style lang="scss">
.custom-none-list_status {
  margin-top: 2rem;
  text-align: center;
  .custom-none-list_status-content {
    .title {
      font-weight: bold;
      font-size: 0.5rem;
      color: #000;
    }
    p {
      color: #606060;
      margin-top: 10px;
      font-size: 14px;
    }
  }
  img {
    width: 6rem;
  }
  .none-custom_btn {
    margin: 2rem auto;
    width: 60%;
    font-weight: bold;
  }
}
</style>